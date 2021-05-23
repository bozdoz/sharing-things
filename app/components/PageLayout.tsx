import styled from "styled-components";

const StyledPage = styled.div`
  background: #def;
`;

const Page: React.FC = ({ children }) => <StyledPage>{children}</StyledPage>;

export default Page;
