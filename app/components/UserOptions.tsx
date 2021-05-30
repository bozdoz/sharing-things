import useUserStore from "hooks/useUserStore";
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
  const beWarned = useUserStore((state) => state.beWarned);
  const setBeWarned = useUserStore((state) => state.setBeWarned);

  return (
    <Grid>
      <h2>1. Who Are You? 👋</h2>
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
