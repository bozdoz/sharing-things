import useDateDistance from "hooks/useDateDistance";
import { User } from "models/types";
import Avatar from "./Avatar";
import StyledClaimedBy from "./styled/StyledClaimedBy";

interface Props {
  claimedBy?: User | null;
  dateClaimed?: Date;
}

const ThingClaimedBy: React.FC<Props> = ({ claimedBy, dateClaimed }) => {
  const distance = useDateDistance(dateClaimed);

  if (!claimedBy) {
    return null;
  }

  return (
    <StyledClaimedBy>
      claimed by <Avatar name={claimedBy._id || ""} /> {claimedBy.name}{" "}
      <small className="distance">{distance}</small>
    </StyledClaimedBy>
  );
};

export default ThingClaimedBy;
