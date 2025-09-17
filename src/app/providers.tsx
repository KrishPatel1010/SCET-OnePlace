'use client';

import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { TokenProvider } from './components/context/TokenContext';
import Navbar from './components/Navbar';

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

export default function Providers({ children }: { children: React.ReactNode }) {
  if (!googleClientId) {
    console.warn('NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set. Google login will not work in production.');
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <TokenProvider>
        <Navbar />
        {children}
      </TokenProvider>
    </GoogleOAuthProvider>
  );
}


