import getDateDistance from "client-utils/getDateDistance";
import { useEffect, useState } from "react";

const useDateDistance = (date?: Date): string => {
  const [distance, setDistance] = useState("");

  useEffect(() => {
    if (!date) {
      return;
    }

    // api returns a datestring
    const asDate = new Date(date);

    // fire immediately
    const current = getDateDistance(asDate, new Date());
    setDistance(current);

    // fire every 5 seconds for short distances;
    // otherwise, fire every minute
    const interval = current.includes("seconds") ? 5 * 1000 : 60 * 1000;

    const t = window.setInterval(() => {
      // figure out new distance
      setDistance(getDateDistance(asDate, new Date()));
    }, interval);

    return () => {
      window.clearInterval(t);
    };
  }, [date]);

  return distance;
};

export default useDateDistance;
