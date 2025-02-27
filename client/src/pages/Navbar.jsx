import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";

export const Navbar = () => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <header>
        <div className="container">
          <div className="logo-brand">
            <NavLink to="/">Todo Task</NavLink>
          </div>
          <nav>
            <ul>
              <li>
                <NavLink to="/task">Task</NavLink>
              </li>

              <li>
                {isLoggedIn ? (
                  <li>
                    <NavLink to="/logout">Logout</NavLink>
                  </li>
                ) : (
                  <>
                    <li>
                      <NavLink to="/">Register</NavLink>
                    </li>
                    <li>
                      <NavLink to="/login">Login</NavLink>
                    </li>
                  </>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
