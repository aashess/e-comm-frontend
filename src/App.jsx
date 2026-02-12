import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './pages/SignIn.jsx'
import AuthCallback from './pages/AuthCallback.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
