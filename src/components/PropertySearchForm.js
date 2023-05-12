import { Link } from "react-router-dom";
import React from 'react';
import { useState, useEffect } from 'react';


function PropertySearch() {

    const [records, setRecords] = useState([]);

    const [postcode, setpostcode] = useState('');
    const [type, settype] = useState('');
    const [price, setprice] = useState('');
    const [bedrooms, setbedrooms] = useState('');
    const [bathrooms, setbathrooms] = useState('');
    const [garden, setgarden] = useState('');


    function getData() {
        fetch('http://localhost:8080/properties/read')
            .then((response) => response.json())
            .then((data) => {
                setRecords(data);
            });
    }

    useEffect(() => { getData() }, [])

    function handleSearch() {
        fetch('http://localhost:8080/properties/read')
            .then((response) => response.json())
            .then((data) => {
                const filteredRecords = data.filter((rec) => rec.bedrooms == bedrooms && (rec.bathrooms == bathrooms == '')&& (rec.price == price || price ==''));
                setRecords(filteredRecords);
            });
    }


    return (
        <>
            <h2>Property Search</h2>
            <label>
                Postcode:
                <input type="text" value={postcode} onChange={(e) => setpostcode(e.target.value)} />
            </label>
            <br />
            <label>
                Type:
                <input type="text" value={type} onChange={(e) => settype(e.target.value)} />
            </label>
            <br />
            <label>
                Price:
                <input type="text" value={price} onChange={(e) => setprice(e.target.value)} />
            </label>
            <br />
            <label>
                Bedroom:
                <input type="text" value={bedrooms} onChange={(e) => setbedrooms(e.target.value)} />
            </label>
            <br />
            <label>
                Bathroom:
                <input type="text" value={bathrooms} onChange={(e) => setbathrooms(e.target.value)} />
            </label>
            <br />
            <label>
                Garden:
                <input type="text" value={garden} onChange={(e) => setgarden(e.target.value)} />
            </label>
            <br />

            <button type="submit" onClick={() => handleSearch()}>Search</button>

            {records.map(rec => (
                <tr key={rec.id}>
                    <td>{rec.address}</td>
                    <td>{rec.postcode}</td>
                    <td>{rec.type}</td>
                    <td>{rec.price}</td>
                    <td>{rec.bedrooms}</td>
                    <td>{rec.bathrooms}</td>
                    <td>{rec.status}</td>
                    <td>
                        {rec.status === "FOR SALE" && (
                            <Link to="/Property/Purchase" className="btn btn-dark">
                                BUY
                            </Link>
                        )}
                    </td>
                </tr>
            ))
            }
        </>
    );
}





export default PropertySearch;