export type Asset = {
  id: number;
  name: string;
  serialNumber: string;
  categoryId: number;
  status: "Active" | "Inactive" | "Repair";
  location: string;
  acquisitionDate: string;
  assignedTo: number;
  warrantyExpiryDate: string;
  documents: string[];
};
