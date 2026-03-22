import { act, renderHook } from "@testing-library/react";
import { resetLifetimeRewardStore } from "../../../../shared/rewards/lifetimeRewardStore";
import useLifetimeRewardTotal from "../../../../shared/rewards/useLifetimeRewardTotal";

const createStorage = (storedValue: string | null = null) => {
  let value = storedValue;

  return {
    getItem: vi.fn(() => value),
    setItem: vi.fn((_key: string, nextValue: string) => {
      value = nextValue;
    }),
  };
};

const resetHook = (storedValue: string | null = null) => {
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: createStorage(storedValue),
  });

  resetLifetimeRewardStore(globalThis.localStorage);

  return {
    storage: globalThis.localStorage,
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
  expect(storage.setItem).toHaveBeenCalledWith("lifetimeRewardTotal", "3");
});

test("GIVEN a lifetime reward total already exists, WHEN one reward is added, THEN the total increases by exactly 1", () => {
  const { storage } = resetHook("4");
  const { result } = renderHook(() => useLifetimeRewardTotal());

  act(() => {
    result.current.addReward();
  });

  expect(result.current.lifetimeRewardTotal).toBe(5);
  expect(storage.setItem).toHaveBeenLastCalledWith("lifetimeRewardTotal", "5");
});

test("GIVEN rewards are added more than once, WHEN the total is updated repeatedly, THEN the persisted total accumulates each reward", () => {
  const { storage } = resetHook("0");
  const { result } = renderHook(() => useLifetimeRewardTotal());

  act(() => {
    result.current.addReward();
    result.current.addReward();
  });

  expect(result.current.lifetimeRewardTotal).toBe(2);
  expect(storage.setItem).toHaveBeenLastCalledWith("lifetimeRewardTotal", "2");
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
