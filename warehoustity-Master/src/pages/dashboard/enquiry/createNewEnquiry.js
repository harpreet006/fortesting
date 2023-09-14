import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosauth from "../../../api/axios-auth";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { isPending } from "../../../store/actions/vendor/warehouseList";
import { enguiryByPage } from "../../../store/actions/customer/enquiryAction";
import { serviceCategoryByPage } from "../../../store/actions/serviceAction";

const EnquirySchema = Yup.object().shape({
  serviceType: Yup.string()
    .min(1, "Too Short!")
    .max(50, "Too Long!")
    .required("serviceType is required"),
  message: Yup.string()
    .min(5, "Too Short!")
    .max(500, "Max 500 Character!")
    .required("message is required"),
});

function EnquirySchemaMoal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body style={{ textAlign: "center" }}>
        <img
          src={"/assets/images/unnamed.jpg"}
          className="size-150px p-4 mx-auto"
          alt="success"
        />
        <h6>Thank you for your enquiry!</h6>
        <h6>The ticket #{props.tokenId} has been generated.</h6>
        <Button className="my-3" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Body>
    </Modal>
  );
}

const CreateNewEnquiry = ({ pageCount }) => {
  const dispatch = useDispatch();
  // const history = useHistory();
  const [equiryModal, setEnquiryModal] = useState(false);
  const data = useSelector((state) => state.WAREHOUSELIST);
  const serviceData = useSelector((state) => state.SERVICEINFO);
  const read = useSelector((state) => state.SIDEMENU_INFO.read_only);
  const [tokenId, setTokenId] = useState("");

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    dispatch(serviceCategoryByPage());
  }, [dispatch]);

  return (
    <>
      {equiryModal && (
        <EnquirySchemaMoal
          show={equiryModal}
          tokenId={tokenId}
          onHide={() => {
            setEnquiryModal(false);
            setTokenId("");
            dispatch(enguiryByPage(parseInt(pageCount)));
            // window.location.href = "/manageenquiry?page=1";
          }}
        />
      )}

      {/* <CustomerLayout title="Create New Enquiry"> */}
      <div className="row">
        <div className=" view-enquiry-details mt-2 bg-white">
          {/* <div className="border-bottom mb-4 d-sm-flex justify-content-between">
              <div>
                <button className="btn px-0 text-gray font-weight-bold mr-3">
                  <i
                    onClick={() => history.goBack()}
                    className="fas fa-chevron-left pr-3"
                  ></i>
                  New Enquiry
                </button>
              </div>
            </div> */}
          <div className="">
            <div className="col-12 px-md-4 bg-white shadow-sm my-2 border">
              <Formik
                initialValues={{
                  name: "",
                  serviceType: "",
                  companyName: "",
                  message: "",
                  phone: "",
                  email: "",
                }}
                validationSchema={EnquirySchema}
                onSubmit={(fields, { resetForm }) => {
                  console.log("hello")
                  dispatch(isPending(true));
                  fields.userType = "customer";
                  axiosauth
                    .post("/api/v1/enquiry", fields)
                    .then((response) => {
                      let res = JSON.parse(response.data);
                      if (res.statusCode === 200) {
                        resetForm();
                        setTokenId(res.data?.ticketId);
                        dispatch(isPending(false));
                        setEnquiryModal(true);
                      } else {
                        dispatch(isPending(false));
                      }
                    })
                    .catch((error) => {})
                    .then(() => {});
                }}
                render={({ errors, status, touched, values }) => (
                  <Form className="my-4">
                    <div className="row mx-0 align-items-end">
                      <div className="form-group px-0 col-lg-6 ">
                        <label
                          htmlFor="serviceType"
                          className="pb-2"
                          style={{ display: "block" }}
                        >
                          Select Service
                        </label>
                        <Field
                          as="select"
                          disabled={read}
                          name="serviceType"
                          type="text"
                          component="select"
                          className={
                            "form-control form-control-md custom-select" +
                            (errors.serviceType && touched.serviceType
                              ? " is-invalid"
                              : "")
                          }
                        >
                          <option value="">Service looking for</option>

                          {serviceData.categoryList &&
                            serviceData.categoryList.length > 0 &&
                            serviceData.categoryList.map((item, index) => {
                              return (
                                <option key={index} value={item.name}>
                                  {item.name}
                                </option>
                              );
                            })}

                          <option value="Other Support">Others</option>
                        </Field>
                        <ErrorMessage
                          name="serviceType"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>

                      {/* <div className="col-lg-6 text-right mb-3">
                        <div className="d-lg-block d-none">
                          <div className={`text-right ${read ? "d-none" : ""}`}> */}
                            {/* <button
                              className="btn btn-deep-primary py-1"
                              type="submit"
                            >
                              Submittttttttttttt
                              {data.isPending ? (
                                <Spinner animation="border" />
                              ) : null}
                            </button> */}
                            {/* <p className="pt-2 text-gray">
                        Our representive will get back to you within next
                        working day{" "}
                      </p> */}
                          {/* </div>
                        </div>
                      </div> */}
                    </div>

                    {/* <div className="form-group">
                        <Field disabled={read} name="name" type="text" placeholder="Enter your name" className={'form-control form-control-md' + (errors.name && touched.name ? ' is-invalid' : '')} />
                        <ErrorMessage name="name" component="div" className="invalid-feedback" />
                      </div>
                      <div className="form-group">
                        <Field disabled={read} name="email" type="text" placeholder="Enter your email" className={'form-control form-control-md' + (errors.email && touched.email ? ' is-invalid' : '')} />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                      </div>
                      <div className="form-group">
                        <Field disabled={read} name="companyName" placeholder="Enter your company name" type="text" className={'form-control form-control-md' + (errors.companyName && touched.companyName ? ' is-invalid' : '')} />
                        <ErrorMessage name="companyName" component="div" className="invalid-feedback" />
                      </div>
                      <div className="form-group">

                        <Field disabled={read} name="phone" type="number" placeholder="Enter your phone" className={'form-control form-control-md' + (errors.phone && touched.phone ? ' is-invalid' : '')} />
                        <ErrorMessage name="phone" component="div" className="invalid-feedback" />
                      </div> */}
                    <div className="form-group mb-2 ">
                      <Field
                        disabled={read}
                        name="message"
                        type="text"
                        rows="4"
                        component="textarea"
                        placeholder="Enter your message"
                        className={
                          "form-control form-control-md fieldAreaHeight" +
                          (errors.message && touched.message
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="message"
                        component="div"
                        className="invalid-feedback"
                      />
                      <span
                        className={
                          values.message.length <= 500
                            ? "text-success"
                            : "text-danger"
                        }
                      >
                        {values.message.length} out of 500
                      </span>
                    </div>
                    
                    <div
                      className={`text-right ${read ? "d-none" : ""}`}
                      style={{ marginTop: "-17px" }}
                    >
                      <div className="d-lg-none d-block">
                        <button
                          className="btn btn-deep-primary py-1 "
                          type="submit"
                        >
                          Submit
                          {data.isPending ? (
                            <Spinner animation="border" />
                          ) : null}
                        </button>
                      </div>
                      <p className="pt-2 text-gray">
                        Our representive will get back to you within next
                        working day{" "}
                      </p>
                    </div>

                    <div className="col-lg-6 text-right mb-3">
                        <div className="d-lg-block d-none">
                          <div className={`text-right ${read ? "d-none" : ""}`}>
                            <button
                              className="btn btn-deep-primary py-1"
                              type="submittt"
                            >
                              Submit
                              {data.isPending ? (
                                <Spinner animation="border" />
                              ) : null}
                            </button>
                            {/* <p className="pt-2 text-gray">
                        Our representive will get back to you within next
                        working day{" "}
                      </p> */}
                          </div>
                        </div>
                      </div>
                  </Form>
                )}
              />
            </div>
          </div>
        </div>
      </div>
      {/* </CustomerLayout> */}
    </>
  );
};

export default CreateNewEnquiry;
