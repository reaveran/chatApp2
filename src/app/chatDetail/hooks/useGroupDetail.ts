import { chatApi } from "@api";
import { useQuery } from "@tanstack/react-query";

export const useGroupDetail = ({ id, enabled = false }: { id: string; enabled: boolean }) =>
  useQuery({
    queryKey: ["groupDetailQuery", id],
    queryFn: () => chatApi.getGroupDetail(id),
    enabled: enabled,
  });
