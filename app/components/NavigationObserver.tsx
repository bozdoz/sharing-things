import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Thing } from "models/types";
import useStore, { State } from "hooks/useStore";
import api from "resources/api";
import socket from "websocket/client-socket";

const userIdSelector = (state: State) => state.userId;
const warnedSelector = (state: State) => state.beWarned;

interface APIResponse {
  success: boolean;
  data: Thing[];
}

/**
 * Watches for navigation
 *
 * warns if user navigates away with an active claim (TODO: buggy)
 * sets user to active/inactive on entry/exit
 */
const NavigationObserver: React.FC = () => {
  const { asPath: namespace, isReady } = useRouter();
  const userId = useStore(userIdSelector);
  const beWarned = useStore(warnedSelector);
  const { data } = useSWR<APIResponse>(
    `/api/v1/thing/list?namespace=${namespace}`,
    api
  );
  const userHasClaim = data?.data.some(
    ({ claimedBy }) => claimedBy?._id === userId
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
    // without isReady, namespace initializes as the '[...slug]'
    // catch-all from the pages directory
    if (userId && isReady) {
      // send userId to server
      socket.emit("set active user", {
        userId,
        namespace,
      });
    }
  }, [userId, namespace, isReady]);

  // observers don't render anything
  return null;
};

export default NavigationObserver;
