import React, { useEffect } from "react";
import Layout from "../../../layout/Layout";
import BrowserTitle from "../../../components/helper/BrowserTitle";
import CustomerLayout from "../../../layout/CustomerLayout";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createRole, responseWhs } from "../../../store/actions/subUserAction";
import FormSuccess from "../../../components/helper/FormSuccess";
import {
  onlyLetterAllowWithSpace,
  onlyAlphaNumericSpaceAllow,
} from "../../../components/validation";

const CreateRole = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.WHS_USER_INFO);

  const roleSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
  });

  const redirect = () => {
    dispatch(responseWhs(null));
    history.replace(`/manageroles`);
  };

  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });
  return (
    <Layout>
      <BrowserTitle title="Create Role" />

      {data.whsResponse !== null ? (
        <FormSuccess onClick={redirect} message={`Role Created`} />
      ) : null}

      <CustomerLayout title="Create Role">
        <div className="content col-12">
          <div className="pb-2 border-bottom d-sm-flex justify-content-between">
            <div>
              <button
                className="btn font-weight-bold"
                data-target=".add-subuser"
                data-toggle-class="d-none"
              >
                <i
                  onClick={() => history.goBack()}
                  className="fas fa-chevron-left pr-3"
                ></i>
                Create Role{" "}
              </button>
            </div>
          </div>
          <div className="row p-3">
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
                  <Form>
                    <div className="row justify-content-center bg-white pt-4">
                      <div className="form-group col-xl-6 col-md-6 mb-4">
                        <label for="staticEmail" className="mb-2">
                          Role Name
                        </label>

                        <Field
                          onKeyPress={(e) => onlyLetterAllowWithSpace(e)}
                          name="name"
                          type="text"
                          placeholder="Enter role"
                          className={
                            "form-control form-control-md" +
                            (errors.name && touched.name ? " is-invalid" : "")
                          }
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>

                      <div className="form-group col-xl-6 col-md-6 mb-4">
                        <label for="staticEmail" className="mb-2">
                          Role Description
                        </label>

                        <Field
                          onKeyPress={(e) => onlyAlphaNumericSpaceAllow(e)}
                          name="description"
                          type="text"
                          placeholder="Enter Role Description"
                          className={
                            "form-control form-control-md" +
                            (errors.description && touched.description
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name="description"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="row justify-content-end pb-3 px-0">
                        <div className="col-auto">
                          <button
                            onClick={() => history.goBack()}
                            type="button"
                            className="btn btn-deep-primary px-4"
                          >
                            Back
                          </button>
                        </div>
                        <div className="col-auto">
                          <button
                            type="submit"
                            className="btn btn-deep-primary"
                          >
                            Create Role
                          </button>
                          {/* {this.props.user.type === 'CREATE_ROLE_PENDING' ? <CircularProgress color="secondary" /> : null} */}
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

export default CreateRole;
