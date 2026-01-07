import { Bell, Circle, Menu } from 'lucide-react'

function Header({ onMenuClick }) {
  return (
    <header className="h-14 md:h-16 bg-navy/50 border-b border-white/10 flex items-center justify-between px-3 md:px-6 glass">
      <div className="flex items-center gap-2 md:gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <Menu className="w-5 h-5 text-white" />
        </button>
        <div className="flex items-center gap-2">
          <Circle className="w-2.5 h-2.5 md:w-3 md:h-3 text-green-500 fill-green-500" />
          <span className="text-xs md:text-sm text-gray-300 hidden sm:inline">وضعیت شبکه: پایدار</span>
          <span className="text-xs text-gray-300 sm:hidden">پایدار</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative">
          <Bell className="w-4 h-4 md:w-5 md:h-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 md:w-3 md:h-3 bg-red-500 rounded-full border-2 border-navy"></span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-neon-blue/20 flex items-center justify-center border border-neon-blue/50">
            <span className="text-neon-blue text-xs md:text-sm font-bold">A</span>
          </div>
          <span className="text-xs md:text-sm text-gray-300 hidden md:inline">Admin</span>
        </div>
      </div>
    </header>
  )
}

export default Header

