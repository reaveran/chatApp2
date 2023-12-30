import { Text } from "@components";
import { useState } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { commonStyles, variables } from "src/CommonStyles";

export interface ChatMessageProps {
  data: Model.ChatMessage;
  isFirstMessage: boolean;
  isLastMessage: boolean;
  isGroup: boolean;
  isSelfMessage: boolean;
  isHighlighted?: boolean;
  onLongPress?: () => void;
  isActiveOption?: boolean;
}

export const ChatMessage = ({
  data,
  isLastMessage,
  isGroup,
  isSelfMessage,
  isHighlighted,
  onLongPress,
  isActiveOption,
}: ChatMessageProps) => {
  const bubbleStyle: ViewStyle = { ...styles.bubbleContainer, ...(isSelfMessage ? styles.selfContainer : {}) };

  return (
    <TouchableOpacity disabled={isActiveOption} onLongPress={onLongPress}>
      <View style={isSelfMessage ? commonStyles.flexEnd : commonStyles.flexStart}>
        <View style={bubbleStyle}>
          {isGroup && isLastMessage && !isSelfMessage && <Text color="theme">{data.name}</Text>}
          <View>
            <Text style={isHighlighted && { backgroundColor: "yellow" }}>{data.message}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bubbleContainer: {
    paddingHorizontal: variables.baseSpacing * 1.5,
    paddingVertical: variables.baseSpacing / 2,
    borderRadius: variables.baseSpacing,
    backgroundColor: variables.colorWhite,
    marginVertical: variables.baseSpacing / 2,
  },
  selfContainer: {
    backgroundColor: variables.colorGreenBackground,
  },
});
