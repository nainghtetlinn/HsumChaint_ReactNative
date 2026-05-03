import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { getApiErrorMessage } from "@/lib/api-error";
import { type NewPasswordForm, newPasswordSchema } from "@/schemas/forgot-password-schema";
import { resetPassword } from "@/services/reset-password";

export const useNewPassword = (resetToken: string) => {
  const form = useForm<NewPasswordForm>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const openSuccessModal = () => {
    setShowSuccessModal(true);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    router.replace("/(auth)/login");
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      openSuccessModal();
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

  const onSubmit = async (data: NewPasswordForm) => {
    try {
      await mutateAsync({
        ...data,
        resetToken,
      });
    } catch {
      // The mutation's onError handler already shows the user-facing toast.
    }
  };
  const handleSubmit = form.handleSubmit(onSubmit);

  return {
    form,
    handleSubmit,
    showPassword,
    showConfirmPassword,
    toggleShowPassword,
    toggleShowConfirmPassword,
    showSuccessModal,
    openSuccessModal,
    closeSuccessModal,
    isPending,
  };
};
