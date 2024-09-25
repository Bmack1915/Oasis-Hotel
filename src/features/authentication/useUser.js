import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

//React Query for managing the user states.
export function useUser() {
  //We pass getCurrentUser (Gets the user session from supabase) into useQuery, which gives us the data and isLoading we can work with
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return { user, isLoading, isAuthenticated: user?.role === "authenticated" };
}
