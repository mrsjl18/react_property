import { useState, useEffect } from 'react';

import { Link, useNavigate } from "react-router-dom";

function SellersList() {
    const [records, setRecords] = useState([])
    const navigate = useNavigate()
    const [sellers, setSellers] = useState([])

    function getData() {
        fetch('http://localhost:8080/sellers/read')
            .then((response) => response.json()
                .then((data) => setSellers(data)))
    }

    useEffect(() => { getData() }, [])

    function sellerProperty(seller) {
        const url = `/ManageSellerProperty/${seller.id}/${seller.firstName}/${seller.lastName}`
        navigate (url)
    }

    function removeRecord(recno) {
         
        let temprecords = records.filter(recs => recs.id !== recno);
        setRecords(temprecords);

        fetch(`http://localhost:8080/sellers/delete/${recno}`, { method: "DELETE" })
.then(response => {
    if (response.ok){ response.json()

    } else {

        console.error('Error deleting seller:', response.status);

    }

}).then(data => getData())

.catch(error => {

    console.error('Error deleting seller:', error);

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
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Home Address</th>
                        <th>Postcode</th>
                    </tr>
                </thead>
                <tbody>
                    {sellers.map(data =>
                        <tr>
                            <td>{data.firstName}</td>
                            <td>{data.lastName}</td>
                            <td>{data.phone}</td> 
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