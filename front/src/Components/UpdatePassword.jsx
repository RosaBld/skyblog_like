import { useContext, useState } from "react";
import { AuthContext } from "../utils/AuthContext";
import ReactModal from "react-modal";

export default function UpdatePassword() {
  const [newPassword, setNewPassword] = useState('');
  const { updatePassword } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const handleUpdatePassword = async () => {
    const response = await fetch('http://localhost:5000/update-password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ newPassword })
    });

    if (response.ok) {
      console.log('Password updated successfully');
      updatePassword(newPassword);
    } else {
      console.log('Failed to update password, status:', response.status);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  return (
    <div>
      <button onClick={toggleModal}>
        Update Password
      </button>
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
        <form >
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
          />
          <button onClick={handleUpdatePassword}>
            Validate
          </button>
        </form>
      </ReactModal>


      

    </div>
  );
}