import React, { useState } from 'react';

const LoginForm = ({setToken}) => {


    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await fetch('http://localhost:3333/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }
            setUser(data);
            if (data.uuid) {
                setToken(data.uuid);
            }
            
        } catch (error) {
            setErrorMessage('Invalid username or password');
        }
    }

    return (
        <div>

            {user ? 
            (
                <h1>Welcome, {user.name}</h1>
            ) :
            ( 
                <div>
                    <h1>Login</h1>
                    <form onSubmit={handleLogin}>
                        <label>Username</label>
                        <input 
                            type="text" 
                            name="username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} />
                        <label>Password</label>
                        <input 
                            type="password" 
                            name="password"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit">Login</button>
                    </form>

                    {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
                </div>
            )
            }
        </div>
    )
}

export default LoginForm;