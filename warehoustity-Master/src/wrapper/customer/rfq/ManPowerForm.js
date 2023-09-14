import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { updateManpowerRFQ, responseRfq } from '../../../store/actions/customer/rfqAction'
import { useSelector, useDispatch } from 'react-redux';
import FormSuccess from '../../../components/helper/FormSuccess';
import Spinner from 'react-bootstrap/Spinner';
import { onlyNumberAllow, onlyAlphaNumericSpaceAllow } from '../../../components/validation';

const ManPowerForm = ({ isView, rfqid }) => {

  const dispatch = useDispatch();
  const data = useSelector((state) => state.CUSTOMER_RFQ_INFO);

  const [jsonData, setJsonData] = useState([
    {
      "manPower": "WH Manager",
      "quantity": "",
      "dedicatedSharedType": "DEDICATED",
      "remark": ""
    },
    {
      "manPower": "Asst Manager",
      "quantity": "",
      "dedicatedSharedType": "DEDICATED",
      "remark": ""
    },
    {
      "manPower": "OB Executive+DEO (Data Entry Operator)",
      "quantity": "",
      "dedicatedSharedType": "DEDICATED",
      "remark": ""
    },
    {
      "manPower": "Dispatch Incharge",
      "quantity": "",
      "dedicatedSharedType": "DEDICATED",
      "remark": ""
    },
    {
      "manPower": "Inventory Incharge",
      "quantity": "",
      "dedicatedSharedType": "DEDICATED",
      "remark": ""
    },
    {
      "manPower": "Inventory Supervisor",
      "quantity": "",
      "dedicatedSharedType": "DEDICATED",
      "remark": ""
    },
    {
      "manPower": "Activity Supervisors",
      "quantity": "",
      "dedicatedSharedType": "DEDICATED",
      "remark": ""
    },
    {
      "manPower": "Labour",
      "quantity": "",
      "dedicatedSharedType": "DEDICATED",
      "remark": ""
    },
    {
      "manPower": "Security",
      "quantity": "",
      "dedicatedSharedType": "DEDICATED",
      "remark": ""
    },
    {
      "manPower": "House Keeping",
      "quantity": "",
      "dedicatedSharedType": "DEDICATED",
      "remark": ""
    },
    {
      "manPower": "Others",
      "quantity": "",
      "dedicatedSharedType": "DEDICATED",
      "remark": ""
    }
  ])


  const manSchema = Yup.object().shape({
    manPowers: Yup.array().of(
      Yup.object().shape({
        quantity: Yup.string().required('Required').max(5, 'Must be 5 digits'),
        remark: Yup.string().required('Required'),
        dedicatedSharedType: Yup.string().required('Required')
      })
    )
  });




  useEffect(() => {

    if (data.rfqInitialDetail.manPowers && data.rfqInitialDetail.manPowers.length !== 0) {
      setJsonData(
        data.rfqInitialDetail.manPowers.map((item, i) => {
          return (
            {
              "manPower": item.manPower,
              "quantity": item.quantity,
              "dedicatedSharedType": item.dedicatedSharedType,
              "remark": item.remark
            }
          )
        })
      )
    }

    if (data.rfqFirstForm?.manPowers && data.rfqFirstForm?.manPowers.length !== 0) {
      setJsonData(
        data.rfqFirstForm.manPowers.map((item, i) => {
          return (
            {
              "manPower": item.manPower,
              "quantity": item.quantity,
              "dedicatedSharedType": item.dedicatedSharedType,
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
        validationSchema={manSchema}
        initialValues={{ "manPowers": jsonData }}
        onSubmit={fields => {
          if (rfqid) {
            fields["customerRfq"] = rfqid

            dispatch(updateManpowerRFQ(fields))
          }
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
                                    <Field name={`manPowers.${index}.quantity`} onKeyPress={(e) => onlyNumberAllow(e)} type="number" className={`form-control text-center bg-white my-1` + (boundErrors.quantity && boundTouched.quantity ? ' is-invalid' : '')} placeholder="Type here" readOnly={isView} />
                                    <ErrorMessage name={`manPowers.${index}.quantity`} component="div" className="invalid-feedback" />
                                  </td>
                                  <td>
                                    <Field name={`manPowers.${index}.dedicatedSharedType`} as="select" className={`form-control h-35px bg-white my-1` + (boundErrors.dedicatedSharedType && boundTouched.dedicatedSharedType ? ' is-invalid' : '')} placeholder="Type here" readOnly={isView} >
                                      <option value="">Select</option>
                                      <option value="DEDICATED">Dedicated</option>
                                      <option value="SHARED">Shared</option>
                                    </Field>
                                    <ErrorMessage name={`manPowers.${index}.dedicatedSharedType`} component="div" className="invalid-feedback" />
                                  </td>
                                  <td>
                                    <Field name={`manPowers.${index}.remark`} onKeyPress={(e) => onlyAlphaNumericSpaceAllow(e)} type="text" className={`form-control text-center bg-white my-1` + (boundErrors.remark && boundTouched.remark ? ' is-invalid' : '')} placeholder="Type here" readOnly={isView} />
                                    <ErrorMessage name={`manPowers.${index}.remark`} component="div" className="invalid-feedback" />
                                  </td>
                                </tr>

                              )
                            })}

                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className={`col-12 mt-5 ${isView ? "d-none" : null}`}>
                    <div className="row justify-content-end">
                      {/* <div className="col-auto">
            <button type="button" className="btn btn-outline-deep-primary mb-3 add-className remove-className" data-add-target=".steps6" data-add-target-className="d-none" data-remove-target=".steps5" data-remove-target-className="d-none">Back</button>
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

export default ManPowerForm;
