import { motion } from 'framer-motion'

const variants = {
  primary: 'bg-neon-blue hover:bg-neon-blue-dark text-white',
  success: 'bg-green-500 hover:bg-green-600 text-white',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
  warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
  ghost: 'bg-white/10 hover:bg-white/20 text-white border border-white/20',
}

function ActionButton({ 
  children, 
  variant = 'primary', 
  onClick, 
  className = '',
  icon: Icon,
  disabled = false,
  ...props 
}) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-3 md:px-4 py-1.5 md:py-2 rounded-lg font-medium
        text-xs md:text-sm
        transition-all duration-200
        flex items-center justify-center gap-1.5 md:gap-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {Icon && <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />}
      {children}
    </motion.button>
  )
}

export default ActionButton

