import React from 'react';

import { useState, useEffect } from 'react';



function Property() {

    const [records, setRecords] = useState([])

    function getData() {
        fetch('http://localhost:8080/properties/read')
            .then((response) => response.json()
                .then((data) => setRecords(data)))
    }


    useEffect(() => { getData() }, [])

    return (

        <>
            <header> Property List </header><br />

            <table>
                <tr>
                    <th> Address </th>
                    <th> Postcode </th>
                    <th> Type </th>
                    <th> Price </th>
                    <th> Bedrooms </th>
                    <th> Bathrooms </th>
                    <th> Garden </th>
                    <th> Status </th>

                </tr>

                {records.map(rec => <tr>
                    <td> {rec.address} </td>
                    <td> {rec.postcode} </td>
                    <td> {rec.type} </td>
                    <td> {rec.price} </td>
                    <td> {rec.bedrooms} </td>
                    <td> {rec.bathrooms} </td>
                    <td> {rec.garden} </td>
                    <td> {rec.status} </td>
                </tr>
                )}
            </table>
        </>

    )

}




export default Property;