export const parseMatchToUTC = (timeString: string, dateString: string) => {
  const match = timeString.match(/(\d{2}):(\d{2})\s*UTC([+-]\d+)/);
  if (!match) return new Date(dateString);

  const [, hour, minute, offsetStr] = match;
  const utcHour = parseInt(hour) - parseInt(offsetStr);

  const [year, month, day] = dateString.split("-").map(Number);

  return new Date(Date.UTC(year, month - 1, day, utcHour, parseInt(minute)));
};
