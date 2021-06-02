import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { thingResource } from "resources";

const Wrapper = styled.div<{ isLoading: boolean }>`
  box-shadow: ${(props) =>
    props.isLoading ? `inset rgba(0,0,0,0.3) -1000px -1000px` : `none`};
`;

const AddThing: React.FC = () => {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  const handleToggleForm = useCallback(() => {
    setIsCreating(false);
    setFormState("");
  }, []);

  const handleCreate = useCallback(async () => {
    setIsLoading(true);
    try {
      if (title) {
        await thingResource.create({
          title,
          message,
          namespace: router.asPath,
        });

        // reset form
        setTitle("");
        setMessage("");
        handleToggleForm();
      } else {
        setFormState("Title is required");
      }
    } catch (e) {
      console.error(e);
      setFormState("Submission failed");
    } finally {
      setIsLoading(false);
    }
  }, [title, message, handleToggleForm, router.asPath]);

  if (!isCreating) {
    return (
      <button
        onClick={() => {
          setIsCreating(true);

          setTimeout(() => {
            // bring form fully into view
            formRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
            });

            // focus on first input
            formRef.current?.querySelector("input")?.focus();
          }, 50);
        }}
        type="button"
      >
        Create a Thing
      </button>
    );
  }

  return (
    <Wrapper isLoading={isLoading} ref={formRef}>
      <div>New Thing</div>
      {formState && <div>{formState}</div>}
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

      <button onClick={handleToggleForm} type="button">
        Cancel
      </button>
      <button className="primary-button" onClick={handleCreate} type="button">
        Create
      </button>
    </Wrapper>
  );
};

export default AddThing;
