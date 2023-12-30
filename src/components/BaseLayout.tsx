import { Spinner, Text } from "@components";
import { PropsWithChildren } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors, colors, commonStyles, variables } from "src/CommonStyles";

const LEFT_RIGHT_HEADER_WIDTH = 25;
const HEADER_HEIGHT = 55;

export interface BaseLayoutProps {
  header?: React.ReactNode;
  headerText?: string;
  hideHeader?: boolean;
  leftHeader?: React.ReactNode;
  rightHeader?: React.ReactNode;
  isReady?: boolean;
  headerBackground?: Colors;
  footer?: React.ReactNode;
  backgroundColor?: Colors;
}

export const BaseLayout = (props: PropsWithChildren<BaseLayoutProps>) => {
  const { isReady, children, footer, backgroundColor, ...headerProps } = props;
  const { top } = useSafeAreaInsets();
  const containerStyles = {
    ...styles.container,
    ...(backgroundColor ? { backgroundColor: colors[backgroundColor] } : {}),
  };
  return (
    <View style={containerStyles}>
      <View style={{ height: top, backgroundColor: variables.colorDefaultBackground }} />
      <BaseLayoutHeader {...headerProps} />
      <BaseLayoutContent isReady={isReady}>{children}</BaseLayoutContent>
      {footer && <BaseLayoutFooter>{footer}</BaseLayoutFooter>}
    </View>
  );
};

const BaseLayoutContent = ({ children, isReady = true }: PropsWithChildren<BaseLayoutProps>) => {
  if (!isReady) {
    return (
      <View style={styles.contentSpinnerContainer}>
        <Spinner />
      </View>
    );
  }

  return <View style={styles.contentContainer}>{children}</View>;
};

const BaseLayoutHeader = ({
  hideHeader = false,
  header,
  headerText,
  leftHeader,
  rightHeader,
  headerBackground,
}: PropsWithChildren<BaseLayoutProps>) => {
  if (hideHeader) {
    return;
  }

  const headerStyle: ViewStyle = styles.headerContainer;

  if (headerBackground) {
    headerStyle.backgroundColor = colors[headerBackground];
  }

  return (
    <View>
      <View style={headerStyle}>
        <View style={styles.leftHeaderContainer}>{leftHeader}</View>

        <View style={styles.headerTitleContainer}>
          {header ? (
            header
          ) : (
            <Text numberOfLines={1} type="subtitle1" textAlign="center">
              {headerText || ""}
            </Text>
          )}
        </View>
        <View style={styles.rightHeaderContainer}>{rightHeader}</View>
      </View>
    </View>
  );
};

const BaseLayoutFooter = ({ children }: PropsWithChildren) => {
  const { bottom } = useSafeAreaInsets();
  return (
    <View>
      <View style={styles.footerContainer}>{children}</View>
      <View style={{ height: bottom, backgroundColor: variables.colorDefaultBackground }} />
    </View>
  );
};

const styles = StyleSheet.create({
  contentSpinnerContainer: {
    ...commonStyles.fullSize,
    ...commonStyles.center,
  },
  headerContainer: {
    padding: variables.baseSpacing,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: HEADER_HEIGHT,
    backgroundColor: variables.colorDefaultBackground,
  },
  headerTitleContainer: {
    flex: 1,
  },
  rightHeaderContainer: {
    alignItems: "flex-end",
    width: LEFT_RIGHT_HEADER_WIDTH,
  },
  leftHeaderContainer: {
    width: LEFT_RIGHT_HEADER_WIDTH,
    marginRight: variables.baseSpacing,
  },
  contentContainer: {
    flex: 1,
  },
  footerContainer: {
    backgroundColor: variables.colorDefaultBackground,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});
