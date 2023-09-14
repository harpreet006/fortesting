import React, { useEffect, useState } from "react";
import VendorLayout from "../../layout/VendorLayout";
import { useDispatch, useSelector } from "react-redux";
import $ from "jquery";
import {
  authProfile,
  userUpdate,
  successResponse,
} from "../../store/actions/login";
// import { useHistory } from 'react-router';
import { Formik, Field, Form } from "formik";
import FormSuccess from "../../components/helper/FormSuccess";
// import Spinner from 'react-bootstrap/Spinner';
import {
  onlyAlphaNumericSpaceAllow,
  onlyNumberAllow,
  onlyAlphaNumericAllow,
} from "../../components/validation";

const Myaccount = () => {
  const data = useSelector((state) => state.USERPROFILE);
  // console.log("Organizational User Data===>", data.userProfile)
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

  return (
    <VendorLayout>
      {data.isSuccess?.statusCode === 200 ? (
        <FormSuccess
          onClick={() => dispatch(successResponse(null))}
          message={data.isSuccess.message}
        />
      ) : null}

      <div className="content-admin px-1">
        <div className="row align-items-center pb-3 pt-2 px-3 mx-0">
          <div className="col-12 ">
            <h5 className="text-dark">My Account Details</h5>
          </div>

          <Formik
            enableReinitialize={true}
            initialValues={initValue}
            onSubmit={(fields) => {
              let uploadData = {
                userType: {
                  type: "organization",
                  organization: fields,
                },
              };

              // console.log("My Account-->", fields)
              dispatch(userUpdate(uploadData));
            }}
            render={({ values, errors, status, touched }) => (
              <Form>
                <div className="col-12">
                  <div className="row">
                    <div className="col-12 pt-3 bg-white rounded-2">
                      <div className="row mx-0">
                        <div className="col-xl-4 col-md-6 px-0">
                          <form action="">
                            <div className="form-group border-bottom pb-3">
                              <label
                                htmlFor=""
                                className="text-gray text-uppercase small mb-0"
                              >
                                Vendor id:{" "}
                                <span className="font-weight-bold">50788</span>
                              </label>
                              <div className="input-group input-group-lg disabled-true inputs user-name pr-3">
                                <input
                                  value={data.userProfile?.firstName}
                                  disabled
                                  type="text"
                                  className="fs-14px form-control h-30px bg-none ps-2 border"
                                />
                                {/* <div className="input-group-append">
                              <button type="button" className="bg-none pb-1 border-0 text-danger save-details" style={{display: 'none'}}><i className="fas fa-times"></i></button>
                              <button type="button" className="bg-none pb-1 border-0 text-success save-details" style={{display: 'none'}}><i className="fas fa-check"></i></button>
                              <button type="button" className="bg-none pb-1 border-0 text-dark edit-details" style={{display: 'block'}}><i className="fas fa-pen"></i></button>
                            </div> */}
                              </div>
                            </div>
                          </form>
                        </div>
                        <div className="col-xl-4 col-md-6 px-0">
                          <form action="">
                            <div className="form-group border-bottom pb-3">
                              <label
                                htmlFor=""
                                className="text-gray text-uppercase small mb-0"
                              >
                                Website
                              </label>
                              <div className="input-group input-group-lg disabled-true inputs user-name pr-3">
                                <Field
                                  name="website"
                                  type="url"
                                  className="fs-14px form-control h-30px bg-none ps-2 border"
                                  value="Organization.com"
                                />
                                <div className="input-group-append border px-3">
                                  <button
                                    type="button"
                                    className="bg-none pb-1 border-0 text-danger save-details"
                                    style={{ display: "none" }}
                                  >
                                    <i className="fas fa-times"></i>
                                  </button>
                                  <button
                                    type="button"
                                    className="bg-none pb-1 border-0 text-success save-details pl-2"
                                    style={{ display: "none" }}
                                  >
                                    <i className="fas fa-check"></i>
                                  </button>
                                  <button
                                    type="button"
                                    className="bg-none pb-1 border-0 text-dark edit-details"
                                    style={{ display: "block" }}
                                  >
                                    <i className="fas fa-pen"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                        <div className="col-xl-4 col-md-6 px-0">
                          <form action="">
                            <div className="form-group border-bottom pb-3">
                              <label
                                htmlFor=""
                                className="text-gray text-uppercase small mb-0"
                              >
                                Registered office
                              </label>
                              <div className="input-group input-group-lg disabled-true inputs user-name pr-3">
                                <Field
                                  onKeyPress={(e) =>
                                    onlyAlphaNumericSpaceAllow(e)
                                  }
                                  name="registerOffice"
                                  type="text"
                                  className="fs-14px form-control h-30px bg-none pl-3 border"
                                />
                                <div className="input-group-append px-3 border">
                                  <button
                                    type="button"
                                    className="bg-none pb-1 border-0 text-danger save-details"
                                    style={{ display: "none" }}
                                  >
                                    <i className="fas fa-times"></i>
                                  </button>
                                  <button
                                    type="button"
                                    className="bg-none pb-1 border-0 text-success save-details pl-2"
                                    style={{ display: "none" }}
                                  >
                                    <i className="fas fa-check"></i>
                                  </button>
                                  <button
                                    type="button"
                                    className="bg-none pb-1 border-0 text-dark edit-details"
                                    style={{ display: "block" }}
                                  >
                                    <i className="fas fa-pen"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                        {/* <div className="col-xl-3 col-md-6 px-0">
                        <form action="">
                        <div className="form-group border-bottom pb-3">
                          <label htmlFor="" className="text-gray text-uppercase small mb-0">Password</label>  
                          <button type="button" className="btn h-30px px-0 py-0 d-block border-0 text-deep-blue font-weight-bold">RESET PASSWORD</button>
                        </div>
                        </form>
                      </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 pt-3 px-0">
                  <h6 className="text-dark mb-0">Company Details</h6>
                </div>
                <div className="col-12 bg-white p-3 mt-3">
                  <div className="row mx-0">
                    <div className="col-12 ">
                      <div className="row bg-white rounded pt-3">
                        <div className="col-12 mb-3">
                          <form action="">
                            <div className="form-group mb-0">
                              <label
                                htmlFor=""
                                className="text-gray text-uppercase small mb-0"
                              >
                                Address
                              </label>
                              <div className="input-group disabled-true inputs user-name">
                                <Field
                                  onKeyPress={(e) =>
                                    onlyAlphaNumericSpaceAllow(e)
                                  }
                                  name="address"
                                  type="text"
                                  className="fs-14px form-control h-30px bg-none p-0 border"
                                />
                                <div className="input-group-append border px-3">
                                  <button
                                    type="button"
                                    className="bg-none pb-1 border-0 text-danger save-details"
                                    style={{ display: "none" }}
                                  >
                                    <i className="fas fa-times"></i>
                                  </button>
                                  <button
                                    type="button"
                                    className="bg-none pb-1 border-0 text-success save-details pl-2"
                                    style={{ display: "none" }}
                                  >
                                    <i className="fas fa-check"></i>
                                  </button>
                                  <button
                                    type="button"
                                    className="bg-none pb-1 border-0 text-dark edit-details"
                                    style={{ display: "block" }}
                                  >
                                    <i className="fas fa-pen"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                        <div className="col-12">
                        <div className="row">
                       <div className="col-xl-4 col-md-6 mb-3">
                          <form action="">
                            <div className="form-group mb-0">
                              <label
                                htmlFor=""
                                className="text-gray text-uppercase small mb-0"
                              >
                                Type of the Company
                              </label>
                              <div className="input-group disabled-true inputs user-type">
                                <select
                                  value={data.userProfile?.userType?.type}
                                  className="fs-14px form-control h-30px bg-none px-1 border pb-0 pt-1"
                                  disabled
                                >
                                  <option value="individual">Individual</option>
                                  <option value="consultant">Consultant</option>
                                  <option value="organization">
                                    Organisation
                                  </option>
                                </select>
                                <div className="input-group-append px-3 border">
                                  <button
                                    type="button"
                                    className="bg-none pb-1 border-0 text-danger save-details"
                                    style={{ display: "none" }}
                                  >
                                    <i className="fas fa-times"></i>
                                  </button>
                                  <button
                                    type="button"
                                    className="bg-none pb-1 border-0 text-success save-details pl-2"
                                    style={{ display: "none" }}
                                  >
                                    <i className="fas fa-check"></i>
                                  </button>
                                  <button
                                    type="button"
                                    className="bg-none pb-1 border-0 text-dark edit-details"
                                    style={{ display: "block" }}
                                  >
                                    <i className="fas fa-pen"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                        <div className="col-xl-4 col-md-6 mb-3">
                          <form action="">
                            <div className="form-group mb-0">
                              <label
                                htmlFor=""
                                className="text-gray text-uppercase small mb-0"
                              >
                                Name of the Group Company
                              </label>
                              <div className="input-group disabled-true inputs user-name ">
                                <Field
                                  onKeyPress={(e) =>
                                    onlyAlphaNumericSpaceAllow(e)
                                  }
                                  type="text"
                                  className="fs-14px form-control h-30px bg-none pl-2 border "
                                />
                                <div className="input-group-append border px-3">
                                  <button
                                    type="button"
                                    className="bg-none pb-1 border-0 text-danger save-details"
                                    style={{ display: "none" }}
                                  >
                                    <i className="fas fa-times"></i>
                                  </button>
                                  <button
                                    type="button"
                                    className="bg-none pb-1 border-0 text-success save-details pl-2"
                                    style={{ display: "none" }}
                                  >
                                    <i className="fas fa-check"></i>
                                  </button>
                                  <button
                                    type="button"
                                    className="bg-none pb-1 border-0 text-dark edit-details"
                                    style={{ display: "block" }}
                                  >
                                    <i className="fas fa-pen"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                        <div className="col-xl-4 col-md-6 mb-3">
                          <form action="">
                            <div className="form-group mb-0">
                              <label
                                htmlFor=""
                                className="text-gray text-uppercase small mb-0"
                              >
                                Authroised Signatory
                              </label>
                              <div className="input-group disabled-true inputs user-name">
                                <Field
                                  onKeyPress={(e) =>
                                    onlyAlphaNumericSpaceAllow(e)
                                  }
                                  name="authorisedSignature"
                                  type="text"
                                  className="fs-14px form-control h-30px bg-none pl-2 border"
                                />
                                <div className="input-group-append border px-3">
                                  <button
                                    type="button"
                                    className="bg-none pb-1 border-0 text-danger save-details"
                                    style={{ display: "none" }}
                                  >
                                    <i className="fas fa-times"></i>
                                  </button>
                                  <button
                                    type="button"
                                    className="bg-none pb-1 border-0 text-success save-details pl-2"
                                    style={{ display: "none" }}
                                  >
                                    <i className="fas fa-check"></i>
                                  </button>
                                  <button
                                    type="button"
                                    className="bg-none pb-1 border-0 text-dark edit-details"
                                    style={{ display: "block" }}
                                  >
                                    <i className="fas fa-pen"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                        <div className="col-xl-4 col-md-6 mb-3">
                          <form action="">
                            <div className="form-group mb-0">
                              <label
                                htmlFor=""
                                className="text-gray text-uppercase small mb-0"
                              >
                                Annual Turnover
                              </label>
                              <div className="input-group disabled-true inputs user-name">
                                <Field
                                  onKeyPress={(e) => onlyNumberAllow(e)}
                                  name="annualTurnover"
                                  type="number"
                                  className="fs-14px form-control h-30px bg-none pl-2 border"
                                />
                                <div className="input-group-append px-3 border">
                                  <button
                                    type="button"
                                    className="bg-none pb-1 border-0 text-danger save-details "
                                    style={{ display: "none" }}
                                  >
                                    <i className="fas fa-times"></i>
                                  </button>
                                  <button
                                    type="button"
                                    className="bg-none pb-1 border-0 text-success save-details pl-2"
                                    style={{ display: "none" }}
                                  >
                                    <i className="fas fa-check"></i>
                                  </button>
                                  <button
                                    type="button"
                                    className="bg-none pb-1 border-0 text-dark edit-details"
                                    style={{ display: "block" }}
                                  >
                                    <i className="fas fa-pen"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                        <div className="col-xl-4 col-md-6 mb-3">
                          <form action="">
                            <div className="form-group mb-0">
                              <label
                                htmlFor=""
                                className="text-gray text-uppercase small mb-0"
                              >
                                No of employees
                              </label>
                              <div className="input-group disabled-true inputs user-name">
                                <Field
                                  onKeyPress={(e) => onlyNumberAllow(e)}
                                  name="noOfEmployees"
                                  type="number"
                                  className="fs-14px form-control h-30px bg-none pl-2 border"
                                />
                                <div className="input-group-append px-3 border">
                                  <button
                                    type="button"
                                    className="bg-none pb-1 border-0 text-danger save-details"
                                    style={{ display: "none" }}
                                  >
                                    <i className="fas fa-times"></i>
                                  </button>
                                  <button
                                    type="button"
                                    className="bg-none pb-1 border-0 text-success save-details pl-2"
                                    style={{ display: "none" }}
                                  >
                                    <i className="fas fa-check"></i>
                                  </button>
                                  <button
                                    type="button"
                                    className="bg-none pb-1 border-0 text-dark edit-details pl-2"
                                    style={{ display: "block" }}
                                  >
                                    <i className="fas fa-pen"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                        <div className="col-xl-4 col-md-6 mb-3">
                          <form action="">
                            <div className="form-group mb-0">
                              <label
                                htmlFor=""
                                className="text-gray text-uppercase small mb-0"
                              >
                                Core business
                              </label>
                              <div className="input-group disabled-true inputs user-name">
                                <Field
                                  onKeyPress={(e) =>
                                    onlyAlphaNumericSpaceAllow(e)
                                  }
                                  name="coreBusiness"
                                  type="text"
                                  className="fs-14px form-control h-30px bg-none pl-0 border"
                                />
                                <div className="input-group-append px-3 border">
                                  <button
                                    type="button"
                                    className="bg-none pb-1 border-0 text-danger save-details"
                                    style={{ display: "none" }}
                                  >
                                    <i className="fas fa-times"></i>
                                  </button>
                                  <button
                                    type="button"
                                    className="bg-none pb-1 border-0 text-success save-details pl-2"
                                    style={{ display: "none" }}
                                  >
                                    <i className="fas fa-check"></i>
                                  </button>
                                  <button
                                    type="button"
                                    className="bg-none pb-1 border-0 text-dark edit-details"
                                    style={{ display: "block" }}
                                  >
                                    <i className="fas fa-pen"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                       </div>
                        </div>
                       
                       
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 pt-3 ps-0">
                  <h6 className="text-dark mb-3">Certifications - </h6>
                </div>
                <div className="col-12 bg-white">
                  <div className="row mx-0">
                    <div className="col-12 py-3">
                      <div className="row bg-white rounded pt-3">
                        {values.certificates &&
                          values.certificates.map((field, index) => {
                            return (
                              <div
                                className="col-xl-3 col-md-6 mb-3"
                                key={index}
                              >
                                <div className="form-group mb-0">
                                  <label
                                    htmlFor=""
                                    className="text-gray text-uppercase small mb-0"
                                  >
                                    {field.type} certification
                                  </label>
                                  <div className="input-group disabled-true inputs user-name">
                                    <Field
                                      onKeyPress={(e) =>
                                        onlyAlphaNumericAllow(e)
                                      }
                                      name={`certificates.${index}.certificateNumber`}
                                      type="text"
                                      className="fs-14px form-control h-30px bg-none pl-2 border"
                                    />
                                    <div className="input-group-append px-3 border">
                                      <button
                                        type="button"
                                        className="bg-none pb-1 border-0 text-danger save-details"
                                        style={{ display: "none" }}
                                      >
                                        <i className="fas fa-times"></i>
                                      </button>
                                      <button
                                        type="button"
                                        className="bg-none pb-1 border-0 text-success save-details pl-2"
                                        style={{ display: "none" }}
                                      >
                                        <i className="fas fa-check"></i>
                                      </button>
                                      <button
                                        type="button"
                                        className="bg-none pb-1 border-0 text-dark edit-details"
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
                    </div>
                  </div>
                </div>
                <div className="col-12 py-3 px-0">
                  <h6 className="text-dark mb-0 px-0">Registrations - </h6>
                </div>
                <div className="col-12 bg-white ">
                  <div className="row mx-0">
                    <div className="col-12 py-3">
                      <div className="row bg-white rounded pt-3">
                        {values.registerations &&
                          values.registerations.map((field, index) => {
                            return (
                              <div className="col-xl-3 col-md-6 mb-3">
                                <form action="">
                                  <div className="form-group mb-0">
                                    <label
                                      htmlFor=""
                                      className="text-gray text-uppercase small mb-0"
                                    >
                                      {field.type}
                                    </label>
                                    <div className="input-group disabled-true inputs user-name">
                                      <Field
                                        onKeyPress={(e) =>
                                          onlyAlphaNumericAllow(e)
                                        }
                                        name={`registerations.${index}.registerNumber`}
                                        className="fs-14px form-control h-30px bg-none pl-2 border"
                                      />
                                      <div className="input-group-append px-3 border">
                                        <button
                                          type="button"
                                          className="bg-none pb-1 border-0 text-danger save-details"
                                          style={{ display: "none" }}
                                        >
                                          <i className="fas fa-times"></i>
                                        </button>
                                        <button
                                          type="button"
                                          className="bg-none pb-1 border-0 text-success save-details pl-2"
                                          style={{ display: "none" }}
                                        >
                                          <i className="fas fa-check"></i>
                                        </button>
                                        <button
                                          type="button"
                                          className="bg-none pb-1 border-0 text-dark edit-details"
                                          style={{ display: "block" }}
                                        >
                                          <i className="fas fa-pen"></i>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            );
                          })}

                        <div className="col-xl-3 col-md-6 mb-3">
                          <form action="">
                            <div className="form-group mb-0">
                              <label
                                htmlFor=""
                                className="text-gray text-uppercase small mb-0"
                              >
                                Labor license
                              </label>
                              <div className="input-group disabled-true inputs user-name ">
                                <input
                                  type="text"
                                  className="fs-14px form-control h-30px bg-none pl-2 border"
                                  value="Labor license"
                                />
                                <div className="input-group-append px-3 border">
                                  <button
                                    type="button"
                                    className="bg-none pb-1 border-0 text-danger save-details"
                                    style={{ display: "none" }}
                                  >
                                    <i className="fas fa-times"></i>
                                  </button>
                                  <button
                                    type="button"
                                    className="bg-none pb-1 border-0 text-success save-details pl-3"
                                    style={{ display: "none" }}
                                  >
                                    <i className="fas fa-check"></i>
                                  </button>
                                  <button
                                    type="button"
                                    className="bg-none pb-1 border-0 text-dark edit-details"
                                    style={{ display: "block" }}
                                  >
                                    <i className="fas fa-pen"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          />

          <div className="col-12 py-3 ">
            <h6 className="text-dark mb-0">Settings</h6>
          </div>
          <div className="col-12 ">
            <div className="row mx-0">
              <div className="col-12">
                <div className="row bg-white border rounded d-flex justify-content-between">
                  <div className="px-3 pt-3 pb-0">
                    <p className="mb-0">Notifications</p>
                  </div>
                  <form action="" className="pr-2">
                    <div className="custom-control mt-1 mb-3 custom-switch common-switch-deep-blue common-switch">
                      <input
                        type="checkbox"
                        className="custom-control-input common-switch-deep-blue-input"
                        id="customSwitch1"
                      />
                      <label
                        className="custom-control-label common-switch-deep-blue-label"
                        htmlFor="customSwitch1"
                      ></label>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-12 pt-3">
                <div className="row bg-white border rounded d-flex justify-content-between align-items-center">
                  <div className="p-3">
                    <p className="mb-0">Profile Deactivate Request</p>
                  </div>
                  <div>
                    <button className="btn py-1 px-4 btn-sm btn-deep-blue font-weight-light mx-3 mt-1 mb-3">
                      Request
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default Myaccount;
