import { useNavigate, useParams } from "react-router-dom";
import React from 'react';
import { useState, useEffect } from 'react';

function ManageBuyerProperty() {

    const navigate = useNavigate()

    const { buyerId, firstName, surname } = useParams()

    const [records, setRecords] = useState([])

    function getData() {
        fetch('http://localhost:8000/property')
            .then((response) => response.json()
                .then((data) => setRecords(data)))
    }

    useEffect(() => { getData() }, [])

    function removeRecord(recno) {
        fetch(`http://localhost:8000/property/${recno}`, { method: "DELETE" })
            .then(response => {
                if (response.ok) {
                    let temprecords = records.filter(recs => recs.id !== recno);
                    setRecords(temprecords);

                } else {

                    console.error('Error deleting record:', response.status);

                }

            })

            .catch(error => {

                console.error('Error deleting record:', error);

            });

    }

    function buyerProperty() {
        const url = `/AddPropertyForm/${buyerId}`
        navigate(url)
    }

    const filteredRecord = records.filter(rec => rec.buyerId == buyerId)
    return (<>

        <header>Manage Buyer Property of : {firstName} {surname}</header><br />
        <br />
        <button className="btn btn-outline-dark btn-sm" onClick={() => buyerProperty()}> Add Property</button>

        <br /> <br />

        <table border='1'>
            <tr>
                <td>Address</td>
                <td>Postcode</td>
                <td>Type</td>
                <td>Price</td>
                <td>Bedroom</td>
                <td>Bathroom</td>
                <td>Garden</td>
                <td>SellerId</td>
                <td>Status</td>
                <td>id</td>
            </tr>
            {filteredRecord.map(data =>
                <tr>
                    <td>{data.address}</td>
                    <td>{data.postcode}</td>
                    <td>{data.type}</td>
                    <td>{data.price}</td>
                    <td>{data.bedroom}</td>
                    <td>{data.bathroom}</td>
                    <td>{data.garden}</td>
                    <td>{data.sellerId}</td>
                    <td>{data.status}</td>
                    <td>{data.id}</td>
                    <td> <input className="btn btn-outline-dark btn-sm btn_delete" type="button" value="Withdraw Property" onClick={() => removeRecord(data.id)} /></td>
                </tr>
            )}

        </table>
    </>
    )
}
export default ManageBuyerProperty;