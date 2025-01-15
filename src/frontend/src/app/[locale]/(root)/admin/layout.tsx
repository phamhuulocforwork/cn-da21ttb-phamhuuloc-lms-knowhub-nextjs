import { redirect } from 'next/navigation';

import { getServerSession } from 'next-auth';

import Forbidden from '@/components/pages/forbidden';

import { authOptions } from '@/lib/auth';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  if (session.user.role !== 'ADMIN') {
    return <Forbidden />;
  }

  return <>{children}</>;
}
