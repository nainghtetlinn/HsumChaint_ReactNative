import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { getApiErrorMessage } from "@/lib/api-error";
import { type ForgotPasswordForm, forgotPasswordSchema } from "@/schemas/forgot-password-schema";
import { forgotPassword } from "@/services/forgot-password";

export const useForgotPassword = () => {
  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      phoneNo: "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (response) => {
      router.navigate({
        pathname: "/(auth)/new-password",
        params: { resetToken: response.data.rawResetToken },
      });
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Reset failed",
        text2: getApiErrorMessage(error),
        visibilityTime: 5000,
      });
    },
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    try {
      await mutateAsync(data);
    } catch {
      // The mutation's onError handler already shows the user-facing toast.
    }
  };
  const handleSubmit = form.handleSubmit(onSubmit);

  return {
    form,
    handleSubmit,
    isPending,
  };
};
