import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, getIn } from "formik";
import * as Yup from "yup";
import {
   updateContactRFQ,
  updateGeneralRFQ,
  responseRfq,
  finalRfq,
} from "../../../../store/actions/customer/rfqAction";
import { useSelector, useDispatch } from "react-redux";
import FormSuccess from "../../../../components/helper/FormSuccess";
import Spinner from "react-bootstrap/Spinner";
import { useHistory } from "react-router";


const ConciseFrqForm = ({ isView, rfqId }) => {
  const [formSuccess, setFormSuccess] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.CUSTOMER_RFQ_INFO);


  const contactForm = {
    industrySector: {
      name: "",
    },
    productType: {
      name: "",
    },
    warehouseCategory: {
      category: {
        name: "",
      },
      bounded: {
        name: "",
      },
      other: "",
    },
    // "availabilityRfq": "",
    //  "unitStore": "",
    //  "handleUnit":"",
    //  "invoiceOUT": "",
    //  "remark":"",
    dangerousGoods: "",
    warehouseLocation: {
      cityAndArea: {
        name: "",
      },
      other: "",
    },
    workingHour: {
      startTime: "",
      endTime: "",
      week: "",
      other: "",
    },
    contractPeriod: {
      contract: {
        name: "",
      },
      others: "other",
      startDate:"",
      endDate:""
    },
    // storageType :{
    //   name :""
    // },
    handleUnit :"",
    unitStore:"retailer",
    invoiceOUT :'',
    "availabilityRfq": "2021-04-01 07:37:05",
    remark:"",
    plannedGoLiveDate: new Date(),
  };

  let contactSchema = Yup.object().shape({
    industrySector: Yup.lazy(() => {
      return Yup.object().shape({
        name: Yup.string().required("Required"),
      });
    }),

    productType: Yup.lazy(() => {
      return Yup.object().shape({
        name: Yup.string().required("Required"),
      });
    }),
    storageType: Yup.lazy(() => {
      return Yup.object().shape({
        name: Yup.string().required("Required"),
      });
    }),


    warehouseCategory: Yup.lazy(() => {
      return Yup.object().shape({
        category: Yup.lazy(() => {
          return Yup.object().shape({
            name: Yup.string().required("Required"),
          });
        }),
      });
    }),
  });

  function redirect() {
    dispatch(responseRfq([]));
    setFormSuccess(false);
    // history.replace(`/managerfq?page=1`);
  }
 
  return (
    <>
      {formSuccess &&
        <FormSuccess onClick={redirect} message={<><p className="mb-0">Thank you! RQF Submitted.</p><p  className="mb-0">  Check further details in RFQ section.</p></>} />
      }

      <Formik
        // enableReinitialize={true}
        initialValues={contactForm}
        // validationSchema={contactSchema}
        onSubmit={(fields) => {
          // console.log("Fielddddd====>>" , fields)
          console.log("fields",rfqId)
          if (rfqId) { 
            fields["customerRfq"] = parseInt(rfqId);
            dispatch(updateGeneralRFQ(fields,data?.rfqFirstForm?.warehouses));

            dispatch(
              finalRfq(
                {
                  warehouseSpaceRequired: 0,
                  customerRfqFormFilled: true,
                },
                rfqId,
                setFormSuccess
              )
            );

            // dispatch(updateContactRFQ(fields))
          }
        }}
        render={({ values, errors, status, onChange, touched }) => (
          <Form>
            <div className="row pt-2">
              <div className="form-group col-sm-6 mb-3">
                <label htmlFor="staticEmail" className="mb-1">
                  Industry <span className="text-danger h6">*</span>
                </label>
                <Field
                  name={`industrySector.name`}
                  as="select"
                  className={
                    `form-control form-control-md custom-select rounded-0` +
                    (getIn(errors, "industrySector.name") &&
                    getIn(touched, "industrySector.name")
                      ? " is-invalid"
                      : "")
                  }
                  disabled={isView}
                >
                  <option>Select</option>
                  <option value="retail">Retail</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Hi-tech">Hi-tech</option>
                  <option value="Chemicals">Chemicals</option>
                  <option value="Audio, Vidoe, Telecom">
                    Audio, Vidoe, Telecom
                  </option>
                  <option value="Engineering">Engineering</option>
                  <option value="E-Commerce">E-Commerce</option>
                  <option value="Pharma">Pharma</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Public Sector">Public Sector</option>
                  <option value="others, pls specify">
                    others, pls specify
                  </option>
                </Field>
                <ErrorMessage
                  name={`industrySector.name`}
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-group col-sm-6 mb-3">
                <label htmlFor="staticEmail" className="mb-1">
                  Select Product <span className="text-danger h6">*</span>
                </label>
                <Field
                  name={`productType.name`}
                  as="select"
                  className={
                    `form-control form-control-md custom-select rounded-0` +
                    (getIn(errors, "productType.name") &&
                    getIn(touched, "productType.name")
                      ? " is-invalid"
                      : "")
                  }
                  disabled={isView}
                >
                  <option>Select</option>
                  <option value="finish goods">finish goods</option>
                  <option>raw materials</option>
                  <option>spare part</option>
                </Field>
                <ErrorMessage
                  name={`productType.name`}
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-group col-sm-6 mb-3">
                <label htmlFor="staticEmail" className="mb-1">
                  {" "}
                  WHS Type <span className="text-danger h6">*</span>
                </label>
                <Field
                  name="warehouseCategory.category.name"
                  as="select"
                  className={
                    `form-control form-control-md custom-select rounded-0` +
                    (getIn(errors, "warehouseCategory.category.name") &&
                    getIn(touched, "warehouseCategory.category.name")
                      ? " is-invalid"
                      : "")
                  }
                  disabled={isView}
                >
                  <option>Select</option>
                  <option value="General">General</option>
                  <option value="Custom Bonded">Custom Bonded</option>
                  <option value="Temperature Controlled">
                    Temperature Controlled
                  </option>
                  <option value="inFTWZ">in FTWZ</option>
                  <option value="in BLP">in BLP</option>
                  <option value="Other">Other</option>
                </Field>
                <ErrorMessage
                  name={`warehouseCategory.category.name`}
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-group col-sm-6 mb-3">
                <label htmlFor="staticEmail" className="mb-1">
                  Storage Type <span className="text-danger h6">*</span>
                </label>
                <Field
                   name={`storageType.name`}
                  as="select"
                  // className={`form-control form-control-md custom-select rounded-0`}
                  className={
                    `form-control form-control-md custom-select rounded-0` +
                    (getIn(errors, "storageType.name") &&
                    getIn(touched, "storageType.name")
                      ? " is-invalid"
                      : "")
                  }
                  disabled={isView}
                >
                  <option>Select</option>
                  <option value="retail">Floor</option>
                  <option value="Automotive">Pallet</option>
                </Field>
                <ErrorMessage
                  name={`storageType.name`}
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-group col-sm-6 mb-3">
                <label htmlFor="staticEmail" className="mb-1">
                  Handling Unit
                </label>
              <Field 
              name={`handleUnit`}
              type="text"
              className="form-control form-control-md rounded-0"
              id="staticEmail"
              placeholder=""
              >

              </Field>
                {/* <input
                  name={`handleUnit`}
                  type="text"
                  className="form-control form-control-md rounded-0"
                  id="staticEmail"
                  placeholder=""
                /> */}
              </div>

              <div className="form-group col-sm-6 mb-3">
                <label htmlFor="staticEmail" className="mb-1">
                  No. of Unit to be stored
                </label>
                {/* <input */}
                <Field
                  // name={`companyName`}
                  name="unitStore"
                  type="text"
                  className="form-control form-control-md rounded-0"
                  id="staticEmail"
                  placeholder=""
                />
              </div>

              <div className="form-group col-sm-6 mb-3">
                <label htmlFor="staticEmail" className="mb-1">
                  No. of Invoice-OUT
                </label>
                {/* <input */}
                <Field
                  name={`invoiceOUT`}
                  type="text"
                  className="form-control form-control-md rounded-0"
                  id="staticEmail"
                  placeholder=""
                />
              </div>

              <div className="form-group col-sm-6 mb-3">
                <label htmlFor="staticEmail" className="mb-1">
                  Availability Rfq Form
                </label>
                {/* <input */}
                <Field
                  // name={`companyName`}
                  name={`availabilityRfq`}
                  type="text"
                  className="form-control form-control-md rounded-0"
                  id="staticEmail"
                  placeholder=""
                />
              </div>

              <div className="form-group col-sm-6 mb-3">
                <label htmlFor="staticEmail" className="mb-1">
                  Remarks
                </label>
                {/* <input */}
                <Field
                  // name={`companyName`}
                  name={`remark`}
                  type="text"
                  className="form-control form-control-md rounded-0"
                  id="staticEmail"
                  placeholder=""
                />
              </div>

              <div className={`col-12 mt-3 ${isView ? "d-none" : ""}`}>
                <div className="row justify-content-end">
                  <div className="col-auto">
                    <button
                      type="submit"
                      disabled={data.isLoading}
                      className="btn btn-deep-primary mb-3 add-className remove-className"
                    >
                      Save
                      {data.isLoading ? <Spinner animation="border" /> : null}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      />
    </>
  );
};

export default ConciseFrqForm;
