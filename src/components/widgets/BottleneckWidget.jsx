import { useState } from 'react'
import { AlertCircle, Bell, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

function BottleneckWidget({ bottlenecks }) {
  const [sentAlerts, setSentAlerts] = useState(new Set())

  const handleSendAlert = (id, unit) => {
    setSentAlerts(prev => new Set(prev).add(id))
    toast.success(`هشدار برای ${unit} ارسال شد`)
  }

  return (
    <div className="glass-card rounded-2xl p-8 animate-fade-in border-2 border-yellow-500/30">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-yellow-500" />
        هشدار گلوگاه‌ها
      </h3>
      <div className="space-y-3">
        {bottlenecks.map((bottleneck) => {
          const isSent = sentAlerts.has(bottleneck.id)
          return (
            <motion.div
              key={bottleneck.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="border border-yellow-500/50 rounded-xl p-4 bg-yellow-500/10 hover:bg-yellow-500/20 transition-colors"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-white text-sm font-medium mb-1">
                    {bottleneck.unit} - {bottleneck.delay}
                  </p>
                  <p className="text-gray-400 text-xs mb-3">{bottleneck.message}</p>
                  <button
                    onClick={() => handleSendAlert(bottleneck.id, bottleneck.unit)}
                    disabled={isSent}
                    className={`
                      flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium
                      transition-all duration-200
                      ${isSent
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30 cursor-not-allowed'
                        : 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border border-yellow-500/30'
                      }
                    `}
                  >
                    {isSent ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>هشدار ارسال شد</span>
                      </>
                    ) : (
                      <>
                        <Bell className="w-4 h-4" />
                        <span>ارسال هشدار</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default BottleneckWidget

