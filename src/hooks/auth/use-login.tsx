import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import type { TextInput } from "react-native";
import Toast from "react-native-toast-message";
import { getApiErrorMessage } from "@/lib/api-error";
import { type LoginRequest, loginRequestSchema } from "@/schemas/login-schema";
import { login } from "@/services/login";
import { useAuthUser } from "@/stores/auth-user";

export const useLogin = () => {
  const setSession = useAuthUser((state) => state.setSession);

  const form = useForm<LoginRequest>({
    resolver: zodResolver(loginRequestSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const passwordRef = useRef<TextInput>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: login,
    onSuccess: ({ data }) => {
      setSession(data);
      setShowSuccessModal(true);
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Login failed",
        text2: getApiErrorMessage(error),
        visibilityTime: 5000,
      });
    },
  });

  const onSubmit = async (data: LoginRequest) => {
    try {
      await mutateAsync(data);
    } catch {
      // The mutation's onError handler already shows the user-facing toast.
    }
  };

  const handleSubmit = form.handleSubmit(onSubmit);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const closeSuccessModal = () => setShowSuccessModal(false);

  const goToHome = () => {
    setShowSuccessModal(false);
    router.replace("/(tabs)" as never);
  };

  const goToSignUp = () => {
    router.navigate({
      pathname: "/(auth)/sign-up",
      params: { role: "monk" },
    });
  };

  return {
    form,
    showPassword,
    passwordRef,
    showSuccessModal,
    toggleShowPassword,
    handleSubmit,
    closeSuccessModal,
    goToSignUp,
    goToHome,
    isPending,
  };
};
