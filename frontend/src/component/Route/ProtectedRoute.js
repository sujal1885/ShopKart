import React,{Fragment} from 'react'
import { useSelector } from 'react-redux';
import {Navigate,Route,Routes,Outlet} from "react-router-dom";

const ProtectedRoute = () => {
  
    const {loading,isAuthenticated } = useSelector((state) => state.user);

    return isAuthenticated ===true? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute