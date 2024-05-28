import React,{Fragment} from 'react'
import { useSelector } from 'react-redux';
import {Navigate,Route,Routes,Outlet} from "react-router-dom";

const ProtectedRoute = ({isAdmin}) => {
  
    const {loading,isAuthenticated ,user} = useSelector((state) => state.user);

    console.log('isAdmin',isAdmin);

    return (
        <Fragment>
            {loading === false && (

                isAdmin === true && user.role !== "admin" ? 
                    <Navigate to="/login" /> : isAuthenticated === false ?<Navigate to="/login" /> : <Outlet />
            )}
        </Fragment>
    );
}

export default ProtectedRoute