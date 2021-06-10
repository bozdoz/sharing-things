import socket from "websocket/client-socket";
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

  useEffect(() => {
    // get active users
    const cb = (count: number) => {
      setActiveUsers(count);
    };
    socket.on("active users", cb);

    return () => {
      socket.off("active users", cb);
    };
  }, []);

  const { asPath: namespace } = useRouter();

  return (
    <Grid>
      <p>{namespace !== "/" && `Namespace: ${namespace}`}</p>
      {!!activeUsers && <p>Active users: {activeUsers}</p>}
    </Grid>
  );
};

export default AppStatus;
