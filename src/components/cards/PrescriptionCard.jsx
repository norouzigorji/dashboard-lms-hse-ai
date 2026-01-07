import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain } from 'lucide-react'
import toast from 'react-hot-toast'
import ActionButton from '../common/ActionButton'
import { slideOut } from '../../utils/animations'

function PrescriptionCard({ prescription }) {
  const [isDismissed, setIsDismissed] = useState(false)

  const handleApprove = () => {
    setIsDismissed(true)
    setTimeout(() => {
      toast.success('دستور کار صادر شد')
    }, 400)
  }

  const handleDismiss = () => {
    setIsDismissed(true)
    setTimeout(() => {
      toast('تجویز نادیده گرفته شد', { icon: 'ℹ️' })
    }, 400)
  }

  if (isDismissed) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 300 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="glass-card rounded-2xl p-8 border-2 border-orange-500/50 neon-border"
      >
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center border-2 border-orange-500/50 flex-shrink-0">
            <Brain className="w-8 h-8 text-orange-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-4">باکس تجویز هوشمند</h3>
            <div className="space-y-3 mb-6">
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                <p className="text-red-400 font-medium text-sm">{prescription.risk}</p>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{prescription.recommendation}</p>
            </div>
            <div className="flex gap-3">
              <ActionButton
                variant="success"
                onClick={handleApprove}
                className="flex-1"
              >
                تایید و ارجاع به فنی
              </ActionButton>
              <ActionButton
                variant="ghost"
                onClick={handleDismiss}
              >
                نادیده گرفتن
              </ActionButton>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default PrescriptionCard

