import React from 'react';

interface LoadingButtonProps {
    isLoading: boolean;
    onClick: () => void;
    children: React.ReactNode;
    loadingText?: string;
    className?: string;
    type?: "submit" | "reset" | "button";
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
    type = "submit",
    isLoading,
    onClick,
    children,
    loadingText = "Loading...",
    className
}) => {
    return (
        <button
            type={type}
            disabled={isLoading}
            onClick={onClick}
            className={`
        mt-2 h-12 w-full rounded-[16px]
        bg-[#2E3A83] text-[13px] font-medium text-white
        transition hover:opacity-90 disabled:cursor-not-allowed
        disabled:opacity-70
        flex items-center justify-center
        ${className}
      `}
        >
            {isLoading ? (
                <>
                    <span className="loader mr-2"></span>
                    <span>{loadingText}</span>
                </>
            ) : (
                children
            )}
        </button>
    );
};

export default LoadingButton;
