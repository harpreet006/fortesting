import React, { useEffect, useState } from "react";
import BrowserTitle from "../../../components/helper/BrowserTitle";
import CustomerLayout from "../../../layout/CustomerLayout";
import Layout from "../../../layout/Layout";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory, useParams } from "react-router-dom";
import {
  roleByPage,
  departmentByPage,
  responseWhs,
  updateWhsUser,
  whsById,
} from "../../../store/actions/subUserAction";
import { useDispatch, useSelector } from "react-redux";
import FormSuccess from "../../../components/helper/FormSuccess";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import stateList from "../../../json/stateList.json";

const EditSubUser = () => {
  const [modalShow, setModalShow] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { userId } = useParams();
  const data = useSelector((state) => state.WHS_USER_INFO);
  let params = new URLSearchParams(window.location.search);
  let activeUser = params.get("activeUser") === "false" ? true : false;

  const [initValue, setInitValue] = useState({
    firstName: "",
    lastName: "",
    employeeId:"",
    email: "",
    phone: "",
    city: "",
    state:"",
    area: "",
    roleId: "",
    departmentId: "",
    isDepartmentHead: false,
  });

  const whsSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    email: Yup.string().email().required("Required"),
    phone: Yup.string()
    .required('Phone is required')
    .matches(RegExp(
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    ), "Invalid Phone Number"),
    roleId: Yup.string().required("Required"),
    departmentId: Yup.string().required("Required"),
    isDepartmentHead: Yup.string().required("Required"),
  });

  useEffect(() => {
    if (data.whsUserDetail) {
      setInitValue({
        firstName: data.whsUserDetail?.firstName,
        lastName: data.whsUserDetail?.lastName,
        email: data.whsUserDetail?.email,
        employeeId: data.whsUserDetail?.employeeId,
        phone: data.whsUserDetail?.phone,
        city: data.whsUserDetail?.city,
        state: data.whsUserDetail?.state,
        area: data.whsUserDetail?.area,
        roleId: data.whsUserDetail?.accountRole?.id,
        departmentId: data.whsUserDetail?.department?.id,
        isDepartmentHead: data.whsUserDetail?.isDepartmentHead,
      });
    }
  }, [data.whsUserDetail]);

  useEffect(() => {
    dispatch(roleByPage("true"));
    dispatch(departmentByPage("true"));
  }, [dispatch]);

  const redirect = () => {
    dispatch(responseWhs(null));
    history.replace(`/managesubusers`);
  };

  useEffect(() => {
    dispatch(whsById(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });

  return (
    <Layout>
      <BrowserTitle title="Update User" />

      {data.whsResponse?.statusCode === 500
        ? null
        : data.whsResponse !== null && (
            <FormSuccess onClick={redirect} message={`User Updated`} />
          )}

      <CustomerLayout title="Update User">
        <div className="content col-12 add-subuser">
          <div className="border-bottom mb-2 d-sm-flex justify-content-between">
            <div>
              <span
                className="btn name-breadcrumb px-0 text-dark font-heading mr-3 toggle-class"
                data-target=".add-subuser"
                data-toggle-class="d-none"
              >
                <i
                  onClick={() => history.goBack()}
                  className="fas fa-chevron-left pr-3"
                ></i>
                Update User
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Formik
                enableReinitialize={true}
                validationSchema={whsSchema}
                initialValues={initValue}
                onSubmit={(fields) => {
                  console.log("Fields==>", fields);
                  dispatch(updateWhsUser(userId, fields));
                }}
                render={({
                  values,
                  setFieldValue,
                  errors,
                  status,
                  touched,
                }) => (
                  <Form>
                    <div className="row">
                      <div className="form-group col-md-6 mb-2">
                        <label htmlFor="staticEmail" className="mb-2">
                          First Name
                        </label>
                        <Field
                          name="firstName"
                          type="text"
                          className={
                            "form-control form-control-md" +
                            (errors.firstName && touched.firstName
                              ? " is-invalid"
                              : "")
                          }
                          disabled ={activeUser}
                        />
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>

                      <div className="form-group col-md-6 mb-2">
                        <label htmlFor="staticEmail" className="mb-2">
                          Last Name
                        </label>
                        <Field
                          name="lastName"
                          type="text"
                          className={
                            "form-control form-control-md" +
                            (errors.lastName && touched.lastName
                              ? " is-invalid"
                              : "")
                          }
                          disabled ={activeUser}
                        />
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>

                      <div className="form-group col-md-6 mb-2">
                        <label htmlFor="staticEmail" className="mb-2">
                          Email Id
                        </label>
                        <Field
                          name="email"
                          type="text"
                          className={
                            "form-control form-control-md" +
                            (errors.email && touched.email ? " is-invalid" : "")
                          }
                          disabled ={activeUser}
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group col-md-6 mb-2">
                        <label htmlFor="staticEmail" className="mb-2">
                          Mobile No.
                        </label>
                        <Field
                          name="phone"
                          type="text"
                          className={
                            "form-control form-control-md" +
                            (errors.phone && touched.phone ? " is-invalid" : "")
                          }
                          disabled ={activeUser}
                        />
                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>

                      <div className="form-group col-lg-4 col-md-6 mb-2">
                          <label for="staticEmail" className="mb-2 pl-3">
                            Employee Id
                          </label>
                          <Field
                          name="employeeId"
                          class={`form-control form-control-md px-4`}
                          type="text" />
                        </div>

                        <div className="form-group col-lg-4 col-md-6 mb-2">
                        <label for="staticEmail" className="mb-1 pl-3">
                          State
                        </label>
                        <Field
                        as="select"
                        name="state"
                        className={
                          `form-control form-control-md px-4` +
                          (errors.state && touched.state ? " is-invalid" : "")
                        }
                        id="state"
                      >
                        <option value="">Select</option>

                        {stateList.length > 0
                          ? stateList.map((item, index) => (
                              <option value={item} key={index}>
                                {item}
                              </option>
                            ))
                          : null}
                      </Field>
                        <ErrorMessage
                          name={`city`}
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>

                      {/* <div className="form-group col-md-6 mb-2">
                          <label htmlFor="staticEmail" className="mb-2">City</label>
                          <Field name="city" type="text" className={'form-control form-control-md' + (errors.city && touched.city ? ' is-invalid' : '')} />
                          <ErrorMessage name="city" component="div" className="invalid-feedback" />
                          </div>

                          <div className="form-group col-md-6 mb-2">
                          <label htmlFor="staticEmail" className="mb-2">Area</label>
                          <Field name="area" type="text" className={'form-control form-control-md' + (errors.area && touched.area ? ' is-invalid' : '')} />
                          <ErrorMessage name="area" component="div" className="invalid-feedback" />
                          </div> */}

                      {/* ============================ */}

                      <div className="form-group col-lg-4 col-md-6 mb-2">
                        <label htmlFor="staticEmail" className="mb-2 pl-3">
                          Role
                        </label>
                        <Field
                          name="roleId"
                          as="select"
                          className={
                            `form-control form-control-md custom-select bg-white px-4 common-select-deep-blue ` +
                            (errors.roleId && touched.roleId
                              ? " is-invalid"
                              : "")
                          }
                          id="exampleFormControlSelect1"
                          onChange={(e) => {
                            setFieldValue("roleId", parseInt(e.target.value));
                          }}
                          disabled ={activeUser}
                        >
                          <option value="">Select</option>

                          {data.roleList && data.roleList.length > 0
                            ? data.roleList.map((item, index) => (
                                <option value={item.id} key={index}>
                                  {item.name}
                                </option>
                              ))
                            : null}
                        </Field>
                        <ErrorMessage
                          name={`roleId`}
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group col-lg-4 col-md-6 mb-2">
                        <label htmlFor="staticEmail" className="mb-2 pl-3">
                          Department
                        </label>
                        <Field
                          name="departmentId"
                          as="select"
                          className={
                            `form-control form-control-md custom-select bg-white px-4 common-select-deep-blue ` +
                            (errors.departmentId && touched.departmentId
                              ? " is-invalid"
                              : "")
                          }
                          disabled ={activeUser}
                          id="exampleFormControlSelect1"
                          onChange={(e) => {
                            setFieldValue(
                              "departmentId",
                              parseInt(e.target.value)
                            );
                          }}
                        >
                          <option value="">Select</option>

                          {data.departmentList && data.departmentList.length > 0
                            ? data.departmentList.map((item, index) => (
                                <option value={item.id} key={index}>
                                  {item.name}
                                </option>
                              ))
                            : null}
                        </Field>
                        <ErrorMessage
                          name={`departmentId`}
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>

                      {/* ============================= */}

                      {/* <div className="form-group col-md-6 mb-2">
                          <label htmlFor="staticEmail" className="mb-2">Location</label>
                          <Field name="location" type="text" className={'form-control form-control-md' + (errors.location && touched.location ? ' is-invalid' : '')} />
                          <ErrorMessage name="location" component="div" className="invalid-feedback" />
                          </div> */}

                      <div className="form-group col-lg-12 pl-4">
                        <div className="common-checkbox common-checkbox-dark position-relative mx-auto d-inline-block">
                          <Field
                            name="isDepartmentHead"
                            className="common-checkbox-input common-checkbox-dark-input"
                            type="checkbox"
                            onChange={(e) => {
                              setFieldValue(
                                "isDepartmentHead",
                                !values.isDepartmentHead
                              );
                            }}
                            disabled ={activeUser}
                            checked={values.isDepartmentHead}
                            id="departmentalHead"
                          />
                          <label
                            className="common-checkbox-label common-checkbox-dark-label mr-3 pl-4"
                            htmlFor="departmentalHead"
                          >
                            Departmental head
                          </label>
                        </div>
                      </div>
                    </div>
                    <span className="errorMsg">{data.isError}</span>
                    <span className="errorMsg">
                      {data.whsResponse?.statusCode === 500
                        ? data.whsResponse.message
                        : null}
                    </span>
                    <div className="row mt-2">
                      <div className="col-auto">
                        <button
                          onClick={() => history.goBack()}
                          type="button"
                          className="btn py-1 btn-deep-primary mb-2"
                        >
                          Back
                        </button>
                      </div>
                      <div className="col-auto">
                        <button type="button" onClick={() => setModalShow(true)} className="btn py-1 btn-deep-primary mb-2">Reset Password</button>
                      </div>
                      <div className="col-auto">
                        <button
                          type="submit"
                          disabled={data.isPending || activeUser}
                          className="btn btn-deep-primary mb-2 py-1"
                        >
                          Update User
                          {data.isPending ? (
                            <Spinner animation="border" />
                          ) : null}
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              />
            </div>
          </div>
        </div>

        {/* ============================================== */}

        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Create New Password
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              enableReinitialize={true}
              validationSchema={Yup.object().shape({
                newPassword: Yup.string().required("Required"),
                confirmPassword: Yup.string()
                  .required("Required")
                  .oneOf(
                    [Yup.ref("newPassword"), null],
                    "Passwords must match"
                  ),
              })}
              initialValues={{
                newPassword: "",
                confirmPassword: "",
              }}
              onSubmit={(fields) => {
                // delete fields['confirmPassword'];
                console.log("Fields==>", fields);
                dispatch(updateWhsUser(userId, fields));
              }}
              render={({
                values,
                setFieldValue,
                errors,
                status,
                onChange,
                touched,
              }) => {
                return (
                  <Form>
                    <div className="row">
                      <div className="form-group col-lg-6 col-md-6 mb-2">
                        <label htmlFor="staticEmail" className="mb-2 pl-3">
                          New Password
                        </label>
                        <div className={`input-group append  mb-1`}>
                          <Field
                            name="newPassword"
                            type="password"
                            className={`form-control form-control-md px-4`}
                            id="staticEmail"
                          />
                          <div className="input-group-append">
                            <span className="input-group-text bg-white">
                              <i className="fas fa-eye"></i>
                            </span>
                          </div>
                        </div>
                        <span className="formikError">
                          {errors.newPassword}{" "}
                        </span>
                      </div>
                      <div className="form-group col-lg-6 col-md-6 mb-2">
                        <label htmlFor="staticEmail" className="mb-2 pl-3">
                          Confirm Password
                        </label>
                        <div className={`input-group append  mb-1`}>
                          <Field
                            name="confirmPassword"
                            type="password"
                            className={`form-control form-control-md px-4`}
                            id="staticEmail"
                          />
                          <div className="input-group-append">
                            <span className="input-group-text bg-white">
                              <i className="fas fa-eye"></i>
                            </span>
                          </div>
                        </div>

                        <span className="formikError">
                          {errors.confirmPassword}{" "}
                        </span>
                      </div>
                    </div>
                    <div className="row border-top">
                      <div className="col-12  text-center mx-auto pt-3">
                        <button
                          type="submit"
                          className="btn btn-outline-deep-primary py-1 px-5"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </Form>
                );
              }}
            />
          </Modal.Body>
        </Modal>

        {/* ================================================= */}
      </CustomerLayout>
    </Layout>
  );
};

export default EditSubUser;
