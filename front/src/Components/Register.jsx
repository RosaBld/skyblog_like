import { useState } from "react";


export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = async (e) => {
    e.preventDefault();
  
    if (!username || !password) {
      alert('Both fields are required!');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.log('Registration failed!');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <form onSubmit={registerUser}>
        <div>
          <label>Username:</label>
          <input value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}