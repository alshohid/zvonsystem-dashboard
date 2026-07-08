export default function SupportTypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="inline-flex max-w-[220px] items-center gap-2 rounded-[20px] rounded-bl-md bg-white px-4 py-3 shadow-[0_8px_20px_rgba(16,24,40,0.06)]">
        <span className="h-2 w-2 animate-bounce rounded-full bg-[#98A2B3] [animation-delay:-0.2s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-[#98A2B3] [animation-delay:-0.1s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-[#98A2B3]" />
        <span className="text-xs font-medium text-[#98A2B3]">Typing...</span>
      </div>
    </div>
  );
}
