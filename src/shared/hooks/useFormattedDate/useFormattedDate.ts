import { useMemo } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
const useFormattedDate = (isoDate: string) => {
  const formattedDate = useMemo(() => {
    try {
      const date = new Date(isoDate);
      return `${format(date, "d")} ${format(date, "LLLL", { locale: ru })} ${format(date, "HH:mm")}`;
    } catch (e) {
      console.error(e);
    }
  }, [isoDate]);

  return formattedDate;
};

export default useFormattedDate;
