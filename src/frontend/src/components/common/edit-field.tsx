import { useEffect, useState } from 'react';

import { $generateHtmlFromNodes } from '@lexical/html';
import { Label } from '@radix-ui/react-label';
import { SerializedEditorState, createEditor } from 'lexical';
import { Check, Pencil, X } from 'lucide-react';
import { ZodSchema } from 'zod';

import { Editor } from '@/components/blocks/editor-x/editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Option } from '@/components/ui/multiple-selector';

interface EditFieldProps {
  label: string;
  value: string;
  options?: Option[];
  type?: 'text' | 'editor' | 'multiple-selector';
  onSave: (value: string) => Promise<void>;
  validation?: ZodSchema;
  required?: boolean;
}

export function EditField({
  label,
  value,
  options,
  type = 'text',
  onSave,
  validation,
  required = false,
}: EditFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [error, setError] = useState<string | null>(null);
  const [editorState, setEditorState] = useState<SerializedEditorState>(
    type === 'editor' ? JSON.parse(value as string) : null,
  );
  const [html, setHtml] = useState<string>('');
  const [loading, setLoading] = useState(false);

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

  return (
    <div className='space-y-2 rounded-md bg-muted-50 p-4'>
      <div className='flex items-center justify-between'>
        <Label className='font-semibold'>
          {label}
          {required && <span className='ml-1 text-destructive'>*</span>}
        </Label>
        {!isEditing && (
          <Button
            variant='icon'
            size='sm'
            onClick={() => setIsEditing(true)}
            className='h-8 w-8 p-0'
          >
            <Pencil className='h-4 w-4' />
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className='space-y-2'>
          {type === 'text' ? (
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
          ) : type === 'editor' ? (
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
          ) : null}
          <div className='flex items-center gap-2'>
            <Button size='sm' onClick={handleSave} disabled={loading}>
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
          {type === 'text' ? (
            <p className='text-sm'>{value as string}</p>
          ) : type === 'editor' ? (
            <div dangerouslySetInnerHTML={{ __html: html }} />
          ) : null}
        </div>
      )}
    </div>
  );
}
