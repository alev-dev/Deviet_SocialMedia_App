import { useEffect, useState } from "react";

const DAT_UNITS = [
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
];

const getDateDiffs = (timestamp) => {
  const now = Date.now();
  const elapsed = (timestamp - now) / 1000;
  for (const [unit, secondsUnit] of DAT_UNITS) {
    if (Math.abs(elapsed) > secondsUnit || unit === "second") {
      const value = Math.round(elapsed / secondsUnit);
      return { value, unit };
    }
  }
};

export default function useTimeAgo(timestamp) {
  const [timeago, settimeago] = useState(() => getDateDiffs(timestamp));

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeAgo = getDateDiffs(timestamp);
      settimeago(newTimeAgo);
    }, 20000);

    return () => clearInterval(interval);
  }, [timestamp]);

  const rtf = new Intl.RelativeTimeFormat("es", {
    style: "short",
  });
  const { value, unit } = timeago;

  return rtf.format(value, unit);
}
