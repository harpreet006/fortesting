import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { updateOtherServiceRFQ, responseRfq } from '../../../store/actions/customer/rfqAction'
import { useSelector, useDispatch } from 'react-redux';
import FormSuccess from '../../../components/helper/FormSuccess';
import Spinner from 'react-bootstrap/Spinner';
import { onlyAlphaNumericSpaceAllow } from '../../../components/validation';

const OtherServiceRequirementForm = ({ isView, rfqid }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.CUSTOMER_RFQ_INFO);
  // console.log("Other service RFQ===>", data)

  const [jsonData, setJsonData] = useState([
    // {
    //   "descriptionType": "IT",
    //   "noOfIds": "",
    //   "quantity": "",
    //   "remark": ""
    // },
    {
      "descriptionType": "WMS *",
      // "noOfIds": "",
      // "quantity": "",
      // "remark": ""
      "noOfIds": 0,
      "quantity": 0,
      "remark": "", 
    },
    {
      "descriptionType": "DMS *",
      // "noOfIds": "",
      // "quantity": "",
      // "remark": ""
      "noOfIds": 0,
      "quantity": 0,
      "remark": "", 
    },
    // {
    //   "descriptionType": "TMS",
    //   "noOfIds": "",
    //   "quantity": "",
    //   "remark": ""
    // },
    // {
    //   "descriptionType": "Material Handling Equipments -",
    //   "noOfIds": "",
    //   "quantity": "",
    //   "remark": ""
    // },
    {
      "descriptionType": "Forklift *",
      // "noOfIds": "",
      // "quantity": "",
      // "remark": ""
      "noOfIds": 0,
      "quantity": 0,
      "remark": "", 
    },
    {
      "descriptionType": "Hand Pallets *",
      // "noOfIds": "",
      // "quantity": "",
      // "remark": ""
      "noOfIds": 0,
      "quantity": 0,
      "remark": "", 
    },
    {
      "descriptionType": "Reach Staker *",
      // "noOfIds": "",
      // "quantity": "",
      // "remark": ""
      "noOfIds": 0,
      "quantity": 0,
      "remark": "", 
    },
    {
      "descriptionType": "Wooden/Plastic Pallets *",
      // "noOfIds": "",
      // "quantity": "",
      // "remark": ""
      "noOfIds": 0,
      "quantity": 0,
      "remark": "", 
    },
    {
      "descriptionType": "Hand Trolleys *",
      // "noOfIds": "",
      // "quantity": "",
      // "remark": ""
      "noOfIds": 0,
      "quantity": 0,
      "remark": "", 
    },
    {
      "descriptionType": "Others (pls specify)",
      // "noOfIds": "",
      // "quantity": "",
      // "remark": ""
      "noOfIds": 0,
      "quantity": 0,
      "remark": "", 
    }
  ])

  const sarSchema = Yup.object().shape({
    otherServiceRequirements: Yup.array().of(
      Yup.object().shape({
        // noOfIds: Yup.string().required('Required').max(5, 'Must be 5 digits'),
        // quantity: Yup.string().required('Required').max(5, 'Must be 5 digits'),
        remark: Yup.string().required('Required'),
      })
    )
  });


  useEffect(() => {

    if (data.rfqInitialDetail?.otherServiceRequirements && data.rfqInitialDetail?.otherServiceRequirements.length !== 0) {
      setJsonData(
        data.rfqInitialDetail.otherServiceRequirements
      )
    }

    if (data.rfqFirstForm?.otherServiceRequirements && data.rfqFirstForm?.otherServiceRequirements?.length !== 0) {
      setJsonData(
        data.rfqFirstForm.otherServiceRequirements
      )
    }

  }, [data]);


  return (
    <>
      {
        (data.rfqResponse.statusCode === 201 || data.rfqResponse.statusCode === 200) ?
          <FormSuccess onClick={() => dispatch(responseRfq([]))} message={data.rfqResponse.message} />
          : null
      }


      <Formik
        enableReinitialize={true}
        validationSchema={sarSchema}
        initialValues={{ "otherServiceRequirements": jsonData }}
        onSubmit={fields => {
          if (rfqid) {
            fields["customerRfq"] = rfqid
            dispatch(updateOtherServiceRFQ(fields,data.rfqFirstForm.warehouses))
          }
        }}

        render={({ values, errors, status, onChange, touched, setFieldValue }) => {
          return (
            <div className="w-100 d-block">
              <Form >
                <div className="row pt-2">
                  <div className="row col-12 ml-0">
                    <div className="col-12 px-0 table-responsive border bg-deep-gray rounded-md table-cell">
                      <table className="table text-center">
                        <thead>
                          <tr>
                            <td className="border-top-0 font-weight-bold py-3">S.no</td>
                            <td className="text-left border-top-0 font-weight-bold text-nowrap py-3 w-160px">Description</td>
                            <td className="border-top-0 font-weight-bold text-nowrap py-3 mw-150px"></td>
                            {/* <td className="border-top-0 font-weight-bold text-nowrap py-3 mw-150px">No of IDs</td>
                            <td className="border-top-0 font-weight-bold text-nowrap py-3">Qty</td> */}
                            <td className="border-top-0 font-weight-bold py-3 mw-200px">Remarks</td>
                          </tr>
                        </thead>
                        <tbody>

                          {values.otherServiceRequirements.length > 0 &&
                            values.otherServiceRequirements.map((man, index) => {
                              const boundErrors = (errors.otherServiceRequirements?.length && errors.otherServiceRequirements[index]) || {};
                              const boundTouched = (touched.otherServiceRequirements?.length && touched.otherServiceRequirements[index]) || {};
                              return (

                                <tr key={index}>
                                  <td>
                                    {index + 1}
                                  </td>
                                  <td className="text-left">
                                    {man.descriptionType}
                                  </td>
                                  <td>
                                    <Field
                                      onChange={e => setFieldValue(`otherServiceRequirements.${index}.yesNo`, e.target.value === "true")}
                                      name={`otherServiceRequirements.${index}.yesNo`} as="select" className={`form-control h-35px bg-white my-1` + (boundErrors.yesNo && boundTouched.yesNo ? ' is-invalid' : '')} readOnly={isView}>
                                      <option value="">Select</option>
                                      <option value={true}>Yes</option>
                                      <option value={false}>No</option>
                                    </Field>
                                    <ErrorMessage name={`otherServiceRequirements.${index}.yesNo`} component="div" className="invalid-feedback" />
                                  </td>
                                  {/* <td>
                                    <Field name={`otherServiceRequirements.${index}.noOfIds`} onKeyPress={(e) => onlyNumberAllow(e)} type="number" className={`form-control text-center bg-white  my-1` + (boundErrors.noOfIds && boundTouched.noOfIds ? ' is-invalid' : '')} readOnly={isView} placeholder="Type here" />
                                    <ErrorMessage name={`otherServiceRequirements.${index}.noOfIds`} component="div" className="invalid-feedback" />
                                  </td>
                                  <td>
                                    <Field name={`otherServiceRequirements.${index}.quantity`} onKeyPress={(e) => onlyNumberAllow(e)} type="number" className={`form-control text-center bg-white  my-1` + (boundErrors.quantity && boundTouched.quantity ? ' is-invalid' : '')} readOnly={isView} placeholder="Type here" />
                                    <ErrorMessage name={`otherServiceRequirements.${index}.quantity`} component="div" className="invalid-feedback" />
                                  </td> */}
                                  <td>
                                    <Field name={`otherServiceRequirements.${index}.remark`} onKeyPress={(e) => onlyAlphaNumericSpaceAllow(e)} type="text" className={`form-control text-center bg-white  my-1` + (boundErrors.remark && boundTouched.remark ? ' is-invalid' : '')} placeholder="Type here" readOnly={isView} />
                                    <ErrorMessage name={`otherServiceRequirements.${index}.remark`} component="div" className="invalid-feedback" />
                                  </td>
                                </tr>

                              )
                            })}

                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className={`col-12 mt-5 ${isView ? "d-none" : ""}`}>
                    <div className="row justify-content-end">
                      {/* <div className="col-auto">
            <button type="button" className="btn btn-outline-deep-primary mb-3 add-className remove-className" data-add-target=".steps9" data-add-target-className="d-none" data-remove-target=".steps8" data-remove-target-className="d-none">Back</button>
          </div> */}
                      <div className="col-auto">
                        <button type="submit" disabled={data.isLoading} className="btn btn-deep-primary mb-3 add-className remove-className">Save
                          {data.isLoading ? <Spinner animation="border" /> : null}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          )
        }}
      />
    </>
  );
}

export default OtherServiceRequirementForm;
