import styled from "styled-components";

const StyledThingComponentWrapper = styled.div`
  position: relative;
  background: rgba(12, 49, 73, 0.4);
  margin: 0.5em 0 2em;
  padding: 1em;
  border-radius: var(--border-radius);
  display: grid;
  gap: 0.4em;
  line-height: 1;

  > *:not(button) {
    margin-bottom: 0.2em;
  }

  input[type="text"] {
    width: calc(100% - 18px);
    font-size: 1.2em;
    font-weight: bold;
    padding: 0.4em;
    margin: -0.4em;
  }

  textarea {
    resize: none;
    padding: 0;
  }

  &.edit-mode textarea {
    resize: initial;
  }
`;

export default StyledThingComponentWrapper;
