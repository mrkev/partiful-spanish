export function datestrForDatetimeInput(date: Date) {
  var clone = new Date(date);
  clone.setMinutes(clone.getMinutes() - clone.getTimezoneOffset());
  return clone.toISOString().slice(0, 16);
}

export function formatTimeWithTimezone(date: Date): string {
  // Get localized time string
  const timeString = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Try to get the IANA time zone name
  const timeZone = Intl.DateTimeFormat(undefined, { timeZoneName: "short" })
    .formatToParts(date)
    .find((part) => part.type === "timeZoneName")?.value;

  return `${timeString.toLocaleLowerCase().replaceAll(" ", "")} ${timeZone ?? ""}`;
}

export function formatDateShort(date: Date): string {
  return date
    .toLocaleDateString(undefined, {
      weekday: "long", // full weekday name (e.g., Sunday)
      month: "long", // abbreviated month (e.g., Aug)
      day: "numeric", // day of the month
    })
    .replaceAll("De", "de");
}
