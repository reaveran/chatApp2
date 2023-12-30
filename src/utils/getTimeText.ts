import moment from "moment";

export const getTimeText = (time: string) => {
  const today = moment().startOf("day");
  const date = moment(time).startOf("day");
  const yesterday = moment().subtract(1, "day").startOf("day");
  const lastWeek = moment().subtract(7, "days").startOf("day");

  if (date.isSame(today)) {
    return moment(time).format("HH:mm");
  } else if (date.isSame(yesterday)) {
    return "Yesterday";
  } else if (date.isAfter(lastWeek)) {
    return moment(time).format("dddd");
  } else {
    return moment(time).format("DD/MM/YYYY");
  }
};
