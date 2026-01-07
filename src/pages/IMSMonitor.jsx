import { useEffect, useState } from 'react'
import GaugeChart from '../components/charts/GaugeChart'
import ProcessTable from '../components/tables/ProcessTable'
import BottleneckWidget from '../components/widgets/BottleneckWidget'
import imsData from '../data/ims.json'

function IMSMonitor() {
  const [data, setData] = useState(null)

  useEffect(() => {
    setData(imsData)
  }, [])

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-400">در حال بارگذاری...</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <h1 className="text-display mb-8">مدیریت فرایندها (IMS)</h1>

      {/* Process Table */}
      <ProcessTable processes={data.processes} />

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Gauge Charts */}
        {data.isoCompliance.map((iso) => (
          <GaugeChart
            key={iso.id}
            name={iso.name}
            percentage={iso.percentage}
            label={iso.label}
          />
        ))}
      </div>

      {/* Bottleneck Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <BottleneckWidget bottlenecks={data.bottlenecks} />
        </div>
      </div>
    </div>
  )
}

export default IMSMonitor

