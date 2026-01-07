import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Settings, 
  Brain, 
  Shield, 
  Users,
  ChevronRight,
  ChevronLeft
} from 'lucide-react'

function Sidebar({ isOpen, setIsOpen }) {
  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'داشبورد' },
    { path: '/ims', icon: Settings, label: 'مدیریت فرایندها (IMS)' },
    { path: '/ai', icon: Brain, label: 'هوش مصنوعی (AI)' },
    { path: '/hse', icon: Shield, label: 'ایمنی و HSE' },
    { path: '/contractors', icon: Users, label: 'پیمانکاران' },
  ]

  return (
    <aside className={`
      ${isOpen ? 'w-64' : 'w-20'} 
      bg-navy border-l border-white/10 
      transition-all duration-300 
      flex flex-col
      relative
      z-50
      ${isOpen ? 'fixed lg:relative' : 'fixed lg:relative'}
      h-full
    `}>
      {/* User Avatar */}
      <div className="p-6 flex items-center justify-center border-b border-white/10">
        {isOpen ? (
          <div className="w-12 h-12 rounded-full bg-neon-blue/20 flex items-center justify-center border-2 border-neon-blue">
            <span className="text-neon-blue text-xl font-bold">A</span>
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-neon-blue/20 flex items-center justify-center border-2 border-neon-blue">
            <span className="text-neon-blue text-sm font-bold">A</span>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-neon-blue/20 text-neon-blue neon-glow border border-neon-blue/50'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="text-sm font-medium">{item.label}</span>}
            </NavLink>
          )
        })}
      </nav>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-1/2 -left-4 w-8 h-8 bg-navy border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-neon-blue/20 hover:border-neon-blue transition-all"
      >
        {isOpen ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>
    </aside>
  )
}

export default Sidebar

