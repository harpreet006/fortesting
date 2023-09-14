import React from "react";
// import loadjs from 'loadjs';
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

const Menu = () => {
  const data = useSelector((state) => state.USERPROFILE.userProfile);
  // useEffect(() => {
  //   window.scrollTo("100px");
  // }, []);
  return (
    <div className="bg-lighter-primary sidebar-dashboard pl-0 menu-update rounded-0">
      <div className="menus">
        <div
          className="nav flex-column nav-pills pt-2 bg-transparent"
          id="sidebar-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <Link
            className={`nav-link ${
              window.location.pathname === "/dashboard" ? "active" : ""
            }`}
            to={"/dashboard"}
          >
            <i className="fas fa-desktop"></i> Dashboard
          </Link>

          <a
            className={`nav-link nav-drop ${
              window.location.pathname === "/waresheet" ||
              window.location.pathname === "/createnewwaresheet" ||
              window.location.pathname === "/managewaresheet"
                ? "active"
                : ""
            }`}
            data-toggle="collapse"
            href="#my-waresheet"
            role="button"
            aria-expanded="false"
            aria-controls="my-waresheet"
          >
            <i className="fas fa-user-friends"></i> My Waresheet
          </a>
          <div
            className={`collapse ${
              window.location.pathname === "/waresheet" ||
              window.location.pathname === "/createnewwaresheet" ||
              window.location.pathname === "/managewaresheet"
                ? "show"
                : ""
            }`}
            id="my-waresheet"
          >
            <div className="nav flex-column nav-pills">
              <Link
                className={`nav-link py-2 ${
                window.location.pathname === "/createnewwaresheet" ? "active" : ""
                }`}
                to={"/createnewwaresheet?page=1"}
              >
                Create New
              </Link>
              <Link
                className={`nav-link py-2 ${
                  window.location.pathname === "/waresheet"
                    ? "active"
                    : ""
                }`}
                to={"/waresheet?page=1"}
              >
                Manage Waresheet
              </Link>
            </div>
          </div>

          <Link
            className={`nav-link ${
              window.location.pathname === "/favorites" ? "active" : ""
            }`}
            to={"/favorites"}
          >
            <i className="fas fa-heart"></i> Favourites
          </Link>
          <Link
            className={`nav-link ${
              window.location.pathname === "/cart" ? "active" : ""
            }`}
            to={"/cart"}
          >
            <i className="fas fa-shopping-cart"></i> My Cart
          </Link>
          <Link
            className={`nav-link ${
              window.location.pathname === "/bookings" ? "active" : ""
            }`}
            to={"/bookings?page=1"}
          >
            <i className="fas fa-calendar-alt"></i> My Bookings
          </Link>

          <a
            className={`nav-link nav-drop ${
              window.location.pathname === "/managesubusers" ||
              window.location.pathname === "/add-sub-user" ||
              window.location.pathname === "/manageroles" ||
              window.location.pathname === "/warehousemapping"
                ? "active"
                : ""
            }`}
            data-toggle="collapse"
            href="#sub-users"
            role="button"
            aria-expanded="false"
            aria-controls="sub-users"
          >
            <i className="fas fa-user-friends"></i> Users
          </a>
          <div
            className={`collapse ${
              window.location.pathname === "/add-sub-user" ||
              window.location.pathname === "/managesubusers" ||
              window.location.pathname === "/manageroles" ||
              window.location.pathname === "/manage-customer-department" ||
              window.location.pathname === "/warehousemapping"
                ? "show"
                : ""
            }`}
            id="sub-users"
          >
            <div className="nav flex-column nav-pills">
              <Link
                className={`nav-link py-2 ${
                  window.location.pathname === "/add-sub-user" ? "active" : ""
                }`}
                to={"/add-sub-user"}
              >
                Create User
              </Link>
              <Link
                className={`nav-link py-2 ${
                  window.location.pathname === "/managesubusers" ? "active" : ""
                }`}
                to={"/managesubusers?page=1"}
              >
                Manage Users
              </Link>
              <Link
                className={`nav-link py-2 ${
                  window.location.pathname === "/manageroles" ? "active" : ""
                }`}
                to={"/manageroles"}
              >
                Manage Roles
              </Link>
              <Link
                className={`nav-link py-2 ${
                  window.location.pathname === "/manage-customer-department"
                    ? "active"
                    : ""
                }`}
                to={"/manage-customer-department"}
              >
                Manage Department
              </Link>
              <Link
                className={`nav-link py-2 ${
                  window.location.pathname === "/warehousemapping"
                    ? "active"
                    : ""
                }`}
                to={"/warehousemapping"}
              >
                Warehouse Mapping
              </Link>
            </div>
          </div>
          <a
            className={`nav-link nav-drop  ${
              window.location.pathname === "/spacecertificate" ||
              window.location.pathname === "/agreementpackage" ||
              window.location.pathname === "/sow" ||
              window.location.pathname === "/sop" ||
              window.location.pathname === "/noc" ||
              window.location.pathname === "/others"
                ? "active"
                : ""
            }`}
            data-toggle="collapse"
            href="#documents"
            role="button"
            aria-expanded="false"
            aria-controls="documents"
          >
            <i className="fas fa-file-contract"></i> Documents
          </a>
          <div
            className={`collapse ${
              window.location.pathname === "/spacecertificate" ||
              window.location.pathname === "/agreementpackage" ||
              window.location.pathname === "/sow" ||
              window.location.pathname === "/sop" ||
              window.location.pathname === "/noc" ||
              window.location.pathname === "/others"
                ? "show"
                : ""
            }`}
            id="documents"
          >
            <div className="nav flex-column nav-pills">
              <Link
                className={`nav-link py-2 ${
                  window.location.pathname === "/spacecertificate"
                    ? "active"
                    : ""
                }`}
                to={"/spacecertificate"}
              >
                Space Certificate
              </Link>
              <Link
                className={`nav-link py-2 ${
                  window.location.pathname === "/agreementpackage"
                    ? "active"
                    : ""
                }`}
                to={"/agreementpackage"}
              >
                Agreement Package
              </Link>
              <Link
                className={`nav-link py-2 ${
                  window.location.pathname === "/sow" ? "active" : ""
                }`}
                to={"/sow"}
              >
                Sow
              </Link>
              <Link
                className={`nav-link py-2 ${
                  window.location.pathname === "/sop" ? "active" : ""
                }`}
                to={"/sop"}
              >
                Sop
              </Link>
              <Link
                className={`nav-link py-2 ${
                  window.location.pathname === "/noc" ? "active" : ""
                }`}
                to={"/noc"}
              >
                Noc
              </Link>
              <Link
                className={`nav-link py-2 ${
                  window.location.pathname === "/others" ? "active" : ""
                }`}
                to={"/others"}
              >
                Others
              </Link>
            </div>
          </div>

          <Link
            className={`nav-link ${
              window.location.pathname === "/gst" ? "active" : ""
            }`}
            to={"/gst?page=1"}
          >
            <i className="fas fa-registered"></i> GST No
          </Link>

          <a
            className={`nav-link nav-drop  ${
              window.location.pathname === "/services-favorite" ||
              window.location.pathname === "/services" ? "active" : ""
            }`}
            data-toggle="collapse"
            href="#services"
            role="button"
            aria-expanded="false"
            aria-controls="services"
          >
            <i className="fas fa-file-contract"></i> My Services
          </a>
          <div
            className={`collapse ${
              window.location.pathname === "/services" ||
              window.location.pathname === "/services-favorite" ||
              window.location.pathname === "/services"
                ? "show"
                : ""
            }`}
            id="services"
          >
            <div className="nav flex-column nav-pills">
              <Link
                className={`nav-link ${
                  window.location.pathname === "/services-favorite"
                    ? "active"
                    : ""
                }`}
                to={"/services-favorite?page=1"}
              >
                <i className="fas fa-suitcase"></i>MY Favorite Services
              </Link>

              <Link
                className={`nav-link ${
                  window.location.pathname === "/services"
                    ? "active"
                    : ""
                }`}
                to={"/services?page=1"}
              >
                <i className="fas fa-suitcase"></i>My Booked Services
              </Link>

              {/* <Link
                className={`nav-link ${
                  window.location.pathname === "/services"
                    ? "active"
                    : ""
                }`}
                to={"/services?page=1"}
              >
                <i className="fas fa-suitcase"></i>All Services
              </Link> */}
            </div>
          </div>

          {/* <a
            className={`nav-link nav-drop`}
            data-toggle="collapse"
            href="#Help"
            role="button"
            aria-expanded="false"
            aria-controls="Help"
          >
            <i className="fas fa-file-contract"></i> Help & Support
          </a>
          <div className={`collapse`} id="Help">
            <div className="nav flex-column nav-pills">
              <Link
                className={`nav-link ${
                  window.location.pathname === "/frequently-ask-question"
                    ? "active"
                    : ""
                }`}
                to={"/frequently-ask-question"}
              >
                <i className="fas fa-suitcase"></i>FAQs
              </Link>
              <Link
                className={`nav-link ${
                  window.location.pathname === "/" ? "active" : ""
                }`}
                to={""}
              >
                <i className="fas fa-suitcase"></i>Help Bots
              </Link>
              <Link
                className={`nav-link ${
                  window.location.pathname === "/" ? "active" : ""
                }`}
                to={""}
              >
                <i className="fas fa-suitcase"></i>Submit Query/Complaints
              </Link>
              <Link
                className={`nav-link ${
                  window.location.pathname === "/" ? "active" : ""
                }`}
                to={""}
              >
                <i className="fas fa-suitcase"></i>Request Callback
              </Link>
            </div>
          </div> */}

          {/* <a className={`nav-link nav-drop ${
            (window.location.pathname === "/manageroles") ||
            (window.location.pathname === "/warehousemapping") ? 'active' : ''}`}
            data-toggle="collapse" href="#accountSetup" role="button" aria-expanded="false" aria-controls="accountSetup">
            <i className="fas fa-user-friends"></i> My Account Setup
          </a>
          <div className={`collapse ${
            (window.location.pathname === "/manageroles") || window.location.pathname === "/manage-customer-department" ||
            (window.location.pathname === "/warehousemapping") ? 'show' : ''}`} id="sub-users">
            <div className="nav flex-column nav-pills">
              <Link className={`nav-link py-2 ${window.location.pathname === "/managesubusers" ? 'active' : ''}`} to={"/managesubusers"}>Manage Users</Link>
              <Link className={`nav-link py-2 ${window.location.pathname === "/manageroles" ? 'active' : ''}`} to={"/manageroles"}>Manage Roles</Link>
              <Link className={`nav-link py-2 ${window.location.pathname === "/manage-customer-department" ? 'active' : ''}`} to={"/manage-customer-department"}>Manage Department</Link>
             
            </div>
          </div> */}

          {/* <a
            className={`nav-link nav-drop  ${
              window.location.pathname === "/" ? "active" : ""
            }`}
            data-toggle="collapse"
            href="#Warehousity"
            role="button"
            aria-expanded="false"
            aria-controls="Warehousity"
          >
            <i className="fas fa-file-contract"></i> About Warehousity
          </a>
          <div className={`collapse`} id="Warehousity">
            <div className="nav flex-column nav-pills">
              <Link
                className={`nav-link ${
                  window.location.pathname === "/" ? "active" : ""
                }`}
                to={"/"}
              >
                <i className="fas fa-suitcase"></i>Home Page
              </Link>
              <Link
                className={`nav-link ${
                  window.location.pathname === "/" ? "active" : ""
                }`}
                to={"/"}
              >
                <i className="fas fa-suitcase"></i>Key Contacts
              </Link>
              <Link
                className={`nav-link ${
                  window.location.pathname === "/" ? "active" : ""
                }`}
                to={"/"}
              >
                <i className="fas fa-suitcase"></i>Search Warehouses
              </Link>
              <Link
                className={`nav-link ${
                  window.location.pathname === "/" ? "active" : ""
                }`}
                to={"/"}
              >
                <i className="fas fa-suitcase"></i>Rate Us
              </Link>
              <Link
                className={`nav-link ${
                  window.location.pathname === "/" ? "active" : ""
                }`}
                to={"/"}
              >
                <i className="fas fa-suitcase"></i>Add Infra
              </Link>
              <Link
                className={`nav-link ${
                  window.location.pathname === "/" ? "active" : ""
                }`}
                to={"/"}
              >
                <i className="fas fa-suitcase"></i>Refer And Earn
              </Link>
              <Link
                className={`nav-link ${
                  window.location.pathname === "/" ? "active" : ""
                }`}
                to={"/"}
              >
                <i className="fas fa-suitcase"></i>Tools
              </Link>
              <Link
                className={`nav-link ${
                  window.location.pathname === "/" ? "active" : ""
                }`}
                to={"/"}
              >
                <i className="fas fa-suitcase"></i>Insigts
              </Link>
            </div>
          </div> */}

          <Link
            className={`nav-link ${
              window.location.pathname === "/mywarehouse" ? "active" : ""
            }`}
            to={"/mywarehouse?page=1"}
          >
            <i className="fas fa-warehouse"></i>My Warehouse
          </Link>

          <a
            className={`nav-link nav-drop ${
              window.location.pathname === "/createnewrfq" ||
              window.location.pathname === "/managerfq"
                ? "active"
                : ""
            }`}
            data-toggle="collapse"
            href="#rfq"
            role="button"
            aria-expanded="false"
            aria-controls="rfq"
          >
            <i className="fas fa-user-friends"></i> RFQ
          </a>
          <div
            className={`collapse ${
              window.location.pathname === "/createnewrfq" ||
              window.location.pathname === "/managerfq"
                ? "show"
                : ""
            }`}
            id="rfq"
          >
            <div className="nav flex-column nav-pills">
              {/* <Link onClick={()=>{
                          dispatch({payload:{}, type:"INITIAL_EMPTY"})
                          dispatch({payload:null, type:"CART_FAVORITE"})
                          dispatch({payload:[], type:"WAREHOUSE_LIST"})}
                          } className={`nav-link py-2 ${window.location.pathname === "/createnewrfq" ? 'active': ''}`} to={"/createnewrfq"}> Create New</Link> */}

              <Link
                className={`nav-link py-2 ${
                  window.location.pathname === "/managerfq" ? "active" : ""
                }`}
                to={`/managerfq?page=1`}
              >
                Manage RFQ
              </Link>
            </div>
          </div>

          <Link
            className={`nav-link ${
              window.location.pathname?.includes("/manageenquiry")
                ? "active"
                : ""
            }`}
            to={"/manageenquiry?page=1"}
          >
            <i className="fas fa-file-contract"></i> Enquiry Management
          </Link>

          {/* <a
            className={`nav-link nav-drop  ${
              window.location.pathname === "/createnewenquiry" ||
              window.location.pathname === "/manageenquiry"
                ? "active"
                : ""
            }`}
            data-toggle="collapse"
            href="#enquiry"
            role="button"
            aria-expanded="false"
            aria-controls="enquiry"
          >
            <i className="fas fa-file-contract"></i> Enquiry
          </a>
          <div
            className={`collapse ${
              window.location.pathname === "/createnewenquiry" ||
              window.location.pathname === "/manageenquiry"
                ? "show"
                : ""
            }`}
            id="enquiry"
          >
            <div className="nav flex-column nav-pills">
              <Link
                className={`nav-link py-2 ${
                  window.location.pathname === "/createnewenquiry"
                    ? "active"
                    : ""
                }`}
                to={"/createnewenquiry"}
              >
                {" "}
                Create New
              </Link>
              <Link
                className={`nav-link py-2 ${
                  window.location.pathname === "/manageenquiry" ? "active" : ""
                }`}
                to={"/manageenquiry?page=1"}
              >
                Manage Enquiry
              </Link>
            </div>
          </div> */}

          {/* <Link
            className={`nav-link ${
              window.location.pathname === "/mis" ? "active" : ""
            }`}
            to={"/mis"}
          >
            <i className="fas fa-desktop"></i>MIS
          </Link> */}

          {/* Feedback management */}
          <Link
            className={`nav-link ${
              window.location.pathname?.includes("/feedback") ? "active" : ""
            }`}
            to={"/wh-feedback?page=1"}
          >
            <i className="fas fa-file-contract"></i> Feedback Management
          </Link>

          {/* Invoice anagement */}
          <Link
            className={`nav-link ${
              window.location.pathname === "/invoice" ? "active" : ""
            }`}
            to={"/invoice?page=1"}
          >
            <i className="fas fa-file-invoice"></i>Invoice Management
          </Link>

          <Link 
          className={`nav-link ${
            window.location.pathname === "/notification" ? "active" : ""
          }`}
          to={"/notification?page=1"}>
            <i className="fas fa-bell"></i>Notification
          </Link>
          {/* <Link className="nav-link" to="#"><i className="fas fa-comments"></i>Enquiry/RFQ</Link> */}
          {/* <Link className="nav-link" to={"/keycontact"}>
            <i className="fas fa-address-book"></i>Key Warehousity Contact
          </Link> */}

          {data?.userType?.type === "organization" ? (
            <Link 
            className={`nav-link ${
              window.location.pathname === "/myaccount" ? "active" : ""
            }`}
            to={"/myaccount"}>
              <i className="fas fa-user-alt"></i>My Account
            </Link>
          ) : null}

          {data?.userType?.type === "individual" ? (
            <Link 
            className={`nav-link ${
              window.location.pathname === "/individual" ? "active" : ""
            }`}
            to={"/individual"}>
              <i className="fas fa-user-alt"></i>My Account
            </Link>
          ) : null}

          {data?.userType?.type === "consultant" ? (
            <Link
            className={`nav-link ${
              window.location.pathname === "/consult-account" ? "active" : ""
            }`}
            to={"/consult-account"}>
              <i className="fas fa-user-alt"></i>My Account
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Menu;
