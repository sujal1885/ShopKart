import React, { Fragment,useState,useEffect } from 'react'
import "./ResetPassword.css"
import { useParams,useNavigate,useLocation } from 'react-router-dom';
import { useDispatch, useSelector} from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import {useAlert} from "react-alert";
import Loader from "../layout/Loader/Loader";
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import MetaData from '../layout/MetaData';
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

const ResetPassword = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    let navigate = useNavigate();
    const location = useLocation();

    const params = useParams();

    const {error,success,loading} = useSelector((state) => state.forgotPassword);

    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();
  
        const myForm = new FormData();
  
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
  
        dispatch(resetPassword(params.token,myForm));
  
      }
  
  
      const redirect = location.search ? location.search.split("=")[1] : "/login";
  
      useEffect(() => {

        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (success) {
          alert.success("Password Updated Successfully");
          navigate(redirect);
        }
      }, [dispatch, error, alert, redirect,success]);

  return (
    <Fragment>
        {loading?<Loader/> : <Fragment>
        <MetaData title="Change Password" />
        <div className='resetPasswordContainer'> 
            <div className='resetPasswordBox'>
                <h2 className='resetPasswordHeading'>Update Profile</h2>
            <form
                    className="resetPasswordForm"
                    onSubmit={resetPasswordSubmit}
                >

                <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div>
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                
                <input type="submit" value="Update" className="resetPasswordBtn" />
                </form>
            </div>
        </div>
    </Fragment>}
    </Fragment>
  )
}

export default ResetPassword