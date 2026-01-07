import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

function GaugeChart({ name, percentage, label }) {
  const getColor = (percent) => {
    if (percent < 50) return '#ef4444' // قرمز
    if (percent >= 80) return '#10b981' // سبز
    return '#f59e0b' // زرد
  }

  const color = getColor(percentage)
  const remaining = 100 - percentage

  const data = {
    datasets: [
      {
        data: [percentage, remaining],
        backgroundColor: [color, 'rgba(255, 255, 255, 0.1)'],
        borderWidth: 0,
        cutout: '75%',
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    rotation: -90,
    circumference: 180,
  }

  return (
    <div className="glass-card rounded-xl md:rounded-2xl p-4 md:p-6 animate-fade-in">
      <h3 className="text-xs md:text-sm text-gray-300 mb-3 md:mb-4 text-center">{label}</h3>
      <div className="relative h-32 md:h-40 lg:h-48 flex items-center justify-center">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl md:text-3xl font-bold" style={{ color }}>
            {percentage}%
          </span>
        </div>
      </div>
    </div>
  )
}

export default GaugeChart

