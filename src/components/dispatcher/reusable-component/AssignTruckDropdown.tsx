'use client';

import { useState } from 'react';
import SelectField from '../../ui/input/searchInput/SelectField';


interface AssignTruckDropdownProps {
  value: string | number;
  onChange: (value: string | number) => void;
  options: Array<{ label: string; value: string | number }>;
  placeholder: string;
}
interface PlanOption {
  label: string;
  value: string;
}

const PLAN_OPTIONS: PlanOption[] = [
  { label: 'Advance Plan', value: 'advance' },
  { label: 'Basic Plan', value: 'basic' },
];
export default function AssignTruckDropdown({
  
}: AssignTruckDropdownProps) {
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  const [formData, setFormData] = useState({
      name: 'Minhaj Delta LTD',
      email: 'delta@gmail.com',
      contact: '+880 12342314',
      address: '4234 Mustang GT',
      dbaName: 'Delta LTD',
      mcNo: '1232342',
      dotNo: '112321',
      plan: 'advance',
    });
  return (
    <SelectField
      value={formData.plan}
      onChange={value => handleInputChange('plan', value)}
      options={PLAN_OPTIONS}
      placeholder="Select Plan"
      wrapperClassName="w-full"
      selectClassName="bg-[#FCFCFD] border border-gray-200 rounded-xl py-3"
    />
  );
}
