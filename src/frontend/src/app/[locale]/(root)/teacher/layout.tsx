import { redirect } from 'next/navigation';

import { getServerSession } from 'next-auth';

import Forbidden from '@/components/pages/forbidden';

import { authOptions } from '@/lib/auth';

export default async function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  if (session.user.role !== 'TEACHER') {
    return <Forbidden />;
  }
  return <>{children}</>;
}
