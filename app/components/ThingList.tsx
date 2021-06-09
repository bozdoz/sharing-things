import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import { Thing } from "models/types";
import api from "resources/api";
import ThingComponent from "./ThingComponent";
import useSocket from "hooks/useSocket";
import { useEffect } from "react";

interface APIResponse {
  success: boolean;
  data: Thing[];
}

const ThingList: React.FC = () => {
  const router = useRouter();
  const socket = useSocket();
  const url = `/api/v1/thing/list?namespace=${router.asPath}`;
  const { data, error, isValidating } = useSWR<APIResponse>(url, api);

  // TODO: refactor this to be useSocketEffect or something more DRY
  useEffect(() => {
    if (socket) {
      const cb = () => {
        mutate(url);
      };

      socket.on("refresh things", cb);

      return () => {
        socket.off("refresh things", cb);
      };
    }
  }, [socket, url]);

  if (!data) {
    // TODO: skeleton
    return <div>loading...</div>;
  }

  if (error || !data.success) {
    console.error(error);
    return <div>failed to load</div>;
  }

  return (
    // TODO: loading style
    <div className={(isValidating && "loading") || undefined}>
      {data.data.map((props) => (
        <ThingComponent key={props._id} {...props} />
      ))}
    </div>
  );
};

export default ThingList;
