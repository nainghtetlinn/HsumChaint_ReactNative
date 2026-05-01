import { EventItem } from "@/components/space";
import { View } from "react-native";

const EventsTab = () => {
  return (
    <View className="gap-4">
      <EventItem />
      <EventItem />
      <EventItem />
    </View>
  );
};

export default EventsTab;
