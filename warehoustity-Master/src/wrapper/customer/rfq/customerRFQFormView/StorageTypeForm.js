import React, {useState, useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import {CardLoader} from '../../../../components/helper/CustomLoader';

const StorageTypeForm = ({isView}) => {
  const data = useSelector((state)=>state.CUSTOMER_RFQ_INFO);

    const  [jsonData, setJsonData] =useState([
        {
            "processType": "Temperature Control (Airconditioned)",
            "temperatureRange": "",
            "noOfPallet": ""
        },
        {
            "processType": "Humidity Control",
            "temperatureRange": "",
            "noOfPallet": ""
        },
        {
            "processType": "Dust Free",
            "temperatureRange": "",
            "noOfPallet": ""
        },
        {
            "processType": "Pallet Storage",
            "temperatureRange": "",
            "noOfPallet": ""
        },
        {
            "processType": "Serial No",
            "temperatureRange": "",
            "noOfPallet": ""
        },
        {
            "processType": "Shelve Rack Storage",
            "temperatureRange": "",
            "noOfPallet": ""
        },
        {
            "processType": "Block Storage",
            "temperatureRange": "",
            "noOfPallet": ""
        },
        {
            "processType": "Block Storage",
            "temperatureRange": "",
            "noOfPallet": ""
        },
        {
            "processType": "Ground Storage",
            "temperatureRange": "",
            "noOfPallet": ""
        },
        {
            "processType": "Ground Storage",
            "temperatureRange": "",
            "noOfPallet": ""
        },
    ])


    const storeSchema = Yup.object().shape({
        storageTypes: Yup.array().of(
            Yup.object().shape({
                temperatureRange: Yup.string().required('Required'),
                noOfPallet: Yup.string().required('Required')
              })
        )
      });

    
      useEffect(() => {

        if(data.rfqDetail && data.rfqDetail.storageTypes && data.rfqDetail.storageTypes.length > 0){
          setJsonData(data.rfqDetail.storageTypes)
        }
      
      }, [data.rfqDetail]);


  return (
    <>
    {
      data.isLoading ?  <CardLoader loaderCard="loaderCard" /> :
  
    <Formik
    enableReinitialize={true}
    validationSchema={storeSchema}
      initialValues={{"storageTypes":  jsonData }}
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
                    <td className="border-top-0 font-weight-bold text-nowrap py-3 mw-150px">Temperature Range</td>  
                    <td className="border-top-0 font-weight-bold py-3 mw-200px">No of Pallets</td>  
                    </tr> 
                    </thead>
              <tbody> 

              {values.storageTypes.length > 0 &&
                  values.storageTypes.map((man, index) => {
                    const boundErrors = (errors.storageTypes?.length && errors.storageTypes[index]) || {};
                    const boundTouched = (touched.storageTypes?.length && touched.storageTypes[index]) || {};
                    return(




                    <tr> 
                    <td>
                        {index+1}
                    </td>
                    <td className="text-left">
                        {man.processType}
                    </td>
                    <td>
                        <Field name={`storageTypes.${index}.temperatureRange`} type="text" className={`form-control text-center bg-white my-1`+ (boundErrors.temperatureRange && boundTouched.temperatureRange ? ' is-invalid' : '')} readOnly={isView} />
                        <ErrorMessage name={`storageTypes.${index}.temperatureRange`} component="div" className="invalid-feedback" />
                    </td>
                    <td>
                        <Field name={`storageTypes.${index}.noOfPallet`} type="number" className={`form-control text-center bg-white my-1`+ (boundErrors.noOfPallet && boundTouched.noOfPallet ? ' is-invalid' : '')} readOnly={isView} />
                        <ErrorMessage name={`storageTypes.${index}.noOfPallet`} component="div" className="invalid-feedback" />
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

export default StorageTypeForm;
