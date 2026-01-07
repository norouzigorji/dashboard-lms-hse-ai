import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import SummaryCard from '../components/cards/SummaryCard'
import CombinedChart from '../components/charts/CombinedChart'
import UrgentAlerts from '../components/alerts/UrgentAlerts'
import TimeRangeFilter from '../components/filters/TimeRangeFilter'
import ReportModal from '../components/modals/ReportModal'
import ActionButton from '../components/common/ActionButton'
import { FileText } from 'lucide-react'
import dashboardData from '../data/dashboard.json'

function Dashboard() {
  const [data, setData] = useState(null)
  const [timeRange, setTimeRange] = useState('today')
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [chartData, setChartData] = useState(null)

  useEffect(() => {
    setData(dashboardData)
    setChartData(dashboardData.combinedChart)
  }, [])

  useEffect(() => {
    if (!data || !chartData) return
    
    // Simulate data change based on time range
    const multipliers = {
      today: 1,
      week: 0.8,
      month: 0.6,
    }
    
    const multiplier = multipliers[timeRange] || 1
    
    const newChartData = {
      ...data.combinedChart,
      incidents: data.combinedChart.incidents.map(v => Math.round(v * multiplier)),
      contractorPerformance: data.combinedChart.contractorPerformance.map(v => Math.round(v * multiplier)),
    }
    
    setChartData(newChartData)
    const rangeLabel = timeRange === 'today' ? 'امروز' : timeRange === 'week' ? 'هفته جاری' : 'ماه جاری'
    toast.success(`داده‌ها برای ${rangeLabel} به‌روزرسانی شد`, { duration: 2000 })
  }, [timeRange])

  if (!data || !chartData) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-400">در حال بارگذاری...</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-display">داشبورد فرماندهی</h1>
        <div className="flex items-center gap-4">
          <TimeRangeFilter value={timeRange} onChange={setTimeRange} />
          <ActionButton
            variant="primary"
            icon={FileText}
            onClick={() => setIsReportModalOpen(true)}
          >
            ایجاد گزارش مدیریتی
          </ActionButton>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {data.summaryCards.map((card, index) => (
          <SummaryCard
            key={card.id}
            title={card.title}
            value={card.value}
            icon={card.icon}
            color={card.color}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Combined Chart */}
      <AnimatePresence mode="wait">
        <motion.div
          key={timeRange}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <CombinedChart data={chartData} />
        </motion.div>
      </AnimatePresence>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* World Map Placeholder */}
        <div className="glass-card rounded-2xl p-8 animate-fade-in">
          <h3 className="text-xl font-bold text-white mb-6">روند تطبیقی</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            <p>نقشه جهانی (نمایش داده‌های جغرافیایی)</p>
          </div>
        </div>

        {/* Urgent Alerts */}
        <UrgentAlerts alerts={data.urgentAlerts} />
      </div>

      {/* Report Modal */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </div>
  )
}

export default Dashboard

