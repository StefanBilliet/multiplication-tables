import { useStore } from 'zustand';
import { getAppStore } from '../store/appStore';

const useLifetimeRewardTotal = () => {
  const appStore = getAppStore();
  const lifetimeRewardTotal = useStore(appStore, (state) => state.lifetimeRewardTotal);
  const addReward = useStore(appStore, (state) => state.addReward);

  return {
    addReward,
    lifetimeRewardTotal,
  };
};

export default useLifetimeRewardTotal;
