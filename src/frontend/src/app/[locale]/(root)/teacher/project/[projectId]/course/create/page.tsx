'use client';

import { useCallback, useEffect, useState } from 'react';

import Image from 'next/image';

import { zodResolver } from '@hookform/resolvers/zod';
import { SerializedEditorState } from 'lexical';
import {
  ArrowRight,
  LayoutGrid,
  ScrollText,
  TvMinimalPlay,
  X,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Editor } from '@/components/blocks/editor-x/editor';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';

import { categoryService } from '@/services/categoryService';
import { courseService } from '@/services/courseService';

import { useRouter } from '@/i18n/routing';

const formSchema = z.object({
  projectId: z.string(),
  title: z.string().min(1, {
    message: 'Title is required',
  }),
  description: z.custom<SerializedEditorState>(),
  short_description: z.string().min(1, {
    message: 'Short description is required',
  }),
  thumbnail: z.string(),
  categoryIds: z.array(z.string()).min(1, {
    message: 'At least one category is required',
  }),
});

type CreateCourseFormValues = z.infer<typeof formSchema>;

const initialDescriptionValue = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: 'Course description ✍️',
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
} as unknown as SerializedEditorState;

export default function CreateCoursePage({
  params,
}: {
  params: { projectId: string };
}) {
  const router = useRouter();
  const t = useTranslations('teacher.projects');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Option[]>([]);
  const [editorState, setEditorState] = useState<SerializedEditorState>(
    initialDescriptionValue,
  );

  const fetchCategories = useCallback(async (search: string = '') => {
    const { categories } = await categoryService.getCategories({
      page: 1,
      limit: 10,
      search,
    });

    const mappedCategories = categories.map((category) => ({
      label: category.name,
      value: category.id,
    }));

    setCategories(mappedCategories);
    return mappedCategories;
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const form = useForm<CreateCourseFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectId: params.projectId,
      title: '',
      description: initialDescriptionValue,
      short_description: '',
      thumbnail: '/assets/images/placeholder.png',
      categoryIds: [],
    },
  });

  const onSubmit = async (values: CreateCourseFormValues) => {
    try {
      setLoading(true);
      const course = await courseService.createCourse({
        ...values,
        description: JSON.stringify(editorState),
      });
      router.push(`/teacher/project/${params.projectId}/course/${course.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col'>
      <div className='flex w-full items-center justify-between border-b p-4'>
        <Button
          variant='icon'
          size='icon'
          className='bg-muted-200 hover:bg-muted-300'
          onClick={() => router.back()}
        >
          <X />
        </Button>
        <h1 className='text-lg font-semibold'>{t('create.formTitle')}</h1>
        <Button onClick={form.handleSubmit(onSubmit)} disabled={loading}>
          {loading ? (
            <span className='flex items-center gap-2'>
              <LoadingSpinner size='sm' />
              {t('create.submitting')}
            </span>
          ) : (
            <span className='flex items-center gap-2'>
              {t('create.create')} <ArrowRight />
            </span>
          )}
        </Button>
      </div>
      <div className='container mt-8 flex flex-col'>
        <Image
          src='/assets/images/placeholder.png'
          alt='thumbnail'
          width={1920}
          height={1080}
          className='h-64 w-full rounded-md object-cover md:rounded-t-2xl'
        />
        <div className='relative p-8'>
          <div className='absolute -top-6 rounded-xl border-[3px] border-white bg-accent p-2 text-accent-foreground'>
            <TvMinimalPlay className='size-12' />
          </div>
          <div className='mt-8 flex flex-col'>
            <Form {...form}>
              <form className='space-y-8'>
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={loading}
                          className='border-none text-3xl font-bold tracking-wide ring-0 focus-visible:ring-0 focus-visible:ring-offset-0'
                          placeholder={t('create.title')}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='flex flex-col gap-2'>
                  <div className='flex flex-col gap-4 md:flex-row md:gap-0'>
                    <Label className='w-48' icon={LayoutGrid}>
                      {t('create.categories')}*
                    </Label>
                    <FormField
                      control={form.control}
                      name='categoryIds'
                      render={({ field }) => (
                        <FormItem className='flex-1'>
                          <FormControl>
                            <MultipleSelector
                              className='rounded-none border-2 border-b border-l-0 border-r-0 border-t-0 border-dotted ring-0 ring-offset-0 focus-within:ring-0'
                              disabled={loading}
                              defaultOptions={categories}
                              onSearch={fetchCategories}
                              triggerSearchOnFocus={true}
                              value={
                                field.value
                                  .map((id) =>
                                    categories.find((cat) => cat.value === id),
                                  )
                                  .filter(Boolean) as Option[]
                              }
                              onChange={(selected) => {
                                field.onChange(
                                  selected.map((opt) => opt.value),
                                );
                              }}
                              placeholder={t('create.selectCategories')}
                              emptyIndicator={t('create.no_results')}
                              options={categories}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className='flex flex-col gap-4 md:flex-row md:gap-0'>
                    <Label className='w-48' icon={ScrollText}>
                      {t('create.description')}*
                    </Label>
                    <FormField
                      control={form.control}
                      name='short_description'
                      render={({ field }) => (
                        <FormItem className='flex-1'>
                          <FormControl>
                            <Input
                              className='flex-1 rounded-none border-2 border-b border-l-0 border-r-0 border-t-0 border-dotted focus-visible:ring-0 focus-visible:ring-offset-0'
                              placeholder={t('create.description')}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Editor
                          editorSerializedState={editorState}
                          onSerializedChange={(value) => {
                            setEditorState(value);
                          }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
