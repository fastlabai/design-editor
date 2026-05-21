'use client'
import * as React from 'react'
import * as RadixPopover from '@radix-ui/react-popover'
import { clsx } from 'clsx'

export type PopoverProps = {
  children: React.ReactNode
  content: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  placement?: 'top' | 'right' | 'bottom' | 'left'
  contentClassName?: string
}

export function Popover({ children, content, open, onOpenChange, placement = 'bottom', contentClassName }: PopoverProps) {
  return (
    <RadixPopover.Root open={open} onOpenChange={onOpenChange}>
      <RadixPopover.Trigger asChild>
        {children}
      </RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          side={placement}
          sideOffset={4}
          className={clsx('de-popover-content', contentClassName)}
        >
          {content}
          <RadixPopover.Arrow className="de-popover-arrow" width={10} height={5} />
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  )
}
