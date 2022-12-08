import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import "./navbar.css"

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/">
          <span className="logo">Booking</span>
        </Link>
        <div className="navItems">
          {!user ? (
            <>
              <Link to="/register">
                <button className="navButton">Register</button>  
              </Link>
              <Link to="/login">
                <button className="navButton">Login</button>
              </Link>
            </>
          ) : (
            <>
              {user.username}
              <Link to="/logout">
                <button className="navButton">Logout</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar