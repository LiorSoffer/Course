import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Courses Reviews</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <button className="profile">
                <Link to="/user">
                  <span class="material-symbols-outlined">person</span>
                </Link>
              </button>
              <button className="logout" onClick={handleClick}>
                Log out
              </button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
