import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import ArticleList from "./ArticleList";

export default function SearchedUser() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState([]);

  const displayUserInfo = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/getUserInfo?username=${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setArticles(data.articles);
      } else {
        console.error('Failed to fetch user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, [username]);

  useEffect(() => {
    if (username) {
      displayUserInfo();
    }
  }, [username, displayUserInfo]);

  return (
    <div>
      {user ? (
        <div>
          <h2>{user.username}</h2>
          {/* Add more user details here */}
        </div>
      ) : (
        <p>No user found</p>
      )}
      <ArticleList articles={articles} />
    </div>
  );
}