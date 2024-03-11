import './UserLogOut.css';
import { logOut } from '../../utilities/users-service';

export default function UserLogOut({ user, setUser }) {
  function handleLogOut() {
    logOut();
    setUser(null);
  }

  return (
    <div className="UserLogOut">
      <button className="btn-sm logOutBtn" onClick={handleLogOut}>LOG OUT</button>
      <div className="email">{user.email}</div>
    </div>
  );
}