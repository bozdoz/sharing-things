import useStore from "hooks/useStore";
import { nameEmptySelector } from "selectors/selectors";
import styled from "styled-components";
import AddThing from "./AddThing";
import ThingList from "./ThingList";

const Wrapper = styled.div<{ disabled: boolean }>`
  opacity: ${(props) => (props.disabled ? 0.2 : 1)};
  transition: opacity var(--anim) var(--delay);
`;

const ThingSection: React.FC = () => {
  const isNameEmpty = useStore(nameEmptySelector);

  return (
    <Wrapper disabled={isNameEmpty}>
      <h2>What Thing do you want to claim? 🤷‍♀️</h2>
      <fieldset disabled={isNameEmpty}>
        <ThingList />
        <AddThing />
      </fieldset>
    </Wrapper>
  );
};

export default ThingSection;
