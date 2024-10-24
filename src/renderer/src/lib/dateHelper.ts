import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const convertStringToDate = (date: string | undefined | null): Date => {
  if (!date || !dayjs(date, "DD/MM/YYYY", true).isValid)
    return dayjs().toDate();
  else return dayjs(date, "DD/MM/YYYY", true).toDate();
};

const convertDateToString = (date: Date): string => {
  return dayjs(date).format("DD/MM/YYYY");
};

export { convertStringToDate, convertDateToString };
