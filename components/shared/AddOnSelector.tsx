'use client'

import { motion } from 'framer-motion'
import { Plus, Clock, Check } from 'lucide-react'
import { usePromotionsStore } from '@/store/promotionsStore'
import type { AddOnOption } from '@/lib/promotionsApi'

interface Props {
  addOns: AddOnOption[]
  isLoading: boolean
  primaryColor?: string
}

export function AddOnSelector({ addOns, isLoading, primaryColor = '#6D5EF7' }: Props) {
  const { selectedAddOn, selectAddOn } = usePromotionsStore()

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 p-4">
        <div className="animate-pulse flex gap-3">
          <div className="w-8 h-8 bg-gray-100 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-gray-100 rounded w-1/3" />
            <div className="h-3 bg-gray-100 rounded w-2/3" />
          </div>
        </div>
      </div>
    )
  }

  if (!addOns.length) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      <div className="flex items-center gap-2">
        <div
          className="w-5 h-5 rounded-full flex items-center justify-center"
          style={{ backgroundColor: primaryColor + '20' }}
        >
          <Plus size={12} style={{ color: primaryColor }} />
        </div>
        <p className="text-sm font-semibold text-gray-700">
          Dodaj storitev
        </p>
        <span className="text-xs text-gray-400 font-normal">(izberite 1)</span>
      </div>

      <div className="space-y-2">
        {addOns.map((addOn) => {
          const isSelected = selectedAddOn?.id === addOn.id
          return (
            <motion.button
              key={addOn.id}
              onClick={() => selectAddOn(isSelected ? null : addOn)}
              whileTap={{ scale: 0.98 }}
              className="w-full text-left rounded-xl border-2 p-3 transition-all duration-200"
              style={{
                borderColor: isSelected ? primaryColor : '#E5E7EB',
                backgroundColor: isSelected ? primaryColor + '08' : 'white',
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900 text-sm truncate">
                      {addOn.naziv}
                    </p>
                    <span
                      className="shrink-0 text-white text-xs font-bold px-1.5 py-0.5 rounded-full"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {addOn.badgeLabel}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1 text-gray-400">
                      <Clock size={11} />
                      <span className="text-xs">{addOn.trajanjeMin} min</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-gray-400 line-through">
                        €{addOn.originalCena.toFixed(2)}
                      </span>
                      <span className="text-sm font-bold text-green-600">
                        €{addOn.finalCena.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className="ml-3 w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all"
                  style={{
                    borderColor: isSelected ? primaryColor : '#D1D5DB',
                    backgroundColor: isSelected ? primaryColor : 'transparent',
                  }}
                >
                  {isSelected && <Check size={11} color="white" strokeWidth={3} />}
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}
