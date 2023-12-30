declare namespace Navigation {
  type RootStackParams = {
    ChatListScreen: undefined;
    ChatDetailScreen: {
      chatList: Model.ChatList;
    };
    UserOrGroupDetailScreen: {
      id: string;
      isGroup: boolean;
    };
  };
  type Screen<
    Name extends keyof RootStackParams,
    Props = Record<string, unknown> | Record<string, never> | undefined
  > = (
    props: (import("@react-navigation/stack").StackScreenProps<RootStackParams, Name> & Props) | Record<string, never>
  ) => JSX.Element;
}
