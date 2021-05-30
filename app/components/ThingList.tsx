import { Thing } from "models/Thing";
import useSWR from "swr";
import api from "utils/api";

interface APIResponse {
  success: boolean;
  data: Thing[];
}

const ThingList: React.FC = () => {
  const { data, error } = useSWR<APIResponse>("/api/v1/thing/list", api);

  if (!data) {
    return <div>loading...</div>;
  }

  if (error || !data.success) {
    console.error(error);
    return <div>failed to load</div>;
  }

  return (
    <>
      {data.data.map(({ _id, title, message }) => {
        return (
          <div key={_id}>
            <div>
              {title} <small>todo: claims</small>
            </div>
            <div>{message}</div>
            <div>
              <button type="button">CLAIM</button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ThingList;
