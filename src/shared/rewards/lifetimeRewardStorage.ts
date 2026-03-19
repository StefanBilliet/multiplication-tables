type StorageLike = Pick<Storage, "getItem" | "setItem">;

const LIFETIME_REWARD_TOTAL_STORAGE_KEY = "lifetimeRewardTotal";

const createLifetimeRewardStorage = (storage: StorageLike) => ({
  load(): number {
    const storedValue = storage.getItem(LIFETIME_REWARD_TOTAL_STORAGE_KEY);
    const parsedValue = Number(storedValue);

    return storedValue && !Number.isNaN(parsedValue) ? parsedValue : 0;
  },

  save(total: number): void {
    storage.setItem(LIFETIME_REWARD_TOTAL_STORAGE_KEY, String(total));
  },
});

export type { StorageLike };
export default createLifetimeRewardStorage;
