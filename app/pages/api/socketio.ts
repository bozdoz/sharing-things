// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Socket } from "net";
import { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";

interface CustomSocket extends Socket {
  server: {
    io?: Server;
  };
}

interface CustomResponse extends NextApiResponse {
  socket: CustomSocket;
}

const socketIo = (_req: NextApiRequest, res: CustomResponse) => {
  if (!res.socket.server.io) {
    console.log("initializing socket.io");
    // no idea what type this is supposed to be
    const server: any = res.socket.server;
    const io = new Server(server);

    io.on("connection", (socket) => {
      socket.broadcast.emit("a user connected");
      socket.on("hello", () => {
        socket.emit("hello", "world!");
      });
    });

    res.socket.server.io = io;
  } else {
    console.log("socket.io is already running");
  }

  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default socketIo;
