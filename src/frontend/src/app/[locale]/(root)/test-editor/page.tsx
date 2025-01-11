'use client';

import { SerializedEditorState, createEditor } from 'lexical';

import { $generateHtmlFromNodes } from '@lexical/html';
import { Editor } from '@/components/blocks/editor-x/editor';
import { useState } from 'react';

const initialValue = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: 'Hello World 🚀',
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

export default function EditorDemo() {
  const [editorState, setEditorState] =
    useState<SerializedEditorState>(initialValue);
  const [html, setHtml] = useState<string>('');

  return (
    <div className='space-y-4 p-4'>
      <Editor
        editorSerializedState={editorState}
        onSerializedChange={(value: SerializedEditorState) => {
          setEditorState(value);
          // Get HTML from editor state
          const editorStateJSON = JSON.stringify(value);
          const tempEditor = createEditor({
            nodes: [], // Add your node types here
            onError: () => null,
          });
          tempEditor.setEditorState(
            tempEditor.parseEditorState(editorStateJSON),
          );
          tempEditor.update(() => {
            const htmlString = $generateHtmlFromNodes(tempEditor);
            setHtml(htmlString);
          });
        }}
      />

      <div
        className='rounded border p-4'
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
