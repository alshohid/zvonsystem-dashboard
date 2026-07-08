// 'use client';

// import React, { useState } from 'react';
// import { Edit3, Download, FileText, X } from 'lucide-react';
// import { Modal } from '../ui/modal';
// import SelectField from '../ui/input/searchInput/SelectField';
// import { EditOptionIcon } from '@/src/icons';

// interface CarrierDetailModalProps {
//   open: boolean;
//   onClose: () => void;
// }

// // Fixed the interface and created a constant for options
// interface PlanOption {
//   label: string;
//   value: string;
// }

// const PLAN_OPTIONS: PlanOption[] = [
//   { label: 'Advance Plan', value: 'advance' },
//   { label: 'Basic Plan', value: 'basic' },
// ];

// export default function CarrierDetailModal({
//   open,
//   onClose,
// }: CarrierDetailModalProps) {
//   // Assuming selectedMonth logic was intended for the plan
//   const [selectedPlan, setSelectedPlan] = useState('advance');

//   return (
//     <Modal
//       isOpen={open}
//       onClose={onClose}
//       className="max-w-180 p-0 my-10"
//       contentBgClassName="bg-white"
//       textClassName="text-[#1A1A1A]"
//       overlayClassName="bg-[#100F0F59] backdrop-blur-[2px]"
//       showCloseButton={false}
//     >
//       {/* Added max-h and overflow here instead of h-screen on the modal wrapper to keep it clean */}
//       <div className="relative w-full rounded-3xl p-6 md:p-8 max-h-[90vh] overflow-y-auto">
//         {/* Header Section */}
//         <div className="flex items-center justify-between mb-8">
//           <h2 className="text-xl font-bold text-[#1A1A1A]">
//             Carrier&apos;s Profile Detail{' '}
//             <span className="text-gray-400">#ID_02</span>
//           </h2>
//           <button
//             onClick={onClose}
//             className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
//           >
//             <X size={18} />
//           </button>
//         </div>

//         <div className="flex flex-col md:flex-row gap-8">
//           {/* Left Sidebar: Profile Card */}
//           <div className="w-full  md:w-[245px] bg-[#F8F9FC] rounded-2xl px-6 py-8 border border-gray-100 h-fit">
//             <div className="flex justify-end cursor-pointer">
//               <EditOptionIcon />
//             </div>
//             <div className="flex flex-col items-center text-center">
//               <div className="relative mb-4">
//                 <div className="h-16 w-16 rounded-full bg-[#E0E7FF] flex items-center justify-center text-[#2F3E9E] text-2xl font-bold">
//                   MD
//                 </div>
//               </div>
//               <h3 className="text-lg font-bold mb-6">Minhaj Delta LTD</h3>

//               <div className="w-full space-y-4 text-left">
//                 <DetailField label="Email" value="delta@gmail.com" />
//                 <DetailField label="Contact" value="+880 12342314" />
//                 <DetailField label="Address" value="4234 Mustang GT" />
//               </div>
//             </div>
//           </div>

//           {/* Right Section: Details & Pricing */}
//           <div className="flex-1 space-y-6">
//             <div className="flex justify-end cursor-pointer">
//               <EditOptionIcon />
//             </div>
//             <div className="grid grid-cols-1 gap-4">
//               <EditableField label="DBA Name" value="Delta LTD" />
//               <EditableField label="MC No." value="1232342" />
//               <EditableField label="DOT No." value="112321" />

//               <div className="space-y-1.5">
//                 <p className="text-sm font-semibold text-gray-700">
//                   Pricing Plan
//                 </p>
//                 <div className="relative">
//                   {/* SelectField replaces the native select for consistency */}
//                   <SelectField
//                     value={selectedPlan}
//                     onChange={value => setSelectedPlan(value)}
//                     options={PLAN_OPTIONS}
//                     placeholder="Select Plan"
//                     wrapperClassName="w-full"
//                     selectClassName="bg-[#FCFCFD] border border-gray-200 rounded-xl py-3"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Documents Section */}
//         <div className="mt-10">
//           <h3 className="text-lg font-bold mb-6">Carrier&apos;s Documents</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
//             <DocumentItem label="Carrier Contract" required />
//             <DocumentItem label="Certificate of Insurance" required />
//             <DocumentItem label="Limited Power of Attorney" required />
//             <DocumentItem label="MC Authority" required />
//             <DocumentItem label="Notice of Assignment" required />
//             <DocumentItem label="Void Check" required />
//             <DocumentItem label="W-9" required />
//             <DocumentItem label="Trucker Intake Survey" />
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// }

// /** * Sub-components
//  * Defined with explicit types to resolve implicit 'any' errors
//  **/

// function DetailField({ label, value }: { label: string; value: string }) {
//   return (
//     <div>
//       <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
//         {label}
//       </p>
//       <p className="text-sm font-semibold text-gray-800">{value}</p>
//     </div>
//   );
// }

// function EditableField({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="group relative border-b border-gray-100 pb-2">
//       <p className="text-xs font-semibold text-gray-700">{label}</p>
//       <div className="flex items-center justify-between mt-1">
//         <span className="text-sm text-gray-500">{value}</span>
//         <Edit3
//           size={16}
//           className="text-blue-500 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
//         />
//       </div>
//     </div>
//   );
// }

// function DocumentItem({
//   label,
//   required,
// }: {
//   label: string;
//   required?: boolean;
// }) {
//   return (
//     <div className="space-y-2">
//       <p className="text-sm font-semibold text-[#1A1A1A]">
//         {label} {required && <span className="text-red-500">*</span>}
//       </p>
//       <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-[#F8F9FC] p-3">
//         <div className="flex items-center gap-3">
//           <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-gray-100">
//             <FileText className="text-gray-400" size={20} />
//           </div>
//           <div>
//             <p className="text-xs font-medium text-gray-700 truncate max-w-[150px]">
//               {label.replace(/ /g, '_')}.pdf
//             </p>
//             <p className="text-[10px] text-gray-400">
//               0.87 MB • Mar 23, 2026, 09:06 PM
//             </p>
//           </div>
//         </div>
//         <button className="text-gray-400 hover:text-blue-600 transition-colors">
//           <Download size={18} />
//         </button>
//       </div>
//     </div>
//   );
// }

'use client';

import React, { useState } from 'react';
import { Edit3, Download, FileText, X } from 'lucide-react';
import { Modal } from '../ui/modal';
import SelectField from '../ui/input/searchInput/SelectField';
import { EditOptionIcon } from '@/src/icons'; 

/** --- Types --- **/
interface PlanOption {
  label: string;
  value: string;
}

const PLAN_OPTIONS: PlanOption[] = [
  { label: 'Advance Plan', value: 'advance' },
  { label: 'Basic Plan', value: 'basic' },
];

export default function CarrierDetailModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  // Global edit state
  const [isEditing, setIsEditing] = useState(false);

  // Form State
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      className="max-w-180 p-0 my-10"
      contentBgClassName="bg-white"
    >
      <div className="relative w-full rounded-3xl p-6 md:p-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-[#1A1A1A]">
            Carrier&apos;s Profile Detail{' '}
            <span className="text-gray-400 text-sm font-normal ml-2">
              #ID_02
            </span>
          </h2>
          {/* <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button> */}
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="w-full md:w-[245px] bg-[#F8F9FC] rounded-2xl px-6 py-8 border border-gray-100 h-fit transition-all">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`p-1 rounded-md transition-colors ${isEditing ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'}`}
              >
                <EditOptionIcon />
              </button>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-[#E0E7FF] flex items-center justify-center text-[#2F3E9E] text-xl font-bold mb-4">
                MD
              </div>

              {isEditing ? (
                <input
                  className="text-lg font-bold mb-6 bg-white border border-blue-300 rounded px-2 w-full text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.name}
                  onChange={e => handleInputChange('name', e.target.value)}
                />
              ) : (
                <h3 className="text-lg font-bold mb-6 text-[#1A1A1A]">
                  {formData.name}
                </h3>
              )}

              <div className="w-full space-y-5 text-left">
                <SmartField
                  isEditing={isEditing}
                  label="Email"
                  value={formData.email}
                  onChange={v => handleInputChange('email', v)}
                />
                <SmartField
                  isEditing={isEditing}
                  label="Contact"
                  value={formData.contact}
                  onChange={v => handleInputChange('contact', v)}
                />
                <SmartField
                  isEditing={isEditing}
                  label="Address"
                  value={formData.address}
                  onChange={v => handleInputChange('address', v)}
                />
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1 space-y-6">
            <div className="flex justify-end">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-xs font-medium text-blue-600 hover:underline flex items-center gap-1"
              >
                {isEditing ? 'Save' : <EditOptionIcon/>}
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5">
              <SmartField
                isEditing={isEditing}
                label="DBA Name"
                value={formData.dbaName}
                onChange={v => handleInputChange('dbaName', v)}
                border
              />
              <SmartField
                isEditing={isEditing}
                label="MC No."
                value={formData.mcNo}
                onChange={v => handleInputChange('mcNo', v)}
                border
              />
              <SmartField
                isEditing={isEditing}
                label="DOT No."
                value={formData.dotNo}
                onChange={v => handleInputChange('dotNo', v)}
                border
              />

              <div className="space-y-1.5">
                <p className="text-sm font-semibold text-gray-700">
                  Pricing Plan
                </p>
                <SelectField
                  value={formData.plan}
                  onChange={value => handleInputChange('plan', value)}
                  options={PLAN_OPTIONS}
                  placeholder="Select Plan"
                  wrapperClassName="w-full"
                  selectClassName="bg-[#FCFCFD] border border-gray-200 rounded-xl py-3"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer/Documents (Static) */}
        <div className="mt-10 pt-6 border-t border-gray-100">
          <h3 className="text-lg font-bold mb-6">Carrier&apos;s Documents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <DocumentItem label="Carrier Contract" required />
            <DocumentItem label="MC Authority" required />
          </div>
        </div>
      </div>
    </Modal>
  );
}

/** --- Reusable Smart Input Component --- **/
function SmartField({
  label,
  value,
  isEditing,
  onChange,
  border = false,
}: {
  label: string;
  value: string;
  isEditing: boolean;
  onChange: (v: string) => void;
  border?: boolean;
}) {
  return (
    <div
      className={`space-y-1 ${border ? 'border-b border-gray-100 pb-2' : ''}`}
    >
      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">
        {label}
      </p>
      {isEditing ? (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full text-sm font-medium text-gray-800 bg-white border border-blue-200 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
        />
      ) : (
        <p className="text-sm font-semibold text-gray-800 truncate">
          {value || '—'}
        </p>
      )}
    </div>
  );
}

/** --- Static Doc Component --- **/
function DocumentItem({
  label,
  required,
}: {
  label: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2 group">
      <p className="text-sm font-semibold text-[#1A1A1A]">
        {label} {required && <span className="text-red-500">*</span>}
      </p>
      <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-[#F8F9FC] p-3 hover:border-blue-200 transition-colors">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-white border rounded-lg flex items-center justify-center">
            <FileText size={18} className="text-gray-400" />
          </div>
          <div className="text-[11px]">
            <p className="font-bold text-gray-700">
              {label.replace(/ /g, '_')}.pdf
            </p>
            <p className="text-gray-400">0.87 MB • Mar 23, 2026</p>
          </div>
        </div>
        <Download
          size={18}
          className="text-gray-400 cursor-pointer hover:text-blue-600"
        />
      </div>
    </div>
  );
}