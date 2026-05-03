jest.mock("@/services/login", () => ({
  login: jest.fn(),
}));

jest.mock("@/stores/auth-user", () => ({
  useAuthUser: (selector: (state: { setSession: jest.Mock }) => unknown) =>
    selector({ setSession: mockedSetSession }),
}));

jest.mock("expo-router", () => ({
  router: {
    replace: jest.fn(),
    navigate: jest.fn(),
  },
}));

jest.mock("react-native-toast-message", () => ({
  show: jest.fn(),
}));

import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { act, renderHook } from "@/lib/test-utils";
import { useLogin } from "./use-login";

const mockedSetSession = jest.fn();
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

describe("useLogin", () => {
  beforeEach(() => {
    mockedSetSession.mockReset();
    mockedMutateAsync.mockReset();
    (router.replace as jest.Mock).mockReset();
    (router.navigate as jest.Mock).mockReset();
    (Toast.show as jest.Mock).mockReset();
  });

  it("stores the session and opens the success modal on success", async () => {
    mockedMutateAsync.mockResolvedValue({
      data: {
        accessToken: "access-token",
        refreshToken: "refresh-token",
        user: {
          id: 12,
          phone: "09123456789",
          username: "testUser",
          email: null,
          userType: "Monk",
          contactPhone: null,
          monkProfile: null,
        },
      },
    });

    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.form.setValue("phone", "+959123456789");
      result.current.form.setValue("password", "password123");
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(mockedSetSession).toHaveBeenCalledWith({
      accessToken: "access-token",
      refreshToken: "refresh-token",
      user: expect.objectContaining({ username: "testUser" }),
    });
    expect(result.current.showSuccessModal).toBe(true);
  });

  it("shows an error toast on failure", async () => {
    mockedMutateAsync.mockRejectedValue(new Error("Invalid phone or password"));

    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.form.setValue("phone", "+959123456789");
      result.current.form.setValue("password", "password123");
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(Toast.show).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "error",
        text2: "Invalid phone or password",
      }),
    );
  });

  it("navigates to monk sign-up and home", () => {
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.goToSignUp();
      result.current.goToHome();
    });

    expect(router.navigate).toHaveBeenCalledWith({
      pathname: "/(auth)/sign-up",
      params: { role: "monk" },
    });
    expect(router.replace).toHaveBeenCalledWith("/(tabs)");
  });
});
