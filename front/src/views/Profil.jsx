import UpdatePassword from "../Components/UpdatePassword";
import UpdateUsername from "../Components/UpdateUsername";
import { useAuth } from '../utils/useAuth';

export default function Profil() {
  const { username } = useAuth();

  return (
    <div>
      <h2>Welcome on your profile, {username}</h2>
      <h3>Here, you can modify your username and password.</h3>
      <div>
        <UpdateUsername />
        <UpdatePassword />
      </div>
    </div>
  )
}