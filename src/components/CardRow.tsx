import { PropsWithChildren } from "react";
import { GestureResponderEvent, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { commonStyles, variables } from "src/CommonStyles";

export interface CardRowProps {
  withBorder?: boolean;
  onPress?: () => void;
}

export const CardRow = ({ withBorder, children, onPress }: PropsWithChildren<CardRowProps>) => {
  const containerStyle: ViewStyle = { ...styles.container, ...(withBorder ? commonStyles.borderBottom : {}) };

  const onPressCard = (e: GestureResponderEvent) => {
    onPress && onPress();
    e.stopPropagation();
  };
  return (
    <TouchableOpacity disabled={!onPress} onPress={onPressCard} style={containerStyle}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: variables.baseSpacing,
    paddingHorizontal: variables.baseSpacing * 1.5,
  },
});
