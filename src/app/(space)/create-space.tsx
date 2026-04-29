import { SpaceForm } from "@/components/space";
import { View } from "react-native";

const CreateSpaceScreen = () => {
  return (
    <View className="bg-natural-white flex-1">
      <SpaceForm submitLabel="Create Space" onSubmit={(data) => console.log(data)} />
    </View>
  );
};

export default CreateSpaceScreen;
