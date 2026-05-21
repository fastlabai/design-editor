'use client'
import * as React from 'react'
import * as RadixTooltip from '@radix-ui/react-tooltip'
import { clsx } from 'clsx'

export type TooltipProps = {
  children: React.ReactNode
  title: React.ReactNode
  placement?: 'top' | 'right' | 'bottom' | 'left'
  className?: string
}

export const Tooltip = React.forwardRef<HTMLElement, TooltipProps>(({ children, title, placement = 'top', className }, ref) => {
  if (!title) return <>{children}</>
  return (
    <RadixTooltip.Provider delayDuration={200}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild ref={ref as any}>
          {children}
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={placement}
            sideOffset={4}
            className={clsx('de-tooltip-content', className)}
          >
            {title}
            <RadixTooltip.Arrow className="de-tooltip-arrow" width={8} height={4} />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
})
