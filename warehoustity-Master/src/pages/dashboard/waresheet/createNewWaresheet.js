import React, { useState, useEffect } from "react";
import Layout from "../../../layout/Layout";
import { Link, useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomerLayout from "../../../layout/CustomerLayout";
import { addwaresheet } from "../../../store/actions/customer/waresheetAction";
import { useDispatch, useSelector } from "react-redux";
import FormSuccess from "../../../components/helper/FormSuccess";
import axios from "../../../api/axios-auth";
import { Modal } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { confirmAlert } from "react-confirm-alert";
import { allWaresheet } from "../../../store/actions/customer/waresheetAction";
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/styles";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { readableDate } from "../../../components/validation";
import { options } from "../../../components/MUSetting";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const CreateNewWaresheet = () => {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const history = useHistory();
  const data = useSelector((state) => state.WARESHEETINFO);
  const read = useSelector((state) => state.SIDEMENU_INFO.read_only);
  const [modalIsOpen2, setModalIsOpen2] = useState(false);
  const [newWaresheets, setNewWaresheets] = useState(null);

  let formValidation = Yup.object().shape({
    waresheetName: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
       .trim()
      .required("Warehouse Name is required"),
    

    description: Yup.string()
      .min(3, "Too Short!")
      .trim()
      .required("Description is required"),
  });

  const createwaresheet = (fields) => {
    let obj = {
      waresheetName: fields.waresheetName,
      description: fields.description,
      makeItDefault: false,
    };
    axios
      .post("/api/v1/waresheet", obj)
      .then((Response) => {
        let res = JSON.parse(Response.data);
        console.log("rjha", res);
        if (res.statusCode === 200) {
          setModalIsOpen2(true);
          dispatch(allWaresheet(1, 1000));
        } else {
          addToast(res.message, { appearance: "error", autoDismiss: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const successWarehouse = () => {
    dispatch(addwaresheet([]));
  };

  useEffect(() => {
    dispatch(allWaresheet(1, 1000));
  }, [dispatch]);

  

  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });

  // Data set

  useEffect(() => {
    const waresheetArr = [];
    if (data.waresheetList.data && data.waresheetList.data.length > 0) {
      data.waresheetList.data.forEach((waresheet, index) => {
        waresheetArr.push({
          SNo: index + 1,
          waresheetName: waresheet.waresheetName,
          description: waresheet.description,
          CreatedBy: `${waresheet.user.firstName} ${waresheet.user.lastName}`,
          created_at: readableDate(waresheet.created_at),
          waresheetId: waresheet.id,
        });
      });
    }
    setNewWaresheets(waresheetArr);
  }, [data]);

  function deleteWaresheet(id) {
    confirmAlert({
      // title: 'Confirm to submit',
      message: "Are you sure to want to delete.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .delete(`/api/v1/waresheet/${id}`)
              .then((Response) => {
                JSON.parse(Response.data);
                dispatch(allWaresheet(1, 1000));
              })
              .catch((error) => {
                console.log(error);
              });
          },
        },
        {
          label: "No",
          onClick: console.log("click"),
        },
      ],
    });
  }

  const columns = [
    {
      name: "SNo",
      label: "S.No",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "waresheetName",
      label: "Waresheet Name",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <span>{value?.slice(0, 20)}</span>
        ),
      },
    },
    {
      name: "description",
      label: "Description",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <span>{value?.slice(0, 35)}</span>
        ),
      },
    },

    {
      name: "CreatedBy",
      label: "Created By",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "created_at",
      label: "Creation Date",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "waresheetId",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <>
            <Link to={`/waresheet/${value}`}>
              <i className="fas fa-eye actionIconView"></i>
            </Link>
            <Link to={`/update-waresheet/${value}`}>
              <i className="fas fa-edit actionIconEdit"></i>
            </Link>
            <i
              onClick={() => deleteWaresheet(value)}
              className="fas fa-trash-alt actionIconDelete"
            ></i>
          </>
        ),
      },
    },
    
  ];

  return (
    <Layout>
      {data.waresheetDetail.statusCode === 200 ? (
        <FormSuccess onClick={successWarehouse} message="Waresheet Created" />
      ) : null}

      <CustomerLayout title="Create New Waresheet">
        <Modal show={modalIsOpen2} centered>
          <Modal.Body className="p-0">
            <div className="modal-content custom-modal-content">
              <div className="modal-body custom-modal-body pt-0">
                <div className="text-center mt-4">
                  <h6 className="h6-max-xxs font-weight-medium">
                    Waresheet Created Successfully!
                  </h6>
                  {/* <h6 className="h6-max-xxs font-weight-medium">Please Login again.</h6> */}
                </div>
              </div>
              <div className="col-sm-8 mx-auto mb-4">
                <button
                  onClick={() => {
                    setModalIsOpen2(false);
                  }}
                  className="btn btn-deep-primary btn-block mb-4"
                >
                  Ok
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <div className="row">
          <div className="content col-12 shadow-sm pb-4">
            <div className="pb-1 border-bottom mb-1">
              <button className="btn px-0  font-weight-bold mr-3 text-dark">
                <i
                  onClick={() => history.goBack()}
                  className="fas fa-chevron-left pr-3"
                ></i>
                Create New Waresheet{" "}
              </button>
            </div>
            <div className="row mx-0 pt-2">
              <div className="col-12 ">
                <div className="row">
                  <Formik
                    initialValues={{
                      waresheetName: "",
                      description: "",
                      makeItDefault: false,
                    }}
                    validationSchema={formValidation}
                    onSubmit={(fields, { resetForm }) => {
                      createwaresheet(fields);
                      resetForm();
                    }}
                    render={({
                      errors,
                      status,
                      touched,
                      setFieldValue,
                      values,
                    }) => (
                      <Form className="col-12 pt-2 bg-white shadow-sm py-4" style={{borderRadius:"10px"}}>
                        <div className="row">
                          <div className="col-md-6 col-12 pt-2">
                            <div className="row">
                              <div className="col-12">
                                <div className="form-group form-group-lg mb-0">
                                  <label
                                    htmlFor="exampleFormControlInput1"
                                    className=" mt-2 customLabel font-paragraph h6 pb-3"
                                  >
                                    Waresheet Name 
                                  </label>
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="form-group form-group-lg mb-1">
                                  <Field
                                    name="waresheetName"
                                    type="text"
                                    placeholder="Enter Here Waresheet Name"
                                    disabled={read}
                                    className={
                                      "form-control form-control-md" +
                                      (errors.waresheetName &&
                                      touched.waresheetName
                                        ? " is-invalid"
                                        : "")
                                    }
                                  />
                                  <ErrorMessage
                                    name="waresheetName"
                                    component="div"
                                    className="invalid-feedback"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-12">
                            <div className="row">
                              <div className="col-12">
                                <div className="form-group form-group-lg mb-1">
                                  <label
                                    htmlFor="exampleFormControlTextarea1"
                                    className="mb-0 mt-2 customLabel font-paragraph h6 pb-3"
                                  >
                                    Description
                                  </label>
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="form-group form-group-lg mb-1">
                                  <Field
                                    name="description"
                                    type="textarea"
                                    className={
                                      `form-control form-control-md` +
                                      (errors.description && touched.description
                                        ? " is-invalid"
                                        : "")
                                    }
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                    disabled={read}
                                    placeholder="Add notes, what do you like about this Warehouse?"
                                  ></Field>
                                  <ErrorMessage
                                    name="description"
                                    component="div"
                                    className="invalid-feedback"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 position-absolute py-3 right-0 text-end top-0 w-100px">
                            <button
                              className={`btn btn-deep-primary py-1 ${
                                read ? "d-none" : ""
                              }`}
                              type="submit"
                            >
                              Create
                            </button>
                          </div>
                        </div>
                      </Form>
                    )}
                  />
                </div>
              </div>
            </div>

            {newWaresheets !== null && (
              <div className="my-3 custom-table-dark">
                <ThemeProvider theme={theme}>
                  <MUIDataTable
                    // title={"waresheet"}
                    data={newWaresheets}
                    columns={columns}
                    options={options}

                  />
                </ThemeProvider>
              </div>
            )}
          </div>
        </div>
      </CustomerLayout>
    </Layout>
  );
};
export default CreateNewWaresheet;
