import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Logout as LogoutAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: Logout, isLoading } = useMutation({
    mutationFn: () => LogoutAPI,
    mutationKey: ["logout"],
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/dashboard", { replace: true });
    },
  });

  return { Logout, isLoading };
}
