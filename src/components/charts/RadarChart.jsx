import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

function RadarChart({ contractor }) {
  if (!contractor) {
    return (
      <div className="glass-strong rounded-xl p-6 animate-fade-in">
        <p className="text-gray-400 text-center">یک پیمانکار را انتخاب کنید</p>
      </div>
    )
  }

  const chartData = {
    labels: ['سرعت', 'کیفیت', 'ایمنی', 'اعماق', 'صحت و دقت', 'کارایی'],
    datasets: [
      {
        label: contractor.name,
        data: [
          contractor.performance.speed,
          contractor.performance.quality,
          contractor.performance.safety,
          contractor.performance.depth,
          contractor.performance.accuracy,
          contractor.performance.efficiency,
        ],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: '#3b82f6',
        borderWidth: 2,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#3b82f6',
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#e5e7eb',
          font: {
            family: 'Vazir',
          },
        },
      },
      title: {
        display: true,
        text: `نمودار راداری جزئیات شرکت ${contractor.name}`,
        color: '#ffffff',
        font: {
          size: 16,
          family: 'Vazir',
          weight: 'bold',
        },
      },
    },
    scales: {
      r: {
        angleLines: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        pointLabels: {
          color: '#e5e7eb',
          font: {
            family: 'Vazir',
            size: 12,
          },
        },
        ticks: {
          color: '#9ca3af',
          font: {
            family: 'Vazir',
          },
          backdropColor: 'transparent',
        },
        min: 0,
        max: 100,
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
    },
  }

  return (
    <div className="glass-strong rounded-xl p-6 h-96 animate-fade-in">
      <Radar data={chartData} options={options} />
    </div>
  )
}

export default RadarChart

