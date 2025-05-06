import './App.css'
import { Route, Routes } from 'react-router-dom'
import { LoginRegister } from './views/LoginRegisterView'
import {Dashboard} from './views/DashboardView'
import { AddJobView } from './views/AddJobView'
import { ViewJobView } from './views/ViewJobView'
import {EditJobView} from './views/EditJobView'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addJob" element={<AddJobView/>} />
        <Route path="/jobs/:id" element={<ViewJobView/>} />
        <Route path="/jobs/:id/edit" element={<EditJobView/>} />
      </Routes>
    </>
  )
}

export default App
