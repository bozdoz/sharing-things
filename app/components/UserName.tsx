import useStore from "hooks/useStore";
import Avatar from "./Avatar";

// workflow:
// // 1. has name
// 2. creates server
// 3. claims server
// 4. handles beforeonleave/active state
// 5.
const UserName: React.FC = () => {
  const { name, setName } = useStore();

  return (
    <>
      <Avatar name={name} />
      <input
        type="text"
        placeholder="Your Name"
        aria-label="Your Name"
        value={name || ""}
        onChange={(e) => setName(e.target.value)}
        onFocus={(e) => e.target.select()}
      />
    </>
  );
};

export default UserName;
