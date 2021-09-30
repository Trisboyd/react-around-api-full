import React from 'react';
import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup(props) {

    function submitHandler(event) {
        event.preventDefault();
        props.cardDelete();
    }

    return (
        <PopupWithForm name="card-delete"
            title="Are you sure?"
            buttonText="Yes"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={submitHandler}>
        </PopupWithForm>
    )
}

export default ConfirmDeletePopup;