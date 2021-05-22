// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Server } from "socket.io";

const socketIo = (req, res) => {
  if (!res.socket.server.io) {
    console.log("initializing socket.io");
    const io = new Server(res.socket.server);

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
