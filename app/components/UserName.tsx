import useStore from "hooks/useStore";
import styled from "styled-components";
import Avatar from "./Avatar";

const Grid = styled.div`
  display: grid;
  margin: 0 3.2em;
  align-items: center;
  grid-template-columns: 1em 1fr;

  ${Avatar} {
    margin-left: -1em;
  }
`;

// workflow:
// // 1. has name
// 2. creates server
// 3. claims server
// 4. handles beforeonleave/active state
// 5.
const UserName: React.FC = () => {
  const { name, setName, userId } = useStore();

  return (
    <Grid className="username-container">
      <Avatar name={userId || ""} />
      <input
        type="text"
        placeholder="Your Name"
        aria-label="Your Name"
        value={name || ""}
        onChange={(e) => setName(e.target.value)}
        maxLength={50}
      />
    </Grid>
  );
};

export default UserName;
