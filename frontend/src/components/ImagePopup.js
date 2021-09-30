import React from 'react';

function ImagePopup(props) {

    return (
        <section className={`popup popup_image ${props.card ? 'popup_visible' : ''}`}>
            <div className="popup-image-container">
                <button className="popup__exit popup__exit_image"
                    type="button"
                    aria-label="exit"
                    onClick={props.onClose}></button>
                <img className="popup-image-container__pic"
                    src={props.card?.link}
                    alt={props.card?.name} />
                <p className="popup-image-container__title">{props.card?.name}</p>
            </div>
        </section>
    )
}

export default ImagePopup;