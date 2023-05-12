import { useNavigate, useParams } from "react-router-dom";
import React from 'react';
import { useState, useEffect } from 'react';

function ManageSellerProperty() {

    const navigate = useNavigate()

    const { sellerId, firstName, lastName } = useParams()

    const [records, setRecords] = useState([])

    function getData() {
        fetch('http://localhost:8080/properties/read')
            .then((response) => response.json())
            .then((data) => {
                setRecords(data)
                console.log(data)
            })
    }

    useEffect(() => { getData() }, [])

    function removeRecord(recno) {

        let temprecords = records.filter(recs => recs.id !== recno);
        setRecords(temprecords);

        fetch(`http://localhost:8080/properties/delete/${recno}`, { method: "DELETE" })
            .then(response => {
                if (response.ok) {
                    response.json()

                } else {

                    console.error('Error deleting property:', response.status);

                }

            }).then(data => getData())

            .catch(error => {

                console.error('Error deleting property:', error);

            });

    }


    function withdrawProperty(recno) {
        fetch(`http://localhost:8080/properties/withdraw/${recno}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "Withdrawn" })
        })
            .then((response) => {
                navigate(`/ManageSellerProperty/${sellerId}/${firstName}/${lastName}`)
                getData();
            })
            .catch(error => {
                console.error('Error saving seller:', error);
            });
    }

    function resubmitProperty(recno) {
        fetch(`http://localhost:8080/properties/resubmit/${recno}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "FOR SALE" })
        })
            .then((response) => {
                if (response.ok) {

                    getData();
                }
            })
            .catch((error) => console.error("Error:", error));


    }

    function sellerProperty() {
        const url = `/AddPropertyForm/${sellerId}`
        navigate(url)
    }


    return (<>

        <header>Manage Seller Property of : {firstName} {lastName}</header><br />
        <br />
        <button className="btn btn-outline-dark btn-sm" onClick={() => sellerProperty()}> Add Property</button>

        <br /> <br />

        <table border='1'>
            <tr>
                <td>Address</td>
                <td>Postcode</td>
                <td>Type</td>
                <td>Price</td>
                <td>Bedrooms</td>
                <td>Bathrooms</td>
                <td>Garden</td>
                <td>SellerId</td>
                <td>Status</td>
                <td>id</td>
            </tr>
            {records.filter(rec => rec.seller !== null && parseInt(rec.seller.id) === parseInt(sellerId)).map(data =>
                <tr>
                    <td>{data.address}</td>
                    <td>{data.postcode}</td>
                    <td>{data.type}</td>
                    <td>{data.price}</td>
                    <td>{data.bedrooms}</td>
                    <td>{data.bathrooms}</td>
                    <td>{data.garden}</td>
                    <td>{data.sellerId}</td>
                    <td>{data.status}</td>
                    <td>{data.id}</td>

                    <td> <input className="btn btn-outline-dark btn-sm btn_delete" type="button" value="Delete Property" onClick={() => removeRecord(data.address)} /></td>
                    <td> <input className="btn btn-outline-dark btn-sm" type="button" value="Withdraw Property" onClick={() => withdrawProperty(data.id)} /></td>
                    <td> <input className="btn btn-outline-dark btn-sm" type="button" value="Resubmit Property" onClick={() => resubmitProperty(data.id)} /> </td>
                </tr>
            )}

        </table>
    </>
    )
}

export default ManageSellerProperty;