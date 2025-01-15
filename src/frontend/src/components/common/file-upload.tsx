'use client';

import { useTranslations } from 'next-intl';

import { useToast } from '@/components/hooks/use-toast';

import { UploadDropzone } from '@/lib/uploadthing';

import { ourFileRouter } from '@/app/api/uploadthing/core';

interface FileUploadProps {
  onChange: (url: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  const { toast } = useToast();
  const tToast = useTranslations('toast');

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={() => {
        toast({
          variant: 'destructive',
          title: tToast('uploadError'),
        });
      }}
    />
  );
};
