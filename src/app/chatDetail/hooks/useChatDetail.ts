// @ts-nocheck
import { chatApi } from "@api";
import { useInfiniteQuery } from "@tanstack/react-query";

const LIMIT = 20;

export type ChatMessageSectionListData = {
  title: string;
  sectionIndex: number;
  data: Model.ChatMessage[];
};

export const useChatDetail = (id: string) => {
  return useInfiniteQuery<unknown, unknown, ChatMessageSectionListData[]>({
    queryKey: ["chatMessageQuery", id],
    queryFn: ({ pageParam = 0 }: { pageParam: number }) =>
      chatApi.getChatDetail(id, { limit: LIMIT, offset: pageParam * LIMIT }),
    getNextPageParam: (lastPage, allPages) => {
      return !lastPage ? undefined : allPages.length;
    },
    select: (data: { pages: Array<Model.ChatMessage[]> }) => {
      const transformed = data.pages.flat();
      const result: ChatMessageSectionListData[] = [];
      let index = 0;
      transformed.forEach((message) => {
        const { userId } = message;

        const lastGroup = result[result.length - 1];

        if (!lastGroup || lastGroup.title !== userId) {
          result.push({
            title: userId,
            sectionIndex: index,
            data: [message],
          });
          index = index + 1;
        } else {
          lastGroup.data.push(message);
        }
      });
      return result;
    },
  });
};
