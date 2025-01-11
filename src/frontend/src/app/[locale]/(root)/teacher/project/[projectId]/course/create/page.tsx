'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { LayoutGrid, TvMinimalPlay, X } from 'lucide-react';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import { useCallback, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Editor } from '@/components/blocks/editor-x/editor';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SerializedEditorState } from 'lexical';
import { categoryService } from '@/services/categoryService';
import { courseService } from '@/services/courseService';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  projectId: z.string().optional(),
  title: z.string().min(1, {
    message: 'Title is required',
  }),
  description: z.custom<SerializedEditorState>(),
  thumbnail: z.string().optional(),
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

export default function CreateCoursePage() {
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
      title: '',
      description: initialDescriptionValue,
      thumbnail: 'https://placehold.co/600x400',
      categoryIds: [],
    },
  });

  const onSubmit = async (values: CreateCourseFormValues) => {
    try {
      setLoading(true);
      await courseService.createCourse({
        ...values,
        description: JSON.stringify(editorState),
      });
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
        >
          <X />
        </Button>
        <h1 className='text-lg font-semibold'>Create new course</h1>
        <Button onClick={form.handleSubmit(onSubmit)} disabled={loading}>
          Create
        </Button>
      </div>
      <div className='container mt-8 flex flex-col'>
        <Image
          src='https://images.unsplash.com/photo-1586717791821-3f44a563fa4c'
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
                          placeholder='Course title'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='flex flex-col gap-4 md:flex-row md:gap-0'>
                  <Label className='w-48' icon={LayoutGrid}>
                    Categories
                  </Label>
                  <FormField
                    control={form.control}
                    name='categoryIds'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <MultipleSelector
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
                              field.onChange(selected.map((opt) => opt.value));
                            }}
                            placeholder='Select categories'
                            emptyIndicator='No results'
                            options={categories}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
