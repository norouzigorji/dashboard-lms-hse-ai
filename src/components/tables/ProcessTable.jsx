import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, XCircle } from 'lucide-react'
import toast from 'react-hot-toast'

function ProcessTable({ processes: initialProcesses }) {
  const [processes, setProcesses] = useState(initialProcesses)

  const getStatusBadge = (status) => {
    if (status === 'منطبق' || status === 'تایید شده') {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
          {status}
        </span>
      )
    }
    return (
      <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30">
        {status}
      </span>
    )
  }

  const handleApprove = (id) => {
    setProcesses(prev => prev.map(p => 
      p.id === id ? { ...p, status: 'تایید شده' } : p
    ))
    toast.success('فرایند تایید شد')
  }

  const handleReject = (id) => {
    setProcesses(prev => prev.map(p => 
      p.id === id ? { ...p, status: 'رد شده' } : p
    ))
    toast.error('فرایند رد شد')
  }

  return (
    <div className="glass-card rounded-2xl p-8 animate-fade-in">
      <h3 className="text-xl font-bold text-white mb-6">جدول فرایندهای زنده</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-300">شماره فرم</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-300">نوع فرایند</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-300">واحد درخواست کننده</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-300">تاریخ ثبت</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-300">وضعیت</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-300">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((process, index) => (
              <motion.tr
                key={process.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                  index % 2 === 0 ? 'bg-white/2' : ''
                }`}
              >
                <td className="py-3 px-4 text-sm text-white">{process.formNumber}</td>
                <td className="py-3 px-4 text-sm text-gray-300">{process.processType}</td>
                <td className="py-3 px-4 text-sm text-gray-300">{process.requestingUnit}</td>
                <td className="py-3 px-4 text-sm text-gray-300">{process.registrationDate}</td>
                <td className="py-3 px-4 text-sm">{getStatusBadge(process.status)}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2 justify-end">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleApprove(process.id)}
                      disabled={process.status === 'تایید شده'}
                      className="p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleReject(process.id)}
                      disabled={process.status === 'رد شده'}
                      className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProcessTable

