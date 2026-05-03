import images from "@assets/images";
import { router } from "expo-router";
import type { PropsWithChildren } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { cn } from "@/lib/utils";
import { Image } from "../image";
import { Text } from "../text";
import { DefaultTemplate } from "./default-template";
import type { HeaderTemplateProps } from "./template";

export const HeaderTemplate = (props: PropsWithChildren<HeaderTemplateProps>) => {
  const {
    headerTitle,
    showBack = true,
    scrollable = false,
    headerClassName,
    childClassName,
    templateClassName,
    children,
    bgImage,
  } = props;

  const ChildView = scrollable ? ScrollView : View;

  return (
    <DefaultTemplate
      bgImage={bgImage ?? images.bgFrame2}
      className={cn("flex-1 px-safe-offset-0", templateClassName)}
    >
      <View
        className={cn("w-full flex-row items-center justify-between py-2 px-5", headerClassName)}
      >
        {showBack && (
          <Pressable
            style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
            onPress={() => router.back()}
          >
            <Image source={images.arrowLeft} className="w-6 h-6" />
          </Pressable>
        )}
        <Text variant={"h6"} weight={"bold"} title={headerTitle} />
        <View className="w-6 h-6" />
      </View>
      <ChildView
        showsVerticalScrollIndicator={false}
        className={cn("flex-1 px-safe-offset-5", childClassName)}
      >
        {children}
      </ChildView>
    </DefaultTemplate>
  );
};
