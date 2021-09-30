import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Authorization from './Authorization';
import ProtectedRoute from './ProtectedRoute';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from './ConfirmDeletePopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import Footer from './Footer';
import * as auth from '../utils/auth';
import api from '../utils/api';
import { useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import '../index.css';


function App() {

    // Retrieve User info in object_______________________________________________________________USERINFO_______________
    const [currentUser, setCurrentUser] = React.useState({
        name: '',
        about: '',
        avatar: '',
        id: ''
    });

    const retrieveUserInfo = () => {
        api.getProfile().then(res => {
            setUserInfo(res);
            setAvatar(res.avatar);
        })
            .catch(err => { console.log(err) })
    }

    const setAvatar = (link) => {
        setCurrentUser((prevCurrentUser) => ({
            ...prevCurrentUser,
            avatar: link
        }));
    }

    const setUserInfo = (data) => {
        setCurrentUser((prevCurrentUser) => ({
            ...prevCurrentUser,
            name: data.name,
            about: data.about,
            id: data._id,
        }));
    }

    React.useEffect(() => {
        retrieveUserInfo();
    }, []);

    // POPUPS_________________________________________________________________________________________POPUPS

    // State Variables for Popups
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = React.useState(false);
    const [isRegisteredPopupOpen, setIsRegisteredPopupOpen] = React.useState(false);

    // State variables for cards
    const [selectedCard, setSelectedCard] = React.useState();
    const [cardForDelete, setCardForDelete] = React.useState();


    // Popup functions for opening and closing
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleConfirmDeleteClick(card) {
        setIsConfirmDeletePopupOpen(true);
        setCardForDelete(card);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleRegisterClick() {
        setIsRegisteredPopupOpen(true);
    }

    function closeAllPopups() {
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsConfirmDeletePopupOpen(false);
        setIsRegisteredPopupOpen(false);
        setSelectedCard();
    }

    // function for changing user info in the API based on inputs
    function handleUpdateUser(data) {
        api.changeProfile(data).then(res => {
            setUserInfo(data);
            closeAllPopups();
        })
            .catch(err => { console.log(err) })
    }

    // change avatar in the server
    function handleUpdateAvatar(data) {
        api.changeAvatar(data).then(res => {
            setAvatar(data);
            closeAllPopups();
        })
            .catch(err => { console.log(err) })
    }

    // CARDS____________________________________________________________________________________________CARDS_________

    // Cards state variable
    const [cards, setCards] = React.useState([]);

    // function that fetches cards
    function addCards() {
        api.getCardList().then(res => {
            setCards([...cards, ...res]);
        })
            .catch(err => { console.log(err) })
    }

    // call cards and profile using hook's "useEffect"
    React.useEffect(() => {
        addCards();
    }, []);

    // function for sending card likes or unlikes to API and resetting the status accordingly
    function handleCardLike(card) {
        const isLiked = card.likes.some(cardLike => cardLike._id === currentUser.id);
        api.changeLikeCardStatus(card._id, isLiked).then((likedCard) => {
            setCards(cards.map((cardItem) => cardItem._id === card._id ? likedCard : cardItem));
        })
            .catch(err => { console.log(err) });
    }

    // function for deleting a card
    function handleCardDelete(card) {
        handleConfirmDeleteClick(card);
    }

    // confirm deletion of card
    function confirmDeleteClick() {
        api.deleteCard(cardForDelete._id).then(res => {
            setCards(cards.filter((cardItem) => cardItem._id !== cardForDelete._id))
            setCardForDelete();
            closeAllPopups();
        })
            .catch(err => { console.log(err) });
    }

    // function for adding a card
    function addCardHandler(cardData) {
        api.addCard(cardData).then(res => {
            setCards([res, ...cards])
            closeAllPopups();
        })
            .catch(err => { console.log(err) });
    }

    // LOGIN AND AUTHORIZATION______________________________________________________________________AUTHORIZATION

    // state variable for determining whether on login or signup page
    const [headerLink, setHeaderLink] = React.useState({ name: 'Log in', path: '/signin' });

    const setLoginPath = () => {
        setHeaderLink({
            name: 'Log in',
            path: '/signin'
        })
    }

    const setRegisterPath = () => {
        setHeaderLink({
            name: 'Sign up',
            path: '/signup'
        })
    }

    const setLogoutPath = () => {
        setHeaderLink({
            name: 'Log out',
            path: '/signin'
        })
    }

    // state variable for determining whether logged in or not
    const [loggedIn, setLoggedIn] = React.useState(false);

    // function for setting login
    function handleLogin(formState) {
        auth.authorize(formState)
            .then((data) => {
                if (!data) {
                    return;
                }
                if (data.token) {
                    setLoggedIn(true);
                    history.push('/');
                }
            })
            .catch(error => console.log(error))
    }

    // State Variable for Registration
    const [isRegistered, setIsRegistered] = React.useState(false);

    // function for setting registration
    function handleRegistration(formState) {
        auth.register(formState)
            .then((res) => {
                if (res) {
                    console.log(res);
                    setIsRegistered(true);
                }
            })
            .catch(error => {
                console.log(error);
                setIsRegistered(false);
            })
            .finally(() => {
                handleRegisterClick();
            })
    }

    // props Object for Login
    const loginProps = {
        name: "Log in",
        path: "/signup",
        message: "Not a member? Sign up here!",
    }

    // props Object for Signup
    const signupProps = {
        name: "Sign up",
        path: "/signin",
        message: "Already a member? Log in here!",
        clickSubmitButton: handleRegisterClick
    }

    // variable for token
    const token = localStorage.getItem('token');

    // variable for history hook from react router
    const history = useHistory();

    // state variable for userEmail
    const [userEmail, setUserEmail] = React.useState('');

    // function for checking token
    const checkToken = () => {
        if (token) {
            auth.checkToken(token)
                .then((res) => {
                    if (res) {
                        setUserEmail(res.data.email);
                        setLoggedIn(true);
                        history.push('/');
                    }
                })
                .catch(error => { console.log(error) })
        }
    }

    React.useEffect(() => {
        checkToken();
    }, [history, token]);

    //   function for signing out
    function signOut() {
        history.push('/signin');
        localStorage.removeItem('token');
        setLoggedIn(false);
        setUserEmail('');
    }

    // Components
    return (

        <div>
            <CurrentUserContext.Provider value={currentUser}>
                <Header
                    headerLink={headerLink}
                    setLoginPath={setLoginPath}
                    setRegisterPath={setRegisterPath}
                    setLogoutPath={setLogoutPath}
                    signOut={signOut}
                    userEmail={userEmail} />
                <Switch>
                    <ProtectedRoute exact path='/'
                        loggedIn={loggedIn}
                        component={<Main
                            onEditAvatarClick={handleEditAvatarClick}
                            onEditProfileClick={handleEditProfileClick}
                            onAddPlaceClick={handleAddPlaceClick}
                            onCardClick={handleCardClick}
                            cards={cards}
                            handleCardLike={handleCardLike}
                            handleCardDelete={handleCardDelete} />}>
                    </ProtectedRoute>
                    <Route path='/signin'>
                        <Authorization
                            props={loginProps}
                            handleAuthorization={handleLogin} />
                    </Route>
                    <Route path='/signup'>
                        <Authorization
                            props={signupProps}
                            handleAuthorization={handleRegistration} />
                    </Route>
                </Switch>
                <Footer />
                <EditProfilePopup isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser} />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddCard={addCardHandler} />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar} />
                <ImagePopup card={selectedCard}
                    onClose={closeAllPopups} />
                <ConfirmDeletePopup isOpen={isConfirmDeletePopupOpen}
                    onClose={closeAllPopups}
                    cardDelete={confirmDeleteClick} />
                <InfoTooltip isOpen={isRegisteredPopupOpen}
                    isRegistered={isRegistered}
                    onClose={closeAllPopups} />
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;