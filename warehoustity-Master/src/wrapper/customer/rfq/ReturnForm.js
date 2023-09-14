import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { updateReturnRFQ, responseRfq } from '../../../store/actions/customer/rfqAction'
import { useSelector, useDispatch } from 'react-redux';
import FormSuccess from '../../../components/helper/FormSuccess';
import Spinner from 'react-bootstrap/Spinner';
import { onlyNumberAllow, onlyAlphaNumericSpaceAllow } from '../../../components/validation';

const ReturnForm = ({ isView, rfqid }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.CUSTOMER_RFQ_INFO);

  const [jsonData, setJsonData] = useState([
    {
      "processType": "Retail / Distributor Stores",
      "uom": "",
      "weightPerUom": "",
      "dailyWeekMonth": "DAILY",
      "quantity": "",
      "remark": ""
    },
    {
      "processType": "E-com (Bulk)",
      "uom": "",
      "weightPerUom": "",
      "dailyWeekMonth": "DAILY",
      "quantity": "",
      "remark": ""
    },
    {
      "processType": "E-com (Bulk)",
      "uom": "",
      "weightPerUom": "",
      "dailyWeekMonth": "DAILY",
      "quantity": "",
      "remark": ""
    }
  ])

  const returnSchema = Yup.object().shape({
    returns: Yup.array().of(
      Yup.object().shape({
        uom: Yup.string().required('Required').max(5, 'Must be 5 digits'),
        weightPerUom: Yup.string().required('Required').max(5, 'Must be 5 digits'),
        dailyWeekMonth: Yup.string().required('Required'),
        quantity: Yup.string().required('Required').max(5, 'Must be 5 digits'),
        remark: Yup.string().required('Required')
      })
    )
  });



  useEffect(() => {

    if (data.rfqInitialDetail.returnRfq && data.rfqInitialDetail.returnRfq.length !== 0) {
      setJsonData(
        data.rfqInitialDetail.returnRfq.map((item, i) => {
          return (
            {
              "processType": item.processType,
              "uom": item.uom,
              "weightPerUom": item.weightPerUom,
              "dailyWeekMonth": item.dailyWeekMonth,
              "quantity": item.quantity,
              "remark": item.remark
            }
          )
        })
      )
    }

    if (data.rfqFirstForm?.returnRfq && data.rfqFirstForm?.returnRfq.length !== 0) {
      setJsonData(
        data.rfqFirstForm?.returnRfq.map((item, i) => {
          return (
            {
              "processType": item.processType,
              "uom": item.uom,
              "weightPerUom": item.weightPerUom,
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
        validationSchema={returnSchema}
        initialValues={{ "returns": jsonData }}
        onSubmit={fields => {
          if (rfqid) {
            fields["customerRfq"] = rfqid
            dispatch(updateReturnRFQ(fields))
          }
        }}

        render={({ values, errors, status, onChange, touched }) => {
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
                            <td className="border-top-0 font-weight-bold py-3 mw-160px">UoM</td>
                            <td className="border-top-0 font-weight-bold py-3 text-nowrap mw-100px">Weight per UOM</td>
                            <td className="border-top-0 font-weight-bold py-3 mw-100px">Daily/Weekly/ Monthly</td>
                            <td className="border-top-0 font-weight-bold text-nowrap py-3 mw-150px">Qty</td>
                            <td className="border-top-0 font-weight-bold py-3 mw-200px">Remarks</td>
                          </tr>
                        </thead>
                        <tbody>

                          {values.returns.length > 0 &&
                            values.returns.map((r, index) => {
                              const boundErrors = (errors.returns?.length && errors.returns[index]) || {};
                              const boundTouched = (touched.returns?.length && touched.returns[index]) || {};
                              return (
                                <tr key={index}>
                                  <td>
                                    {index + 1}
                                  </td>
                                  <td className="text-left">
                                    {r.processType}
                                  </td>
                                  <td>
                                    <Field name={`returns.${index}.uom`} onKeyPress={(e) => onlyNumberAllow(e)} type="number" className={`form-control text-center bg-white my-1` + (boundErrors.uom && boundTouched.uom ? ' is-invalid' : '')} placeholder="Type here" readOnly={isView} />
                                    <ErrorMessage name={`returns.${index}.uom`} component="div" className="invalid-feedback" />
                                  </td>
                                  <td>
                                    <Field name={`returns.${index}.weightPerUom`} onKeyPress={(e) => onlyNumberAllow(e)} type="number" className={`form-control text-center bg-white my-1` + (boundErrors.weightPerUom && boundTouched.weightPerUom ? ' is-invalid' : '')} placeholder="Type here" readOnly={isView} />
                                    <ErrorMessage name={`returns.${index}.weightPerUom`} component="div" className="invalid-feedback" />
                                  </td>
                                  <td>
                                    <Field name={`returns.${index}.dailyWeekMonth`} as="select" className={`form-control h-35px bg-white my-1` + (boundErrors.dailyWeekMonth && boundTouched.dailyWeekMonth ? ' is-invalid' : '')} placeholder="Type here" readOnly={isView} >
                                      <option value="">Select</option>
                                      <option value="DAILY">Daily</option>
                                      <option value="WEEKLY">Weekly</option>
                                      <option value="MONTHLY">Monthly</option>
                                    </Field>
                                    <ErrorMessage name={`returns.${index}.dailyWeekMonth`} component="div" className="invalid-feedback" />
                                  </td>
                                  <td>
                                    <Field name={`returns.${index}.quantity`} onKeyPress={(e) => onlyNumberAllow(e)} type="number" className={`form-control text-center bg-white my-1` + (boundErrors.quantity && boundTouched.quantity ? ' is-invalid' : '')} placeholder="Type here" readOnly={isView} />
                                    <ErrorMessage name={`returns.${index}.quantity`} component="div" className="invalid-feedback" />
                                  </td>
                                  <td>
                                    <Field name={`returns.${index}.remark`} onKeyPress={(e) => onlyAlphaNumericSpaceAllow(e)} type="text" className={`form-control text-center bg-white my-1` + (boundErrors.remark && boundTouched.remark ? ' is-invalid' : '')} placeholder="Type here" readOnly={isView} />
                                    <ErrorMessage name={`returns.${index}.remark`} component="div" className="invalid-feedback" />
                                  </td>
                                </tr>

                              )
                            })}

                        </tbody>
                      </table>
                    </div>
                  </div>
                  {!isView ?
                    <div className={`col-12 mt-5`}>
                      <div className="row justify-content-end">
                        {/* <div className="col-auto">
                <button type="button" className="btn btn-outline-deep-primary mb-3 add-className remove-className" data-add-target=".steps6" data-add-target-className="d-none" data-remove-target=".steps5" data-remove-target-className="d-none">Back</button>
                </div> */}
                        <div className={`col-auto`}>
                          <button disabled={data.isLoading} type="submit" className="btn btn-deep-primary mb-3 add-className remove-className">Save
                            {data.isLoading ? <Spinner animation="border" /> : null}</button>
                        </div>
                      </div>
                    </div>
                    : null}
                </div>
              </Form>
            </div>
          )
        }}
      />
    </>
  );
}

export default ReturnForm;
