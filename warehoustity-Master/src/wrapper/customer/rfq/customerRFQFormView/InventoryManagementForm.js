import React, {useState, useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import {CardLoader} from '../../../../components/helper/CustomLoader';

const InventoryManagementForm = ({isView}) => {
  const data = useSelector((state)=>state.CUSTOMER_RFQ_INFO);

  const  [jsonData, setJsonData] =useState([
    {
      "processType": "FIFO",
      "yesNo": "",
      "dailyWeekMonth": "",
      "quantity": "",
      "remark": ""
  },
  {
    "processType": "LIFO",
    "yesNo": "",
    "dailyWeekMonth": "",
    "quantity": "",
    "remark": ""
},
{
  "processType": "Lot Control",
  "yesNo": "",
  "dailyWeekMonth": "",
  "quantity": "",
  "remark": ""
},
{
  "processType": "Serial No",
  "yesNo": "",
  "dailyWeekMonth": "",
  "quantity": "",
  "remark": ""
},
{
  "processType": "Expiration Date",
  "yesNo": "",
  "dailyWeekMonth": "",
  "quantity": "",
  "remark": ""
},
{
  "processType": "Others",
  "yesNo": "",
  "dailyWeekMonth": "",
  "quantity": "",
  "remark": ""
},
{
  "processType": "Inventory Count -",
  "yesNo": "",
  "dailyWeekMonth": "",
  "quantity": "",
  "remark": ""
},
{
  "processType": "Cycle Count",
  "yesNo": "",
  "dailyWeekMonth": "",
  "quantity": "",
  "remark": ""
},
{
  "processType": "Perpitual Inventory",
  "yesNo": "",
  "dailyWeekMonth": "",
  "quantity": "",
  "remark": ""
},
{
  "processType": "Wall to wall",
  "yesNo": "",
  "dailyWeekMonth": "",
  "quantity": "",
  "remark": ""
},
{
  "processType": "Others",
  "yesNo": "",
  "dailyWeekMonth": "",
  "quantity": "",
  "remark": ""
},{
  "processType": "Average Stock Level (Product)",
  "yesNo": "",
  "dailyWeekMonth": "",
  "quantity": "",
  "remark": ""
},
{
  "processType": "Average Inventory Value in INR",
  "yesNo": "",
  "dailyWeekMonth": "",
  "quantity": "",
  "remark": ""
},
{
  "processType": "Peak Month",
  "yesNo": "",
  "dailyWeekMonth": "",
  "quantity": "",
  "remark": ""
},
{
  "processType": "Lean Month",
  "yesNo": "",
  "dailyWeekMonth": "",
  "quantity": "",
  "remark": ""
},

  ])

  const invenSchema = Yup.object().shape({
    inventoryManagements: Yup.array().of(
        Yup.object().shape({
          yesNo: Yup.string().required('Required'),
          dailyWeekMonth: Yup.string().required('Required'),
          quantity: Yup.string().required('Required'),
          remark: Yup.string().required('Required')
          })
    )
  });


  useEffect(() => {

    if(data.rfqDetail && data.rfqDetail.inventoryManagements && data.rfqDetail.inventoryManagements.length >0){
      setJsonData(data.rfqDetail.inventoryManagements)
    }
  
  }, [data.rfqDetail]);



  return (
    <>
      {
      data.isLoading ?  <CardLoader loaderCard="loaderCard" /> :
    <Formik
    enableReinitialize={true}
    validationSchema={invenSchema}
      initialValues={{"inventoryManagements":  jsonData }}
      onSubmit={fields => {
      console.log("---->", fields)
      }}
      
      render={({ values,  errors, status,onChange, touched }) =>{
        return(
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
                    return(

              <tr> 
                <td>
                  {index+1}
                </td>
                <td className="text-left">
                  {man.processType}
                </td>
                <td>
                  <Field name={`inventoryManagements.${index}.yesNo`} as="select" className={`form-control h-35px bg-white my-1`+ (boundErrors.yesNo && boundTouched.yesNo ? ' is-invalid' : '')} disabled={isView}>
                  <option value="">Select</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </Field>
                  <ErrorMessage name={`inventoryManagements.${index}.yesNo`} component="div" className="invalid-feedback" />
                </td>
                <td>
                  <Field name={`inventoryManagements.${index}.dailyWeekMonth`} as="select" className={`form-control h-35px bg-white my-1`+ (boundErrors.dailyWeekMonth && boundTouched.dailyWeekMonth ? ' is-invalid' : '')} disabled={isView}>
                    <option value="DAILY">Daily</option>
                    <option value="WEEKLY">Weekly</option>
                    <option value="MONTHLY">Monthly</option>
                  </Field>
                  <ErrorMessage name={`inventoryManagements.${index}.dailyWeekMonth`} component="div" className="invalid-feedback" />
                </td> 
                <td>
                  <Field name={`inventoryManagements.${index}.quantity`} type="text" className={`form-control text-center bg-white my-1`+ (boundErrors.quantity && boundTouched.quantity ? ' is-invalid' : '')} readOnly={isView} />
                  <ErrorMessage name={`inventoryManagements.${index}.quantity`}component="div" className="invalid-feedback" />
                </td>
                <td>
                  <Field name={`inventoryManagements.${index}.remark`} type="text" className={`form-control text-center bg-white my-1`+ (boundErrors.remark && boundTouched.remark ? ' is-invalid' : '')} readOnly={isView} />
                  <ErrorMessage name={`inventoryManagements.${index}.remark`} component="div" className="invalid-feedback" />
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

export default InventoryManagementForm;
