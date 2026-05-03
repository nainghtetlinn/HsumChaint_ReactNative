import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";
import type { LoginSession, LoginUser } from "@/schemas/login-schema";

const AUTH_STORAGE_KEY = "auth-user-storage";

export const authStorage: StateStorage = {
  setItem: async (key, value) => {
    await SecureStore.setItemAsync(key, value);
  },
  getItem: async (key) => {
    return await SecureStore.getItemAsync(key);
  },
  removeItem: async (key) => {
    await SecureStore.deleteItemAsync(key);
  },
};

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: LoginUser | null;
  isAuthenticated: boolean;
  setSession: (session: LoginSession) => void;
  clearSession: () => void;
};

const initialState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,
} as const;

export const createAuthUserStore = (storage: StateStorage = authStorage) => {
  return create<AuthState>()(
    persist(
      (set) => ({
        ...initialState,
        setSession: (session) =>
          set({
            accessToken: session.accessToken,
            refreshToken: session.refreshToken,
            user: session.user,
            isAuthenticated: true,
          }),
        clearSession: () => set(initialState),
      }),
      {
        name: AUTH_STORAGE_KEY,
        storage: createJSONStorage(() => storage),
        partialize: (state) => ({
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      },
    ),
  );
};

export const useAuthUser = createAuthUserStore();
