import { useContext, useState } from "react";
import { AuthContext } from "../utils/AuthContext";
import ReactModal from 'react-modal';

export default function UpdateUsername() {
  const [newUsername, setNewUsername] = useState('');
  const { updateUsername } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const handleUpdateUsername = async () => {
    const response = await fetch('http://localhost:5000/update-username', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ newUsername })
    });

    if (response.ok) {
      const data = await response.json();
      updateUsername(data.username);
    } else {
      console.log('Failed to update username, status:', response.status);
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
            type="text"
            placeholder="New Username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <button onClick={handleUpdateUsername}>
            Validate
          </button>
        </form>
      </ReactModal>
    </div>
  );
}