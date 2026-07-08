// 'use client';

// import {
//   ChevronDown,
//   CloudUpload,
//   FileText,
//   Trash2,
//   Download,
// } from 'lucide-react';
// import UploadDropzoneField from '../ui/input/UploadDropzoneField';
// import { DeleteIcon, DocIcon } from '@/src/icons';
// import { useState } from 'react';

// interface CarrierDocumentsFormProps {
//   onBack: () => void;
//   onSubmit: () => void;
// }
// const documentTypes = [
//   'MC Authority',
//   'Void Check',
//   'Notice of Assignment',
//   'Carrier Contract',
//   'Power of Attorney',
// ];
// const pendingFiles = ['Carrier Contract.pdf', 'Limited-Power_of_Attorney.pdf'];

// const uploadedGroups = [
//   {
//     date: 'Mar 23, 2026, 09:06 PM',
//     files: [
//       { name: 'MC Authority.pdf', tag: 'MC Authority' },
//       { name: 'Void Check.pdf', tag: 'Void Check' },
//       { name: 'Notice of Assignment.pdf', tag: 'Notice of Assignment' },
//     ],
//   },
//   {
//     date: 'Feb 15, 2026, 09:34 AM',
//     files: [
//       { name: 'Trucker Intake Survey.PDF', tag: 'Trucker Intake Survey' },
//     ],
//   },
// ];

// export default function CarrierDocumentsForm({
//   onBack,
//   onSubmit,
// }: CarrierDocumentsFormProps) {
//   const [logoFile, setLogoFile] = useState<File | null>(null);
//   const [uploadResetSignal, setUploadResetSignal] = useState(0);
//   return (
//     <div className="space-y-4">
//       <div className="rounded-2xl border border-[#E9EDF5] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] md:p-5">
//         <h2 className="mb-4 text-[20px] font-semibold text-[#111827]">
//           Upload Documents Here
//         </h2>

//         <div>
//           <label className="mb-2 block text-xs font-medium text-[#111827]">
//             Select Document Type
//           </label>

//           <select className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm text-[#111827] outline-none">
//             <option value="">Select type of document</option>

//             {documentTypes.map(type => (
//               <option key={type} value={type}>
//                 {type}
//               </option>
//             ))}
//           </select>
//         </div>

//         <UploadDropzoneField
//           className='my-6'
//           hint="PNG, JPG up to 5Mb (Will appear on invoice)"
//           description="Click to upload or drag and drop"
//           maxSizeMb={5}
//           onFileChange={setLogoFile}
//           dropzoneBackgroundClassName="bg-[#F9FAFB]"
//           dropzoneHoverBackgroundClassName="hover:bg-[#F2F4F7]"
//           resetSignal={uploadResetSignal}
//         />

//         <div className="mt-4 space-y-3">
//           {pendingFiles.map(file => (
//             <div
//               key={file}
//               className="flex items-center justify-between rounded-xl border border-[#EEF0F5] bg-[#F9FAFB] px-4 py-3"
//             >
//               <div className="flex items-center gap-3">
//                 <DocIcon />
//                 <div>
//                   <p className="text-sm text-[#111827]">{file}</p>
//                   <p className="text-[11px] text-[#98A2B3]">
//                     0.87 MB • Mar 23, 2026, 09:06 PM
//                   </p>
//                 </div>
//               </div>
//   {/* make delete button functional */}
//               <button className="text-[#FF5A5F]">
//                 <DeleteIcon />
//               </button>
//             </div>
//           ))}
//         </div>

//         <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
//           <button
//             onClick={onBack}
//             className="inline-flex h-10 items-center justify-center rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-6 text-sm font-medium text-[#344054]"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={onSubmit}
//             className="inline-flex h-10 items-center justify-center rounded-xl bg-[#2F3E9E] px-6 text-sm font-medium text-white"
//           >
//             Submit
//           </button>
//         </div>
//       </div>

//       <div className="rounded-2xl border border-[#E9EDF5] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] md:p-5">
//         <h2 className="mb-4 text-[20px] font-semibold text-[#111827]">
//           Uploaded Documents
//         </h2>

//         <div className="space-y-6">
//           {uploadedGroups.map(group => (
//             <div key={group.date}>
//               <p className="mb-3 text-sm font-medium text-[#111827]">
//                 {group.date}
//               </p>

//               <div className="space-y-3">
//                 {group.files.map(file => (
//                   <div
//                     key={file.name}
//                     className="flex items-center justify-between rounded-xl border border-[#EEF0F5] bg-white px-4 py-3"
//                   >
//                     <div className="flex items-center gap-3">
//                       <DocIcon />
//                       <div>
//                         <p className="text-sm text-[#111827]">{file.name}</p>
//                         <p className="text-[11px] text-[#98A2B3]">
//                           0.87 MB • Mar 23, 2026, 09:06 PM
//                         </p>
//                         <span className="mt-2 inline-flex rounded-full bg-[#FFF6E6] px-2 py-[2px] text-[10px] font-medium text-[#D68A00]">
//                           {file.tag}
//                         </span>
//                       </div>
//                     </div>
// {/* make doenload button functional */}
//                     <button className="text-[#98A2B3]">
//                       <Download className="h-4 w-4" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { Download } from 'lucide-react';
import UploadDropzoneField from '../ui/input/UploadDropzoneField';
import { DeleteIcon, DocIcon, DownloadCloudIcon } from '@/src/icons';
import { useState } from 'react';
import jsPDF from 'jspdf';
interface CarrierDocumentsFormProps {
  onBack: () => void;
  onSubmit: () => void;
}

const documentTypes = [
  'MC Authority',
  'Void Check',
  'Notice of Assignment',
  'Carrier Contract',
  'Power of Attorney',
];

const initialPendingFiles = [
  {
    name: 'Carrier Contract.pdf',
    size: '0.87 MB',
    date: 'Mar 23, 2026, 09:06 PM',
  },
  {
    name: 'Limited-Power_of_Attorney.pdf',
    size: '0.87 MB',
    date: 'Mar 23, 2026, 09:06 PM',
  },
];

const uploadedGroups = [
  {
    date: 'Mar 23, 2026, 09:06 PM',
    files: [
      {
        name: 'MC Authority.pdf',
        tag: 'MC Authority',
        size: '0.87 MB',
        url: '/files/mc-authority.pdf',
      },
      {
        name: 'Void Check.pdf',
        tag: 'Void Check',
        size: '0.87 MB',
        url: '/files/void-check.pdf',
      },
      {
        name: 'Notice of Assignment.pdf',
        tag: 'Notice of Assignment',
        size: '0.87 MB',
        url: '/files/notice.pdf',
      },
    ],
  },
  {
    date: 'Feb 15, 2026, 09:34 AM',
    files: [
      {
        name: 'Trucker Intake Survey.PDF',
        tag: 'Trucker Intake Survey',
        size: '0.87 MB',
        url: '/files/survey.pdf',
      },
    ],
  },
];

export default function CarrierDocumentsForm({
  onBack,
  onSubmit,
}: CarrierDocumentsFormProps) {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [uploadResetSignal, setUploadResetSignal] = useState(0);
  const [pendingFiles, setPendingFiles] = useState(initialPendingFiles); // ← moved to state

  // ── Delete ──────────────────────────────────────────────
  const handleDelete = (fileName: string) => {
    setPendingFiles(prev => prev.filter(f => f.name !== fileName));
  };

  // ── Download ────────────────────────────────────────────
 const handleDownload = (
   file: { name: string; tag: string; size: string },
   groupDate: string,
 ) => {
   const doc = new jsPDF();

   // Title
   doc.setFontSize(18);
   doc.setTextColor(40, 40, 40);
   doc.text('Document Details', 20, 20);

   // Divider line
   doc.setDrawColor(200, 200, 200);
   doc.line(20, 25, 190, 25);

   // Content
   doc.setFontSize(12);
   doc.setTextColor(60, 60, 60);

   doc.text(`File Name   : ${file.name}`, 20, 40);
   doc.text(`Document Type : ${file.tag}`, 20, 55);
   doc.text(`File Size   : ${file.size}`, 20, 70);
   doc.text(`Uploaded On  : ${groupDate}`, 20, 85);

   // Save/download
   doc.save(file.name.replace(/\.[^/.]+$/, '') + '_details.pdf');
 };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-[#E9EDF5] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] md:p-5">
        <h2 className="mb-4 text-[20px] font-semibold text-[#111827]">
          Upload Documents Here
        </h2>

        <div>
          <label className="mb-2 block text-xs font-medium text-[#111827]">
            Select Document Type
          </label>
          <select className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm text-[#111827] outline-none">
            <option value="">Select type of document</option>
            {documentTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <UploadDropzoneField
          className="my-6"
          hint="PNG, JPG up to 5Mb (Will appear on invoice)"
          description="Click to upload or drag and drop"
          maxSizeMb={5}
          onFileChange={setLogoFile}
          dropzoneBackgroundClassName="bg-[#F9FAFB]"
          dropzoneHoverBackgroundClassName="hover:bg-[#F2F4F7]"
          resetSignal={uploadResetSignal}
        />

        <div className="mt-4 space-y-3">
          {pendingFiles.length === 0 ? (
            <p className="text-center text-sm text-[#98A2B3]">
              No pending files
            </p>
          ) : (
            pendingFiles.map(file => (
              <div
                key={file.name}
                className="flex items-center justify-between rounded-xl border border-[#EEF0F5] bg-[#F9FAFB] px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <DocIcon />
                  <div>
                    <p className="text-sm text-[#111827]">{file.name}</p>
                    <p className="text-[11px] text-[#98A2B3]">
                      {file.size} • {file.date}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(file.name)}
                  className="text-[#FF5A5F] transition hover:opacity-70"
                >
                  <DeleteIcon />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          <button
            onClick={onBack}
            className="inline-flex h-10 items-center justify-center rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-6 text-sm font-medium text-[#344054]"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="inline-flex h-10 items-center justify-center rounded-xl bg-[#2F3E9E] px-6 text-sm font-medium text-white"
          >
            Submit
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-[#E9EDF5] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] md:p-5">
        <h2 className="mb-4 text-[20px] font-semibold text-[#111827]">
          Uploaded Documents
        </h2>

        <div className="space-y-6">
          {uploadedGroups.map(group => (
            <div key={group.date}>
              <p className="mb-3 text-sm font-medium text-[#111827]">
                {group.date}
              </p>

              <div className="space-y-3">
                {group.files.map(file => (
                  <div
                    key={file.name}
                    className="flex items-center justify-between rounded-xl border border-[#EEF0F5] bg-white px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <DocIcon />
                      <div>
                        <p className="text-sm text-[#111827]">{file.name}</p>
                        <p className="text-[11px] text-[#98A2B3]">
                          {file.size} • {group.date}
                        </p>
                        <span className="mt-2 inline-flex rounded-full bg-[#FFF6E6] px-2 py-[2px] text-[10px] font-medium text-[#D68A00]">
                          {file.tag}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDownload(file, group.date)}
                      className="text-[#98A2B3] transition hover:text-[#374151]"
                    >
                      <DownloadCloudIcon className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}