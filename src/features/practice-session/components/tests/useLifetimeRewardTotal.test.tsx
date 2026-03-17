import { act, renderHook } from "@testing-library/react";
import useLifetimeRewardTotal from "../useLifetimeRewardTotal";

const createStorage = (storedValue: string | null = null) => {
  let value = storedValue;

  return {
    getItem: vi.fn(() => value),
    setItem: vi.fn((_key: string, nextValue: string) => {
      value = nextValue;
    }),
  };
};

test("GIVEN no lifetime reward total is stored, WHEN the hook is created, THEN it falls back to 0", () => {
  const storage = createStorage();
  const { result } = renderHook(() => useLifetimeRewardTotal(storage));

  expect(result.current.lifetimeRewardTotal).toBe(0);
});

test("GIVEN a lifetime reward total is stored, WHEN the hook is created, THEN it loads that total", () => {
  const storage = createStorage("4");
  const { result } = renderHook(() => useLifetimeRewardTotal(storage));

  expect(result.current.lifetimeRewardTotal).toBe(4);
});

test("GIVEN the stored lifetime reward total is invalid, WHEN the hook is created, THEN it falls back to 0", () => {
  const storage = createStorage("banana");
  const { result } = renderHook(() => useLifetimeRewardTotal(storage));

  expect(result.current.lifetimeRewardTotal).toBe(0);
});

test("GIVEN the hook is created, WHEN a reward is added, THEN it increments the total and persists it", () => {
  const storage = createStorage("2");
  const { result } = renderHook(() => useLifetimeRewardTotal(storage));

  act(() => {
    result.current.addReward();
  });

  expect(result.current.lifetimeRewardTotal).toBe(3);
  expect(storage.setItem).toHaveBeenCalledWith("lifetimeRewardTotal", "3");
});
