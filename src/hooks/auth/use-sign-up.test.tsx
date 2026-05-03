jest.mock("@/services/register", () => ({
  register: jest.fn(),
}));

jest.mock("@/stores/auth-user", () => ({
  useAuthUser: (selector: (state: { setSession: jest.Mock }) => unknown) =>
    selector({ setSession: mockedSetSession }),
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
import { useSignUp } from "./use-sign-up";

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

describe("useSignUp", () => {
  beforeEach(() => {
    mockedSetSession.mockReset();
    mockedMutateAsync.mockReset();
    (router.replace as jest.Mock).mockReset();
    (Toast.show as jest.Mock).mockReset();
  });

  it("maps monk form data, stores the session, and navigates home on success", async () => {
    mockedMutateAsync.mockResolvedValue({
      message: "Register successful",
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
        monkProfile: {
          id: 8,
          userId: 12,
          monasteryName: "ဆုတောင်းပြည့်",
          monasteryAddress: "somewhere",
        },
      },
    });

    const { result } = renderHook(() => useSignUp("monk"));

    act(() => {
      result.current.form.setValue("role", "monk");
      result.current.form.setValue("phoneNo", "+959123456789");
      result.current.form.setValue("username", "testUser");
      result.current.form.setValue("password", "password123");
      result.current.form.setValue("confirmPassword", "password123");
      result.current.form.setValue("monasteryName", "ဆုတောင်းပြည့်");
      result.current.form.setValue("monasteryAddress", "somewhere");
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(mockedMutateAsync).toHaveBeenCalledWith(
      expect.objectContaining({
        phone: "+959123456789",
        userType: "Monk",
        monasteryName: "ဆုတောင်းပြည့်",
      }),
    );
    expect(mockedSetSession).toHaveBeenCalled();
    expect(Toast.show).toHaveBeenCalledWith(
      expect.objectContaining({ type: "success", text1: "Register successful" }),
    );
    expect(router.replace).toHaveBeenCalledWith("/(tabs)");
  });
});
