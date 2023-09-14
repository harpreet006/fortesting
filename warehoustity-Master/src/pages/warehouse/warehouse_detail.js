import React, { Component } from 'react'
import Layout from '../../layout/Layout';
import {connect} from 'react-redux'
import { unRegisterUser, verifyUnRegisterUser, register } from '../../store/actions/register'
// import OtpInput from 'react-otp-input';
// import { CircularProgress } from '@material-ui/core';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import {Modal, Button} from 'react-bootstrap';

function SignupSuccess(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body style={{textAlign: 'center'}}>
      <img  src={"/assets/images/success.png"} className="size-150px p-4 mx-auto" alt="success"/>
        <h6>
         Signup Successful
        </h6>
        <Button className="my-3" onClick={props.onHide}>Close</Button>
      </Modal.Body>

    </Modal>
  );
}

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('First Name is required'),
  lastName: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Last Name is required'),
  //   referalcode: Yup.string()
  // .required('Phone is required'),
  email: Yup.string()
    .email('Email is invalid')
    .required('Email is required'),
  password: Yup.string()
  .required('Please Enter your password'),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
  //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
  // ),
  confirmedPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  companyName: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!'),
  // userType: Yup.string()
  // .required('user type is required'),
  // roleId: Yup.number()
  // .required('Role is required'), // default value 2
  // countryCode:"+91",
});

class WarehouseDetail extends Component {
    state = {
      user: {
        "roleId": 2,
        "countryCode":"+91",
      },
        phone: null,
        countryCode: '+91',
        otp: '',
        mobileModal: false,
        verifyOtpModal: false,
        checkPriceModal:false,
        errors: {},
        signInModal: false,
        inputProperties: false,
        successModal: false
    }
    submit = (e) => {
        e.preventDefault();
        // let { phone, countryCode } = this.state;
        // let errors = {}
        // let obj = {
        //   phone: phone,
        //   countryCode: countryCode,
        // }

        // errors.phone = stringValidation(phone, 'phone');

        // if(errors.phone == true) {
        //   this.props.unRegisterUser(obj, () => {
        //     this.setState({
        //       inputProperties: true,
        //       verifyOtpModal: true,
        //       mobileModal: false
        //     })
        //   })
        // } else {
        //   this.setState({
        //     errors
        //   })
        // }
    }

    signUpUnRegisterUser = (e) => {
      e.preventDefault()
      // this.props.register(this.state.user, () => {
      //   this.setState({
      //   checkPriceModal:false,
      //   })
      // alert('user register successfull')
      // })
    }

    verifyOtp = (e) => {
        e.preventDefault();
        // let obj = {
        //     phone: this.state.phone,
        //     otp: this.state.otp,
        // }
        // this.props.verifyUnRegisterUser(obj, () => {
        //     alert('otp verified')
        //     this.setState({
        //       verifyOtpModal: false,
        //       checkPriceModal: true
        //     })
        // })
    }

    componentDidMount = () => window.scrollTo(0, 0)

    handleChange = otp => this.setState({ otp });

    render() {
    return (
        <Layout>
          {/* {this.props.user.type === "OTP_VERIFICATION_ERROR" || this.props.user.type === "MOBILE_VERIFICATION_ERROR" ? console.log(this.props.user.error) : null} */}
          {
          this.state.successModal ?
          <SignupSuccess
          show={this.state.successModal}
          onHide={() => this.setState({successModal: !this.state.successModal})}
        />
        : null
        }

        <div className="container">
          <div className="row align-items-center justify-content-end">
            <div className="col-auto pt-3 py-3">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb common-breadcrumb mb-0 text-dark">
                  <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Warehouse</li>
                  <li className="breadcrumb-item active" aria-current="page">warehouse DL-01379</li>
                </ol>
              </nav>
            </div>
            
          </div>
        </div>
        <section className="about-deatail py-0">
        <div className="container">
          
          <div className="row align-items-center">
            <div className="col-md-12">
              <div className="section-heading">
                <h4 className="product-name" id="product-name">ID: DL-01379</h4>
                <p className="text-gray"><span className="fas fa-map-marker-alt"></span> South Delhi, Delhi
                </p>
              </div>
            </div>
          </div>
          <div className="row align-items-center mx-0">
            <div className="col-md-6 bg-light-green">
              <div className="product-item-view py-3" id="product-item-view">
                <div>
                  <div className="d-flex justify-content-end">
                    <button type="button" className="btn p-0" data-toggle="modal" data-target="#product-item-show-modal">
                      <img src="assets/images/icons/icon-full.png" alt="warehouse"/>
                    </button>
                  </div>
                  <div className="img-holer product-item-images">
                    <img src="assets/images/warehouse/warehouse-details1.png" alt="warehouse" className="img-fluid w-100"/>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 bg-light-green py-3">
              <div className="row d-flex flex-column">
                <div className="col-md-12 col-sm-6 pb-2 mb-2">
                  <div className="card custom-card-overlay2">
                    <div className="img-holder">
                      <img src="assets/images/warehouse/warehouse-details2.png" alt="warehouse" className="img-fluid w-100"/>
                    </div>
                    <div className="card-img-overlay d-flex align-items-center justify-content-center">
                      <div className="card-body text-center">
                        <button className="indoor-outdoor-tab-open btn text-white" data-target="#indoor-outdoor-modal" data-target-tab="#indoor" data-toggle="modal">
                          <span className="font-heading h4 text-white">Indoor</span>
                          <p className="d-block">26 photos</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-sm-6 pt-2">
                  <div className="card custom-card-overlay2">
                    <div className="img-holder">
                      <img src="assets/images/warehouse/warehouse-details3.png" alt="warehouse" className="img-fluid w-100"/>
                    </div>
                    <div className="card-img-overlay d-flex align-items-center justify-content-center">
                      <div className="card-body text-center">
                        <button className="indoor-outdoor-tab-open btn text-white" data-target="#indoor-outdoor-modal" data-target-tab="#outdoor" data-toggle="modal">
                          <span className="font-heading h4 text-white">Outdoor</span>
                          <p className="d-block">8 photos</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mb-4">
          <div className="row justify-content-between">
            <div className="col-auto">
              <p className="text-dark pt-4 pl-1">Share</p>
              <div className="social-icons bg-socials rounded2px row mx-0 align-items-center">
                <div className="col-auto px-2">
                  <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fparse.com"  className="facebook d-flex align-items-center justify-content-center">
                    <i className="fab fa-facebook-f"></i>
                  </a>  
                </div>
                <div className="col-auto px-2">
                  <a href="https://twitter.com/intent/tweet"  className="twitter d-flex align-items-center justify-content-center">
                    <i className="fab fa-twitter"></i>
                  </a>
                </div>
                <div className="col-auto px-2">
                  <a href="https://www.instagram.com/accounts/login/"  className="instagram d-flex align-items-center justify-content-center">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div> 
              </div>
            </div>
            <div className="col-auto pt-4 pb-4 mt-2">
              <Link to="#" className="btn btn-outline-dark px-3">
                <i className="fas fa-map-marked-alt pr-3"></i> Locate Us on Map
              </Link>
            </div>
          </div>
        </div>
        <div className="container pb-3 mb-4">
          <h4>About Warehouse</h4>
          <p className="text-gray mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus, viverra vitae congue eu, consequat ac felis donec et odio pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus.</p>
        </div>
        <div className="container mb-4">
          <h4>Features and Services</h4>
          <div className="row">
            <div className="col-xl col-md-4 col-sm-6 col-max-xs-6 py-3">
              <h6 className="mb-4">Connectivity</h6>
              <ul className="list-unstyled text-gray">
                <li className="mb-3"><img className="mr-2" src="assets/images/icons/icon-home.png" alt="warehouse"/> WMS</li>
                <li className="mb-3"><img className="mr-2" src="assets/images/icons/icon-telephone.png" alt="warehouse"/> Telephone / Landline</li>
                <li className="mb-3"><img className="mr-2" src="assets/images/icons/icon-wifi.png" alt="warehouse"/> Broadband / WIFI</li>
                <li className="mb-3"><Link to="#" className="btn btn-link btn-link-deep-primary px-3 text-underline">View More</Link></li>
              </ul>
            </div>
            <div className="col-xl col-md-4 col-sm-6 col-max-xs-6 py-3">
              <h6 className="mb-4">Compliances</h6>
              <ul className="list-unstyled text-gray">
                <li className="mb-3"><img className="mr-2" src="assets/images/icons/icon-file.png" alt="warehouse"/> CLU</li>
                <li className="mb-3"><img className="mr-2" src="assets/images/icons/icon-fire-noc.png" alt="warehouse"/> Fire NOC</li>
                <li className="mb-3"><img className="mr-2" src="assets/images/icons/icon-home-insurance.png" alt="warehouse"/> Building Insurance</li>
                <li className="mb-3"><Link to="#" className="btn btn-link btn-link-deep-primary px-3 text-underline">View More</Link></li>
              </ul>
            </div>
            <div className="col-xl col-md-4 col-sm-6 col-max-xs-6 py-3">
              <h6 className="mb-4">IT & MH Infra</h6>
              <ul className="list-unstyled text-gray">
                <li className="mb-3"><img className="mr-2" src="assets/images/icons/icon-computer-and-printer.png" alt="warehouse"/> Computer & printer</li>
                <li className="mb-3"><img className="mr-2" src="assets/images/icons/icon-scanner.png" alt="warehouse"/> Scanner</li>
                <li className="mb-3"><img className="mr-2" src="assets/images/icons/icon-pallet.png" alt="warehouse"/> pallets</li>
                <li className="mb-3"><Link to="#" className="btn btn-link btn-link-deep-primary px-3 text-underline">View More</Link></li>
              </ul>
            </div>
            <div className="col-xl col-md-4 col-sm-6 col-max-xs-6 py-3">
              <h6 className="mb-4">Safety</h6>
              <ul className="list-unstyled text-gray">
                <li className="mb-3"><img className="mr-2" src="assets/images/icons/icon-cctv.png" alt="warehouse"/> CCTV Surveillance</li>
                <li className="mb-3"><img className="mr-2" src="assets/images/icons/icon-sheild.png" alt="warehouse"/> 24*7 Security</li>
                <li className="mb-3"><img className="mr-2" src="assets/images/icons/icon-fire-extigueshers.png" alt="warehouse"/> Fire Extiguishers</li>
                <li className="mb-3"><Link to="#" className="btn btn-link btn-link-deep-primary px-3 text-underline">View More</Link></li>
              </ul>
            </div>
            <div className="col-xl col-md-4 col-sm-6 col-max-xs-6 py-3">
              <h6 className="mb-4">Services</h6>
              <ul className="list-unstyled text-gray">
                <li className="mb-3"><img className="mr-2" src="assets/images/icons/icon-home.png" alt="warehouse"/> Floor Storage</li>
                <li className="mb-3"><img className="mr-2" src="assets/images/icons/icon-pallet.png" alt="warehouse"/> pallet Storage</li>
                <li className="mb-3"><img className="mr-2" src="assets/images/icons/icon-vehicle.png" alt="warehouse"/> Carton pick</li>
                <li className="mb-3"><Link to="#" className="btn btn-link btn-link-deep-primary px-3 text-underline">View More</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Book Warehouse */}

      <section className="book-warehouse pt-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-12 mb-4">
              <div action="">
                <h4 className="mb-4">Book Now</h4>
                <div className="row">
                  <div className="col-12">
                    <label htmlFor="">Estimated project Duration</label>
                  </div>
                  <div className="col-sm-6 col-max-xs-6 col-max-xxs-12 form-group">
                    <input type="date"  className="form-control" placeholder="Move in date"/>
                  </div>
                  <div className="col-sm-6 col-max-xs-6 col-max-xxs-12 form-group">
                    <input type="date"  className="form-control" placeholder="Move out date"/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 form-group">
                    <label htmlFor="">Storage Material Type</label>
                    <input type="text"  className="form-control" placeholder="Type here"/>
                  </div>
                </div>
                <div className="row"> 
                  <div className="col-12 form-group mb-3">
                    <p className="mb-2">Storage Material Type</p>
                    <div className="row">
                      <div className="col-md-4 col-sm-6 col-max-xs-6">
                        <div className="common-checkbox form-check">
                          <input type="checkbox" className="common-checkbox-input form-check-input" id="materialtype1"/>
                          <label className="common-checkbox-label form-check-label mb-2 pl-2" htmlFor="materialtype1"> Fork Lift</label>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-6 col-max-xs-6">
                        <div className="common-checkbox form-check">
                          <input type="checkbox" className="common-checkbox-input form-check-input" id="materialtype2"/>
                          <label className="common-checkbox-label form-check-label mb-2 pl-2" htmlFor="materialtype2"> Crane</label>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-6 col-max-xs-6">
                        <div className="common-checkbox form-check">
                          <input type="checkbox" className="common-checkbox-input form-check-input" id="materialtype3"/>
                          <label className="common-checkbox-label form-check-label mb-2 pl-2" htmlFor="materialtype3"> Fulltime Labour</label>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-6 col-max-xs-6">
                        <div className="common-checkbox form-check">
                          <input type="checkbox" className="common-checkbox-input form-check-input" id="materialtype4"/>
                          <label className="common-checkbox-label form-check-label mb-2 pl-2" htmlFor="materialtype4"> Fulltime Labour</label>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-6 col-max-xs-6">
                        <div className="common-checkbox form-check">
                          <input type="checkbox" className="common-checkbox-input form-check-input" id="materialtype5"/>
                          <label className="common-checkbox-label form-check-label mb-2 pl-2" htmlFor="materialtype5"> Supervisor</label>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-6 col-max-xs-6">
                        <div className="common-checkbox form-check">
                          <input type="checkbox" className="common-checkbox-input form-check-input" id="materialtype6"/>
                          <label className="common-checkbox-label form-check-label mb-2 pl-2" htmlFor="materialtype6"> Office Space</label>
                        </div>
                      </div>
                    </div>
                  </div> 
                </div> 
                <div className="row">
                  <div className="col-auto col-sm-6 col-md-6">
                    <button type="submit" className="btn btn-block btn-deep-primary my-1" data-target="#check-price-modal" data-toggle="modal">Check price</button>
                  </div>
                  <div className="col-auto col-sm-6 col-md-6">
                    <button type="submit" className="btn btn-block btn-outline-dark-primary my-1"  data-target="#create-account-modal" data-toggle="modal">Add to Cart</button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-auto col-sm-6 col-md-6">
                    <button type="submit" className="btn btn-block text-dark my-1 px-2 py-1"><i className="fas fa-file-medical mr-2"></i> Save to my Waresheet</button>
                  </div>
                  <div className="col-auto col-sm-6 col-md-6">
                    <button type="submit" className="btn btn-block text-danger my-1 px-2 py-1">Report Warehouse</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    <div className="modal px-0" id="signin-modal" tabIndex="-1" role="dialog" aria-labelledby="signin-modalLabel" aria-hidden="true">
      <div className="modal-dialog modal-xl" role="document">
        <div className="modal-content border-0"> 
          <div className="modal-body py-0 px-sm-3 px-2">
            <div className="row">
              <div className="col-lg-8 modal-body-right-content pt-lg-2 pt-4 pb-4 px-0 order-lg-2">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <div className="card-body py-0">
                  <ul className="nav nav-pills common-tabs mb-3" id="signin-tab" role="tablist" data-getelement="#modal-body-left-content">
                    <li className="nav-item">
                      <Link className="nav-link h5 active" id="signin-customer-tab" data-toggle="pill" to=".signin-customer" role="tab" aria-controls="signin-customer" aria-selected="true">customer</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link h5" id="signin-space-provider-tab" data-toggle="pill" to=".signin-space-provider" role="tab" aria-controls="signin-space-provider" aria-selected="false">Space provider</Link>
                    </li> 
                  </ul>
                  <div className="tab-content px-3" id="signin-tabContent">
                    <div className="tab-pane fade show active signin-customer" id="signin-customer" role="tabpanel" aria-labelledby="signin-customer-tab">
                      <form action="">
                        <div className="row">
                          <div className="col-md-6 form-group">
                            <label htmlFor="customerfirstname">First Name <sup className="text-danger">*</sup></label>
                            <input type="text" id="customerfirstname" className="form-control" placeholder="Type here"/>
                          </div>
                          <div className="col-md-6 form-group">
                            <label htmlFor="customerlastname">Last Name <sup className="text-danger">*</sup></label>
                            <input type="text" id="customerlastname" className="form-control" placeholder="Type here"/>
                          </div>
                          <div className="col-md-6 form-group">
                            <label htmlFor="customercontactnumber">Contact Number<sup className="text-danger">*</sup></label>
                            <input type="text" id="customercontactnumber" className="form-control" placeholder="Type here"/>
                          </div>
                          <div className="col-md-6 form-group">
                            <label htmlFor="customeremailid">Email ID <sup className="text-danger">*</sup></label>
                            <input type="text" id="customeremailid" className="form-control" placeholder="Type here"/>
                          </div>
                          <div className="col-md-6 form-group">
                            <label htmlFor="customerpassword">password<sup className="text-danger">*</sup></label>
                            <input type="text" id="customerpassword" className="form-control" placeholder="Type here"/>
                          </div>
                          <div className="col-md-6 form-group">
                            <label htmlFor="customerconfirmpassword">Confirm password<sup className="text-danger">*</sup></label>
                            <input type="text" id="customerconfirmpassword" className="form-control" placeholder="Type here"/>
                          </div>
                          <div className="col-12 form-group mb-3">
                            <p className="mb-2">Type</p>
                            <div className="row">
                              <div className="col-auto">
                                <div className="form-check common-radio-inline">
                                  <input className="common-radio-input" type="radio" name="customertypeOptions6" id="customertype6" value="option1" hidden/>
                                  <label className="common-radio-label pl-2" htmlFor="customertype1">Individual</label>
                                </div>
                              </div>
                              <div className="col-auto">
                                <div className="form-check common-radio-inline">
                                  <input className="common-radio-input" type="radio" name="customertypeOptions7" id="customertype7" value="option2" hidden/>
                                  <label className="common-radio-label pl-2" htmlFor="customertype2">Broker</label>
                                </div>
                              </div>
                              <div className="col-auto">
                                <div className="form-check common-radio-inline">
                                  <input className="common-radio-input" type="radio" name="customertypeOptions8" id="customertype8" value="option3" hidden/>
                                  <label className="common-radio-label pl-2" htmlFor="customertype3">Organisation</label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 form-group">
                            <label htmlFor="customercompanyname">Company Name</label> 
                            <input type="text" id="customercompanyname" className="form-control" placeholder="Type here"/>
                          </div>
                          <div className="col-12">
                            <div className="common-checkbox form-check">
                              <input type="checkbox" className="common-checkbox-input form-check-input" id="exampleCheck13"/>
                              <label className="common-checkbox-label form-check-label mb-2 pl-2" htmlFor="exampleCheck13">I agree to the <Link to="terms-and-conditions.html" className="btn-link btn-link-dark-primary">terms and conditions.</Link></label>
                            </div>
                          </div>
                        </div> 
                        <button type="submit" className="btn btn-deep-primary my-3">Submit</button>
                        <p className="mb-0">Already have an Account? <Link to="#" className="btn-line-dark-primary py-1">Sign In</Link></p>
                      </form>
                    </div>
                    <div className="tab-pane fade signin-space-provider" id="signin-space-provider" role="tabpanel" aria-labelledby="signin-space-provider-tab">
                      <form action="">
                        <div className="row">
                          <div className="col-md-6 form-group">
                            <label htmlFor="spaceproviderfirstname">First Name <sup className="text-danger">*</sup></label>
                            <input type="text" id="spaceproviderfirstname" className="form-control" placeholder="Type here"/>
                          </div>
                          <div className="col-md-6 form-group">
                            <label htmlFor="spaceproviderlastname">Last Name <sup className="text-danger">*</sup></label>
                            <input type="text" id="spaceproviderlastname" className="form-control" placeholder="Type here"/>
                          </div>
                          <div className="col-md-6 form-group">
                            <label htmlFor="spaceprovidercontactnumber">Contact Number<sup className="text-danger">*</sup></label>
                            <input type="text" id="spaceprovidercontactnumber" className="form-control" placeholder="Type here"/>
                          </div>
                          <div className="col-md-6 form-group">
                            <label htmlFor="spaceprovideremailid">Email ID <sup className="text-danger">*</sup></label>
                            <input type="text" id="spaceprovideremailid" className="form-control" placeholder="Type here"/>
                          </div>
                          <div className="col-md-6 form-group">
                            <label htmlFor="spaceproviderpassword">password<sup className="text-danger">*</sup></label>
                            <input type="text" id="spaceproviderpassword" className="form-control" placeholder="Type here"/>
                          </div>
                          <div className="col-md-6 form-group">
                            <label htmlFor="spaceproviderconfirmpassword">Confirm password<sup className="text-danger">*</sup></label>
                            <input type="text" id="spaceproviderconfirmpassword" className="form-control" placeholder="Type here"/>
                          </div>
                          <div className="col-12 form-group mb-3">
                            <p className="mb-2">Type</p>
                            <div className="row">
                              <div className="col-auto">
                                <div className="form-check common-radio-inline">
                                  <input className="common-radio-input" type="radio" name="spaceprovidertypeOptions" id="spaceprovidertype11" value="option1" hidden/>
                                  <label className="common-radio-label pl-2" htmlFor="spaceprovidertype11">Individual</label>
                                </div>
                              </div>
                              <div className="col-auto">
                                <div className="form-check common-radio-inline">
                                  <input className="common-radio-input" type="radio" name="spaceprovidertypeOptions" id="spaceprovidertype12" value="option2" hidden/>
                                  <label className="common-radio-label pl-2" htmlFor="spaceprovidertype12">Broker</label>
                                </div>
                              </div>
                              <div className="col-auto">
                                <div className="form-check common-radio-inline">
                                  <input className="common-radio-input" type="radio" name="spaceprovidertypeOptions" id="spaceprovidertype13" value="option3" hidden/>
                                  <label className="common-radio-label pl-2" htmlFor="spaceprovidertype13">Organisation</label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 form-group">
                            <label htmlFor="spaceprovidercompanyname1">Company Name</label> 
                            <input type="text" id="spaceprovidercompanyname1" className="form-control" placeholder="Type here"/>
                          </div>
                          <div className="col-12">
                            <div className="common-checkbox form-check">
                              <input type="checkbox" className="common-checkbox-input form-check-input" id="spaceprovideragree1"/>
                              <label className="common-checkbox-label form-check-label mb-2 pl-2" htmlFor="spaceprovideragree1">I agree to the <Link to="terms-and-conditions.html" className="btn-link btn-link-dark-primary">terms and conditions.</Link></label>
                            </div>
                          </div>
                        </div> 
                        <button type="submit" className="btn btn-deep-primary my-3">Submit</button>
                        <p className="mb-0">Already have an Adddccount? <Link to="#" className="btn-line-dark-primary py-1">Sign In</Link></p>
                      </form>
                    </div>
                  </div>
                </div> 
              </div>
              <div className="col-lg-4 modal-body-left-content overlay deep-primary-overlay py-4 px-4 order-lg-1">
                <div className="row" id="modal-body-left-content">
                  <div className="col-lg-12 tab-pane d-block signin-customer">
                    <div className="row">
                      <div className="col-lg-12 col-sm-6 border-bottom-line overlay-content p-3 signin-customer">
                        <h5 className="mb-4">Why Choose Us?</h5>
                        <ul className="pl-3">
                          <li className="mb-3">Boosting of the Revenue!</li>
                          <li className="mb-3">Maximum Utilization Of Space!</li>
                          <li className="mb-3">Increase Your Space Occupancy Level!</li>
                          <li className="mb-3">Increased Visibility Of Your Assets!</li>
                          <li className="mb-3">Tech Support & Skill Development!</li>
                        </ul>
                      </div>
                      <div className="col-lg-12 col-sm-6 overlay-content p-3">
                        <h5 className="mb-4">Who can list with
                          Warehousity?</h5>
                        <ul className="pl-3">
                          <li className="mb-3">Boosting of the Revenue!</li>
                          <li className="mb-3">Maximum Utilization Of Space!</li>
                          <li className="mb-3">Increase Your Space Occupancy Level!</li>
                          <li className="mb-3">Increased Visibility Of Your Assets!</li>
                          <li className="mb-3">Tech Support & Skill Development!</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 tab-pane d-none signin-space-provider">
                    <div className="row">
                      <div className="col-lg-12 col-sm-6 border-bottom-line overlay-content p-3 signin-customer">
                        <h5 className="mb-4">Why Choose Us?</h5>
                        <ul className="pl-3">
                          <li className="mb-3">Boosting of the Revenue!</li>
                          <li className="mb-3">Maximum Utilization Of Space!</li>
                          <li className="mb-3">Increase Your Space Occupancy Level!</li>
                          <li className="mb-3">Increased Visibility Of Your Assets!</li>
                          <li className="mb-3">Tech Support & Skill Development!</li>
                        </ul>
                      </div>
                      <div className="col-lg-12 col-sm-6 overlay-content p-3">
                        <h5 className="mb-4">Who can list with
                          Warehousity?</h5>
                        <ul className="pl-3">
                          <li className="mb-3">Boosting of the Revenue!</li>
                          <li className="mb-3">Maximum Utilization Of Space!</li>
                          <li className="mb-3">Increase Your Space Occupancy Level!</li>
                          <li className="mb-3">Increased Visibility Of Your Assets!</li>
                          <li className="mb-3">Tech Support & Skill Development!</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> 
        </div>
      </div>
    </div>

    
    {/* Check price */}
    <div className="modal px-0" id="check-price-modal" tabIndex="-1" role="dialog" aria-labelledby="check-price-modalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content border-0"> 
          <div className="modal-body py-0">
            <div className="row px-3">
              <div className="modal-body-right-content w-100 py-lg-4 my-1 p-sm-4 p-3">
                <div className="row">
                  <div className="col-12">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <div className="text-center">
                      <h5 className="mb-4 modal-title">Warehouse price Trend - Warehousity</h5>
                    </div>
                  </div>
                </div>                
                <div>
                  <div className="row">  
                    <div className="col-lg-9 mx-auto">
                      <img className="img-fluid w-100" src="assets/images/check-price.png" alt="images"/>
                    </div>
                  </div> 
                  <div className="text-right">
                    <button type="submit" onClick={() => this.setState({ mobileModal: !this.state.mobileModal})} className="btn btn-deep-primary my-3" data-dismiss="modal" data-target="#mobile-number-modal" data-toggle="modal">proceed</button>
                    </div>
                </div>
              </div> 
            </div>
          </div> 
        </div>
      </div>
    </div>

    {/* Mobile Number */}
<Modal animation={false} show={this.state.mobileModal} onHide={() =>this.setState({ mobileModal: !this.state.mobileModal})}>
        <Modal.Body>
    <div >
      <div className="modal-dialog" role="document">
        <div className="modal-content border-0"> 
          <div className="modal-body py-0">
            <div className="row px-3">
              <div className="col-12 py-lg-4 my-3 p-sm-5 p-3">
                <div className="row">
                  <div className="col-12">
                    
                    <div>
                      <div className="img-holder text-center">
                        <img className="img-fluid" src="assets/images/logo.png" alt="logo"/>
                      </div>
                    </div>
                  </div>
                </div>
                <Formik
                  initialValues={{
                    "phone":"",
                  }}
                  validationSchema={Yup.object().shape({
                    phone: Yup.string()
                      .required('Phone is required')
                      .matches(new RegExp('[0-9]{10}'),"number must be 10 digit"),
                  })}
                  onSubmit={fields => {
                    // same shape as initial values
                    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
                    //  onSubmit={(e) => this.signUp(e)}
                    this.setState({mobileModal: !this.state.mobileModal, verifyOtpModal: !this.state.verifyOtpModal})
                  }}
                  render={({ errors, status, touched }) => (  
                <Form>
                    <div className="row mt-4">
                      
                        <div className="form-group col-12 mt-2">
                        <label htmlFor="mobilenumber" className="font-heading">Enter Mobile Number</label>
                        <div className="input-group mb-3 d-flex phone-group rounded-0">
                            <div className="input-group-prepend">
                            <span className="input-group-text p-0 bg-none" id="mobile-number-group">
                                <select className="form-control custom-select border-0" onChange={(e) => this.setState({ countryCode: e.target.value})} value={this.state.countryCode} name="countryCode" >
                                <option data-countrycode="GB" value="+44">+44</option>
                                <option data-countrycode="US" value="+1">+1</option>
                                <optgroup label="Other countries">
                                    <option data-countrycode="IN" value="+91">+91</option>
                                    <option data-countrycode="DZ" value="213">+213</option>
                                    <option data-countrycode="AD" value="376">+376</option>
                                    <option data-countrycode="AO" value="244">+244</option>
                                    <option data-countrycode="AI" value="1264">+1264</option>
                                    <option data-countrycode="AG" value="1268">+1268</option>
                                    <option data-countrycode="AR" value="54">+54</option>
                                    <option data-countrycode="AM" value="374">+374</option>
                                    <option data-countrycode="AW" value="297">+297</option>
                                    <option data-countrycode="AU" value="61">+61</option>
                                    <option data-countrycode="AT" value="43">+43</option>
                                    <option data-countrycode="AZ" value="994">+994</option>
                                    <option data-countrycode="BS" value="1242">+1242</option>
                                    <option data-countrycode="BH" value="973">+973</option>
                                    <option data-countrycode="BD" value="880">+880</option>
                                    <option data-countrycode="BB" value="1246">+1246</option>
                                    <option data-countrycode="BY" value="375">+375</option>
                                    <option data-countrycode="BE" value="32">+32</option>
                                    <option data-countrycode="BZ" value="501">+501</option>
                                    <option data-countrycode="BJ" value="229">+229</option>
                                    <option data-countrycode="BM" value="1441">+1441</option>
                                    <option data-countrycode="BT" value="975">+975</option>
                                    <option data-countrycode="BO" value="591">+591</option>
                                    <option data-countrycode="BA" value="387">+387</option>
                                    <option data-countrycode="BW" value="267">+267</option>
                                    <option data-countrycode="BR" value="55">+55</option>
                                    <option data-countrycode="BN" value="673">+673</option>
                                    <option data-countrycode="BG" value="359">+359</option>
                                    <option data-countrycode="BF" value="226">+226</option>
                                    <option data-countrycode="BI" value="257">+257</option>
                                    <option data-countrycode="KH" value="855">+855</option>
                                    <option data-countrycode="CM" value="237">+237</option>
                                    <option data-countrycode="CA" value="1">+1</option>
                                    <option data-countrycode="CV" value="238">+238</option>
                                    <option data-countrycode="KY" value="1345">+1345</option>
                                    <option data-countrycode="CF" value="236">+236</option>
                                    <option data-countrycode="CL" value="56">+56</option>
                                    <option data-countrycode="CN" value="86">+86</option>
                                    <option data-countrycode="CO" value="57">+57</option>
                                    <option data-countrycode="KM" value="269">+269</option>
                                    <option data-countrycode="CG" value="242">+242</option>
                                    <option data-countrycode="CK" value="682">+682</option>
                                    <option data-countrycode="CR" value="506">+506</option>
                                    <option data-countrycode="HR" value="385">+385</option>
                                    <option data-countrycode="CU" value="53">+53</option>
                                    <option data-countrycode="CY" value="90392">+90392</option>
                                    <option data-countrycode="CY" value="357">+357</option>
                                    <option data-countrycode="CZ" value="42">+42</option>
                                    <option data-countrycode="DK" value="45">+45</option>
                                    <option data-countrycode="DJ" value="253">+253</option>
                                    <option data-countrycode="DM" value="1809">+1809</option>
                                    <option data-countrycode="DO" value="1809">+1809</option>
                                    <option data-countrycode="EC" value="593">+593</option>
                                    <option data-countrycode="EG" value="20">+20</option>
                                    <option data-countrycode="SV" value="503">+503</option>
                                    <option data-countrycode="GQ" value="240">+240</option>
                                    <option data-countrycode="ER" value="291">+291</option>
                                    <option data-countrycode="EE" value="372">+372</option>
                                    <option data-countrycode="ET" value="251">+251</option>
                                    <option data-countrycode="FK" value="500">+500</option>
                                    <option data-countrycode="FO" value="298">+298</option>
                                    <option data-countrycode="FJ" value="679">+679</option>
                                    <option data-countrycode="FI" value="358">+358</option>
                                    <option data-countrycode="FR" value="33">+33</option>
                                    <option data-countrycode="GF" value="594">+594</option>
                                    <option data-countrycode="PF" value="689">+689</option>
                                    <option data-countrycode="GA" value="241">+241</option>
                                    <option data-countrycode="GM" value="220">+220</option>
                                    <option data-countrycode="GE" value="7880">+7880</option>
                                    <option data-countrycode="DE" value="49">+49</option>
                                    <option data-countrycode="GH" value="233">+233</option>
                                    <option data-countrycode="GI" value="350">+350</option>
                                    <option data-countrycode="GR" value="30">+30</option>
                                    <option data-countrycode="GL" value="299">+299</option>
                                    <option data-countrycode="GD" value="1473">+1473</option>
                                    <option data-countrycode="GP" value="590">+590</option>
                                    <option data-countrycode="GU" value="671">+671</option>
                                    <option data-countrycode="GT" value="502">+502</option>
                                    <option data-countrycode="GN" value="224">+224</option>
                                    <option data-countrycode="GW" value="245">+245</option>
                                    <option data-countrycode="GY" value="592">+592</option>
                                    <option data-countrycode="HT" value="509">+509</option>
                                    <option data-countrycode="HN" value="504">+504</option>
                                    <option data-countrycode="HK" value="852">+852</option>
                                    <option data-countrycode="HU" value="36">+36</option>
                                    <option data-countrycode="IS" value="354">+354</option>
                                    <option data-countrycode="ID" value="62">+62</option>
                                    <option data-countrycode="IR" value="98">+98</option>
                                    <option data-countrycode="IQ" value="964">+964</option>
                                    <option data-countrycode="IE" value="353">+353</option>
                                    <option data-countrycode="IL" value="972">+972</option>
                                    <option data-countrycode="IT" value="39">+39</option>
                                    <option data-countrycode="JM" value="1876">+1876</option>
                                    <option data-countrycode="JP" value="81">+81</option>
                                    <option data-countrycode="JO" value="962">+962</option>
                                    <option data-countrycode="KZ" value="7">+7</option>
                                    <option data-countrycode="KE" value="254">+254</option>
                                    <option data-countrycode="KI" value="686">+686</option>
                                    <option data-countrycode="KP" value="850">+850</option>
                                    <option data-countrycode="KR" value="82">+82</option>
                                    <option data-countrycode="KW" value="965">+965</option>
                                    <option data-countrycode="KG" value="996">+996</option>
                                    <option data-countrycode="LA" value="856">+856</option>
                                    <option data-countrycode="LV" value="371">+371</option>
                                    <option data-countrycode="LB" value="961">+961</option>
                                    <option data-countrycode="LS" value="266">+266</option>
                                    <option data-countrycode="LR" value="231">+231</option>
                                    <option data-countrycode="LY" value="218">+218</option>
                                    <option data-countrycode="LI" value="417">+417</option>
                                    <option data-countrycode="LT" value="370">+370</option>
                                    <option data-countrycode="LU" value="352">+352</option>
                                    <option data-countrycode="MO" value="853">+853</option>
                                    <option data-countrycode="MK" value="389">+389</option>
                                    <option data-countrycode="MG" value="261">+261</option>
                                    <option data-countrycode="MW" value="265">+265</option>
                                    <option data-countrycode="MY" value="60">+60</option>
                                    <option data-countrycode="MV" value="960">+960</option>
                                    <option data-countrycode="ML" value="223">+223</option>
                                    <option data-countrycode="MT" value="356">+356</option>
                                    <option data-countrycode="MH" value="692">+692</option>
                                    <option data-countrycode="MQ" value="596">+596</option>
                                    <option data-countrycode="MR" value="222">+222</option>
                                    <option data-countrycode="YT" value="269">+269</option>
                                    <option data-countrycode="MX" value="52">+52</option>
                                    <option data-countrycode="FM" value="691">+691</option>
                                    <option data-countrycode="MD" value="373">+373</option>
                                    <option data-countrycode="MC" value="377">+377</option>
                                    <option data-countrycode="MN" value="976">+976</option>
                                    <option data-countrycode="MS" value="1664">+1664</option>
                                    <option data-countrycode="MA" value="212">+212</option>
                                    <option data-countrycode="MZ" value="258">+258</option>
                                    <option data-countrycode="MN" value="95">+95</option>
                                    <option data-countrycode="NA" value="264">+264</option>
                                    <option data-countrycode="NR" value="674">+674</option>
                                    <option data-countrycode="NP" value="977">+977</option>
                                    <option data-countrycode="NL" value="31">+31</option>
                                    <option data-countrycode="NC" value="687">+687</option>
                                    <option data-countrycode="NZ" value="64">+64</option>
                                    <option data-countrycode="NI" value="505">+505</option>
                                    <option data-countrycode="NE" value="227">+227</option>
                                    <option data-countrycode="NG" value="234">+234</option>
                                    <option data-countrycode="NU" value="683">+683</option>
                                    <option data-countrycode="NF" value="672">+672</option>
                                    <option data-countrycode="NP" value="670">+670</option>
                                    <option data-countrycode="NO" value="47">+47</option>
                                    <option data-countrycode="OM" value="968">+968</option>
                                    <option data-countrycode="PW" value="680">+680</option>
                                    <option data-countrycode="PA" value="507">+507</option>
                                    <option data-countrycode="PG" value="675">+675</option>
                                    <option data-countrycode="PY" value="595">+595</option>
                                    <option data-countrycode="PE" value="51">+51</option>
                                    <option data-countrycode="PH" value="63">+63</option>
                                    <option data-countrycode="PL" value="48">+48</option>
                                    <option data-countrycode="PT" value="351">+351</option>
                                    <option data-countrycode="PR" value="1787">+1787</option>
                                    <option data-countrycode="QA" value="974">+974</option>
                                    <option data-countrycode="RE" value="262">+262</option>
                                    <option data-countrycode="RO" value="40">+40</option>
                                    <option data-countrycode="RU" value="7">+7</option>
                                    <option data-countrycode="RW" value="250">+250</option>
                                    <option data-countrycode="SM" value="378">+378</option>
                                    <option data-countrycode="ST" value="239">+239</option>
                                    <option data-countrycode="SA" value="966">+966</option>
                                    <option data-countrycode="SN" value="221">+221</option>
                                    <option data-countrycode="CS" value="381">+381</option>
                                    <option data-countrycode="SC" value="248">+248</option>
                                    <option data-countrycode="SL" value="232">+232</option>
                                    <option data-countrycode="SG" value="65">+65</option>
                                    <option data-countrycode="SK" value="421">+421</option>
                                    <option data-countrycode="SI" value="386">+386</option>
                                    <option data-countrycode="SB" value="677">+677</option>
                                    <option data-countrycode="SO" value="252">+252</option>
                                    <option data-countrycode="ZA" value="27">+27</option>
                                    <option data-countrycode="ES" value="34">+34</option>
                                    <option data-countrycode="LK" value="94">+94</option>
                                    <option data-countrycode="SH" value="290">+290</option>
                                    <option data-countrycode="KN" value="1869">+1869</option>
                                    <option data-countrycode="SC" value="1758">+1758</option>
                                    <option data-countrycode="SD" value="249">+249</option>
                                    <option data-countrycode="SR" value="597">+597</option>
                                    <option data-countrycode="SZ" value="268">+268</option>
                                    <option data-countrycode="SE" value="46">+46</option>
                                    <option data-countrycode="CH" value="41">+41</option>
                                    <option data-countrycode="SI" value="963">+963</option>
                                    <option data-countrycode="TW" value="886">+886</option>
                                    <option data-countrycode="TJ" value="7">+7</option>
                                    <option data-countrycode="TH" value="66">+66</option>
                                    <option data-countrycode="TG" value="228">+228</option>
                                    <option data-countrycode="TO" value="676">+676</option>
                                    <option data-countrycode="TT" value="1868">+1868</option>
                                    <option data-countrycode="TN" value="216">+216</option>
                                    <option data-countrycode="TR" value="90">+90</option>
                                    <option data-countrycode="TM" value="7">+7</option>
                                    <option data-countrycode="TM" value="993">+993</option>
                                    <option data-countrycode="TC" value="1649">+1649</option>
                                    <option data-countrycode="TV" value="688">+688</option>
                                    <option data-countrycode="UG" value="256">+256</option>
                                    <option data-countrycode="UA" value="380">+380</option>
                                    <option data-countrycode="AE" value="971">+971</option>
                                    <option data-countrycode="UY" value="598">+598</option>
                                    <option data-countrycode="UZ" value="7">+7</option>
                                    <option data-countrycode="VU" value="678">+678</option>
                                    <option data-countrycode="VA" value="379">+379</option>
                                    <option data-countrycode="VE" value="58">+58</option>
                                    <option data-countrycode="VN" value="84">+84</option>
                                    <option data-countrycode="VG" value="84">+1284</option>
                                    <option data-countrycode="VI" value="84">+1340</option>
                                    <option data-countrycode="WF" value="681">+681</option>
                                    <option data-countrycode="YE" value="969">(+969</option>
                                    <option data-countrycode="YE" value="967">(+967</option>
                                    <option data-countrycode="ZM" value="260">+260</option>
                                    <option data-countrycode="ZW" value="263">+263</option>
                                </optgroup>
                                </select>
                            </span>
                            </div>
                            {/* <input type="text" id="mobilenumber" onChange={(e) => this.setState({ phone: e.target.value})} className="form-control" placeholder="Mobile Number" aria-describedby="mobile-number-group"/> */}
                            <Field name="phone" type="text" placeholder="Mobile Number" className={'form-control' + (errors.phone && touched.phone ? ' is-invalid' : '')} />
                              <ErrorMessage name="phone" component="div" className="invalid-feedback" />
                            
                        </div>
                        </div>    
                    </div>
                    <button type="submit" className="btn btn-deep-primary rounded-0 btn-block">Continue</button>
                    {/* {this.props.user.type === 'MOBILE_VERIFICATION_PENDING' ? <CircularProgress color="secondary" /> : <span></span>} */}
                                 
                  </Form> )} />
                </div> 
            </div>
          </div> 
        </div>
      </div>
    </div>
    </Modal.Body>
    </Modal>

    {/* Verify OTP */}
    <Modal animation={false} show={this.state.verifyOtpModal} onHide={() =>this.setState({ verifyOtpModal: !this.state.verifyOtpModal})}>
        <Modal.Body>
    
                <Formik
                  initialValues={{
                    "phone":"",
                    "otp1":"",
                    "otp2":"",
                    "otp3":"",
                    "otp4":"",
                  }}
                  validationSchema={Yup.object().shape({
                    phone: Yup.string()
                      .required('Phone is required')
                      .matches(new RegExp('[0-9]{10}'),"number must be 10 digit"),
                    otp1: Yup.string()
                      .required(" "),
                      otp2: Yup.string()
                      .required(" "),
                      otp3: Yup.string()
                      .required(" "),
                      otp4: Yup.string()
                      .required(" "),
                  })}
                  onSubmit={fields => {
                    // same shape as initial values
                    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
                    //  onSubmit={(e) => this.signUp(e)}
                    this.setState({ checkPriceModal: !this.state.checkPriceModal, verifyOtpModal: !this.state.verifyOtpModal})
                  }}
                  render={({ errors, status, touched }) => (  
                <Form>
                  <div className="px-0" id="verify-otp-modal" tabIndex="-1" role="dialog" aria-labelledby="verify-otp-modalLabel" aria-hidden="true">
                <div >
                  <div > 
                    <div >
                      <div className="row px-3">
                        <div className="col-12 py-lg-4 my-3 p-sm-5 p-3">
                          <div className="row">
                            <div className="col-12">
                              
                              <div>
                                <div className="img-holder text-center">
                                  <img className="img-fluid" src={"/assets/images/logo.png"} alt="logo"/>
                                </div>
                              </div>
                            </div>
                          </div>          
                            <div className="row mt-4">
                              <div className="form-group col-12 mt-2 mb-0">
                                <h5 className="text-center">Verify OTP</h5>
                                <label htmlFor="mobilenumber" className="font-heading text-center mb-3">We have sent a verification code on our registered
                                  mobile number</label>
                                <div className="disabled-true inputs">
                                  <div className="input-group d-flex phone-group rounded-0">
                                    <div className="input-group-prepend">
                                      <span className="input-group-text p-0 bg-none" id="mobile-number-group">
                                        <select className="form-control custom-select border-0 rounded-0" name="countryCode" >
                                          <option data-countrycode="GB" value="91">+91</option>
                                          <option data-countrycode="US" value="1">+1</option>
                                          <optgroup label="Other countries">
                                            <option data-countrycode="DZ" value="213">+213</option>
                                            <option data-countrycode="AD" value="376">+376</option>
                                            <option data-countrycode="AO" value="244">+244</option>
                                            <option data-countrycode="AI" value="1264">+1264</option>
                                            <option data-countrycode="AG" value="1268">+1268</option>
                                            <option data-countrycode="AR" value="54">+54</option>
                                            <option data-countrycode="AM" value="374">+374</option>
                                            <option data-countrycode="AW" value="297">+297</option>
                                            <option data-countrycode="AU" value="61">+61</option>
                                            <option data-countrycode="AT" value="43">+43</option>
                                            <option data-countrycode="AZ" value="994">+994</option>
                                            <option data-countrycode="BS" value="1242">+1242</option>
                                            <option data-countrycode="BH" value="973">+973</option>
                                            <option data-countrycode="BD" value="880">+880</option>
                                            <option data-countrycode="BB" value="1246">+1246</option>
                                            <option data-countrycode="BY" value="375">+375</option>
                                            <option data-countrycode="BE" value="32">+32</option>
                                            <option data-countrycode="BZ" value="501">+501</option>
                                            <option data-countrycode="BJ" value="229">+229</option>
                                            <option data-countrycode="BM" value="1441">+1441</option>
                                            <option data-countrycode="BT" value="975">+975</option>
                                            <option data-countrycode="BO" value="591">+591</option>
                                            <option data-countrycode="BA" value="387">+387</option>
                                            <option data-countrycode="BW" value="267">+267</option>
                                            <option data-countrycode="BR" value="55">+55</option>
                                            <option data-countrycode="BN" value="673">+673</option>
                                            <option data-countrycode="BG" value="359">+359</option>
                                            <option data-countrycode="BF" value="226">+226</option>
                                            <option data-countrycode="BI" value="257">+257</option>
                                            <option data-countrycode="KH" value="855">+855</option>
                                            <option data-countrycode="CM" value="237">+237</option>
                                            <option data-countrycode="CA" value="1">+1</option>
                                            <option data-countrycode="CV" value="238">+238</option>
                                            <option data-countrycode="KY" value="1345">+1345</option>
                                            <option data-countrycode="CF" value="236">+236</option>
                                            <option data-countrycode="CL" value="56">+56</option>
                                            <option data-countrycode="CN" value="86">+86</option>
                                            <option data-countrycode="CO" value="57">+57</option>
                                            <option data-countrycode="KM" value="269">+269</option>
                                            <option data-countrycode="CG" value="242">+242</option>
                                            <option data-countrycode="CK" value="682">+682</option>
                                            <option data-countrycode="CR" value="506">+506</option>
                                            <option data-countrycode="HR" value="385">+385</option>
                                            <option data-countrycode="CU" value="53">+53</option>
                                            <option data-countrycode="CY" value="90392">+90392</option>
                                            <option data-countrycode="CY" value="357">+357</option>
                                            <option data-countrycode="CZ" value="42">+42</option>
                                            <option data-countrycode="DK" value="45">+45</option>
                                            <option data-countrycode="DJ" value="253">+253</option>
                                            <option data-countrycode="DM" value="1809">+1809</option>
                                            <option data-countrycode="DO" value="1809">+1809</option>
                                            <option data-countrycode="EC" value="593">+593</option>
                                            <option data-countrycode="EG" value="20">+20</option>
                                            <option data-countrycode="SV" value="503">+503</option>
                                            <option data-countrycode="GQ" value="240">+240</option>
                                            <option data-countrycode="ER" value="291">+291</option>
                                            <option data-countrycode="EE" value="372">+372</option>
                                            <option data-countrycode="ET" value="251">+251</option>
                                            <option data-countrycode="FK" value="500">+500</option>
                                            <option data-countrycode="FO" value="298">+298</option>
                                            <option data-countrycode="FJ" value="679">+679</option>
                                            <option data-countrycode="FI" value="358">+358</option>
                                            <option data-countrycode="FR" value="33">+33</option>
                                            <option data-countrycode="GF" value="594">+594</option>
                                            <option data-countrycode="PF" value="689">+689</option>
                                            <option data-countrycode="GA" value="241">+241</option>
                                            <option data-countrycode="GM" value="220">+220</option>
                                            <option data-countrycode="GE" value="7880">+7880</option>
                                            <option data-countrycode="DE" value="49">+49</option>
                                            <option data-countrycode="GH" value="233">+233</option>
                                            <option data-countrycode="GI" value="350">+350</option>
                                            <option data-countrycode="GR" value="30">+30</option>
                                            <option data-countrycode="GL" value="299">+299</option>
                                            <option data-countrycode="GD" value="1473">+1473</option>
                                            <option data-countrycode="GP" value="590">+590</option>
                                            <option data-countrycode="GU" value="671">+671</option>
                                            <option data-countrycode="GT" value="502">+502</option>
                                            <option data-countrycode="GN" value="224">+224</option>
                                            <option data-countrycode="GW" value="245">+245</option>
                                            <option data-countrycode="GY" value="592">+592</option>
                                            <option data-countrycode="HT" value="509">+509</option>
                                            <option data-countrycode="HN" value="504">+504</option>
                                            <option data-countrycode="HK" value="852">+852</option>
                                            <option data-countrycode="HU" value="36">+36</option>
                                            <option data-countrycode="IS" value="354">+354</option>
                                            <option data-countrycode="IN" value="91">+91</option>
                                            <option data-countrycode="ID" value="62">+62</option>
                                            <option data-countrycode="IR" value="98">+98</option>
                                            <option data-countrycode="IQ" value="964">+964</option>
                                            <option data-countrycode="IE" value="353">+353</option>
                                            <option data-countrycode="IL" value="972">+972</option>
                                            <option data-countrycode="IT" value="39">+39</option>
                                            <option data-countrycode="JM" value="1876">+1876</option>
                                            <option data-countrycode="JP" value="81">+81</option>
                                            <option data-countrycode="JO" value="962">+962</option>
                                            <option data-countrycode="KZ" value="7">+7</option>
                                            <option data-countrycode="KE" value="254">+254</option>
                                            <option data-countrycode="KI" value="686">+686</option>
                                            <option data-countrycode="KP" value="850">+850</option>
                                            <option data-countrycode="KR" value="82">+82</option>
                                            <option data-countrycode="KW" value="965">+965</option>
                                            <option data-countrycode="KG" value="996">+996</option>
                                            <option data-countrycode="LA" value="856">+856</option>
                                            <option data-countrycode="LV" value="371">+371</option>
                                            <option data-countrycode="LB" value="961">+961</option>
                                            <option data-countrycode="LS" value="266">+266</option>
                                            <option data-countrycode="LR" value="231">+231</option>
                                            <option data-countrycode="LY" value="218">+218</option>
                                            <option data-countrycode="LI" value="417">+417</option>
                                            <option data-countrycode="LT" value="370">+370</option>
                                            <option data-countrycode="LU" value="352">+352</option>
                                            <option data-countrycode="MO" value="853">+853</option>
                                            <option data-countrycode="MK" value="389">+389</option>
                                            <option data-countrycode="MG" value="261">+261</option>
                                            <option data-countrycode="MW" value="265">+265</option>
                                            <option data-countrycode="MY" value="60">+60</option>
                                            <option data-countrycode="MV" value="960">+960</option>
                                            <option data-countrycode="ML" value="223">+223</option>
                                            <option data-countrycode="MT" value="356">+356</option>
                                            <option data-countrycode="MH" value="692">+692</option>
                                            <option data-countrycode="MQ" value="596">+596</option>
                                            <option data-countrycode="MR" value="222">+222</option>
                                            <option data-countrycode="YT" value="269">+269</option>
                                            <option data-countrycode="MX" value="52">+52</option>
                                            <option data-countrycode="FM" value="691">+691</option>
                                            <option data-countrycode="MD" value="373">+373</option>
                                            <option data-countrycode="MC" value="377">+377</option>
                                            <option data-countrycode="MN" value="976">+976</option>
                                            <option data-countrycode="MS" value="1664">+1664</option>
                                            <option data-countrycode="MA" value="212">+212</option>
                                            <option data-countrycode="MZ" value="258">+258</option>
                                            <option data-countrycode="MN" value="95">+95</option>
                                            <option data-countrycode="NA" value="264">+264</option>
                                            <option data-countrycode="NR" value="674">+674</option>
                                            <option data-countrycode="NP" value="977">+977</option>
                                            <option data-countrycode="NL" value="31">+31</option>
                                            <option data-countrycode="NC" value="687">+687</option>
                                            <option data-countrycode="NZ" value="64">+64</option>
                                            <option data-countrycode="NI" value="505">+505</option>
                                            <option data-countrycode="NE" value="227">+227</option>
                                            <option data-countrycode="NG" value="234">+234</option>
                                            <option data-countrycode="NU" value="683">+683</option>
                                            <option data-countrycode="NF" value="672">+672</option>
                                            <option data-countrycode="NP" value="670">+670</option>
                                            <option data-countrycode="NO" value="47">+47</option>
                                            <option data-countrycode="OM" value="968">+968</option>
                                            <option data-countrycode="PW" value="680">+680</option>
                                            <option data-countrycode="PA" value="507">+507</option>
                                            <option data-countrycode="PG" value="675">+675</option>
                                            <option data-countrycode="PY" value="595">+595</option>
                                            <option data-countrycode="PE" value="51">+51</option>
                                            <option data-countrycode="PH" value="63">+63</option>
                                            <option data-countrycode="PL" value="48">+48</option>
                                            <option data-countrycode="PT" value="351">+351</option>
                                            <option data-countrycode="PR" value="1787">+1787</option>
                                            <option data-countrycode="QA" value="974">+974</option>
                                            <option data-countrycode="RE" value="262">+262</option>
                                            <option data-countrycode="RO" value="40">+40</option>
                                            <option data-countrycode="RU" value="7">+7</option>
                                            <option data-countrycode="RW" value="250">+250</option>
                                            <option data-countrycode="SM" value="378">+378</option>
                                            <option data-countrycode="ST" value="239">+239</option>
                                            <option data-countrycode="SA" value="966">+966</option>
                                            <option data-countrycode="SN" value="221">+221</option>
                                            <option data-countrycode="CS" value="381">+381</option>
                                            <option data-countrycode="SC" value="248">+248</option>
                                            <option data-countrycode="SL" value="232">+232</option>
                                            <option data-countrycode="SG" value="65">+65</option>
                                            <option data-countrycode="SK" value="421">+421</option>
                                            <option data-countrycode="SI" value="386">+386</option>
                                            <option data-countrycode="SB" value="677">+677</option>
                                            <option data-countrycode="SO" value="252">+252</option>
                                            <option data-countrycode="ZA" value="27">+27</option>
                                            <option data-countrycode="ES" value="34">+34</option>
                                            <option data-countrycode="LK" value="94">+94</option>
                                            <option data-countrycode="SH" value="290">+290</option>
                                            <option data-countrycode="KN" value="1869">+1869</option>
                                            <option data-countrycode="SC" value="1758">+1758</option>
                                            <option data-countrycode="SD" value="249">+249</option>
                                            <option data-countrycode="SR" value="597">+597</option>
                                            <option data-countrycode="SZ" value="268">+268</option>
                                            <option data-countrycode="SE" value="46">+46</option>
                                            <option data-countrycode="CH" value="41">+41</option>
                                            <option data-countrycode="SI" value="963">+963</option>
                                            <option data-countrycode="TW" value="886">+886</option>
                                            <option data-countrycode="TJ" value="7">+7</option>
                                            <option data-countrycode="TH" value="66">+66</option>
                                            <option data-countrycode="TG" value="228">+228</option>
                                            <option data-countrycode="TO" value="676">+676</option>
                                            <option data-countrycode="TT" value="1868">+1868</option>
                                            <option data-countrycode="TN" value="216">+216</option>
                                            <option data-countrycode="TR" value="90">+90</option>
                                            <option data-countrycode="TM" value="7">+7</option>
                                            <option data-countrycode="TM" value="993">+993</option>
                                            <option data-countrycode="TC" value="1649">+1649</option>
                                            <option data-countrycode="TV" value="688">+688</option>
                                            <option data-countrycode="UG" value="256">+256</option>
                                            <option data-countrycode="UA" value="380">+380</option>
                                            <option data-countrycode="AE" value="971">+971</option>
                                            <option data-countrycode="UY" value="598">+598</option>
                                            <option data-countrycode="UZ" value="7">+7</option>
                                            <option data-countrycode="VU" value="678">+678</option>
                                            <option data-countrycode="VA" value="379">+379</option>
                                            <option data-countrycode="VE" value="58">+58</option>
                                            <option data-countrycode="VN" value="84">+84</option>
                                            <option data-countrycode="VG" value="84">+1284</option>
                                            <option data-countrycode="VI" value="84">+1340</option>
                                            <option data-countrycode="WF" value="681">+681</option>
                                            <option data-countrycode="YE" value="969">+969</option>
                                            <option data-countrycode="YE" value="967">+967</option>
                                            <option data-countrycode="ZM" value="260">+260</option>
                                            <option data-countrycode="ZW" value="263">+263</option>
                                          </optgroup>
                                        </select>
                                      </span>
                                    </div>
                                    {/* <input type="text" id="mobilenumber" className="form-control" placeholder="Mobile Number" aria-describedby="mobile-number-group"/> */}
                                    <Field name="phone" type="text" placeholder="Mobile Number" className={'form-control' + (errors.phone && touched.phone ? ' is-invalid' : '')} />
                                  <ErrorMessage name="phone" component="div" className="invalid-feedback" />
                            
                                  </div>
                                  <div className="text-right d-flex justify-content-end">
                                    <button type="button" className="btn px-2 edit-details">Edit Number</button>
                                    <button type="button" className="btn px-2 cancel text-danger">Cancel</button>
                                    <button type="button" className="btn px-2 save-details text-green">Save</button>
                                  </div>
                                </div>
                              </div>    
                            </div> 
                          <form method="post" className="digit-group" data-group-name="digits" data-autosubmit="false" autoComplete="off">
                            <div className="form-group col-12 p-0 m-0">
                              <div className="d-flex justify-content-between mb-1">
                                  <Field name="otp1" maxlength="1" type="text" id="digit-1" data-next="digit-2" className={'form-control' + (errors.otp1 && touched.otp1 ? ' is-invalid' : '')} />
                                  <ErrorMessage name="otp1" component="div" className="invalid-feedback" />
                                  <Field name="otp2" type="text"  maxlength="1" id="digit-2" data-next="digit-3" data-previous="digit-1" className={'form-control' + (errors.otp2 && touched.otp2 ? ' is-invalid' : '')} />
                                  <ErrorMessage name="otp2" component="div" className="invalid-feedback" />
                                  <Field name="otp3" type="text"  maxlength="1" id="digit-3" data-next="digit-4" data-previous="digit-2" className={'form-control' + (errors.otp3 && touched.otp3 ? ' is-invalid' : '')} />
                                  <ErrorMessage name="otp3" component="div" className="invalid-feedback" />
                                  <Field name="otp4" type="text"  maxlength="1" id="digit-4" data-next="digit-5" data-previous="digit-3" className={'form-control' + (errors.otp4 && touched.otp4 ? ' is-invalid' : '')} />
                                  <ErrorMessage name="otp4" component="div" className="invalid-feedback" />                           
                                {/* <input className="form-control" type="text" id="digit-1" name="" data-next="digit-2" />
                                <input className="form-control" type="text" id="digit-2" name="" data-next="digit-3" data-previous="digit-1" />
                                <input className="form-control" type="text" id="digit-3" name="" data-next="digit-4" data-previous="digit-2" />
                                <input className="form-control" type="text" id="digit-4" name="" data-next="digit-5" data-previous="digit-3" /> */}
                              </div>
                            </div>
                            <div className="row justify-content-between">
                              <div className="col-auto mb-2">
                                <button type="button" className="btn px-2" id="starttimeragain" data-dismiss="modal" data-target="#verify-otp-modal" data-toggle="modal">Resend</button>
                              </div>
                              <div className="col-auto mb-2">
                                <div id="timer" className="btn px-2" data-timer="02:00"></div>
                              </div>
                            </div>
                            <button type="submit" className="btn btn-deep-primary btn-block rounded-0">Continue</button>
                          </form>
                        </div> 
                      </div>
                    </div> 
                  </div>
                </div>
              </div>
                </Form>
                  )} />
    </Modal.Body>
    </Modal>

    {/* check price form */}

      <Modal animation={false} show={this.state.checkPriceModal} onHide={() =>this.setState({ checkPriceModal: !this.state.checkPriceModal})}>
        <Modal.Body>
    
     <div>
         <div >
           <div className="row px-3">
             <div className="modal-body-right-content py-lg-4 my-1 p-sm-4 p-3">
               <div className="row">
                 <div className="col-12">
                   <button type="button" className="close" onClick={() => this.setState({checkPriceModal: !this.state.checkPriceModal})}>
                     <span aria-hidden="true">&times;</span>
                   </button>
                   <div>
                     <h5 className="mb-4 modal-title">Sign up to check price</h5>
                   </div>
                 </div>
               </div>   
               <Formik
                initialValues={{
                  "firstName":"",
                  "lastName":"",
                  // "referalcode":"",
                  "email":"",
                  "password":"",
                  "confirmedPassword":"",
                  "companyName":"",
                  // "userType":"",
                }}
                validationSchema={SignupSchema}
                onSubmit={fields => {
                  // onSubmit={(e) => this.signIn(e)}
                  this.setState({ checkPriceModal: !this.state.checkPriceModal, successModal: !this.state.successModal})
                    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
                }}
                render={({ errors, status, touched }) => (             
               <Form>
                      <div className="tab-pane fade show active signin-customer" id="signin-customer" role="tabpanel" aria-labelledby="signin-customer-tab">
                          <div className="row">
                            <div className="col-md-6 form-group">
                              <label htmlFor="customerfirstname">First Name <sup className="text-danger">*</sup></label>
                              {/* <input required={true} onChange={(e) => this.setState({ firstName: e.target.value })} type="text" id="customerfirstname" className="form-control" placeholder="Type here" /> */}
                              <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                              <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                            </div>
                            <div className="col-md-6 form-group">
                              <label htmlFor="customerlastname">Last Name <sup className="text-danger">*</sup></label>
                              {/* <input type="text" id="customerlastname" required={true} onChange={(e) => this.setState({ lastName: e.target.value })} className="form-control" placeholder="Type here"/> */}
                              <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                              <ErrorMessage name="lastName" component="div" className="invalid-feedback" />                            
                            </div>
                            
                            <div className="col-md-6 form-group">
                              <label htmlFor="customerpassword">Password<sup className="text-danger">*</sup></label>
                              {/* <input type="text" id="customerpassword" required={true} onChange={(e) => this.setState({ password: e.target.value })}  className="form-control" placeholder="Type here"/> */}
                              <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                              <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            <div className="col-md-6 form-group">
                              <label htmlFor="customerconfirmpassword">Confirm Password<sup className="text-danger">*</sup></label>
                              {/* <input type="text" id="customerconfirmpassword" required={true} onChange={(e) => this.setState({ confirmedPassword: e.target.value })} className="form-control" placeholder="Type here"/> */}
                              <Field name="confirmedPassword" type="password" className={'form-control' + (errors.confirmedPassword && touched.confirmedPassword ? ' is-invalid' : '')} />
                              <ErrorMessage name="confirmedPassword" component="div" className="invalid-feedback" />
                            </div>
                            <div className="col-md-6 form-group">
                              <label htmlFor="customeremailid">Email ID <sup className="text-danger">*</sup></label>
                              {/* <input type="text" id="customeremailid" required={true} onChange={(e) => this.setState({ email: e.target.value })}  className="form-control" placeholder="Type here"/> */}
                              <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                              <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>
                            <div className="col-md-6 form-group">
                              <label htmlFor="customercontactnumber">ReferalCode(if any)</label>
                              {/* <input type="text" id="customercontactnumber" required={true} onChange={(e) => this.setState({ phone: e.target.value })}  className="form-control" placeholder="Type here"/> */}
                              <Field name="referalcode" type="text" className={'form-control' + (errors.referalcode && touched.referalcode ? ' is-invalid' : '')} />
                              {/* <ErrorMessage name="referalcode" component="div" className="invalid-feedback" /> */}
                            </div>
                            <div className="col-12 form-group mb-3">
                            <p className="mb-2">Type</p>
                            <div className="row">
                              <div className="col-auto">
                                <div className="form-check common-radio-inline">
                                  <input className="common-radio-input" type="radio" name="customertypeOptions1" id="customertype1" value="option1" hidden/>
                                  <label className="common-radio-label pl-2" htmlFor="customertype1">Individual</label>
                                </div>
                              </div>
                              <div className="col-auto">
                                <div className="form-check common-radio-inline">
                                  <input className="common-radio-input" type="radio" name="customertypeOptions1" id="customertype2" value="option2" hidden/>
                                  <label className="common-radio-label pl-2" htmlFor="customertype2">Consultant</label>
                                </div>
                              </div>
                              <div className="col-auto">
                                <div className="form-check common-radio-inline">
                                  <input className="common-radio-input" type="radio" name="customertypeOptions1" id="customertype3" value="option3" hidden/>
                                  <label className="common-radio-label pl-2" htmlFor="customertype3">Organisation</label>
                                </div>
                              </div>
                            </div>
                          </div>
                            <div className="col-lg-6 form-group">
                              <label htmlFor="customercompanyname">Company Name</label> 
                              {/* <input type="text" id="customercompanyname" onChange={(e) => this.setState({ companyName: e.target.value })} className="form-control" placeholder="Type here"/> */}
                              <Field name="companyName" type="text" className={'form-control' + (errors.companyName && touched.companyName ? ' is-invalid' : '')} />
                              <ErrorMessage name="companyName" component="div" className="invalid-feedback" />
                            </div>
                            <div className="col-12">
                              <div className="common-checkbox form-check">
                                <input type="checkbox" className="common-checkbox-input form-check-input" id="exampleCheck1"/>
                                <label className="common-checkbox-label form-check-label mb-2 pl-2" htmlFor="exampleCheck1">I agree to the <Link to="terms-and-conditions.html" className="btn-link btn-link-deep-primary">terms and conditions.</Link></label>
                              </div>
                            </div>
                          </div> 
                          <button type="submit" className="btn btn-deep-primary my-3">
                            Submit
                          </button> 
                          {/* <p className="mb-0">Already have an Account?
                           <button style={{all: 'unset', cursor: 'pointer'}} className="btn-line-dark-primary py-1">Sign In</button>
                           </p> */}
                          
                      </div>
                    </Form>
               
                )} />
                </div>
         </div> 
       </div>
     </div>
</Modal.Body>
</Modal>

    {/* indoor outdoor Modal */}
    <div className="modal px-0" id="indoor-outdoor-modal" tabIndex="-1" role="dialog" aria-labelledby="indoor-outdoor-modalLabel" aria-hidden="true">
      <div className="modal-dialog modal-xl" role="document">
        <div className="modal-content border-0"> 
          <div className="modal-body">
            <div className="row">
              <div className="col-12 modal-body-right-content pt-4 px-sm-5 px-2">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <div className="card-body py-0">
                  <ul className="nav nav-pills common-tabs2 mb-3 justify-content-center" id="indoor-outdoor-tab" role="tablist" data-getelement="#modal-body-left-content">
                    <li className="nav-item px-0">
                      <Link className="nav-link h5 px-4 active" id="indoor-tab" data-toggle="pill" to="#indoor" role="tab" aria-controls="indoor" aria-selected="true">INDOOR</Link>
                    </li>
                    <li className="nav-item px-0">
                      <Link className="nav-link h5 px-4" id="outdoor-tab" data-toggle="pill" to="#outdoor" role="tab" aria-controls="outdoor" aria-selected="false">OUTDOOR</Link>
                    </li> 
                  </ul>
                  
                </div> 
              </div>
              <div className="col-12 px-5 py-3">
                <div className="tab-content px-sm-3 px-2" id="indoor-outdoor-tabContent">
                  <div className="tab-pane fade show active" id="indoor" role="tabpanel" aria-labelledby="indoor-tab">
                    <div className="four-card-carousel  owl-carousel">
                      <div className="card custom-card-overlay2 mx-2">
                        <div className="img-holder card-img"><img src={"/assets/images/warehouse/warehouse-indoor-outdoor-modal.png"} alt="warehouse" className="img-fluid w-100"/></div>
                        <div className="card-img-overlay d-flex align-items-end">
                          <div className="card-body px-0 d-flex justify-content-center">
                            <button className="btn-light card-bookmark active-book px-3 py-2 rounded">
                              <p className="card-title mb-0"><i className="fas fa-bookmark"></i> Save this image</p> 
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="card custom-card-overlay2 mx-2">
                        <div className="img-holder card-img"><img src={"/assets/images/warehouse/warehouse-indoor-outdoor-modal.png"} alt="warehouse" className="img-fluid w-100"/></div>
                        <div className="card-img-overlay d-flex align-items-end">
                          <div className="card-body px-0 d-flex justify-content-center">
                            <button className="btn-light card-bookmark active-book px-3 py-2 rounded">
                              <p className="card-title mb-0"><i className="fas fa-bookmark"></i> Save this image</p> 
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="card custom-card-overlay2 mx-2">
                        <div className="img-holder card-img"><img src={"/assets/images/warehouse/warehouse-indoor-outdoor-modal.png"} alt="warehouse" className="img-fluid w-100"/></div>
                        <div className="card-img-overlay d-flex align-items-end">
                          <div className="card-body px-0 d-flex justify-content-center">
                            <button className="btn-light card-bookmark px-3 py-2 rounded">
                              <p className="card-title mb-0"><i className="fas fa-bookmark"></i> Save this image</p> 
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="card custom-card-overlay2 mx-2">
                        <div className="img-holder card-img"><img src={"/assets/images/warehouse/warehouse-indoor-outdoor-modal.png"} alt="warehouse" className="img-fluid w-100"/></div>
                        <div className="card-img-overlay d-flex align-items-end">
                          <div className="card-body px-0 d-flex justify-content-center">
                            <button className="btn-light card-bookmark px-3 py-2 rounded">
                              <p className="card-title mb-0"><i className="fas fa-bookmark"></i> Save this image</p> 
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="card custom-card-overlay2 mx-2">
                        <div className="img-holder card-img"><img src={"/assets/images/warehouse/warehouse-indoor-outdoor-modal.png"} alt="warehouse" className="img-fluid w-100"/></div>
                        <div className="card-img-overlay d-flex align-items-end">
                          <div className="card-body px-0 d-flex justify-content-center">
                            <button className="btn-light card-bookmark px-3 py-2 rounded">
                              <p className="card-title mb-0"><i className="fas fa-bookmark"></i> Save this image</p> 
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div className="tab-pane fade" id="outdoor" role="tabpanel" aria-labelledby="outdoor-tab">
                    <div className="four-card-carousel owl-carousel">
                      <div className="card custom-card-overlay2 mx-2">
                        <div className="img-holder card-img"><img src={"/assets/images/warehouse/warehouse-indoor-outdoor-modal.png"} alt="warehouse" className="img-fluid w-100"/></div>
                        <div className="card-img-overlay d-flex align-items-end">
                          <div className="card-body px-0 d-flex justify-content-center">
                            <button className="btn-light card-bookmark active-book px-3 py-2 rounded">
                              <p className="card-title mb-0"><i className="fas fa-bookmark"></i> Save this image</p> 
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="card custom-card-overlay2 mx-2">
                        <div className="img-holder card-img"><img src={"/assets/images/warehouse/warehouse-indoor-outdoor-modal.png"} alt="warehouse" className="img-fluid w-100"/></div>
                        <div className="card-img-overlay d-flex align-items-end">
                          <div className="card-body px-0 d-flex justify-content-center">
                            <button className="btn-light card-bookmark active-book px-3 py-2 rounded">
                              <p className="card-title mb-0"><i className="fas fa-bookmark"></i> Save this image</p> 
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="card custom-card-overlay2 mx-2">
                        <div className="img-holder card-img"><img src={"/assets/images/warehouse/warehouse-indoor-outdoor-modal.png"} alt="warehouse" className="img-fluid w-100"/></div>
                        <div className="card-img-overlay d-flex align-items-end">
                          <div className="card-body px-0 d-flex justify-content-center">
                            <button className="btn-light card-bookmark px-3 py-2 rounded">
                              <p className="card-title mb-0"><i className="fas fa-bookmark"></i> Save this image</p> 
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="card custom-card-overlay2 mx-2">
                        <div className="img-holder card-img"><img src={"/assets/images/warehouse/warehouse-indoor-outdoor-modal.png"} alt="warehouse" className="img-fluid w-100"/></div>
                        <div className="card-img-overlay d-flex align-items-end">
                          <div className="card-body px-0 d-flex justify-content-center">
                            <button className="btn-light card-bookmark px-3 py-2 rounded">
                              <p className="card-title mb-0"><i className="fas fa-bookmark"></i> Save this image</p> 
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="card custom-card-overlay2 mx-2">
                        <div className="img-holder card-img"><img src={"/assets/images/warehouse/warehouse-indoor-outdoor-modal.png"} alt="warehouse" className="img-fluid w-100"/></div>
                        <div className="card-img-overlay d-flex align-items-end">
                          <div className="card-body px-0 d-flex justify-content-center">
                            <button className="btn-light card-bookmark px-3 py-2 rounded">
                              <p className="card-title mb-0"><i className="fas fa-bookmark"></i> Save this image</p> 
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                
              </div> 
            </div>
          </div> 
        </div>
      </div>
    </div>

     {/* product image modal */}
     <div className="modal fade" id="product-item-show-modal" tabIndex="-1" role="dialog" aria-labelledby="product-item-show-modalTitle" aria-hidden="true">
      <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="product-item-show-modalTitle">Warehouse</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span className="text-warning fa" aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="img-holder">
              <img src={"/assets/images/warehouse/warehouse-details1.png"} alt="productImage" id="product-item-show-large" className="img-fluid w-100"/>
            </div>
          </div>
        </div>
      </div>
     </div>
        </Layout>
    )
    }
}

const mapStateToprops = ({user}, ownprops) => ({user})
export default connect(mapStateToprops, { register, unRegisterUser, verifyUnRegisterUser })(WarehouseDetail);
