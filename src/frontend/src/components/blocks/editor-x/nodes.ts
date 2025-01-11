import { AutoLinkNode, LinkNode } from '@lexical/link';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import {
  Klass,
  LexicalNode,
  LexicalNodeReplacement,
  ParagraphNode,
  TextNode,
} from 'lexical';
import { ListItemNode, ListNode } from '@lexical/list';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';

import { AutocompleteNode } from '@/components/editor/nodes/autocomplete-node';
import { CollapsibleContainerNode } from '@/components/editor/nodes/collapsible-container-node';
import { CollapsibleContentNode } from '@/components/editor/nodes/collapsible-content-node';
import { CollapsibleTitleNode } from '@/components/editor/nodes/collapsible-title-node';
import { EmojiNode } from '@/components/editor/nodes/emoji-node';
import { EquationNode } from '@/components/editor/nodes/equation-node';
import { ExcalidrawNode } from '@/components/editor/nodes/excalidraw-node';
import { FigmaNode } from '@/components/editor/nodes/embeds/figma-node';
import { HashtagNode } from '@lexical/hashtag';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { ImageNode } from '@/components/editor/nodes/image-node';
import { InlineImageNode } from '@/components/editor/nodes/inline-image-node';
import { KeywordNode } from '@/components/editor/nodes/keyword-node';
import { LayoutContainerNode } from '@/components/editor/nodes/layout-container-node';
import { LayoutItemNode } from '@/components/editor/nodes/layout-item-node';
import { MentionNode } from '@/components/editor/nodes/mention-node';
import { OverflowNode } from '@lexical/overflow';
import { PageBreakNode } from '@/components/editor/nodes/page-break-node';
import { PollNode } from '@/components/editor/nodes/poll-node';
import { TweetNode } from '@/components/editor/nodes/embeds/tweet-node';
import { YouTubeNode } from '@/components/editor/nodes/embeds/youtube-node';

export const nodes: ReadonlyArray<Klass<LexicalNode> | LexicalNodeReplacement> =
  [
    HeadingNode,
    ParagraphNode,
    TextNode,
    QuoteNode,
    ListNode,
    ListItemNode,
    LinkNode,
    OverflowNode,
    HashtagNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    CodeNode,
    CodeHighlightNode,
    HorizontalRuleNode,
    MentionNode,
    PageBreakNode,
    ImageNode,
    InlineImageNode,
    EmojiNode,
    KeywordNode,
    ExcalidrawNode,
    PollNode,
    LayoutContainerNode,
    LayoutItemNode,
    EquationNode,
    CollapsibleContainerNode,
    CollapsibleContentNode,
    CollapsibleTitleNode,
    AutoLinkNode,
    FigmaNode,
    TweetNode,
    YouTubeNode,
    AutocompleteNode,
  ];
