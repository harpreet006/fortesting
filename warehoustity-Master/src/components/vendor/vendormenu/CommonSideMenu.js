import React, {useEffect} from 'react';
import './commonMenu.css';
import $ from 'jquery';
import {Link} from 'react-router-dom';
import {logoutUser} from "../../../store/actions/login"
import {useDispatch, useSelector} from 'react-redux';
import SidebarNew from './SidebarNew';


const CommonSideMenu = ({navData}) => {
  const dispatch = useDispatch();
  const data = useSelector((state)=>state.USERPROFILE.userProfile)

  const notification = window.location.pathname === "/vendor/notification" ? "active" : "";

    useEffect(()=>{

    $(".sidebar-dropdown > a").click(function() {
        $(".sidebar-submenu").slideUp(200);
        if (
          $(this)
            .parent()
            .hasClass("active")
        ) {
          $(".sidebar-dropdown").removeClass("active");
          $(this)
            .parent()
            .removeClass("active");
        } else {
          $(".sidebar-dropdown").removeClass("active");
          $(this)
            .next(".sidebar-submenu")
            .slideDown(200);
          $(this)
            .parent()
            .addClass("active");
        }
      });
      
      $("#close-sidebar").click(function() {
        $(".sidemenu-wrapper").removeClass("toggled");
      });
      $("#show-sidebar").click(function() {
        $(".sidemenu-wrapper").addClass("toggled");
      });
    
}, []);


    return (
      <div className="sidemenu-wrapper sidebar-theme toggled">
        <nav id="sidebar" className="sidebar-wrapper">
        <div className="sidebar-content">
          {/* <div className="sidebar-brand">
            <Link to="/vendor"><img src="/assets/images/logo.png" alt="logo" className="logo img-fluid"/></Link>
        
          </div> */}

          
          {/* <div className="sidebar-header">
            <div className="user-pic">
              <img className="img-responsive img-rounded" src="https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg" alt="vendor user" />
            </div>
            <div className="user-info">
              <span className="user-name mt-2 text-capitalize" style={{fontSize:'15px'}}>
                <strong>{data?.firstName + " " + data?.lastName}</strong>
              </span>
              <span className="user-role" style={{fontSize:'12px'}}>Vendor User</span>
           
            </div>
          </div> */}
        
          
          <div className="sidebar-menu">
            <ul>

{/* Dynamic menu  */}

    
           <SidebarNew items={navData} />
    
            

            {/* My Account */}
            <li>
            {data?.userType?.type === "organization" ? (
             
                <Link to="/vendor/myaccount" className="dropmenu">
                 <i className={notification === "active" ? "fas fa-user-alt iIcon select-iIcon" :"fas fa-user-alt iIcon"}></i>
                  <span>My Account</span>
                </Link>
            ):null}

            {data?.userType?.type === "consultant" ? (
             
             <Link to="/vendor/myaccount-consultant" className="dropmenu">
             <i className={notification === "active" ? "fas fa-user-alt iIcon select-iIcon" :"fas fa-user-alt iIcon"}></i>
              <span>My Account</span>
            </Link>
            
            ):null}


          {data?.userType?.type === "individual" ? (
              <Link to="/vendor/myaccount-individual" className="dropmenu">
                 <i className={notification === "active" ? "fas fa-user-alt iIcon select-iIcon" :"fas fa-user-alt iIcon"}></i>
                  <span>My Account</span>
                </Link>)
                :
               null
              }


              </li>

               {/* Logout */}
               <li onClick={()=>dispatch(logoutUser())}>
              <Link to="/" className="dropmenu">
                 <i className="fa fa-sign-out-alt iIcon"></i>
                  <span>Logout</span>
                </Link>
              </li>
            
            </ul>
          </div>
           {/* sidebar-menu   */}
        </div>
        
      </nav>
       </div>
    )
}

export default CommonSideMenu
