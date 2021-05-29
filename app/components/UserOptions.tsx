import useStore from "hooks/useStore";
import UserName from "./UserName";

const UserOptions: React.FC = () => {
  const beWarned = useStore((state) => state.beWarned);
  const setBeWarned = useStore((state) => state.setBeWarned);

  return (
    <>
      <div>
        <h2>1. Who Are You? 👋</h2>
      </div>
      <div>
        <UserName />
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
    </>
  );
};

export default UserOptions;
