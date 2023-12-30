import { PropsWithChildren } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { variables } from "src/CommonStyles";

export interface CardProps {
  style?: ViewStyle;
}

export const Card = ({ style, children }: PropsWithChildren<CardProps>) => {
  const containerStyle: ViewStyle = { ...styles.container, ...style };
  return <View style={containerStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: variables.colorWhite,
    borderRadius: variables.baseSpacing,
  },
});
