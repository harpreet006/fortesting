import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import BreadcrumbLayout from "../layout/BreadcrumbLayout";
import BrowserTitle from "../components/helper/BrowserTitle";
import { useHistory } from "react-router";
import { useToasts } from "react-toast-notifications";
// import axios from '../api/axios-auth';
import { Modal } from "react-bootstrap";

const Feedback = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { addToast } = useToasts();
  const history = useHistory();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [profile, setProfile] = useState({
    firstName: "",
    name: "",
    email: "",
  });
  const { firstName, name, email } = profile;
  const handleChange1 = (name) => (event) => {
    setProfile({ ...profile, error: false, [name]: event.target.value });
  };
  const onSubmit = async (event) => {
    console.log("OnSubmit===>");
    event.preventDefault();

    var url = "http://139.59.13.212:8080/api/v1/user/booknow";

    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: `
        <h1 style="color: #5b5b5b;">Name : ${name}</h1>  
        <h1 style="color: #5b5b5b;">Email : ${email}</h1>  

          <h1 style="color: #5b5b5b;">Note : ${firstName}</h1>  
          <h4 style="color: #757575;">Thanks & Regards!</h4>
          <h4 style="color: #757575;">WHS Team</h4>
          `,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.statusCode === 200) {
          setModalIsOpen(true);
        } else {
          addToast(res.message, { appearance: "error", autoDismiss: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Layout>
      <BrowserTitle title={`Feedback`} />
      {/* <BreadcrumbLayout title="Feedback" /> */}
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
                  setProfile({
                    firstName: "",
                    name: "",
                    email: "",
                  });
                  setModalIsOpen(false);
                  history.replace("/");
                }}
                className="btn btn-deep-primary btn-block mb-4"
              >
                Ok
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <section class="my-5 px-lg-5 px-md-4 px-3 pt-5">
        <div className="pt-0">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 mb-4 text-center">
              <div>
                  <h1 className="hjrjr" style={{ fontFamily: "serif" }}>
                    Give Us Feedback
                  </h1>
                  <p className="hello" style={{fontSize:"20px"}}>
                    Drop a note and we will get back to you as quickly as
                    possible:{" "}
                  </p>
                </div>
              </div>
              <div className="col-lg-6 border">
                <img className="h-100 rounded-3" src="https://pictures.alignable.com/eyJidWNrZXQiOiJhbGlnbmFibGV3ZWItcHJvZHVjdGlvbiIsImtleSI6ImV2ZW50cy9waWN0dXJlcy9tZWRpdW0vMTUwMzIyLzE1MDI5OTU5NjNfYmxvYiIsImVkaXRzIjp7fX0=" alt="img" />
              </div>
              <div className="col-lg-6">
                
                <form onSubmit={onSubmit} className="border p-3 rounded-3">
                  <div class="form-group">
                    <label for="name">
                      Your Name<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      title="Please enter on alphabets only. "
                      pattern="^[A-Za-z -]+$"
                      oninvalid="setCustomValidity('Please enter on alphabets only. ')"
                      value={name}
                      onChange={handleChange1("name")}
                      required={true}
                      type="text"
                      class="form-control custom-form"
                      id="name"
                      placeholder="Enter Your Name"
                    />
                  </div>

                  <div class="form-group">
                    <label for="email">
                      Your E-Mail Address<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      value={email}
                      onChange={handleChange1("email")}
                      required={true}
                      type="text"
                      pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
                      title="Please Enter Valid Email"
                      class="form-control custom-form"
                      id="email"
                      placeholder="Enter Your E-Mail Address"
                    />
                  </div>

                  <div>
                    <label for="name">
                      Note<span style={{ color: "red" }}>*</span>
                    </label>

                    <textarea
                      type="text"
                      name="FirstName"
                      placeholder="Note"
                      class="form-control input-area"
                      value={firstName}
                      rows={3}
                      required
                      style={{ marginBottom: "20px" }}
                      onChange={handleChange1("firstName")}
                    />
                  </div>

                  <div
                    type="submit"
                    className="submit mb-2"
                    style={{borderRadius: 6 }}
                     
                  >
                    <button
                      className="feed-btn btn btn-deep-primary px-5"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* </CustomerLayout> */}
    </Layout>
  );
};

export default Feedback;
