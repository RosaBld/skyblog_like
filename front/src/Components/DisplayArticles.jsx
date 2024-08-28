import { useEffect, useState } from "react";
import ArticleList from "./ArticleList";


export default function DisplayArticles() {
  const [articles, setArticles] = useState([]);

  const displayArticles = async () => {
    try {
      const response = await fetch('http://localhost:5000/userArticles', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setArticles(data.articles);
      } else {
        console.error('Failed to fetch articles');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    displayArticles();
  }, []);

  return (
    <div>
      <ArticleList articles={articles} />
    </div>
  )
}