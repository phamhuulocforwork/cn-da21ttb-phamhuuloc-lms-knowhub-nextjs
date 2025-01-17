import { useTranslations } from 'next-intl';

import { CreateProjectForm } from '../_components/create-project-form';

export default function CreateProjectPage() {
  const t = useTranslations('teacher.projects.create');
  return (
    <div className='mx-auto max-w-5xl p-6'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold'>{t('formTitle')}</h1>
        <p className='text-muted-foreground'>{t('formDescription')}</p>
      </div>
      <CreateProjectForm />
    </div>
  );
}
