import { useAuth } from '../utils/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

export default function Header() {

  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login')
  }

  return (
    <div>
      <nav>
        <ul>
          <li>
            Something
          </li>
          <li>
            Something
          </li>
          <li>
            Something
          </li>
        </ul>
        <ul>
          {isLoggedIn ? (
            <li>
              <FontAwesomeIcon icon={faUser} />
            </li>
          ) : (
            <li>
              <button onClick={handleLogin}>Login</button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  )
}