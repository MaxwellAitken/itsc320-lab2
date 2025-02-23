import React, { useEffect, useState } from 'react';

const ChuckNorris = ({ token }) => {
    const [fact, setFact] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchFact = async () => {
            try {
                const response = await fetch('http://localhost:3333/fact', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Failed to fetch Chuck Norris fact.');
                }

                setFact(data.fact);
            } catch (error) {
                setErrorMessage(error.message);
            }
        };

        if (token) {
            fetchFact();
        }
    }, [token]);

    return (
        <div>
            <h1>Chuck Norris Fact</h1>
            {fact ? <p>{fact}</p> : <p>{errorMessage || 'Loading...'}</p>}
        </div>
    );
};

export default ChuckNorris;
