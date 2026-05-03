import { View as RnView } from "react-native";
import { withUniwind } from "uniwind";
import { cn } from "@/lib/utils";
import { ImageBackground } from "../image";
import type { DefaultTemplateProps } from "./template";

export const DefaultTemplate = ({ children, className, ...props }: DefaultTemplateProps) => {
  const View = props.bgImage ? withUniwind(ImageBackground) : withUniwind(RnView);
  return (
    <View
      source={props.bgImage}
      className={cn("flex-1 px-safe-offset-5 py-safe", className)}
      {...props}
    >
      {children}
    </View>
  );
};
