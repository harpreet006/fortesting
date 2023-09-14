import React, { useRef, useState, useEffect } from "react";
import {
  register,
  successData,
  errorData,
  otpConfirm,
  registerMobileNumber,
} from "../../store/actions/register";
import { userLogin, isLogPending } from "../../store/actions/login";
import { signUpPopup } from "../../store/actions/commanAction";
import { connect } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { useClickAway } from "react-use";
import { FaTimes } from "react-icons/fa";
import HeaderDrawer from "./HeaderDrawer";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../user/LoginForm";
import StaticContent from "../user/StaticContent";
import OtpVerify from "../user/OtpVerify";
import UserDropdown from "../user/UserDropdown";
import Spinner from "react-bootstrap/Spinner";
import { errorMessage } from "../../store/actions/utils";
import TermAndCondition from "../../pages/TermAndCondition";
import {
  onlyAlphaNumericSpaceAllow,
  onlyLetterAllow,
  onlyNumberAllow,
} from "../../components/validation";
// import $ from "jquery";
import { getAllCart } from "../../store/actions/customer/cartAction";
import VendorDropdown from "../user/VendorDropdown";
import pinCodeList from "../../json/pincode.json";
import InsightsDropdown from "../user/InsightsDropdown";
import ServiceDropdown from "../user/ServiceDropdown";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(1, "Too Short!")
    .max(50, "Too Long!")
    .required("First Name is required"),
  lastName: Yup.string()
    .min(1, "Too Short!")
    .max(50, "Too Long!")
    .required("Last Name is required"),
  phone: Yup.string()
    .required("Phone is required")
    .matches(new RegExp("[0-9]{10}"), "number must be 10 digit"),
  email: Yup.string().email("Email is invalid").required("Email is required"),
  pinCode: Yup.string()
    .required("Pincode is required")
    .matches(new RegExp("[0-9]{6}"), "Pincode must be 6 digit"),
  password: Yup.string()
    .required("Please Enter your password")
    .min(6, "Password is greater then 6 character"),
  confirmedPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  companyName: Yup.string()
    .required("Company Name is required")
    .min(3, "Too Short!")
    .max(50, "Too Long!"),
});

const Header = () => {
  const [verifyOtpModal, setverifyOtpModal] = useState(false);
  const [signUpContentModal, setsignUpContentModal] = useState(false);
  const [signInModal, setsignInModal] = useState(false);
  const [signUpModal, setsignUpModal] = useState(false);
  const [successModal, setsuccessModal] = useState(false);
  const [spaceToggle, setspaceToggle] = useState(false);
  const [accountType, setAccountType] = useState(null);
  const [userType, setUserType] = useState(2);
  const [mobileNumber, setMobileNumber] = useState("");
  const [checkTerm, setCheckTerm] = useState(false);
  const [checkError, setCheckError] = useState(null);
  const [accountTypeError, setAccountTypeError] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [signUpTrue, setSignUpTrue] = useState(true);
  const dispatch = useDispatch();

  const { authenticated, vendorAuthenticated, ERRORDATA } = useSelector(
    (state) => state
  );
  const state = useSelector((state) => state);
  const ref = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useClickAway(ref, () => {
    setMenuOpen(false);
  });

  useEffect(() => {
    if(authenticated){
      dispatch(getAllCart());
    }
  }, [dispatch, authenticated]);

  // Close Signup Modal
  const signUpContentModalClose = () => {
    dispatch(signUpPopup(null));
    setSignUpTrue(true);
    setsignUpContentModal(!signUpContentModal);
    setspaceToggle(!spaceToggle);
  };

  // Open Signup Modal and update state from redux
  if (state.COMMAN_INFO.isSignUpPopup !== null && signUpTrue) {
    setsignUpContentModal(!signUpContentModal);
    setspaceToggle(!spaceToggle);
    setUserType(state.COMMAN_INFO.isSignUpPopup);
    setSignUpTrue(false);
  }

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  useEffect(() => {
    if (state.SUCCESSDATA === true) {
      dispatch(successData(false));
      setsignUpContentModal(!state.SUCCESSDATA);
    }
  }, [state.SUCCESSDATA, dispatch]);

  // useEffect(() => {
  //   function m() {
  //     $(window).on("scroll", function () {
  //       var lastScrollTop = "";
  //       function stickyMenu() {
  //         var st = $(window).scrollTop();
  //         var mainMenuBottom = $("#top-header");
  //         if ($(window).scrollTop() > 10) {
  //           if (st > lastScrollTop) {
  //             //to hide sticky menu on scroll down addClass replace to removeclass
  //             // mainMenuBottom.addClass("sticky-start");
  //           } else {
  //             // active sticky menu on scroll up
  //             // mainMenuBottom.removeClass("sticky-start");
  //           }
  //         } else {
  //           mainMenuBottom.removeClass("sticky-start");
  //         }
  //         if ($(window).scrollTop() > 30) {
  //           if (st > lastScrollTop) {
  //             //to hide sticky menu on scroll down addClass replace to removeclass
  //             mainMenuBottom.addClass("shadow sticky-on");
  //             // $('#scroll-to-top').removeClass("hide");
  //           } else {
  //             // active sticky menu on scroll up
  //             mainMenuBottom.removeClass("shadow sticky-on");
  //             // $('#scroll-to-top').addClass("hide");
  //           }
  //         } else {
  //           mainMenuBottom.removeClass("shadow sticky-on");
  //           // $('#scroll-to-top').addClass("hide");
  //         }

  //         lastScrollTop = st;
  //       }
  //       stickyMenu();
  //     });
  //   }

  //   m();
  // }, []);

  useEffect(() => {
    dispatch(isLogPending(false));
  }, [dispatch]);

  const confirmOtpVerify = () => {
    dispatch(signUpPopup(null));
    setSignUpTrue(true);
    dispatch(otpConfirm(false));
  };

  function pinCodeChange(pin) {
    // 233227
    // console.log('pin--', pin)
    let pinCodeObject = pinCodeList.filter(
      (v) => parseInt(v.pincode) === parseInt(pin)
    );
    if (pinCodeObject.length > 0) {
      return pinCodeObject[0];
    } else {
      return null;
    }
  }

 const serviceUrl = window.location.pathname 

 
  return (
    <div>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <TermAndCondition
            setCheckTerm={setCheckTerm}
            setModalShow={setModalShow}
          />
        </Modal.Body>
      </Modal>

      <Modal
        show={state.otpVerified.confirm}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body style={{ textAlign: "center" }}>
          <i className="fas fa-check h1 text-success"></i>
          {/* <img  src={"/assets/images/success.png"} className="size-150px p-4 mx-auto" alt="success"/> */}
          <h6>OTP Verified Successful</h6>
          <Button onClick={confirmOtpVerify} className="my-3">
            Close
          </Button>
        </Modal.Body>
      </Modal>

      {/* <header className="site-header sticky-on"> */}
      <header className="sticky-onNew">
        <nav
          className="navbar py-0 px-sm-3 pr-0 pl-0 navbar-light"
          id="navbar-example2"
        >
          <a className="navbar-brand py-3 pl-3" href="/">
            <img
              src={"/assets/images/new-logo.png"}
              alt="logo"
              className="logo img-fluid bg-white px-2"
              style={{
                width: "170px",
                height: "49px",
                objectFit: "contain",
              }}
            />
          </a>

          <div
            ref={ref}
            className={
              !menuOpen
                ? "navbar-collapse offcanvas-collapse"
                : "navbar-collapse offcanvas-collapse open"
            }
          >
            <span
              style={{
                float: "right",
                color: "#ffffff",
                fontSize: "30px",
                marginRight: "20px",
                cursor: "pointer",
              }}
              onClick={() => setMenuOpen(false)}
            >
              <FaTimes />
            </span>
            <HeaderDrawer
              setsignUpContentModal={setsignUpContentModal}
              signUpContentModal={signUpContentModal}
              setspaceToggle={setspaceToggle}
              spaceToggle={spaceToggle}
              signInModal={signInModal}
              setsignInModal={setsignInModal}
              signUpModal={signUpModal}
              setsignUpModal={setsignUpModal}
              setUserType={setUserType}
            />
          </div>

          <div className="nav-btns nav-item d-flex align-items-center ml-auto">
            {/* Without Auth */}

            <div className="d-none d-md-block">
              <Link className="btn px-3 px-lg-4 active" to="/about">
                <span className={`${
              window.location.pathname === "/about" ? "active" : ""
            }`}>ABOUT US</span>
              </Link>
            </div>

            {/* <div className="d-none d-md-block">
                <button
                  className="btn px-3 px-lg-4"
                  onClick={() => {
                    setsignUpContentModal(!signUpContentModal);
                    setspaceToggle(!spaceToggle);
                    setUserType(3);
                  }}
                >
                  <span className="">SERVICES</span>
                </button>
              </div> */}
            <div className="d-none d-md-block">
              <ServiceDropdown 
                service={serviceUrl}
              />
            </div>

            {/* <div className="d-none d-md-block">
                <Link
                  className="btn px-3 px-lg-4"
                  to="/insights"
                >
                  <span className="">INSIGHTS</span>
                </Link>
              </div> */}
            <div className="d-none d-md-block">
              <InsightsDropdown
               service={serviceUrl}
              />
            </div>

            <div className="d-none d-md-block">
              <Link className="btn px-3 px-lg-4" to="/contactUs">
                <span className={`${
              window.location.pathname === "/contactUs" ? "active" : ""
            }`}>CONTACT US</span>
              </Link>
            </div>

            {!authenticated && !vendorAuthenticated && (
              <div className="d-none d-md-block">
                <button
                  className="btn px-2"
                  onClick={() => {
                    setsignUpContentModal(!signUpContentModal);
                    setspaceToggle(!spaceToggle);
                    setUserType(3);
                  }}
                >
                  <span>LIST A WAREHOUSE</span>
                </button>
              </div>
            )}
            {!authenticated && !vendorAuthenticated && (
              <div className="d-none d-md-block">
                <button
                  className={`btn ${
                    window.location.pathname === "/contactUs" ? "active" : ""
                  }`}
                  onClick={() => {
                    setsignInModal(!signInModal);
                    dispatch(errorMessage(null));
                  }}
                >
                  <i
                    className="far fa-user-circle"
                    style={{ fontSize: 25 }}
                  ></i>
                </button>
              </div>
            )}

            {authenticated && <UserDropdown />}
            {vendorAuthenticated && <VendorDropdown />}

            {authenticated && (
              <div className="d-max-xxs-none d-inline-block">
                <Link to="/cart" className="btn px-md-3 px-2 px-lg-4 mt-2">
                  <div className="h5 notification-badge">
                    <i className="fas fa-shopping-cart"></i>
                    {state.CARTINFO.cartList ? (
                      <div className="badge badge-danger rounded-circle d-flex justify-content-center align-items-center">
                        <div>{state.CARTINFO.cartList.counts}</div>
                      </div>
                    ) : null}
                  </div>
                </Link>
              </div>
            )}

            {authenticated || vendorAuthenticated ? (
              <div className="d-max-xxs-none d-inline-block">
                <Link to="/notification" className="btn px-2 px-lg-4 mt-2">
                  <div className="h5 notification-badge">
                    <i className="fas fa-bell"></i>
                    {/* <div className="badge badge-danger rounded-circle d-flex justify-content-center align-items-center">
                    <div>4</div>
                  </div> */}
                  </div>
                </Link>
              </div>
            ) : null}
          </div>

          <button
            onClick={() => {
              setMenuOpen(true);
            }}
            className={
              menuOpen
                ? "navbar-toggler border-0 d-none"
                : "navbar-toggler border-0"
            }
            type="button"
            data-toggle="offcanvas"
            data-target="offcanvassidebar"
            id="offcanvassidebar-btn"
          >
            <span></span>
          </button>
        </nav>
      </header>

      {/* Sign up Modal with content */}

      <Modal
        animation={false}
        show={signUpContentModal}
        onHide={() => setsignUpContentModal(!signUpContentModal)}
      >
        <Modal.Body>
          <div
            className="px-0"
            id="signin-modal"
            style={{
              position: "fixed",
              zIndex: 1300,
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              overflow: "scroll",
            }}
          >
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                phone: "",
                pinCode: "",
                district: "",
                state: "",
                city: "",
                area: "",
                email: "",
                password: "",
                confirmedPassword: "",
                companyName: "",
                countryCode: "+91",
                referredCode: "",
                isTermAndCondition: true,
              }}
              validationSchema={SignupSchema}
              onSubmit={(fields) => {
                // same shape as initial values
                //  fields['userType']=accountType;
                fields["userType"] = {
                  type: accountType,
                };
                fields["roleId"] = userType;

                let data = {
                  ...fields,
                  phone: fields.phone.toString(),
                  pinCode: parseInt(fields.pinCode),
                };
                dispatch(registerMobileNumber(fields.phone.toString()));
                setMobileNumber(fields.phone.toString());

                if (accountType === null) {
                  console.log("Type is required");
                  setAccountTypeError("Type is required");
                  return 0;
                }

                if (checkTerm === false) {
                  console.log("Accept Terms & Conditions is required");
                  setCheckError("Accept Terms & Conditions is required");
                  return 0;
                }

                delete data["confirmedPassword"];

                dispatch(register(data));
              }}
              render={({ errors, status, touched, setFieldValue }) => (
                <div className="modal-dialog modal-xl">
                  <div className="modal-content border-0">
                    <div className="modal-body py-0 px-sm-3 px-2">
                      <div className="row">
                        <div className="col-lg-8 modal-body-right-content pt-lg-2 pt-4 pb-4 px-0 order-lg-2">
                          <button
                            type="button"
                            onClick={signUpContentModalClose}
                            className="close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                          <div className="card-body py-0">
                            <ul
                              className="nav nav-pills common-tabs mb-2"
                              id="signin-tab"
                              role="tablist"
                              data-getelement="#modal-body-left-content"
                            >
                              <li className="nav-item">
                                <button
                                  onClick={() => setUserType(2)}
                                  className={`nav-link text-black px-2 py-0 ${
                                    userType === 2 ? "customer-active" : ""
                                  }`}
                                >
                                  customer
                                </button>
                              </li>
                              <li className="nav-item">
                                <button
                                  onClick={() => setUserType(3)}
                                  className={`nav-link text-black px-2 py-0 ${
                                    userType !== 2 ? "customer-active" : ""
                                  }`}
                                >
                                  Space provider
                                </button>
                              </li>
                            </ul>
                            <div
                              className="tab-content px-3"
                              id="signin-tabContent"
                            >
                              <Form
                                onClick={() => {
                                  dispatch(errorData(null));
                                  setCheckError(null);
                                  setAccountTypeError(null);
                                }}
                              >
                                <div
                                  className="tab-pane fade show active signin-customer"
                                  id="signin-customer"
                                  role="tabpanel"
                                  aria-labelledby="signin-customer-tab"
                                >
                                  <div className="row">
                                    <div className="col-lg-6 form-group form-group-p">
                                      <label htmlFor="customercompanyname">
                                        Company Name
                                      </label>
                                      <Field
                                        name="companyName"
                                        onKeyPress={(e) =>
                                          onlyAlphaNumericSpaceAllow(e)
                                        }
                                        placeholder="Type Here"
                                        type="text"
                                        className={
                                          "form-control" +
                                          (errors.companyName &&
                                          touched.companyName
                                            ? " is-invalid"
                                            : "")
                                        }
                                      />
                                      <ErrorMessage
                                        name="companyName"
                                        component="div"
                                        className="invalid-feedback"
                                      />
                                    </div>
                                  </div>

                                  <div className="row">
                                    <div className="col-md-6 form-group form-group-p">
                                      <label htmlFor="customerfirstname">
                                        First Name{" "}
                                        <sup className="text-danger">*</sup>
                                      </label>
                                      <Field
                                        name="firstName"
                                        onKeyPress={(e) => onlyLetterAllow(e)}
                                        placeholder="Type Here"
                                        type="text"
                                        className={
                                          "form-control" +
                                          (errors.firstName && touched.firstName
                                            ? " is-invalid"
                                            : "")
                                        }
                                      />
                                      <ErrorMessage
                                        name="firstName"
                                        component="div"
                                        className="invalid-feedback"
                                      />
                                    </div>

                                    <div className="col-md-6 form-group form-group-p">
                                      <label htmlFor="customerlastname">
                                        Last Name{" "}
                                        <sup className="text-danger">*</sup>
                                      </label>
                                      <Field
                                        name="lastName"
                                        onKeyPress={(e) => onlyLetterAllow(e)}
                                        placeholder="Type Here"
                                        type="text"
                                        className={
                                          "form-control" +
                                          (errors.lastName && touched.lastName
                                            ? " is-invalid"
                                            : "")
                                        }
                                      />
                                      <ErrorMessage
                                        name="lastName"
                                        component="div"
                                        className="invalid-feedback"
                                      />
                                    </div>

                                    <div className="col-md-6 form-group form-group-p">
                                      <label htmlFor="customercontactnumber">
                                        Contact Number
                                        <sup className="text-danger">*</sup>
                                      </label>
                                      <Field
                                        name="phone"
                                        placeholder="Type Here"
                                        type="number"
                                        className={
                                          "form-control" +
                                          (errors.phone && touched.phone
                                            ? " is-invalid"
                                            : "")
                                        }
                                        maxLength="10"
                                        onInput={maxLengthCheck}
                                        onKeyPress={(e) => onlyNumberAllow(e)}
                                        // onKeyDown={(e) =>
                                        // /[+\-.,e]$/.test(e.key) && e.preventDefault()}
                                      />
                                      <ErrorMessage
                                        name="phone"
                                        component="div"
                                        className="invalid-feedback"
                                      />
                                    </div>

                                    <div className="col-md-6 form-group form-group-p">
                                      <label htmlFor="customeremailid">
                                        Email
                                        <sup className="text-danger">*</sup>
                                      </label>
                                      <Field
                                        name="email"
                                        placeholder="Type Here"
                                        type="text"
                                        className={
                                          "form-control" +
                                          (errors.email && touched.email
                                            ? " is-invalid"
                                            : "")
                                        }
                                      />
                                      <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="invalid-feedback"
                                      />
                                    </div>

                                    <div className="col-md-6 form-group form-group-p">
                                      <label htmlFor="customeremailid">
                                        Pincode
                                        <sup className="text-danger">*</sup>
                                      </label>
                                      <Field
                                        name="pinCode"
                                        placeholder="Type Here"
                                        type="number"
                                        onChange={(e) => {
                                          let data = pinCodeChange(
                                            e.target.value
                                          );
                                          setFieldValue(
                                            "pinCode",
                                            e.target.value
                                          );
                                          if (e.target.value.length < 6) {
                                            setFieldValue("state", "");
                                            setFieldValue("district", "");
                                          }
                                          if (data) {
                                            setFieldValue(
                                              "state",
                                              data.stateName
                                            );
                                            setFieldValue(
                                              "district",
                                              data.districtName
                                            );
                                          }
                                        }}
                                        maxLength="6"
                                        onInput={maxLengthCheck}
                                        onKeyPress={(e) => onlyNumberAllow(e)}
                                        className={
                                          "form-control" +
                                          (errors.pinCode && touched.pinCode
                                            ? " is-invalid"
                                            : "")
                                        }
                                      />
                                      <ErrorMessage
                                        name="pinCode"
                                        component="div"
                                        className="invalid-feedback"
                                      />
                                    </div>
                                    <div className="col-md-6 form-group form-group-p">
                                      <label htmlFor="customeremailid">
                                        City/Location
                                      </label>
                                      <Field
                                        name="area"
                                        placeholder="Type Here"
                                        type="text"
                                        className={"form-control"}
                                      />
                                    </div>

                                    <div className="col-md-6 form-group form-group-p">
                                      <label htmlFor="customeremailid">
                                        District
                                      </label>
                                      <Field
                                        name="district"
                                        placeholder="Type Here"
                                        type="text"
                                        className={"form-control"}
                                        disabled
                                      />
                                    </div>

                                    <div className="col-md-6 form-group form-group-p">
                                      <label htmlFor="customeremailid">
                                        State
                                      </label>
                                      <Field
                                        name="state"
                                        placeholder="Type Here"
                                        type="text"
                                        className={"form-control"}
                                        disabled
                                      />
                                    </div>

                                    {/* <div className="col-md-6 form-group">
                                      <label htmlFor="customeremailid">City<sup className="text-danger">*</sup></label>
                                      <Field name="city" placeholder="Type Here" type="text" className={'form-control' + (errors.city && touched.city ? ' is-invalid' : '')} />
                                      <ErrorMessage name="city" component="div" className="invalid-feedback" />
                                    </div> */}

                                    <div className="col-md-6 form-group form-group-p">
                                      <label htmlFor="customerpassword">
                                        Password
                                        <sup className="text-danger">*</sup>
                                      </label>
                                      <Field
                                        name="password"
                                        placeholder="Type Here"
                                        type="password"
                                        className={
                                          "form-control" +
                                          (errors.password && touched.password
                                            ? " is-invalid"
                                            : "")
                                        }
                                      />
                                      <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="invalid-feedback"
                                      />
                                    </div>

                                    <div className="col-md-6 form-group form-group-p">
                                      <label htmlFor="customerconfirmpassword">
                                        Confirm Password
                                        <sup className="text-danger">*</sup>
                                      </label>
                                      <Field
                                        name="confirmedPassword"
                                        placeholder="Type Here"
                                        type="password"
                                        className={
                                          "form-control" +
                                          (errors.confirmedPassword &&
                                          touched.confirmedPassword
                                            ? " is-invalid"
                                            : "")
                                        }
                                      />
                                      <ErrorMessage
                                        name="confirmedPassword"
                                        component="div"
                                        className="invalid-feedback"
                                      />
                                    </div>

                                    <div className="col-12 form-group form-group-p">
                                      <p className="mb-2">Type</p>
                                      <div className="row">
                                        <div className="col-auto">
                                          <div className="form-check common-radio-inline">
                                            <input
                                              className="common-radio-input"
                                              type="radio"
                                              name="customertypeOptions"
                                              id="customertype3"
                                              value="option3"
                                              onClick={() =>
                                                setAccountType("organization")
                                              }
                                              hidden
                                            />
                                            <label
                                              className="common-radio-label pl-2"
                                              htmlFor="customertype3"
                                            >
                                              Organisation
                                            </label>
                                          </div>
                                        </div>

                                        <div className="col-auto">
                                          <div className="form-check common-radio-inline">
                                            <input
                                              className="common-radio-input"
                                              type="radio"
                                              name="customertypeOptions"
                                              id="customertype2"
                                              value="option2"
                                              onClick={() =>
                                                setAccountType("consultant")
                                              }
                                              hidden
                                            />
                                            <label
                                              className="common-radio-label pl-2"
                                              htmlFor="customertype2"
                                            >
                                              Consultant
                                            </label>
                                          </div>
                                        </div>

                                        <div className="col-auto">
                                          <div className="form-check common-radio-inline">
                                            <input
                                              className="common-radio-input"
                                              type="radio"
                                              name="customertypeOptions"
                                              id="customertype1"
                                              value="option1"
                                              hidden
                                              onClick={() =>
                                                setAccountType("individual")
                                              }
                                            />
                                            <label
                                              className="common-radio-label pl-2"
                                              htmlFor="customertype1"
                                            >
                                              Individual
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                      {accountTypeError && (
                                        <p className="errorMessage">
                                          {accountTypeError}
                                        </p>
                                      )}
                                    </div>

                                    <div className="col-12">
                                      <div className="common-checkbox form-check py-1">
                                        <input
                                          type="checkbox"
                                          checked={checkTerm}
                                          onChange={() =>
                                            setCheckTerm(!checkTerm)
                                          }
                                          className="common-checkbox-input form-check-input"
                                          id="exampleCheck1"
                                        />
                                        <label
                                          className="common-checkbox-label form-check-label pl-2"
                                          htmlFor="exampleCheck1"
                                        >
                                          I agree to the{" "}
                                          <button
                                            type="button"
                                            onClick={() => setModalShow(true)}
                                            className="btn-link btn-link-deep-primary border-0"
                                          >
                                            terms and conditions.
                                          </button>
                                        </label>

                                        {checkError && (
                                          <p className="errorMessage">
                                            {checkError}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  {ERRORDATA && (
                                    <p className="errorMessage">{ERRORDATA}</p>
                                  )}
                                  <button
                                    type="submit"
                                    disabled={state.PENDINGDATA}
                                    className="btn btn-deep-primary mb-3"
                                  >
                                    Submit
                                    {state.PENDINGDATA ? (
                                      <Spinner animation="border" />
                                    ) : null}
                                  </button>

                                  <p className="mb-0">
                                    Already have an Account?
                                    <button
                                      style={{
                                        all: "unset",
                                        cursor: "pointer",
                                      }}
                                      className="btn p-0"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setsignUpContentModal(
                                          !signUpContentModal
                                        );
                                        setsignInModal(true);
                                      }}
                                    >
                                      &nbsp;
                                      <span className="btn-line-deep-primary py-1">
                                        Sign In
                                      </span>
                                    </button>
                                  </p>
                                </div>
                              </Form>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-4 modal-body-left-content overlay deep-primary-overlay py-4 px-4 order-lg-1">
                          ``
                          <StaticContent userType={userType} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            />
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={signInModal}
        onHide={() => {
          setsignInModal(!signInModal);
          setspaceToggle(false);
        }}
      >
        <Modal.Body>
          <LoginForm
            LoginsignUpContentModal={signUpContentModal}
            setsignUpContentModal={setsignUpContentModal}
            signInModal={signInModal}
            setsignInModal={setsignInModal}
          />
        </Modal.Body>
      </Modal>

      {/* Sign up Modal */}
      <Modal
        show={signUpModal}
        onHide={() => {
          setsignUpModal(!signUpModal);
          setspaceToggle(!spaceToggle);
        }}
      >
        <Modal.Body>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              phone: "",
              email: "",
              password: "",
              confirmedPassword: "",
              companyName: "",
              userType: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(fields) => {
              // onSubmit={(e) => this.signIn(e)}
              alert("sign up succcessfull");
              // alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
            }}
            render={({ errors, status, touched }) => (
              <div className="px-0">
                <div className="modal-dialog">
                  <div className="modal-content border-0">
                    <div className="modal-body py-0">
                      <div className="row px-3">
                        <div className="modal-body-right-content py-lg-4 my-1 p-sm-4 p-3">
                          <div className="row">
                            <div className="col-12">
                              <button
                                type="button"
                                className="close"
                                onClick={() => setsignUpModal(!signUpModal)}
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                              <div>
                                <h5 className="mb-4 modal-title">
                                  Sign up to check price
                                </h5>
                              </div>
                            </div>
                          </div>
                          <Form>
                            <div
                              className="tab-pane fade show active signin-customer"
                              id="signin-customer"
                              role="tabpanel"
                              aria-labelledby="signin-customer-tab"
                            >
                              <div className="row">
                                <div className="col-md-6 form-group">
                                  <label htmlFor="customerfirstname">
                                    First Name{" "}
                                    <sup className="text-danger">*</sup>
                                  </label>
                                  {/* <input required={true} onChange={(e) => this.setState({ firstName: e.target.value })} type="text" id="customerfirstname" className="form-control" placeholder="Type here" /> */}
                                  <Field
                                    name="firstName"
                                    type="text"
                                    className={
                                      "form-control" +
                                      (errors.firstName && touched.firstName
                                        ? " is-invalid"
                                        : "")
                                    }
                                  />
                                  <ErrorMessage
                                    name="firstName"
                                    component="div"
                                    className="invalid-feedback"
                                  />
                                </div>
                                <div className="col-md-6 form-group">
                                  <label htmlFor="customerlastname">
                                    Last Name{" "}
                                    <sup className="text-danger">*</sup>
                                  </label>
                                  {/* <input type="text" id="customerlastname" required={true} onChange={(e) => this.setState({ lastName: e.target.value })} className="form-control" placeholder="Type here"/> */}
                                  <Field
                                    name="lastName"
                                    type="text"
                                    className={
                                      "form-control" +
                                      (errors.lastName && touched.lastName
                                        ? " is-invalid"
                                        : "")
                                    }
                                  />
                                  <ErrorMessage
                                    name="lastName"
                                    component="div"
                                    className="invalid-feedback"
                                  />
                                </div>
                                <div className="col-md-6 form-group">
                                  <label htmlFor="customercontactnumber">
                                    Contact Number
                                    <sup className="text-danger">*</sup>
                                  </label>
                                  {/* <input type="text" id="customercontactnumber" required={true} onChange={(e) => this.setState({ phone: e.target.value })}  className="form-control" placeholder="Type here"/> */}
                                  <Field
                                    name="phone"
                                    type="number"
                                    className={
                                      "form-control" +
                                      (errors.phone && touched.phone
                                        ? " is-invalid"
                                        : "")
                                    }
                                    maxLength="10"
                                    onInput={maxLengthCheck}
                                    required={true}
                                    onKeyDown={(e) =>
                                      /[+\-.,]$/.test(e.key) &&
                                      e.preventDefault()
                                    }
                                  />
                                  <ErrorMessage
                                    name="phone"
                                    component="div"
                                    className="invalid-feedback"
                                  />
                                </div>
                                <div className="col-md-6 form-group">
                                  <label htmlFor="customeremailid">
                                    Email<sup className="text-danger">*</sup>
                                  </label>
                                  {/* <input type="text" id="customeremailid" required={true} onChange={(e) => this.setState({ email: e.target.value })}  className="form-control" placeholder="Type here"/> */}
                                  <Field
                                    name="email"
                                    type="text"
                                    className={
                                      "form-control" +
                                      (errors.email && touched.email
                                        ? " is-invalid"
                                        : "")
                                    }
                                  />
                                  <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="invalid-feedback"
                                  />
                                </div>
                                <div className="col-md-6 form-group">
                                  <label htmlFor="customerpassword">
                                    Password<sup className="text-danger">*</sup>
                                  </label>
                                  {/* <input type="text" id="customerpassword" required={true} onChange={(e) => this.setState({ password: e.target.value })}  className="form-control" placeholder="Type here"/> */}
                                  <Field
                                    name="password"
                                    type="password"
                                    className={
                                      "form-control" +
                                      (errors.password && touched.password
                                        ? " is-invalid"
                                        : "")
                                    }
                                  />
                                  <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="invalid-feedback"
                                  />
                                </div>
                                <div className="col-md-6 form-group">
                                  <label htmlFor="customerconfirmpassword">
                                    Confirm Password
                                    <sup className="text-danger">*</sup>
                                  </label>
                                  {/* <input type="text" id="customerconfirmpassword" required={true} onChange={(e) => this.setState({ confirmedPassword: e.target.value })} className="form-control" placeholder="Type here"/> */}
                                  <Field
                                    name="confirmedPassword"
                                    type="text"
                                    className={
                                      "form-control" +
                                      (errors.confirmedPassword &&
                                      touched.confirmedPassword
                                        ? " is-invalid"
                                        : "")
                                    }
                                  />
                                  <ErrorMessage
                                    name="confirmedPassword"
                                    component="div"
                                    className="invalid-feedback"
                                  />
                                </div>
                                <div className="col-12 form-group mb-3">
                                  <p className="mb-2">Type</p>
                                  <div className="row">
                                    <div className="col-auto">
                                      <div className="form-check common-radio-inline">
                                        <input
                                          className="common-radio-input"
                                          type="radio"
                                          name="customertypeOptions"
                                          id="customertype1"
                                          value="option1"
                                          hidden
                                        />
                                        <label
                                          className="common-radio-label pl-2"
                                          htmlFor="customertype1"
                                        >
                                          Individual
                                        </label>
                                      </div>
                                    </div>
                                    <div className="col-auto">
                                      <div className="form-check common-radio-inline">
                                        <input
                                          className="common-radio-input"
                                          type="radio"
                                          name="customertypeOptions"
                                          id="customertype2"
                                          value="option2"
                                          hidden
                                        />
                                        <label
                                          className="common-radio-label pl-2"
                                          htmlFor="customertype2"
                                        >
                                          Broker
                                        </label>
                                      </div>
                                    </div>
                                    <div className="col-auto">
                                      <div className="form-check common-radio-inline">
                                        <input
                                          className="common-radio-input"
                                          type="radio"
                                          name="customertypeOptions"
                                          id="customertype3"
                                          value="option3"
                                          hidden
                                        />
                                        <label
                                          className="common-radio-label pl-2"
                                          htmlFor="customertype3"
                                        >
                                          Organisation
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-6 form-group">
                                  <label htmlFor="customercompanyname">
                                    Company Name
                                  </label>
                                  {/* <input type="text" id="customercompanyname" onChange={(e) => this.setState({ companyName: e.target.value })} className="form-control" placeholder="Type here"/> */}
                                  <Field
                                    name="companyName"
                                    type="text"
                                    className={
                                      "form-control" +
                                      (errors.companyName && touched.companyName
                                        ? " is-invalid"
                                        : "")
                                    }
                                  />
                                  <ErrorMessage
                                    name="companyName"
                                    component="div"
                                    className="invalid-feedback"
                                  />
                                </div>
                                <div className="col-12">
                                  <div className="common-checkbox form-check">
                                    <input
                                      type="checkbox"
                                      className="common-checkbox-input form-check-input"
                                      id="exampleCheck1"
                                    />
                                    <label
                                      className="common-checkbox-label form-check-label mb-2 pl-2"
                                      htmlFor="exampleCheck1"
                                    >
                                      I agree to the{" "}
                                      <Link
                                        to="terms-and-conditions.html"
                                        className="btn-link btn-link-deep-primary"
                                      >
                                        terms and conditions.
                                      </Link>
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <button
                                type="submit"
                                className="btn btn-deep-primary my-3"
                              >
                                Submit
                              </button>

                              <p className="mb-0">
                                Already have an Account?
                                <button
                                  style={{ all: "unset", cursor: "pointer" }}
                                  className="btn p-0"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setsignInModal(!signInModal);
                                    setsignUpModal(!signUpModal);
                                  }}
                                >
                                  <span className="btn-line-deep-primary py-1">
                                    Sign In
                                  </span>
                                </button>
                              </p>
                            </div>
                          </Form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          />
        </Modal.Body>
      </Modal>

      <Modal
        animation={true}
        show={state.otpVerified.success === true}
        onHide={() => dispatch(successData(false))}
      >
        <Modal.Body>
          <OtpVerify
            setsuccessModal={setsuccessModal}
            successModal={successModal}
            setverifyOtpModal={setverifyOtpModal}
            verifyOtpModal={verifyOtpModal}
            mobileNumber={mobileNumber}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};
const mapStateToProps = ({ userLogin }, ownProps) => ({ userLogin });
export default connect(mapStateToProps, { register, userLogin })(Header);
