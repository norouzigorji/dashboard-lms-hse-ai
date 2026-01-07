import { motion } from 'framer-motion'
import { TrendingUp, AlertTriangle, Shield, Users } from 'lucide-react'

const iconMap = {
  process: TrendingUp,
  alert: AlertTriangle,
  safety: Shield,
  contractor: Users,
}

const colorClasses = {
  'blue-purple': {
    gradient: 'from-blue-500/20 to-purple-500/20',
    border: 'border-blue-500/30',
    shadow: 'shadow-lg shadow-blue-500/20',
  },
  'purple-pink': {
    gradient: 'from-purple-500/20 to-pink-500/20',
    border: 'border-purple-500/30',
    shadow: 'shadow-lg shadow-purple-500/20',
  },
  'green': {
    gradient: 'from-green-500/20 to-emerald-500/20',
    border: 'border-green-500/30',
    shadow: 'shadow-lg shadow-green-500/20',
  },
  'yellow-orange': {
    gradient: 'from-yellow-500/20 to-orange-500/20',
    border: 'border-yellow-500/30',
    shadow: 'shadow-lg shadow-yellow-500/20',
  },
}

function SummaryCard({ title, value, icon, color, delay = 0 }) {
  const Icon = iconMap[icon] || TrendingUp
  const colorClass = colorClasses[color] || colorClasses['blue-purple']

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.02, y: -4 }}
      className={`
        glass-card rounded-2xl p-8
        bg-gradient-to-br ${colorClass.gradient}
        border-2 ${colorClass.border}
        ${colorClass.shadow}
        transition-all duration-300
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-300 text-sm mb-3 font-medium">{title}</p>
          <p className="text-4xl md:text-5xl font-extrabold text-white">{value}</p>
        </div>
        <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 ml-4">
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
    </motion.div>
  )
}

export default SummaryCard

