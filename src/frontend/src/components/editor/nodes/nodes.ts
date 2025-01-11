import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { HashtagNode } from '@lexical/hashtag';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import { OverflowNode } from '@lexical/overflow';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import {
  Klass,
  LexicalNode,
  LexicalNodeReplacement,
  ParagraphNode,
  TextNode,
} from 'lexical';

import { AutocompleteNode } from './autocomplete-node';
import { CollapsibleContainerNode } from './collapsible-container-node';
import { CollapsibleContentNode } from './collapsible-content-node';
import { CollapsibleTitleNode } from './collapsible-title-node';
import { FigmaNode } from './embeds/figma-node';
import { TweetNode } from './embeds/tweet-node';
import { YouTubeNode } from './embeds/youtube-node';
import { EmojiNode } from './emoji-node';
import { EquationNode } from './equation-node';
import { ExcalidrawNode } from './excalidraw-node';
import { ImageNode } from './image-node';
import { InlineImageNode } from './inline-image-node';
import { KeywordNode } from './keyword-node';
import { LayoutContainerNode } from './layout-container-node';
import { LayoutItemNode } from './layout-item-node';
import { MentionNode } from './mention-node';
import { PageBreakNode } from './page-break-node';
import { PollNode } from './poll-node';

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
