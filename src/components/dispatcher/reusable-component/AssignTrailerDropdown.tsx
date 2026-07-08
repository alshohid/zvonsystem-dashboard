// interface AssignTrailerDropdownProps {
//   value: string | number | undefined;
//   onChange: (value: string | number) => void;
//   options: { label: string; value: string | number }[];
// }

// export default function AssignTrailerDropdown({ value, onChange, options }: AssignTrailerDropdownProps) {
//   return (
//     <div className="relative border border-gray-200 rounded-xl bg-[#FCFCFD] p-3 cursor-not-allowed">
//       <p className="text-xs text-gray-400">
//         (Dropdown Component: Assign Trailer)
//       </p>
//     </div>
//   );
// }
interface Option {
  label: string;
  value: string;
}

interface AssignTrailerDropdownProps {
  value: string;
  onChange: (val: string) => void;
  options: Option[];
  placeholder: string;
}

export default function AssignTrailerDropdown({
  value,
  onChange,
  options,
  placeholder,
}: AssignTrailerDropdownProps) {
  return (
    <div className="relative border border-gray-200 rounded-xl bg-[#FCFCFD] p-3 cursor-not-allowed">
      <p className="text-xs text-gray-400">
        (Dropdown Component: Assign Trailer)
      </p>
    </div>
  );
}