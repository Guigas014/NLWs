// 18:00 (split) ["18", "00"] (map) [18, 00]

export function convertHourToMinutes (hourString: string) {
  const [hours, minutes] = hourString.split(":").map(Number) 

  const minutesAmount = (hours * 60) + minutes

  return minutesAmount;
}
