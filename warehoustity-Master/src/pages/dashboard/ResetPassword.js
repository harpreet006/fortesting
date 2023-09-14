import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { useLocation, useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import SuccessModal from "../../components/helper/SuccessModal";
import BreadcrumbLayout from "../../layout/BreadcrumbLayout";
import CustomerLayout from "../../layout/CustomerLayout";

const ResetPassword = () => {
  const history = useHistory();
  const [success, setSuccess] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });
  return (
    <Layout>
      <BreadcrumbLayout title="Reset Password" />
      <CustomerLayout>
        {success ? (
          <SuccessModal
            message="Update successful"
            onClick={() => setSuccess(false)}
            path={"/assets/images/success.png"}
          />
        ) : null}

        <div className="row" style={{ marginTop: "-123px" }}>
          <div className="content col-12 reset-password">
            <div className="border-bottom d-sm-flex justify-content-between">
              <div>
                <button className="btn name-breadcrumb px-0 pt-0 text-dark py-3 font-heading mr-3">
                  <i
                    onClick={() => history.goBack()}
                    className="fas fa-chevron-left mr-3"
                  ></i>{" "}
                  Reset Password
                </button>
              </div>
            </div>
            <div className="row p-3">
              <div className="col-12 border pb-3">
                <div className="row p-3">
                  <div className="col-12">
                    <Formik
                      initialValues={{
                        oldpassword: "",
                        newpassword: "",
                        confirmpassword: "",
                      }}
                      validationSchema={Yup.object().shape({
                        oldpassword: Yup.string()
                          .required("Please Enter your password")
                          .matches(
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%^&*])(?=.{8,})/,
                            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                          ),
                        newpassword: Yup.string()
                          .required("Please Enter your password")
                          .matches(
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                          ),
                        confirmpassword: Yup.string()
                          .required("Confirm Password is required")
                          .oneOf(
                            [Yup.ref("newpassword"), null],
                            "Password must match"
                          ),
                      })}
                      onSubmit={() => {
                        setSuccess(true);
                      }}
                      render={({ errors, status, touched }) => (
                        <Form>
                          <div className="form-group mb-4 mt-2">
                            <label for="" className="text-gray">
                              Current Password
                            </label>
                            <div className="input-group pr-3">
                              <Field
                                name="oldpassword"
                                type="text"
                                className={
                                  "form-control form-control-lg" +
                                  (errors.oldpassword && touched.oldpassword
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              <ErrorMessage
                                name="oldpassword"
                                component="div"
                                className="invalid-feedback"
                              />
                              {/* <input type="text" className="form-control form-control-lg rounded" value="Enter current password"/>  */}
                            </div>
                          </div>
                          <div className="form-group mb-4 mt-2">
                            <label for="" className="text-gray">
                              New Password
                            </label>
                            <div className="input-group pr-3">
                              <Field
                                name="newpassword"
                                type="text"
                                className={
                                  "form-control form-control-lg" +
                                  (errors.newpassword && touched.newpassword
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              <ErrorMessage
                                name="newpassword"
                                component="div"
                                className="invalid-feedback"
                              />
                              {/* <input type="text" className="form-control form-control-lg rounded" value="Enter new password"/>  */}
                            </div>
                          </div>
                          <div className="form-group mb-4 mt-2">
                            <label for="" className="text-gray">
                              Confirm Password
                            </label>
                            <div className="input-group pr-3">
                              <Field
                                name="confirmpassword"
                                type="text"
                                className={
                                  "form-control form-control-lg" +
                                  (errors.confirmpassword &&
                                  touched.confirmpassword
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              <ErrorMessage
                                name="confirmpassword"
                                component="div"
                                className="invalid-feedback"
                              />
                              {/* <input type="text" className="form-control form-control-lg rounded" value="Enter confirm password"/>  */}
                            </div>
                          </div>
                          <div className="row mt-5">
                            <div className="col-auto mb-3">
                              <button
                                onClick={() => history.goBack()}
                                type="button"
                                className="btn btn-outline-dark"
                              >
                                Cancel
                              </button>
                            </div>
                            <div className="col-auto mb-3">
                              <button
                                className="btn btn-deep-primary"
                                type="button"
                              >
                                Reset Password
                              </button>
                            </div>
                          </div>
                        </Form>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CustomerLayout>
    </Layout>
  );
};

export default ResetPassword;

