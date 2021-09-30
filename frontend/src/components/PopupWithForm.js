import React from 'react';

function PopupWithForm(props) {
    return (
        <section className={`popup popup_${props.name} ${props.isOpen ? 'popup_visible' : ''}`}>
            <div className="popup__container">
                <button className={`popup__exit popup__exit_${props.name}`}
                    type="button"
                    aria-label="exit"
                    onClick={props.onClose}></button>
                <form className={`edit-box edit-box_type_${props.name}`}
                    name={props.name}
                    onSubmit={props.onSubmit}>
                    <h3 className="edit-box__title">{props.title}</h3>
                    {props.children}
                    <button type="submit"
                        id={props.name}
                        className="edit-box__submit"
                        name="edit-box-submit"
                        aria-label="submit"
                        value="Save">{props.buttonText}</button>
                </form>
            </div>
        </section>
    )
}

export default PopupWithForm;
