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
        px-4 py-2 rounded-lg font-medium
        transition-all duration-200
        flex items-center gap-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </motion.button>
  )
}

export default ActionButton

