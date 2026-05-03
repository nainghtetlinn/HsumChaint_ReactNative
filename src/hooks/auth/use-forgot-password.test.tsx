jest.mock("@/services/forgot-password", () => ({
  forgotPassword: jest.fn(),
}));

jest.mock("expo-router", () => ({
  router: {
    navigate: jest.fn(),
  },
}));

jest.mock("react-native-toast-message", () => ({
  show: jest.fn(),
}));

import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { act, renderHook } from "@/lib/test-utils";
import { useForgotPassword } from "./use-forgot-password";

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

describe("useForgotPassword", () => {
  beforeEach(() => {
    mockedMutateAsync.mockReset();
    (router.navigate as jest.Mock).mockReset();
    (Toast.show as jest.Mock).mockReset();
  });

  it("navigates to new-password with the raw reset token on success", async () => {
    mockedMutateAsync.mockResolvedValue({
      data: {
        rawResetToken: "ea546ac49c8d2faf32ae089cba6d071730bbb6af850468add8f94bb00b880869",
      },
    });

    const { result } = renderHook(() => useForgotPassword());

    act(() => {
      result.current.form.setValue("phoneNo", "+959123456789");
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(router.navigate).toHaveBeenCalledWith({
      pathname: "/(auth)/new-password",
      params: {
        resetToken: "ea546ac49c8d2faf32ae089cba6d071730bbb6af850468add8f94bb00b880869",
      },
    });
  });
});
