import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  updateRequirementRFQ,
  responseRfq,
} from "../../../store/actions/customer/rfqAction";
import { useSelector, useDispatch } from "react-redux";
import FormSuccess from "../../../components/helper/FormSuccess";
import Spinner from "react-bootstrap/Spinner";
import { onlyAlphaNumericSpaceAllow } from "../../../components/validation";

const AdditionalRequirementsForm = ({ isView, rfqid }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.CUSTOMER_RFQ_INFO);

  const [additionalRequirement, setAdditionalRequirements] = useState("");

  const inboundSchema = Yup.object().shape({
    additionalRequirement: Yup.string().required("Required"),
  });

  useEffect(() => {
    if (
      data.rfqInitialDetail &&
      data.rfqInitialDetail !== undefined &&
      data.rfqInitialDetail?.additionalRequirement &&
      data.rfqInitialDetail?.additionalRequirement.additionalRequirement !==
        undefined
    ) {
      setAdditionalRequirements(
        data.rfqInitialDetail.additionalRequirement.additionalRequirement
      );
    }

    if (
      data.rfqFirstForm &&
      data.rfqFirstForm !== undefined &&
      data.rfqFirstForm?.additionalRequirement &&
      data.rfqFirstForm?.additionalRequirement?.additionalRequirement !==
        undefined
    ) {
      setAdditionalRequirements(
        data.rfqFirstForm.additionalRequirement.additionalRequirement
      );
    }
  }, [data]);

  return (
    <>
      {data.rfqResponse.statusCode === 201 ||
      data.rfqResponse.statusCode === 200 ? (
        <FormSuccess
          onClick={() => dispatch(responseRfq([]))}
          message={data.rfqResponse.message}
        />
      ) : null}

      <Formik
        enableReinitialize={true}
        validationSchema={inboundSchema}
        initialValues={{
          additionalRequirement: additionalRequirement,
        }}
        onSubmit={(fields) => {
          if (rfqid) {
            fields["customerRfq"] = parseInt(rfqid);

            dispatch(updateRequirementRFQ(fields,data?.rfqFirstForm?.warehouses));
          }
        }}
        render={({ values, errors, status, onChange, touched }) => {
          return (
            <div className="w-100 d-block">
              <Form>
                <div className="row pt-1 col-12">
                  <div className="row col-12 ml-0">
                    <div className="input-group">
                      <Field
                        type="textarea"
                        as="textarea"
                        name="additionalRequirement"
                        onKeyPress={(e) => onlyAlphaNumericSpaceAllow(e)}
                        className={
                          `w-100 form-control` +
                          (errors.additionalRequirement &&
                          touched.additionalRequirement
                            ? " is-invalid"
                            : "")
                        }
                        rows="5"
                        style={{minHeight :"200px"}}
                        readOnly={isView}
                        placeholder="Type here"
                      ></Field>
                      <ErrorMessage
                        name="additionalRequirement"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>
                  <div className={`col-12 mt-1 ${isView ? "d-none" : ""}`}>
                    <div className="row justify-content-end">
                      <div className="col-auto">
                        <button
                          disabled={data.isLoading}
                          type="submit"
                          className="btn btn-deep-primary mb-3 add-class remove-class"
                        >
                          Save
                          {data.isLoading ? (
                            <Spinner animation="border" />
                          ) : null}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          );
        }}
      />
    </>
  );
};

export default AdditionalRequirementsForm;
