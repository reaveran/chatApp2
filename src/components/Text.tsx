import { Text as RNText, TextProps as RNTextProps, StyleSheet, TextStyle } from "react-native";
import { Colors, colors, variables } from "src/CommonStyles";

export interface TextProps extends RNTextProps {
  type?: TextType;
  color?: Colors;
  marginBottom?: boolean;
  marginTop?: boolean;
  textAlign?: "center" | "left" | "right" | "auto";
}

export type TextType = "body" | "body2" | "headline1" | "headline2" | "subtitle1" | "subtitle2" | "subtitle3";

export type TextSignal = "normal" | "active";

export const Text = (props: TextProps) => {
  const { type = "body", color, marginBottom, marginTop, children, onPress, textAlign, ...rest } = props;

  const fontStyle = () => {
    switch (type) {
      case "headline1":
        return styles.headline1;
      case "subtitle1":
        return styles.subtitle1;
      case "subtitle2":
        return styles.subtitle2;
      case "subtitle3":
        return styles.subtitle3;
      default:
        return styles.body;
    }
  };

  const textStyle: TextStyle = {
    ...fontStyle(),
  };

  if (color) {
    textStyle.color = colors[color];
  }

  if (marginBottom) {
    textStyle.marginBottom = variables.baseSpacing / 2;
  }

  if (marginTop) {
    textStyle.marginTop = variables.baseSpacing / 2;
  }

  if (textAlign) {
    textStyle.textAlign = textAlign;
  }

  return (
    <RNText onPress={onPress} style={textStyle} {...rest}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  body: {
    fontSize: 16,
    lineHeight: 20,
  },
  headline1: {
    fontSize: 24,
    fontWeight: "600",
  },
  subtitle1: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "600",
  },
  subtitle2: {
    fontSize: 14,
    color: variables.colorDarkGrey,
  },
  subtitle3: {
    fontSize: 12,
    color: variables.colorDarkGrey,
  },
});
