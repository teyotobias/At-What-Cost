import { Link } from 'react-router-dom';
import './NavBar.css';
import UserLogOut from '../UserLogOut/UserLogOut';
export default function NavBar({user, setUser}) {

    

    return (
        <nav className="navbar">
            <div className="navbarLogo">
                <img src="/images/brandlogo.png" alt="Brand Logo" />
            </div>
            <div className="nav-links">
                <Link to="/" className="about">Shop</Link>
                <Link to="/orders" className="previous-orders">Previous Orders</Link>
                <Link to="/cart" className="cart">Cart</Link>
            </div>
            <UserLogOut user={user} setUser={setUser} />
        </nav>
    )
}