import { AlertTriangle } from 'lucide-react'

function UrgentAlerts({ alerts }) {
  return (
    <div className="glass-card rounded-xl md:rounded-2xl p-4 md:p-6 animate-fade-in">
      <h3 className="text-lg md:text-xl font-bold text-white mb-4 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
        هشدارهای فوری
      </h3>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="border border-red-500/50 rounded-lg p-4 bg-red-500/10 hover:bg-red-500/20 transition-colors"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-white text-sm">{alert.message}</p>
                <p className="text-gray-400 text-xs mt-1">{alert.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UrgentAlerts

