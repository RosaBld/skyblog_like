import { useAuth } from '../utils/useAuth';
import { useState } from 'react';
import ReactModal from 'react-modal';
import Login from '../Components/Login';
import Register from '../Components/Register';
import { Link } from 'react-router-dom';

export default function Header() {

  const { isLoggedIn, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  
  const toggleModal = () => {
    setShowModal(!showModal);
  }

  const toggleView = () => {
    setIsLoginView(!isLoginView)
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="">
              Home
            </Link>
          </li>
          <li>
            <Link to="/articles">
              Articles
            </Link>
          </li>
          <li>
            <Link to="">
              Home
            </Link>
          </li>
        </ul>
        <ul>
          {isLoggedIn ? (
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          ) : (
            <div>
              <button onClick={toggleModal}>Login</button>
              <ReactModal 
                isOpen={showModal}
                onRequestClose={toggleModal}
                contentLabel="Participant Form"
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
                    marginTop: '10vw'
                  },
                }}
              >
                {isLoginView ? <Login /> : <Register />}
                <button onClick={toggleView}>{isLoginView ? "Switch to Register" : "Switch to Login"}</button>
              </ReactModal>
            </div>
          )}
        </ul>
      </nav>
    </div>
  )
}