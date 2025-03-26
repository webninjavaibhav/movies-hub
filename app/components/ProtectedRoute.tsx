'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '../utils/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return <>{children}</>;
} 