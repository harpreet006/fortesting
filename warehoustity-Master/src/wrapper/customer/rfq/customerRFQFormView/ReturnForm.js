import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { CardLoader } from '../../../../components/helper/CustomLoader';

const ReturnForm = ({ isView }) => {
  const data = useSelector((state) => state.CUSTOMER_RFQ_INFO);

  const [jsonData, setJsonData] = useState([
    {
      "processType": "Retail / Distributor Stores",
      "uom": "",
      "weightPerUom": "",
      "dailyWeekMonth": "",
      "quantity": "",
      "remark": ""
    },
    {
      "processType": "E-com (Bulk)",
      "uom": "",
      "weightPerUom": "",
      "dailyWeekMonth": "",
      "quantity": "",
      "remark": ""
    },
    {
      "processType": "E-com (Bulk)",
      "uom": "",
      "weightPerUom": "",
      "dailyWeekMonth": "",
      "quantity": "",
      "remark": ""
    }
  ])

  const returnSchema = Yup.object().shape({
    returns: Yup.array().of(
      Yup.object().shape({
        uom: Yup.string().required('Required'),
        weightPerUom: Yup.string().required('Required'),
        dailyWeekMonth: Yup.string().required('Required'),
        quantity: Yup.string().required('Required'),
        remark: Yup.string().required('Required')
      })
    )
  });


  useEffect(() => {

    if (data.rfqDetail && data.rfqDetail.returnRfq && data.rfqDetail.returnRfq.length > 0) {
      setJsonData(data.rfqDetail.returnRfq)
    }

  }, [data.rfqDetail]);



  return (
    <>
      {
        data.isLoading ? <CardLoader loaderCard="loaderCard" /> :
          <Formik
            enableReinitialize={true}
            validationSchema={returnSchema}
            initialValues={{ "returns": jsonData }}
            onSubmit={fields => {
              console.log("---->", fields)

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
                                    <tr>
                                      <td>
                                        {index + 1}
                                      </td>
                                      <td className="text-left">
                                        {r.processType}
                                      </td>
                                      <td>
                                        <Field name={`returns.${index}.uom`} type="text" className={`form-control text-center bg-white my-1` + (boundErrors.uom && boundTouched.uom ? ' is-invalid' : '')} readOnly={isView} />
                                        <ErrorMessage name={`returns.${index}.uom`} component="div" className="invalid-feedback" />
                                      </td>
                                      <td>
                                        <Field name={`returns.${index}.weightPerUom`} type="text" className={`form-control text-center bg-white my-1` + (boundErrors.weightPerUom && boundTouched.weightPerUom ? ' is-invalid' : '')} readOnly={isView} />
                                        <ErrorMessage name={`returns.${index}.weightPerUom`} component="div" className="invalid-feedback" />
                                      </td>
                                      <td>
                                        <Field name={`returns.${index}.dailyWeekMonth`} as="select" className={`form-control h-35px bg-white my-1` + (boundErrors.dailyWeekMonth && boundTouched.dailyWeekMonth ? ' is-invalid' : '')} readOnly={isView} >
                                          <option value="DAILY">Daily</option>
                                          <option value="WEEKLY">Weekly</option>
                                          <option value="MONTHLY">Monthly</option>
                                        </Field>
                                        <ErrorMessage name={`returns.${index}.dailyWeekMonth`} component="div" className="invalid-feedback" />
                                      </td>
                                      <td>
                                        <Field name={`returns.${index}.quantity`} type="text" className={`form-control text-center bg-white my-1` + (boundErrors.quantity && boundTouched.quantity ? ' is-invalid' : '')} readOnly={isView} />
                                        <ErrorMessage name={`returns.${index}.quantity`} component="div" className="invalid-feedback" />
                                      </td>
                                      <td>
                                        <Field name={`returns.${index}.remark`} type="text" className={`form-control text-center bg-white my-1` + (boundErrors.remark && boundTouched.remark ? ' is-invalid' : '')} readOnly={isView} />
                                        <ErrorMessage name={`returns.${index}.remark`} component="div" className="invalid-feedback" />
                                      </td>
                                    </tr>

                                  )
                                })}

                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </Form>
                </div>
              )
            }}
          />
      }
    </>
  );
}

export default ReturnForm;
