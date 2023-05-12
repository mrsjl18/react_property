import { useState, useEffect } from 'react';

import { useNavigate, Link} from "react-router-dom";

function BuyersList() {
    const [records, setRecords] = useState([])
    const navigate = useNavigate()
    const [buyers, setBuyers] = useState([])

    function getData() {
        fetch('http://localhost:8080/buyers/read')
            .then((response) => response.json()
                .then((data) => setBuyers(data)))
    }

    useEffect(() => { getData() }, [])

    function buyerProperty(buyer) {
        const url = `/ManageBuyerProperty/${buyer.id}/${buyer.firstName}/${buyer.lastName}`
        navigate (url)
    }

    function removeBuyer(recno) {
         
                    let temprecords = records.filter(recs => recs.id !== recno);
                    setRecords(temprecords);

                    fetch(`http://localhost:8080/buyers/delete/${recno}`, { method: "DELETE" })
            .then(response => {
                if (response.ok){ response.json()

                } else {

                    console.error('Error deleting buyer:', response.status);

                }

    }).then(data => getData())

            .catch(error => {

                console.error('Error deleting buyer:', error);

            });

        }


    return (


        <div>
            <br />
            <Link className="btn btn-outline-dark btn-sm" to = "/AddBuyerForm"> Add Buyer</Link>
            <Link className="addbuyerbtn" type="button" value="Add Buyer" />
            <br />

            <table border="1">
                <thead>
                    <tr>
                        {/*<th>Seller ID</th>*/}
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Home Address</th>
                        <th>Postcode</th>
                        <th>Budget</th>
                    </tr>
                </thead>
                <tbody>
                    {buyers.map(data =>
                        <tr>
                            {/*<td>{data.id}</td>*/}
                            <td>{data.firstName}</td>
                            <td>{data.lastName}</td>
                            <td>{data.phone}</td> 
                            <td>{data.address}</td>
                            <td>{data.postcode}</td>
                            <td>{data.budget}</td>
                            <td><button className="btn btn-outline-dark btn-sm" onClick={()=> buyerProperty(data)}> Manage </button></td>
                            <td> <input className="btn btn-outline-dark btn-sm btn_delete" type="button" value="Delete" onClick={() => removeBuyer(data.id)} /></td>
                        </tr>
                    )
                    }


                </tbody>
            </table>
        </div>
    )
}
export default BuyersList;