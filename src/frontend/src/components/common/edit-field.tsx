import { Check, Pencil, X } from 'lucide-react';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import { SerializedEditorState, createEditor } from 'lexical';
import { useEffect, useState } from 'react';

import { $generateHtmlFromNodes } from '@lexical/html';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Category } from '@/types/category';
import { Editor } from '@/components/blocks/editor-x/editor';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';

interface EditFieldProps {
  label: string;
  value: string;
  type?: 'text' | 'editor';
  onSave: (value: string) => Promise<void>;
  onSearch?: (search: string) => Promise<Option[]>;
}

export function EditField({
  label,
  value,
  type = 'text',
  onSave,
  onSearch,
}: EditFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
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
        setHtml(htmlString);
      });
    }
  }, [type, value]);

  const handleSave = async () => {
    try {
      setLoading(true);
      if (type === 'editor') {
        await onSave(JSON.stringify(editorState));
      } else {
        await onSave(editValue as string);
      }
      setIsEditing(false);
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
        <Label className='font-semibold'>{label}</Label>
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
            <Input
              value={editValue as string}
              onChange={(e) => setEditValue(e.target.value)}
              disabled={loading}
            />
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
