import UpdatePassword from "../Components/UpdatePassword";
import UpdateUsername from "../Components/UpdateUsername";

export default function Options() {
  return (
    <div>
      <h3>Here, you can change your password and username!</h3>
      <div>
        <UpdatePassword />
        <UpdateUsername />
      </div>
    </div>
  )
}