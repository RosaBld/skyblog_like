import { useAuth } from '../utils/useAuth';
import { useState } from 'react';
import ReactModal from 'react-modal';
import Login from '../Components/Login';
import Register from '../Components/Register';
import { Link } from 'react-router-dom';
import SearchBar from '../Components/SearchBar';

export default function Header() {
  const { isLoggedIn, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  return (
    <header>
      <nav>
        <ul className="nav">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          {isLoggedIn && (
            <>
              <li>
                <Link to="/myFriends">My Friends</Link>
              </li>
              <li>
                <Link to="/profil">My Profil</Link>
              </li>
              <li>
                <SearchBar />
              </li>
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
            </>
          )}
          {!isLoggedIn && (
            <>
              <li>
                <SearchBar />
              </li>
              <li>
                <button onClick={toggleModal}>Login</button>
              </li>
              <ReactModal
                isOpen={showModal}
                onRequestClose={toggleModal}
                contentLabel="Authentication Modal"
                ariaHideApp={false}
                style={{
                  overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.25)',
                    backdropFilter: 'blur(2px)',
                  },
                  content: {
                    color: 'lightsteelblue',
                    width: '50%',
                    height: '50%',
                    margin: 'auto',
                    padding: '20px',
                    border: '10px solid rgba(233, 233, 233, 1)',
                    borderRadius: '25px',
                    position: 'absolute',
                    top: '0',
                    marginTop: '10vw',
                  },
                }}
              >
                {isLoginView ? <Login /> : <Register />}
                <button onClick={toggleView}>
                  {isLoginView ? 'Switch to Register' : 'Switch to Login'}
                </button>
              </ReactModal>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}