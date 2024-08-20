import { useState } from "react"

export default function NewArticle() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const addArticle = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/newArticle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ title, content }),
      });
      if (response.ok) {
        alert('Article added successfully!');
        setTitle('');
        setContent('');
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to add article')
      }
    } catch (error) {
      console.error('Error:', error)
      setError('An error occured. Please try again later.')
    }
  }

  return (
    <div>
      <h2>Creation of a new article</h2>
      <form onSubmit={addArticle}>
        <label>Title:</label>
        <input 
          type='text'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          rows='8'
          cols='40'
        />
        <button type='submit'>Add Article</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  )
}