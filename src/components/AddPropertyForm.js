import { Link, useNavigate, useParams } from 'react-router-dom';

import React, { useRef, useState } from 'react';




export const SellerpropertyInputForm = () => {

     const {sellerID} = useParams()

     const addressRef = useRef();
     const postcodeRef = useRef();
     const typeRef = useRef();
     const priceRef = useRef();
     const bedroomRef = useRef();
     const bathroomRef = useRef();
     const gardenRef = useRef();


     let [errorMessage_address, setErrorMessage_address] = useState('');
     let [errorMessage_postcode, setErrorMessage_postcode] = useState('');
     let [errorMessage_type, setErrorMessage_type] = useState('');
     let [errorMessage_price, setErrorMessage_price] = useState('');
     let [errorMessage_bedroom, setErrorMessage_bedroom] = useState('');
     let [errorMessage_bathroom, setErrorMessage_bathroom] = useState('');
     let [errorMessage_garden, setErrorMessage_garden] = useState('');

     const navigate = useNavigate()

     function validateAndSave() {

          const newSeller = {

               "address": addressRef.current.value,
               "postcode": postcodeRef.current.value,
               "type": typeRef.current.value,
               "price": priceRef.current.value,
               "bedroom": bedroomRef.current.value,
               "bathroom": bathroomRef.current.value,
               "garden": gardenRef.current.value,
               "sellerId": parseInt(sellerID), 
               "status": "FOR SALE"
               
          }

          if (!newSeller.address) { setErrorMessage_address('Please fill in address.'); }
          else { setErrorMessage_address('') }

          if (!newSeller.postcode) { setErrorMessage_postcode('Please fill in postcode.'); }
          else { setErrorMessage_postcode('') }

          if (newSeller.type === "select") { setErrorMessage_type('Please select type.'); }
          else { setErrorMessage_type('') }

          if (!newSeller.price) { setErrorMessage_price('Please fill in price.'); }
          else { setErrorMessage_price('') }

          if (newSeller.bedroom === "select") { setErrorMessage_bedroom('Please select number of bedrooms.'); }
          else { setErrorMessage_bedroom('') }

          if (newSeller.bathroom === "select") { setErrorMessage_bathroom('Please select number of bathrooms.'); }
          else { setErrorMessage_bathroom('') }

          if (newSeller.garden === "select") { setErrorMessage_garden('Please select whether you have a garden.'); }
          else { setErrorMessage_garden('') }


          if (newSeller.address &&
               newSeller.postcode &&
               newSeller.type &&
               newSeller.price &&
               newSeller.bedroom &&
               newSeller.bathroom &&
               newSeller.garden) {

               fetch('http://localhost:8000/property', {
                    method: "POST",
                    headers: { "content-Type": "application/json" },
                    body: JSON.stringify(newSeller)
               })
                    .then((response) => {
                         navigate("/Properties")
                    })
                    .catch(error => {
                         console.error('Error saving property:', error);
                    });
          }
     }

     return (

          <>

               <header> Add Seller Property Form </header><br />

               <form class='form'>

                    <label> Type: </label>
                    <select ref={typeRef} type='text' placeholder='Type'>
                         <option value="select">Select</option>
                         <option value="DETACHED"> Detached </option>
                         <option value="SEMI"> Semi-detached </option>
                         <option value="APARTMENT"> Apartment </option>
                    </select>
                    {errorMessage_type && <div className="form-group has-warning">{errorMessage_type}</div>}
                    <br />


                    <label> Price: </label>
                    <input ref={priceRef} type='text' placeholder='Price' />
                    {errorMessage_price && <div className="form-group has-warning">{errorMessage_price}</div>}
                    <br />


                    <label> Number of bedrooms: </label>
                    <select ref={bedroomRef} type='text' placeholder='Bedroom'>
                         <option value="select">Select</option>
                         <option>1</option>
                         <option>2</option>
                         <option>3</option>
                         <option>4</option>
                         <option>5</option>
                    </select>
                    {errorMessage_bedroom && <div className="form-group has-warning">{errorMessage_bedroom}</div>}
                    <br />


                    <label> Number of bathrooms: </label>
                    <select ref={bathroomRef} type='text' placeholder='Bathroom'>
                         <option value="select">Select</option>
                         <option>1</option>
                         <option>2</option>
                         <option>3</option>
                         <option>4</option>
                         <option>5</option>
                    </select>
                    {errorMessage_bathroom && <div className="form-group has-warning">{errorMessage_bathroom}</div>}
                    <br />


                    <label> Is there a garden: </label>
                    <select ref={gardenRef} type='text' placeholder='garden'>
                         <option value="select">Select</option>
                         <option value="true">Yes</option>
                         <option value="false">No</option>
                    </select>
                    {errorMessage_garden && <div className="form-group has-warning">{errorMessage_garden}</div>}
                    <br />

                    <label> Address: </label>
                    <input ref={addressRef} type='text' placeholder='City/Country' />
                    {errorMessage_address && <div className="form-group has-warning">{errorMessage_address}</div>}
                    <br />

                    <label> Postcode: </label>
                    <input ref={postcodeRef} type='text' placeholder='Postcode' />
                    {errorMessage_postcode && <div className="form-group has-warning">{errorMessage_postcode}</div>}
                    <br />

                    <Link className="btn btn-outline-dark btn-sm" onClick={() => validateAndSave()}> Save </Link>
                    <Link to="/Properties" className="btn btn-outline-dark btn-sm"> Cancel </Link>

               </form>
          </>
     )

}

export default SellerpropertyInputForm;