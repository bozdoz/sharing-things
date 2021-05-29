import { useState } from "react";

const AddServer: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [server, setServer] = useState("");
  const [message, setMessage] = useState("");

  if (!isCreating) {
    return (
      <button onClick={() => setIsCreating(true)} type="button">
        Create a Server
      </button>
    );
  }

  return (
    <>
      <div>New Server</div>
      <input
        type="text"
        value={server}
        onChange={(e) => setServer(e.target.value)}
        placeholder="Server Name"
        onFocus={(e) => e.target.select()}
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
      <button
        className="primary-button"
        onClick={() => setIsCreating(false)}
        type="button"
      >
        Create
      </button>
    </>
  );
};

export default AddServer;
