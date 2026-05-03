import type { ImageSourcePropType, PropsWithChildren } from "react";
import { ViewProps } from "react-native";

type DefaultTemplateProps = PropsWithChildren<ViewProps> & {
	bgImage?: ImageSourcePropType;
};

type HeaderTemplateProps = DefaultTemplateProps & {
	headerTitle: string;
	showBack?: boolean;
	scrollable?: boolean;
	templateClassName?: string;
	headerClassName?: string;
	childClassName?: string;
};
