import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Authorization({ props, handleAuthorization }) {

    // constants and state variables________________________________________________
    const location = useLocation();

    const { name, message, path, clickSubmitButton } = props;

    const [formState, setFormState] = React.useState({
        email: '',
        password: ''
    });

    // changes email and password based on user input in input fields
    const handleChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    // function for handling a new registration
    const handleRegister = () => {
        if (formState.email && formState.password) {
            handleAuthorization(formState);
            clickSubmitButton();
        }
        else (
            console.log("Email and password required")
        )
    }

    // function for handling a login
    const handleSignin = () => {
        if (!formState.email || !formState.password) {
            return false;
        }
        handleAuthorization(formState);
    }

    // catch all for determining whether to register or login based on the submit button
    const handleSubmit = (event) => {
        event.preventDefault();
        if (location.pathname === '/signup') {
            handleRegister();
        }
        else handleSignin();
    }

    return (
        <section className="auth">
            <form className="edit-box edit-box_auth"
                onSubmit={handleSubmit}>
                <h2 className="auth__title">{name}</h2>
                <input type="text"
                    className="auth__input"
                    name='email'
                    placeholder="Email"
                    value={formState.email}
                    onChange={handleChange}></input>
                <input
                    type="text"
                    className="auth__input"
                    name='password'
                    placeholder="Password"
                    value={formState.password}
                    onChange={handleChange}></input>
                <button type="submit"
                    id="login"
                    className="edit-box__submit edit-box__submit_auth"
                    name="edit-box-submit"
                    aria-label="submit"
                    value="Login">
                    {name}
                </button>
                <Link to={path}
                    className="auth__text">
                    {message}
                </Link>
            </form>
        </section>
    )
}

export default Authorization