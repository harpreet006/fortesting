import React, {useState, useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {updateStoreRFQ, responseRfq} from '../../../store/actions/customer/rfqAction'
import {useSelector, useDispatch} from 'react-redux';
import FormSuccess from '../../../components/helper/FormSuccess';
import Spinner from 'react-bootstrap/Spinner';
import { onlyNumberAllow,onlyAlphaNumericSpaceAllow, maxLengthCheck} from '../../../components/validation';

const StorageTypeForm = ({isView, rfqid}) => {

  const handleChangeSearch = (e,index) => {
    // console.log(searchForm, "searchForn")
    if (e.target.name === `storageTypes.${index}.noOfPallet`) {
      // setSearchForm({
      //   ...searchForm,
      //   totalArea: parseFloat(e.target.value * 32).toFixed(2),
      //   pallet: parseFloat(e.target.value),
      // });
      // storageTypes.index.noOfPallet
      console.log("hello")
      let new_value=e.target.value
      
      const updateItem = (new_value) => {
        const updatedItems = jsonData.map((item,id) => {
            if (id===index) {
                return { ...item, noOfPallet:new_value,areaSq:new_value*32 };
            }
            return item;
        });

        setJsonData(updatedItems)
      
      console.log("helo",jsonData)

      
      
    } 
    updateItem(new_value)
    
    
    //   else {
    //   setSearchForm({ ...searchForm, [e.target.name]: e.target.value });
    // }

    // if (e.target.name === "pallet" || e.target.name === "totalArea") {
    //   if (e.target.value.length === 0) {
    //     setSearchForm({ ...searchForm, pallet: "", totalArea: "" });
    //   }
    }
  };
    const dispatch = useDispatch();
    const data = useSelector((state)=>state.CUSTOMER_RFQ_INFO);

    const  [jsonData, setJsonData] =useState([
        // {
        //     "processType": "Temperature Control (Airconditioned)",
        //     "temperatureRange": "",
        //     "noOfPallet": ""
        // },
        // {
        //     "processType": "Humidity Control",
        //     "temperatureRange": "",
        //     "noOfPallet": ""
        // },
        // {
        //     "processType": "Dust Free",
        //     "temperatureRange": "",
        //     "noOfPallet": ""
        // },
        {
            "processType": "General Pallet Storage",
            "temperatureRange": "",
            "noOfPallet": "",
            "remarks":"",
            "areaSq" :"",
        },
        // {
        //     "processType": "Serial No",
        //     "temperatureRange": "",
        //     "noOfPallet": ""
        // },
        {
            "processType": "Shelve Rack Storage",
            "temperatureRange": "",
            "noOfPallet": "",
            "remarks":"",
            "areaSq" :"",
        },
        // {
        //     "processType": "Block Storage",
        //     "temperatureRange": "",
        //     "noOfPallet": ""
        // },
        {
            "processType": "Block Storage",
            "temperatureRange": "",
            "noOfPallet": "",
            "remarks":"",
            "areaSq" :"",
        },
        {
            "processType": "Ground Storage",
            "temperatureRange": "",
            "noOfPallet": "",
            "remarks":"",
            "areaSq" :"",
        },
        {
            "processType": "Others (please specify)",
            "temperatureRange": "",
            "noOfPallet": "",
            "remarks":"",
            "areaSq" :"",
        }
        ,
        {
            "processType": "Dust Free",
            "temperatureRange": "",
            "noOfPallet": "",
            "remarks":"",
            "areaSq" :"",
        }
        ,
        {
            "processType": "Temperature Control (Airconditioned)",
            "temperatureRange": "",
            "noOfPallet": "",
            "remarks":"",
            "areaSq" :"",
        }
        ,
        {
            "processType": "Humidity Control",
            "temperatureRange": "",
            "noOfPallet": "",
            "remarks":"",
            "areaSq" :"",
        }
    ])


    const storeSchema = Yup.object().shape({
        storageTypes: Yup.array().of(
            Yup.object().shape({
                // temperatureRange: Yup.string().required('Required'),
                areaSq: Yup.string().required('Required'),
                noOfPallet: Yup.string().required('Required').max(5, 'Must be 5 digits')
              })
        )
      });

    
      useEffect(() => {

        if(data.rfqInitialDetail.storageTypes && data.rfqInitialDetail.storageTypes.length !==0){
          setJsonData(
            data.rfqInitialDetail.storageTypes.map((item, i)=>{
              return (
                {
                    "processType": item.processType,
                    "temperatureRange": item.temperatureRange,
                    "noOfPallet": item.noOfPallet,
                    "remarks":item?.remarks,
                    "areaSq" :item.areaSq,
                }
              )
            })
          )
        }

        if(data.rfqFirstForm?.storageTypes && data.rfqFirstForm?.storageTypes.length !==0){
          setJsonData(
            data.rfqFirstForm.storageTypes.map((item, i)=>{ 
              return (
                {
                    "processType": item.processType,
                    "temperatureRange": item.temperatureRange,
                    "noOfPallet": item.noOfPallet,
                    "remarks":item?.remarks,
                    "areaSq" :item.areaSq,
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
      initialValues={{"storageTypes":  jsonData }}
      onSubmit={fields => {
        console.log("fields",fields)
        if(rfqid){
        fields["customerRfq"]= rfqid
        dispatch(updateStoreRFQ(fields,data.rfqFirstForm.warehouses))
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
                    <td className="border-top-0 font-weight-bold py-3 mw-200px">No. of Pallets</td>   
                    <td className="border-top-0 font-weight-bold text-nowrap py-3 mw-150px">Area in Sq'st</td>  
                    <td className="border-top-0 font-weight-bold text-nowrap py-3 mw-150px">Remarks</td>  
                    </tr> 
                    </thead>
              <tbody> 
                {/* {console.log("valuesdata",initialValues.storageTypes)} */}

              {values.storageTypes.length > 0 &&
                  values.storageTypes.map((man, index) => {
                    const boundErrors = (errors.storageTypes?.length && errors.storageTypes[index]) || {};
                    const boundTouched = (touched.storageTypes?.length && touched.storageTypes[index]) || {};
                    return(
                    <tr key={index}> 
                    <td>
                        {index+1}
                    </td>
                    <td className="text-left">
                        {man?.processType}
                    </td>
                    <td>
                        <Field maxLength="5" value={jsonData[index].noOfPallet} onChange={(e)=>handleChangeSearch(e,index)} onInput={maxLengthCheck} name={`storageTypes.${index}.noOfPallet`} onKeyPress={(e) => onlyNumberAllow(e)} type="number" className={`form-control text-center bg-white my-1`+ (boundErrors.noOfPallet && boundTouched.noOfPallet ? ' is-invalid' : '')} readOnly={isView} placeholder="Type here" />
                        <ErrorMessage name={`storageTypes.${index}.noOfPallet`} component="div" className="invalid-feedback" />
                    </td>
                    <td>
                        <Field maxLength="9" value={jsonData[index].areaSq}onInput={maxLengthCheck} name={`storageTypes.${index}.areaSq`} onKeyPress={(e) => onlyAlphaNumericSpaceAllow(e)} type="text" className={`form-control text-center bg-white my-1`+ (boundErrors.areaSq && boundTouched.areaSq ? ' is-invalid' : '')} readOnly placeholder="Type here" />
                        <ErrorMessage name={`storageTypes.${index}.areaSq`} component="div" className="invalid-feedback" />
                    </td>
                    <td>
                        <Field name={`storageTypes.${index}.remarks`}  type="text" className={`form-control text-center bg-white my-1`+ (boundErrors.remarks && boundTouched.remarks ? ' is-invalid' : '')} readOnly={isView} placeholder="Type here" />
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
                <button type="button" className="btn btn-outline-deep-primary mb-3 add-className remove-className">Back</button>
                </div> */}
                <div className="col-auto">
                <button disabled={data.isLoading} type="submit" className="btn btn-deep-primary mb-3 add-className remove-className">Save
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

export default StorageTypeForm;
