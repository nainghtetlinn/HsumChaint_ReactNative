import { Stack } from "expo-router";

const SpaceLayout = () => {
  return (
    <Stack screenOptions={{ headerTitleAlign: "center", headerShadowVisible: false }}>
      <Stack.Screen name="index" options={{ title: "Space" }} />
      <Stack.Screen name="create-space" options={{ title: "Create Space" }} />
      <Stack.Screen name="edit-space" options={{ title: "Edit Space Info" }} />
    </Stack>
  );
};

export default SpaceLayout;
