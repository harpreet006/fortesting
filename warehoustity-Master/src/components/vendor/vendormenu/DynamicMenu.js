import React, {useEffect} from 'react';
import './commonMenu.css';
import $ from 'jquery';
import {Link} from 'react-router-dom';
import {logoutUser} from "../../../store/actions/login"
import {useDispatch, useSelector} from 'react-redux';
import {onlyRead} from '../../../store/actions/sidemenuAction';

const CommonSideMenu = () => {
  const dispatch = useDispatch();
  const data = useSelector((state)=>state.USERPROFILE.userProfile)

  const dashboardActive = window.location.pathname === "/vendor" ? "active" : "";
  const listYourWarehouse = window.location.pathname === "/vendor/warehouse-list" ? "active" : "";
  const myWarehouse = window.location.pathname === "/vendor/mywarehouse" ? "active" : "";
  const myWarehouseRejected = window.location.pathname === "/vendor/mywarehouserejected" ? "active" : "";

  const booking = window.location.pathname === "/vendor/booking" ? "active" : "";
  // const service = window.location.pathname === "/vendor/service" ? "active" : "";
  const certificate = window.location.pathname === "/vendor/spacecertificate" ? "active" : "";
  const agreement = window.location.pathname === "/vendor/agreementpackage" ? "active" : "";
  const sow = window.location.pathname === "/vendor/sow" ? "active" : "";
  const sop = window.location.pathname === "/vendor/sop" ? "active" : "";
  const noc = window.location.pathname === "/vendor/noc" ? "active" : "";
  const other = window.location.pathname === "/vendor/other" ? "active" : "";
  const managesubuser = window.location.pathname === "/vendor/managesubuser" ? "active" : "";
  const managerole = window.location.pathname === "/vendor/managerole" ? "active" : "";
  const manageDepartment = window.location.pathname === "/vendor/department" ? "active" : "";
  const warehousemapping = window.location.pathname === "/vendor/warehousemapping" ? "active" : "";
  const gst = window.location.pathname === "/vendor/gst" ? "active" : "";
  const createnewenquiry = window.location.pathname === "/vendor/createnewenquiry" ? "active" : "";
  const manageenquiry = window.location.pathname === "/vendor/manageenquiry?page=1" ? "active" : "";
  // const createmis = window.location.pathname === "/vendor/createmis" ? "active" : "";
  const managemis = window.location.pathname === "/vendor/managemis" ? "active" : "";
  const notification = window.location.pathname === "/vendor/notification" ? "active" : "";
  const manageRfq = window.location.pathname === "/vendor/manage-rfq" ? "active" : "";
  const receiveRfq = window.location.pathname === "/vendor/receive-rfq" ? "active" : "";
  const openRfq = window.location.pathname === "/vendor/manage-open-rfq" ? "active" : "";
  const invoice = window.location.pathname === "/vendor/vendor-invoice" ? "active" : "";
  const invoiceCreate = window.location.pathname === "/vendor/create-invoice" ? "active" : "";
  const invoiceManage = window.location.pathname === "/vendor/manage-create-invoice" ? "active" : "";

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

useEffect(()=>{
  dispatch(onlyRead(false))
}, [dispatch])

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
        
          
          <div className="sidebar-menu custom-menu-vendor">
            <ul>
             
    {/* Dashboard Menu */}
    
              <li>
                <Link to="/vendor" className="dropmenu">
                  <i className={dashboardActive === "active" ? "fas fa-desktop iIcon select-iIcon" :"fas fa-desktop iIcon"}></i>
                  <span>Dashboard</span>
                  {/* <span className="badge badge-pill badge-primary">Beta</span> */}
                </Link>
              </li>
    
    
    {/* List Your Space menu */}
              <li className={`sidebar-dropdown ${listYourWarehouse === "active" || myWarehouse === "active" ? "active":""}`}>
                <a href="#drop" className="dropmenu">
                <i className="fas fa-warehouse iIcon"></i>
                  <span>List Your Space</span>
                  {/* <span className="badge badge-pill badge-warning">New</span> */}
                </a>
                <div className={`sidebar-submenu ${listYourWarehouse === "active" || myWarehouse === "active" ? "d-block" : ""}`}>
                  <ul>
                    <li>
                    <Link to="/vendor/warehouse-list"><i className={`fa fa-circle mr-1 ${listYourWarehouse === "active" ? "select-iIcon":""}`}></i> List Your Warehouse
                        {/* <span className="badge badge-pill badge-success">Pro</span> */}
                    </Link>
                    </li>

                    <li>
                      <Link to="/vendor/mywarehouse?page=1"> <i className={`fa fa-circle mr-1 ${myWarehouse === "active" ? "select-iIcon":""}`}></i> My Warehouse</Link>
                    </li>
                    <li>
                      <Link to="/vendor/mywarehouserejected?page=1"> <i className={`fa fa-circle mr-1 ${myWarehouseRejected === "active" ? "select-iIcon":""}`}></i> Rejected By WHS</Link>
                    </li>
                  </ul>
                </div>
              </li>
    

    {/* Bookin Menu */}
              <li>
              <Link to="/vendor/booking?page=1" className="dropmenu">
                  <i className={booking === "active" ? "fas fa-calendar-alt iIcon select-iIcon" :"fas fa-calendar-alt iIcon"}></i>
                  <span>Booking</span>
                </Link>
              </li>


    {/* My Services Menu */}
              {/* <li>
              <Link to="/vendor/service?page=1" className="dropmenu">
                  <i className={service === "active" ? "fas fa-suitcase iIcon select-iIcon" :"fas fa-suitcase iIcon"}></i>
                  <span>My Services</span>
                </Link>
              </li> */}
    
    
    {/* Documents Menu */}
              <li className={`sidebar-dropdown ${(certificate || agreement || sow || sop || noc || other) === "active" ? "active":""}`}>
                <a href="#drop" className="dropmenu">
                  <i className="fas fa-file-contract iIcon"></i>
                  <span>Documents</span>
                  {/* <span className="badge badge-pill badge-danger">3</span> */}
                </a>
                <div className={`sidebar-submenu ${(certificate || agreement || sow || sop || noc || other) === "active" ? "d-block" : ""}`}>
                  <ul>
                    <li>
                    <Link to="/vendor/spacecertificate">
                    <i className={`fa fa-circle mr-1 ${certificate === "active" ? "select-iIcon":""}`}></i> Space Certificate
                    </Link>
                    </li>

                    <li>
                    <Link to="/vendor/agreementpackage">
                    <i className={`fa fa-circle mr-1 ${agreement === "active" ? "select-iIcon":""}`}></i> Agreement Package 
                    </Link>
                    </li>

                    <li>
                    <Link to="/vendor/sow">
                    <i className={`fa fa-circle mr-1 ${sow === "active" ? "select-iIcon":""}`}></i> Sow 
                    </Link>
                    </li>

                    <li>
                    <Link to="/vendor/sop">
                    <i className={`fa fa-circle mr-1 ${sop === "active" ? "select-iIcon":""}`}></i> Sop 
                    </Link>
                    </li>

                    <li>
                    <Link to="/vendor/noc">
                    <i className={`fa fa-circle mr-1 ${noc === "active" ? "select-iIcon":""}`}></i> Noc 
                    </Link>
                    </li>

                    <li>
                    <Link to="/vendor/other">
                    <i className={`fa fa-circle mr-1 ${other === "active" ? "select-iIcon":""}`}></i> Other 
                    </Link>
                    </li>
                    
                  </ul>
                </div>
              </li>

{/* Sub User Menu */}
              <li className={`sidebar-dropdown ${(managesubuser || managerole || warehousemapping ) === "active" ? "active":""}`}>
                <a href="#drop" className="dropmenu">
                  <i className="fas fa-user-friends iIcon"></i>
                  <span>My User</span>
                  {/* <span className="badge badge-pill badge-danger">3</span> */}
                </a>
                <div className={`sidebar-submenu ${(managesubuser || manageDepartment || managerole || warehousemapping ) === "active" ? "d-block" : ""}`}>
                  <ul>
                    <li>
                    <Link to="/vendor/managesubuser?page=1">
                    <i className={`fa fa-circle mr-1 ${managesubuser === "active" ? "select-iIcon":""}`}></i> Manage Users 
                    </Link>
                    </li>

                    <li>
                    <Link to="/vendor/managerole">
                    <i className={`fa fa-circle mr-1 ${managerole === "active" ? "select-iIcon":""}`}></i> Manage Roles 
                    </Link>
                    </li>

                    <li>
                    <Link to="/vendor/department">
                    <i className={`fa fa-circle mr-1 ${manageDepartment === "active" ? "select-iIcon":""}`}></i> Manage Departments 
                    </Link>
                    </li>

                    <li>
                    <Link to="/vendor/warehousemapping">
                    <i className={`fa fa-circle mr-1 ${warehousemapping === "active" ? "select-iIcon":""}`}></i> Warehouse Mapping 
                    </Link>
                    </li>

                  </ul>
                </div>
              </li>

              {/* GST NUMBER */}
              <li>
              <Link to="/vendor/gst?page=1" className="dropmenu">
                  <i className={gst === "active" ? "fas fa-registered iIcon select-iIcon" :"fas fa-registered iIcon"}></i>
                  <span>GST No.</span>
                </Link>
              </li>


              {/* RFQ MANAGEMENT */}

              <li className={`sidebar-dropdown ${(manageRfq || receiveRfq )=== "active"}`}>
                <a href="#drop" className="dropmenu">
                  <i className="fas fa-file-signature iIcon"></i>
                  <span>RFQ Management</span>
                  {/* <span className="badge badge-pill badge-danger">3</span> */}
                </a>
                <div className={`sidebar-submenu ${(manageRfq || receiveRfq || openRfq) === "active" ? "d-block" : ""}`}>
                  <ul>
                    <li>
                      <Link to="/vendor/manage-rfq?page=1">
                      <i className={`fa fa-circle mr-1 ${manageRfq === "active" ? "select-iIcon":""}`}></i> Manage RFQ 
                      </Link>
                    </li>

                    {/* <li>
                      <Link to="/vendor/receive-rfq">
                      <i className={`fa fa-circle mr-1 ${receiveRfq === "active" ? "select-iIcon":""}`}></i> Received RFQ's 
                      </Link>
                    </li> */}

                    <li>
                      <Link to="/vendor/manage-open-rfq?page=1">
                      <i className={`fa fa-circle mr-1 ${openRfq === "active" ? "select-iIcon":""}`}></i> Open RFQ 
                      </Link>
                    </li>

                  </ul>
                </div>
              </li>

               {/* Invoice */}

               <li className={`sidebar-dropdown ${(manageRfq || receiveRfq )=== "active"}`}>
                <a href="#drop" className="dropmenu">
                  <i className="fas fa-file-signature iIcon"></i>
                  <span>Invoice Management</span>
                  {/* <span className="badge badge-pill badge-danger">3</span> */}
                </a>
                <div className={`sidebar-submenu ${(invoice || invoiceCreate || invoiceManage) === "active" ? "d-block" : ""}`}>
                  <ul>
                  <li>
              <Link to="/vendor/vendor-invoice" className="dropmenu">
                 <i className={invoice === "active" ? "fas fa-file-alt iIcon select-iIcon" :"fas fa-file-alt iIcon"}></i>
                  <span>Invoice Management</span>
                </Link>
              </li>

              <li>
              <Link to="/vendor/create-invoice" className="dropmenu">
                 <i className={invoiceCreate === "active" ? "fas fa-file-alt iIcon select-iIcon" :"fas fa-file-alt iIcon"}></i>
                  <span>Create Invoice</span>
                </Link>
              </li>

              {/* <li>
              <Link to="/vendor/manage-create-invoice" className="dropmenu">
                 <i className={invoiceManage === "active" ? "fas fa-file-alt iIcon select-iIcon" :"fas fa-file-alt iIcon"}></i>
                  <span>Manage Vendor Invoice</span>
                </Link>
              </li> */}

                  </ul>
                </div>
              </li>


              {/* Enquiry and Chat */}
              <li className={`sidebar-dropdown ${(createnewenquiry || manageenquiry ) === "active" ? "active":""}`}>
                <a href="#drop" className="dropmenu">
                  <i className="fas fa-sms iIcon"></i>
                  <span>Enquiry and Chat</span>
                  {/* <span className="badge badge-pill badge-danger">3</span> */}
                </a>
                <div className={`sidebar-submenu ${(createnewenquiry || manageenquiry ) === "active" ? "d-block" : ""}`}>
                  <ul>
                    <li>
                    <Link to="/vendor/createnewenquiry">
                    <i className={`fa fa-circle mr-1 ${createnewenquiry === "active" ? "select-iIcon":""}`}></i> Create New 
                    </Link>
                    </li>

                    <li>
                     <Link to="/vendor/manageenquiry?page=1">
                    <i className={`fa fa-circle mr-1 ${manageenquiry === "active" ? "select-iIcon":""}`}></i> Manage Enquiry 
                    </Link>
                    </li>
                    
                  </ul>
                </div>
              </li>

              {/* MIS */}


 
              {/* Notification */}
              <li>
              <Link to="/vendor/managemis" className="dropmenu">
                 <i className={managemis === "active" ? "fas fa-file-alt iIcon select-iIcon" :"fas fa-file-alt iIcon"}></i>
                  <span>Manage MIS</span>
                </Link>
              </li>
            


              {/* <li className={`sidebar-dropdown ${(createnewenquiry || managemis ) === "active" ? "active":""}`}>
                <a href="#drop" className="dropmenu">
                  <i className="fas fa-file-alt iIcon"></i>
                  <span>MIS</span>
                </a>
                <div className={`sidebar-submenu ${(createmis || managemis ) === "active" ? "d-block" : ""}`}>
                  <ul>
                  
                    <li>
                    <Link to="/vendor/managemis">
                    <i className={`fa fa-circle mr-1 ${managemis === "active" ? "select-iIcon":""}`}></i> Manage MIS 
                    </Link>
                    </li>
                   
                  </ul>
                </div>
              </li> */}
              
              {/* Notification */}
              <li>
              <Link to="/vendor/notification?page=1" className="dropmenu">
                 <i className={notification === "active" ? "fas fa-bell iIcon select-iIcon" :"fas fa-bell iIcon"}></i>
                  <span>Notification</span>
                </Link>
              </li>
            
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
