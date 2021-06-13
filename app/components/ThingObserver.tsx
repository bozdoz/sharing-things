import socket from "websocket/client-socket";
import { useEffect } from "react";
import { thingResource } from "resources";

const ThingObserver: React.FC = () => {
  useEffect(() => {
    const cb = async (thingId: string) => {
      const { title, claimedBy } = await thingResource.get(thingId);
      // TODO: do better
      alert(`Your thing (${title}) was stolen by ${claimedBy?.name}`);
    };

    socket.on("thing stolen", cb);

    return () => {
      socket.off("thing stolen", cb);
    };
  }, []);

  return null;
};

export default ThingObserver;
