import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/searchUsers?q=${query}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data);
        setShowDropdown(true);
      } else {
        console.error('Failed to fetch search results');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleResultClick = (username) => {
    setShowDropdown(false);
    navigate(`/user/${username}`)
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          placeholder="Search.." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          name="search" 
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {showDropdown && results.length > 0 && (
          <div className="dropdown">
            {results.map((user) => (
              <div 
                key={user.username}
                className="dropdown-item"
                onClick={() => handleResultClick(user.username)}
              >
                <p>{user.username}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}