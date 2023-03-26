import React, { useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setConnectedUser } from '../features/users/userSlice';
import { api } from '../api/api';
import FormError from './FormError';
import FormInputError from './FormInputError';

const LOGIN_ACTION = {
    PSEUDO_CHANGED: 'pseudoChanged',
    PASSWORD_CHANGED: 'passwordChanged',
    PSEUDO_ERRORS_CHANGED: 'pseudoErrorsChanged',
    PASSWORD_ERRORS_CHANGED: 'passwordErrorsChanged',
    FORM_ERRORS_CHANGED: 'formErrorsChanged'
};

const initialLoginState = {
    pseudo: '',
    password: '',
    pseudoErrors: [],
    passwordErrors: [],
    formErrors: ''
};

const loginReducer = (state, action) => {
    switch (action.type) {
        case LOGIN_ACTION.PSEUDO_CHANGED:
            return { ...state, pseudo: action.payload, pseudoErrors: [] };
        case LOGIN_ACTION.PASSWORD_CHANGED:
            return { ...state, password: action.payload, passwordErrors: [] };
        case LOGIN_ACTION.PSEUDO_ERRORS_CHANGED:
            return { ...state, pseudoErrors: action.payload };
        case LOGIN_ACTION.PASSWORD_ERRORS_CHANGED:
            return { ...state, passwordErrors: action.payload };
        case LOGIN_ACTION.FORM_ERRORS_CHANGED:
            return { ...state, formErrors: action.payload };
        default:
            throw new Error('Unkonw action on login.');
    }
};

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginState, loginDispatch] = useReducer(loginReducer, initialLoginState);

    const onPseudoChanged = (e) => {
        loginDispatch({ type: LOGIN_ACTION.PSEUDO_CHANGED, payload: e.target.value });
    };

    const onPasswordChanged = (e) => {
        loginDispatch({ type: LOGIN_ACTION.PASSWORD_CHANGED, payload: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        loginDispatch({ type: LOGIN_ACTION.PSEUDO_ERRORS_CHANGED, payload: [] });
        loginDispatch({ type: LOGIN_ACTION.PASSWORD_ERRORS_CHANGED, payload: [] });
        loginDispatch({ type: LOGIN_ACTION.FORM_ERRORS_CHANGED, payload: '' });

        api.post('/Users/login', {
            pseudo: loginState.pseudo,
            password: loginState.password
        }).then((response) => {
            dispatch(setConnectedUser(response.data));
            navigate('/');
        }).catch((error) => {
            if (error.response.data.errors) {
                if (error.response.data.errors.Password) {
                    loginDispatch({ type: LOGIN_ACTION.PASSWORD_ERRORS_CHANGED, payload: error.response.data.errors.Password });
                }
                if (error.response.data.errors.Pseudo) {
                    loginDispatch({ type: LOGIN_ACTION.PSEUDO_ERRORS_CHANGED, payload: error.response.data.errors.Pseudo });
                }
            }
            else if (error.response.data) {
                loginDispatch({ type: LOGIN_ACTION.FORM_ERRORS_CHANGED, payload: error.response.data });
            }
        });
    };

    return (
        <section className='login'>
            <h2>Login</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <FormError error={loginState.formErrors} />
                <div>
                    <label htmlFor="pseudoLogin">Pseudo</label>
                    <input
                        type="text"
                        id='pseudo'
                        placeholder='Your pseudo'
                        value={loginState.pseudo}
                        onChange={(e) => onPseudoChanged(e)}
                        required />
                </div>
                <FormInputError errors={loginState.pseudoErrors} />
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id='password'
                        placeholder='Your password'
                        value={loginState.password}
                        onChange={(e) => onPasswordChanged(e)}
                        required />
                </div>
                <FormInputError errors={loginState.passwordErrors} />
                <div>
                    <button type='submit'>Login</button>
                </div>
            </form>
            <section>
                <Link to={'/signup'}>Sign up</Link>
            </section>
        </section>
    );
};

export default Login;