import { useState } from 'react';
import ReactModal from 'react-modal';

import NewArticle from "../Components/NewArticle";


export default function Articles() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  }
  
  return (
    <div>
      <div>
        <h2>
          Create your articles
        </h2>
        <button onClick={setShowModal}>
          +
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
          <NewArticle />
        </ReactModal>
      </div>
      <div>
        <h3>Your articles</h3>
        <div>

        </div>
      </div>
      
    </div>
  )
}