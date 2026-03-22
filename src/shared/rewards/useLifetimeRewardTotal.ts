import { useEffect, useState } from "react";
import LifetimeRewardStorage, {
  type StorageLike,
} from "./lifetimeRewardStorage";

const useLifetimeRewardTotal = (
  storage: StorageLike = globalThis.localStorage,
) => {
  const lifetimeRewardStorage = LifetimeRewardStorage(storage);
  const [lifetimeRewardTotal, setLifetimeRewardTotal] = useState(() =>
    lifetimeRewardStorage.load(),
  );

  useEffect(() => {
    lifetimeRewardStorage.save(lifetimeRewardTotal);
  }, [lifetimeRewardStorage, lifetimeRewardTotal]);

  const addReward = () => {
    setLifetimeRewardTotal(
      (currentLifetimeRewardTotal) => currentLifetimeRewardTotal + 1,
    );
  };

  return {
    addReward,
    lifetimeRewardTotal,
  };
};

export default useLifetimeRewardTotal;
