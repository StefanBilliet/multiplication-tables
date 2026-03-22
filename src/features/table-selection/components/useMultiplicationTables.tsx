import { useTranslation } from "react-i18next";
import { getRewardsNeededForTable } from "../tableRewards.ts";

export function useMultiplicationTables(lifetimeRewardTotal: number) {
  const { t } = useTranslation();

  const tables = Array.from({ length: 10 }, (_, index) => {
    const id = index + 1;
    const rewardsNeeded = getRewardsNeededForTable(lifetimeRewardTotal, id);

    return {
      id,
      label: t("tableSelection.tableLabel", { table: id }),
      unlockState: {
        rewardsNeeded,
        unlocked: rewardsNeeded === 0,
      },
    };
  });
  return tables;
}
