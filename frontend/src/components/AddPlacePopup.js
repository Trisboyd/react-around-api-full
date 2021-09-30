import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

    const [placeName, setPlaceName] = React.useState('');
    const [placeLink, setPlaceLink] = React.useState('');

    React.useEffect(() => {
        setPlaceName('');
        setPlaceLink('');
    }, [props.isOpen])

    function handlePlaceNameChange(e) {
        setPlaceName(e.target.value);
    }

    function handlePlaceLinkChange(e) {
        setPlaceLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const placeInfo = { name: placeName, link: placeLink }
        props.onAddCard(placeInfo);
    }



    return (
        <PopupWithForm name="add-place"
            title="New Place"
            buttonText="Create"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}>
            <input type="text"
                placeholder="Title"
                id="place-title"
                value={placeName}
                onChange={handlePlaceNameChange}
                className="edit-box__text edit-box__text_type_name"
                name="name"
                minLength="1"
                maxLength="30"
                required />
            <span
                className="edit-box__text-error edit-box__text-error_type_place-title"
                id="place-title-error">
            </span>
            <input type="url"
                placeholder="Image link"
                id="image-link"
                value={placeLink}
                onChange={handlePlaceLinkChange}
                className="edit-box__text edit-box__text_type_descriptor"
                name="link"
                required />
            <span className="edit-box__text-error edit-box__text-error_type_url"
                id="image-link-error">

            </span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;