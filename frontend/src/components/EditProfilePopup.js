import React from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

    // state variables for inputs
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen])

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const info = { name: name, about: description }
        props.onUpdateUser(info);
    }


    return (
        <PopupWithForm name="edit-profile"
            title="Edit Profile"
            buttonText="Save"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}>
            <input type="text"
                value={name}
                id="profile-name"
                onChange={handleNameChange}
                className="edit-box__text edit-box__text_type_name"
                name="name"
                minLength="2"
                maxLength="40"
                required />
            <span className="edit-box__text-error edit-box__text-error_type_name"
                id="profile-name-error">
            </span>
            <input type="text"
                value={description}
                id="profile-descriptor"
                onChange={handleDescriptionChange}
                className="edit-box__text edit-box__text_type_descriptor"
                name="descriptor"
                minLength="2"
                maxLength="200"
                required />
            <span className="edit-box__text-error edit-box__text-error_type_descriptor"
                id="profile-descriptor-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;