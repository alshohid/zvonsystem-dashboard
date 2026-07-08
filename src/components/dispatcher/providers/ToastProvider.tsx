'use client';

import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          borderRadius: '12px',
          background: '#FFFFFF',
          color: '#161721',
          fontFamily: 'Poppins',
          boxShadow: '0 12px 40px #00000026',
          border: '1px solid #E5E7EB',
        },
        success: {
          iconTheme: {
            primary: '#2B3674',
            secondary: '#FFFFFF',
          },
        },
        error: {
          iconTheme: {
            primary: '#DC2626',
            secondary: '#FFFFFF',
          },
        },
      }}
    />
  );
}
