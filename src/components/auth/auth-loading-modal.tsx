import { ActivityIndicator, Modal, View } from "react-native";
import { Text } from "../ui/text";

type Props = {
  show: boolean;
  title?: string;
};

export const AuthLoadingModal = ({ show, title = "Please wait..." }: Props) => {
  return (
    <Modal visible={show} transparent animationType="fade" statusBarTranslucent>
      <View className="flex-1 items-center justify-center bg-natural-black/40 px-6">
        <View className="w-full max-w-sm items-center rounded-3xl bg-natural-white px-6 py-8">
          <ActivityIndicator size="large" color="#aa7e3a" />
          <Text title={title} className="pt-4 text-center" weight="medium" />
        </View>
      </View>
    </Modal>
  );
};
