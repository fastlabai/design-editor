'use client'
import * as React from 'react'

interface Props {
  value: string
  onChange: (next: string) => void
  debounceMs?: number
}

export function TextDesignSearchBar({ value, onChange, debounceMs = 300 }: Props) {
  const [local, setLocal] = React.useState(value)
  const lastEmittedRef = React.useRef(value)

  // sync external value into local input
  React.useEffect(() => {
    setLocal(value)
    lastEmittedRef.current = value
  }, [value])

  React.useEffect(() => {
    if (local === lastEmittedRef.current) return
    const id = setTimeout(() => {
      lastEmittedRef.current = local
      onChange(local)
    }, debounceMs)
    return () => clearTimeout(id)
  }, [local, debounceMs, onChange])

  return (
    <div style={{ padding: '12px 12px 0 12px' }}>
      <input
        type="search"
        placeholder="Search text designs"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        style={{
          width: '100%',
          padding: '8px 12px',
          fontSize: 13,
          border: '1px solid var(--color-border)',
          borderRadius: 6,
          background: 'var(--color-bg)',
          color: 'var(--color-text)',
          outline: 'none',
        }}
      />
    </div>
  )
}
