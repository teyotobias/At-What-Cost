import './App.css';
import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import AuthPage from '../AuthPage/AuthPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
// import NavBar from '../../components/NavBar/Navbar';
import { getUser } from '../../utilities/users-service';
// React Router provides several components used to conditionally
// render our app’s components based upon the path of the URL in the address bar - client side routing
//wrapped App w/ BrowserRouter in index.js where we are rendering app
export default function App() {
  const [user, setUser] = useState(getUser());
  return (
    <main className="App">
      { user ?
        <Routes>
          <Route path="/orders/new" element={<NewOrderPage user={user} setUser={setUser}/>} />
          <Route path="/orders" element={<OrderHistoryPage user={user} setUser={setUser}/>} />
          {/* redirect to /orders/new if path in address bar hasn't matched a <Route> above */}
          <Route path="/*" element={<Navigate to="/orders/new" />} />
        </Routes>
        :
        <AuthPage setUser={setUser}/>
      }
    </main>
  );
}

