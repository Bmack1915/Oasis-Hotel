import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  //Get number of days from the filter, which provides its value in the URL.
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  //Finds the date in which the query is from, i.e. from today until the number of days set in the filter
  const queryDate = subDays(new Date(), numDays).toISOString();

  //This can then be used in our api (via React Query)
  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${numDays}`],
  });

  //Guest may not show up, so stays only considered people who have arrived.
  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return { isLoading, stays, confirmedStays };
}
