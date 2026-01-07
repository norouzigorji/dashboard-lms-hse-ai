import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

function DonutChart({ data }) {
  const chartData = {
    labels: data.map(item => item.factor),
    datasets: [
      {
        data: data.map(item => item.percentage),
        backgroundColor: data.map(item => item.color),
        borderWidth: 0,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#e5e7eb',
          font: {
            family: 'Vazir',
            size: 12,
          },
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.parsed}%`
          },
        },
      },
    },
    animation: {
      animateRotate: true,
      duration: 1000,
    },
  }

  return (
    <div className="glass-card rounded-xl md:rounded-2xl p-4 md:p-6 animate-fade-in">
      <h3 className="text-lg md:text-xl font-bold text-white mb-4">تحلیل ریشه‌ای</h3>
      <div className="h-48 md:h-56 lg:h-64">
        <Doughnut data={chartData} options={options} />
      </div>
      <div className="mt-4 space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-gray-300">{item.factor}</span>
            </div>
            <span className="text-white font-medium">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DonutChart

