import React, { useEffect, useState } from "react";
import LayoutOne from "../../../layout/VendorLayout";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  roleByPage,
  departmentByPage,
  responseWhs,
  createWhsUser,
} from "../../../store/actions/subUserAction";
import { useDispatch, useSelector } from "react-redux";
import FormSuccess from "../../../components/helper/FormSuccess";
import Spinner from "react-bootstrap/Spinner";
import axiosauth from "../../../api/axios-auth";
import stateList from "../../../json/stateList.json";

const AddWHSUser = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.WHS_USER_INFO);
  console.log("Role-->", data);
  const [role, setrole] = useState("");
  const [department, setdepartment] = useState("");

  const [selectedOption, setselectedOption] = useState("");
  const [selectedOption1, setselectedOption1] = useState("");

  const whsSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email().required("Required"),
    phone: Yup.string().max(10, "Must be 10 digits").required("Required"),
    city: Yup.string().required("Required"),
    area: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    roleId: Yup.string().required("Required"),
    departmentId: Yup.string().required("Required"),
    isDepartmentHead: Yup.string().required("Required"),
  });

  useEffect(() => {
    dispatch(roleByPage("true"));
    dispatch(departmentByPage("true"));
  }, [dispatch]);

  const redirect = () => {
    dispatch(responseWhs(null));
    history.replace(`/vendor/managesubuser`);
  };

  console.log("Response-->", data.whsResponse)

  return (
    <LayoutOne>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Add WHS User</title>
      </Helmet>
      {data.whsResponse?.statusCode === 500 ?
        null :
        data.whsResponse !== null &&
        <FormSuccess
          onClick={redirect}
          message={
            <span>
              User Created <br />
              Password:<span className="text-lowercase">
                {" "}
                whaccount@1234{" "}
              </span>{" "}
            </span>
          }
        />
      }

      {/* {data.whsResponse !== null &&
        <FormSuccess
          onClick={redirect}
          message={
            <span>
              User Created <br />
              Password:<span className="text-lowercase">
                {" "}
                whaccount@1234{" "}
              </span>{" "}
            </span>
          }
        />} */}
      <div className="content-admin px-2">

        <div className="row align-items-center pb-3 px-3 mx-0">
          <div className="col-12 py-3">
            <h5 className="text-dark">
              <i
                onClick={() => history.goBack()}
                className="fas fa-chevron-left mr-3 cursorPointer"
              ></i>{" "}
              Add New User
            </h5>
          </div>

          <div className="col-12 p-3 bg-white">
            <Formik
              enableReinitialize={true}
              validationSchema={whsSchema}
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                countryCode: "+91",
                roleId: "",
                departmentId: "",
                city: "",
                area: "",
                state: "",
                isDepartmentHead: false,
              }}
              onSubmit={(fields) => {
                console.log("Fields==>", fields);

                let index = data.roleList.findIndex(
                  (x) => x.name === selectedOption
                );
                fields.roleId = parseInt(data.roleList[index].id);
                let index1 = data.departmentList.findIndex(
                  (x) => x.name === selectedOption1
                );
                fields.departmentId = parseInt(data.departmentList[index1].id);
                dispatch(createWhsUser(fields));
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
                      <div className="form-group col-lg-4 col-md-6 mb-2">
                        <label for="staticEmail" className="mb-1 pl-3">
                          First Name
                        </label>
                        <Field
                          name="firstName"
                          type="text"
                          className={
                            `form-control form-control-md px-4 ` +
                            (errors.firstName && touched.firstName
                              ? " is-invalid"
                              : "")
                          }
                          id="staticEmail"
                        />
                        <ErrorMessage
                          name={`firstName`}
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group col-lg-4 col-md-6 mb-2">
                        <label for="staticEmail" className="mb-1 pl-3">
                          Last Name
                        </label>
                        <Field
                          name="lastName"
                          type="text"
                          className={
                            `form-control form-control-md px-4 ` +
                            (errors.lastName && touched.lastName
                              ? " is-invalid"
                              : "")
                          }
                          id="staticEmail"
                        />
                        <ErrorMessage
                          name={`lastName`}
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group col-lg-4 col-md-6 mb-2">
                        <label for="staticEmail" className="mb-1 pl-3">
                          Email Id
                        </label>
                        <Field
                          name="email"
                          type="text"
                          className={
                            `form-control form-control-md px-4 ` +
                            (errors.email && touched.email ? " is-invalid" : "")
                          }
                          id="staticEmail"
                        />
                        <ErrorMessage
                          name={`email`}
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group col-lg-4 col-md-6 mb-2">
                        <label for="staticEmail" className="mb-1 pl-3">
                          Mobile No.
                        </label>
                        <Field
                          name="phone"
                          type="text"
                          className={
                            `form-control form-control-md px-4 ` +
                            (errors.phone && touched.phone ? " is-invalid" : "")
                          }
                          id="staticEmail"
                        />
                        <ErrorMessage
                          name={`phone`}
                          component="div"
                          className="invalid-feedback"
                        />
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


                      <div className="form-group col-lg-4 col-md-6 mb-2">
                        <label for="staticEmail" className="mb-1 pl-3">
                          City
                        </label>
                        <Field
                          name="city"
                          type="text"
                          className={
                            `form-control form-control-md px-4 ` +
                            (errors.city && touched.city ? " is-invalid" : "")
                          }
                          id="staticEmail"
                        />
                        <ErrorMessage
                          name={`city`}
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group col-lg-4 col-md-6 mb-2">
                        <label for="staticEmail" className="mb-1 pl-3">
                          Area
                        </label>
                        <Field
                          name="area"
                          type="text"
                          className={
                            `form-control form-control-md px-4 ` +
                            (errors.area && touched.area ? " is-invalid" : "")
                          }
                          id="staticEmail"
                        />
                        <ErrorMessage
                          name={`area`}
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>




                      <div className="form-group col-lg-4 col-md-6 mb-2">
                        <label for="staticEmail" className="mb-1 pl-3">
                          Role
                        </label>
                        {/* <Field
                       name="roleId"
                       as="select"
                       className={`form-control form-control-md custom-select bg-white px-4 common-select-deep-blue `+ (errors.roleId && touched.roleId ? ' is-invalid' : '')}
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
                            className="btn border bg-white btn-block text-left dropdown-toggle"
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




                      <div className="form-group col-lg-4 col-md-6 mb-2">
                        <label for="staticEmail" className="mb-1 pl-3">
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
                      className={`form-control form-control-md custom-select bg-white px-4 common-select-deep-blue `+ (errors.department && touched.department ? ' is-invalid' : '')}
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
                            checked={values.isDepartmentHead}
                            id="departmentalHead"
                          />
                          <label
                            className="common-checkbox-label common-checkbox-dark-label mr-3 pl-4"
                            for="departmentalHead"
                          >
                            Departmental head
                          </label>
                        </div>
                      </div>
                    </div>

                    <span className="errorMsg">{data.whsResponse?.statusCode === 500 ? data.whsResponse.message : null}</span>

                    <div className="row">
                      <div className="col-auto">
                        <button
                          onClick={() => history.goBack()}
                          type="button"
                          className="btn btn-outline-deep-blue toggle-class my-2 px-5"
                        >
                          Back
                        </button>
                      </div>
                      <div className="col-auto">
                        <button
                          type="submit"
                          disabled={data.isPending}
                          className="btn btn-deep-blue toggle-class my-2"
                        >
                          Create WHS User
                          {data.isPending ? (
                            <Spinner animation="border" />
                          ) : null}
                        </button>
                      </div>
                    </div>
                  </Form>
                );
              }}
            />
          </div>
        </div>
      </div>
    </LayoutOne>
  );
};

export default AddWHSUser;
