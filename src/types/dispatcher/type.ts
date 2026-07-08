export type DateRangeType = '7d' | '30d' | '60d';

export interface DateRangeOption {
  label: string;
  value: DateRangeType;
}
export interface TruckTypeOption {
  id: string;
  label: string;
}

export interface CarrierOption {
  label: string;
  value: string;
}

export interface AddTruckFormData {
  carrier: string;
  licensePlate: string;
  truckType: string;
  vin: string;
  modelMake: string;
  unitNumber: string;
}

export interface TrailerTypeOption {
  id: string;
  label: string;
}

export interface AddTrailerFormData {
  carrier: string;
  type: string;
  unitNumber: string;
  vin: string;
  plateNumber: string;
  plateState: string;
}