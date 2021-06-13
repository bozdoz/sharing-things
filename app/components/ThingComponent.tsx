import useStore from "hooks/useStore";
import { Thing } from "models/types";
import { useCallback, useEffect, useState } from "react";
import { thingResource } from "resources";
import ThingClaimedBy from "./ThingClaimedBy";
import ConfirmButton from "./ConfirmButton";
import socket from "websocket/client-socket";
import StyledEditButton from "./styled/StyledEditButton";
import StyledThingWrapper from "./styled/StyledThingWrapper";
import StyledThingTitle from "./styled/StyledThingTitle";
import { userIdSelector } from "selectors/selectors";
import claimThing from "resources/claimThing";

const ThingComponent: React.FC<Thing> = ({
  _id: thing,
  title,
  message,
  claimedBy,
  claimed,
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

  const classNames = ["thing-component", editMode && "edit-mode"]
    .filter(Boolean)
    .join(" ");

  const titleValue = editMode ? editTitle : title;

  return (
    <StyledThingWrapper className={classNames}>
      <StyledThingTitle>
        <input
          type="text"
          onChange={(e) => setEditTitle(e.target.value)}
          value={titleValue}
          disabled={!editMode}
          placeholder="Name for Thing"
          maxLength={50}
          required
        />
      </StyledThingTitle>
      <ThingClaimedBy claimedBy={claimedBy} dateClaimed={claimed?.createdAt} />
      {(message || editMode) && (
        <textarea
          disabled={!editMode}
          onChange={(e) => setEditMessage(e.target.value)}
          placeholder="Description (Optional)"
          value={editMode ? editMessage : message}
        />
      )}
      <StyledEditButton
        type="button"
        title={editMode ? "Save" : "Edit"}
        onClick={handleEdit}
      >
        {editMode ? "✅" : "✏️"}
      </StyledEditButton>
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
    </StyledThingWrapper>
  );
};

export default ThingComponent;
