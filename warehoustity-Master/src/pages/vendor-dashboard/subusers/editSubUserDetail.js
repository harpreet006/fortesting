import React, { useEffect, useState } from "react";
import VendorLayout from "../../../layout/VendorLayout";
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
import {
  onlyLetterSpaceAllow,
  onlyNumberAllow,
  onlyAlphaNumericSpaceAllow,
} from "../../../components/validation";
import axiosauth from "../../../api/axios-auth";

const EditSubUserDetail = () => {
  const [modalShow, setModalShow] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { userId } = useParams();
  const data = useSelector((state) => state.WHS_USER_INFO);

  const [role, setrole] = useState("");
  const [department, setdepartment] = useState("");
  const [selectedOption, setselectedOption] = useState("");
  const [selectedOption1, setselectedOption1] = useState("");

  const [initValue, setInitValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    area: "",
    roleId: "",
    departmentId: "",
    isDepartmentHead: false,
  });

  const whsSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email().required("Required"),
    phone: Yup.string().max(10, "Must be 10 digits").required("Required"),
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
        phone: data.whsUserDetail?.phone,
        city: data.whsUserDetail?.city,
        area: data.whsUserDetail?.area,
        roleId: data.whsUserDetail?.accountRole?.id,
        departmentId: data.whsUserDetail?.department?.id,
        isDepartmentHead: data.whsUserDetail?.isDepartmentHead,
      });
      setselectedOption(data.whsUserDetail?.accountRole.name)
      setselectedOption1(data.whsUserDetail?.department.name)

    }
  }, [data.whsUserDetail]);

  useEffect(() => {
    dispatch(roleByPage(true));
    dispatch(departmentByPage(true));
  }, [dispatch]);

  const redirect = () => {
    dispatch(responseWhs(null));
    history.replace(`/vendor/managesubuser`);
  };

  useEffect(() => {
    dispatch(whsById(userId));
  }, [dispatch, userId]);

  return (
    <VendorLayout>
      {data.whsResponse !== null && data.whsResponse.statusCode === 500 ? (
        <FormSuccess onClick={redirect} message={data.whsResponse.message} />
      ) : data.whsResponse !== null ? (
        <FormSuccess onClick={redirect} message={`User Updated`} />
      ) : null}

      <div className="content-admin px-2">
        <div className="row align-items-center py-3 px-3 mx-0">

          <div className="col-12 pb-4 pt-2">
            <span
              onClick={() => history.goBack()}
              className="text-dark-blue h5"
            >
              <i className="fas fa-chevron-left mr-2"></i> Edit Sub User
            </span>
          </div>

          <div className="col-12 bg-white p-3">
            <Formik
              enableReinitialize={true}
              validationSchema={whsSchema}
              initialValues={initValue}
              onSubmit={(fields) => {
                let index = data.roleList.findIndex(
                  (x) => x.name === selectedOption
                );
                fields.roleId = parseInt(data.roleList[index].id);
                let index1 = data.departmentList.findIndex(
                  (x) => x.name === selectedOption1
                );
                fields.departmentId = parseInt(data.departmentList[index1].id);

                dispatch(updateWhsUser(userId, fields));
              }}
              render={({ values, setFieldValue, errors, status, touched }) => (

                <Form>
                  <div className="row">
                    <div className="form-group col-md-6 mb-4">
                      <label htmlFor="staticEmail" className="mb-2">
                        First Name
                      </label>
                      <Field
                        onKeyPress={(e) => onlyLetterSpaceAllow(e)}
                        name="firstName"
                        type="text"
                        className={
                          "form-control form-control-md" +
                          (errors.firstName && touched.firstName
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-group col-md-6 mb-4">
                      <label htmlFor="staticEmail" className="mb-2">
                        Last Name
                      </label>
                      <Field
                        onKeyPress={(e) => onlyLetterSpaceAllow(e)}
                        name="lastName"
                        type="text"
                        className={
                          "form-control form-control-md" +
                          (errors.lastName && touched.lastName
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-group col-md-6 mb-4">
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
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group col-md-6 mb-4">
                      <label htmlFor="staticEmail" className="mb-2">
                        Mobile No.
                      </label>
                      <Field
                        onKeyPress={(e) => onlyNumberAllow(e)}
                        name="phone"
                        type="text"
                        className={
                          "form-control form-control-md" +
                          (errors.phone && touched.phone ? " is-invalid" : "")
                        }
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-group col-md-6 mb-4">
                      <label htmlFor="staticEmail" className="mb-2">
                        City
                      </label>
                      <Field
                        onKeyPress={(e) => onlyLetterSpaceAllow(e)}
                        name="city"
                        type="text"
                        className={
                          "form-control form-control-md" +
                          (errors.city && touched.city ? " is-invalid" : "")
                        }
                      />
                      <ErrorMessage
                        name="city"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-group col-md-6 mb-4">
                      <label htmlFor="staticEmail" className="mb-2">
                        Area
                      </label>
                      <Field
                        onKeyPress={(e) => onlyAlphaNumericSpaceAllow(e)}
                        name="area"
                        type="text"
                        className={
                          "form-control form-control-md" +
                          (errors.area && touched.area ? " is-invalid" : "")
                        }
                      />
                      <ErrorMessage
                        name="area"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    {/* New Add */}

                    <div className="form-group col-lg-4 col-md-6 mb-2">
                      <label htmlFor="staticEmail" className="mb-1 pl-3">
                        Role
                      </label>
                      {/* <Field
                       name="roleId"
                       as="select"
                       className={`form-control form-control-md custom-select bg-white px-4 common-select-deep-blue rounded-pill`+ (errors.roleId && touched.roleId ? ' is-invalid' : '')}
                       id="exampleFormControlSelect1"
                       onChange={(e) => {setFieldValue("roleId",parseInt(e.target.value))}}
                       >
                      <option value="">Select</option>

                      {data.roleList && data.roleList.length>0 ?

                        data.roleList.map((item, index)=> <option value={item.id} key={index} >{item.name}</option>)

                        :null}


                  
                    </Field> */}
                      <div className="dropdown create-new-waresheet-dropdown">
                        <button
                          className="btn bg-white border btn-block text-left dropdown-toggle"
                          type="button"
                          id="dropdownMenu1"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          {selectedOption === ""
                            ? "Select Role"
                            : selectedOption}{" "}
                        </button>
                        <div
                          style={{
                            // display:
                            //   data.roleList && data.roleList.length > 0
                            //     ? ""
                            //     : "none",

                            padding: "0px",
                          }}
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenu1"
                        >
                          <div className="dropdown-item p-0 m-0">
                            <select
                              style={{ minHeight: "72px !important" }}
                              selected={selectedOption}
                              onChange={(e) => {
                                console.log("jdsjdsj", e.target.value);
                                setFieldValue("roleId", e.target.value);

                                setselectedOption(e.target.value);
                              }}
                              multiple
                              size="3"
                              className="form-control form-control-md"
                              id="exampleFormControlSelect2"
                            >
                              {data.roleList && data.roleList.length > 0
                                ? data.roleList.map((value, index) => {
                                  return (
                                    <option value={value.name}>
                                      {value.name}
                                    </option>
                                  );
                                })
                                : null}
                            </select>
                          </div>
                          <div className="dropdown-item d-flex align-items-center p-0 m-0">
                            <i
                              onClick={() => {
                                if (role !== "") {
                                  let account = JSON.parse(
                                    localStorage.getItem("userData")
                                  );
                                  let accountId = account?.account?.id;

                                  try {
                                    axiosauth
                                      .post(
                                        `/api/v1/accounts/${accountId}/roles/`,
                                        {
                                          name: role,
                                          description: role,
                                          isActive: true,
                                        }
                                      )
                                      .then((response) => {
                                        setFieldValue("roleId", role);

                                        setselectedOption(role);
                                        dispatch(roleByPage("true"));
                                      })
                                      .catch((error) => { })
                                      .then(() => { });
                                  } catch (e) { }
                                }
                              }}
                              className="fas fa-plus mx-2"
                            ></i>
                            <input
                              value={role}
                              onChange={(e) => {
                                setrole(e.target.value);
                              }}
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput1"
                              placeholder="Create New"
                            />
                          </div>
                        </div>
                      </div>
                      <ErrorMessage
                        name={`roleId`}
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>


                    {/* ================= */}
                    {/* <div className="form-group col-lg-6 col-md-6 mb-4">
                      <label htmlFor="staticEmail" className="mb-2 pl-3">
                        Role
                      </label>
                      <Field
                        name="roleId"
                        as="select"
                        className={
                          `form-control form-control-md custom-select bg-white px-4 common-select-deep-blue` +
                          (errors.roleId && touched.roleId ? " is-invalid" : "")
                        }
                        id="exampleFormControlSelect1"
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
                    </div> */}

                    {/* New Add Department */}

                    <div className="form-group col-lg-4 col-md-6 mb-2">
                      <label htmlFor="staticEmail" className="mb-1 pl-3">
                        Department
                      </label>

                      <div className="dropdown create-new-waresheet-dropdown">
                        <button
                          className="btn bg-white border btn-block text-left dropdown-toggle"
                          type="button"
                          id="dropdownMenu1"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          {selectedOption1 === ""
                            ? "Select Department"
                            : selectedOption1}{" "}
                        </button>
                        <div
                          style={{
                            // display:
                            //   data.departmentList &&
                            //   data.departmentList.length > 0
                            //     ? ""
                            //     : "none",

                            padding: "0px",
                          }}
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenu1"
                        >
                          <div className="dropdown-item p-0 m-0">
                            <select
                              selected={selectedOption1}
                              onChange={(e) => {
                                console.log("jdsjdsj", e.target.value);
                                setFieldValue("departmentId", e.target.value);

                                setselectedOption1(e.target.value);
                              }}
                              multiple
                              size="3"
                              className="form-control form-control-md"
                              id="exampleFormControlSelect2"
                            >
                              {data.departmentList &&
                                data.departmentList.length > 0
                                ? data.departmentList.map((value, index) => {
                                  return (
                                    <option value={value.name}>
                                      {value.name}
                                    </option>
                                  );
                                })
                                : null}
                            </select>
                          </div>
                          <div className="dropdown-item d-flex align-items-center p-0 m-0">
                            <i
                              onClick={() => {
                                if (department !== "") {
                                  let account = JSON.parse(
                                    localStorage.getItem("userData")
                                  );
                                  let accountId = account?.account?.id;

                                  try {
                                    axiosauth
                                      .post(
                                        `/api/v1/accounts/${accountId}/departments/`,
                                        {
                                          name: department,
                                          description: department,
                                          isActive: true,
                                        }
                                      )
                                      .then((response) => {
                                        setselectedOption1(department);
                                        setFieldValue(
                                          "departmentId",
                                          department
                                        );
                                        dispatch(departmentByPage("true"));
                                      })
                                      .catch((error) => { })
                                      .then(() => { });
                                  } catch (e) { }
                                }
                              }}
                              className="fas fa-plus mx-2"
                            ></i>
                            <input
                              value={department}
                              onChange={(e) => {
                                setdepartment(e.target.value);
                              }}
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput1"
                              placeholder="Create New"
                            />
                          </div>
                        </div>
                      </div>
                      {/* <Field
                      name="departmentId"
                      as="select"
                      className={`form-control form-control-md custom-select bg-white px-4 common-select-deep-blue rounded-pill`+ (errors.department && touched.department ? ' is-invalid' : '')}
                      id="exampleFormControlSelect1"
                      onChange={(e) => {setFieldValue("departmentId",parseInt(e.target.value))}}
                      >
                    <option  value="">Select</option>
                    
                    {data.departmentList && data.departmentList.length>0 ? 
                      data.departmentList.map((item, index)=>  <option value={item.id} key={index}>{item.name}</option>)
                    :null}
                    </Field> */}
                      <ErrorMessage
                        name={`departmentId`}
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>


                    {/* ------------- */}
                    {/* <div className="form-group col-lg-6 col-md-6 mb-4">
                      <label htmlFor="staticEmail" className="mb-2 pl-3">
                        Department
                      </label>
                      <Field
                        name="departmentId"
                        as="select"
                        className={
                          `form-control form-control-md custom-select bg-white px-4 common-select-deep-blue` +
                          (errors.departmentId && touched.departmentId
                            ? " is-invalid"
                            : "")
                        }
                        id="exampleFormControlSelect1"
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
                    </div> */}

                    {/* ============================= */}

                    {/* <div className="form-group col-md-6 mb-4">
                          <label htmlFor="staticEmail" className="mb-2">Location</label>
                          <Field name="location" type="text" className={'form-control form-control-md' + (errors.location && touched.location ? ' is-invalid' : '')} />
                          <ErrorMessage name="location" component="div" className="invalid-feedback" />
                          </div> */}

                    <div className="form-group col-lg-12 pl-4">
                      <div className="common-checkbox common-checkbox-dark position-relative mb-3 mx-auto d-inline-block">
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
                  <div className="row mt-1">
                    <div className="col-auto">
                      <button
                        onClick={() => history.goBack()}
                        type="button"
                        className="btn btn-outline-deep-blue toggle-class mb-4 px-5"
                      >
                        Back
                      </button>
                    </div>
                    {/* <div className="col-auto">
                      <button
                        type="button"
                        onClick={() => setModalShow(true)}
                        className="btn btn-deep-blue mb-4"
                      >
                        Change Password
                      </button>
                    </div> */}
                    <div className="col-auto">
                      <button
                        type="submit"
                        disabled={data.isPending}
                        className="btn btn-deep-blue mb-4 px-4"
                      >
                        Update User
                        {data.isPending ? <Spinner animation="border" /> : null}
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
                .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
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
                    <div className="form-group col-lg-6 col-md-6 mb-4">
                      <label htmlFor="staticEmail" className="mb-2 pl-3">
                        New Password
                      </label>
                      <div className={`input-group append rounded-pill mb-1`}>
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
                      <span className="formikError">{errors.newPassword} </span>
                    </div>
                    <div className="form-group col-lg-6 col-md-6 mb-4">
                      <label htmlFor="staticEmail" className="mb-2 pl-3">
                        Confirm Password
                      </label>
                      <div className={`input-group append rounded-pill mb-1`}>
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
    </VendorLayout>
  );
};

export default EditSubUserDetail;
