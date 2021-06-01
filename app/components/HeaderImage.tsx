import styled from "styled-components";

const Img = styled.img`
  width: 100%;
  object-fit: contain;
  height: 32vmax;
  max-height: 30vh;
  min-height: 150px;
`;

const HeaderImage = () => (
  <Img
    id="header-image"
    src="/sharing-things.png"
    alt="Sharing Things"
    width="1200"
    height="397"
  />
);

export default HeaderImage;
