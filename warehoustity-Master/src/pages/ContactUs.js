import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
// import BreadcrumbLayout from "../layout/BreadcrumbLayout";
import BrowserTitle from "../components/helper/BrowserTitle";

import { useToasts } from "react-toast-notifications";
import axios from "../api/axios-auth";
import { Modal } from "react-bootstrap";
import "../style/contactus.css";
import "../style/util.css";
import { TOTAL_REQUEST_FOR_WH_BOOKING_CUSTOMER_URL } from "../api/urls";

const ContactUs = () => {
  const { addToast } = useToasts();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loader, setloader] = useState(false);

  const [contact, setcontact] = useState({
    name: "",
    email: "",
    mobile: "",
    enquiry: "",
  });

  const { name, email, mobile, enquiry } = contact;

  const handleChange1 = (name) => (event) => {
    if (name === "mobile") {
      if (event.target.value.length <= 10) {
        setcontact({ ...contact, error: false, [name]: event.target.value });
      }
    } else setcontact({ ...contact, error: false, [name]: event.target.value });
  };
  const handleSubmit1 = (event) => {
    event.preventDefault();
    let obj = {
      data: `
        <h3 style=>Name: ${name}</h3><br/>
        <h3 style=>Email: ${email}</h3><br/>
        <h3 style=>Mobile Number: ${mobile}</h3><br/>
        <h3 style=>Enquiry For: ${enquiry}</h3><br/>
    
        <h4 style=>Cheers!</h4>
        <h4 style=>WHS Team</h4>
        `,
    };
    setloader(TOTAL_REQUEST_FOR_WH_BOOKING_CUSTOMER_URL);
    axios
      .post("/api/v1/user/booknow", obj)
      .then((Response) => {
        let res = JSON.parse(Response.data);
        console.log("rjha", res);
        if (res.statusCode === 200) {
          setModalIsOpen(true);
          // alert("Thank You!")
        } else {
          // setError1(res.message)
          addToast(res.message, { appearance: "error", autoDismiss: true });
        }
        setloader(false);
      })
      .catch((error) => {
        console.log(error);
        setloader(false);
      });

    let cus = {
      name: name,
      email: email,
      phone: mobile,
      companyName: "",
      message: enquiry,
    };

    try {
      axios
        .post(`/api/v1/contactus`, cus)
        .then((response) => {
          let res = JSON.parse(response.data);
          if (res.statusCode === 200) {
          }
        })
        .catch((error) => {})
        .then(() => {});
    } catch (e) {}
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <BrowserTitle title={`Contact Us`} />
      {/* <BreadcrumbLayout title="Contact Us" /> */}

      {/* <CustomerLayout> */}
      <Modal show={modalIsOpen} centered>
        <Modal.Body className="p-0">
          <div className="modal-content custom-modal-content">
            <div className="modal-body custom-modal-body pt-0">
              <div className="text-center mt-4">
                <p className="brand-color h6-max-xxs font-weight-bold h5">
                  Thank You For Contacting Us!
                </p>
                <h6 className="h6-max-xxs font-weight-medium">
                  Your Info has been recorded!
                </h6>
                {/* <h6 className="h6-max-xxs font-weight-medium">Please Login again.</h6> */}
              </div>
            </div>
            <div className="col-sm-8 mx-auto mb-4">
              <button
                onClick={() => {
                  setcontact({
                    name: "",
                    email: "",
                    mobile: "",
                    enquiry: "",
                  });
                  setModalIsOpen(false);
                }}
                className="btn btn-deep-primary btn-block mb-4"
              >
                Ok
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* ====================================================== */}

      <section>
        <div className="container-fluid px-0 blog-details-banner contact-us-banner">
          <div className="row">
            <div className="banner-top ">
              <div
                className="bg-img-banner pb-0 pt-4"
                style={{
                  backgroundImage: "url(https://warehousity.com/wp-content/uploads/2015/12/warehousing.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className=" overlay-dark-bottom ">
                  <div className="container">
                    <div
                      className="row position-relative"
                      style={{ zIndex: "99" }}
                    >
                      <div className="col-12 text-center">
                        <h4 className="text-white font-weight-bold fs-34px pt-5">
                          Contact Us
                        </h4>

                        <nav aria-label="breadcrumb bg-transparent text-white">
                          <ol class="bg-transparent breadcrumb justify-content-center">
                            <li class="breadcrumb-item">
                              <a href="/" className="text-white">
                                Home
                              </a>
                            </li>
                            <li
                              class="breadcrumb-item active text-white font-weight-bold"
                              aria-current="page"
                            >
                              Contact Us
                            </li>
                          </ol>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 align-self-center order-md-1 order-2">


              <div className="row mx-auto justify-content-center">

              <div className="dis-flex size1 mb-2 align-self-center bg-white p-3 shadow-sm rounded-3 border ">
                  <div className="txt1 p-r-25">
                  <i className="fas fa-phone mr-2 text-warning fs-3"></i>
                  </div>

                  <div className="flex-col size2">
                    <span className="txt1 p-b-20 text-dark">PHONE</span>

                    <span className="txt3 text-dark">
                      {" "}
                     +91-7677180180
                    </span>
                  </div>
                </div>

                <div className="size1 mb-2 align-self-center bg-white p-3 shadow-sm w-100 rounded-3 border d-flex">
                  <div className="txt1 p-r-25">
                  <i className="fas fa-map-marker-alt mr-2 text-warning fs-3"></i>
                  </div>

                  <div className="flex-col size2 ">
                    <span  pan className="txt1 p-b-20 text-dark">ADDRESS</span>

                    <span className="txt3 text-dark">
                      {/* <i className="fas fa-map-marker-alt mr-2 text-dark"></i> */}
                      Warehousity, Plot 10, LSC, 2, Sector 6 Dwarka, New
                      Delhi 110075
                    </span>
                  </div>
                </div>
                <div className="dis-flex size1 mb-2 align-self-center bg-white p-3 shadow-sm rounded-3 border">
                  <div className="txt1 p-r-25">
                  {" "}
                      <i className="fas fa-envelope-square mr-2 text-warning fs-3"></i>
                  </div>

                  <div className="flex-col size2 mb-2">
                    <span className="txt1 p-b-20 text-dark ">EMAIL</span>

                    <span className="txt3 text-dark">
                  {" "}
                      sales@warehousity.com
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8 d-flex order-md-2 order-1">
              <form
                onSubmit={handleSubmit1}
                className="contact-form card border px-3 py-3  validate-form border-0"
              >
                <span className="contact100-form-title text-start">
                  Send Us A Message
                </span>
                <div className="row">
                  <div className="col-12">
                    <div className="form-group mb-0 pb-1">
                      <div className="row">
                        <div className="col-12 pb-2 mb-2">
                          <input
                            title="Please enter on alphabets only. "
                            pattern="^[A-Za-z -]+$"
                            maxlength="25"
                            oninvalid="setCustomValidity('Please enter on alphabets only. ')"
                            value={name}
                            onChange={handleChange1("name")}
                            required={true}
                            type="text"
                            className="form-control custom-form py-4"
                            id="name"
                            placeholder="Name"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 pb-2 mb-2">
                    <div className="form-group mb-0 pb-1">
                      <div className="row">
                        <div className="col-12">
                          <input
                            value={mobile}
                            onChange={handleChange1("mobile")}
                            name="phoneNumber"
                            id="phoneNumber"
                            title="Please use a 10 digit telephone number with no dashes or dots"
                            pattern="[0-9]{10}"
                            maxLength={10}
                            minLength={10}
                            required={true}
                            type="tel"
                            className="form-control custom-form py-4"
                            placeholder="Mobile Number"
                          />
                        </div>
                      </div>

                      {/* <input required={true} type="tel" name="phoneNumber" id="phoneNumber" title="Please use a 10 digit telephone number with no dashes or dots" pattern="[0-9]{10}"  maxLength={10} minLength={10} className="form-control custom-form"  placeholder="Enter Your Mobile Number"/> */}
                    </div>
                  </div>
                  <div className="col-lg-6 pb-2 mb-2">
                    <div className="form-group mb-0 pb-1">
                      <div className="row">
                        <div className="col-12">
                          <input
                            value={email}
                            onChange={handleChange1("email")}
                            required={true}
                            type="text"
                            pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
                            title="Please Enter Valid Email"
                            className="form-control custom-form py-4"
                            id="email"
                            placeholder="E-Mail Address"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 pb-2">
                    <div className="form-group mb-0 pb-1">
                      <div className="row">
                        <div className="col-12">
                          {/* <textarea
                          value={enquiry}
                          onChange={handleChange1("enquiry")}
                          required={true}
                          className="form-control"
                          id="contacttext"
                          placeholder="Enter Your Enquiry"
                          rows="4"
                        ></textarea> */}

                          <div
                            className="wrap-input100 validate-input"
                            data-validate="Message is required"
                          >
                            <textarea
                              id="message"
                              className="input100 form-control custom-form"
                              name="message"
                              value={enquiry}
                              onChange={handleChange1("enquiry")}
                              required={true}
                              placeholder="Write us a message"
                            ></textarea>
                            <span className="focus-input100"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <aside className="text-right">
                  <button
                    type="submit"
                    className="btn btn-deep-primary text-white contact-button text-right"
                    disabled={loader}
                    style={{
                      fontSize:"14px"
                    }}
                  >
                    Send Message
                  </button>
                </aside>
              </form>
            </div>
          </div>
        </div>
      </section>

      <div
        className=" mt-5 pt-3 d-none"
        style={{ backgroundImage: "url('/assets/images/contactus.jpg')" }}
      >
        <div className="container py-5">
          <div className="row no-gutters justify-content-center">
            <div className="col-lg-12 order-md-1 order-3 mb-md-0 mb-3 ">
              <div
                className="contact100-more w-100"
                //   style="background-image: url('images/bg-01.jpg');"
                style={{
                  backgroundImage: "url('/assets/images/contactus.jpg')",
                }}
              >
                <div className="row mx-auto justify-content-center">
                  <div className="flex-w size1 mb-2 align-self-center">
                    <div className="txt1 p-r-25">
                      <span className="lnr lnr-map-marker"></span>
                    </div>

                    <div className="flex-col size2">
                      <span className="txt1 p-b-20">ADDRESS</span>

                      <span className="txt3">
                        <i className="fas fa-map-marker-alt mr-2"></i>
                        Warehousity, Plot 10, LSC, 2, Sector 6 Dwarka, Dwarka,
                        New Delhi, Delhi 110075
                      </span>
                    </div>
                  </div>

                  <div className="dis-flex size1 mb-2 align-self-center">
                    <div className="txt1 p-r-25">
                      <span className="lnr lnr-phone-handset"></span>
                    </div>

                    <div className="flex-col size2">
                      <span className="txt1 p-b-20">PHONE</span>

                      <span className="txt3">
                        {" "}
                        <i className="fas fa-phone mr-2"></i> +91-7677180180
                      </span>
                    </div>
                  </div>

                  <div className="dis-flex size1 mb-2 align-self-center">
                    <div className="txt1 p-r-25">
                      <span className="lnr lnr-envelope"></span>
                    </div>

                    <div className="flex-col size2 mb-2">
                      <span className="txt1 p-b-20">EMAIL</span>

                      <span className="txt3">
                        {" "}
                        <i className="fas fa-envelope-square mr-2"></i>{" "}
                        sales@warehousity.com
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 d-flex order-md-2 order-1">
              <img
                className="d-none d-md-block img-fluid"
                src="assets/images/Contact-Us.jpeg"
                alt="contanct img  "
              />
            </div>
            <div className="col-lg-6 d-flex order-md-3 order-2">
              <form
                onSubmit={handleSubmit1}
                className="contact-form card border px-3 py-3  validate-form"
              >
                <span className="contact100-form-title">Send Us A Message</span>
                <div className="row">
                  <div className="col-12">
                    <div className="form-group mb-0 pb-1">
                      <div className="row">
                        <div className="col-12 pb-2">
                          <input
                            title="Please enter on alphabets only. "
                            pattern="^[A-Za-z -]+$"
                            oninvalid="setCustomValidity('Please enter on alphabets only. ')"
                            value={name}
                            onChange={handleChange1("name")}
                            required={true}
                            type="text"
                            className="form-control custom-form"
                            id="name"
                            placeholder="Name"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 pb-2">
                    <div className="form-group mb-0 pb-1">
                      <div className="row">
                        <div className="col-12">
                          <input
                            value={mobile}
                            onChange={handleChange1("mobile")}
                            name="phoneNumber"
                            id="phoneNumber"
                            title="Please use a 10 digit telephone number with no dashes or dots"
                            pattern="[0-9]{10}"
                            maxLength={10}
                            minLength={10}
                            required={true}
                            type="number"
                            className="form-control custom-form"
                            placeholder="Mobile Number"
                          />
                        </div>
                      </div>

                      {/* <input required={true} type="tel" name="phoneNumber" id="phoneNumber" title="Please use a 10 digit telephone number with no dashes or dots" pattern="[0-9]{10}"  maxLength={10} minLength={10} className="form-control custom-form"  placeholder="Enter Your Mobile Number"/> */}
                    </div>
                  </div>
                  <div className="col-12 pb-2">
                    <div className="form-group mb-0 pb-1">
                      <div className="row">
                        <div className="col-12">
                          <input
                            value={email}
                            onChange={handleChange1("email")}
                            required={true}
                            type="text"
                            pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
                            title="Please Enter Valid Email"
                            className="form-control custom-form"
                            id="email"
                            placeholder="E-Mail Address"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 pb-2">
                    <div className="form-group mb-0 pb-1">
                      <div className="row">
                        <div className="col-12">
                          {/* <textarea
                          value={enquiry}
                          onChange={handleChange1("enquiry")}
                          required={true}
                          className="form-control"
                          id="contacttext"
                          placeholder="Enter Your Enquiry"
                          rows="4"
                        ></textarea> */}

                          <div
                            className="wrap-input100 validate-input"
                            data-validate="Message is required"
                          >
                            <textarea
                              id="message"
                              className="input100"
                              name="message"
                              value={enquiry}
                              onChange={handleChange1("enquiry")}
                              required={true}
                              placeholder="Write us a message"
                            ></textarea>
                            <span className="focus-input100"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <aside className="text-right">
                  <button
                    type="submit"
                    className="btn btn-warning text-white contact-button text-right"
                    disabled={loader}
                  >
                    Send Message
                  </button>
                </aside>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}

      {/* <div className="container pb-4 px-md-0 pl-sm-3  text-justify">
        <div className="row">
          <div className="col-md-6 col-12">
            <form
              onSubmit={handleSubmit1}
              className="contact-form card border px-3 py-3"
            >
              <div className="row">
                <div className="col-12">
                  <div className="form-group mb-0 pb-1">
                    <div className="row">
                      <div className="col-md-4 col-12">
                        <label for="name">
                          Your Name<span>*</span>
                        </label>
                      </div>
                      <div className="col-md-8 col-12">
                        <input
                          title="Please enter on alphabets only. "
                          pattern="^[A-Za-z -]+$"
                          oninvalid="setCustomValidity('Please enter on alphabets only. ')"
                          value={name}
                          onChange={handleChange1("name")}
                          required={true}
                          type="text"
                          className="form-control custom-form"
                          id="name"
                          placeholder="Enter Your Name"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-group mb-0 pb-1">
                    <div className="row">
                      <div className="col-md-4 col-12">
                        <label for="phone">
                          Your Mobile Number<span>*</span>
                        </label>
                      </div>
                      <div className="col-md-8 col-12">
                        <input
                          value={mobile}
                          onChange={handleChange1("mobile")}
                          name="phoneNumber"
                          id="phoneNumber"
                          title="Please use a 10 digit telephone number with no dashes or dots"
                          pattern="[0-9]{10}"
                          maxLength={10}
                          minLength={10}
                          required={true}
                          type="tel"
                          className="form-control custom-form"
                          placeholder="Mobile Number"
                        />
                      </div>
                    </div>

                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group mb-0 pb-1">
                    <div className="row">
                      <div className="col-md-4 col-12">
                        <label for="email">
                          Your E-Mail Address<span></span>
                        </label>
                      </div>
                      <div className="col-md-8 col-12">
                        <input
                          value={email}
                          onChange={handleChange1("email")}
                          required={true}
                          type="text"
                          pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
                          title="Please Enter Valid Email"
                          className="form-control custom-form"
                          id="email"
                          placeholder="Enter Your E-Mail Address"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group mb-0 pb-1">
                    <div className="row">
                      <div className="col-md-4 col-12">
                        <label for="contacttext">
                          Your Enquiry<span>*</span>
                        </label>
                      </div>
                      <div className="col-md-8 col-12">
                        <textarea
                          value={enquiry}
                          onChange={handleChange1("enquiry")}
                          type="text"
                          required={true}
                          className="form-control"
                          id="contacttext"
                          placeholder="Enter Your Enquiry"
                          rows="4"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <aside className="text-right">
                <button
                  type="submit"
                  className="btn btn-primary contact-button text-right"
                >
                  Submit
                </button>
              </aside>
            </form>
          </div>
          <div className="col-md-6 col-12 px-4 ">
            <div className="card border p-4">
              <h2>
                <u className="text-capitalize">Registered Office</u>
              </h2>
              <h6 className="font-weight-bold mt-1">
                <i className="fas fa-home mr-2"></i>
                Warehousity, Plot 10, LSC, 2, Sector 6 Dwarka, Dwarka, New
                Delhi, Delhi 110075
              </h6>
              <h6 className="font-weight-bold">
                <i className="fas fa-envelope-square mr-2"></i>{" "}
                sales@warehousity.com
              </h6>
              <h6 className="font-weight-bold">
                {" "}
                <i className="fas fa-phone mr-2"></i> +91-7677180180{" "}
              </h6>
            </div>
          </div>
        </div>
      </div> */}

      {/* </CustomerLayout> */}
    </Layout>
  );
};

export default ContactUs;
