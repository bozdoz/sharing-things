//TODO: API for creating/updating users?

import Usage from "components/Usage";
import useStore from "hooks/useStore";
import { useMemo } from "react";

const Home: React.FC = () => {
  const name = useStore((state) => state.name);
  const setName = useStore((state) => state.setName);
  const beWarned = useStore((state) => state.beWarned);
  const setBeWarned = useStore((state) => state.setBeWarned);
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
          onFocus={(e) => e.target.select()}
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={beWarned}
            onChange={(e) => setBeWarned(e.target.checked)}
          />
          I want to be warned before closing the page
        </label>
      </div>
      {UsageMemo}
    </>
  );
};

export default Home;
