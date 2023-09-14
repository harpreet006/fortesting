import React from "react";
import { useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import VendorLayout from "../../../layout/VendorLayout";
import { useDispatch, useSelector } from "react-redux";
import { createRole, responseWhs } from "../../../store/actions/subUserAction";
import FormSuccess from "../../../components/helper/FormSuccess";
import Spinner from "react-bootstrap/Spinner";
import {
  onlyLetterSpaceAllow,
  forDescriptionAlphaNumericAllow,
} from "../../../components/validation";

const CreateSubUserRole = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.WHS_USER_INFO);

  const roleSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
  });

  const redirect = () => {
    dispatch(responseWhs(null));
    history.replace(`/vendor/managerole`);
  };

  return (
    <VendorLayout>
      {data.whsResponse !== null ? (
        <FormSuccess onClick={redirect} message={`Role Created`} />
      ) : null}

      <div className="content-admin px-2">
        <div className="row align-items-center pt-2 px-3 mx-0">
          <div className="col-12 ">
            <h5
              onClick={() => history.goBack()}
              className="text-dark backButton"
            >
              <i className="fas fa-chevron-left mr-2"></i> Create Role
            </h5>

          </div>
          <div className="col-12">
            <Formik
              enableReinitialize={true}
              validationSchema={roleSchema}
              initialValues={{
                name: "",
                description: "",
              }}
              onSubmit={(fields) => {
                console.log("Fields==>", fields);
                dispatch(createRole(fields));
              }}
              render={({ errors, status, touched }) => (
                <Form className="bg-white p-3">
                  <div className="row">
                    <div className="form-group col-12 mb-2">
                      <label for="staticEmail" className="mb-1">
                        Role Name
                      </label>
                      {/* <input type="text" className="form-control form-control-md rounded-pill" id="staticEmail" value="Type Role Name"/> */}
                      <Field
                        onKeyPress={(e) => onlyLetterSpaceAllow(e)}
                        name="name"
                        type="text"
                        className={
                          "form-control form-control-md rounded-pill" +
                          (errors.name && touched.name ? " is-invalid" : "")
                        }
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group col-12 mb-2">
                      <label for="staticEmail" className="mb-1">
                        Role Description
                      </label>
                      <Field
                        onKeyPress={(e) => forDescriptionAlphaNumericAllow(e)}
                        name={`description`}
                        className={
                          `form-control form-control form-control-md rounded-md` +
                          (errors.description && touched.description
                            ? " is-invalid"
                            : "")
                        }
                        id="exampleFormControlTextarea1"
                        placeholder="Type Here Description"
                        rows="5"
                      ></Field>
                      <ErrorMessage
                        name={`description`}
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>
                  <div className="row justify-content-end pt-3">
                    <div className="col-auto">
                      <button
                        onClick={() => history.goBack()}
                        type="button"
                        className="btn btn-outline-deep-primary px-5"
                      >
                        Back
                      </button>
                    </div>
                    <div className="col-auto">
                      <button type="submit" className="btn btn-deep-primary px-5">
                        Create Role
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
    </VendorLayout>
  );
};

export default CreateSubUserRole;
