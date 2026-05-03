import { Link as ExpoLink, type LinkProps } from "expo-router";
import { cn } from "@/lib/utils";

export const Link = ({ className, ...props }: LinkProps) => {
  return (
    <ExpoLink className={cn(className, "underline text-orange-500 text-sm leading-5")} {...props} />
  );
};
