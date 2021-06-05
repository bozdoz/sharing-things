import { useEffect, useState } from "react";
import io from "socket.io-client";

type Socket = ReturnType<typeof io>;
let cachedSocket: Socket;
let pendingRequest: Promise<Request>;

const useSocket = () => {
  const [socketIo, setSocket] = useState<Socket | undefined>(cachedSocket);

  useEffect(() => {
    if (!socketIo) {
      console.log("fetching socket.io");

      // de-dupe parallel requests
      pendingRequest = pendingRequest || fetch("/api/socketio");

      pendingRequest.then(() => {
        cachedSocket = io();

        setSocket(cachedSocket);
      });
    }
  }, [socketIo]);

  return socketIo;
};

export default useSocket;
