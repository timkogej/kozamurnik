'use client'

import { motion } from 'framer-motion'
import { Tag, Clock } from 'lucide-react'

interface Props {
  type: 'popust' | 'happy_hour'
  naziv: string
  badgeLabel: string
  originalCena: number
  finalCena: number
  size?: 'sm' | 'md'
}

export function PromotionBadge({
  type, naziv, badgeLabel, originalCena, finalCena, size = 'md'
}: Props) {
  const isHH = type === 'happy_hour'
  const bg = isHH ? '#F59E0B' : '#6D5EF7'
  const Icon = isHH ? Clock : Tag

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      className="flex items-center gap-2"
    >
      <div
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-white font-semibold"
        style={{
          backgroundColor: bg,
          fontSize: size === 'sm' ? 10 : 11,
        }}
      >
        <Icon size={size === 'sm' ? 9 : 10} />
        <span>{naziv}</span>
        <span className="opacity-90">{badgeLabel}</span>
      </div>

      <div className="flex items-center gap-1.5">
        <span
          className="line-through text-gray-400"
          style={{ fontSize: size === 'sm' ? 11 : 12 }}
        >
          €{Number(originalCena).toFixed(2)}
        </span>
        <span
          className="font-bold text-green-600"
          style={{ fontSize: size === 'sm' ? 12 : 14 }}
        >
          €{Number(finalCena).toFixed(2)}
        </span>
      </div>
    </motion.div>
  )
}
