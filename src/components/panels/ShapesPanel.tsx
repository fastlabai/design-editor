'use client'
// import React, { useState } from 'react'
// import { Tooltip } from 'antd'
// import { SearchOutlined, DownOutlined, UpOutlined } from '@ant-design/icons'

// export type ShapeStyleType = 'filled' | 'outline' | 'gradient' | 'image'

// interface ShapeDef {
//   id: string
//   label: string
//   d: string
//   viewBox: string
// }

// // The 21 core shapes that map to the downloaded PNGs
// export const SHAPES: ShapeDef[] = [
//   { id: 'square', label: 'Square', viewBox: '0 0 200 200', d: 'M 10 10 L 190 10 L 190 190 L 10 190 Z' },
//   { id: 'ellipse', label: 'Ellipse', viewBox: '0 0 200 200', d: 'M 100 10 C 149.7 10 190 50.3 190 100 C 190 149.7 149.7 190 100 190 C 50.3 190 10 149.7 10 100 C 10 50.3 50.3 10 100 10 Z' },
//   { id: 'polygon', label: 'Polygon', viewBox: '0 0 200 200', d: 'M 100 15 L 185.6 72.2 L 152.9 172.8 L 47.1 172.8 L 14.4 72.2 Z' },
//   { id: 'line', label: 'Line', viewBox: '0 0 200 200', d: 'M 20 10 L 40 10 L 180 170 L 160 190 Z' },
//   { id: 'star-round', label: 'Rounded Star', viewBox: '0 0 200 200', d: 'M 100 10 L 121 70 L 185 72 L 134 111 L 152 172 L 100 136 L 47 172 L 65 111 L 14 72 L 78 70 Z' },
//   { id: 'star', label: 'Star', viewBox: '0 0 200 200', d: 'M 100 10 L 121 70 L 185 72 L 134 111 L 152 172 L 100 136 L 47 172 L 65 111 L 14 72 L 78 70 Z' },
//   { id: 'arrow-archer', label: 'Archer Arrow', viewBox: '0 0 200 200', d: 'M 0 70 L 120 70 L 120 25 L 200 100 L 120 175 L 120 130 L 0 130 Z' },
//   { id: 'arrow-thin-rounded', label: 'Thin Rounded Arrow', viewBox: '0 0 200 200', d: 'M 0 85 L 140 85 L 140 50 L 200 100 L 140 150 L 140 115 L 0 115 Z' },
//   { id: 'arrow-thin', label: 'Thin Arrow', viewBox: '0 0 200 200', d: 'M 0 85 L 140 85 L 140 50 L 200 100 L 140 150 L 140 115 L 0 115 Z' },
//   { id: 'arrow-wide', label: 'Wide Arrow', viewBox: '0 0 200 200', d: 'M 0 60 L 100 60 L 100 10 L 200 100 L 100 190 L 100 140 L 0 140 Z' },
//   { id: 'arrow-fat', label: 'Fat Arrow', viewBox: '0 0 200 200', d: 'M 0 50 L 80 50 L 80 0 L 200 100 L 80 200 L 80 150 L 0 150 Z' },
//   { id: 'splash-4', label: 'Splash 4', viewBox: '0 0 200 200', d: 'M 100 10 C 130 10 160 40 190 70 C 200 100 180 150 140 180 C 100 200 60 190 30 160 C 0 130 10 80 40 50 C 60 20 80 0 100 10 Z' },
//   { id: 'splash-3', label: 'Splash 3', viewBox: '0 0 200 200', d: 'M 100 10 C 130 10 160 40 190 70 C 200 100 180 150 140 180 C 100 200 60 190 30 160 C 0 130 10 80 40 50 C 60 20 80 0 100 10 Z' },
//   { id: 'splash-2', label: 'Splash 2', viewBox: '0 0 200 200', d: 'M 100 10 C 130 10 160 40 190 70 C 200 100 180 150 140 180 C 100 200 60 190 30 160 C 0 130 10 80 40 50 C 60 20 80 0 100 10 Z' },
//   { id: 'splash-1', label: 'Splash 1', viewBox: '0 0 200 200', d: 'M 100 10 C 130 10 160 40 190 70 C 200 100 180 150 140 180 C 100 200 60 190 30 160 C 0 130 10 80 40 50 C 60 20 80 0 100 10 Z' },
//   { id: 'organic-dot-2', label: 'Organic Dot 2', viewBox: '0 0 200 200', d: 'M 100 10 C 150 20 180 60 190 110 C 190 160 140 190 90 180 C 40 170 10 120 20 70 C 30 20 60 0 100 10 Z' },
//   { id: 'organic-dot-1', label: 'Organic Dot 1', viewBox: '0 0 200 200', d: 'M 100 10 C 150 20 180 60 190 110 C 190 160 140 190 90 180 C 40 170 10 120 20 70 C 30 20 60 0 100 10 Z' },
//   { id: 'organic-4', label: 'Organic 4', viewBox: '0 0 200 200', d: 'M 100 10 C 150 20 180 60 190 110 C 190 160 140 190 90 180 C 40 170 10 120 20 70 C 30 20 60 0 100 10 Z' },
//   { id: 'organic-3', label: 'Organic 3', viewBox: '0 0 200 200', d: 'M 100 10 C 150 20 180 60 190 110 C 190 160 140 190 90 180 C 40 170 10 120 20 70 C 30 20 60 0 100 10 Z' },
//   { id: 'organic-2', label: 'Organic 2', viewBox: '0 0 200 200', d: 'M 100 10 C 150 20 180 60 190 110 C 190 160 140 190 90 180 C 40 170 10 120 20 70 C 30 20 60 0 100 10 Z' },
//   { id: 'organic-1', label: 'Organic 1', viewBox: '0 0 200 200', d: 'M 100 10 C 150 20 180 60 190 110 C 190 160 140 190 90 180 C 40 170 10 120 20 70 C 30 20 60 0 100 10 Z' },
// ]

// interface Props {
//   onAddShape: (d: string, viewBox: string, styleType: ShapeStyleType) => void
// }

// export function ShapesPanel({ onAddShape }: Props) {
//   const [search, setSearch] = useState('')

//   const filteredShapes = search.trim() 
//     ? SHAPES.filter(s => s.label.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase()))
//     : SHAPES

//   return (
//     <div className="flex flex-col h-full bg-surface">
//       <div className="px-4 pt-4 pb-2">
//         <div className="flex items-center bg-[color-mix(in_srgb,var(--color-text)_5%,transparent)] rounded-lg px-3 py-2 border border-[var(--color-border)] focus-within:border-[var(--color-primary)] transition-colors">
//           <SearchOutlined className="text-[var(--color-text-muted)] mr-2" />
//           <input
//             type="text"
//             placeholder="Search shapes..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="bg-transparent border-none outline-none flex-1 text-[var(--color-text)] text-sm"
//           />
//         </div>
//       </div>

//       <div className="flex-1 overflow-y-auto pb-6 scrollbar-hide px-4">
//         <ShapeCategory title="Filled" styleType="filled" shapes={filteredShapes} onAddShape={onAddShape} />
//         <ShapeCategory title="Outline" styleType="outline" shapes={filteredShapes} onAddShape={onAddShape} />
//         <ShapeCategory title="Gradient" styleType="gradient" shapes={filteredShapes} onAddShape={onAddShape} />
//         <ShapeCategory title="Image" styleType="image" shapes={filteredShapes} onAddShape={onAddShape} />
        
//         {filteredShapes.length === 0 && (
//            <div className="mt-8 text-center text-[var(--color-text-muted)] text-sm">
//              No shapes found for "{search}"
//            </div>
//         )}
//       </div>
//     </div>
//   )
// }

// function ShapeCategory({ 
//   title, styleType, shapes, onAddShape 
// }: { 
//   title: string, styleType: ShapeStyleType, shapes: ShapeDef[],
//   onAddShape: (d: string, viewBox: string, styleType: ShapeStyleType) => void 
// }) {
//   const [expanded, setExpanded] = useState(false)
//   if (shapes.length === 0) return null

//   return (
//     <div className="mt-5">
//       <div className="flex items-center justify-between mb-3">
//         <h3 className="text-sm font-bold text-[var(--color-text)] tracking-tight">{title}</h3>
//         {shapes.length > 3 && (
//           <button 
//             onClick={() => setExpanded(!expanded)}
//             className="flex items-center text-xs font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors bg-transparent border-none cursor-pointer"
//           >
//             {expanded ? 'Less' : `More (${shapes.length})`}
//             {expanded ? <UpOutlined className="ml-1 text-[10px]" /> : <DownOutlined className="ml-1 text-[10px]" />}
//           </button>
//         )}
//       </div>
      
//       <div className={`gap-2 ${expanded ? 'grid grid-cols-3' : 'flex overflow-x-auto scrollbar-hide snap-x'}`}>
//         {shapes.map((shape) => (
//           <div key={shape.id} className={expanded ? 'w-full' : 'snap-start shrink-0'}>
//             <ShapeTile shape={shape} styleType={styleType} onClick={() => onAddShape(shape.d, shape.viewBox, styleType)} />
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// function ShapeTile({ shape, styleType, onClick }: { shape: ShapeDef; styleType: ShapeStyleType; onClick: () => void }) {
//   const [hov, setHov] = useState(false)
  
//   // Use the downloaded PNGs from public folder
//   const imgUrl = `/shapes/thumbnails/${styleType}-${shape.id}.png`

//   const handleDragStart = (e: React.DragEvent<HTMLButtonElement>) => {
//     e.dataTransfer.effectAllowed = 'copy'
//     e.dataTransfer.setData('text/x-adspot-type', 'shape')
//     e.dataTransfer.setData('text/x-adspot-shape-d', shape.d)
//     e.dataTransfer.setData('text/x-adspot-shape-viewbox', shape.viewBox)
//     e.dataTransfer.setData('text/x-adspot-shape-style', styleType)
//   }

//   return (
//     <Tooltip title={shape.label} placement="top">
//       <button
//         onClick={onClick}
//         draggable
//         onDragStart={handleDragStart}
//         onMouseEnter={() => setHov(true)}
//         onMouseLeave={() => setHov(false)}
//         className="w-[72px] h-[72px] rounded-xl flex items-center justify-center cursor-pointer border-none outline-none transition-all duration-200 relative overflow-hidden"
//         style={{
//           background: 'color-mix(in srgb, var(--color-text) 5%, transparent)',
//           boxShadow: hov ? '0 0 0 2px var(--color-primary)' : 'none',
//         }}
//       >
//         <img
//           src={imgUrl}
//           alt={shape.label}
//           draggable={false}
//           className="w-[85%] h-[85%] object-contain transition-opacity duration-200 pointer-events-none"
//           style={{ opacity: hov ? 0.8 : 1 }}
//           onError={(e) => {
//              // Fallback if image failed to download or doesn't exist
//              e.currentTarget.style.display = 'none';
//           }}
//         />
//       </button>
//     </Tooltip>
//   )
// }

import React, { useState } from 'react'
import { Tooltip } from '../primitives'
import {
  SearchOutlined,
  DownOutlined,
  UpOutlined,
  RightOutlined,
} from '@ant-design/icons'

export type ShapeCategoryType =
  | 'filled'
  | 'outline'
  | 'gradient'
  | 'image'
  | 'abstract'
  | 'abstract_outline'
  | 'abstract_gradient'
  | 'abstract_image'

export interface ShapeDef {
  id: string
  label: string
  category: ShapeCategoryType
  file: string
}
interface Props {
  onAddShape: (src: string) => void
}

const SHAPE_FILES: Record<ShapeCategoryType, string[]> = {
  filled: [
    'filled-arrow-archer.png',
    'filled-arrow-fat.png',
    'filled-arrow-thin-rounded.png',
    'filled-arrow-thin.png',
    'filled-arrow-wide.png',
    'filled-blob.png',
    'filled-cloud.png',
    'filled-crescent.png',
    'filled-cross.png',
    'filled-ellipse.png',
    'filled-four-star.png',
    'filled-frame.png',
    'filled-heart.png',
    'filled-kite.png',
    'filled-line.png',
    'filled-oval.png',
    'filled-pie.png',
    'filled-pill.png',
    'filled-polygon.png',
    'filled-quarter-circle-outline.png',
    'filled-quarter-circle.png',
    'filled-quarterfoil.png',
    'filled-rectangle-mask.png',
    'filled-rectangle.png',
    'filled-rhombus.png',
    'filled-ring.png',
    'filled-round-mask.png',
    'filled-rounded-rectangle.png',
    'filled-semicircle.png',
    'filled-square.png',
    'filled-star-round.png',
    'filled-star.png',
    'filled-sun.png',
    'filled-trefoil.png',
    'filled-triangle-right.png',
    'filled-triangle.png',
    'filled-wiggle.png',
    'filled-ziczac.png',
  ],

  outline: [
    'outline-arrow-archer.png',
    'outline-arrow-fat.png',
    'outline-arrow-thin-rounded.png',
    'outline-arrow-thin.png',
    'outline-arrow-wide.png',
    'outline-blob.png',
    'outline-cloud.png',
    'outline-crescent.png',
    'outline-cross.png',
    'outline-ellipse.png',
    'outline-four-star.png',
    'outline-frame.png',
    'outline-heart.png',
    'outline-kite.png',
    'outline-line.png',
    'outline-oval.png',
    'outline-pie.png',
    'outline-pill.png',
    'outline-quarter-circle-outline.png',
    'outline-quarter-circle.png',
    'outline-quarterfoil.png',
    'outline-rectangle-mask.png',
    'outline-rectangle.png',
    'outline-rhombus.png',
    'outline-ring.png',
    'outline-round-mask.png',
    'outline-rounded-rectangle.png',
    'outline-semicircle.png',
    'outline-square.png',
    'outline-star-round.png',
    'outline-star.png',
    'outline-sun.png',
    'outline-trefoil.png',
    'outline-triangle-right.png',
    'outline-triangle.png',
    'outline-wiggle.png',
    'outline-ziczac.png',
  ],

  gradient: [
    'gradient-arrow-archer.png',
    'gradient-arrow-fat.png',
    'gradient-arrow-thin-rounded.png',
    'gradient-arrow-thin.png',
    'gradient-arrow-wide.png',
    'gradient-blob.png',
    'gradient-cloud.png',
    'gradient-crescent.png',
    'gradient-cross.png',
    'gradient-ellipse.png',
    'gradient-four-star.png',
    'gradient-frame.png',
    'gradient-heart.png',
    'gradient-kite.png',
    'gradient-line.png',
    'gradient-oval.png',
    'gradient-pie.png',
    'gradient-pill.png',
    'gradient-polygon.png',
    'gradient-quarter-circle-outline.png',
    'gradient-quarter-circle.png',
    'gradient-quarterfoil.png',
    'gradient-rectangle-mask.png',
    'gradient-rhombus.png',
    'gradient-ring.png',
    'gradient-round-mask.png',
    'gradient-rounded-rectangle.png',
    'gradient-semicircle.png',
    'gradient-square.png',
    'gradient-star-round.png',
    'gradient-star.png',
    'gradient-sun.png',
    'gradient-trefoil.png',
    'gradient-triangle-right.png',
    'gradient-triangle.png',
    'gradient-wiggle.png',
    'gradient-ziczac.png',
  ],

  image: [
    'image-arrow-archer.png',
    'image-arrow-fat.png',
    'image-arrow-thin-rounded.png',
    'image-arrow-thin.png',
    'image-arrow-wide.png',
    'image-blob.png',
    'image-cloud.png',
    'image-crescent.png',
    'image-cross.png',
    'image-ellipse.png',
    'image-four-star.png',
    'image-frame.png',
    'image-heart.png',
    'image-kite.png',
    'image-line.png',
    'image-oval.png',
    'image-pie.png',
    'image-pill.png',
    'image-polygon.png',
    'image-quarter-circle-outline.png',
    'image-quarter-circle.png',
    'image-quarterfoil.png',
    'image-rectangle-mask.png',
    'image-rectangle.png',
    'image-rhombus.png',
    'image-ring.png',
    'image-round-mask.png',
    'image-rounded-rectangle.png',
    'image-semicircle.png',
    'image-square.png',
    'image-star-round.png',
    'image-star.png',
    'image-sun.png',
    'image-trefoil.png',
    'image-triangle-right.png',
    'image-triangle.png',
    'image-wiggle.png',
    'image-ziczac.png',
  ],

  abstract: [
    'filled-organic-1.png',
    'filled-organic-2.png',
    'filled-organic-3.png',
    'filled-organic-4.png',
    'filled-organic-dot-1.png',
    'filled-organic-dot-2.png',
    'filled-splash-1.png',
    'filled-splash-2.png',
    'filled-splash-3.png',
    'filled-splash-4.png',
  ],

  abstract_outline: [
    'outline-organic-1.png',
    'outline-organic-2.png',
    'outline-organic-3.png',
    'outline-organic-4.png',
    'outline-organic-dot-1.png',
    'outline-organic-dot-2.png',
    'outline-splash-1.png',
    'outline-splash-2.png',
    'outline-splash-3.png',
    'outline-splash-4.png',
  ],

  abstract_gradient: [
    'gradient-organic-1.png',
    'gradient-organic-2.png',
    'gradient-organic-3.png',
    'gradient-organic-4.png',
    'gradient-organic-dot-1.png',
    'gradient-organic-dot-2.png',
    'gradient-splash-1.png',
    'gradient-splash-2.png',
    'gradient-splash-3.png',
    'gradient-splash-4.png',
  ],

  abstract_image: [
    'image-organic-1.png',
    'image-organic-2.png',
    'image-organic-3.png',
    'image-organic-4.png',
    'image-organic-dot-1.png',
    'image-organic-dot-2.png',
    'image-splash-1.png',
    'image-splash-2.png',
    'image-splash-3.png',
    'image-splash-4.png',
  ],
}
export const SHAPES: ShapeDef[] = Object.entries(
  SHAPE_FILES
).flatMap(([category, files]) =>
  files.map((file) => ({
    id: file
      .replace(/\.(svg|png)$/i, '')
      .replace(/_/g, '-'),

    label: file
      .replace(/\.(svg|png)$/i, '')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase()),

    category: category as ShapeCategoryType,

    file,
  }))
)
// ─────────────────────────────────────────────────────────────
// CATEGORY ORDER  (mirrors StickersPanel pattern)
// ─────────────────────────────────────────────────────────────

const CATEGORY_ORDER: { key: ShapeCategoryType; label: string }[] = [
  { key: 'filled',   label: 'Filled'   },
  { key: 'outline',  label: 'Outline'  },
  { key: 'gradient', label: 'Gradient' },
  { key: 'image',    label: 'Image'    },
  { key: 'abstract',   label: 'Abstract'},
  { key: 'abstract_outline', label: 'Abstract Outline'},
  { key: 'abstract_gradient', label:'Abstract Gradient'},
  { key: 'abstract_image', label:'Abstract Image'},
]



// ─────────────────────────────────────────────────────────────
// MAIN PANEL
// ─────────────────────────────────────────────────────────────

export function ShapesPanel({ onAddShape }: Props) {
  const [search, setSearch] = useState('')

  const filteredShapes = search.trim()
    ? SHAPES.filter(
        (s) =>
          s.label.toLowerCase().includes(search.toLowerCase()) ||
          s.id.toLowerCase().includes(search.toLowerCase())
      )
    : SHAPES

  return (
    <div className="flex flex-col h-full bg-surface">

      {/* SEARCH */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center bg-[color-mix(in_srgb,var(--color-text)_5%,transparent)] rounded-lg px-3 py-2 border border-[var(--color-border)] focus-within:border-[var(--color-primary)] transition-colors">
          <SearchOutlined className="text-[var(--color-text-muted)] mr-2" />
          <input
            type="text"
            placeholder="Search shapes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none flex-1 text-[var(--color-text)] text-sm"
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto pb-6 scrollbar-hide px-4">

       {CATEGORY_ORDER.map((category) => {
  const categoryShapes = filteredShapes.filter(
    (shape) => shape.category === category.key
  )

  return (
    <ShapeCategory
      key={category.key}
      title={category.label}
      shapes={categoryShapes}
      onAddShape={onAddShape}
    />
  )
})}

        {filteredShapes.length === 0 && (
          <div className="mt-8 text-center text-[var(--color-text-muted)] text-sm">
            No shapes found for "{search}"
          </div>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// CATEGORY  (mirrors StickerCategory exactly)
// ─────────────────────────────────────────────────────────────

function ShapeCategory({
  title,
  shapes,
  onAddShape,
}: {
  title: string
  shapes: ShapeDef[]
  onAddShape: (src: string) => void
}) {
  const [expanded, setExpanded] = useState(false)

  if (shapes.length === 0) return null

  const hasMore = shapes.length > 0

  return (
    <div className="mt-5">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-[var(--color-text)] tracking-tight">
          {title}
        </h3>

        {hasMore && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center text-xs font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors bg-transparent border-none cursor-pointer"
          >
            {expanded
              ? 'Less'
              : `More (${shapes.length})`}

            {expanded ? (
              <UpOutlined className="ml-1 text-[10px]" />
            ) : (
              <DownOutlined className="ml-1 text-[10px]" />
            )}
          </button>
        )}
      </div>

      {expanded ? (
        /* EXPANDED — 3-col grid */
        <div className="grid grid-cols-3 gap-2 mt-1 auto-rows-fr">
          {shapes.map((shape) => (
            <ShapeTile
              key={shape.id}
              shape={shape}
              onClick={() =>
                onAddShape(
                  `https://cdn.jsdelivr.net/gh/fastlabai/design-editor/assets/shapes/${shape.category}/${shape.file}`
                )
              }
            />
          ))}
        </div>
      ) : (
        /* COLLAPSED — horizontal scroll, scrollbar hidden, with arrow hint */
        <ScrollRow shapes={shapes} onAddShape={onAddShape} />
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// SCROLL ROW  (mirrors ScrollRow from StickersPanel 1:1)
// ─────────────────────────────────────────────────────────────

function ScrollRow({
  shapes,
  onAddShape,
}: {
  shapes: ShapeDef[]
  onAddShape: (src: string) => void
}) {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    const el = scrollRef.current
    if (!el) return
    // Hide arrow when scrolled to the end (within 4px)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 160, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <style>{`.sticker-hscroll::-webkit-scrollbar { display: none; }`}</style>

      {/* Scroll container
          - mx-[-16px] breaks out of the parent px-4 so left edge is never clipped
          - px-[16px] restores the visual indent
          - py-[3px] gives the 2px ring room top & bottom             */}
      <div
        ref={scrollRef}
        className="sticker-hscroll flex gap-2 py-[3px] mx-[-16px] px-[16px]"
        style={{
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        onScroll={checkScroll}
      >
        {shapes.map((shape) => (
          <div key={shape.id} className="shrink-0"  style={{
        width: 'calc((100% - 24px) / 4)',
      }}>
            <ShapeTile
              shape={shape}
              onClick={() =>
                onAddShape(
                  `https://cdn.jsdelivr.net/gh/fastlabai/design-editor/assets/shapes/${shape.category}/${shape.file}`
                )
              }
            />
          </div>
        ))}
      </div>

      {/* Right arrow — fades out when fully scrolled */}
      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer border-none outline-none"
          style={{
            width: 22,
            height: 22,
            borderRadius: 6,
            background: 'var(--color-surface, #fff)',
            boxShadow: '-8px 0 14px 8px var(--color-surface, #fff)',
          }}
        >
          <RightOutlined style={{ fontSize: 10, color: 'var(--color-text-muted)' }} />
        </button>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// TILE  (fluid width, aspect-ratio 1/1 — mirrors StickerTile)
// ─────────────────────────────────────────────────────────────

function ShapeTile({
  shape,
  onClick,
  expanded = false,
}: {
  shape: ShapeDef
  onClick: () => void
  expanded?: boolean
}) {
  const [hovered, setHovered] = useState(false)

  const imageUrl = `https://cdn.jsdelivr.net/gh/fastlabai/design-editor/assets/shapes/${shape.category}/${shape.file}`

  const handleDragStart = (
    e: React.DragEvent<HTMLButtonElement>
  ) => {
    e.dataTransfer.effectAllowed = 'copy'
    e.dataTransfer.setData('text/x-adspot-type', 'shape')
    e.dataTransfer.setData(
      'text/x-adspot-shape-src',
      imageUrl
    )
  }

  return (
    <Tooltip title={shape.label} placement="top">
      <button
        onClick={onClick}
        draggable
        onDragStart={handleDragStart}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="
          w-full
          rounded-xl
          flex
          items-center
          justify-center
          cursor-pointer
          border-none
          outline-none
          transition-all
          duration-200
          shrink-0
        "
        style={{
          width: '100%',
          aspectRatio: '1 / 1',

          background:
            'color-mix(in srgb, var(--color-text) 5%, transparent)',

          boxShadow: hovered
            ? '0 0 0 2px var(--color-border, #d1d5db)'
            : 'none',

          transform: hovered ? 'scale(1.03)' : 'scale(1)',
        }}
      >
        <img
          src={imageUrl}
          alt={shape.label}
          draggable={false}
          className="
            w-[78%]
            h-[78%]
            object-contain
            pointer-events-none
            select-none
            transition-opacity
            duration-200
          "
          style={{
            opacity: hovered ? 0.85 : 1,
          }}
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      </button>
    </Tooltip>
  )
}
