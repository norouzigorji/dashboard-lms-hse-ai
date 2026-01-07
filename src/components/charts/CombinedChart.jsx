import { useEffect, useRef } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

function CombinedChart({ data }) {
  const chartRef = useRef(null)

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        type: 'bar',
        label: 'حوادث',
        data: data.incidents,
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        borderColor: '#ef4444',
        borderWidth: 2,
        yAxisID: 'y',
      },
      {
        type: 'line',
        label: 'عملکرد پیمانکار',
        data: data.contractorPerformance,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#3b82f6',
        yAxisID: 'y1',
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
        text: 'روند تطبیقی',
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
        type: 'linear',
        display: true,
        position: 'left',
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#9ca3af',
          font: {
            family: 'Vazir',
          },
        },
        title: {
          display: true,
          text: 'تعداد حوادث',
          color: '#ef4444',
          font: {
            family: 'Vazir',
          },
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: '#9ca3af',
          font: {
            family: 'Vazir',
          },
        },
        title: {
          display: true,
          text: 'عملکرد پیمانکار',
          color: '#3b82f6',
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
      <Chart ref={chartRef} type="bar" data={chartData} options={options} />
    </div>
  )
}

export default CombinedChart

