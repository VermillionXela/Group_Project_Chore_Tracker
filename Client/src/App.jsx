import './App.css'
import { Route, Routes } from 'react-router-dom'
import { LoginRegister } from './views/LoginRegisterView'
import {Dashboard} from './views/DashboardView'
import { AddJobView } from './views/AddJobView'
import { ViewJobView } from './views/ViewJobView'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addJob" element={<AddJobView/>} />
        <Route path="/jobs/:id" element={<ViewJobView/>} />
      </Routes>
    </>
  )
}

export default App
