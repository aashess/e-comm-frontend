import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './pages/SignIn.jsx'
import AuthCallback from './pages/AuthCallback.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'
import CreateProductModal from './components/CreateProduct.jsx'
import Profile from './components/Profile.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/profile' element={<Profile/>}/>
 
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
