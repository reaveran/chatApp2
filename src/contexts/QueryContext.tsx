import { PropsWithChildren } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type ReactQueryProviderProp = PropsWithChildren;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ globally default to 1 minutes
      // set it to a minimum of 1 minutes to deduplicate requests in that time frame
      staleTime: 60000,
    },
  },
});

export const QueryProvider = ({ children }: ReactQueryProviderProp) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
