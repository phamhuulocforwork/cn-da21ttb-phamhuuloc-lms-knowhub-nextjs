'use client';

import { useState } from 'react';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ParentFormMessage } from '@/components/ui/parent-form-message';

import { CardWrapper } from '@/app/[locale]/(auth)/_components/card-wrapper';
import { useRouter } from '@/i18n/routing';

export const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const t = useTranslations('auth.login');
  const tValidation = useTranslations('auth.validation');
  const tServerMessages = useTranslations('auth.serverMessages');

  const formSchema = z.object({
    email: z.string().regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, {
      message: tValidation('invalidEmail'),
    }),
    password: z.string().min(1, { message: tValidation('invalidPassword') }),
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: FormData) => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const result = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        setError(tServerMessages('error.invalidCredentials'));
        return;
      }

      setSuccess(tServerMessages('success.login'));
      router.push('/');
    } catch (error) {
      console.error('Login error:', error);
      setError(tServerMessages('error.loginFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardWrapper
      headerLabel={t('headerLabel')}
      backButtonLabel={t('backButtonLabel')}
      backButtonLink='/register'
      backButtonLinkText={t('backButtonLinkText')}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-2'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('email')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      type='text'
                      placeholder={t('emailPlaceholder')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('password')}</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={loading} type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex w-full justify-end'>
              <Link
                className='text-right text-sm text-primary underline-offset-4 hover:underline'
                href='/forgot-password'
              >
                {t('forgotPassword')}
              </Link>
            </div>
          </div>
          <ParentFormMessage message={error} variant='error' />
          <ParentFormMessage message={success} />
          <div className='flex flex-col gap-2'>
            <Button className='w-full' type='submit' disabled={loading}>
              {loading ? (
                <span className='flex items-center gap-2'>
                  <LoadingSpinner size='sm' />
                  {t('submitLoading')}
                </span>
              ) : (
                t('submit')
              )}
            </Button>
            <SocialButtons loginWithGoogleLabel={t('loginWithGoogleLabel')} />
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

const SocialButtons = ({
  loginWithGoogleLabel,
}: {
  loginWithGoogleLabel: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setError(undefined);
      await signIn('google', { callbackUrl: '/' });
    } catch (error) {
      console.error('Google login error:', error);
      setError('Failed to login with Google. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex w-full flex-col items-center justify-center gap-2'>
      <Button
        size='lg'
        className='w-full justify-center gap-2'
        variant='outline'
        onClick={handleGoogleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <LoadingSpinner size='sm' />
        ) : (
          <FcGoogle className='h-6 w-6' />
        )}
        {loginWithGoogleLabel}
      </Button>
      {error && <p className='text-sm text-destructive'>{error}</p>}
    </div>
  );
};
