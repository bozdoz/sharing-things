import { Thing } from "models/types";
import useSWR from "swr";
import api from "utils/api";
import ThingComponent from "./ThingComponent";

interface APIResponse {
  success: boolean;
  data: Thing[];
}

const ThingList: React.FC = () => {
  const { data, error } = useSWR<APIResponse>("/api/v1/thing/list", api);

  if (!data) {
    // TODO: skeleton
    return <div>loading...</div>;
  }

  if (error || !data.success) {
    console.error(error);
    return <div>failed to load</div>;
  }

  return (
    <>
      {data.data.map((props) => (
        <ThingComponent key={props._id} {...props} />
      ))}
    </>
  );
};

export default ThingList;
