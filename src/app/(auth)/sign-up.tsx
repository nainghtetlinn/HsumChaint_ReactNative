import images from "@assets/images";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { AuthLoadingModal } from "@/components/auth";
import { Button } from "@/components/ui/button";
import { FormInputField } from "@/components/ui/form";
import { Image } from "@/components/ui/image";
import { Link } from "@/components/ui/link";
import { HeaderTemplate } from "@/components/ui/template";
import { Text } from "@/components/ui/text";
import { useSignUp } from "@/hooks/auth/use-sign-up";

type Params = {
  role?: "user" | "monk";
};

const SignUpScreen = () => {
  const { role } = useLocalSearchParams<Params>();
  const registerRole = role ?? "monk";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { form, handleSubmit, isPending } = useSignUp(registerRole);
  return (
    <HeaderTemplate
      templateClassName="pt-safe pb-0"
      headerTitle="Register"
      scrollable
      childClassName="pb-safe-offset-10"
    >
      <AuthLoadingModal show={isPending} title="Creating account..." />
      <View className="py-[18px] items-center justify-center">
        <Image className="w-24 h-28" source={images.thaBate} />
      </View>
      <View className="gap-4">
        <Text title="Account Information" variant="label1" weight="bold" />
        <FormInputField
          control={form.control}
          name="phoneNo"
          required
          label="Phone Number"
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
        />
        <FormInputField
          required
          control={form.control}
          name="username"
          label="Username"
          placeholder="Set your username"
        />
        <FormInputField
          required
          control={form.control}
          name="password"
          label="Password"
          placeholder="Set your password"
          secureTextEntry={!showPassword}
          rightIcon={<Image source={images.eye} className="h-4 w-4" />}
          rightIconButtonProps={{
            onPress: () => setShowPassword((prev) => !prev),
          }}
        />
        <FormInputField
          required
          control={form.control}
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          secureTextEntry={!showConfirmPassword}
          rightIcon={<Image source={images.eye} className="h-4 w-4" />}
          rightIconButtonProps={{
            onPress: () => setShowConfirmPassword((prev) => !prev),
          }}
        />

        {registerRole !== "user" && (
          <>
            <Text title="Monastery Information" variant="label1" weight="bold" />
            <FormInputField
              required
              control={form.control}
              name="monasteryName"
              label="Monastery Name"
              placeholder="Enter your monastery name"
            />
            <FormInputField
              required
              control={form.control}
              name="monasteryAddress"
              label="Monastery Address"
              placeholder="Enter your monastery address"
            />
          </>
        )}

        <Text title="Contact Information" variant="label1" weight="bold" />
        <FormInputField
          optional
          control={form.control}
          name="email"
          label="Email Address"
          placeholder="Enter your email address"
          keyboardType="email-address"
        />
        <FormInputField
          optional
          control={form.control}
          name="contactPhoneNo"
          label="Phone Number"
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
        />
        <View className="py-5">
          <Button title="Register" onPress={handleSubmit} disabled={isPending} />
        </View>
        <View className="flex-row items-center justify-center gap-2 pt-7 pb-safe-offset-4">
          <Text title="Already have an account?" />
          <Link href={"/(auth)/login"}>
            <Text className={"underline text-orange-500 text-sm leading-5"} title="Login" />
          </Link>
        </View>
      </View>
    </HeaderTemplate>
  );
};

export default SignUpScreen;
