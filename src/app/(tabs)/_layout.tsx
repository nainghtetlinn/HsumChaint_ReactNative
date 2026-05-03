import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { HapticTab } from "@/components/ui/tab";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: "#aa7e3a",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
