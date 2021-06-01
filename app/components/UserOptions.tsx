import useStore from "hooks/useStore";
import styled from "styled-components";
import UserName from "./UserName";

const Grid = styled.div`
  display: grid;
  opacity: 1;

  label {
    justify-content: flex-end;
  }
`;

const UserOptions: React.FC = () => {
  const beWarned = useStore((state) => state.beWarned);
  const setBeWarned = useStore((state) => state.setBeWarned);

  return (
    <Grid>
      <h2>Who Are You? 👋</h2>
      <UserName />
      <label>
        <input
          type="checkbox"
          checked={beWarned}
          onChange={(e) => setBeWarned(e.target.checked)}
        />
        Warn me before closing the page
      </label>
    </Grid>
  );
};

export default UserOptions;
