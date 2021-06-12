import socket from "websocket/client-socket";
import { useEffect } from "react";
import { thingResource } from "resources";

const ThingObserver: React.FC = () => {
  console.log("thing observer");
  useEffect(() => {
    console.log("thing observer useEffect");
    const cb = async (thingId: string) => {
      const { title, claimedBy } = await thingResource.get(thingId);
      console.log("thing stolen callback");
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
