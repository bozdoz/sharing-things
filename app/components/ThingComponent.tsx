import useUserStore from "hooks/useUserStore";
import { Thing } from "models/types";
import { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { claimResource, thingResource } from "resources";
import Avatar from "./Avatar";

const ThingWrapper = styled.div`
  background: rgba(255, 255, 255, 0.2);
  margin-bottom: 1em;
  padding: 1em;
  border-radius: var(--border-radius);
  display: grid;
  gap: 1em;
  line-height: 1;

  ${Avatar} {
    --size: 16px;
    --delay: 0;
    margin-left: 5px;
    margin-bottom: -2px;
  }
`;

const Title = styled.h3`
  margin: 0;

  small {
    font-weight: normal;
    margin-left: 0.4em;
  }
`;

const Message = styled.div``;

const ThingComponent: React.FC<Thing> = ({
  _id: thing,
  title,
  message,
  claim,
}) => {
  const user = useUserStore((state) => state.userId);
  const [deletePending, setDeletePending] = useState(false);
  const t = useRef<number>();
  const claimedByCurrentUser = claim?.user._id === user;

  const handleClaim = useCallback(async () => {
    if (claimedByCurrentUser) {
      // release
      await thingResource.update(thing, {
        claim: null,
      });
    } else if (user) {
      const { _id: claim } = await claimResource.create({
        thing,
        user,
      });

      await thingResource.update(thing, {
        claim,
      });
    }
  }, [user, thing, claimedByCurrentUser]);

  const handleDelete = useCallback(async () => {
    if (deletePending) {
      await thingResource.delete(thing);
    } else {
      setDeletePending(true);

      t.current = window.setTimeout(() => {
        setDeletePending(false);
      }, 3000);
    }
  }, [deletePending, thing]);

  const username = claim?.user.name || "";

  return (
    <ThingWrapper>
      <Title>
        {title}{" "}
        {claim && (
          <small>
            claimed by <Avatar name={username} /> {username}
          </small>
        )}
      </Title>
      {message && <Message>{message}</Message>}
      <button onClick={handleClaim} type="button">
        {claimedByCurrentUser ? `Release` : `Claim`}
      </button>
      <button onClick={handleDelete} type="button">
        {deletePending ? "Click again  to delete" : "Delete"}
      </button>
    </ThingWrapper>
  );
};

export default ThingComponent;
