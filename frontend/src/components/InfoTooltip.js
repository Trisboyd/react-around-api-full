import React from 'react';
import confirmedRegister from '../images/confirmed-register.png';
import deniedRegister from '../images/denied-register.png';


function InfoTooltip(props) {

    const setImage = () => {
        if (props.isRegistered) {
            let image = confirmedRegister
            return image;
        }
        else {
            let image = deniedRegister;
            return image;
        }
    }

    const setMessage = () => {
        if (props.isRegistered) {
            let message = 'Success! You have now been registered.';
            return message;
        }
        else {
            let message = 'Oops, something went wrong! Please try again.';
            return message;
        }
    }

    return (
        <section className={`popup ${props.isOpen ? 'popup_visible' : ''}`}>
            <div className='popup__container'>
                <div className='edit-box'>
                    <button className='popup__exit'
                        type="button"
                        aria-label="exit"
                        onClick={props.onClose}></button>
                    <img className='edit-box__register-image'
                        alt='NA'
                        src={setImage()} />
                    <h3 className="edit-box__register-message">{setMessage()}</h3>
                </div>
            </div>
        </section>
    )
}

export default InfoTooltip;