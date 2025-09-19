import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const Layout = ({ children }) => {
  const { isLoading, isAuthenticated, logout } = useAuth0();

  return (
    <div>
      <header>
        <h1>My Web Store</h1>
        <nav>
          <ul>
            <li>
              <Link className='menuItem' to="/">Home</Link>
            </li>
            {!isLoading && isAuthenticated && (
              <li>
                <button className="menuitem" onClick={logout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>&copy; 2024 My Web Store</p>
      </footer>
    </div>
  );
};

export default Layout;
