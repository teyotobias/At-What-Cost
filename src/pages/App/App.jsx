import './App.css';
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import AuthPage from '../AuthPage/AuthPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import NavBar from '../../components/NavBar/Navbar';
import { getUser } from '../../utilities/users-service';
// React Router provides several components used to conditionally
// render our app’s components based upon the path of the URL in the address bar - client side routing
//wrapped App w/ BrowserRouter in index.js where we are rendering app
export default function App() {
  const [user, setUser] = useState(getUser());
  return (
    <main className="App">
      {/* navbar would go here if we want it to render either way */}
      { user ?
          <>
            <NavBar user={user} setUser={setUser}/>
            <Routes>
              <Route path="/orders/new" element={<NewOrderPage />} />
              <Route path="/orders" element={<OrderHistoryPage />} />
            </Routes>
          </>
          :
        <AuthPage setUser={setUser}/>
      }
    </main>
  );
}

