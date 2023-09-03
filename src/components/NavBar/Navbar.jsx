import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo.jsx';
import './Logo.css';

export default function NavBar( { user }) {
    return (
        <div className="navbar">
            <div className="navbar-logo">
                <Logo />
            </div>
            <Link to="/orders">Order History</Link>
            &nbsp; | &nbsp;
            <Link to="/orders/new">New Order</Link>
            &nbsp; | &nbsp;
            <span>Welcome, {user.name}</span>
        </div>
    )
}