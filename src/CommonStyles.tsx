import { StyleSheet } from "react-native";

export const variables = {
  baseSpacing: 8,

  colorTheme: "#4287f5",
  colorWhite: "#FFFFFF",
  colorDarkGrey: "#545454",
  colorDarkGrey2: "#ededed",
  colorDarkGrey3: "#d6d6d6",
  colorRed: "#fa3737",
  colorGreenBackground: "#dcf8c6",
  colorDefaultBackground: "#fafafa",
};

export const colors = {
  theme: variables.colorTheme,
  white: variables.colorWhite,
  darkGrey: variables.colorDarkGrey,
  darkGrey2: variables.colorDarkGrey2,
  darkGrey3: variables.colorDarkGrey3,
  red: variables.colorRed,
};

export type Colors = keyof typeof colors;

export const commonStyles = StyleSheet.create({
  fullSize: {
    height: "100%",
    width: "100%",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  alignCenter: {
    flex: 1,
    alignItems: "center",
  },
  paddingHorizontalBase: {
    paddingHorizontal: variables.baseSpacing,
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  flex1: {
    flex: 1,
  },
  flexEnd: {
    alignItems: "flex-end",
  },
  flexStart: {
    alignItems: "flex-start",
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: variables.colorDarkGrey2,
  },
  border: {
    borderWidth: 1,
    borderColor: variables.colorDarkGrey2,
  },
  paddingBase: {
    padding: variables.baseSpacing,
  },
  marginTop2Base: {
    marginTop: variables.baseSpacing * 2,
  },
  marginBottom2Base: {
    marginBottom: variables.baseSpacing * 2,
  },
  marginTop: {
    marginTop: variables.baseSpacing,
  },
  marginBottom: {
    marginBottom: variables.baseSpacing,
  },
  marginRight: {
    marginRight: variables.baseSpacing,
  },
});
