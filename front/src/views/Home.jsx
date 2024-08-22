import LatestArticles from '../Components/LatestArticles';
import { useAuth } from '../utils/useAuth';

export default function Home() {
  const { isLoggedIn, username } = useAuth();

  return (
    <div>
      <div>
        {isLoggedIn ? (
          <h2>Welcome, {username}!</h2>
        ) : (
          <h2>Hey there, stranger!</h2>
        )}
      </div>
      <div>
        <LatestArticles />
      </div>
    </div>
  );
}