import { useState, useEffect } from 'react';

import { Link, useNavigate } from "react-router-dom";

function SellersList() {
    const [records, setRecords] = useState([])
    const navigate = useNavigate()
    const [sellers, setSellers] = useState([])

    function getData() {
        fetch('http://localhost:8000/seller')
            .then((response) => response.json()
                .then((data) => setSellers(data)))
    }

    useEffect(() => { getData() }, [])

    function sellerProperty(seller) {
        const url = `/ManageSellerProperty/${seller.id}/${seller.firstName}/${seller.surname}`
        navigate (url)
    }

    function removeRecord(recno) {
        fetch(`http://localhost:8000/seller/${recno}`, { method: "DELETE" })
            .then(response => {
                if (response.ok) {
                    let temprecords = records.filter(recs => recs.id !== recno);
                    setRecords(temprecords);

                } else {

                    console.error('Error deleting property:', response.status);

                }

            })

            .catch(error => {

                console.error('Error deleting property:', error);

            });
        }

    return (


        <div>
            <br />
            <Link className="btn btn-outline-dark btn-sm" to = "/AddSellerForm"> Add Seller</Link>
            <Link className="addsellerbtn" type="button" value="Add Seller" />
            <br />

            <table border="1">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Surname</th>
                        <th>Phone Number</th>
                        <th>Email Address</th>
                        <th>Home Address</th>
                        <th>Postcode</th>
                    </tr>
                </thead>
                <tbody>
                    {sellers.map(data =>
                        <tr>
                            <td>{data.firstName}</td>
                            <td>{data.surname}</td>
                            <td>{data.phone}</td> 
                            <td>{data.email}</td>
                            <td>{data.address}</td>
                            <td>{data.postcode}</td>
                            <td><button className="btn btn-outline-dark btn-sm" onClick={()=> sellerProperty(data)}> Manage </button></td>
                            <td> <input className="btn btn-outline-dark btn-sm btn_delete" type="button" value="Delete" onClick={() => removeRecord(data.id)} /></td>
                        </tr>
                    )
                    }


                </tbody>
            </table>
        </div>
    )
}
export default SellersList;