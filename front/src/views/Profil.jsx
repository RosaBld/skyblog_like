import { Link } from 'react-router-dom';
import { useAuth } from '../utils/useAuth';
import Articles from "./Articles";

export default function Profil() {
  const { username } = useAuth();

  return (
    <div>
      <h2>Welcome on your profile, {username}</h2>

      <Articles />
      
      <button>
        <Link to="/options">
          Options
        </Link>
      </button>
    </div>
  )
}