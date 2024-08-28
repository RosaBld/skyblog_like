import PropTypes from 'prop-types';
import { useState } from "react";
import DisplayComments from "./DisplayComments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-regular-svg-icons";

export default function ArticleList({ articles }) {
  const [commentsVisibility, setCommentsVisibility] = useState({});

  const toggleComments = (articleId) => {
    setCommentsVisibility((prevVisibility) => ({
      ...prevVisibility,
      [articleId]: !prevVisibility[articleId],
    }));
  };

  return (
    <div>
      {articles.length > 0 ? (
        articles.map((article) => (
          <div key={article._id} className="articleAndComment">
            <div className="article">
              <div className="titleAndAuthor">
                <h2 className="titleArticle">{article.title}</h2>
                <p className="authorArticle">- {article.user}</p>
              </div>
              <h3 className="contentArticle">{article.content}</h3>
              <p className="dateArticle">{new Date(article.createdAt).toLocaleDateString()}</p>
              <button onClick={() => toggleComments(article._id)}>
                <FontAwesomeIcon icon={faCommentDots} />
              </button>
            </div>
            <div className="comments-wrapper">
              <div className={`comments-container ${commentsVisibility[article._id] ? 'show' : 'hide'}`}>
                <DisplayComments articleId={article._id} />
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No articles found</p>
      )}
    </div>
  );
}

ArticleList.propTypes = {
  articles: PropTypes.array.isRequired,
};