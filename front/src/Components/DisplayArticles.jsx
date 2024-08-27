import { useEffect, useState } from "react";
import DisplayComments from "./DisplayComments";

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
      {articles.length > 0 ? (
        articles.map((article) => (
          <div key={article._id}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
            <p>Created at: {new Date(article.createdAt).toLocaleString()}</p>
            <div>
              <DisplayComments articleId={article._id} />
            </div>
          </div>
        ))
      ) : (
        <p>No articles found</p>
      )}
    </div>
  )
}