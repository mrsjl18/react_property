import BuyerForm from './BuyerForm.css'

import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from 'react';
 
export const AddBuyerForm = () => {
    const firstNameRef = useRef();
    const surnameRef = useRef();
    const addressRef = useRef();
    const postcodeRef = useRef();
    const phoneRef = useRef();

    const [errorMessage_firstName, setErrorMessage_firstName] = useState('');
    const [errorMessage_surname, setErrorMessage_surname] = useState('');
    const [errorMessage_phone, setErrorMessage_phone] = useState('');
    const [errorMessage_address, setErrorMessage_address] = useState('');
    const [errorMessage_postcode, setErrorMessage_postcode] = useState('');

    const navigate = useNavigate()

    function validateAndSave() {
        const newBuyer = {
            "firstName": firstNameRef.current.value,
            "surname": surnameRef.current.value,
            "address": addressRef.current.value,
            "postcode": postcodeRef.current.value,
            "phone": phoneRef.current.value,
        };

            if (!newBuyer.firstName) { setErrorMessage_firstName('Please fill in your first name'); }
            else { setErrorMessage_firstName('') }

            if (!newBuyer.surname) {setErrorMessage_surname('Please fill in your surname'); }
            else {setErrorMessage_surname('') }

            if (!newBuyer.phone) {setErrorMessage_phone('Please fill in your phone number'); }
            else {setErrorMessage_phone('') }

            if (!newBuyer.address) {setErrorMessage_address('Please fill in your home address'); }
            else {setErrorMessage_address('') }

            if (!newBuyer.postcode) {setErrorMessage_postcode('Please fill in your postcode'); }
            else {setErrorMessage_postcode('') }

            if (newBuyer.firstName &&
                newBuyer.surname &&
                newBuyer.phone &&
                newBuyer.address &&
                newBuyer.postcode

) {

    fetch("http://localhost:8000/buyer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBuyer)
    })

        .then((response) => {
            navigate("/Buyer")
        })
        .catch(error => {
            console.error('Error saving buyer:', error);
        });
}
}

return (
    <form class="addbuyerform container">
        <label>First Name:</label>
        <input ref={firstNameRef} type='text' placeholder="First name" />
        {errorMessage_firstName && <div className="form-group has-warning">{errorMessage_firstName}</div>}
        <br/> 

        <label>Surname:</label>
        <input ref={surnameRef} type='text' placeholder="Surname"/>
         {errorMessage_surname && <div className="form-group has-warning">{errorMessage_surname}</div>}
         <br />

         <label>Phone Number:</label>
        <input ref={phoneRef} type='text' placeholder="Phone number"/>
        {errorMessage_phone && <div className="form-group has-warning">{errorMessage_phone}</div>}
        <br />

        <label>Home Address:</label>
        <input ref={addressRef} type='text' placeholder="Home address"/>
        {errorMessage_address && <div className="form-group has-warning">{errorMessage_address}</div>}
        <br />

        <label>Postcode:</label>
        <input ref={postcodeRef} type='text' placeholder="Postcode"/>
        {errorMessage_postcode && <div className="form-group has-warning">{errorMessage_postcode}</div>}
        <br />


        <Link className="buyerBtn" onClick={() => validateAndSave()}> {' '}Save{' '} </Link>
        <Link to="/Buyer" className="cancelBtn"> {' '}Cancel{' '} </Link>
    </form>
)
}
export default AddBuyerForm;