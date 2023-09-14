import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signUpPopup } from "../../store/actions/commanAction";

const Footer = (props) => {
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state);

  return (
    <footer className="pt-4">
      <div className="container-fluid px-md-5">
        <div className="row">
          <div className="col-lg-auto col-sm-6 pb-3 pb-md-0">
            {/* <Link className="d-block mb-3" to={"/"} style={{ width: "153px" }}>
              <img
                src={"/assets/images/logo.png"}
                alt="logo"
                className="img-fluid w-100"
              />
            </Link> */}
            
              <h6 className="mb-3 text-uppercase footer-heading">
                CORPORATE OFFICE
              </h6>
              <h6 className="mt-3 text-white">
                <i className="fas fa-home "></i> <span className="text-white pl-0 fs-15px pt-0 pl-0">
                New Delhi, India</span> 
              </h6>
              <h6 className=" text-white">
               <a href="mailto:sales@warehousity.com" className="nav-link text-white pl-0 fs-15px py-0">
               <i className="fas fa-envelope-square mr-2"></i>{" "}
                sales@warehousity.com
               </a>
              </h6>
              <h6 className="text-white">
                {" "}
               <a href="tel:+91-7677180180" className="nav-link text-white pl-0 fs-15px pt-0">
                 <i className="fas fa-phone mr-2"></i> 
                +91-7677180180{" "}</a>
              </h6>
              <div className="social-icons bg-socials row align-items-center col-auto">
              
              <div className="col px-1">
                <a
                  href="https://www.facebook.com/Warehousity/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="facebook d-flex align-items-center justify-content-center"
                >
                  {/* <Link to="#"  className="facebook d-flex align-items-center justify-content-center"> */}
                  <i className="fab fa-facebook-f"></i>
                  {/* </Link> */}
                </a>
              </div>
              <div className="col px-1">
                <a
                  href="https://twitter.com/warehousity/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="twitter d-flex align-items-center justify-content-center"
                >
                  {/* <Link to=""  className="twitter d-flex align-items-center justify-content-center"> */}
                  <i className="fab fa-twitter"></i>
                  {/* </Link> */}
                </a>
              </div>
              <div className="col px-1">
                <a
                  href="https://www.instagram.com/warehousity/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="instagram d-flex align-items-center justify-content-center"
                >
                  {/* <Link to="#" target="_blank" className="instagram d-flex align-items-center justify-content-center"> */}
                  <i className="fab fa-instagram"></i>
                  {/* </Link> */}
                </a>
              </div>
              <div className="col px-1">
                <a
                  href="https://www.linkedin.com/company/warehousity/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="twitter d-flex align-items-center justify-content-center"
                >
                  {/* <Link to="#"  className="linkedin d-flex align-items-center justify-content-center"> */}
                  <i className="fab fa-linkedin"></i>
                  {/* </Link> */}
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg col-sm-6 pb-1">
            <h6 className="pl-3 mb-3 text-uppercase footer-heading">
              Information
            </h6>
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link className="d-inline-block nav-link text-white" to={"/about"}>
                  About Us
                </Link>
              </li>

              <li className="nav-item">
                <Link className="d-inline-block nav-link text-white" to="/contactUs">
                  Contact Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="d-inline-block nav-link text-white" to="/">
                  Our Team
                </Link>
              </li>
              {/* {!authenticated ? (
                <li className="nav-item">
                  <span
                    onClick={() => dispatch(signUpPopup(2))}
                    className="nav-link text-white cursorPointer"
                  >
                    New User
                  </span>
                </li>
              ) : null} */}
            </ul>
          </div>

          <div className="col-lg col-sm-6 pb-1">
            <h6 className="pl-3 mb-3 text-uppercase footer-heading">
              Important links
            </h6>
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link className="d-inline-block nav-link text-white" to="/privacy">
                  Privacy Policy
                </Link>
              </li>

              {/* <li className="nav-item">
                <Link className="nav-link text-white" to="/explore-network">
                  Explore Network
                </Link>
              </li> */}
            </ul>
          </div>

          <div className="col-lg col-sm-6 pb-1">
            <h6 className="pl-3 mb-3 text-uppercase footer-heading">
              Important links
            </h6>
            <ul className="nav flex-column">
              {!authenticated ? (
                <li className="nav-item">
                  <span
                    onClick={() => dispatch(signUpPopup(3))}
                    className="d-inline-block nav-link text-white cursorPointer"
                  >
                    List a Warehouse
                  </span>
                </li>
              ) : null}

              <li className="nav-item">
                <Link className="d-inline-block nav-link text-white" to="/testimonial">
                  Testimonial
                </Link>
              </li>

              {/* <li className="nav-item">
                <Link className="nav-link text-white" to="/support">
                  Support
                </Link>
              </li> */}

              <li className="nav-item">
                <Link
                  className="d-inline-block nav-link text-white"
                  to="/terms-and-conditions"
                >
                  Terms & Condition
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-lg col-sm-6 pb-1">
            <h6 className="pl-3 mb-3 text-uppercase footer-heading">
              Need Help?
            </h6>
            <ul className="nav flex-column">
              {localStorage.getItem("accesstoken") !== null &&
              localStorage.getItem("accesstoken") !== undefined ? (
                <li className="nav-item">
                  <Link
                    className="d-inline-block nav-link text-white"
                    to="/frequently-ask-question"
                  >
                    FAQs
                  </Link>
                </li>
              ) : null}
              <li className="nav-item">
                <Link className="d-inline-block nav-link text-white" to="/feedback">
                  Feedback
                </Link>
              </li>

              <li className="nav-item">
                <Link className="d-inline-block nav-link text-white" to="/">
                  Careers
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link text-white" to="/tutorials">
                  Tutorials
                </Link>
              </li> */}
             
            </ul>
          </div>
        
        </div>
        <div className="row no-gutters justify-content-between align-items-center pt-1 mx-0">
          <div className="col-12">
          <div className="order-md-1 py-2 ">
            <p className="mb-0 text-white text-center">
              <span className=" mr-1">
                © 2022 All rights reserved | Site maintained by
              </span>{" "}
              <Link className="text-white" to="#">
                Escale Solutions
              </Link>
            </p>
          </div>
          </div>
          
         
        </div>
      </div>
    </footer>
  );
};

export default Footer;
