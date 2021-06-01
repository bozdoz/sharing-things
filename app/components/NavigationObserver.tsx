import { Thing } from "models/types";
import useStore, { State } from "hooks/useStore";
import { useEffect } from "react";
import useSWR from "swr";
import api from "utils/api";

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
  const userId = useStore(userIdSelector);
  const beWarned = useStore(warnedSelector);
  const { data } = useSWR<APIResponse>("/api/v1/thing/list", api);
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

      // TODO no matter what, set user to inactive
      // This might need to be handled in websockets
    };

    window.addEventListener("beforeunload", userExitsPage);

    return () => {
      window.removeEventListener("beforeunload", userExitsPage);
    };
  }, [userId, beWarned, userHasClaim]);

  return null;
};

export default NavigationObserver;
