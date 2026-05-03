import images from "@assets/images";
import { router } from "expo-router";
import { View } from "react-native";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { DefaultTemplate } from "@/components/ui/template";
import { Text } from "@/components/ui/text";

const AuthScreen = () => {
  return (
    <DefaultTemplate bgImage={images.bgFrame1}>
      <View className="pt-14 w-full pb-20 justify-center items-center">
        <Image contentFit="cover" source={images.thaBate} className="w-20 h-24" />
        <View className="pt-[70px] gap-4">
          <Text className="text-center" title="Welcome" variant="h4" weight="bold" />
          <Text
            className="text-center opacity-70"
            title="Making meal donations simple and meaningful."
            variant="label1"
            weight="medium"
          />
        </View>
        <View className="w-full py-10 gap-4">
          <Button title="Login" onPress={() => router.navigate("/(auth)/login")} />
          <Button
            variant={"outline"}
            title="SignUp"
            onPress={() =>
              router.navigate({
                pathname: "/(auth)/sign-up",
                params: { role: "monk" },
              })
            }
          />
        </View>
      </View>
    </DefaultTemplate>
  );
};

export default AuthScreen;
