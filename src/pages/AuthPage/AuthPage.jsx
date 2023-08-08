import './AuthPage.css';
import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LogInForm from '../../components/LogInForm/LogInForm';

export default function AuthPage({ setUser }) {
    const [showSignUp, setShowSignUp] = useState(false);
    return (
      <main>
        <h1>AuthPage</h1>
        <button onClick={() => setShowSignUp(!showSignUp)}>{showSignUp ? 'Log In' : 'Sign Up'}</button>
        { showSignUp ?
            <SignUpForm setUser={setUser} />
            :
            <LogInForm setUser={setUser} />
        }
      </main>
    );
}