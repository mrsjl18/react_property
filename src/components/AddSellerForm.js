import SellerForm from './SellerForm.css'

import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from 'react';


export const AddSellerForm = () => {
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const addressRef = useRef();
    const postcodeRef = useRef();
    const phoneRef = useRef();

    const [errorMessage_firstName, setErrorMessage_firstName] = useState('');
    const [errorMessage_lastName, setErrorMessage_lastName] = useState('');
    const [errorMessage_phone, setErrorMessage_phone] = useState('');
    const [errorMessage_address, setErrorMessage_address] = useState('');
    const [errorMessage_postcode, setErrorMessage_postcode] = useState('');

    const navigate = useNavigate()

    function validateAndSave() {
        const newSeller = {
            "firstName": firstNameRef.current.value,
            "lastName": lastNameRef.current.value,
            "address": addressRef.current.value,
            "postcode": postcodeRef.current.value,
            "phone": phoneRef.current.value,
        };

            if (!newSeller.firstName) { setErrorMessage_firstName('Please fill in your first name'); }
            else { setErrorMessage_firstName('') }

            if (!newSeller.lastName) {setErrorMessage_lastName('Please fill in your last name'); }
            else {setErrorMessage_lastName('') }

            if (!newSeller.phone) {setErrorMessage_phone('Please fill in your phone number'); }
            else {setErrorMessage_phone('') }

            if (!newSeller.address) {setErrorMessage_address('Please fill in your home address'); }
            else {setErrorMessage_address('') }

            if (!newSeller.postcode) {setErrorMessage_postcode('Please fill in your postcode'); }
            else {setErrorMessage_postcode('') }

            if (newSeller.firstName &&
                newSeller.lastName &&
                newSeller.phone &&
                newSeller.address &&
                newSeller.postcode

) {

    fetch("http://localhost:8080/sellers/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSeller)
    })

        .then((response) => {
            navigate("/Seller")
        })
        .catch(error => {
            console.error('Error saving seller:', error);
        });
}
}

return (
    <form class="addsellerform container">
        <label>First Name:</label>
        <input ref={firstNameRef} type='text' placeholder="First name" />
        {errorMessage_firstName && <div className="form-group has-warning">{errorMessage_firstName}</div>}
        <br/> 

        <label>Last Name:</label>
        <input ref={lastNameRef} type='text' placeholder="Last name"/>
         {errorMessage_lastName && <div className="form-group has-warning">{errorMessage_lastName}</div>}
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


        <Link className="sellerBtn" onClick={() => validateAndSave()}> {' '}Save{' '} </Link>
        <Link to="/Seller" className="cancelBtn"> {' '}Cancel{' '} </Link>
    </form>
)
}

export default AddSellerForm;

