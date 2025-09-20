import type { Asset } from "./Asset";

export type History = {
  id: number;
  asset: Asset;
  action: string;
  details: string;
  actionDate: string;
  userId: number;
};
