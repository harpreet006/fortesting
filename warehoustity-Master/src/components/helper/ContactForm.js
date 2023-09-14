import React, { useState } from "react";
import axiosauth from "../../api/axios-auth";
import { useHistory } from "react-router";
import { Modal } from "react-bootstrap";

const ContactForm = ({ location }) => {
  const history = useHistory();
  const [loader, setloader] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    message: "",
  });

  // const handlerChange = (e) => {
  //   setContact({ ...contact, [e.target.name]: e.target.value });
  // };

  const handlerChange = (name) => (event) => {
    if (name === "phone") {
      if (event.target.value.length <= 10) {
        setContact({ ...contact, error: false, [name]: event.target.value });
      }
    } else setContact({ ...contact, error: false, [name]: event.target.value });
  };

  const { name, email, phone, message } = contact;

  // useEffect(() => {
  //     setContact({ ...contact, message: `Oops! Currently we are unable to serve you in ${location}. Please help us to understand your requirements to serve you better.` })
  // }, [location, contact])

  const formSumbit = (e) => {
    e.preventDefault();
    setloader(true);
    setSuccessMessage(true)
    try {
      axiosauth
        .post(`/api/v1/contactus`, contact)
        .then((response) => {
          let res = JSON.parse(response.data);
          if (res.statusCode === 200) {
            setloader(false);
            // setTimeout(() => {
            //   setSuccessMessage(false);
            
            // }, 5000);
          }
        })
        .catch((error) => {})
        .then(() => {
          setloader(false);
        });
    } catch (e) {}
  };

  return (
    <div className="form-section pt-0">
      {/* <div className="row">
        <div className="col-md-12 text-center">
          <b>Please fill specific requirements.</b>
        </div>
      </div> */}


<Modal show={successMessage} centered>
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
               onClick={()=>{
                setSuccessMessage(false)
                 history.push("/warehouse?page=1")}}
                className="btn btn-deep-primary btn-block mb-4"
              >
                Ok
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* =========================================== */}

      <div
        className="container-contact100"
        style={{ backgroundImage: "url('/assets/images/contactus.jpg')", minHeight:"10vh" }}
      >
        <div className="wrap-contact100">
          <form
            onSubmit={formSumbit}
            className="contact-form card border px-3 py-3 contact100-form validate-form pt-5"
          >
            <span className="contact100-form-title">Send Us A Message </span>
            <div className="row">
              <div className="col-12">
                <div className="form-group mb-0 pb-1">
                  <div className="row">
                    <div className="col-12">
                      <input
                        title="Please enter on alphabets only. "
                        pattern="^[A-Za-z -]+$"
                        oninvalid="setCustomValidity('Please enter on alphabets only. ')"
                        value={name}
                        onChange={handlerChange("name")}
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
              <div className="col-12">
                <div className="form-group mb-0 pb-1">
                  <div className="row">
                    <div className="col-12">
                      <input
                        value={phone}
                        onChange={handlerChange("phone")}
                        name="phone"
                        id="phoneNumber"
                        title="Please use a 10 digit telephone number with no dashes or dots"
                        pattern="[0-9]{10}"
                        maxLength={10}
                        minLength={10}
                        required={true}
                        type="tel"
                        className="form-control custom-form"
                        placeholder="Phone Number"
                      />
                    </div>
                  </div>

                  {/* <input required={true} type="tel" name="phoneNumber" id="phoneNumber" title="Please use a 10 digit telephone number with no dashes or dots" pattern="[0-9]{10}"  maxLength={10} minLength={10} className="form-control custom-form"  placeholder="Enter Your Mobile Number"/> */}
                </div>
              </div>
              <div className="col-12">
                <div className="form-group mb-0 pb-1">
                  <div className="row">
                    <div className="col-12">
                      <input
                        value={email}
                        onChange={handlerChange("email")}
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
              <div className="col-12">
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
                          value={message}
                          onChange={handlerChange("message")}
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
                className="btn btn-deep-primary contact-button text-right"
                disabled={loader}
              >
                Send Message
              </button>
            </aside>
          </form>
          <div
            className="contact100-more flex-col-c-m"
            //   style="background-image: url('images/bg-01.jpg');"
            style={{ backgroundImage: "url('/assets/images/contactus.jpg')" }}
          >
            <div className="flex-w size1 p-b-47 ">
              <div className="txt1 p-r-25">
                <span className="lnr lnr-map-marker"></span>
              </div>

              <div className="flex-col size2 ">
                <span className="txt1 p-b-20">ADDRESS</span>

                <span className="txt3">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  Warehousity, Plot 10, LSC, 2, Sector 6 Dwarka, Dwarka, New
                  Delhi, Delhi 110075
                </span>
              </div>
            </div>
            <div className="dis-flex size1 p-b-47 ">
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
            <div className="dis-flex size1 p-b-47 ">
              <div className="txt1 p-r-25">
                <span className="lnr lnr-envelope"></span>
              </div>
              <div className="flex-col size2">
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
      {/* ============================================== */}
      {/* <div className="row">
        <div className="col-md-6 col-12 m-auto">
          <form onSubmit={formSumbit} className="row p-2">
            <div className="col-md-12 form-group">
              <input
                onChange={handlerChange}
                type="text"
                title="Please enter on alphabets only. "
                pattern="^[A-Za-z -]+$"
                oninvalid="setCustomValidity('Please enter on alphabets only. ')"
                className="form-control"
                name="name"
                id="name"
                placeholder="Name"
                required="required"
              />
            </div>
            <div className="col-md-12 form-group">
              <input
                onChange={handlerChange}
                type="text"
                pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
                title="Please Enter Valid Email"
                className="form-control"
                name="email"
                id="email"
                placeholder="Email"
                required="required"
              />
            </div>
            <div className="col-md-12 form-group">
              <input
                onChange={handlerChange}
                name="phone"
                id="phoneNumber"
                title="Please use a 10 digit telephone number with no dashes or dots"
                pattern="[0-9]{10}"
                maxLength={10}
                minLength={10}
                required={true}
                type="tel"
                className="form-control"
                placeholder="Phone Number"
              />
            </div>
            <div className="col-md-12 form-group">
          <input
            onChange={handlerChange}
            type="text"
            className="form-control"
            name="companyName"
            id="phone"
            placeholder="Company Name"
            required="required"
          />
        </div>
            <div className="col-md-12 form-group">
              <textarea
                onChange={handlerChange}
                value={contact.message}
                name="message"
                id="message"
                className="form-control"
                rows={4}
                placeholder="Your  specific requirements"
                required="required"
                // value={`Oops! Currently we are unable to serve you in ${location}. Please help us to understand your requirements to serve you better.`}
              />
            </div>
            <div
              className="col-md-12 form-group"
              style={{ textAlign: "right" }}
            >
              <button
                type="submit"
                name="add_requirements"
                className="btn btn-outline-dark popup-btn button-all"
              >
                Submit
              </button>
            </div>
            {successMessage && (
              <span className="text-primary">{successMessage}</span>
            )}
          </form>
        </div>
      </div> */}
    </div>
  );
};

export default ContactForm;
