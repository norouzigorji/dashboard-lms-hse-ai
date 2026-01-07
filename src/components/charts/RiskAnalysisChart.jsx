import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

function RiskAnalysisChart({ data }) {
  const chartData = {
    labels: data.map(item => item.category),
    datasets: [
      {
        label: 'تعداد حوادث',
        data: data.map(item => item.count),
        backgroundColor: data.map(item => item.color),
        borderColor: data.map(item => item.color),
        borderWidth: 1,
      },
    ],
  }

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'چارت آنالیز ریسک',
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
      <Bar data={chartData} options={options} />
    </div>
  )
}

export default RiskAnalysisChart

