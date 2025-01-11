'use client';

import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('errorPage');
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center bg-primary'>
      <Image
        src='/assets/images/logo-sketch.png'
        alt='logo-sketch'
        width={1156}
        height={330}
        className='md:w-1/2'
      />
      <h1 className='text-9xl font-black text-white'>404</h1>
      <p className='text-white'>{t('404')}</p>
      <Link href='/' className='mt-8 text-white hover:underline'>
        {t('returnHome')}
      </Link>
    </div>
  );
}
