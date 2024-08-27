import { useEffect, useState } from "react";
import DisplayComments from "./DisplayComments";

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
        console.log('Fetched articles:', data.articles); // Log the fetched articles
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
        {
          articles.map((article) => (
            <div key={article._id}>
              <h2>{article.title}</h2>
              <p>{article.content}</p>
              <p>By: {article.user}</p>
              <p>Created at: {new Date(article.createdAt).toLocaleString()}</p>
              <div>
                <DisplayComments articleId={article._id} />
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}