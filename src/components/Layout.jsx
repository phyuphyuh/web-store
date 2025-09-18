import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <h1>My Web Store</h1>
        <nav>
          <ul>
            <li>
              <Link className='menuItem' to="/">Home</Link>
            </li>
            <li>
              <Link to="/success">Success</Link>
            </li>
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
