import { View } from "react-native";
import { AuthLoadingModal } from "@/components/auth";
import { Button } from "@/components/ui/button";
import { FormInputField } from "@/components/ui/form";
import { HeaderTemplate } from "@/components/ui/template";
import { Text } from "@/components/ui/text";
import { useForgotPassword } from "@/hooks/auth";

const ForgotPasswordScreen = () => {
  const { form, handleSubmit, isPending } = useForgotPassword();
  return (
    <HeaderTemplate
      templateClassName="pt-safe pb-0"
      headerTitle="Forgot Password"
      childClassName="pb-safe-offset-6 flex-1 justify-between"
    >
      <AuthLoadingModal show={isPending} title="Verifying phone number..." />
      <View className="gap-4 pt-10">
        <FormInputField
          control={form.control}
          name="phoneNo"
          required
          label="Phone Number"
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
        />

        <Text
          title="Please enter the phone number you used when creating your account"
          variant="body2"
        />
      </View>
      <Button title="Verify Phone Number" onPress={handleSubmit} disabled={isPending} />
    </HeaderTemplate>
  );
};

export default ForgotPasswordScreen;
