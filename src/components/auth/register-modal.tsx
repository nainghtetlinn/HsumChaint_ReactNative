import images from "@assets/images";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { useCallback, useEffect, useRef } from "react";
import { Pressable, View } from "react-native";
import { Image } from "../ui/image";
import { Text } from "../ui/text";

type Props = {
  show: boolean;
  close: () => void;
};
export const RegisterModal = ({ show, close }: Props) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (show) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.dismiss();
    }
  }, [show]);

  // callbacks
  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        close();
      }
    },
    [close],
  );
  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      backgroundStyle={{
        borderTopEndRadius: 24,
        borderTopStartRadius: 24,
      }}
    >
      <BottomSheetView className="flex-1 items-center px-5 pb-safe-offset-1">
        <Text className="py-4" variant={"h6"} weight={"semibold"} title="Register as" />

        <View className="flex-row items-center justify-between w-full">
          <Pressable
            onPress={() => {
              close();
              router.navigate({
                pathname: "/(auth)/sign-up",
                params: { role: "user" },
              });
            }}
            className="active:opacity-50 border-gray-500 py-9 px-16 border items-center justify-center gap-4 rounded-4xl"
          >
            <View className="w-10 h-10 items-center justify-center">
              <Image source={images.user} className="w-full h-full" />
            </View>
            <Text title="User" />
          </Pressable>

          <Pressable
            onPress={() => {
              close();
              router.navigate({
                pathname: "/(auth)/sign-up",
                params: { role: "monk" },
              });
            }}
            className="py-9 active:opacity-50 border-gray-500 px-16 border items-center justify-center gap-4 rounded-4xl"
          >
            <View className="w-10 h-10 items-center justify-center">
              <Image source={images.monk} className="w-full h-full" />
            </View>
            <Text title="Monk" />
          </Pressable>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};
