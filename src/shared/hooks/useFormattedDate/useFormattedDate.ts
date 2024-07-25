import { useMemo } from "react";
import { format } from "date-fns";
import { monthsInGenitive } from "../../constants/useFormattedDateConsts";

const useFormattedDate = (isoDate: string) => {
  const formattedDate = useMemo(() => {
    const date = new Date(isoDate);
    const day = format(date, "d");
    const month = monthsInGenitive[date.getMonth()];
    const time = format(date, "HH:mm");

    return `${day} ${month} ${time}`;
  }, [isoDate]);

  return formattedDate;
};

export default useFormattedDate;
