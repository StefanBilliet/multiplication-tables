import { type PersistStorage, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

type StorageLike = Pick<Storage, "getItem" | "setItem">;

const LIFETIME_REWARD_TOTAL_STORAGE_KEY = "lifetimeRewardTotal";

type LifetimeRewardState = {
  lifetimeRewardTotal: number;
  addReward: () => void;
};

type PersistedLifetimeRewardState = Pick<
  LifetimeRewardState,
  "lifetimeRewardTotal"
>;

const createPersistStorage = (
  storage: StorageLike,
): PersistStorage<PersistedLifetimeRewardState> => {
  const loadLifetimeRewardTotal = () => {
    const storedValue = storage.getItem(LIFETIME_REWARD_TOTAL_STORAGE_KEY);
    const parsedValue = Number(storedValue);

    return storedValue && !Number.isNaN(parsedValue) ? parsedValue : 0;
  };

  return {
    getItem: () => ({
      state: {
        lifetimeRewardTotal: loadLifetimeRewardTotal(),
      },
      version: 0,
    }),
    setItem: (_name, value) => {
      storage.setItem(
        LIFETIME_REWARD_TOTAL_STORAGE_KEY,
        String(value.state.lifetimeRewardTotal),
      );
    },
    removeItem: () => {},
  };
};

const createLifetimeRewardStore = (storage: StorageLike) =>
  createStore<LifetimeRewardState>()(
    persist(
      (set) => ({
        lifetimeRewardTotal: 0,
        addReward: () => {
          set((state) => ({
            lifetimeRewardTotal: state.lifetimeRewardTotal + 1,
          }));
        },
      }),
      {
        name: "lifetimeRewardTotal",
        partialize: (state) => ({
          lifetimeRewardTotal: state.lifetimeRewardTotal,
        }),
        storage: createPersistStorage(storage),
      },
    ),
  );

let lifetimeRewardStore = createLifetimeRewardStore(globalThis.localStorage);

const getLifetimeRewardStore = () => lifetimeRewardStore;

const resetLifetimeRewardStore = (
  storage: StorageLike = globalThis.localStorage,
) => {
  lifetimeRewardStore = createLifetimeRewardStore(storage);
};

export { getLifetimeRewardStore, resetLifetimeRewardStore };
