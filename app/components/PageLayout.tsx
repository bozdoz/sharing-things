import styled from "styled-components";

const breakpoint = "600px";

const StyledPage = styled.div`
  display: grid;
  grid-template-columns: 1em 1fr 1em;

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

const PageLayout: React.FC = ({ children }) => (
  <StyledPage>
    <div id="header-image" aria-label="Sharing Things" />
    {children}
  </StyledPage>
);

export default PageLayout;
