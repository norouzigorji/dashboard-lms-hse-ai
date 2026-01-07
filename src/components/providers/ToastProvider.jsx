import { Toaster } from 'react-hot-toast'

function ToastProvider() {
  return (
    <Toaster
      position="top-left"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        className: 'glass-strong border border-white/20',
        duration: 3000,
        style: {
          background: 'rgba(15, 23, 42, 0.95)',
          color: '#fff',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        success: {
          iconTheme: {
            primary: '#10b981',
            secondary: '#fff',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#fff',
          },
        },
      }}
    />
  )
}

export default ToastProvider

