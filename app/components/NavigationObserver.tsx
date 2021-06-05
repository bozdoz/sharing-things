import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Thing } from "models/types";
import useStore, { State } from "hooks/useStore";
import api from "resources/api";
import useSocket from "hooks/useSocket";

const userIdSelector = (state: State) => state.userId;
const warnedSelector = (state: State) => state.beWarned;

interface APIResponse {
  success: boolean;
  data: Thing[];
}

/**
 * Watches for navigation
 *
 * warns if user navigates away with an active claim
 * sets user to active/inactive on entry/exit
 */
const NavigationObserver: React.FC = () => {
  const socket = useSocket();
  const router = useRouter();
  const userId = useStore(userIdSelector);
  const beWarned = useStore(warnedSelector);
  const { data } = useSWR<APIResponse>(
    `/api/v1/thing/list?namespace=${router.asPath}`,
    api
  );
  const userHasClaim = data?.data.some(
    ({ claim }) => claim?.user._id === userId
  );

  useEffect(() => {
    const userExitsPage = (e: BeforeUnloadEvent) => {
      if (beWarned && userHasClaim) {
        e.preventDefault();
        e.returnValue =
          "You have active claims; are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", userExitsPage);

    return () => {
      window.removeEventListener("beforeunload", userExitsPage);
    };
  }, [userId, beWarned, userHasClaim]);

  useEffect(() => {
    if (socket && userId) {
      // set user to active on load
      const onConnect = () => {
        console.log("client connect");
        // send userId to server for updating db
        socket.emit("set active user", userId);
      };
      socket.on("connect", onConnect);

      return () => {
        socket.off("connect", onConnect);
      };
    }
  }, [socket, userId]);

  // observers don't render anything
  return null;
};

export default NavigationObserver;
