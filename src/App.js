import React, { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetails from './components/productDetails/ProductDetails';
import Shipment from './components/Shipment/Shipment';
import Logging from './components/Logging/Logging';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
export const UserContext= createContext()
function App() {
  const [loggedInUser,setLoggedUser]= useState({ })
  return (
    <UserContext.Provider value={[loggedInUser,setLoggedUser]}>
      <h3>Email: {loggedInUser.email}</h3>
      
      <Router>
      <Header></Header>
        <Switch>
          <Route path="/shop">
          <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <PrivateRoute path="/inventory">
            <Inventory></Inventory>
         </PrivateRoute>
          <PrivateRoute path="/shipment">
           <Shipment></Shipment>
         </PrivateRoute>
          <Route path="/login">
            <Logging></Logging>
         </Route>

         <Route exact path="/"> 
         <Shop></Shop>
         </Route>
         <Route path="/product/:productKey">
           <ProductDetails></ProductDetails>
         </Route>
         <Route path="/*"> 
         <NotFound></NotFound>
         </Route>
        </Switch>
      </Router>
      </UserContext.Provider>
  );
}

export default App;
