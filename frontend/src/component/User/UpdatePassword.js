import React, { Fragment,useState,useEffect } from 'react'
import "./UpdatePassword.css"
import { useParams,useNavigate,useLocation } from 'react-router-dom';
import { useDispatch, useSelector} from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
import {useAlert} from "react-alert";
import Loader from "../layout/Loader/Loader";
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import MetaData from '../layout/MetaData';
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

const UpdatePassword = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    let navigate = useNavigate();
    const location = useLocation();

    // const params = useParams();

    const {error,isUpdated,loading} = useSelector((state) => state.profile);

    const [oldPassword,setOldPassword] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

    const updatePasswordSubmit = (e) => {
        e.preventDefault();
  
        const myForm = new FormData();
  
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
  
        dispatch(updatePassword(myForm));
  
      }
  
  
      const redirect = location.search ? location.search.split("=")[1] : "/account";
  
      useEffect(() => {

        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (isUpdated) {
          alert.success("Profile Updated Successfully");
          navigate(redirect);
          dispatch({
            type:UPDATE_PASSWORD_RESET,
          });
        }
      }, [dispatch, error, alert, redirect,isUpdated]);

  return (
    <Fragment>
        {loading?<Loader/> : <Fragment>
        <MetaData title="Change Password" />
        <div className='updatePasswordContainer'> 
            <div className='updatePasswordBox'>
                <h2 className='updatePasswordHeading'>Update Profile</h2>
            <form
                    className="updatePasswordForm"
                    onSubmit={updatePasswordSubmit}
                >
                  
                  <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder=" OldPassword"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder=" New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                
                <input type="submit" value="Change" className="updatePasswordBtn" />
                </form>
            </div>
        </div>
    </Fragment>}
    </Fragment>
  )
}

export default UpdatePassword