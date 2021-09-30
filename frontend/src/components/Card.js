import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


const Card = (props) => {

    // User info imported by context
    const currentUser = React.useContext(CurrentUserContext);

    // click on the card to open the ImagePopup
    function handleClick() {
        props.onCardClick(props.card);
    }

    // click on heart to add or subtract like
    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    // delete a card
    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    // Checking if the current user is the owner of the current card
    const isOwn = props.cardOwner === currentUser.id;

    // Creating a variable which you'll then set in `className` for the delete button
    const placeTrashClassName = (
        `place__trash ${isOwn ? 'place__trash_visible' : 'place__trash_hidden'}`
    );

    // check if the user has liked a card
    const isLiked = props.card.likes.some(i => i._id === currentUser.id);

    // create a variable to set classname for like button
    const placeButtonClassName = (
        `place__button ${isLiked ? 'place__button_type_filled' : 'place__button_type_unfilled'}`
    );

    return (
        <article className="place">
            <button className={placeTrashClassName}
                type="button" aria-label="trash-button"
                onClick={handleDeleteClick}>
            </button>
            <img className="place__image"
                src={props.link}
                alt={props.name}
                onClick={handleClick} />
            <div className="place__info">
                <h2 className="place__name">{props.name}</h2>
                <div className="place__info_like-column">
                    <button className={placeButtonClassName}
                        type="button"
                        onClick={handleLikeClick}
                        aria-label="like-button"></button>
                    <p className="place__like-count">{props.likes}</p>
                </div>
            </div>
        </article>
    )
}

export default Card;