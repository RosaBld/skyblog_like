import { useEffect, useState } from "react";
import ArticleList from "./ArticleList";

export default function LatestArticles() {
  const [articles, setArticles] = useState([]);

  const displayAllArticles = async () => {
    try {
      const response = await fetch('http://localhost:5000/latestArticlesForWeek', {
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
    displayAllArticles();
  }, []);

  return (
    <div>
      <h2>Here are the latest articles created by the other users:</h2>
      <div>
        <ArticleList articles={articles} />
      </div>
    </div>
  );
}