import type { StateStorage } from "zustand/middleware";
import { createAuthUserStore } from "./auth-user";

const createMemoryStorage = (): StateStorage => {
  const store = new Map<string, string>();

  return {
    getItem: (name) => store.get(name) ?? null,
    setItem: (name, value) => {
      store.set(name, value);
    },
    removeItem: (name) => {
      store.delete(name);
    },
  };
};

const session = {
  accessToken: "access-token",
  refreshToken: "refresh-token",
  user: {
    id: 12,
    phone: "09123456789",
    username: "testUser",
    email: null,
    userType: "Monk" as const,
    contactPhone: null,
    monkProfile: {
      id: 8,
      userId: 12,
      monasteryName: "ဆုတောင်းပြည့်",
      monasteryAddress: "somewhere",
    },
  },
};

describe("auth store", () => {
  it("stores the full login session", () => {
    const useAuthUser = createAuthUserStore(createMemoryStorage());

    useAuthUser.getState().setSession(session);

    expect(useAuthUser.getState().accessToken).toBe("access-token");
    expect(useAuthUser.getState().refreshToken).toBe("refresh-token");
    expect(useAuthUser.getState().user?.username).toBe("testUser");
    expect(useAuthUser.getState().isAuthenticated).toBe(true);
  });

  it("clears the login session", () => {
    const useAuthUser = createAuthUserStore(createMemoryStorage());

    useAuthUser.getState().setSession(session);
    useAuthUser.getState().clearSession();

    expect(useAuthUser.getState().accessToken).toBeNull();
    expect(useAuthUser.getState().refreshToken).toBeNull();
    expect(useAuthUser.getState().user).toBeNull();
    expect(useAuthUser.getState().isAuthenticated).toBe(false);
  });

  it("rehydrates the persisted session", async () => {
    const storage = createMemoryStorage();
    const firstStore = createAuthUserStore(storage);

    firstStore.getState().setSession(session);

    const secondStore = createAuthUserStore(storage);
    await secondStore.persist.rehydrate();

    expect(secondStore.getState().accessToken).toBe("access-token");
    expect(secondStore.getState().user?.username).toBe("testUser");
    expect(secondStore.getState().isAuthenticated).toBe(true);
  });
});
