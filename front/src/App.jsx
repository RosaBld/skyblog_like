import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useContext } from 'react';
import ReactModal from 'react-modal';

import Register from './Components/Register';
import Login from './Components/Login';
import Header from './partials/Header';
import Home from './views/Home';
// import Articles from './views/Articles';
import useSessionManagement from './utils/HandleSession';

import { AuthProvider, AuthContext } from './utils/AuthContext';
import Profil from './views/Profil';
import Options from './views/Options';
import MyFriends from './views/MyFriends';
import User from './views/User';
import About from './views/About';

ReactModal.setAppElement('#root');

function App() {
  const { getToken, logoutUser } = useSessionManagement();
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <AuthProvider>
      <Router>
        <div>
          <Header />
          <Routes>
          {isLoggedIn ? (
              <>
                <Route path="/" element={ <Home getToken={getToken} logoutUser={logoutUser} /> } />
                <Route path="/about" element={ <About /> } />
                <Route path="/myFriends" element={ <MyFriends /> } />
                <Route path="/user/:username" element={<User />} />
                <Route path="/options" element={ <Options /> } />
                <Route path="/profil" element={ <Profil /> } />
              </>
            ) : (
              <>                
                <Route path="/" element={ <Home getToken={getToken} logoutUser={logoutUser} /> } />
                <Route path="/about" element={ <About /> } />
                <Route path="/user/:username" element={<User />} />
                <Route path="/register" element={ <Register /> } />
                <Route path="/login" element={ <Login /> } />
                
              </>
            )}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;