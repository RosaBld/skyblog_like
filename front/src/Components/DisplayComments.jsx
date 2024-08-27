import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export default function DisplayComments({ articleId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {

    async function displayComments() {
      try {
        const response = await fetch(`http://localhost:5000/showComment?articleId=${articleId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (response.ok) {
          const data = await response.json();
          setComments(data.comments);
        } else {
          console.error('Failed to fetch the comments');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    if (articleId) {
      displayComments();
    }
  }, [articleId]);

  return (
    <div>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment._id}>
            <h3>{comment.content}</h3>
            <p>{comment.username}</p>
            <p>Comment created at: {new Date(comment.createdAt).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>No comment yet</p>
      )}
    </div>
  );
}

DisplayComments.propTypes = {
  articleId: PropTypes.string.isRequired,
};