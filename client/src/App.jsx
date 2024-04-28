import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Classes from './pages/Classes'
import Students from './pages/Students'
import Teachers from './pages/Teachers'
import './App.css'
import { DataContextProvider } from "./context/DataContext"
import Class from "./pages/Class"

function App() {
  

  return (
    <DataContextProvider>
      <Router>
          <Routes>
            <Route path = "/" element = {<Dashboard />} />
            <Route path = "/classes" element = {<Classes />} />
            <Route path = "/classes/:id" element = {<Class />} />
            <Route path = "/students" element = {<Students />} />
            <Route path = "/teachers"element = {<Teachers />} />
          </Routes>
      </Router>
    </DataContextProvider>
    
  )
}

export default App
