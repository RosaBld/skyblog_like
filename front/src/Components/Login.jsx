import { useState, useContext } from "react";
import { AuthContext } from "../utils/AuthContext";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const loginUser = async (e) => {
    e.preventDefault();
  
    if (!username || !password) {
      alert('Both fields are required!');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Login successful");
        
        login(data.token, username);
        
      } else {
        console.log('Login failed!');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <form onSubmit={loginUser}>
        <div>
          <label>Username:</label>
          <input type="text" autoComplete="username" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div>
          <label type="password">Password</label>
          <input type="password" autoComplete="current-password" onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}