'use client';

import { EditorState, SerializedEditorState } from 'lexical';
import {
  InitialConfigType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer';

import { FloatingLinkContext } from '@/components/editor/context/floating-link-context';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { Plugins } from './plugins';
import { SharedAutocompleteContext } from '@/components/editor/context/shared-autocomplete-context';
import { TooltipProvider } from '@/components/ui/tooltip';
import { editorTheme } from '@/components/editor/themes/editor-theme';
import { nodes } from './nodes';

const editorConfig: InitialConfigType = {
  namespace: 'Editor',
  theme: editorTheme,
  nodes,
  onError: (error: Error) => {
    console.error(error);
  },
};

export function Editor({
  editorState,
  editorSerializedState,
  onChange,
  onSerializedChange,
}: {
  editorState?: EditorState;
  editorSerializedState?: SerializedEditorState;
  onChange?: (editorState: EditorState) => void;
  onSerializedChange?: (editorSerializedState: SerializedEditorState) => void;
}) {
  return (
    <div className='overflow-hidden rounded-lg border bg-background shadow'>
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
          ...(editorState ? { editorState } : {}),
          ...(editorSerializedState
            ? { editorState: JSON.stringify(editorSerializedState) }
            : {}),
        }}
      >
        <TooltipProvider>
          <SharedAutocompleteContext>
            <FloatingLinkContext>
              <Plugins />

              <OnChangePlugin
                ignoreSelectionChange={true}
                onChange={(editorState) => {
                  onChange?.(editorState);
                  onSerializedChange?.(editorState.toJSON());
                }}
              />
            </FloatingLinkContext>
          </SharedAutocompleteContext>
        </TooltipProvider>
      </LexicalComposer>
    </div>
  );
}
