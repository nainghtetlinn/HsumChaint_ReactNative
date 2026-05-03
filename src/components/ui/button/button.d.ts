import type { VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { TouchableOpacityProps } from "react-native";
import { buttonVariants } from ".";

type ButtonProps = {
	title: string;
	leftIcon?: ReactNode;
	textClassName?: string;
} & VariantProps<typeof buttonVariants> &
	TouchableOpacityProps;
