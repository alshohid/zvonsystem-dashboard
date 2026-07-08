// "use client"
// import { DownCaretIcon } from '@/src/icons';
// import { DocumentCard } from './DocumentCard';
// import {
//   DRIVER_DOCS,
//   RATE_CONFIRMATION_DOC,
// } from '@/src/app/(protected)/(dispatcher)/dispatcher/dashboard/loads/[loadId]/page';
// import UploadDropzoneField from '../../ui/input/UploadDropzoneField';
// import { useState } from 'react';

// export function DocumentsTab({
//   showUploadBox,
//   onDownload,
//   onDelete,
// }: {
//   showUploadBox: boolean;
//   onDownload: (id: string) => void;
//   onDelete: (id: string) => void;
//   }) {

//   const [logoFile, setLogoFile] = useState<File | null>(null);
//     const [uploadResetSignal, setUploadResetSignal] = useState(0);
//   return (
//     <div className="space-y-6">
//       <div className="rounded-2xl border border-[#EAECEF] bg-white p-4 sm:p-6">
//         <h3 className="mb-4 text-[18px] font-semibold text-[#111827]">
//           Rate Confirmation
//         </h3>

//         <DocumentCard
//           item={RATE_CONFIRMATION_DOC}
//           onDownload={onDownload}
//           onDelete={onDelete}
//         />

//         {showUploadBox && (
//           <UploadDropzoneField
//             className="my-6"
//             hint="PNG, JPG up to 5Mb"
//             description="Click to upload or drag and drop"
//             onFileChange={setLogoFile}
//             resetSignal={uploadResetSignal}
//           />
//         )}

//         <h3 className="mb-4 mt-8 text-[18px] font-semibold text-[#111827]">
//           Load Documents from Driver
//         </h3>

//         <div className="space-y-4">
//           {DRIVER_DOCS.map(item => (
//             <DocumentCard
//               key={item.id}
//               item={item}
//               onDownload={onDownload}
//               onDelete={onDelete}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';
import { DocumentCard } from './DocumentCard';

import UploadDropzoneField from '../../ui/input/UploadDropzoneField';
import { useState } from 'react';
import jsPDF from 'jspdf';
import { DocumentItem, DRIVER_DOCS, RATE_CONFIRMATION_DOC } from './loadConstants';

export function DocumentsTab({ showUploadBox }: { showUploadBox: boolean }) {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [uploadResetSignal, setUploadResetSignal] = useState(0);

  // Separate state for each section so deletes are independent
  const [rateConfDocs, setRateConfDocs] = useState<DocumentItem[]>([
    RATE_CONFIRMATION_DOC,
  ]);
  const [driverDocs, setDriverDocs] = useState<DocumentItem[]>(DRIVER_DOCS);

  // ── Delete ────────────────────────────────────────────────────────
  const handleDelete = (id: string) => {
    setRateConfDocs(prev => prev.filter(d => d.id !== id));
    setDriverDocs(prev => prev.filter(d => d.id !== id));
  };

  // ── Download — generates a PDF from document metadata ─────────────
  const handleDownload = (id: string) => {
    const all = [...rateConfDocs, ...driverDocs];
    const doc = all.find(d => d.id === id);
    if (!doc) return;

    const pdf = new jsPDF();

    // Header bar
    pdf.setFillColor(46, 58, 131); // #2E3A83
    pdf.rect(0, 0, 210, 28, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Document Details', 14, 18);

    // Body
    pdf.setTextColor(40, 40, 40);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');

    const rows: [string, string][] = [
      ['File Name', doc.name],
      ['Document Type', doc.tag],
      ['File Size', doc.size],
      ['Uploaded On', doc.uploadedAt],
    ];

    let y = 48;
    rows.forEach(([label, value]) => {
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(100, 100, 100);
      pdf.text(label, 14, y);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(30, 30, 30);
      pdf.text(value, 80, y);
      y += 14;
    });

    pdf.save(doc.name.replace(/\.[^/.]+$/, '') + '_details.pdf');
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#EAECEF] bg-white p-4 sm:p-6">
        {/* ── Rate Confirmation ── */}
        <h3 className="mb-4 text-[18px] font-semibold text-[#111827]">
          Rate Confirmation
        </h3>

        {rateConfDocs.length === 0 ? (
          <p className="text-sm text-[#98A2B3]">No documents</p>
        ) : (
          rateConfDocs.map(item => (
            <DocumentCard
              key={item.id}
              item={item}
              onDownload={handleDownload}
              onDelete={handleDelete}
            />
          ))
        )}

        {showUploadBox && (
          <UploadDropzoneField
            className="my-6"
            hint="PNG, JPG up to 5Mb"
            description="Click to upload or drag and drop"
            onFileChange={setLogoFile}
            resetSignal={uploadResetSignal}
          />
        )}

        {/* ── Driver Documents ── */}
        <h3 className="mb-4 mt-8 text-[18px] font-semibold text-[#111827]">
          Load Documents from Driver
        </h3>

        {driverDocs.length === 0 ? (
          <p className="text-sm text-[#98A2B3]">No documents</p>
        ) : (
          <div className="space-y-4">
            {driverDocs.map(item => (
              <DocumentCard
                key={item.id}
                item={item}
                onDownload={handleDownload}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}