import type { Asset } from "./Asset";
import type { User } from "./User";

export type Maintenance = {
  id: number;
  asset: Asset;
  maintenanceDate: string;
  description: string;
  cost: number;
  performedBy: User;
};
