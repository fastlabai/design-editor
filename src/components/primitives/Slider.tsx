'use client'
import * as React from 'react'
import * as RadixSlider from '@radix-ui/react-slider'

export type SliderProps = {
  value: number
  onValueChange: (v: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  'aria-label'?: string
}

export function Slider({ value, onValueChange, min = 0, max = 100, step = 1, ...rest }: SliderProps) {
  return (
    <RadixSlider.Root
      className="de-slider-root"
      value={[value]}
      onValueChange={(v) => onValueChange(v[0] ?? 0)}
      min={min}
      max={max}
      step={step}
      {...rest}
    >
      <RadixSlider.Track className="de-slider-track">
        <RadixSlider.Range className="de-slider-range" />
      </RadixSlider.Track>
      <RadixSlider.Thumb className="de-slider-thumb" />
    </RadixSlider.Root>
  )
}
