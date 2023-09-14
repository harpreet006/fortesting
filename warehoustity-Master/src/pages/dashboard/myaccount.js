import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { Link } from "react-router-dom";
import CustomerLayout from "../../layout/CustomerLayout";
import BreadcrumbLayout from "../../layout/BreadcrumbLayout";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import {
  authProfile,
  userUpdate,
  successResponse,
} from "../../store/actions/login";
import { Formik, Field, Form } from "formik";
import FormSuccess from "../../components/helper/FormSuccess";
import Spinner from "react-bootstrap/Spinner";
import {
  onlyAlphaNumericSpaceAllow,
  onlyNumberAllow,
  onlyAlphaNumericAllow,
} from "../../components/validation";

const MyAccount = () => {
  const data = useSelector((state) => state.USERPROFILE);
  const dispatch = useDispatch();

  const [initValue, setInItValue] = useState({
    address: "",
    website: "",
    registerOffice: "",
    companyType: "",
    companyGroup: "",
    authorisedSignature: "",
    annualTurnover: "",
    noOfEmployees: "",
    coreBusiness: "",
    registerations: [
      {
        type: "MSME registeration",
        registerNumber: "",
      },
      {
        type: "labour licence",
        registerNumber: "",
      },
    ],
    certificates: [
      {
        type: "ISO-9001-2000",
        certificateNumber: "",
      },
      {
        type: "ISO-14000",
        certificateNumber: "",
      },
      {
        type: "OHS-18000",
        certificateNumber: "",
      },
      {
        type: "FSSAI",
        certificateNumber: "",
      },
    ],
  });

  useEffect(() => {
    if (data.userProfile?.userType?.organization !== null) {
      setInItValue(data.userProfile?.userType?.organization);
    }
  }, [data.userProfile]);

  useEffect(() => {
    dispatch(authProfile());
  }, [dispatch]);

  useEffect(() => {
    $(function () {
      $(".edit-details").on("click", function () {
        var $qty = $(this).closest(".inputs").find(".form-control");
        $qty.prop("disabled", false);
        $(this).css("display", "none");
        $(this)
          .closest(".inputs")
          .find(".save-details")
          .css("display", "block");
        $(this)
          .closest(".inputs")
          .find(".personal-details")
          .removeClass("disabled");
        $(".disabled-true .cancel").css("display", "block");
      });
      $(".save-details").on("click", function () {
        var $qty = $(this).closest(".inputs").find(".form-control");
        $qty.prop("disabled", true);
        $(this).css("display", "none");
        $(this).closest(".inputs").find(".save-details").css("display", "none");
        $(this)
          .closest(".inputs")
          .find(".edit-details")
          .css("display", "block");
        $(".disabled-true .cancel").css("display", "none");
      });
      $(".cancel").on("click", function () {
        var $qty = $(this).closest(".inputs").find(".form-control");
        $qty.prop("disabled", true);
        $(this).css("display", "none");
        $(this).closest(".inputs").find(".save-details").css("display", "none");
        $(this)
          .closest(".inputs")
          .find(".edit-details")
          .css("display", "block");
        $(".disabled-true .cancel").css("display", "none");
      });
      var $qty = $(".inputs.disabled-true").find(".form-control");
      $qty.prop("disabled", true);
      $(".edit-details").css("display", "none");
      $(".disabled-true .save-details").css("display", "none");
      $(".disabled-true .edit-details").css("display", "block");
      $(".disabled-true .cancel").css("display", "none");
    });
  }, []);

  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });

  return (
    <Layout>
      {data.isSuccess?.statusCode === 200 ? (
        <FormSuccess
          onClick={() => dispatch(successResponse(null))}
          message={data.isSuccess.message}
        />
      ) : null}

      {/* <BreadcrumbLayout title="My Account"/> */}
      <CustomerLayout title={`My Account`}>
        <div className="row">
          <div className="content col-12 reset-password bg-white accoutn-input">
            <div className="border-bottom mb-3 d-sm-flex justify-content-between">
              <div>
                <Link
                  to="/myaccount"
                  className="btn name-breadcrumb px-0 text-dark font-heading mr-3 mb-2 text-uppercase"
                >
                  My Account
                </Link>
              </div>
              <div>
                <Link
                  to="/reset-password"
                  className="btn px-2 toggle-class font-weight-bold"
                >
                  Reset Password
                </Link>
              </div>
            </div>

            <div className="row bg-white shadow-sm">
              <Formik
                enableReinitialize={true}
                initialValues={initValue}
                onSubmit={(fields) => {
                  let uploadData = {
                    userType: {
                      id: 38,
                      type: "organization",
                      organization: fields,
                    },
                  };

                  // console.log("My Account-->", fields)
                  dispatch(userUpdate(uploadData));
                }}
                render={({ values, errors, status, touched }) => (
                  <Form>
                    <div className="col-12 border pb-4 pt-2">
                      <div className="row p-3">
                        <div className="col-xl-4 mb-3 col-sm-6">
                          <div className="form-group mb-0">
                            <label htmlFor="" className="text-gray">
                              Name
                            </label>
                            <div className="input-group disabled-true inputs user-name">
                              <input
                                value={data.userProfile?.firstName}
                                type="text"
                                className="form-control rounded-0"
                                disabled
                              />
                              {/* <div className="input-group-append">
                            <button type="button" className="bg-none px-3 pb-1 border-0 text-danger save-details" style={{display: 'none'}}><i className="fas fa-times"></i></button>
                            <button type="button" className="bg-none pb-1 border-0 text-success save-details" style={{display: 'none'}}><i className="fas fa-check"></i></button>
                            <button type="button" className="bg-none pb-1 px-3 border-0 text-dark edit-details" style={{display: 'block'}}><i className="fas fa-pen"></i></button>
                          </div> */}
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 mb-3 col-sm-6">
                          <div className="form-group mb-0">
                            <label htmlFor="" className="text-gray">
                              Email
                            </label>
                            <div className="input-group disabled-true inputs user-name">
                              <input
                                value={data.userProfile?.email}
                                type="text"
                                className="form-control rounded-0"
                                disabled
                              />
                              {/* <div className="input-group-append">
                            <button type="button" className="bg-none px-3 pb-1 border-0 text-danger save-details" style={{display: 'none'}}><i className="fas fa-times"></i></button>
                            <button type="button" className="bg-none pb-1 border-0 text-success save-details" style={{display: 'none'}}><i className="fas fa-check"></i></button>
                            <button type="button" className="bg-none pb-1 px-3 border-0 text-dark edit-details" style={{display: 'block'}}><i className="fas fa-pen"></i></button>
                          </div> */}
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 mb-3 col-sm-6">
                          <div className="form-group mb-0">
                            <label htmlFor="" className="text-gray">
                              Contact Number
                            </label>
                            <div className="input-group disabled-true inputs user-name">
                              <input
                                value={data.userProfile?.phone}
                                type="text"
                                className="form-control rounded-0"
                                disabled
                              />
                              {/* <div className="input-group-append">
                            <button type="button" className="bg-none px-3 pb-1 border-0 text-danger save-details" style={{display: 'none'}}><i className="fas fa-times"></i></button>
                            <button type="button" className="bg-none pb-1 border-0 text-success save-details" style={{display: 'none'}}><i className="fas fa-check"></i></button>
                            <button type="button" className="bg-none pb-1 px-3 border-0 text-dark edit-details" style={{display: 'block'}}><i className="fas fa-pen"></i></button>
                          </div> */}
                            </div>
                          </div>
                        </div>

                        <div className="col-xl-4 mb-3 col-sm-6">
                          <div className="form-group mb-0">
                            <label htmlFor="" className="text-gray">
                              City
                            </label>
                            <div className="input-group disabled-true inputs user-name">
                              <input
                                value={data.userProfile?.city}
                                type="text"
                                className="form-control rounded-0"
                                disabled
                              />
                              {/* <div className="input-group-append">
                            <button type="button" className="bg-none px-3 pb-1 border-0 text-danger save-details" style={{display: 'none'}}><i className="fas fa-times"></i></button>
                            <button type="button" className="bg-none pb-1 border-0 text-success save-details" style={{display: 'none'}}><i className="fas fa-check"></i></button>
                            <button type="button" className="bg-none pb-1 px-3 border-0 text-dark edit-details" style={{display: 'block'}}><i className="fas fa-pen"></i></button>
                          </div> */}
                            </div>
                          </div>
                        </div>

                        <div className="col-xl-4 mb-3 col-sm-6">
                          <div className="form-group mb-0">
                            <label htmlFor="" className="text-gray">
                              Area
                            </label>
                            <div className="input-group disabled-true inputs user-name">
                              <input
                                value={data.userProfile?.area}
                                type="text"
                                className="form-control rounded-0"
                                disabled
                              />
                              {/* <div className="input-group-append">
                            <button type="button" className="bg-none px-3 pb-1 border-0 text-danger save-details" style={{display: 'none'}}><i className="fas fa-times"></i></button>
                            <button type="button" className="bg-none pb-1 border-0 text-success save-details" style={{display: 'none'}}><i className="fas fa-check"></i></button>
                            <button type="button" className="bg-none pb-1 px-3 border-0 text-dark edit-details" style={{display: 'block'}}><i className="fas fa-pen"></i></button>
                          </div> */}
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 mb-3 col-sm-6">
                          <div className="form-group mb-0">
                            <label htmlFor="" className="text-gray">
                              Address
                            </label>
                            <div className="input-group disabled-true inputs user-name">
                              <Field
                                onKeyPress={(e) =>
                                  onlyAlphaNumericSpaceAllow(e)
                                }
                                name="address"
                                type="text"
                                className="form-control rounded-0"
                              />
                              <div className="input-group-append">
                                <button
                                  type="button"
                                  className="bg-none px-3 pb-1 border-0 text-danger save-details"
                                  style={{ display: "none" }}
                                >
                                  <i className="fas fa-times"></i>
                                </button>
                                <button
                                  type="button"
                                  className="bg-none pb-1 border-0 text-success save-details pr-2"
                                  style={{ display: "none" }}
                                >
                                  <i className="fas fa-check"></i>
                                </button>
                                <button
                                  type="button"
                                  className="bg-none pb-1 px-3 border-0 text-dark edit-details"
                                  style={{ display: "block" }}
                                >
                                  <i className="fas fa-pen"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 mb-3 col-sm-6">
                          <div className="form-group mb-0">
                            <label htmlFor="" className="text-gray">
                              Website
                            </label>
                            <div className="input-group disabled-true inputs user-name">
                              <Field
                                name="website"
                                type="url"
                                className="form-control rounded-0"
                              />
                              <div className="input-group-append">
                                <button
                                  type="button"
                                  className="bg-none px-3 pb-1 border-0 text-danger save-details"
                                  style={{ display: "none" }}
                                >
                                  <i className="fas fa-times"></i>
                                </button>
                                <button
                                  type="button"
                                  className="bg-none pb-1 border-0 text-success save-details pr-2"
                                  style={{ display: "none" }}
                                >
                                  <i className="fas fa-check"></i>
                                </button>
                                <button
                                  type="button"
                                  className="bg-none pb-1 px-3 border-0 text-dark edit-details"
                                  style={{ display: "block" }}
                                >
                                  <i className="fas fa-pen"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 mb-3 col-sm-6">
                          <div className="form-group mb-0">
                            <label htmlFor="" className="text-gray">
                              Registered office
                            </label>
                            <div className="input-group disabled-true inputs user-name">
                              <Field
                                onKeyPress={(e) =>
                                  onlyAlphaNumericSpaceAllow(e)
                                }
                                name="registerOffice"
                                type="text"
                                className="form-control rounded-0"
                              />
                              <div className="input-group-append">
                                <button
                                  type="button"
                                  className="bg-none px-3 pb-1 border-0 text-danger save-details"
                                  style={{ display: "none" }}
                                >
                                  <i className="fas fa-times"></i>
                                </button>
                                <button
                                  type="button"
                                  className="bg-none pb-1 border-0 text-success save-details pr-2"
                                  style={{ display: "none" }}
                                >
                                  <i className="fas fa-check"></i>
                                </button>
                                <button
                                  type="button"
                                  className="bg-none pb-1 px-3 border-0 text-dark edit-details"
                                  style={{ display: "block" }}
                                >
                                  <i className="fas fa-pen"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 mb-3 col-sm-6">
                          <div className="form-group mb-0">
                            <label htmlFor="" className="text-gray">
                              Type of the Company
                            </label>
                            <div className="input-group disabled-true inputs user-type">
                              <select
                                value={data.userProfile?.userType?.type}
                                className="form-control font-weight-bold rounded-0"
                                disabled
                              >
                                <option value="individual">Individual</option>
                                <option value="consultant">Consultant</option>
                                <option value="organization">
                                  Organisation
                                </option>
                              </select>

                              {/* <div className="input-group-append">
                            <button type="button" className="bg-none px-3 pb-1 border-0 text-danger save-details" style={{display: 'none'}}><i className="fas fa-times"></i></button>
                            <button type="button" className="bg-none pb-1 border-0 text-success save-details pr-2" style={{display: 'none'}}><i className="fas fa-check"></i></button>
                            <button type="button" className="bg-none pb-1 px-3 border-0 text-dark edit-details" style={{display: 'block'}}><i className="fas fa-pen"></i></button>
                          </div> */}
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 mb-3 col-sm-6">
                          <div className="form-group mb-0">
                            <label htmlFor="" className="text-gray">
                              Name of the Group Company
                            </label>
                            <div className="input-group disabled-true inputs user-name">
                              <Field
                                onKeyPress={(e) =>
                                  onlyAlphaNumericSpaceAllow(e)
                                }
                                name="companyGroup"
                                type="text"
                                className="form-control rounded-0"
                              />
                              <div className="input-group-append">
                                <button
                                  type="button"
                                  className="bg-none px-3 pb-1 border-0 text-danger save-details"
                                  style={{ display: "none" }}
                                >
                                  <i className="fas fa-times"></i>
                                </button>
                                <button
                                  type="button"
                                  className="bg-none pb-1 border-0 text-success save-details pr-2"
                                  style={{ display: "none" }}
                                >
                                  <i className="fas fa-check"></i>
                                </button>
                                <button
                                  type="button"
                                  className="bg-none pb-1 px-3 border-0 text-dark edit-details"
                                  style={{ display: "block" }}
                                >
                                  <i className="fas fa-pen"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 mb-3 col-sm-6">
                          <div className="form-group mb-0">
                            <label htmlFor="" className="text-gray">
                              Authroised Signatory
                            </label>
                            <div className="input-group disabled-true inputs user-name">
                              <Field
                                onKeyPress={(e) =>
                                  onlyAlphaNumericSpaceAllow(e)
                                }
                                name="authorisedSignature"
                                type="text"
                                className="form-control rounded-0"
                              />
                              <div className="input-group-append">
                                <button
                                  type="button"
                                  className="bg-none px-3 pb-1 border-0 text-danger save-details"
                                  style={{ display: "none" }}
                                >
                                  <i className="fas fa-times"></i>
                                </button>
                                <button
                                  type="button"
                                  className="bg-none pb-1 border-0 text-success save-details pr-2"
                                  style={{ display: "none" }}
                                >
                                  <i className="fas fa-check"></i>
                                </button>
                                <button
                                  type="button"
                                  className="bg-none pb-1 px-3 border-0 text-dark edit-details"
                                  style={{ display: "block" }}
                                >
                                  <i className="fas fa-pen"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 mb-3 col-sm-6">
                          <div className="form-group mb-0">
                            <label htmlFor="" className="text-gray">
                              Annual Turnover
                            </label>
                            <div className="input-group disabled-true inputs user-name">
                              <Field
                                onKeyPress={(e) => onlyNumberAllow(e)}
                                name="annualTurnover"
                                type="number"
                                className="form-control rounded-0"
                              />
                              <div className="input-group-append">
                                <button
                                  type="button"
                                  className="bg-none px-3 pb-1 border-0 text-danger save-details"
                                  style={{ display: "none" }}
                                >
                                  <i className="fas fa-times"></i>
                                </button>
                                <button
                                  type="button"
                                  className="bg-none pb-1 border-0 text-success save-details pr-2"
                                  style={{ display: "none" }}
                                >
                                  <i className="fas fa-check"></i>
                                </button>
                                <button
                                  type="button"
                                  className="bg-none pb-1 px-3 border-0 text-dark edit-details"
                                  style={{ display: "block" }}
                                >
                                  <i className="fas fa-pen"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 mb-3 col-sm-6">
                          <div className="form-group mb-0">
                            <label htmlFor="" className="text-gray">
                              No of employees
                            </label>
                            <div className="input-group disabled-true inputs user-name">
                              <Field
                                onKeyPress={(e) => onlyNumberAllow(e)}
                                name="noOfEmployees"
                                type="number"
                                className="form-control rounded-0"
                              />
                              <div className="input-group-append">
                                <button
                                  type="button"
                                  className="bg-none px-3 pb-1 border-0 text-danger save-details"
                                  style={{ display: "none" }}
                                >
                                  <i className="fas fa-times"></i>
                                </button>
                                <button
                                  type="button"
                                  className="bg-none pb-1 border-0 text-success save-details pr-2"
                                  style={{ display: "none" }}
                                >
                                  <i className="fas fa-check"></i>
                                </button>
                                <button
                                  type="button"
                                  className="bg-none pb-1 px-3 border-0 text-dark edit-details"
                                  style={{ display: "block" }}
                                >
                                  <i className="fas fa-pen"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 mb-3 col-sm-6">
                          <div className="form-group mb-0">
                            <label htmlFor="" className="text-gray">
                              Core business
                            </label>
                            <div className="input-group disabled-true inputs user-name">
                              <Field
                                onKeyPress={(e) =>
                                  onlyAlphaNumericSpaceAllow(e)
                                }
                                name="coreBusiness"
                                type="text"
                                className="form-control rounded-0"
                              />
                              <div className="input-group-append">
                                <button
                                  type="button"
                                  className="bg-none px-3 pb-1 border-0 text-danger save-details"
                                  style={{ display: "none" }}
                                >
                                  <i className="fas fa-times"></i>
                                </button>
                                <button
                                  type="button"
                                  className="bg-none pb-1 border-0 text-success save-details pr-2"
                                  style={{ display: "none" }}
                                >
                                  <i className="fas fa-check"></i>
                                </button>
                                <button
                                  type="button"
                                  className="bg-none pb-1 px-3 border-0 text-dark edit-details"
                                  style={{ display: "block" }}
                                >
                                  <i className="fas fa-pen"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row p-3">
                        <div className="mb-3 col-12">
                          <h5>Certifications - </h5>
                        </div>

                        {values.certificates &&
                          values.certificates.map((field, index) => {
                            return (
                              <div className="mb-3 col-sm-6" key={index}>
                                <div className="form-group mb-0">
                                  <label htmlFor="" className="text-gray">
                                    {field.type} Certification
                                  </label>
                                  <div className="input-group disabled-true inputs user-name">
                                    <Field
                                      onKeyPress={(e) =>
                                        onlyAlphaNumericAllow(e)
                                      }
                                      name={`certificates.${index}.certificateNumber`}
                                      type="text"
                                      className="form-control rounded-0"
                                    />
                                    <div className="input-group-append">
                                      <button
                                        type="button"
                                        className="bg-none px-3 pb-1 border-0 text-danger save-details"
                                        style={{ display: "none" }}
                                      >
                                        <i className="fas fa-times"></i>
                                      </button>
                                      <button
                                        type="button"
                                        className="bg-none pb-1 border-0 text-success save-details pr-2"
                                        style={{ display: "none" }}
                                      >
                                        <i className="fas fa-check"></i>
                                      </button>
                                      <button
                                        type="button"
                                        className="bg-none pb-1 px-3 border-0 text-dark edit-details"
                                        style={{ display: "block" }}
                                      >
                                        <i className="fas fa-pen"></i>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                      <div className="row p-3">
                        <div className="mb-3 col-12">
                          <h5>Registrations - </h5>
                        </div>

                        {values.registerations &&
                          values.registerations.map((field, index) => {
                            return (
                              <div className="mb-3 col-sm-6" key={index}>
                                <div className="form-group mb-0">
                                  <label
                                    htmlFor=""
                                    className="text-gray text-capitalize"
                                  >
                                    {field.type}
                                  </label>
                                  <div className="input-group disabled-true inputs user-name">
                                    <Field
                                      onKeyPress={(e) =>
                                        onlyAlphaNumericAllow(e)
                                      }
                                      name={`registerations.${index}.registerNumber`}
                                      className="form-control rounded-0"
                                    />
                                    <div className="input-group-append">
                                      <button
                                        type="button"
                                        className="bg-none px-3 pb-1 border-0 text-danger save-details"
                                        style={{ display: "none" }}
                                      >
                                        <i className="fas fa-times"></i>
                                      </button>
                                      <button
                                        type="button"
                                        className="bg-none pb-1 border-0 text-success save-details pr-2"
                                        style={{ display: "none" }}
                                      >
                                        <i className="fas fa-check"></i>
                                      </button>
                                      <button
                                        type="button"
                                        className="bg-none pb-1 px-3 border-0 text-dark edit-details"
                                        style={{ display: "block" }}
                                      >
                                        <i className="fas fa-pen"></i>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                      <div className="row mt-3">
                        <div className="col-auto ml-auto">
                          <button
                            button="type"
                            disabled={data.isPending}
                            className="btn btn-deep-primary toggle-class px-5"
                          >
                            Save
                            {data.isPending ? (
                              <Spinner animation="border" />
                            ) : null}
                          </button>
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              />
            </div>
          </div>
        </div>
      </CustomerLayout>
    </Layout>
  );
};

export default MyAccount;
