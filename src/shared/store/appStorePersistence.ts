const LEGACY_STORAGE_KEY = "lifetimeRewardTotal";
const NEW_STORAGE_KEY = "multiplication-app";

export const createPersistStorage = () => {
  return {
    getItem: (_name: string): string | null =>
      localStorage.getItem(NEW_STORAGE_KEY),
    setItem: (_name: string, value: string) => {
      localStorage.setItem(NEW_STORAGE_KEY, value);
    },
    removeItem: (_name: string) => {
      localStorage.removeItem(NEW_STORAGE_KEY);
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    },
  };
};

export const migrateLegacyStorage = () => {
  const newData = localStorage.getItem(NEW_STORAGE_KEY);
  if (newData) return;

  const legacyData = localStorage.getItem(LEGACY_STORAGE_KEY);
  if (!legacyData) return;

  const parsed = Number(legacyData);
  const value = !Number.isNaN(parsed) ? parsed : 0;
  localStorage.setItem(
    NEW_STORAGE_KEY,
    JSON.stringify({
      state: {
        lifetimeRewardTotal: value,
        recentWeaknesses: [],
        sessionCompletedEvents: [],
      },
      version: 0,
    }),
  );
  localStorage.removeItem(LEGACY_STORAGE_KEY);
};
