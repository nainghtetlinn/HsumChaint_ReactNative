import type { VariantProps } from "class-variance-authority";
import type { TextProps as RNTextProps } from "react-native";
import { textVariants } from ".";

export type TextProps = {
	title: string;
} & VariantProps<typeof textVariants> &
	RNTextProps;
