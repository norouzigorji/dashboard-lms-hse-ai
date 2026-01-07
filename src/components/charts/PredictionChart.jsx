import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

function PredictionChart({ data }) {
  const historicalLabels = data.historical.labels
  const historicalValues = data.historical.values
  const forecastLabels = data.forecast.labels
  const forecastValues = data.forecast.values
  const confidenceUpper = data.forecast.confidenceInterval.upper
  const confidenceLower = data.forecast.confidenceInterval.lower

  // Combine labels
  const allLabels = [...historicalLabels, ...forecastLabels]
  
  // Create datasets
  const historicalData = [...historicalValues, ...Array(forecastLabels.length).fill(null)]
  const forecastData = [...Array(historicalLabels.length).fill(null), ...forecastValues]
  const upperData = [...Array(historicalLabels.length).fill(null), ...confidenceUpper]
  const lowerData = [...Array(historicalLabels.length).fill(null), ...confidenceLower]

  const chartData = {
    labels: allLabels,
    datasets: [
      {
        label: 'داده‌های تاریخی',
        data: historicalData,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#3b82f6',
      },
      {
        label: 'پیش‌بینی',
        data: forecastData,
        borderColor: '#f97316',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        borderWidth: 2,
        borderDash: [5, 5],
        fill: false,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#f97316',
      },
      {
        label: 'حد بالای اطمینان',
        data: upperData,
        borderColor: 'rgba(249, 115, 22, 0.3)',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        borderWidth: 1,
        borderDash: [2, 2],
        fill: '+1',
        pointRadius: 0,
        tension: 0.4,
      },
      {
        label: 'حد پایین اطمینان',
        data: lowerData,
        borderColor: 'rgba(249, 115, 22, 0.3)',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        borderWidth: 1,
        borderDash: [2, 2],
        fill: false,
        pointRadius: 0,
        tension: 0.4,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#e5e7eb',
          font: {
            family: 'Vazir',
          },
        },
      },
      title: {
        display: true,
        text: 'نمودار پیش‌بینی',
        color: '#ffffff',
        font: {
          size: 18,
          family: 'Vazir',
          weight: 'bold',
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#9ca3af',
          font: {
            family: 'Vazir',
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#9ca3af',
          font: {
            family: 'Vazir',
          },
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
    },
  }

  return (
    <div className="glass-strong rounded-xl p-6 h-96 animate-fade-in">
      <Line data={chartData} options={options} />
    </div>
  )
}

export default PredictionChart

