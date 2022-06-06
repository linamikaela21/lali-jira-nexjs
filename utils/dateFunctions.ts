import { formatDistanceToNow } from "date-fns";
import es from "date-fns/locale/es"

export const getFormatDistanceToNow = (date: number) => {
  const formatedDate = formatDistanceToNow(date, { locale: es });
  return `${formatedDate} ago.`;
};
