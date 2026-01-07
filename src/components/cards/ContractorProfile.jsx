import { AlertCircle } from 'lucide-react'

function ContractorProfile({ contractor }) {
  if (!contractor) {
    return (
      <div className="glass-strong rounded-xl p-6 animate-fade-in">
        <p className="text-gray-400 text-center">یک پیمانکار را از جدول انتخاب کنید</p>
      </div>
    )
  }

  return (
    <div className="glass-card rounded-xl md:rounded-2xl p-4 md:p-6 animate-fade-in">
      <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">جزئیات پیمانکار</h3>
      <div className="space-y-3 md:space-y-4">
        <div>
          <h4 className="text-lg md:text-xl font-bold text-white mb-2 break-words">{contractor.name}</h4>
          <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-300">
            <span>رتبه: {contractor.rank}</span>
            <span>امتیاز: {contractor.score.toFixed(1)} / 5</span>
          </div>
        </div>

        <div className="border-t border-white/10 pt-3 md:pt-4">
          <h5 className="text-xs md:text-sm font-medium text-gray-300 mb-2">آمار پروژه‌ها</h5>
          <div className="grid grid-cols-3 gap-2 md:gap-4">
            <div className="text-center">
              <p className="text-xl md:text-2xl font-bold text-white">{contractor.activeProjects}</p>
              <p className="text-xs text-gray-400">فعال</p>
            </div>
            <div className="text-center">
              <p className="text-xl md:text-2xl font-bold text-white">{contractor.completedProjects}</p>
              <p className="text-xs text-gray-400">تکمیل شده</p>
            </div>
            <div className="text-center">
              <p className="text-xl md:text-2xl font-bold text-white">{contractor.totalProjects}</p>
              <p className="text-xs text-gray-400">کل</p>
            </div>
          </div>
        </div>

        {contractor.violations && contractor.violations.length > 0 && (
          <div className="border-t border-white/10 pt-4">
            <h5 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              تاریخچه تخلفات
            </h5>
            <div className="space-y-2">
              {contractor.violations.map((violation) => (
                <div
                  key={violation.id}
                  className="border border-red-500/50 rounded-lg p-3 bg-red-500/10"
                >
                  <p className="text-sm text-white">{violation.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{violation.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ContractorProfile

