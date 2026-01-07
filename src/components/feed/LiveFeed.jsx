import { useEffect, useRef } from 'react'

const dangerousKeywords = [
  'سقوط',
  'آتش',
  'برق',
  'برق گرفتگی',
  'سیم لخت',
  'خطر',
  'حادثه',
  'فوری',
  'آسیب',
]

function highlightKeywords(text) {
  let highlightedText = text
  dangerousKeywords.forEach((keyword) => {
    const regex = new RegExp(`(${keyword})`, 'gi')
    highlightedText = highlightedText.replace(
      regex,
      '<mark class="bg-red-500/30 text-red-300 px-1 rounded">$1</mark>'
    )
  })
  return highlightedText
}

function LiveFeed({ feed }) {
  const feedRef = useRef(null)

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight
    }
  }, [feed])

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'border-red-500/50 bg-red-500/10'
      case 'high':
        return 'border-yellow-500/50 bg-yellow-500/10'
      default:
        return 'border-gray-500/50 bg-gray-500/10'
    }
  }

  return (
    <div className="glass-strong rounded-xl p-6 animate-fade-in">
      <h3 className="text-lg font-bold text-white mb-4">فید زنده گزارش‌ها</h3>
      <div
        ref={feedRef}
        className="space-y-3 max-h-96 overflow-y-auto pr-2"
        style={{ scrollbarWidth: 'thin' }}
      >
        {feed.map((item) => (
          <div
            key={item.id}
            className={`border rounded-lg p-4 ${getPriorityColor(item.priority)} hover:bg-white/5 transition-colors`}
          >
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <p
                  className="text-white text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: highlightKeywords(item.message),
                  }}
                />
                <p className="text-gray-400 text-xs mt-2">{item.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LiveFeed

