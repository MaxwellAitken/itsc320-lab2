import React, { useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import ChuckNorris from './components/ChuckNorris';

function App() {
    const [token, setToken] = useState(null);

    const handleLogout = () => {
        setToken(null);
    };

    return (
        <div className="App">
            <header className="App-header">

                {!token ?
                (
                    <LoginForm setToken={setToken} />
                ):
                (
                    <div>
                        <ChuckNorris token={token} />
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                )
                }
            </header>
        </div>
    );
}

export default App;
