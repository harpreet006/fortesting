import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { CardLoader } from '../../../../components/helper/CustomLoader';

const ManPowerForm = ({ isView }) => {
  const data = useSelector((state) => state.CUSTOMER_RFQ_INFO);

  const [jsonData, setJsonData] = useState([
    {
      "manPower": "WH Manager",
      "quantity": "",
      "dedicatedSharedType": "",
      "remark": ""
    },
    {
      "manPower": "Asst Manager",
      "quantity": "",
      "dedicatedSharedType": "",
      "remark": ""
    },
    {
      "manPower": "OB Executive+DEO (Data Entry Operator)",
      "quantity": "",
      "dedicatedSharedType": "",
      "remark": ""
    },
    {
      "manPower": "Dispatch Incharge",
      "quantity": "",
      "dedicatedSharedType": "",
      "remark": ""
    },
    {
      "manPower": "Inventory Incharge",
      "quantity": "",
      "dedicatedSharedType": "",
      "remark": ""
    },
    {
      "manPower": "Inventory Supervisor",
      "quantity": "",
      "dedicatedSharedType": "",
      "remark": ""
    },
    {
      "manPower": "Activity Supervisors",
      "quantity": "",
      "dedicatedSharedType": "",
      "remark": ""
    },
    {
      "manPower": "Labour",
      "quantity": "",
      "dedicatedSharedType": "",
      "remark": ""
    },
    {
      "manPower": "Security",
      "quantity": "",
      "dedicatedSharedType": "",
      "remark": ""
    },
    {
      "manPower": "House Keeping",
      "quantity": "",
      "dedicatedSharedType": "",
      "remark": ""
    },
    {
      "manPower": "Others",
      "quantity": "",
      "dedicatedSharedType": "",
      "remark": ""
    }
  ])


  const manSchema = Yup.object().shape({
    manPowers: Yup.array().of(
      Yup.object().shape({
        quantity: Yup.string().required('Required'),
        remark: Yup.string().required('Required'),
        dedicatedSharedType: Yup.string().required('Required')
      })
    )
  });



  useEffect(() => {

    if (data.rfqDetail && data.rfqDetail.manPowers && data.rfqDetail.manPowers.length > 0) {
      setJsonData(data.rfqDetail.manPowers)
    }

  }, [data.rfqDetail]);




  return (
    <>
      {
        data.isLoading ? <CardLoader loaderCard="loaderCard" /> :

          <Formik
            enableReinitialize={true}
            validationSchema={manSchema}
            initialValues={{ "manPowers": jsonData }}
            onSubmit={fields => {
              console.log("---->", fields)

            }}

            render={({ values, errors, status, onChange, touched }) => {
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
                                <td className="text-left border-top-0 font-weight-bold text-nowrap py-3 w-160px">Manpower</td>
                                <td className="border-top-0 font-weight-bold py-3 mw-150px">Qty</td>
                                <td className="border-top-0 font-weight-bold text-nowrap py-3">Dedicated / Shared</td>
                                <td className="border-top-0 font-weight-bold py-3 mw-200px">Remarks</td>
                              </tr>
                            </thead>
                            <tbody>


                              {values.manPowers.length > 0 &&
                                values.manPowers.map((man, index) => {
                                  const boundErrors = (errors.manPowers?.length && errors.manPowers[index]) || {};
                                  const boundTouched = (touched.manPowers?.length && touched.manPowers[index]) || {};
                                  return (
                                    <tr key={index}>
                                      <td>
                                        {index + 1}
                                      </td>
                                      <td className="text-left">
                                        {man.manPower}
                                      </td>
                                      <td>
                                        <Field name={`manPowers.${index}.quantity`} type="text" className={`form-control text-center bg-white my-1` + (boundErrors.quantity && boundTouched.quantity ? ' is-invalid' : '')} readOnly={isView} />
                                        <ErrorMessage name={`manPowers.${index}.quantity`} component="div" className="invalid-feedback" />
                                      </td>
                                      <td>
                                        <Field name={`manPowers.${index}.dedicatedSharedType`} as="select" className={`form-control h-35px bg-white my-1` + (boundErrors.dedicatedSharedType && boundTouched.dedicatedSharedType ? ' is-invalid' : '')} readOnly={isView} >
                                          <option value="DEDICATED">Dedicated</option>
                                          <option value="SHARED">Shared</option>
                                        </Field>
                                        <ErrorMessage name={`manPowers.${index}.dedicatedSharedType`} component="div" className="invalid-feedback" />
                                      </td>
                                      <td>
                                        <Field name={`manPowers.${index}.remark`} type="text" className={`form-control text-center bg-white my-1` + (boundErrors.remark && boundTouched.remark ? ' is-invalid' : '')} readOnly={isView} />
                                        <ErrorMessage name={`manPowers.${index}.remark`} component="div" className="invalid-feedback" />
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

export default ManPowerForm;
