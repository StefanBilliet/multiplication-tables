import { useStore } from "zustand";
import { getLifetimeRewardStore } from "./lifetimeRewardStore";

const useLifetimeRewardTotal = () => {
  const lifetimeRewardStore = getLifetimeRewardStore();
  const lifetimeRewardTotal = useStore(
    lifetimeRewardStore,
    (state) => state.lifetimeRewardTotal,
  );
  const addReward = useStore(lifetimeRewardStore, (state) => state.addReward);

  return {
    addReward,
    lifetimeRewardTotal,
  };
};

export default useLifetimeRewardTotal;
