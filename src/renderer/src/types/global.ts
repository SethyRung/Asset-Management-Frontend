export interface Asset {
  id: number;
  assetName: string;
  serialNumber: string;
  category: string;
  status: "Active" | "Inactive";
  location: string;
  owner: string;
  warrantyExpiryDate: Date;
}
