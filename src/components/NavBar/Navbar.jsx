import { Link } from 'react-router-dom';
import './NavBar.css';
import Logo from '../Logo/Logo';
import UserLogOut from '../UserLogOut/UserLogOut';
export default function NavBar({user, setUser}) {


    return (
        <nav className="navbar">
            <Logo />
            <div className="nav-links">
                <Link to="/" className="about">Shop</Link>
                <Link to="/orders" className="previous-orders">Previous Orders</Link>
                <Link to="/cart" className="cart">Cart</Link>
            </div>
            <UserLogOut user={user} setUser={setUser} />  {/* Moved outside of nav-links */}
        </nav>
        // <nav>
        //     <Link to="/orders">Order History</Link>
        //     &nbsp; | &nbsp;
        //     <Link to="/orders/new">New Order</Link>
        //     &nbsp; | &nbsp;
        //     <span>Welcome, {user.name}</span>
        //     &nbsp;&nbsp;<Link to="" onClick={handleLogOut}>Log Out</Link>

        // </nav>
    )
}