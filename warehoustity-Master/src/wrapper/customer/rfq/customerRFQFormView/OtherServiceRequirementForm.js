import React, {useState, useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import {CardLoader} from '../../../../components/helper/CustomLoader';

const OtherServiceRequirementForm = ({ isView}) => {
  const data = useSelector((state)=>state.CUSTOMER_RFQ_INFO);

  const  [jsonData, setJsonData] =useState([
    {
      "descriptionType": "IT",
      "noOfIds": "",
      "quantity": "",
      "remark": ""
    },
    {
      "descriptionType": "WMS",
      "noOfIds": "",
      "quantity": "",
      "remark": ""
    },
    {
      "descriptionType": "DMS",
      "noOfIds": "",
      "quantity": "",
      "remark": ""
    },
    {
      "descriptionType": "TMS",
      "noOfIds": "",
      "quantity": "",
      "remark": ""
    },
    {
      "descriptionType": "Material Handling Equipments -",
      "noOfIds": "",
      "quantity": "",
      "remark": ""
    },
    {
      "descriptionType": "Forklift",
      "noOfIds": "",
      "quantity": "",
      "remark": ""
    },
    {
      "descriptionType": "Hand Pallets",
      "noOfIds": "",
      "quantity": "",
      "remark": ""
    },
    {
      "descriptionType": "Reach Staker",
      "noOfIds": "",
      "quantity": "",
      "remark": ""
    },
    {
      "descriptionType": "Wooden/Plastic Pallets",
      "noOfIds": "",
      "quantity": "",
      "remark": ""
    },
    {
      "descriptionType": "Hand Trolleys",
      "noOfIds": "",
      "quantity": "",
      "remark": ""
    },
    {
      "descriptionType": "Others (pls specify)",
      "noOfIds": "",
      "quantity": "",
      "remark": ""
    }
    ])

    const sarSchema = Yup.object().shape({
      otherServiceRequirements: Yup.array().of(
          Yup.object().shape({
            noOfIds: Yup.string().required('Required'),
            quantity: Yup.string().required('Required'),
            remark: Yup.string().required('Required'),
          })
      )
    });


    useEffect(() => {

      if(data.rfqDetail && data.rfqDetail.otherServiceRequirements && data.rfqDetail.otherServiceRequirements.length > 0){
        setJsonData(data.rfqDetail.otherServiceRequirements)
      }
    
    }, [data.rfqDetail]);



  return (
    <>
    {
      data.isLoading ?  <CardLoader loaderCard="loaderCard" /> :

    <Formik
    enableReinitialize={true}
    validationSchema={sarSchema}
      initialValues={{"otherServiceRequirements":  jsonData }}
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
                <td className="text-left border-top-0 font-weight-bold text-nowrap py-3 w-160px">Description</td>  
                <td className="border-top-0 font-weight-bold text-nowrap py-3 mw-150px">No of IDs</td>  
                <td className="border-top-0 font-weight-bold text-nowrap py-3">Qty</td>  
                <td className="border-top-0 font-weight-bold py-3 mw-200px">Remarks</td>  
              </tr> 
              </thead>
              <tbody> 

              {values.otherServiceRequirements.length > 0 &&
                  values.otherServiceRequirements.map((man, index) => {
                    const boundErrors = (errors.otherServiceRequirements?.length && errors.otherServiceRequirements[index]) || {};
                    const boundTouched = (touched.otherServiceRequirements?.length && touched.otherServiceRequirements[index]) || {};
                    return(

              <tr> 
                <td>
                  {index+1}
                </td>
                <td className="text-left">
                  {man.descriptionType}
                </td>
                <td>
                  <Field name={`otherServiceRequirements.${index}.noOfIds`} type="text" className={`form-control text-center bg-white  my-1`+ (boundErrors.noOfIds && boundTouched.noOfIds ? ' is-invalid' : '')} readOnly={isView} />
                  <ErrorMessage name={`otherServiceRequirements.${index}.noOfIds`} component="div" className="invalid-feedback" />
                </td>
                <td>
                  <Field name={`otherServiceRequirements.${index}.quantity`} type="number" className={`form-control text-center bg-white  my-1`+ (boundErrors.quantity && boundTouched.quantity ? ' is-invalid' : '')} readOnly={isView} />
                  <ErrorMessage name={`otherServiceRequirements.${index}.quantity`} component="div" className="invalid-feedback" />
                </td>
                <td>
                  <Field name={`otherServiceRequirements.${index}.remark`} type="text" className={`form-control text-center bg-white  my-1`+ (boundErrors.remark && boundTouched.remark ? ' is-invalid' : '')} readOnly={isView} />
                  <ErrorMessage name={`otherServiceRequirements.${index}.remark`} component="div" className="invalid-feedback" />
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

export default OtherServiceRequirementForm;
