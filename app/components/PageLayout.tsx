import styled from "styled-components";
import HeaderImage from "./HeaderImage";

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

  #header-image {
    /* full-width header image */
    grid-column: 1 / span 3;
  }
`;

const Page: React.FC = ({ children }) => (
  <StyledPage>
    <HeaderImage />
    {children}
  </StyledPage>
);

export default Page;
