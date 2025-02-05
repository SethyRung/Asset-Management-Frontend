import dayjs from "dayjs";
import customeParseFormat from "dayjs/plugin/customParseFormat.js";

dayjs.extend(customeParseFormat);

const startOfDay = dayjs().startOf("day").toDate();
const endOfDay = dayjs().endOf("day").toDate();
const startOfMonth = dayjs().startOf("month").toDate();
const endOfMonth = dayjs().endOf("month").toDate();

const convertDateToString = (date: Date) => dayjs(date).format("YYYY-MM-DD");
const convertStringToDate = (date: string) =>
  dayjs(date, "YYYY-MM-DD").toDate();
const formatDate = (date: Date | string, format: string) =>
  dayjs(date).format(format);

export {
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
  convertDateToString,
  convertStringToDate,
  formatDate,
};
