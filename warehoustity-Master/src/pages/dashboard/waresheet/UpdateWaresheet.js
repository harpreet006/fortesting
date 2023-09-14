import React, { useState, useEffect } from "react";
import Layout from "../../../layout/Layout";
import { useHistory, useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomerLayout from "../../../layout/CustomerLayout";
import { getWaresheetById } from "../../../store/actions/customer/waresheetAction";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../api/axios-auth";
import { useToasts } from "react-toast-notifications";
// import { confirmAlert } from "react-confirm-alert";
import { allWaresheet } from "../../../store/actions/customer/waresheetAction";

const UpdateWaresheet = () => {
  const { addToast } = useToasts();
  const { waresheetId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const read = useSelector((state) => state.SIDEMENU_INFO.read_only);
  const data = useSelector((state) => state.WARESHEETINFO);

  const [formJson, setFormJson] = useState({
    waresheetName: "",
    description: "",
    makeItDefault: false,
  });

  useEffect(() => {
    if (data.waresheetById) {
      setFormJson({
        waresheetName: data.waresheetById.waresheetName,
        description: data.waresheetById.description,
        makeItDefault: data.waresheetById.makeItDefault,
      });
    }
  }, [data]);

  let formValidation = Yup.object().shape({
    waresheetName: Yup.string()
      .min(3, "Too Short!")

      .required("Warehouse Name is required"),

    description: Yup.string()
      .min(3, "Too Short!")

      .required("Description is required"),
  });

  const createwaresheet = (fields) => {
    let obj = {
      waresheetName: fields.waresheetName,
      description: fields.description,
      makeItDefault: fields.makeItDefault,
    };
    axios
      .put(`/api/v1/waresheet/${waresheetId}`, obj)
      .then((Response) => {
        let res = JSON.parse(Response.data);
        console.log("rjha", res);
        if (res.statusCode === 200) {
          dispatch(allWaresheet({ page: 1, limit: 1000 }));
          setTimeout(() => {
            history.goBack()
          }, 1000);
          addToast(res.message, { appearance: "success", autoDismiss: true });
        } else {
          addToast(res.message, { appearance: "error", autoDismiss: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    dispatch(getWaresheetById(waresheetId));
  }, [dispatch, waresheetId]);

  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });
  return (
    <Layout>
      <CustomerLayout title="Create New Waresheet">
        <div className="row">
          <div className="content col-12 shadow-sm pb-4">
            <div className="pb-1 border-bottom mb-1">
              <button className="btn px-0 text-dark font-weight-bold mr-3">
                <i
                  onClick={() => history.goBack()}
                  className="fas fa-chevron-left pr-3"
                ></i>
                Update Waresheet{" "}
              </button>
            </div>
            <div className="row mx-0 pt-2">
              <div className="col-12 border">
                <div className="row">
                  <Formik
                    enableReinitialize={true}
                    initialValues={formJson}
                    validationSchema={formValidation}
                    onSubmit={(fields) => {
                      createwaresheet(fields);
                      // dispatch(crea(fields))
                    }}
                    render={({
                      errors,
                      status,
                      touched,
                      setFieldValue,
                      values,
                    }) => (
                      <Form className="col-12 pt-2">
                        <div className="form-group form-group-lg mb-4">
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="mb-2 h6"
                          >
                            Waresheet Name
                          </label>
                          <Field
                            name="waresheetName"
                            type="text"
                            placeholder="Enter Here Waresheet Name"
                            disabled={read}
                            className={
                              "form-control form-control-md" +
                              (errors.waresheetName && touched.waresheetName
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
                        <div className="form-group form-group-lg mb-4">
                          <label
                            htmlFor="exampleFormControlTextarea1"
                            className="mb-2 h6"
                          >
                            Description
                          </label>
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
                        {/* <div className="custom-control custom-switch common-switch">
                          <Field
                            name="makeItDefault"
                            type="checkbox"
                            className="custom-control-input common-switch-input"
                            id="customSwitch1"
                            onClick={() => {
                              if (values.makeItDefault) {
                                setFieldValue("makeItDefault", false);
                                return;
                              }
                              confirmAlert({
                                // title: 'Change Status',
                                message:
                                  "There is already a Default Waresheet, would like to continue?",
                                buttons: [
                                  {
                                    label: "Yes",
                                    onClick: () => {
                                      setFieldValue("makeItDefault", true);
                                    },
                                  },
                                  {
                                    label: "No",
                                    onClick: () => {
                                      setFieldValue("makeItDefault", false);
                                    },
                                  },
                                ],
                              });
                            }}
                            disabled={read}
                          />
                          <label
                            className="custom-control-label common-switch-label text-gray h6"
                            htmlFor="customSwitch1"
                          >
                            Make It Default
                          </label>
                        </div> */}
                        <div className="col-12 px-0 py-4">
                          {/* <Link
                            to={"/waresheet"}
                            className="btn btn-outline-secondary mr-3 toggle-className my-2 py-1"
                          >
                            Cancel
                          </Link> */}
                          <button
                            className={`btn btn-deep-primary py-1 ${
                              read ? "d-none" : ""
                            }`}
                            type="submit"
                          >
                            Update
                          </button>
                        </div>
                      </Form>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CustomerLayout>
    </Layout>
  );
};

export default UpdateWaresheet;
