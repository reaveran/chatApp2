import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-ico-material-design";
import { variables } from "src/CommonStyles";

export interface ChatFooterProps {
  onPressSend: (value: string) => void;
}

export const ChatFooter = ({ onPressSend }: ChatFooterProps) => {
  const [text, onChangeText] = useState("");
  const onSend = () => {
    onPressSend(text);
    onChangeText("");
  };
  return (
    <View style={styles.footerContainer}>
      <TextInput style={styles.textInput} onChangeText={onChangeText} value={text} />
      <TouchableOpacity onPress={onSend}>
        <Icon name="send-button" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    padding: variables.baseSpacing,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    padding: 0,
    height: 25,
  },
});
