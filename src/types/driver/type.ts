export interface Driver {
  id: string;
  name: string;
  carrier: string;
  truckNo: string;
  trailerNo: string;
  contact: string;
  status: 'Active' | 'Deleted';
  cdlNumber?: string;
  state?: string;
  cdlExpDate?: string;
  medCardExpDate?: string;
  regExpDate?: string;
  assignedTruck?: string;
  assignedTrailer?: string;
}
