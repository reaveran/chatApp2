import { Text, UnreadBadge, Avatar } from "@components";
import { getTimeText } from "@utils";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { variables, commonStyles } from "src/CommonStyles";

interface ChatRowProps {
  data: Model.ChatList;
  onPress: () => void;
}

export const ChatRow = ({ data, onPress }: ChatRowProps) => {
  const { from, photo, isGroup, groupName, lastMessage, createdAt, unreadMessageCount } = data;
  const title = isGroup && groupName ? groupName : from;
  const messagePreview = isGroup ? `${from}: ${lastMessage}` : lastMessage;
  const isUnreadMessage = unreadMessageCount > 0 ?? false;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Avatar url={photo} alt={data.from} />
      <View style={styles.messageContainer}>
        <View style={styles.messageDetailContainer}>
          <Text numberOfLines={1} type="subtitle1">
            {title}
          </Text>
          <Text numberOfLines={2} type="subtitle2">
            {messagePreview}
          </Text>
        </View>
        <View style={commonStyles.flexEnd}>
          <Text type="subtitle2" marginBottom color={isUnreadMessage ? "theme" : undefined}>
            {getTimeText(createdAt)}
          </Text>
          {isUnreadMessage && <UnreadBadge count={unreadMessageCount} />}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.row,
    ...commonStyles.borderBottom,
    padding: variables.baseSpacing,
    paddingLeft: 0,
    marginLeft: variables.baseSpacing,
    alignItems: "center",
  },
  messageContainer: {
    ...commonStyles.row,
    ...commonStyles.flex1,
    justifyContent: "space-between",
    paddingLeft: variables.baseSpacing,
  },
  messageDetailContainer: {
    ...commonStyles.flex1,
    paddingRight: variables.baseSpacing,
  },
});
