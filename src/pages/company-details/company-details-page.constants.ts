export const OPTIONS = ['1', '5', '15', '30', '60', 'D', 'W', 'M'];

export const OPTIONS_TO_OPTIONS_STRING: Record<string, string> = {
  '1': '1 minute',
  '5': '5 minutes',
  '15': '15 minutes',
  '30': '30 minutes',
  '60': '60 minutes',
  D: 'Day',
  W: 'Week',
  M: 'Month',
};
