import React, {useState, useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {updateAddedRFQ, responseRfq} from '../../../store/actions/customer/rfqAction'
import {useSelector, useDispatch} from 'react-redux';
import FormSuccess from '../../../components/helper/FormSuccess';
import Spinner from 'react-bootstrap/Spinner';
import { onlyNumberAllow, onlyAlphaNumericSpaceAllow} from '../../../components/validation';

const ValueAddedServiceForm = ({isView, rfqid}) => {

  const dispatch = useDispatch();
  const data = useSelector((state)=>state.CUSTOMER_RFQ_INFO);

  const  [jsonData, setJsonData] =useState([
    {
      "processType": "Quality Control",
      "qtyPerMonth": "",
      "remark":  ""
    },
    {
      "processType": "Repackaging",
      "qtyPerMonth": "",
      "remark":  ""
    },
    {
      "processType": "Labelling",
      "qtyPerMonth": "",
      "remark":  ""
    },
    {
      "processType": "Shrink wrapping",
      "qtyPerMonth": "",
      "remark":  ""
    },
    {
      "processType": "Strapping",
      "qtyPerMonth": "",
      "remark":  ""
    },
    {
      "processType": "Palletization",
      "qtyPerMonth": "",
      "remark":  ""
    },
    {
      "processType": "Bar code",
      "qtyPerMonth": "",
      "remark":  ""
    }
  ])

  const storeSchema = Yup.object().shape({
    valueAddedServices: Yup.array().of(
        Yup.object().shape({
          qtyPerMonth: Yup.string().required('Required').max(5, 'Must be 5 digits'),
          remark: Yup.string().required('Required')
          })
    )
  });

  useEffect(() => {

    if(data.rfqInitialDetail?.valueAddedServices && data.rfqInitialDetail?.valueAddedServices.length !==0){
      setJsonData(
        data.rfqInitialDetail.valueAddedServices.map((item, i)=>{
          return (
            {
              "processType": item.processType,
              "qtyPerMonth": item.qtyPerMonth,
              "remark": item.remark
            }
          )
        })
      )
    }

    if(data.rfqFirstForm?.valueAddedServices && data.rfqFirstForm?.valueAddedServices.length !==0){
      setJsonData(
        data.rfqFirstForm.valueAddedServices.map((item, i)=>{
          return (
            {
              "processType": item.processType,
              "qtyPerMonth": item.qtyPerMonth,
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
            <FormSuccess onClick={()=>dispatch(responseRfq([]))} message={data.rfqResponse.message} />
        : null
    }
    
    <Formik
    enableReinitialize={true}
    validationSchema={storeSchema}
      initialValues={{"valueAddedServices":  jsonData }}
      onSubmit={fields => {
        if(rfqid){
        fields["customerRfq"]= rfqid

      dispatch(updateAddedRFQ(fields))
      }
      }}
      
      render={({ values,  errors, status,onChange, touched }) =>{
        return(
            <div className="w-100 d-block">
          <Form >
    <div className="row pt-2">   
      <div className="row col-12 ml-0">
        <div className="col-12 px-0 table-responsive border bg-deep-gray rounded-md table-cell">
          <table className="table text-center">
            <thead> 
              <tr>
                <td className="border-top-0 font-weight-bold py-3">S.no</td>  
                <td className="text-left border-top-0 font-weight-bold text-nowrap py-3 w-160px">Process Description</td>  
                <td className="border-top-0 font-weight-bold text-nowrap py-3 mw-150px">Qty per Month</td>  
                <td className="border-top-0 font-weight-bold py-3 mw-200px">Remarks</td>  
              </tr> 
              </thead>
              <tbody> 

              {values.valueAddedServices.length > 0 &&
                  values.valueAddedServices.map((vas, index) => {
                    const boundErrors = (errors.valueAddedServices?.length && errors.valueAddedServices[index]) || {};
                    const boundTouched = (touched.valueAddedServices?.length && touched.valueAddedServices[index]) || {};
                    return(
                        <tr key={index}> 
                          <td>
                            {index+1}
                          </td>
                          <td className="text-left">
                            {vas.processType}
                          </td>
                          
                          <td>
                            <Field name={`valueAddedServices.${index}.qtyPerMonth`} onKeyPress={(e) => onlyNumberAllow(e)} type="number" className={`form-control text-center bg-white my-1`+ (boundErrors.qtyPerMonth && boundTouched.qtyPerMonth ? ' is-invalid' : '')} placeholder="Type here" readOnly={isView} />
                            <ErrorMessage name={`valueAddedServices.${index}.qtyPerMonth`} component="div" className="invalid-feedback" />
                          </td>
                          <td>
                            <Field name={`valueAddedServices.${index}.remark`} onKeyPress={(e) => onlyAlphaNumericSpaceAllow(e)} type="text" className={`form-control text-center bg-white my-1`+ (boundErrors.remark && boundTouched.remark ? ' is-invalid' : '')} placeholder="Type here" readOnly = {isView} />
                            <ErrorMessage name={`valueAddedServices.${index}.remark`} component="div" className="invalid-feedback" />
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
            <button type="button" className="btn btn-outline-deep-primary mb-3 add-className remove-class">Back</button>
          </div> */}
          <div className="col-auto">
            <button type="submit" disabled={data.isLoading} className="btn btn-deep-primary mb-3 add-className remove-className">Save
            {data.isLoading ? <Spinner animation="border"  /> :null}
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

export default ValueAddedServiceForm;
