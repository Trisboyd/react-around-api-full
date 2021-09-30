import React from 'react';
import aroundTheUs from "../images/aroundtheus.svg";
import { Link, useLocation } from 'react-router-dom';

function Header(props) {

    const location = useLocation();

    const setHeaderLink = () => {
        if (location.pathname === '/signin') {
            props.setRegisterPath();
        }
        if (location.pathname === '/signup') {
            props.setLoginPath();
        }
        if (location.pathname === '/') {
            props.setLogoutPath();
        }
    }

    const signOut = () => {
        if (location.pathname === '/') {
            props.signOut();
        }
        else return;
    }

    React.useEffect(() => {
        setHeaderLink();
    }, [location]);

    return (
        <header className="header">
            <img className="header__img" src={aroundTheUs} alt="Around the U.S." />
            <p className="header__email">{props.userEmail}</p>
            <Link to={props.headerLink.path}
                className="header__link"
                onClick={signOut}>
                {props.headerLink.name}
            </Link>
        </header>
    )
}

export default Header