import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Leaderboard from '../components/tables/Leaderboard'
import ContractorProfile from '../components/cards/ContractorProfile'
import RadarChart from '../components/charts/RadarChart'
import contractorsData from '../data/contractors.json'

function ContractorLeague() {
  const [contractors, setContractors] = useState([])
  const [selectedContractor, setSelectedContractor] = useState(null)

  useEffect(() => {
    const sorted = [...contractorsData.contractors].sort((a, b) => b.score - a.score)
    sorted.forEach((c, index) => {
      c.rank = index + 1
    })
    setContractors(sorted)
    if (sorted.length > 0) {
      setSelectedContractor(sorted[0])
    }
  }, [])

  const handleSelectContractor = (contractor) => {
    setSelectedContractor(contractor)
  }

  const handleScoreChange = (id, type) => {
    const contractor = contractors.find(c => c.id === id)
    if (contractor) {
      setSelectedContractor(contractor)
      if (type === 'reward') {
        toast.success(`امتیاز ${contractor.name} افزایش یافت`)
      } else {
        toast.error(`امتیاز ${contractor.name} کاهش یافت`)
      }
    }
  }

  if (contractors.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-400">در حال بارگذاری...</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <h1 className="text-display mb-8">رتبه‌بندی پیمانکاران (Contractor League)</h1>

      {/* Leaderboard */}
      <Leaderboard
        contractors={contractors}
        onSelectContractor={handleSelectContractor}
        onScoreChange={handleScoreChange}
      />

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Radar Chart */}
        <RadarChart contractor={selectedContractor} />

        {/* Contractor Profile */}
        <ContractorProfile contractor={selectedContractor} />
      </div>
    </div>
  )
}

export default ContractorLeague

