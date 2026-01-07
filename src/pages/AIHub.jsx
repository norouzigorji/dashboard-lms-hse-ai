import { useEffect, useState } from 'react'
import PredictionChart from '../components/charts/PredictionChart'
import PrescriptionCard from '../components/cards/PrescriptionCard'
import DonutChart from '../components/charts/DonutChart'
import aiData from '../data/ai.json'

function AIHub() {
  const [data, setData] = useState(null)

  useEffect(() => {
    setData(aiData)
  }, [])

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-400">در حال بارگذاری...</div>
      </div>
    )
  }

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-4 md:mb-6 lg:mb-8">مرکز پیش‌بینی هوشمند (AI Hub)</h1>

      {/* Prediction Chart */}
      <PredictionChart data={data.prediction} />

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
        {/* Prescription Card */}
        <PrescriptionCard prescription={data.prescription} />

        {/* Donut Chart */}
        <DonutChart data={data.rootCauseAnalysis} />
      </div>
    </div>
  )
}

export default AIHub

