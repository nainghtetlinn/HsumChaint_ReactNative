import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import type { TextInput } from "react-native";
import Toast from "react-native-toast-message";
import { getApiErrorMessage } from "@/lib/api-error";
import {
  mapRegisterResponseToSession,
  mapSignUpFormToRegisterRequest,
} from "@/schemas/register-schema";
import { type SignUpForm, signUpSchema } from "@/schemas/sign-up-schema";
import { register } from "@/services/register";
import { useAuthUser } from "@/stores/auth-user";

export const useSignUp = (role: "user" | "monk") => {
  const setSession = useAuthUser((state) => state.setSession);

  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      role,
    },
  });

  const passwordRef = useRef<TextInput>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: register,
    onSuccess: (response) => {
      setSession(mapRegisterResponseToSession(response));
      Toast.show({
        type: "success",
        text1: "Register successful",
        text2: response.message,
        visibilityTime: 5000,
      });
      router.replace("/(tabs)" as never);
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Register failed",
        text2: getApiErrorMessage(error),
        visibilityTime: 5000,
      });
    },
  });

  const onSubmit = async (data: SignUpForm) => {
    try {
      await mutateAsync(mapSignUpFormToRegisterRequest(data));
    } catch {
      // The mutation's onError handler already shows the user-facing toast.
    }
  };

  const handleSubmit = form.handleSubmit(onSubmit);

  return {
    form,
    passwordRef,
    handleSubmit,
    isPending,
  };
};
