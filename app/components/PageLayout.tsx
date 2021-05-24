import styled from "styled-components";

const breakpoint = "600px";

const StyledPage = styled.div`
  display: grid;
  grid-template-columns: 0 1fr 0;

  > * {
    grid-column: 2 / span 1;
  }

  @media (min-width: ${breakpoint}) {
    grid-template-columns: 1fr ${breakpoint} 1fr;
  }
`;

const Page: React.FC = ({ children }) => <StyledPage>{children}</StyledPage>;

export default Page;
