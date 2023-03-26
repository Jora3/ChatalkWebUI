import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setConnectedUser } from '../features/users/userSlice';

const Home = () => {
    const navigate = useNavigate();
    const dispach = useDispatch();
    const connectedUser = useSelector((state) => state.connectedUser);

    const handleLogout = () => {
        dispach(setConnectedUser({ pseudo: '', token: '' }));
        navigate('/login');
    };

    return (
        <section className='home'>
            <h2>Chatalk App</h2>
            {
                connectedUser.pseudo && connectedUser.token ?
                    (
                        <>
                            <p className='text'>
                                Hello <strong>{connectedUser.pseudo}</strong>.
                                Click the <strong>chat</strong> button below to access the chat
                                or you can <strong>logout</strong>.
                            </p>
                            <p className="actions">
                                <Link to={'/chat'} className='btn-link'>Chat</Link>
                                <span>Or</span>
                                <button className='btn-logout' type='button' onClick={handleLogout}>Logout</button>
                            </p>
                        </>
                    ) :
                    (
                        <>
                            <p className='text'>To use the chat application, please choose the right option for you</p>
                            <p className='actions'>
                                <Link to={'/login'}>Login</Link>
                                <Link to={'/signup'}>Sign up</Link>
                            </p>
                        </>
                    )
            }
        </section>
    );
};

export default Home;