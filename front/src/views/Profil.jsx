import UpdatePassword from "../Components/UpdatePassword";
import UpdateUsername from "../Components/UpdateUsername";

export default function Profil() {

  return (
    <div>
      <h2>Welcome on your profile</h2>
      <h3>Here, you can modify your username and password</h3>
      <div>
        <UpdateUsername />
        <UpdatePassword />
      </div>
    </div>
  )
}