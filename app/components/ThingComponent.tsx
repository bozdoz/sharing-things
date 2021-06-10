import useStore, { State } from "hooks/useStore";
import { Thing } from "models/types";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { claimResource, thingResource } from "resources";
import Avatar from "./Avatar";
import ConfirmButton from "./ConfirmButton";
import socket from "websocket/client-socket";

const EditButton = styled.button`
  box-sizing: border-box;
  width: 1.8em;
  height: 1.8em;
  position: absolute;
  right: 0.6em;
  top: 0.6em;
  padding: 0;
  margin: 0;
  font-size: 1em;
  background: transparent;
`;

const ThingWrapper = styled.div`
  position: relative;
  background: rgba(12, 49, 73, 0.4);
  margin: 0.5em 0 2em;
  padding: 1em;
  border-radius: var(--border-radius);
  display: grid;
  gap: 0.4em;
  line-height: 1;

  > *:not(button) {
    margin-bottom: 0.2em;
  }

  ${Avatar} {
    --size: 16px;
    --delay: 0;
    margin-left: 5px;
    margin-bottom: -2px;
  }

  input[type="text"] {
    width: 100%;
    font-size: 1.2em;
    font-weight: bold;
    padding: 0.4em;
    margin: -0.4em;
  }

  textarea {
    resize: none;
    padding: 0;
  }

  &.edit-mode textarea {
    resize: initial;
  }
`;

const Title = styled.div`
  small {
    font-weight: normal;
    margin-left: 0.4em;
  }
`;

const userIdSelector = (state: State): string | null => state.userId;

const claimThing = async (thing: string, userId: string) => {
  const { _id: claim } = await claimResource.create({
    thing,
    user: userId,
  });

  await thingResource.update(thing, {
    claimed: claim,
    claimedBy: userId,
  });
};

const ThingComponent: React.FC<Thing> = ({
  _id: thing,
  title,
  message,
  claimedBy,
}) => {
  const userId = useStore(userIdSelector);
  const claimedByCurrentUser = claimedBy?._id === userId;
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editMessage, setEditMessage] = useState(message);

  // if the resource is invalidated, title or message may have changed
  // need to update the editable title/message
  useEffect(() => {
    // don't update title/message if in the middle of editing
    // TODO: user should be notified
    // TODO: add cancel button
    if (!editMode) {
      setEditTitle(title);
      setEditMessage(message);
    }
  }, [title, message, editMode]);

  const handleReleaseOrClaim = useCallback(() => {
    if (claimedByCurrentUser) {
      // release
      thingResource.update(thing, {
        claimed: null,
        claimedBy: null,
      });
    } else if (userId) {
      claimThing(thing, userId);
    }
  }, [userId, thing, claimedByCurrentUser]);

  const handleSteal = useCallback(() => {
    if (userId) {
      // send both userIds to websocket
      // to alert current holder
      if (claimedBy) {
        console.log("stealing");
        socket.emit("steal a thing", {
          victimId: claimedBy._id,
          thingId: thing,
        });
      }

      claimThing(thing, userId);
    }
  }, [userId, claimedBy, thing]);

  const handleDelete = useCallback(() => {
    thingResource.delete(thing);
  }, [thing]);

  const handleEdit = useCallback(() => {
    if (editMode) {
      // update thing
      thingResource.update(thing, {
        title: editTitle,
        message: editMessage,
      });
    }
    setEditMode(!editMode);
  }, [editMessage, editMode, editTitle, thing]);

  const username = claimedBy?.name || "";

  const classNames = ["thing-component", editMode && "edit-mode"]
    .filter(Boolean)
    .join(" ");

  const titleValue = editMode ? editTitle : title;

  return (
    <ThingWrapper className={classNames}>
      <Title>
        <input
          type="text"
          onChange={(e) => setEditTitle(e.target.value)}
          value={titleValue}
          disabled={!editMode}
          placeholder="Name for Thing"
          maxLength={50}
          required
        />
      </Title>
      {claimedBy && (
        <small>
          claimed by <Avatar name={claimedBy?._id || ""} /> {username}
        </small>
      )}
      {(message || editMode) && (
        <textarea
          disabled={!editMode}
          onChange={(e) => setEditMessage(e.target.value)}
          placeholder="Description (Optional)"
          value={editMode ? editMessage : message}
        />
      )}
      <EditButton
        type="button"
        title={editMode ? "Save" : "Edit"}
        onClick={handleEdit}
      >
        {editMode ? "✅" : "✏️"}
      </EditButton>
      {!claimedByCurrentUser && claimedBy ? (
        <ConfirmButton
          onConfirm={handleSteal}
          pendingMessage="Click again to steal"
        >
          Steal
        </ConfirmButton>
      ) : (
        <button onClick={handleReleaseOrClaim} type="button">
          {claimedByCurrentUser ? `Release` : `Claim`}
        </button>
      )}
      {editMode && !claimedBy && (
        <ConfirmButton
          onConfirm={handleDelete}
          pendingMessage="Click again to delete"
          className="danger-button"
        >
          Delete
        </ConfirmButton>
      )}
    </ThingWrapper>
  );
};

export default ThingComponent;
