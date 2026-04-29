import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { Text as RnText } from "react-native";
import type { TextProps } from "./text";

export const textVariants = cva("text-natural-black", {
  variants: {
    variant: {
      title1: "text-7xl",
      title2: "text-[64px]",
      title3: "text-[56px]",
      h1: "text-[56px]",
      h2: "text-[48px]",
      h3: "text-[40px]",
      h4: "text-[32px]",
      h5: "text-[24px]",
      h6: "text-[20px]",
      label1: "text-[16px]",
      label2: "text-[14px]",
      label3: "text-[12px]",
      body1: "text-[18px]",
      body2: "text-[16px]",
      body3: "text-[14px]",
      body4: "text-[12px]",
      caption1: "text-[10px]",
      caption2: "text-[9px]",
    },
    weight: {
      regular: "font-normal",
      medium: "font-medium",
      bold: "font-bold",
      semibold: "font-semibold",
    },
  },
  defaultVariants: {
    variant: "body2",
    weight: "regular",
  },
});

export const Text = ({ title, variant, weight, className, ...props }: TextProps) => {
  return (
    <RnText className={cn(textVariants({ variant, weight }), className)} {...props}>
      {title}
    </RnText>
  );
};
