import './App.css'
import { Route, Routes } from 'react-router-dom'
import { LoginRegister } from './views/LoginRegister'
import {Dashboard} from './views/Dashboard'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
