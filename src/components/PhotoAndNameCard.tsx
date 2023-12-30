import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { commonStyles, variables } from "src/CommonStyles";
import { Avatar, Text } from "@components";

export interface PhotoAndNameCardProps {
  photo?: string;
  name: string;
  subtitle?: string;
  onPress?: () => void;
}

export const PhotoAndNameCard = ({ photo, name, subtitle, onPress }: PhotoAndNameCardProps) => {
  return (
    <TouchableOpacity style={styles.container} disabled={!onPress} onPress={onPress}>
      <Avatar url={photo} alt={name} size="small" />
      <View style={styles.titleContainer}>
        <Text numberOfLines={1} type="subtitle1">
          {name}
        </Text>
        {subtitle && (
          <Text numberOfLines={1} type="subtitle3">
            {subtitle}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.row,
  },
  titleContainer: {
    paddingLeft: variables.baseSpacing,
    flex: 1,
    justifyContent: "center",
  },
});
