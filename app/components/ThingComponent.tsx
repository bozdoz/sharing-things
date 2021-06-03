import useStore, { State } from "hooks/useStore";
import { Thing } from "models/types";
import { useCallback, useState } from "react";
import styled from "styled-components";
import { claimResource, thingResource } from "resources";
import Avatar from "./Avatar";

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

const userIdSelector = (state: State) => state.userId;

const ThingComponent: React.FC<Thing> = ({
  _id: thing,
  title,
  message,
  claim,
}) => {
  const userId = useStore(userIdSelector);
  const [deletePending, setDeletePending] = useState(false);
  const claimedByCurrentUser = claim?.user._id === userId;
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editMessage, setEditMessage] = useState(message);

  const handleClaim = useCallback(async () => {
    if (claimedByCurrentUser) {
      // release
      await thingResource.update(thing, {
        claim: null,
      });
    } else if (userId) {
      const { _id: claim } = await claimResource.create({
        thing,
        user: userId,
      });

      await thingResource.update(thing, {
        claim,
      });
    }
  }, [userId, thing, claimedByCurrentUser]);

  const handleDelete = useCallback(async () => {
    if (deletePending) {
      await thingResource.delete(thing);
    } else {
      setDeletePending(true);

      window.setTimeout(() => {
        setDeletePending(false);
      }, 3000);
    }
  }, [deletePending, thing]);

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

  const username = claim?.user.name || "";

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
          maxLength={50}
        />{" "}
      </Title>
      {claim && (
        <small>
          claimed by <Avatar name={userId || ""} /> {username}
        </small>
      )}
      {message && (
        <textarea
          disabled={!editMode}
          onChange={(e) => setEditMessage(e.target.value)}
        >
          {editMode ? editMessage : message}
        </textarea>
      )}
      <EditButton
        type="button"
        title={editMode ? "Save" : "Edit"}
        onClick={handleEdit}
      >
        {editMode ? "✅" : "✏️"}
      </EditButton>
      <button onClick={handleClaim} type="button">
        {claimedByCurrentUser ? `Release` : `Claim`}
      </button>
      {editMode && (
        <button onClick={handleDelete} type="button" className="danger-button">
          {deletePending ? "Click again to delete" : "Delete"}
        </button>
      )}
    </ThingWrapper>
  );
};

export default ThingComponent;
