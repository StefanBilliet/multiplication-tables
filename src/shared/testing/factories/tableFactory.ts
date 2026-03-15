import { Factory } from "fishery";

type Table = {
  id: number;
  label: string;
  unlocked: boolean;
};

export const tableFactory = Factory.define<Table>(({ sequence }) => ({
  id: sequence,
  label: `${sequence} times table`,
  unlocked: sequence === 1,
}));
