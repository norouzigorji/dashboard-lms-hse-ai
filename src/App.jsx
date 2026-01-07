import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import ToastProvider from './components/providers/ToastProvider'
import Dashboard from './pages/Dashboard'
import IMSMonitor from './pages/IMSMonitor'
import AIHub from './pages/AIHub'
import HSECenter from './pages/HSECenter'
import ContractorLeague from './pages/ContractorLeague'

function App() {
  return (
    <Router>
      <ToastProvider />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ims" element={<IMSMonitor />} />
          <Route path="/ai" element={<AIHub />} />
          <Route path="/hse" element={<HSECenter />} />
          <Route path="/contractors" element={<ContractorLeague />} />
        </Routes>
      </MainLayout>
    </Router>
  )
}

export default App

