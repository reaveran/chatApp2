import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-ico-material-design";
import { commonStyles, variables } from "src/CommonStyles";

export interface ChatFooterSearchProps {
  onPressNext: () => void;
  onPressPrev: () => void;
  isAtFirstIndex?: boolean;
  isAtLastIndex?: boolean;
}

export const ChatFooterSearch = ({
  onPressNext,
  onPressPrev,
  isAtFirstIndex,
  isAtLastIndex,
}: ChatFooterSearchProps) => {
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity disabled={isAtLastIndex} onPress={onPressNext} style={commonStyles.marginRight}>
        <Icon name="expand-arrow" color={isAtLastIndex ? variables.colorDarkGrey : variables.colorTheme} />
      </TouchableOpacity>
      <TouchableOpacity disabled={isAtFirstIndex} onPress={onPressPrev}>
        <Icon name="expand-button" color={isAtFirstIndex ? variables.colorDarkGrey : variables.colorTheme} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    padding: variables.baseSpacing,
    display: "flex",
    flexDirection: "row",
  },
});
