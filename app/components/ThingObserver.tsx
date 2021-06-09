import useSocket from "hooks/useSocket";
import { useEffect } from "react";

const ThingObserver: React.FC = () => {
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      const cb = (thingId: string) => {
        // TODO: do better
        alert(`Your thing was stolen: ${thingId}`);
      };

      socket.on("thing stolen", cb);

      return () => {
        socket.off("thing stolen", cb);
      };
    }
  }, [socket]);

  return null;
};

export default ThingObserver;
