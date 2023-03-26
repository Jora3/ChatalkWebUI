import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <section className='not-found'>
            <h2>Error Page</h2>
            <p>Sorry! The page you are searching is not found.</p>
            <p>
                <Link to={'/'}>Go to Home</Link>
            </p>
        </section>
    );
};

export default NotFound;