import useUserStore from "hooks/useUserStore";
import styled from "styled-components";
import Avatar from "./Avatar";

const Grid = styled.div`
  display: grid;
  margin: 0 3.2em;
`;

// workflow:
// // 1. has name
// 2. creates server
// 3. claims server
// 4. handles beforeonleave/active state
// 5.
const UserName: React.FC = () => {
  const { name, setName } = useUserStore();

  return (
    <Grid>
      <Avatar name={name} />
      <input
        type="text"
        placeholder="Your Name"
        aria-label="Your Name"
        value={name || ""}
        onChange={(e) => setName(e.target.value)}
        onFocus={(e) => e.target.select()}
        maxLength={50}
      />
    </Grid>
  );
};

export default UserName;
