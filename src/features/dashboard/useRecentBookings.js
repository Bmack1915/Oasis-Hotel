import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  //Get number of days from the filter, which provides its value in the URL.
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  //Finds the date in which the query is from, i.e. from today until the number of days set in the filter
  const queryDate = subDays(new Date(), numDays).toISOString();

  //This can then be used in our api (via React Query)
  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${numDays}`],
  });

  return { isLoading, bookings };
}
