// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Socket } from "net";
import { Server as HttpServer } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";
import dbConnect from "server-utils/dbConnect";
import Thing from "models/Thing";

interface CustomServer extends HttpServer {
  io?: Server;
}

interface CustomSocket extends Socket {
  server: CustomServer;
}

interface CustomResponse extends NextApiResponse {
  socket: CustomSocket;
}

/** a map of userIds and connection counts */
const userCounts: Record<string, number> = {};

const socketIo = (_req: NextApiRequest, res: CustomResponse) => {
  // cache the web socket server
  if (!res.socket.server.io) {
    const server = res.socket.server;
    const io = new Server(server);

    // TODO: extract some of this
    // TODO: move event strings to constants
    io.on("connection", (socket) => {
      /** broadcast count of *other* active users */
      const updateActiveUsers = () => {
        io.sockets.emit(
          "active users",
          Object.keys(userCounts).filter(
            (userId) => userId !== socket.data.userId
          ).length
        );
      };

      /** refresh Thing queries for a given room */
      const refreshThings = (room: string[]) => {
        io.to(room).emit("refresh things");
      };

      socket.on(
        "set active user",
        ({ userId, namespace }: { userId: string; namespace: string }) => {
          // set userId to the session
          socket.data.userId = userId;

          // make user join its own room
          socket.join(userId);
          // make user join the namespace (misnomer for room)
          socket.join(namespace);

          // increment connection count for user
          userCounts[userId] = (userCounts[userId] || 0) + 1;

          // initial connection
          if (userCounts[userId] === 1) {
            updateActiveUsers();
          }
        }
      );

      // make user inactive
      socket.on("disconnect", () => {
        // get session variable for userId
        const { userId } = socket.data;

        // decrement connection count for user
        if (userId && userCounts[userId]) {
          userCounts[userId] -= 1;

          if (userCounts[userId] === 0) {
            delete userCounts[userId];

            updateActiveUsers();
          }
        }
      });

      socket.on(
        "steal a thing",
        ({ victimId, thingId }: { victimId: string; thingId: string }) => {
          socket.to(victimId).emit("thing stolen", thingId);
        }
      );

      socket.on("user update", async () => {
        const { userId } = socket.data;

        try {
          // check if user has any claims
          await dbConnect();

          const claimedThings = await Thing.find(
            { claimedBy: { $eq: userId } },
            // just get namespaces
            "namespace"
          ).exec();

          const rooms = Array.from(
            new Set(claimedThings.map(({ namespace }) => namespace))
          );

          if (rooms.length) {
            refreshThings(rooms);
          }
        } catch (e) {
          console.error("failed to invalidate claimed things");
          console.error(e);
        }
      });

      socket.on("thing update", async (thingId: string) => {
        try {
          // check if user has any claims
          await dbConnect();

          const { namespace: room = "" } =
            (await Thing.findById(thingId, "namespace").exec()) || {};

          if (room) {
            refreshThings([room]);
          }
        } catch (e) {
          console.error("failed to invalidate updated things");
          console.error(e);
        }
      });
    });

    res.socket.server.io = io;
  }

  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default socketIo;
