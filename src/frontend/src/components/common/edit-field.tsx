import { useEffect, useState } from 'react';

import Image from 'next/image';

import { $generateHtmlFromNodes } from '@lexical/html';
import { Label } from '@radix-ui/react-label';
import { SerializedEditorState, createEditor } from 'lexical';
import { Check, Pencil, X } from 'lucide-react';
import { ZodSchema } from 'zod';

import { Editor } from '@/components/blocks/editor-x/editor';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';

import { UploadDropzone } from '@/lib/uploadthing';

import { ourFileRouter } from '@/app/api/uploadthing/core';

interface EditFieldProps {
  label: string;
  value: string | string[];
  options?: Option[];
  type?: 'text' | 'editor' | 'multiple-selector' | 'file';
  onSave: (value: string | string[]) => Promise<void>;
  validation?: ZodSchema;
  required?: boolean;
  onSearch?: (search: string) => Promise<Option[]>;
  endpoint?: keyof typeof ourFileRouter;
}

export function EditField({
  label,
  value,
  options = [],
  type = 'text',
  onSave,
  validation,
  required = false,
  onSearch,
  endpoint,
}: EditFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [error, setError] = useState<string | null>(null);
  const [editorState, setEditorState] = useState<SerializedEditorState>(
    type === 'editor' ? JSON.parse(value as string) : null,
  );
  const [html, setHtml] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(
    type === 'multiple-selector'
      ? options.filter((opt) => (value as string[]).includes(opt.value))
      : [],
  );

  useEffect(() => {
    if (type === 'editor' && value) {
      const tempEditor = createEditor({
        nodes: [],
        onError: () => null,
      });
      tempEditor.setEditorState(tempEditor.parseEditorState(value as string));
      tempEditor.update(() => {
        const htmlString = $generateHtmlFromNodes(tempEditor);
        // Check if editor state is empty
        const editorState = tempEditor.getEditorState();
        const json = editorState.toJSON();
        const isEmpty = json.root.children.every(
          (child: any) =>
            child.children.length === 0 ||
            (child.children.length === 1 && child.children[0].text === ''),
        );

        if (isEmpty) {
          setHtml('<p class="text-muted-foreground italic">Empty content</p>');
        } else {
          setHtml(htmlString);
        }
      });
    }
  }, [type, value]);

  const validateField = (valueToValidate: string): boolean => {
    if (!validation) return true;

    try {
      validation.parse(valueToValidate);
      setError(null);
      return true;
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Invalid value');
      return false;
    }
  };

  const handleSave = async () => {
    const valueToValidate =
      type === 'editor' ? JSON.stringify(editorState) : editValue;

    if (!validateField(valueToValidate as string)) {
      return;
    }

    try {
      setLoading(true);
      if (type === 'editor') {
        await onSave(JSON.stringify(editorState));
      } else if (type === 'file') {
        await onSave(image as string);
      } else {
        await onSave(editValue as string);
      }
      setIsEditing(false);
      setError(null);
    } catch (error) {
      console.error('Failed to save:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (type === 'editor') {
      setEditorState(JSON.parse(value as string));
      const tempEditor = createEditor({
        nodes: [],
        onError: () => null,
      });
      tempEditor.setEditorState(tempEditor.parseEditorState(value as string));
      tempEditor.update(() => {
        const htmlString = $generateHtmlFromNodes(tempEditor);
        setHtml(htmlString);
      });
    } else {
      setEditValue(value as string);
    }
    setIsEditing(false);
  };

  const renderField = () => {
    switch (type) {
      case 'text':
        return (
          <>
            <Input
              value={editValue as string}
              onChange={(e) => {
                setEditValue(e.target.value);
                if (error) validateField(e.target.value);
              }}
              disabled={loading}
            />
            {error && (
              <p className='text-[0.8rem] font-medium text-destructive'>
                {error}
              </p>
            )}
          </>
        );
      case 'editor':
        return (
          <Editor
            editorSerializedState={editorState}
            onSerializedChange={(value) => {
              setEditorState(value);
              const tempEditor = createEditor({
                nodes: [],
                onError: () => null,
              });
              tempEditor.setEditorState(
                tempEditor.parseEditorState(JSON.stringify(value)),
              );
              tempEditor.update(() => {
                const htmlString = $generateHtmlFromNodes(tempEditor);
                setHtml(htmlString);
              });
            }}
          />
        );
      case 'multiple-selector':
        return (
          <MultipleSelector
            disabled={loading}
            defaultOptions={options}
            onSearch={onSearch}
            triggerSearchOnFocus={true}
            value={selectedOptions}
            onChange={(selected) => {
              setSelectedOptions(selected);
            }}
            placeholder='Click to select categories'
            emptyIndicator='No results'
            options={options}
          />
        );
      case 'file':
        return (
          <div className='space-y-4'>
            <Image
              src={image || (value as string)}
              alt='Upload preview'
              width={1920}
              height={1080}
              className='h-64 w-full rounded-md object-cover'
            />
            <UploadDropzone
              endpoint={endpoint!}
              onClientUploadComplete={(res: any) => {
                if (res?.[0]) {
                  setImage(res[0].url);
                }
              }}
              onUploadError={(error: Error) => {
                console.error('Failed to upload:', error);
              }}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='space-y-2 rounded-md bg-slate-100 p-4'>
      <div className='flex items-center justify-between'>
        <Label className='font-semibold'>
          {label}
          {required && <span className='ml-1 text-destructive'>*</span>}
        </Label>
        {!isEditing && (
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setIsEditing(true)}
            className='h-8 w-8 p-0'
          >
            <Pencil className='h-4 w-4' />
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className='space-y-2'>
          {renderField()}
          <div className='flex items-center gap-2'>
            <Button
              size='sm'
              onClick={async () => {
                if (type === 'multiple-selector') {
                  await onSave(selectedOptions.map((opt) => opt.value));
                } else {
                  await handleSave();
                }
                setIsEditing(false);
              }}
              disabled={loading}
            >
              <Check className='mr-2 h-4 w-4' />
              Save
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={handleCancel}
              disabled={loading}
            >
              <X className='mr-2 h-4 w-4' />
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className=''>
          {type === 'file' ? (
            <>
              {value ? (
                <Image
                  src={value as string}
                  alt='thumbnail'
                  width={1920}
                  height={1080}
                  className='h-64 w-full rounded-md object-cover'
                />
              ) : (
                <div className='flex h-full items-center justify-center bg-muted'>
                  <span className='text-sm text-muted-foreground'>
                    Click to upload
                  </span>
                </div>
              )}
            </>
          ) : type === 'text' ? (
            <p className='text-sm'>{value as string}</p>
          ) : type === 'editor' ? (
            <div dangerouslySetInnerHTML={{ __html: html }} />
          ) : type === 'multiple-selector' ? (
            <div className='flex flex-wrap gap-1'>
              {options
                .filter((opt) => (value as string[]).includes(opt.value))
                .map((category) => (
                  <Badge key={category.value} variant='tag' className='text-xs'>
                    {category.label}
                  </Badge>
                ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
