import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Homepage from './Homepage.js';
import Seller from './Seller.js';
import Buyer from './Buyer.js';
import Properties from './Properties.js';
import AddSellerForm from './AddSellerForm.js'; 
import AddBuyerForm from './AddBuyerForm.js'; 
import ManageSellerProperty from './ManageSellerProperty.js';
import AddPropertyForm from './AddPropertyForm.js'; 
import ManageBuyerProperty from './ManageBuyerProperty.js'; 
import PropertySearchForm from './PropertySearchForm.js';

function navBar() {

  return (
    <BrowserRouter>

      <nav className="navbar navbar-expand-lg bg-light">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Seller">Sellers</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Buyer">Buyers</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Properties">Properties</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/PropertySearchForm">Search for a property</Link>
          </li>

        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Seller" element={<Seller />} />
        <Route path="/Buyer" element={<Buyer />} />
        <Route path="/Properties" element={<Properties />} />
        <Route path="/AddSellerForm" element={<AddSellerForm/>}/>
        <Route path="/AddBuyerForm" element={<AddBuyerForm/>}/>
        <Route path="/PropertySearchForm" element={<PropertySearchForm/>}/>
        
        <Route path="/ManageSellerProperty/:sellerId/:firstName/:surname" element={<ManageSellerProperty/>}/>
        <Route path="/AddPropertyForm/:sellerID" element={<AddPropertyForm/>}/>
        <Route path="/ManageBuyerProperty/:buyerId/:firstName/:surname" element={<ManageBuyerProperty/>}/>

      </Routes>
    </BrowserRouter>


  )
}

export default navBar; 