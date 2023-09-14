import React from 'react';
import { Link } from 'react-router-dom';
import { logoutUser } from "../../store/actions/login";
import { useDispatch, useSelector } from 'react-redux';
import Avatar from 'react-avatar';

const VendorDropdown = () => {

    const dispatch = useDispatch();
    const data = useSelector((state) => state.USERPROFILE.userProfile)

    const logout = (event) => {
        event.preventDefault();
        dispatch(logoutUser())
    }

    return (
        <>

            <div className="">
                <div className="dropdown user-drop">
                    <button className="btn dropdown-toggle d-flex px-0 align-items-center" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <div className="img-user overflow-hidden rounded-circle mr-2">
                            <Avatar name={data.firstName + " " + data.lastName} size={50} round="20px" />
                            {/* <img className="img-fluid w-100" src={"/assets/images/icons/icon-user1.png"} alt="warehouse" /> */}
                        </div>
                        <div className="user-name d-none d-md-block">
                            {data !== undefined && data !== null ? (
                                data.firstName + " " + data.lastName
                            ) : null}
                        </div>
                    </button>
                    <div className="dropdown-menu menus" aria-labelledby="dropdownMenu1">
                        <Link className="dropdown-item py-2" to="/"><i className="fas fa-home"></i> Home</Link>
                        <Link className="dropdown-item active py-2" to="/vendor"><i className="fas fa-user"></i> Dashboard</Link>
                        {/* <Link className="dropdown-item py-2" to="/services"><i className="fas fa-suitcase"></i> Services</Link>
                        <Link className="dropdown-item py-2" to="/favorites"><i className="fas fa-heart"></i> My Favourites</Link> */}


                        {/* My Account */}
                     
                            {data?.userType?.type === "organization" ? (

                                <Link to="/vendor/myaccount" className="dropdown-item py-2">
                                    <i className={"fas fa-user-alt"}></i>
                                    My Account
                                </Link>
                            ) : null}

                            {data?.userType?.type === "consultant" ? (

                                <Link to="/vendor/myaccount-consultant" className="dropdown-item py-2">
                                    <i className={"fas fa-user-alt"}></i>
                                    My Account
                                </Link>

                            ) : null}


                            {data?.userType?.type === "individual" ? (
                                <Link to="/vendor/myaccount-individual" className="dropdown-item py-2">
                                    <i className={"fas fa-user-alt"}></i>
                                    My Account
                                </Link>)
                                :
                                null
                            }


                        <Link onClick={logout} className="dropdown-item text-danger d-flex align-items-center py-2" to="">
                            <button style={{
                                "all": "unset",
                                "cursor": "pointer"
                            }}
                            ><img className="size-15px img-fluid mr-2" src={"/assets/images/icons/logout-danger.png"} alt="warehouse" /> <span>Logout</span></button>
                        </Link>
                    </div>
                </div>
            </div>

        </>
    )
}

export default VendorDropdown
