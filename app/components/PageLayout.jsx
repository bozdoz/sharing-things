import styled from "styled-components";

const StyledPage = styled.div`
  background: #def;
`;

const Page = ({ children = null }) => <StyledPage>{children}</StyledPage>;

export default Page;
