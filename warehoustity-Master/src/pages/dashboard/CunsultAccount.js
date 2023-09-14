import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomerLayout from "../../layout/CustomerLayout";
import {
  authProfile,
  userUpdate,
  successResponse,
} from "../../store/actions/login";
import { useDispatch, useSelector } from "react-redux";
import FormSuccess from "../../components/helper/FormSuccess";
import Spinner from "react-bootstrap/Spinner";
import {
  onlyAlphaNumericSpaceAllow,
  onlyAlphaNumericAllow,
} from "../../components/validation";

const CunsultAccount = () => {
  const data = useSelector((state) => state.USERPROFILE);
  const history = useHistory();
  const dispatch = useDispatch();
  const [initValue, setInItValue] = useState({
    address: "",
    pan: "",
    aadhaar: "",
    city: "",
    state: "",
    area: "",
    personalEmail: "",
    officialEmail: "",
    personalContact: "",
    officialContact: "",
    bloodGroup: "",
  });

  useEffect(() => {
    if (data.userProfile?.userType?.consultant !== null) {
      setInItValue(data.userProfile?.userType?.consultant);
    }
  }, [data.userProfile]);

  useEffect(() => {
    dispatch(authProfile());
  }, [dispatch]);

  return (
    <Layout>
      {data.isSuccess?.statusCode === 200 ? (
        <FormSuccess
          onClick={() => dispatch(successResponse(null))}
          message={data.isSuccess.message}
        />
      ) : null}

      <CustomerLayout title="My Account">
        <div className="border-bottom mb-4 d-sm-flex justify-content-between">
          <button className="btn name-breadcrumb px-0 text-dark font-heading mr-3 mb-2">
            {" "}
            <i
              onClick={() => history.goBack()}
              className="fas fa-chevron-left mr-3"
            ></i>{" "}
            Account
          </button>
        </div>

        <div className="row">
          <Formik
            enableReinitialize={true}
            initialValues={initValue}
            validationSchema={Yup.object().shape({
              address: Yup.string().required("Adddress is required"),
              pan: Yup.string().required("Pan Number is required"),
              aadhaar: Yup.string().required("Aadhaar Number is required"),
              //     city: Yup.string()
              //     .required('Pan Number is required'),
              // area: Yup.string()
              // .required('Aadhaar Number is required'),
              // personalEmail: Yup.string()
              //     .email('Please enter valid email')
              //     .required('Personal EmailId is required'),
              officialEmail: Yup.string()
                .email("Please enter valid email")
                .required("Office Mail id is required"),
              // personalContact: Yup.string()
              //     .required('Personal ContactNo is required')
              //     .min(10, "Only 10 Digits Required")
              //     .max(10, "Only 10 Digits Required"),
              officialContact: Yup.string()
                .required("Official ContactNo is required")
                .min(10, "Only 10 Digits Required")
                .max(10, "Only 10 Digits Required"),
              bloodGroup: Yup.string().required("Blood Group is required"),
            })}
            onSubmit={(fields) => {
              let updateData = {
                userType: {
                  type: "consultant",
                  consultant: fields,
                },
              };
              dispatch(userUpdate(updateData));
            }}
            render={({ errors, status, touched }) => (
              <Form>
                <div className="row">
                  <div className="form-group col-lg-4 col-md-6 mb-4">
                    <label htmlFor="staticEmail" className="mb-2">
                      Name
                    </label>
                    <input
                      value={data.userProfile?.firstName}
                      type="text"
                      className={"form-control form-control-md"}
                      disabled
                    />
                  </div>
                  <div className="form-group col-lg-4 col-md-6 mb-4">
                    <label htmlFor="staticEmail" className="mb-2">
                      City
                    </label>
                    <input
                      value={data.userProfile?.city}
                      name="city"
                      type="text"
                      className={"form-control form-control-md"}
                      disabled
                    />
                    {/* <ErrorMessage name="city" component="div" className="invalid-feedback" /> */}
                  </div>

                  <div className="form-group col-lg-4 col-md-6 mb-4">
                    <label htmlFor="staticEmail" className="mb-2">
                      Area
                    </label>
                    <input
                      value={data.userProfile?.area}
                      name="area"
                      type="text"
                      className={"form-control form-control-md"}
                      disabled
                    />
                    {/* <ErrorMessage name="area" component="div" className="invalid-feedback" /> */}
                  </div>

                  <div className="form-group col-lg-4 col-md-6 mb-4">
                    <label htmlFor="staticEmail" className="mb-2">
                      Address
                    </label>
                    <Field
                      onKeyPress={(e) => onlyAlphaNumericSpaceAllow(e)}
                      name="address"
                      type="text"
                      className={
                        "form-control form-control-md" +
                        (errors.address && touched.address ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group col-lg-4 col-md-6 mb-4">
                    <label htmlFor="staticEmail" className="mb-2">
                      PAN No
                    </label>
                    <Field
                      onKeyPress={(e) => onlyAlphaNumericAllow(e)}
                      name="pan"
                      type="text"
                      className={
                        "form-control form-control-md" +
                        (errors.pan && touched.pan ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="pan"
                      component="div"
                      className="invalid-feedback"
                    />
                    {/* <input type="tel" className="form-control form-control-md" id="staticEmail" value="+91 9467823456"/> */}
                  </div>
                  <div className="form-group col-lg-4 col-md-6 mb-4">
                    <label htmlFor="staticEmail" className="mb-2">
                      Aadhaar No
                    </label>
                    <Field
                      onKeyPress={(e) => onlyAlphaNumericAllow(e)}
                      name="aadhaar"
                      type="text"
                      className={
                        "form-control form-control-md" +
                        (errors.aadhaar && touched.aadhaar ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="aadhaar"
                      component="div"
                      className="invalid-feedback"
                    />
                    {/* <input type="email" className="form-control form-control-md" id="staticEmail" value="Ajay.vgmail.com"/> */}
                  </div>
                  <div className="form-group col-lg-4 col-md-6 mb-4">
                    <label htmlFor="staticEmail" className="mb-2">
                      Personal Mail id
                    </label>
                    <input
                      value={data.userProfile?.email}
                      name="personalEmail"
                      type="text"
                      className={"form-control form-control-md"}
                      disabled
                    />
                    {/* <ErrorMessage name="personalEmail" component="div" className="invalid-feedback" /> */}
                    {/* <input type="text" className="form-control form-control-md" id="staticEmail" value="Executive"/> */}
                  </div>
                  <div className="form-group col-lg-4 col-md-6 mb-4">
                    <label htmlFor="staticEmail" className="mb-2">
                      Official Mail id
                    </label>
                    <Field
                      name="officialEmail"
                      type="text"
                      className={
                        "form-control form-control-md" +
                        (errors.officialEmail && touched.officialEmail
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="officialEmail"
                      component="div"
                      className="invalid-feedback"
                    />
                    {/* <input type="date" className="form-control form-control-md" id="staticEmail" value="15-12-2020"/> */}
                  </div>
                  <div className="form-group col-lg-4 col-md-6 mb-4">
                    <label htmlFor="staticEmail" className="mb-2">
                      Personal Contact no
                    </label>
                    <input
                      onKeyPress={(e) => onlyAlphaNumericAllow(e)}
                      value={data.userProfile?.phone}
                      name="personalContact"
                      type="text"
                      className={"form-control form-control-md"}
                      disabled
                    />
                    {/* <ErrorMessage name="personalContact" component="div" className="invalid-feedback" /> */}
                    {/* <input type="text" className="form-control form-control-md" id="staticEmail" value="New Password"/> */}
                  </div>
                  <div className="form-group col-lg-4 col-md-6 mb-4">
                    <label htmlFor="staticEmail" className="mb-2">
                      Official Contact no
                    </label>
                    <Field
                      onKeyPress={(e) => onlyAlphaNumericAllow(e)}
                      name="officialContact"
                      type="text"
                      className={
                        "form-control form-control-md" +
                        (errors.officialContact && touched.officialContact
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="officialContact"
                      component="div"
                      className="invalid-feedback"
                    />
                    {/* <input type="text" className="form-control form-control-md" id="staticEmail" value="New Password"/> */}
                  </div>
                  <div className="form-group col-lg-4 col-md-6 mb-4">
                    <label htmlFor="staticEmail" className="mb-2">
                      Blood group
                    </label>
                    <Field
                      name="bloodGroup"
                      type="text"
                      className={
                        "form-control form-control-md" +
                        (errors.bloodGroup && touched.bloodGroup
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="bloodGroup"
                      component="div"
                      className="invalid-feedback"
                    />
                    {/* <input type="text" className="form-control form-control-md" id="staticEmail" value="New Password"/> */}
                  </div>
                </div>
                <div className="row">
                  <div className="col-auto">
                    <button
                      onClick={() => history.goBack()}
                      type="button"
                      className="btn btn-deep-primary toggle-class my-4"
                    >
                      Back
                    </button>
                  </div>

                  <div className="col-auto">
                    <button
                      type="submit"
                      disabled={data.isPending}
                      className="btn btn-deep-primary my-4"
                    >
                      Submit
                      {data.isPending ? <Spinner animation="border" /> : null}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          />
        </div>
      </CustomerLayout>
    </Layout>
  );
};

export default CunsultAccount;
