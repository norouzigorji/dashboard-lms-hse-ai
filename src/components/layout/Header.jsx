import { Bell, Circle } from 'lucide-react'

function Header() {
  return (
    <header className="h-16 bg-navy/50 border-b border-white/10 flex items-center justify-between px-4 md:px-6 glass">
      <div className="flex items-center gap-2 md:gap-4">
        <div className="flex items-center gap-2">
          <Circle className="w-3 h-3 text-green-500 fill-green-500" />
          <span className="text-xs md:text-sm text-gray-300 hidden sm:inline">وضعیت شبکه: پایدار</span>
          <span className="text-xs text-gray-300 sm:hidden">پایدار</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative">
          <Bell className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-navy"></span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center border border-neon-blue/50">
            <span className="text-neon-blue text-sm font-bold">A</span>
          </div>
          <span className="text-sm text-gray-300 hidden md:inline">Admin</span>
        </div>
      </div>
    </header>
  )
}

export default Header

