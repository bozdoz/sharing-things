import io from "socket.io-client";

// we need to make sure this endpoint gets hit at least once
// so that the backend websocket server is set up and listening
// but we don't care when it finishes or what it returns
const hitSocketEndpoint = () => {
  // ignore server-side rendering
  if (typeof window !== "undefined") {
    fetch("/api/socketio");
  }
};

hitSocketEndpoint();

const socket = io();

export default socket;
