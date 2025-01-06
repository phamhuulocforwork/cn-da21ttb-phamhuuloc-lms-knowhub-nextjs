import { INSERT_EMBED_COMMAND } from '@lexical/react/LexicalAutoEmbedPlugin'
import { INSERT_HORIZONTAL_RULE_COMMAND } from '@lexical/react/LexicalHorizontalRuleNode'
import {
  ChevronRightIcon,
  Columns3Icon,
  DiffIcon,
  FileImageIcon,
  FrameIcon,
  ImageIcon,
  ListCheckIcon,
  PlusIcon,
  ScissorsIcon,
  SquareSplitVerticalIcon,
  TableIcon,
} from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'

import { useToolbarContext } from '../../context/toolbar-context'
import { useEditorModal } from '../../hooks/use-modal'
import { INSERT_COLLAPSIBLE_COMMAND } from '../collapsible-plugin'
import { EmbedConfigs } from '../embeds/auto-embed-plugin'
import { InsertEquationDialog } from '../equations-plugin'
import { INSERT_EXCALIDRAW_COMMAND } from '../excalidraw-plugin'
import { InsertImageDialog } from '../images-plugin'
import { InsertInlineImageDialog } from '../inline-image-plugin'
import { InsertLayoutDialog } from '../layout-plugin'
import { INSERT_PAGE_BREAK } from '../page-break-plugin'
import { InsertPollDialog } from '../poll-plugin'
import { InsertTableDialog } from '../table-plugin'

export function BlockInsertPlugin({ children }: { children: React.ReactNode }) {
  const { activeEditor } = useToolbarContext()
  const [modal, showModal] = useEditorModal()

  return (
    <>
      {modal}
      <Select value={''}>
        <SelectTrigger className="h-8 w-min gap-1">
          <PlusIcon className="size-4" />
          <span>Insert</span>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>{children}</SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}
