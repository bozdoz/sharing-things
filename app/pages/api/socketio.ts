// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Socket } from "net";
import { NextApiRequest, NextApiResponse } from "next";
import updateUser from "server-utils/updateUser";
import { Server } from "socket.io";

interface CustomSocket extends Socket {
  server: {
    io?: Server;
  };
}

interface CustomResponse extends NextApiResponse {
  socket: CustomSocket;
}

/** a map of userIds and connection counts */
const users: Record<string, number> = {};

const socketIo = (_req: NextApiRequest, res: CustomResponse) => {
  // cache the web socket server if in production
  if (!res.socket.server.io) {
    // no idea what type this is supposed to be
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const server: any = res.socket.server;
    const io = new Server(server);

    io.on("connection", (socket) => {
      /** broadcast count of *other* active users */
      const updateActiveUsers = () => {
        socket.broadcast.emit(
          "active users",
          Object.keys(users).filter((userId) => userId !== socket.data.userId)
            .length
        );
      };

      // update db to make user active
      socket.on("set active user", (userId: string) => {
        // set userId to the session
        socket.data.userId = userId;

        // increment connection count for user
        users[userId] = (users[userId] || 0) + 1;

        console.log("set active", users);

        // initial connection updates database
        if (users[userId] === 1) {
          updateUser(userId, {
            active: true,
          });

          updateActiveUsers();
        }
      });

      // update db to make user inactive
      socket.on("disconnect", (reason) => {
        // get session variable for userId
        const { userId } = socket.data;

        // decrement connection count for user
        if (userId && users[userId]) {
          users[userId] -= 1;

          console.log("set inactive", users, { reason });

          if (users[userId] === 0) {
            updateUser(userId, {
              active: false,
            });

            delete users[userId];

            updateActiveUsers();
          }
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
