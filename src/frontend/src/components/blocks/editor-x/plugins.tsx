import { AutoEmbedPlugin } from '@/components/editor/plugins/embeds/auto-embed-plugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { AutoLinkPlugin } from '@/components/editor/plugins/auto-link-plugin';
import { AutocompletePlugin } from '@/components/editor/plugins/autocomplete-plugin';
import { CharacterLimitPlugin } from '@/components/editor/plugins/actions/character-limit-plugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { ClearEditorActionPlugin } from '@/components/editor/plugins/actions/clear-editor-plugin';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import { ClickableLinkPlugin } from '@lexical/react/LexicalClickableLinkPlugin';
import { CodeActionMenuPlugin } from '@/components/editor/plugins/code-action-menu-plugin';
import { CodeHighlightPlugin } from '@/components/editor/plugins/code-highlight-plugin';
import { CollapsiblePlugin } from '@/components/editor/plugins/collapsible-plugin';
import { ComponentPickerMenuPlugin } from '@/components/editor/plugins/component-picker-plugin';
import { ContentEditable } from '@/components/editor/ui/content-editable';
import { ContextMenuPlugin } from '@/components/editor/plugins/context-menu-plugin';
import { DragDropPastePlugin } from '@/components/editor/plugins/drag-drop-paste-plugin';
import { DraggableBlockPlugin } from '@/components/editor/plugins/draggable-block-plugin';
import { EditModeTogglePlugin } from '@/components/editor/plugins/actions/edit-mode-toggle-plugin';
import { EmojiPickerPlugin } from '@/components/editor/plugins/emoji-picker-plugin';
import { EmojisPlugin } from '@/components/editor/plugins/emojis-plugin';
import { EquationsPlugin } from '@/components/editor/plugins/equations-plugin';
import { ExcalidrawPlugin } from '@/components/editor/plugins/excalidraw-plugin';
import { FigmaPlugin } from '@/components/editor/plugins/embeds/figma-plugin';
import { FloatingLinkEditorPlugin } from '@/components/editor/plugins/floating-link-editor-plugin';
import { FloatingTextFormatToolbarPlugin } from '@/components/editor/plugins/floating-text-format-toolbar-plugin';
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { HorizontalRulePlugin } from '@lexical/react/LexicalHorizontalRulePlugin';
import { ImagesPlugin } from '@/components/editor/plugins/images-plugin';
import { ImportExportPlugin } from '@/components/editor/plugins/actions/import-export-plugin';
import { InlineImagePlugin } from '@/components/editor/plugins/inline-image-plugin';
import { KeywordsPlugin } from '@/components/editor/plugins/keywords-plugin';
import { LayoutPlugin } from '@/components/editor/plugins/layout-plugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { LinkPlugin } from '@/components/editor/plugins/link-plugin';
import { ListMaxIndentLevelPlugin } from '@/components/editor/plugins/list-max-indent-level-plugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MARKDOWN_TRANSFORMERS } from '@/components/editor/transformers/markdown-transformers';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { MarkdownTogglePlugin } from '@/components/editor/plugins/actions/markdown-toggle-plugin';
import { MaxLengthPlugin } from '@/components/editor/plugins/actions/max-length-plugin';
import { MentionsPlugin } from '@/components/editor/plugins/mentions-plugin';
import { PageBreakPlugin } from '@/components/editor/plugins/page-break-plugin';
import { PollPlugin } from '@/components/editor/plugins/poll-plugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ShareContentPlugin } from '@/components/editor/plugins/actions/share-content-plugin';
import { SpeechToTextPlugin } from '@/components/editor/plugins/actions/speech-to-text-plugin';
import { TabFocusPlugin } from '@/components/editor/plugins/tab-focus-plugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { TableActionMenuPlugin } from '@/components/editor/plugins/table-action-menu-plugin';
import { TableCellResizerPlugin } from '@/components/editor/plugins/table-cell-resizer-plugin';
import { TableHoverActionsPlugin } from '@/components/editor/plugins/table-hover-actions-plugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { ToolbarPlugin } from '@/components/editor/plugins/toolbar/toolbar-plugin';
import { TreeViewPlugin } from '@/components/editor/plugins/actions/tree-view-plugin';
import { TwitterPlugin } from '@/components/editor/plugins/embeds/twitter-plugin';
import { YouTubePlugin } from '@/components/editor/plugins/embeds/youtube-plugin';
import { useState } from 'react';

const placeholder = 'Press / for commands...';
const maxLength = 500;

export function Plugins({}) {
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <div className='relative'>
      <ToolbarPlugin />
      <div className='relative'>
        <AutoFocusPlugin />
        <RichTextPlugin
          contentEditable={
            <div className=''>
              <div className='' ref={onRef}>
                <ContentEditable placeholder={placeholder} />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />

        <ClickableLinkPlugin />
        <CheckListPlugin />
        <HorizontalRulePlugin />
        <TablePlugin />
        <ListPlugin />
        <TabIndentationPlugin />
        <HashtagPlugin />
        <HistoryPlugin />

        <MentionsPlugin />
        <PageBreakPlugin />
        <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
        <KeywordsPlugin />
        <EmojisPlugin />
        <ImagesPlugin />
        <InlineImagePlugin />
        <ExcalidrawPlugin />
        <TableCellResizerPlugin />
        <TableHoverActionsPlugin anchorElem={floatingAnchorElem} />
        <TableActionMenuPlugin
          anchorElem={floatingAnchorElem}
          cellMerge={true}
        />
        <PollPlugin />
        <LayoutPlugin />
        <EquationsPlugin />
        <CollapsiblePlugin />

        <AutoEmbedPlugin />
        <FigmaPlugin />
        <TwitterPlugin />
        <YouTubePlugin />

        <CodeHighlightPlugin />
        <CodeActionMenuPlugin anchorElem={floatingAnchorElem} />

        <MarkdownShortcutPlugin transformers={MARKDOWN_TRANSFORMERS} />
        <TabFocusPlugin />
        <AutocompletePlugin />
        <AutoLinkPlugin />
        <LinkPlugin />

        <ComponentPickerMenuPlugin />
        <ContextMenuPlugin />
        <DragDropPastePlugin />
        <EmojiPickerPlugin />

        <FloatingLinkEditorPlugin anchorElem={floatingAnchorElem} />
        <FloatingTextFormatToolbarPlugin anchorElem={floatingAnchorElem} />

        <ListMaxIndentLevelPlugin />
      </div>
      <div className='clear-both flex h-10 items-center justify-between border-t p-1'>
        <MaxLengthPlugin maxLength={maxLength} />
        <CharacterLimitPlugin maxLength={maxLength} charset='UTF-16' />
        <div className='flex justify-end'>
          <SpeechToTextPlugin />
          <ShareContentPlugin />
          <ImportExportPlugin />
          <MarkdownTogglePlugin shouldPreserveNewLinesInMarkdown={true} />
          <EditModeTogglePlugin />
          <>
            <ClearEditorActionPlugin />
            <ClearEditorPlugin />
          </>
          <TreeViewPlugin />
        </div>
      </div>
    </div>
  );
}
