import useStore, { State } from "hooks/useStore";
import styled from "styled-components";
import UserName from "./UserName";

const Grid = styled.div`
  display: grid;
  opacity: 1;

  label {
    font-size: 0.8em;
    opacity: 0.8;
  }

  input[type="text"] {
    transition: all var(--anim);
  }

  &.is-saved {
    grid-template-areas:
      "header input"
      "label label";
    grid-template-columns: 160px 1fr;

    h2 {
      grid-area: header;
      align-self: center;
      padding: 0;
      font-size: 1em;
      margin: 0;
      color: var(--color-scale-light-grey);
    }

    .username-container {
      grid-area: input;
      margin: 0;
    }

    input[type="text"] {
      background: transparent;
      box-shadow: none;
      color: var(--color-scale-light-grey);
      margin-bottom: 0;
      padding-left: 0.4em;
      margin-left: -0.2em;
    }

    label {
      grid-area: label;
    }
  }
`;

const userIdSelector = (state: State) => state.userId;
const beWarnedSelector = (state: State) => state.beWarned;
const setBeWarnedSelector = (state: State) => state.setBeWarned;

const UserOptions: React.FC = () => {
  const userId = useStore(userIdSelector);
  const beWarned = useStore(beWarnedSelector);
  const setBeWarned = useStore(setBeWarnedSelector);
  const title = userId ? "Logged in as:" : "Who Are You? 👋";

  const className = ["user-options", userId && "is-saved"]
    .filter(Boolean)
    .join(" ");

  return (
    <Grid className={className}>
      <h2>{title}</h2>
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
