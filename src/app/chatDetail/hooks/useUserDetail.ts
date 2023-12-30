import { chatApi } from "@api";
import { useQuery } from "@tanstack/react-query";

export const useUserDetail = ({ id, enabled = false }: { id: string; enabled: boolean }) =>
  useQuery({
    queryKey: ["userDetailQuery", id],
    queryFn: () => chatApi.getUserDetail(id),
    enabled: enabled,
  });
