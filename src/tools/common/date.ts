export const padTo2Digits = (num: string | number) =>
  num.toString().padStart(2, '0');

export const nowInSeconds = () => Math.round(Date.now() / 1000);

export const weekBeforeFromNowInSeconds = () => {
  const now = new Date();
  const weekBefore = now.setDate(now.getDate() - 7);
  return Math.round(weekBefore / 1000);
};

export const convertDateToUnix = (date: string) =>
  Math.round(new Date(date).getTime());

export const convertDateToUnixInSeconds = (date: string) =>
  Math.round(new Date(date).getTime() / 1000);

export const convertDateFromUnix = (unix: string) => {
  const date = new Date(Number(unix) * 1000);

  return `${date.getFullYear()}-${padTo2Digits(
    date.getMonth() + 1
  )}-${padTo2Digits(date.getDate())}`;
};
