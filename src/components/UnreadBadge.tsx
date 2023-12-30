import { Text } from "@components";
import { StyleSheet, View } from "react-native";
import { variables } from "src/CommonStyles";

export interface UnreadBadgeProps {
  count: number;
}

export const UnreadBadge = ({ count }: UnreadBadgeProps) => {
  return (
    <View style={styles.badgeContainer}>
      <Text type="subtitle3" color="white">
        {count}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    backgroundColor: variables.colorTheme,
    borderRadius: 50,
    paddingRight: variables.baseSpacing / 2,
    paddingLeft: variables.baseSpacing / 2,
  },
});
