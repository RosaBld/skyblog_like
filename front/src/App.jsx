import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Register from './Components/Register'
import Login from './Components/Login'

function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={ <Register /> } />
          <Route path="/login" element={ <Login /> } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
