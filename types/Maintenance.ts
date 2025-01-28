import type { Asset } from "./Asset";

export type Maintenance = {
  id: number;
  asset: Asset;
  maintenanceDate: string;
  description: string;
  cost: number;
  performedBy: number;
};
