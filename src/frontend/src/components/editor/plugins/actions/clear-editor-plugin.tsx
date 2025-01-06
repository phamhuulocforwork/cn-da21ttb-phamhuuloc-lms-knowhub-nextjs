import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { CLEAR_EDITOR_COMMAND } from 'lexical'
import { Trash2Icon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export function ClearEditorActionPlugin() {
  const [editor] = useLexicalComposerContext()
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size={'sm'} variant={'ghost'} className="p-2">
                <Trash2Icon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Clear Editor</TooltipContent>
          </Tooltip>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Clear Editor</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Are you sure you want to clear the editor?
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                variant="destructive"
                onClick={() => {
                  editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined)
                }}
              >
                Clear
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
