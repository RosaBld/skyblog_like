import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import Register from './Components/Register'
import Login from './Components/Login'
import Header from './partials/Header'
import Home from './views/Home'

function App() {

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/register" element={ <Register /> } />
          <Route path="/login" element={ <Login /> } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
