import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Trophy, TrendingUp, TrendingDown, MoreVertical, Award, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

function Leaderboard({ contractors: initialContractors, onSelectContractor, onScoreChange }) {
  const [contractors, setContractors] = useState(initialContractors)

  const getMedalIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500 fill-yellow-500" />
      case 2:
        return <Trophy className="w-5 h-5 text-gray-400 fill-gray-400" />
      case 3:
        return <Trophy className="w-5 h-5 text-orange-600 fill-orange-600" />
      default:
        return <span className="text-gray-400 font-bold">{rank}</span>
    }
  }

  const handleReward = (id) => {
    setContractors(prev => {
      const updated = prev.map(c => 
        c.id === id ? { ...c, score: Math.min(5, c.score + 0.1) } : c
      )
      // Sort by score descending
      updated.sort((a, b) => b.score - a.score)
      // Update ranks
      updated.forEach((c, index) => {
        c.rank = index + 1
      })
      return updated
    })
    onScoreChange?.(id, 'reward')
  }

  const handleWarning = (id) => {
    setContractors(prev => {
      const updated = prev.map(c => 
        c.id === id ? { ...c, score: Math.max(0, c.score - 0.1) } : c
      )
      // Sort by score descending
      updated.sort((a, b) => b.score - a.score)
      // Update ranks
      updated.forEach((c, index) => {
        c.rank = index + 1
      })
      return updated
    })
    onScoreChange?.(id, 'warning')
  }

  return (
    <div className="glass-card rounded-2xl p-8 animate-fade-in">
      <h3 className="text-xl font-bold text-white mb-6">جدول لیگ پیمانکاران</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-300">رتبه</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-300">نام پیمانکار</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-300">پروژه‌های فعال / تکمیل</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-300">امتیاز کل (از ۵)</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-300">روند</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-300">عملیات</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {contractors.map((contractor, index) => (
                <motion.tr
                  key={contractor.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => onSelectContractor(contractor)}
                  className={`
                    border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer
                    ${index % 2 === 0 ? 'bg-white/2' : ''}
                    ${contractor.rank <= 3 ? 'bg-gradient-to-r from-yellow-500/5 to-transparent' : ''}
                  `}
                >
                  <td className="py-3 px-4 text-sm">
                    <div className="flex items-center justify-end gap-2">
                      {getMedalIcon(contractor.rank)}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-white font-medium">{contractor.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-300">
                    {contractor.activeProjects} / {contractor.completedProjects}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <motion.span
                      key={contractor.score}
                      initial={{ scale: 1.2, color: '#10b981' }}
                      animate={{ scale: 1, color: '#ffffff' }}
                      transition={{ duration: 0.3 }}
                      className="text-white font-bold"
                    >
                      {contractor.score.toFixed(1)}
                    </motion.span>
                    <span className="text-gray-400"> / 5</span>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    {contractor.trend === 'up' ? (
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-500" />
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm" onClick={(e) => e.stopPropagation()}>
                    <Menu as="div" className="relative">
                      <Menu.Button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute left-0 mt-2 w-48 glass-strong rounded-lg border border-white/20 overflow-hidden z-50">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => handleReward(contractor.id)}
                                className={`
                                  w-full text-right px-4 py-2 text-sm flex items-center gap-2
                                  ${active ? 'bg-white/10' : ''}
                                  text-green-400
                                `}
                              >
                                <Award className="w-4 h-4" />
                                ثبت تشویقی
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => handleWarning(contractor.id)}
                                className={`
                                  w-full text-right px-4 py-2 text-sm flex items-center gap-2
                                  ${active ? 'bg-white/10' : ''}
                                  text-red-400
                                `}
                              >
                                <AlertCircle className="w-4 h-4" />
                                ثبت اخطار
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Leaderboard

