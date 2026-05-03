import images from "@assets/images";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { AuthLoadingModal, ResetPasswordSuccessModal } from "@/components/auth";
import { Button } from "@/components/ui/button";
import { FormInputField } from "@/components/ui/form";
import { Image } from "@/components/ui/image";
import { HeaderTemplate } from "@/components/ui/template";
import { useNewPassword } from "@/hooks/auth";

type Params = {
  resetToken?: string;
};

const NewPasswordScreen = () => {
  const { resetToken } = useLocalSearchParams<Params>();
  const {
    form,
    handleSubmit,
    showPassword,
    showConfirmPassword,
    toggleShowPassword,
    toggleShowConfirmPassword,
    showSuccessModal,
    closeSuccessModal,
    isPending,
  } = useNewPassword(resetToken ?? "");
  return (
    <HeaderTemplate
      templateClassName="pt-safe pb-0"
      headerTitle="Forgot Password"
      childClassName="pb-safe-offset-6 flex-1 justify-between"
    >
      <AuthLoadingModal show={isPending} title="Resetting password..." />
      <View className="gap-4 pt-10">
        <FormInputField
          control={form.control}
          name="password"
          required
          label="Password"
          placeholder="Enter your password"
          secureTextEntry={!showPassword}
          rightIcon={<Image source={images.eye} className="h-4 w-4" />}
          rightIconButtonProps={{
            onPress: toggleShowPassword,
          }}
        />

        <FormInputField
          control={form.control}
          name="confirmPassword"
          required
          label="Confirm Password"
          placeholder="Enter your confirm password"
          secureTextEntry={!showConfirmPassword}
          rightIcon={<Image source={images.eye} className="h-4 w-4" />}
          rightIconButtonProps={{
            onPress: toggleShowConfirmPassword,
          }}
        />
      </View>
      <Button title="Save" onPress={handleSubmit} disabled={isPending} />
      <ResetPasswordSuccessModal show={showSuccessModal} close={closeSuccessModal} />
    </HeaderTemplate>
  );
};

export default NewPasswordScreen;
