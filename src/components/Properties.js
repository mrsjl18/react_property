import React from 'react';

import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';


function Property() {

    const [records, setRecords] = useState([])

    function getData() {
        fetch('http://localhost:8000/property')
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
                    <th> Bedroom </th>
                    <th> Bathroom </th>
                    <th> Status </th>

                </tr>

                {records.map(rec => <tr>
                    <td> {rec.address} </td>
                    <td> {rec.postcode} </td>
                    <td> {rec.type} </td>
                    <td> {rec.price} </td>
                    <td> {rec.bedroom} </td>
                    <td> {rec.bathroom} </td>
                    <td> {rec.status} </td>
                </tr>
                )}
            </table>
        </>

    )

}




export default Property;