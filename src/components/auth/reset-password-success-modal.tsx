import images from "@assets/images";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useRef } from "react";
import { View } from "react-native";
import { Button } from "../ui/button";
import { Image } from "../ui/image";
import { Text } from "../ui/text";

type Props = {
  show: boolean;
  close: () => void;
};
export const ResetPasswordSuccessModal = ({ show, close }: Props) => {
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
      console.log("handleSheetChanges", index);
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
      <BottomSheetView className="flex-1 items-center bg-natural-white px-5 pb-safe-offset-1">
        <View className="items-center justify-center w-20 h-20 mt-9 mb-4">
          <Image source={images.success} className="w-full h-full" />
        </View>
        <Text title="Password Reset Successful !" variant={"h6"} weight={"semibold"} />
        <View className="w-full pt-9">
          <Button title="Login Again" onPress={close} />
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};
