import './App.css';
import Header from "./component/layout/Header/Header.js"
import Footer from "./component/layout/Footer/Footer.js"
import Home from './component/Home/Home.js'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import WebFont from "webfontloader";
import React from 'react';
import ProductDetails from "./component/Product/ProductDetails.js"
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js"
import LoginSignUp from './component/User/LoginSignUp.js';
import store from "./store"
import { loadUser } from './actions/userAction.js';
import UserOptions from "./component/layout/Header/UserOptions.js"
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile.js"
import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Payment from "./component/Cart/Payment.js"
import axios from 'axios';
import { useState } from 'react';
import {Elements} from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";

function App() {

  const {isAuthenticated,user} = useSelector(state => state.user);

  const [stripeApiKey,setStripeApiKey] = useState("");

  async function getStripeApiKey(){
    const {data} = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  React.useEffect(()=>{

    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    });

    store.dispatch(loadUser());
    getStripeApiKey();
  
  },[]);
  return (
    <Router>
     <Header />
     {isAuthenticated && <UserOptions user={user} />}
     <Elements stripe={loadStripe(stripeApiKey)}>
     <Routes>
       <Route exact path='/' element={<Home/>} />
       <Route exact path='/product/:id' element={<ProductDetails/>} />
       <Route exact path='/products' element={<Products/>} />
       <Route path='/products/:keyword' element={<Products/>} />
       <Route exact path='/search' element={<Search/>} />

       <Route exact path="/login" element={<LoginSignUp />}/>

       <Route path="/account" element={<ProtectedRoute />}>
        <Route path="/account" element={<Profile />} />
      </Route>

      <Route path="/me/update" element={<ProtectedRoute />}>
        <Route path="/me/update" element={<UpdateProfile />} />
      </Route>

      <Route path="/password/update" element={<ProtectedRoute />}>
        <Route path="/password/update" element={<UpdatePassword />} />
      </Route>

        <Route path="/password/forgot" element={<ForgotPassword />} />

        <Route path="/password/reset/:token" element={<ResetPassword />} />

        <Route exact path="/cart" element={<Cart/>} />

        <Route path="/shipping" element={<ProtectedRoute />}>
        <Route path="/shipping" element={<Shipping />} />
      </Route>

      
      <Route path="/process/payment" element={<ProtectedRoute />}>
        <Route path="/process/payment" element={<Payment />} />
      </Route>

      <Route path="/success" element={<ProtectedRoute />}>
        <Route path="/success" element={<OrderSuccess />} />
      </Route>

      <Route path="/orders" element={<ProtectedRoute />}>
        <Route path="/orders" element={<MyOrders />} />
      </Route>

      <Route path="/order/confirm" element={<ProtectedRoute />}>
        <Route path="/order/confirm" element={<ConfirmOrder />} />
      </Route>

     <Route path="/order/:id" element={<ProtectedRoute />}>
        <Route path="/order/:id" element={<OrderDetails />} />
      </Route>

      
     

     </Routes>
     </Elements>
     <Footer />
    </Router>
  );
}

export default App;
