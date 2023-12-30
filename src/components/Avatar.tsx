import { Image, ImageStyle } from "react-native";

export interface AvatarProps {
  url?: string;
  size?: AvatarSize;
  alt: string;
}

export const AvatarSizeMapping = {
  extraSmall: 20,
  small: 35,
  medium: 50,
  large: 100,
};

export type AvatarSize = keyof typeof AvatarSizeMapping;

const defaultImage = require("@assets/images/default-pic.png");

export const Avatar = ({ url, size = "medium", alt }: AvatarProps) => {
  const imageStyle: ImageStyle = {
    width: AvatarSizeMapping[size],
    height: AvatarSizeMapping[size],
    borderRadius: AvatarSizeMapping[size],
    padding: 10,
  };

  const source = url ? { uri: url } : defaultImage;

  return <Image style={imageStyle} source={source} alt={alt} />;
};
