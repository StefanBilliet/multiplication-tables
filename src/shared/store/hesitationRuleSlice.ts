import type { StateCreator } from "zustand";

export type HesitationRuleSlice = {
  isHesitationRuleEnabled: boolean;
  setHesitationRuleEnabled: (isEnabled: boolean) => void;
};

export const createHesitationRuleSlice: StateCreator<HesitationRuleSlice> = (
  set,
) => ({
  isHesitationRuleEnabled: false,
  setHesitationRuleEnabled: (isEnabled) => {
    set(() => ({ isHesitationRuleEnabled: isEnabled }));
  },
});
