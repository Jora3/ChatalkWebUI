import React, { useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api/api';
import FormError from './FormError';
import FormInputError from './FormInputError';

const SIGNUP_ACTION = {
    PSEUDO_CHANGED: 'pseudoChanged',
    PASSWORD_CHANGED: 'passwordChanged',
    PASSWORD_CONFIRMATION_CHANGED: 'passwordConfirmationChanged',
    PSEUDO_ERRORS_CHANGED: 'pseudoErrorsChanged',
    PASSWORD_ERRORS_CHANGED: 'passwordErrorsChanged',
    PASSWORD_CONFIRMATION_ERRORS_CHANGED: 'passwordConfirmationErrorsChanged',
    FORM_ERRORS_CHANGED: 'formErrorsChanged'
};

const initialSignupState = {
    pseudo: '',
    password: '',
    passwordConfirmation: '',
    pseudoErrors: [],
    passwordErrors: [],
    passwordConfirmationErrors: [],
    formErrors: ''
};

const signupReducer = (state, action) => {
    switch (action.type) {
        case SIGNUP_ACTION.PSEUDO_CHANGED:
            return { ...state, pseudo: action.payload, pseudoErrors: [] };
        case SIGNUP_ACTION.PSEUDO_ERRORS_CHANGED:
            return { ...state, pseudoErrors: action.payload };
        case SIGNUP_ACTION.PASSWORD_CHANGED:
            return { ...state, password: action.payload, passwordErrors: [] };
        case SIGNUP_ACTION.PASSWORD_ERRORS_CHANGED:
            return { ...state, passwordErrors: action.payload };
        case SIGNUP_ACTION.PASSWORD_CONFIRMATION_CHANGED:
            return { ...state, passwordConfirmation: action.payload, passwordConfirmationErrors: [] };
        case SIGNUP_ACTION.PASSWORD_CONFIRMATION_ERRORS_CHANGED:
            return { ...state, passwordConfirmationErrors: action.payload };
        case SIGNUP_ACTION.FORM_ERRORS_CHANGED:
            return { ...state, formErrors: action.payload };
        default:
            throw new Error('Unkown action for signup.');
    }
};

const Signup = () => {
    const navigate = useNavigate();
    const [signupState, signupDispatch] = useReducer(signupReducer, initialSignupState);

    const onPseudoChanged = (e) => {
        signupDispatch({ type: SIGNUP_ACTION.PSEUDO_CHANGED, payload: e.target.value });
    };

    const onPasswordChanged = (e) => {
        signupDispatch({ type: SIGNUP_ACTION.PASSWORD_CHANGED, payload: e.target.value });
    };

    const onPasswordConfirmationChanged = (e) => {
        signupDispatch({ type: SIGNUP_ACTION.PASSWORD_CONFIRMATION_CHANGED, payload: e.target.value });
    };

    const onSignupFormSubmitted = (e) => {
        e.preventDefault();

        signupDispatch({ type: SIGNUP_ACTION.PSEUDO_ERRORS_CHANGED, payload: [] });
        signupDispatch({ type: SIGNUP_ACTION.PASSWORD_ERRORS_CHANGED, payload: [] });
        signupDispatch({ type: SIGNUP_ACTION.PASSWORD_CONFIRMATION_ERRORS_CHANGED, payload: [] });
        signupDispatch({ type: SIGNUP_ACTION.FORM_ERRORS_CHANGED, payload: '' });

        api.post('/Users/signup', {
            pseudo: signupState.pseudo,
            password: signupState.password,
            passwordConfirmation: signupState.passwordConfirmation
        }).then(() => {
            alert('Your account was successfully created. You may login now.');
            navigate('/login');
        }).catch((error) => {
            if (error.response.data.errors) {
                if (error.response.data.errors.Pseudo) {
                    signupDispatch({ type: SIGNUP_ACTION.PSEUDO_ERRORS_CHANGED, payload: error.response.data.errors.Pseudo });
                }
                if (error.response.data.errors.Password) {
                    signupDispatch({ type: SIGNUP_ACTION.PASSWORD_ERRORS_CHANGED, payload: error.response.data.errors.Password });
                }
                if (error.response.data.errors.PasswordConfirmation) {
                    signupDispatch({ type: SIGNUP_ACTION.PASSWORD_CONFIRMATION_ERRORS_CHANGED, payload: error.response.data.errors.PasswordConfirmation });
                }
            }
            else if (error.response.data) {
                signupDispatch({ type: SIGNUP_ACTION.FORM_ERRORS_CHANGED, payload: error.response.data });
            }
        });
    }

    return (
        <section className='signup'>
            <h2>Sign up</h2>
            <form onSubmit={onSignupFormSubmitted}>
                <FormError error={signupState.formErrors}></FormError>
                <div>
                    <label htmlFor="pseudo">Pseudo</label>
                    <input
                        type="text"
                        id='pseudo'
                        placeholder='Your pseudo'
                        value={signupState.pseudo}
                        onChange={(e) => onPseudoChanged(e)}
                        required
                    />
                </div>
                <FormInputError errors={signupState.pseudoErrors}></FormInputError>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id='password'
                        placeholder='Your password'
                        value={signupState.password}
                        onChange={(e) => onPasswordChanged(e)}
                        required
                    />
                </div>
                <FormInputError errors={signupState.passwordErrors}></FormInputError>
                <div>
                    <label htmlFor="passwordConfirmation">Password Confirmation</label>
                    <input
                        type="password"
                        id='passwordConfirmation'
                        placeholder='Confirm your password'
                        value={signupState.passwordConfirmation}
                        onChange={(e) => onPasswordConfirmationChanged(e)}
                        required
                    />
                </div>
                <FormInputError errors={signupState.passwordConfirmationErrors}></FormInputError>
                <div>
                    <button type='submit'>Sign up</button>
                </div>
            </form>
            <section>
                <Link to={'/login'}>Login</Link>
            </section>
        </section>
    );
};

export default Signup;