import useSocket from "hooks/useSocket";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;

  grid-template-columns: 1fr 1fr;

  p {
    font-size: 0.9em;
    color: var(--color-secondary);
  }

  p:last-child:not(:only-child) {
    text-align: right;
  }
`;

const AppStatus: React.FC = () => {
  const [activeUsers, setActiveUsers] = useState(0);
  const socket = useSocket();
  const router = useRouter();

  useEffect(() => {
    if (socket) {
      // get active users
      const onConnect = () => {
        console.log("app status connect");
        socket.on("active users", (count) => {
          setActiveUsers(count);
        });
      };
      socket.on("connect", onConnect);

      return () => {
        socket.off("connect", onConnect);
      };
    }
  }, [socket]);

  const namespace = router.asPath;

  return (
    <Grid>
      <p>{namespace !== "/" && `Namespace: ${namespace}`}</p>
      {!!activeUsers && <p>Active users: {activeUsers}</p>}
    </Grid>
  );
};

export default AppStatus;
