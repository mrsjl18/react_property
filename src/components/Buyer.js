import { useState, useEffect } from 'react';

import { useNavigate, Link} from "react-router-dom";

function BuyersList() {
    const [records, setRecords] = useState([])
    const navigate = useNavigate()
    const [buyers, setBuyers] = useState([])

    function getData() {
        fetch('http://localhost:8000/buyer')
            .then((response) => response.json()
                .then((data) => setBuyers(data)))
    }

    useEffect(() => { getData() }, [])

    function buyerProperty(buyer) {
        const url = `/ManageBuyerProperty/${buyer.id}/${buyer.firstName}/${buyer.surname}`
        navigate (url)
    }

    function removeBuyer(recno) {
        fetch(`http://localhost:8000/buyer/${recno}`, { method: "DELETE" })
            .then(response => {
                if (response.ok) {
                    let temprecords = records.filter(recs => recs.id !== recno);
                    setRecords(temprecords);

                } else {

                    console.error('Error deleting buyer:', response.status);

                }

            })

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
                        <th>Surname</th>
                        <th>Phone Number</th>
                        <th>Email Address</th>
                        <th>Home Address</th>
                        <th>Postcode</th>
                    </tr>
                </thead>
                <tbody>
                    {buyers.map(data =>
                        <tr>
                            {/*<td>{data.id}</td>*/}
                            <td>{data.firstName}</td>
                            <td>{data.surname}</td>
                            <td>{data.phone}</td> 
                            <td>{data.email}</td>
                            <td>{data.address}</td>
                            <td>{data.postcode}</td>
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