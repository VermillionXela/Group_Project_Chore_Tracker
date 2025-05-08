import './App.css'
import { Route, Routes } from 'react-router-dom'
import { LoginRegister } from './views/LoginRegisterView'
import {Dashboard} from './views/DashboardView'
import { AddJobView } from './views/AddJobView'
import { ViewJobView } from './views/ViewJobView'
import {EditJobView} from './views/EditJobView'
import {UserPostedJobsView} from './views/UserPostedJobsView'
import {ProtectedRoute} from './components/ProtectedRoute'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginRegister />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addJob"
          element={
            <ProtectedRoute>
              <AddJobView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/:id"
          element={
            <ProtectedRoute>
              <ViewJobView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/:id/edit"
          element={
            <ProtectedRoute>
              <EditJobView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-posted-jobs"
          element={
            <ProtectedRoute>
              <UserPostedJobsView />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
