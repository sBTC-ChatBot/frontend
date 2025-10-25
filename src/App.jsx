import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import ChatBot from './components/ChatBot'

function App() {
  const [showChat, setShowChat] = useState(false)

  return (
    <div className="min-h-screen">
      {showChat ? (
        <ChatBot />
      ) : (
        <LandingPage onStartChat={() => setShowChat(true)} />
      )}
    </div>
  )
}

export default App
