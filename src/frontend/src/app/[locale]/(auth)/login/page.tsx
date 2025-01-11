'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from '@/i18n/routing';
import { LoginForm } from '@/app/[locale]/(auth)/_components/login-form';

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className='container relative h-screen rounded-none bg-background p-2 shadow-lg dark:bg-foreground lg:h-full lg:rounded-2xl 2xl:p-8'>
      <div
        className='absolute right-8 top-8 cursor-pointer'
        onClick={() => router.back()}
      >
        <X />
      </div>

      <div className='flex'>
        <div className='relative hidden w-full bg-primary-100 p-4 dark:bg-slate-900 md:flex lg:rounded-2xl'>
          <div className='absolute bottom-4 left-8 w-11/12'>
            <Image
              src='/assets/images/illustrations/auth.png'
              alt='Auth Illustration'
              width={1000}
              height={1000}
              className='h-full w-full object-cover'
            />
          </div>
        </div>
        <div className='flex w-full items-center justify-center'>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
