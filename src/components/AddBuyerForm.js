import BuyerForm from './BuyerForm.css'

import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from 'react';
 
export const AddBuyerForm = () => {
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const addressRef = useRef();
    const postcodeRef = useRef();
    const phoneRef = useRef();
    const budgetRef = useRef();

    const [errorMessage_firstName, setErrorMessage_firstName] = useState('');
    const [errorMessage_lastName, setErrorMessage_lastName] = useState('');
    const [errorMessage_phone, setErrorMessage_phone] = useState('');
    const [errorMessage_address, setErrorMessage_address] = useState('');
    const [errorMessage_postcode, setErrorMessage_postcode] = useState('');
    const [errorMessage_budget, setErrorMessage_budget] = useState('');

    const navigate = useNavigate()

    function validateAndSave() {
        const newBuyer = {
            "firstName": firstNameRef.current.value,
            "lastName": lastNameRef.current.value,
            "address": addressRef.current.value,
            "postcode": postcodeRef.current.value,
            "phone": phoneRef.current.value,
            "budget": budgetRef.current.value,
        };

            if (!newBuyer.firstName) { setErrorMessage_firstName('Please fill in your first name'); }
            else { setErrorMessage_firstName('') }

            if (!newBuyer.lastName) {setErrorMessage_lastName('Please fill in your last name'); }
            else {setErrorMessage_lastName('') }

            if (!newBuyer.phone) {setErrorMessage_phone('Please fill in your phone number'); }
            else {setErrorMessage_phone('') }

            if (!newBuyer.address) {setErrorMessage_address('Please fill in your home address'); }
            else {setErrorMessage_address('') }

            if (!newBuyer.postcode) {setErrorMessage_postcode('Please fill in your postcode'); }
            else {setErrorMessage_postcode('') }

            if (!newBuyer.budget) {setErrorMessage_budget('Please fill in your budget'); }
            else {setErrorMessage_postcode('') }

            if (newBuyer.firstName &&
                newBuyer.lastName &&
                newBuyer.phone &&
                newBuyer.address &&
                newBuyer.postcode &&
                newBuyer.budget

) {

    fetch("http://localhost:8080/buyers/add", {
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

        <label>Budget:</label>
        <input ref={budgetRef} type='text' placeholder="Budget"/>
        {errorMessage_budget && <div className="form-group has-warning">{errorMessage_budget}</div>}
        <br />



        <Link className="buyerBtn" onClick={() => validateAndSave()}> {' '}Save{' '} </Link>
        <Link to="/Buyer" className="cancelBtn"> {' '}Cancel{' '} </Link>
    </form>
)
}
export default AddBuyerForm;