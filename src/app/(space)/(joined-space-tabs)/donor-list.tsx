import { DonorItem } from "@/components/space";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import icons from "@assets/icons";
import { View } from "react-native";

const DonorListTab = () => {
  return (
    <View className="gap-4">
      <Button
        className="mb-4"
        variant={"outline"}
        leftIcon={<Image className="w-6 h-6" source={icons.plus} />}
        title="Create Donor List"
      />

      <DonorItem />
      <DonorItem />
    </View>
  );
};

export default DonorListTab;
