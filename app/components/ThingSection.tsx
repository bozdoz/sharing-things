import useUserStore from "hooks/useUserStore";
import styled from "styled-components";
import AddThing from "./AddThing";
import ThingList from "./ThingList";

const Wrapper = styled.div<{ disabled: boolean }>`
  opacity: ${(props) => (props.disabled ? 0.2 : 1)};
  transition: opacity var(--anim) var(--delay);
`;

const Usage: React.FC = () => {
  const name = useUserStore((state) => state.name);

  return (
    <Wrapper disabled={!name}>
      <h2>2. What Thing do you want to claim? 🤷‍♀️</h2>
      <fieldset disabled={!name}>
        <ThingList />
        <AddThing />
      </fieldset>
    </Wrapper>
  );
};

export default Usage;
