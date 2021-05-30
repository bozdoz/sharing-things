import useUserStore from "hooks/useUserStore";
import { useCallback, useState } from "react";
import { thingResource } from "resources";
import styled from "styled-components";

const Wrapper = styled.div<{ isLoading: boolean }>`
  box-shadow: ${(props) =>
    props.isLoading ? `inset rgba(0,0,0,0.3) -1000px -1000px` : `none`};
`;

const AddThing: React.FC = () => {
  const userId = useUserStore((state) => state.userId);
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = useCallback(async () => {
    setIsLoading(true);
    try {
      if (userId && title) {
        await thingResource.create({
          title,
          message,
          user: userId,
        });

        // reset form
        setIsCreating(false);
        setTitle("");
        setMessage("");
      } else {
        // TODO: message that fields are required
      }
    } catch (e) {
      console.error(e);
      // TODO: message that submission failed
    } finally {
      setIsLoading(false);
    }
  }, [userId, title, message]);

  if (!isCreating) {
    return (
      <button onClick={() => setIsCreating(true)} type="button">
        Create a Thing
      </button>
    );
  }

  return (
    <Wrapper isLoading={isLoading}>
      <div>New Thing</div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Thing Name"
        onFocus={(e) => e.target.select()}
        required
      />
      <br />

      <textarea
        placeholder="Message (Optional)"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        onFocus={(e) => e.target.select()}
      />
      <br />

      <button onClick={() => setIsCreating(false)} type="button">
        Cancel
      </button>
      <button className="primary-button" onClick={handleCreate} type="button">
        Create
      </button>
    </Wrapper>
  );
};

export default AddThing;
