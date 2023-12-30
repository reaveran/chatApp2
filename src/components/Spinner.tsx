import { ActivityIndicator, ActivityIndicatorProps } from "react-native";
import { variables } from "src/CommonStyles";

export interface SpinnerProps {
  isVisible?: boolean;
  size?: ActivityIndicatorProps["size"];
}

export const Spinner = ({ isVisible = true, size = "large" }: SpinnerProps) => {
  if (!isVisible) {
    return null;
  }

  return <ActivityIndicator animating size={size} color={variables.colorTheme} />;
};
