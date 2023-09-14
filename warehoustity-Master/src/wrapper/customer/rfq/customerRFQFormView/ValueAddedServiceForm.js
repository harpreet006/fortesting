import React, {useState, useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import {CardLoader} from '../../../../components/helper/CustomLoader';

const ValueAddedServiceForm = ({ isView}) => {
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
          qtyPerMonth: Yup.string().required('Required'),
          remark: Yup.string().required('Required')
          })
    )
  });

  useEffect(() => {

    if(data.rfqDetail && data.rfqDetail.valueAddedServices && data.rfqDetail.valueAddedServices.length > 0){
      setJsonData(data.rfqDetail.valueAddedServices)
    }
  
  }, [data.rfqDetail]);
 
  return (
    <>
     {
      data.isLoading ?  <CardLoader loaderCard="loaderCard" /> :
    <Formik
    enableReinitialize={true}
    validationSchema={storeSchema}
      initialValues={{"valueAddedServices":  jsonData }}
      onSubmit={fields => {
      console.log("---->", fields)
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


                        <tr> 
                          <td>
                            {index+1}
                          </td>
                          <td className="text-left">
                            {vas.processType}
                          </td>
                          <td>
                            <Field name={`valueAddedServices.${index}.qtyPerMonth`} type="number" className={`form-control text-center bg-white my-1`+ (boundErrors.qtyPerMonth && boundTouched.qtyPerMonth ? ' is-invalid' : '')} readOnly={isView} />
                            <ErrorMessage name={`valueAddedServices.${index}.qtyPerMonth`} component="div" className="invalid-feedback" />
                          </td>
                          <td>
                            <Field name={`valueAddedServices.${index}.remark`} type="text" className={`form-control text-center bg-white my-1`+ (boundErrors.remark && boundTouched.remark ? ' is-invalid' : '')} readOnly = {isView} />
                            <ErrorMessage name={`valueAddedServices.${index}.remark`} component="div" className="invalid-feedback" />
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

export default ValueAddedServiceForm;
