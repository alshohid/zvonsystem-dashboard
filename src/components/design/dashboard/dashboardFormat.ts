export const formatCompactNumber = (value: number) =>
  new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);

export const formatReleaseDate = (isoDate: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(isoDate));

export const formatTodayHeading = (date: Date) => ({
  weekday: new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date),
  full: new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
  }).format(date),
});

export const getGreetingPeriod = (date: Date): "morning" | "afternoon" | "evening" => {
  const hours = date.getHours();

  if (hours < 12) {
    return "morning";
  }

  if (hours < 18) {
    return "afternoon";
  }

  return "evening";
};
