import { Link } from 'react-router-dom';
import './NavBar.css';
import UserLogOut from '../UserLogOut/UserLogOut';
import Logo from '../Logo/Logo';
export default function NavBar({user, setUser}) {

    

    return (
        <nav className="navbar">
            <div className="navbarLogo">
                <Logo/>
            </div>
            <Link to="/" className="about">Shop</Link>
            <Link to="/orders" className="previous-orders">Previous Orders</Link>
            <Link to="/cart" className="cart">Cart</Link>
            <UserLogOut user={user} setUser={setUser} />
        </nav>
    )
}