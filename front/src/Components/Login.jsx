import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext"; // Adjust the path as necessary


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
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
        const jsonResponse = await response.json();
        console.log("API Response:", jsonResponse);
        
        const { token } = jsonResponse;
        console.log(token);
        login(token, username);
      } else {
        console.log('Login failed!');
      }
    } catch (error) {
      console.error(error);
    }
    navigate('/')
  }

  return (
    <div>
      <form onSubmit={loginUser}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}