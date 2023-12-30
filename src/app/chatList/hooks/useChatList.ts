import { chatApi } from "@api";
import { useQuery } from "@tanstack/react-query";

export const useChatList = () =>
  useQuery({
    queryKey: ["chatListQuery"],
    queryFn: () => chatApi.getChatList(),
  });
