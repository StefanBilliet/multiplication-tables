import { useState } from "react";
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

  const addReward = () => {
    setLifetimeRewardTotal((currentLifetimeRewardTotal) => {
      const updatedLifetimeRewardTotal = currentLifetimeRewardTotal + 1;

      lifetimeRewardStorage.save(updatedLifetimeRewardTotal);

      return updatedLifetimeRewardTotal;
    });
  };

  return {
    addReward,
    lifetimeRewardTotal,
  };
};

export default useLifetimeRewardTotal;
