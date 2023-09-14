import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../store/actions/login";
import { errorMessage } from "../../store/actions/utils";
import * as Yup from "yup";
import Spinner from "react-bootstrap/Spinner";
import axiosauth from "../../api/axios-auth";
import { Redirect } from "react-router-dom";

const SigninSchema = Yup.object().shape({
  username: Yup.string()
    .email("Email is invalid")
    .required("Email is required"),
  password: Yup.string().required("Please Enter your password"),
});

const redirect = () => {
  return <Redirect to="/dashboard" />;
};

const redirectVendor = () => {
  return <Redirect to="/vendor" />;
};

const LoginForm = (props) => {
  const {
    setsignUpContentModal,
    signUpContentModal,
    setsignInModal,
    signInModal,
  } = props;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [sendLink, setSendLink] = useState(false);
  const [sendEmail, setSendEmail] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [loading, setLoading] = useState(false);
  const loginPending = useSelector((state) => state.LOGIN_PENDING);
  const [userType, setUserType] = useState(2);

  const submitEmail = (e) => {
    e.preventDefault();
    let validEmail =
      /^[a-z0-9][a-z0-9-_.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/.test(
        sendEmail
      );

    if (validEmail === false) {
      setEmailError("Invalid Email");
      return 0;
    }

    let obj = {
      email: sendEmail,
    };

    setLoading(true);

    axiosauth
      .put("/api/v1/user/forgotpassword", obj)
      .then((response) => {
        const res = JSON.parse(response.data);

        if (res.message === "email sent") {
          setEmailError(null);
          setSendLink(true);
          setLoading(false);

          setTimeout(() => {
            setSendLink(false);
            setForgotPassword(false);
          }, 5000);
        } else {
          console.log(res.message);
          setEmailError(res.message);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setEmailError(error.message);
        setLoading(false);
      });
  };

  return (
    <>
      {state.loginSuccess === "Login Successful" && state.authenticated === true
        ? redirect()
        : null}
      {state.loginSuccess === "Login Successful" &&
      state.vendorAuthenticated === true
        ? redirectVendor()
        : null}

      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content border-0">
          <div className="modal-body py-0">
            <div className="row px-3">
              {!forgotPassword ? (
                <Formik
                  initialValues={{
                    username: "",
                    password: "",
                    passwordShow: false,
                  }}
                  validationSchema={SigninSchema}
                  onSubmit={(fields) => {
                    dispatch(userLogin(fields, userType));
                  }}
                  render={({
                    errors,
                    values,
                    status,
                    onChange,
                    touched,
                    setFieldValue,
                  }) => (
                    <Form
                      onChange={() => {
                        dispatch(errorMessage(null));
                      }}
                    >
                      <div className="modal-body-right-content pb-lg-4 my-1 px-sm-4 pb-sm-4 px-3 pb-3">
                        <div className="row">
                          <div className="col-12">
                            <button
                              type="button"
                              className="close"
                              onClick={() => setsignInModal(!signInModal)}
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                            <h6 className="mb-2 modal-title text-center text-uppercase text-nowrap font-weight-bold">
                              Sign In{" "}
                            </h6>
                          </div>
                        </div>

                        <div className="row mt-3">
                          <div className="col-12">
                            <div className="d-flex justify-content-between mr-5">
                              <div
                                className="mb-4"
                                role="group"
                                aria-label="Basic example"
                              >
                                <button
                                  onClick={() => setUserType(2)}
                                  type="button"
                                  className={`btn px-1 ${
                                    userType === 2
                                      ? "btn-line-deep-primary"
                                      : ""
                                  } pb-1 pt-0`}
                                >
                                  Customer
                                </button>
                                <button
                                  onClick={() => setUserType(3)}
                                  type="button"
                                  className={`btn px-1 ${
                                    userType === 3
                                      ? "btn-line-deep-primary"
                                      : ""
                                  } pb-1 pt-0`}
                                >
                                  Space Provider
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-12 form-group form-group-lg mb-3">
                            <label htmlFor="spaceprovideremailid">
                              Email<sup className="text-danger">*</sup>
                            </label>

                            <Field
                              name="username"
                              placeholder="Type Here"
                              type="text"
                              className={
                                "form-control" +
                                (errors.username && touched.username
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="username"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="col-sm-12 form-group form-group-lg mb-3">
                            <label htmlFor="spaceproviderpassword">
                              Password<sup className="text-danger">*</sup>
                            </label>

                            <div className="input-group mb-2 mr-sm-2">
                              {/* <input type="text" id="spaceproviderpassword" required={true} onChange={(e) => this.setState({ password: e.target.value})} className="form-control form-control-lg" placeholder="Type here" /> */}
                              <Field
                                name="password"
                                placeholder="Type Here"
                                type={values.passwordShow ? "text" : "password"}
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
                              {errors.password && touched.password ? null : (
                                <div
                                  className="input-group-prepend"
                                  style={{ height: "33px" }}
                                >
                                  <div className="input-group-text bg-white">
                                    {values.passwordShow ? (
                                      <i
                                        onClick={() => {
                                          setFieldValue(
                                            "passwordShow",
                                            !values.passwordShow
                                          );
                                        }}
                                        className="fa fa-eye"
                                        style={{
                                          color: "#00295F",
                                          fontSize: "22px",
                                          cursor: "pointer",
                                        }}
                                      ></i>
                                    ) : (
                                      <i
                                        onClick={() => {
                                          setFieldValue(
                                            "passwordShow",
                                            !values.passwordShow
                                          );
                                        }}
                                        className="fa fa-eye-slash"
                                        style={{
                                          color: "#00295F",
                                          fontSize: "22px",
                                          cursor: "pointer",
                                        }}
                                      ></i>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <p className="errorMessage ml-3">
                            {state.errorMessage}
                          </p>
                          <div className="ml-auto col-auto d-inline-block">
                            <a
                              onClick={() => {
                                setForgotPassword(true);
                              }}
                              href="#forgot-password-modal"
                              data-toggle="modal"
                              data-dismiss="modal"
                              className="btn btn-link text-gray px-0"
                            >
                              Forgot Password?
                            </a>
                            {/* <Link to="#" className="btn btn-link text-gray px-0">Forgot Password</Link> */}
                          </div>
                        </div>
                        <div className="text-center">
                          <button
                            type="submit"
                            disabled={loginPending}
                            className="btn btn-deep-primary position-relative my-3 col-6 mx-auto text-nowrap"
                          >
                            {userType === 2
                              ? "Customer Sign In"
                              : "Space Provider Sign In"}
                            {loginPending ? (
                              <Spinner animation="border" />
                            ) : null}
                          </button>
                          {/* {this.props.loginSuccess.type === 'LOGIN_PENDING' ? <CircularProgress color="secondary" /> : <span></span>} */}
                          <p className="mb-0">
                            Don't have an Account?
                            <button
                              style={{ all: "unset", cursor: "pointer" }}
                              className="btn p-0"
                              onClick={(e) => {
                                e.preventDefault();
                                setsignUpContentModal(!signUpContentModal);
                                setsignInModal(!signInModal);
                              }}
                            >
                              {" "}
                              &nbsp;{" "}
                              <span className="btn-line-deep-primary py-1">
                                Sign Up
                              </span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </Form>
                  )}
                />
              ) : (
                <>
                  {!sendLink ? (
                    <div className="col-12 py-lg-4 my-1 p-sm-4 p-3">
                      <div className="row">
                        <div className="col-12">
                          <button
                            type="button"
                            className="close"
                            onClick={() => setsignInModal(!signInModal)}
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                          <div>
                            <h5 className="mb-4 modal-title text-center text-uppercase mt-4">
                              Forgot password
                            </h5>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-12 form-group form-group-lg mb-3 py-4">
                          <input
                            type="text"
                            id="spaceprovideremailid"
                            className="form-control form-control-lg"
                            placeholder="Type Here your Email ID"
                            onChange={(e) => {
                              setSendEmail(e.target.value);
                              setEmailError(null);
                            }}
                          />
                          <p className="errorMessage">{emailError}</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <button
                          onClick={submitEmail}
                          disabled={loading}
                          type="button"
                          data-dismiss="modal"
                          data-target="#sent-mail-status-modal"
                          data-toggle="modal"
                          className="btn btn-deep-primary my-3 mx-auto"
                        >
                          Send Reset Link
                          {loading ? <Spinner animation="border" /> : null}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="col-12 py-lg-4 my-1 p-sm-4 p-3">
                      <div className="row">
                        <div className="col-12">
                          <button
                            onClick={() => {
                              setsignInModal(!signInModal);
                              setSendLink(false);
                            }}
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12 form-group form-group-lg mb-4">
                          <h4 className="text-gray font-weight-light text-center">
                            A reset link has been sent to
                          </h4>
                          <h3 className="text-center">{sendEmail}</h3>
                        </div>
                      </div>
                      <div className="text-center">
                        <span>Please Wait...</span>
                        <button
                          onClick={() => {
                            setsignInModal(!signInModal);
                            setSendLink(false);
                          }}
                          type="submit"
                          data-dismiss="modal"
                          data-target="#reset-password-modal"
                          data-toggle="modal"
                          className="btn btn-deep-primary my-3 mx-auto d-none"
                        >
                          Ok
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
