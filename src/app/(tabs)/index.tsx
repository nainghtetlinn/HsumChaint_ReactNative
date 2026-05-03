import images from "@assets/images";
import { router } from "expo-router";
import { View } from "react-native";
import { Button } from "@/components/ui/button";
import { DefaultTemplate } from "@/components/ui/template";
import { Text } from "@/components/ui/text";
import { useAuthUser } from "@/stores/auth-user";

export default function HomeScreen() {
  const user = useAuthUser((state) => state.user);
  const clearSession = useAuthUser((state) => state.clearSession);

  const handleLogout = () => {
    clearSession();
    router.replace("/(auth)" as never);
  };

  return (
    <DefaultTemplate bgImage={images.bgFrame1} className="justify-center">
      <View className="gap-4 rounded-3xl bg-natural-white/90 p-6">
        <Text title="Home" variant="h4" weight="bold" />
        <Text
          title={user ? `Welcome, ${user.username}` : "Welcome to Hsum Chaint"}
          variant="body1"
          weight="medium"
        />
        {user ? (
          <Text title={`Phone: ${user.phone} | Role: ${user.userType}`} className="opacity-70" />
        ) : null}
        <Button title="Logout" variant="outline" onPress={handleLogout} />
      </View>
    </DefaultTemplate>
  );
}
