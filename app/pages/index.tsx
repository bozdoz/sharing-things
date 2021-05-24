//TODO: API for creating/updating users?

import Usage from "components/Usage";
import { useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const Home: React.FC = () => {
  const [name, setName] = useLocalStorage("username");
  const [beWarned, setBeWarned] = useLocalStorage("beWarned", "true");
  const UsageMemo = useMemo(() => {
    return <Usage />;
  }, []);

  return (
    <>
      <div>
        <h2>1. Who Are You? 👋</h2>
      </div>
      <div>
        <input
          type="text"
          placeholder="Your Name"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={beWarned === "true"}
            onChange={(e) => setBeWarned(e.target.checked ? "true" : "false")}
          />
          I want to be warned before closing the page
        </label>
      </div>
      {UsageMemo}
    </>
  );
};

export default Home;
