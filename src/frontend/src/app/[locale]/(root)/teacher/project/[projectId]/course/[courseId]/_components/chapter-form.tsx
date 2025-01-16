'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { SerializedEditorState } from 'lexical';
import { Check, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Editor } from '@/components/blocks/editor-x/editor';
import { useToast } from '@/components/hooks/use-toast';
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

import { Chapter } from '@/types/chapter';

import { chapterService } from '@/services/chapterService';

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
            text: 'Chapter description ✍️',
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

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required',
  }),
  description: z.custom<SerializedEditorState>(),
});

type ChapterFormValues = z.infer<typeof formSchema>;

interface ChapterFormProps {
  courseId: string;
  onSuccess: (chapter: Chapter) => void;
  onCancel: () => void;
}

export function ChapterForm({
  courseId,
  onSuccess,
  onCancel,
}: ChapterFormProps) {
  const [loading, setLoading] = useState(false);
  const [editorState, setEditorState] = useState<SerializedEditorState>(
    initialDescriptionValue,
  );
  const { toast } = useToast();
  const tToast = useTranslations('toast');

  const form = useForm<ChapterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: initialDescriptionValue,
    },
  });

  const onSubmit = async (values: ChapterFormValues) => {
    try {
      setLoading(true);
      const savedChapter = await chapterService.createChapter(courseId, {
        ...values,
        description: JSON.stringify(initialDescriptionValue),
        position: 0,
        isPublished: false,
      });
      onSuccess(savedChapter);
      toast({
        variant: 'success',
        title: tToast('updateSuccess'),
      });
    } catch (error) {
      console.error('Failed to create chapter:', error);
      toast({
        variant: 'destructive',
        title: tToast('updateError'),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='space-y-4 rounded-md border bg-slate-100 p-4'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chapter Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={loading}
                    placeholder='Enter chapter title'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex items-center gap-2'>
            <Button type='submit' disabled={loading}>
              <Check className='mr-2 h-4 w-4' />
              Create
            </Button>
            <Button
              type='button'
              variant='outline'
              onClick={onCancel}
              disabled={loading}
            >
              <X className='mr-2 h-4 w-4' />
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
