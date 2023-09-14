import React,{useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {newWarehouseSchema} from '../../validation';
import {updateWarehouse, changeWarehouseStatus} from '../../../store/actions/vendor/warehouseList';
import {categoryByPage} from '../../../store/actions/categoryAction';
import {useDispatch, useSelector} from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import FormSuccess from '../../helper/FormSuccess';
import ErrorCard, { FormErrorCard } from '../../helper/ErrorCard';
import { CardLoader } from '../../helper/CustomLoader';


const UpdateWarehouse = ({viewMood}) => {
    const dispatch = useDispatch()
    const data=useSelector((state)=>state.WAREHOUSELIST);
    const category=useSelector((state)=>state.CATEGORY_INFO.categoryList);


    useEffect(()=>{
      dispatch(categoryByPage())
    },[dispatch])
  
  return (
    <>
     {/* Loader */}

     {data.isLoading ?  <CardLoader />: (data.isError !=="" ? 
                <ErrorCard message={data.isError} />
                 :
                   <>
    {
      data.addNewResponse.statusCode===200 ?
        <FormSuccess onClick={()=>dispatch(changeWarehouseStatus())} message={data.addNewResponse.message} />
      :null
    }
 
          <div className="row align-items-center pb-3 px-3 mx-0"> 
            <div className="col-12">

          <Formik
            enableReinitialize={true}
            initialValues={{
              warehouseName:data.warehouseDetail.warehouseName,
              category:data.warehouseDetail.category, 
              type:data.warehouseDetail.type,
              gstCertificate: ''
              }}
            validationSchema={newWarehouseSchema}
            onSubmit={fields => {
              dispatch(updateWarehouse(data.warehouseDetail.id, fields));
              console.log("---->", fields)
            }}
            render={({values,errors, status,onChange, touched }) => (
         
       <Form>
                <div className="row bg-white rounded mx-0 col-xxxl-11">
                  <div className="form-group col-12 mb-3 px-sm-5">
                    <label htmlFor="category" className="mb-2 mr-3">Select Warehouse Category</label>                  
                    
                    <Field name="category" as="select" className={'form-control custom-select bg-white px-4 common-select-deep-blue w-300px' + (errors.category && touched.category ? ' is-invalid' : '')} id="category" disabled={viewMood}>
                      <option value="General">General Warehouse</option>
                      <option value="Custom">Custom Bonded Warehouse</option>
                      <option value="Temperature">Temperature Controlled WH</option>
                      <option value="FTWZ">FTWZ</option>

                      {category && category.length>0 ? 
                      category.filter(item => item.categoryStatus === true).map((item, index)=>{
                        return(
                          <option  value={item.categoryName} key={index} className="text-capitalize">{item.categoryName}</option>
                        )
                      })
                    :null}


                    </Field>
                    <ErrorMessage name="category" component="div"  className="invalid-feedback" />
                  </div> 
                  <div className="row justify-content-xl-end my-3">
            <div className="col-auto">
                <p className="px-3 py-2">Whs Remarks</p>
            </div>
            <div className="col-auto form-inline form-group form-inline">
                <p className="py-2">{data.warehouseDetail&&data.warehouseDetail.category&&data.warehouseDetail.warehouseRemark.category.whsstatus===true?"okay":"Not okay"}</p>
            </div>
            <div className="col-auto">
                <input  value={data.warehouseDetail&&data.warehouseDetail.category&&data.warehouseDetail.warehouseRemark.category.whsremark} type="text" className="form-control  px-4 ml-xl-0 ml-3 mb-2" placeholder="Remarks" disabled/>
            </div>
            </div>

                  <div className="col-12 form-group mb-3 px-sm-5">
                    <p className="mb-2 text-gray">Select Warehouse Type</p>
                    <div className="row">
                      <div className="col-md-auto col-xl-4 mt-2">
                        <div className="form-check common-radio-deep-blue">
                          <Field className={'common-radio-deep-blue-input'+ (errors.type && touched.type ? ' is-invalid' : '')} type="radio" name="type" id="type" value="dedicated" checked={values.type==="dedicated"} disabled={viewMood} hidden />
                          <label className={'common-radio-deep-blue-label pl-2'} htmlFor="type">Dedicated</label>
                          <ErrorMessage name="type" component="div"  className="invalid-feedback" />
                        </div>
                      </div>
                      <div className="col-md-auto col-xl-4 mt-2">
                        <div className="form-check common-radio-deep-blue">
                          <Field className="common-radio-deep-blue-input" type="radio" name="type" id="wareType1" value="shared" checked={values.type==="shared"} disabled={viewMood} hidden />
                          <label className="common-radio-deep-blue-label pl-2" htmlFor="wareType1">Shared</label>
                        </div>
                      </div>
                      <div className="col-md-auto col-xl-4 mt-2">
                        <div className="form-check common-radio-deep-blue">
                          <Field className="common-radio-deep-blue-input" type="radio" name="type" id="wareType2" value="transitHub" checked={values.type==="transitHub"} disabled={viewMood} hidden/>
                          <label className="common-radio-deep-blue-label pl-2" htmlFor="wareType2">Transit Hub</label>
                        </div>
                      </div>
                      <div className="col-md-auto col-xl-4 mt-2">
                        <div className="form-check common-radio-deep-blue">
                          <Field className="common-radio-deep-blue-input" type="radio" name="type" id="wareType3" value="emptySpace" checked={values.type==="emptySpace"} disabled={viewMood} hidden/>
                          <label className="common-radio-deep-blue-label pl-2" htmlFor="wareType3">Empty Space (Grey Warehouse)</label>
                        </div>
                      </div>
                      <div className="col-md-auto col-xl-4 mt-2">
                        <div className="form-check common-radio-deep-blue">
                          <Field className="common-radio-deep-blue-input" type="radio" name="type" id="wareType4" value="underConstruction" checked={values.type==="underConstruction"} disabled={viewMood} hidden/>
                          <label className="common-radio-deep-blue-label pl-2" htmlFor="wareType4">Under Construction</label>
                        </div>
                      </div>
                      <div className="col-md-auto col-xl-4 mt-2">
                        <div className="form-check common-radio-deep-blue">
                          <Field className="common-radio-deep-blue-input" type="radio" name="type" id="wareType5" value="landParcel" checked={values.type==="landParcel"} disabled={viewMood} hidden/>
                          <label className="common-radio-deep-blue-label pl-2" htmlFor="wareType5">Land Parcel (Yard)</label>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                  <div className="row justify-content-xl-end my-3">
            <div className="col-auto">
                <p className="px-3 py-2">WHS Remarks</p>
            </div>
            <div className="col-auto form-inline form-group form-inline">
                <p className="py-2">{data.warehouseDetail&&data.warehouseDetail.type&&data.warehouseDetail.warehouseRemark.type.whsstatus===true?"okay":"Not okay"}</p>
            </div>
            <div className="col-auto">
                <input  value={data.warehouseDetail&&data.warehouseDetail.type&&data.warehouseDetail.warehouseRemark.type.whsremark} type="text" className="form-control  px-4 ml-xl-0 ml-3 mb-2" placeholder="Remarks" disabled/>
            </div>
            </div>
                  <div className="form-group form-inline col-12 mb-3 px-sm-5 mt-2">
                    <label htmlFor="warehouseName" className="mb-2 mr-3">Warehouse Display Name</label>
                    <Field name="warehouseName" className={'form-control bg-white px-4 w-300px' + (errors.warehouseName && touched.warehouseName ? ' is-invalid' : '')} placeholder="Enter Display Name" id="warehouseName" readOnly={viewMood} />
                    <ErrorMessage name="warehouseName" component="div"  className="invalid-feedback" />
                  </div> 
                  <div className="row justify-content-xl-end my-3">
            <div className="col-auto">
                <p className="px-3 py-2">Whs Remarks</p>
            </div>
            <div className="col-auto form-inline form-group form-inline">
                <p className="py-2">{data.warehouseDetail&&data.warehouseDetail.warehouseName&&data.warehouseDetail.warehouseRemark.warehouseName.whsstatus===true?"okay":"Not okay"}</p>
            </div>
            <div className="col-auto">
                <input  value={data.warehouseDetail&&data.warehouseDetail.warehouseName&&data.warehouseDetail.warehouseRemark.warehouseName.whsremark} type="text" className="form-control  px-4 ml-xl-0 ml-3 mb-2" placeholder="Remarks" disabled/>
            </div>
            </div>
                  <div className={`col-12 ${viewMood ? "d-none" : ""}`}>
                    <div className="row justify-content-end">
                      {Object.keys(errors).length !== 0 ? <FormErrorCard message="Fill All Required Fields" /> : null}
                      {data.isError !== "" ? <FormErrorCard message={data.isError} /> : null}
                      <div className="col-auto">
                        <button type="submit" disabled={data.isPending} className="btn btn-deep-blue">Save
                        {data.isPending ? <Spinner animation="border"  /> :null}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>  
                </Form>
            )}
    
              />
            </div>
          </div>

          </>)
                  }

    </>
  );
}

export default UpdateWarehouse;
