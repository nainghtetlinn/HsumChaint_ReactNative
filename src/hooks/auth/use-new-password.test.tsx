jest.mock("@/services/reset-password", () => ({
  resetPassword: jest.fn(),
}));

jest.mock("expo-router", () => ({
  router: {
    replace: jest.fn(),
  },
}));

jest.mock("react-native-toast-message", () => ({
  show: jest.fn(),
}));

import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { act, renderHook } from "@/lib/test-utils";
import { useNewPassword } from "./use-new-password";

const mockedMutateAsync = jest.fn();

jest.mock("@tanstack/react-query", () => ({
  useMutation: (config: {
    onSuccess: (data: unknown) => void;
    onError: (error: unknown) => void;
  }) => ({
    mutateAsync: async (payload: unknown) => {
      try {
        const result = await mockedMutateAsync(payload);
        config.onSuccess(result);
        return result;
      } catch (error) {
        config.onError(error);
        throw error;
      }
    },
    isPending: false,
  }),
}));

describe("useNewPassword", () => {
  beforeEach(() => {
    mockedMutateAsync.mockReset();
    (router.replace as jest.Mock).mockReset();
    (Toast.show as jest.Mock).mockReset();
  });

  it("submits the password with reset token and opens the success modal", async () => {
    mockedMutateAsync.mockResolvedValue({
      success: true,
      message: "Password reset successfully",
    });

    const { result } = renderHook(() =>
      useNewPassword("ea546ac49c8d2faf32ae089cba6d071730bbb6af850468add8f94bb00b880869"),
    );

    act(() => {
      result.current.form.setValue("password", "password236");
      result.current.form.setValue("confirmPassword", "password236");
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(mockedMutateAsync).toHaveBeenCalledWith({
      password: "password236",
      confirmPassword: "password236",
      resetToken: "ea546ac49c8d2faf32ae089cba6d071730bbb6af850468add8f94bb00b880869",
    });
    expect(result.current.showSuccessModal).toBe(true);
  });

  it("navigates back to login when the success modal closes", () => {
    const { result } = renderHook(() => useNewPassword("token"));

    act(() => {
      result.current.closeSuccessModal();
    });

    expect(router.replace).toHaveBeenCalledWith("/(auth)/login");
  });
});
