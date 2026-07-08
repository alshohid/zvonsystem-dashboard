import {
  CarrierOption,
  TruckTypeOption,
  AddTruckFormData,
  TrailerTypeOption,
  AddTrailerFormData,
} from '../../../types/dispatcher/type';

export const DEFAULT_CARRIERS: CarrierOption[] = [
  { label: 'Select Carrier', value: '' },
  { label: 'Logic LTD', value: 'logic-ltd' },
  { label: 'Ronaldo', value: 'ronaldo' },
];

export const DEFAULT_TRUCK_TYPES: TruckTypeOption[] = [
  { id: '1', label: 'Sleeper Cab' },
  { id: '2', label: 'Day Cab' },
  { id: '3', label: 'Box Truck' },
  { id: '4', label: 'Cargo Van' },
  { id: '5', label: 'Delete Freight Van?' },
];

export const INITIAL_ADD_TRUCK_FORM: AddTruckFormData = {
  carrier: '',
  licensePlate: 'ABC-1234',
  truckType: 'Box Truck',
  vin: '',
  modelMake: 'Freightliner Cascadia',
  unitNumber: '',
};



export const DEFAULT_TRAILER_TYPES: TrailerTypeOption[] = [
  { id: '1', label: 'Dry Van' },
  { id: '2', label: 'Flatbed' },
  { id: '3', label: 'Reefer' },
  { id: '4', label: 'Step Deck' },
];

export const INITIAL_ADD_TRAILER_FORM: AddTrailerFormData = {
  carrier: '',
  type: 'Dry Van',
  unitNumber: '',
  vin: '',
  plateNumber: '',
  plateState: '',
};