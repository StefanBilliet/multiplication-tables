import { act, renderHook } from "@testing-library/react";
import useLifetimeRewardTotal from "../../../../shared/rewards/useLifetimeRewardTotal";
import { resetAppStore } from "../../../../shared/store/appStore";

const createStorage = (
  storedValue: string | null = null,
  legacyValue: string | null = null,
) => {
  const store: Record<string, string | null> = {};

  if (storedValue !== null) {
    store["multiplication-app"] = JSON.stringify({
      state: {
        lifetimeRewardTotal: Number(storedValue) || 0,
        multiplicationErrors: [],
      },
      version: 0,
    });
  }

  if (legacyValue !== null) {
    store.lifetimeRewardTotal = legacyValue;
  }

  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
  };
};

const resetHook = (
  storedValue: string | null = null,
  legacyValue: string | null = null,
) => {
  const storage = createStorage(storedValue, legacyValue);
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: storage,
  });

  resetAppStore();

  return {
    storage,
  };
};

test("GIVEN no lifetime reward total is stored, WHEN the hook is created, THEN it falls back to 0", () => {
  resetHook();
  const { result } = renderHook(() => useLifetimeRewardTotal());

  expect(result.current.lifetimeRewardTotal).toBe(0);
});

test("GIVEN a lifetime reward total is stored, WHEN the hook is created, THEN it loads that total", () => {
  resetHook("4");
  const { result } = renderHook(() => useLifetimeRewardTotal());

  expect(result.current.lifetimeRewardTotal).toBe(4);
});

test("GIVEN the stored lifetime reward total is invalid, WHEN the hook is created, THEN it falls back to 0", () => {
  resetHook("banana");
  const { result } = renderHook(() => useLifetimeRewardTotal());

  expect(result.current.lifetimeRewardTotal).toBe(0);
});

test("GIVEN the hook is created, WHEN a reward is added, THEN it increments the total and persists it", () => {
  const { storage } = resetHook("2");
  const { result } = renderHook(() => useLifetimeRewardTotal());

  act(() => {
    result.current.addReward();
  });

  expect(result.current.lifetimeRewardTotal).toBe(3);
  expect(storage.setItem).toHaveBeenCalledWith(
    "multiplication-app",
    expect.any(String),
  );
});

test("GIVEN rewards are added more than once, WHEN the total is updated repeatedly, THEN the persisted total accumulates each reward", () => {
  const { storage } = resetHook("0");
  const { result } = renderHook(() => useLifetimeRewardTotal());

  act(() => {
    result.current.addReward();
    result.current.addReward();
  });

  expect(result.current.lifetimeRewardTotal).toBe(2);
  expect(storage.setItem).toHaveBeenLastCalledWith(
    "multiplication-app",
    expect.any(String),
  );
});

test("GIVEN the hook is used twice, WHEN one caller adds a reward, THEN the other caller sees the shared updated total", () => {
  resetHook("0");
  const firstHook = renderHook(() => useLifetimeRewardTotal());
  const secondHook = renderHook(() => useLifetimeRewardTotal());

  act(() => {
    firstHook.result.current.addReward();
  });

  expect(secondHook.result.current.lifetimeRewardTotal).toBe(1);
});

test("GIVEN legacy lifetimeRewardTotal data exists, WHEN the hook is created, THEN it migrates into the new store and clears the old key", () => {
  const { storage } = resetHook(null, "7");
  const { result } = renderHook(() => useLifetimeRewardTotal());

  expect(result.current.lifetimeRewardTotal).toBe(7);
  expect(storage.setItem).toHaveBeenCalledWith(
    "multiplication-app",
    expect.any(String),
  );
  expect(storage.removeItem).toHaveBeenCalledWith("lifetimeRewardTotal");
});
