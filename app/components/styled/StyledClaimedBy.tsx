import styled from "styled-components";
import Avatar from "components/Avatar";

const StyledClaimedBy = styled.small`
  ${Avatar} {
    --size: 16px;
    --delay: 0;
    margin-left: 6px;
    margin-right: 2px;
    margin-bottom: -2px;
  }

  .distance {
    margin-left: 0.4em;
    opacity: 0.8;
  }
`;

export default StyledClaimedBy;
