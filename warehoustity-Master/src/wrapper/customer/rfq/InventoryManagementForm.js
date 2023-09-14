import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { updateInventorRFQ, responseRfq } from '../../../store/actions/customer/rfqAction'
import { useSelector, useDispatch } from 'react-redux';
import FormSuccess from '../../../components/helper/FormSuccess';
import Spinner from 'react-bootstrap/Spinner';
import { onlyNumberAllow, onlyAlphaNumericSpaceAllow } from '../../../components/validation';

const InventoryManagementForm = ({ isView, rfqid }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.CUSTOMER_RFQ_INFO);
  const [jsonData, setJsonData] = useState([
    // {
    //   "processType": "FIFO",
    //   "yesNo": false,
    //   "dailyWeekMonth": "DAILY",
    //   "quantity": "",
    //   "remark": ""
    // },
    // {
    //   "processType": "LIFO",
    //   "yesNo": false,
    //   "dailyWeekMonth": "DAILY",
    //   "quantity": "",
    //   "remark": ""
    // },
    {
      "processType": "Storage Type",
      storageType :"",
      "yesNo": false,
      "dailyWeekMonth": "DAILY",
      "quantity": "",
      "remark": ""
    },
    {
      "processType": "Lot / Batch Controll Req?",
      storageType :"",
      "yesNo": false,
      "dailyWeekMonth": "DAILY",
      "quantity": "",
      "remark": ""
    },
    {
      "processType": "Serial No",
      storageType :"",
      "yesNo": false,
      "dailyWeekMonth": "DAILY",
      "quantity": "",
      "remark": ""
    },
    {
      "processType": "Expiration / Self Life Req?",
      storageType :"",
      "yesNo": false,
      "dailyWeekMonth": "DAILY",
      "quantity": "",
      "remark": ""
    },
    // {
    //   "processType": "Others",
    //   "yesNo": false,
    //   "dailyWeekMonth": "DAILY",
    //   "quantity": "",
    //   "remark": ""
    // },
    // {
    //   "processType": "Inventory Count -",
    //   "yesNo": false,
    //   "dailyWeekMonth": "DAILY",
    //   "quantity": "",
    //   "remark": ""
    // },
    // {
    //   "processType": "Cycle Count",
    //   "yesNo": false,
    //   "dailyWeekMonth": "DAILY",
    //   "quantity": "",
    //   "remark": ""
    // },
    // {
    //   "processType": "Perpitual Inventory",
    //   "yesNo": false,
    //   "dailyWeekMonth": "DAILY",
    //   "quantity": "",
    //   "remark": ""
    // },
    // {
    //   "processType": "Wall to wall",
    //   "yesNo": false,
    //   "dailyWeekMonth": "DAILY",
    //   "quantity": "",
    //   "remark": ""
    // },
    // {
    //   "processType": "Others",
    //   "yesNo": false,
    //   "dailyWeekMonth": "DAILY",
    //   "quantity": "",
    //   "remark": ""
    // }, {
    //   "processType": "Average Stock Level (Product)",
    //   "yesNo": false,
    //   "dailyWeekMonth": "DAILY",
    //   "quantity": "",
    //   "remark": ""
    // },
    // {
    //   "processType": "Average Inventory Value in INR",
    //   "yesNo": false,
    //   "dailyWeekMonth": "DAILY",
    //   "quantity": "",
    //   "remark": ""
    // },
    // {
    //   "processType": "Peak Month",
    //   "yesNo": false,
    //   "dailyWeekMonth": "DAILY",
    //   "quantity": "",
    //   "remark": ""
    // },
    // {
    //   "processType": "Lean Month",
    //   "yesNo": false,
    //   "dailyWeekMonth": "DAILY",
    //   "quantity": "",
    //   "remark": ""
    // }

  ])

  const invenSchema = Yup.object().shape({
    inventoryManagements: Yup.array().of(
      Yup.object().shape({
        yesNo: Yup.string().required('Required'),
        dailyWeekMonth: Yup.string().required('Required'),
        quantity: Yup.string().required('Required').max(5, 'Must be 5 digits'),
        remark: Yup.string().required('Required')
      })
    )
  });


  useEffect(() => {

    if (data.rfqInitialDetail.inventoryManagements && data.rfqInitialDetail.inventoryManagements.length !== 0) {
      setJsonData(
        data.rfqInitialDetail.inventoryManagements.map((item, i) => {
          return (
            {
              "processType": item.processType,
              "yesNo": item.yesNo,
              "dailyWeekMonth": item.dailyWeekMonth,
              "quantity": item.quantity,
              "remark": item.remark
            }
          )
        })
      )
    }

    if (data.rfqFirstForm?.inventoryManagements && data.rfqFirstForm?.inventoryManagements.length !== 0) {
      setJsonData(
        data.rfqFirstForm.inventoryManagements.map((item, i) => {
          return (
            {
              "processType": item.processType,
              "yesNo": item.yesNo,
              "dailyWeekMonth": item.dailyWeekMonth,
              "quantity": item.quantity,
              "remark": item.remark
            }
          )
        })
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
        validationSchema={invenSchema}
        initialValues={{ "inventoryManagements": jsonData }}
        onSubmit={fields => {
          if (rfqid) {
            fields["customerRfq"] = rfqid
            // console.log("submit---->>" , fields)
            dispatch(updateInventorRFQ(fields,data?.rfqFirstForm?.warehouses))
          }
        }}

        render={({ values, errors, handleBlur, status, onChange, touched, setFieldValue }) => {

          return (
            <div className="w-100 d-block">
              <Form >
                <div className="row pt-2">
                  <div className="col-12 ml-0">
                    <div className="table-responsive border bg-deep-gray rounded-md table-cell">
                      <table className="table text-center">
                        <thead>
                          <tr>
                            <td className="border-top-0 font-weight-bold py-3">S.no</td>
                            <td className="text-left border-top-0 font-weight-bold text-nowrap py-3 w-160px">Process Description</td>
                            <td className="border-top-0 font-weight-bold py-3 mw-160px">Yes/No</td>
                            <td className="border-top-0 font-weight-bold py-3 mw-100px">Daily/Weekly/ Monthly</td>
                            <td className="border-top-0 font-weight-bold text-nowrap py-3 mw-150px">Qty</td>
                            <td className="border-top-0 font-weight-bold py-3 mw-200px">Remarks</td>
                          </tr>
                        </thead>
                        <tbody>

                          {values.inventoryManagements.length > 0 &&
                            values.inventoryManagements.map((man, index) => {
                              const boundErrors = (errors.inventoryManagements?.length && errors.inventoryManagements[index]) || {};
                              const boundTouched = (touched.inventoryManagements?.length && touched.inventoryManagements[index]) || {};
                              return (

                                <tr key={index}>
                                  <td>
                                    {index + 1}
                                  </td>
                                  <td className="text-left">
                                    {man.processType}
                                  </td>
                                  <td>
                                    {index ===0 ? (
                                      <Field

                                      onChange={e => setFieldValue(`inventoryManagements.${index}.storageType`, e.target.value)}
                                      name={`inventoryManagements.${index}.storageType`} as="select" className={`form-control h-35px bg-white my-1` + (boundErrors.storageType && boundTouched.storageType ? ' is-invalid' : '')} readOnly={isView}>
                                      <option selected disabled>Select</option>
                                      <option value="FIFO">FIFO</option>
                                      <option value="LOFO">LIFO</option>
                                      <option value="FMFO">FMFO</option>
                                    </Field>
                                    ): (
                                      <Field

                                      onChange={e => setFieldValue(`inventoryManagements.${index}.yesNo`, e.target.value === "true")}
                                      name={`inventoryManagements.${index}.yesNo`} as="select" className={`form-control h-35px bg-white my-1` + (boundErrors.yesNo && boundTouched.yesNo ? ' is-invalid' : '')} readOnly={isView}>
                                      <option selected disabled>Select</option>
                                      <option value={true}>Yes</option>
                                      <option value={false}>No</option>
                                    </Field>
                                    )}
                                    <ErrorMessage name={`inventoryManagements.${index}.yesNo`} component="div" className="invalid-feedback" />
                                  </td>
                                  <td>
                                    <Field name={`inventoryManagements.${index}.dailyWeekMonth`} as="select" className={`form-control h-35px bg-white my-1` + (boundErrors.dailyWeekMonth && boundTouched.dailyWeekMonth ? ' is-invalid' : '')} readOnly={isView}>
                                      <option selected disabled>select</option>
                                      <option value="DAILY">Daily</option>
                                      <option value="WEEKLY">Weekly</option>
                                      <option value="MONTHLY">Monthly</option>
                                    </Field>
                                    <ErrorMessage name={`inventoryManagements.${index}.dailyWeekMonth`} component="div" className="invalid-feedback" />
                                  </td>
                                  <td>
                                    <Field name={`inventoryManagements.${index}.quantity`} onKeyPress={(e) => onlyNumberAllow(e)} type="number" className={`form-control text-center bg-white my-1` + (boundErrors.quantity && boundTouched.quantity ? ' is-invalid' : '')} placeholder="Type here" readOnly={isView} />
                                    <ErrorMessage name={`inventoryManagements.${index}.quantity`} component="div" className="invalid-feedback" />
                                  </td>
                                  <td>
                                    <Field name={`inventoryManagements.${index}.remark`} onKeyPress={(e) => onlyAlphaNumericSpaceAllow(e)} type="text" className={`form-control text-center bg-white my-1` + (boundErrors.remark && boundTouched.remark ? ' is-invalid' : '')} placeholder="Type here" readOnly={isView} />
                                    <ErrorMessage name={`inventoryManagements.${index}.remark`} component="div" className="invalid-feedback" />
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
            <button type="button" className="btn btn-outline-deep-primary mb-3 add-className remove-className" data-add-target=".steps7" data-add-target-className="d-none" data-remove-target=".steps6" data-remove-target-className="d-none">Back</button>
          </div> */}
                      <div className="col-auto">
                        <button disabled={data.isLoading} type="submit" className="btn btn-deep-primary mb-3 add-className remove-className">Save
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

export default InventoryManagementForm;
