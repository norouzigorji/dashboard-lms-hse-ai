import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import GISMap from '../components/map/GISMap'
import LiveFeed from '../components/feed/LiveFeed'
import RiskAnalysisChart from '../components/charts/RiskAnalysisChart'
import hseData from '../data/hse.json'

function HSECenter() {
  const [data, setData] = useState(null)
  const [markers, setMarkers] = useState([])

  useEffect(() => {
    setData(hseData)
    setMarkers(hseData.mapMarkers.map(m => ({ ...m, status: 'active' })))
  }, [])

  const handleMarkerStatusChange = (markerId, status) => {
    setMarkers(prev => prev.map(m => 
      m.id === markerId ? { ...m, status } : m
    ))
    toast.success('تیم ایمنی اعزام شد')
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-400">در حال بارگذاری...</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <h1 className="text-display mb-8">اتاق کنترل ایمنی (HSE Center)</h1>

      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* GIS Map */}
        <GISMap markers={markers} onMarkerStatusChange={handleMarkerStatusChange} />

        {/* Live Feed */}
        <LiveFeed feed={data.liveFeed} />
      </div>

      {/* Risk Analysis Chart */}
      <RiskAnalysisChart data={data.riskAnalysis} />
    </div>
  )
}

export default HSECenter

