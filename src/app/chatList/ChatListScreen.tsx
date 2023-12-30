import { BaseLayout, Text } from "@components";
import { FlatList, View } from "react-native";
import { useChatList } from "./hooks/useChatList";
import { ChatRow } from "./components/ChatRow";
import { commonStyles } from "src/CommonStyles";

export const ChatListScreen: Navigation.Screen<"ChatListScreen"> = (props) => {
  const { navigation } = props;
  const { data: chatListData, isFetched: isFetched } = useChatList();
  const onPress = (item: Model.ChatList) => {
    return navigation.navigate("ChatDetailScreen", { chatList: item });
  };

  return (
    <BaseLayout hideHeader isReady={isFetched}>
      <FlatList
        ListHeaderComponent={
          <View style={commonStyles.paddingBase}>
            <Text type="headline1">Chats</Text>
          </View>
        }
        data={chatListData}
        renderItem={({ item }) => <ChatRow onPress={() => onPress(item)} data={item} />}
        keyExtractor={(item) => item.id}
      />
    </BaseLayout>
  );
};
