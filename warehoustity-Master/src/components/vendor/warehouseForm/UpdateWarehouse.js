import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { newWarehouseSchema } from '../../validation';
import { updateWarehouse, changeWarehouseStatus } from '../../../store/actions/vendor/warehouseList';
import { categoryByPage } from '../../../store/actions/categoryAction';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import FormSuccess from '../../helper/FormSuccess';
import ErrorCard, { FormErrorCard } from '../../helper/ErrorCard';
import { CardLoader } from '../../helper/CustomLoader';
import { typeByPage } from '../../../store/actions/whyAction';

const UpdateWarehouse = ({ viewMood }) => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.WAREHOUSELIST);
  const category = useSelector((state) => state.CATEGORY_INFO.categoryList);
  const typeWh = useSelector((state) => state.WHY_INFO);


  useEffect(() => {
    dispatch(typeByPage())
    dispatch(categoryByPage())
  }, [dispatch])

  return (
    <>
      {/* Loader */}

      {data.isLoading ? <CardLoader /> : (data.isError !== "" ?
        <ErrorCard message={data.isError} />
        :
        <>
          {
            data.addNewResponse.statusCode === 200 ?
              <FormSuccess onClick={() => dispatch(changeWarehouseStatus())} message={data.addNewResponse.message} />
              : null
          }

          <div className="row align-items-center pb-3  mx-0">
            <div className="col-12">

              <Formik
                enableReinitialize={true}
                initialValues={{
                  warehouseName: data.warehouseDetail.warehouseName,
                  category: data.warehouseDetail.category?.id,
                  type: data.warehouseDetail.type?.id,
                  gstCertificate: ''
                }}
                validationSchema={newWarehouseSchema}
                onSubmit={fields => {
                  dispatch(updateWarehouse(data.warehouseDetail.id, fields));
                  console.log("---->", fields)
                }}
                render={({ values, errors, status, onChange, setFieldValue, touched }) => (



                  <Form>
                    <div className="row bg-white rounded mx-0 col-xxxl-11">
                      <div className="form-group col-12 mb-3">
                        <label htmlFor="category" className="mb-2 mr-3">Select Warehouse Category</label>

                        <Field name="category" as="select" className={'form-control custom-select bg-white px-4 common-select-deep-blue w-100' + (errors.category && touched.category ? ' is-invalid' : '')} id="category" disabled={viewMood}>

                          {category && category.length > 0 ?
                            category.filter(item => item.categoryStatus === true).map((item, index) => {
                              return (
                                <option value={item.id} key={index} className="text-capitalize">{item.categoryName}</option>
                              )
                            })
                            : null}
                        </Field>
                        <ErrorMessage name="category" component="div" className="invalid-feedback" />
                      </div>

                      <div className="col-12 form-group mb-3">
                        <p className="mb-2 text-dark">Select Warehouse Type</p>
                        <div className="row">

                          {typeWh?.typeList?.data && typeWh?.typeList?.data.length > 0 ?
                            typeWh?.typeList?.data.map((item, index) => {
                              return (
                                <div key={index} className="col-md-auto col-xl-4 mt-2">
                                  <div className="form-check common-radio-deep-blue">
                                    <Field
                                      onChange={(e) => setFieldValue("type", parseInt(e.target.value))}
                                      checked={values.type === item.id}
                                      className={'common-radio-deep-blue-input' + (errors.type && touched.type ? ' is-invalid' : '')}
                                      type="radio" name="type" id={`type${index}`} value={item.id} hidden />

                                    <label className={'common-radio-deep-blue-label pl-2'} htmlFor={`type${index}`}>{item.type}</label>
                                    <ErrorMessage name="type" component="div" className="invalid-feedback" />
                                  </div>
                                </div>
                              )
                            })
                            : null}


                          {/* <div className="col-md-auto col-xl-4 mt-2">
                        <div className="form-check common-radio-deep-blue">
                          <Field className={'common-radio-deep-blue-input'+ (errors.type && touched.type ? ' is-invalid' : '')} 
                          type="radio" name="type" id="type" value="Dedicated" checked={values.type==="Dedicated"} disabled={viewMood} hidden />
                          <label className={'common-radio-deep-blue-label pl-2'} htmlFor="type">Dedicated</label>
                          <ErrorMessage name="type" component="div"  className="invalid-feedback" />
                        </div>
                      </div>
                      <div className="col-md-auto col-xl-4 mt-2">
                        <div className="form-check common-radio-deep-blue">
                          <Field className="common-radio-deep-blue-input" type="radio" name="type" id="wareType1" value="Shared" checked={values.type==="Shared"} disabled={viewMood} hidden />
                          <label className="common-radio-deep-blue-label pl-2" htmlFor="wareType1">Shared</label>
                        </div>
                      </div>
                      <div className="col-md-auto col-xl-4 mt-2">
                        <div className="form-check common-radio-deep-blue">
                          <Field className="common-radio-deep-blue-input" type="radio" name="type" id="wareType2" value="Transit Hub" checked={values.type==="Transit Hub"} disabled={viewMood} hidden/>
                          <label className="common-radio-deep-blue-label pl-2" htmlFor="wareType2">Transit Hub</label>
                        </div>
                      </div>
                      <div className="col-md-auto col-xl-4 mt-2">
                        <div className="form-check common-radio-deep-blue">
                          <Field className="common-radio-deep-blue-input" type="radio" name="type" id="wareType3" value="Empty Space (Grey Warehouse)" checked={values.type==="Empty Space (Grey Warehouse)"} disabled={viewMood} hidden/>
                          <label className="common-radio-deep-blue-label pl-2" htmlFor="wareType3">Empty Space (Grey Warehouse)</label>
                        </div>
                      </div>
                      <div className="col-md-auto col-xl-4 mt-2">
                        <div className="form-check common-radio-deep-blue">
                          <Field className="common-radio-deep-blue-input" type="radio" name="type" id="wareType4" value="Under Construction" checked={values.type==="Under Construction"} disabled={viewMood} hidden/>
                          <label className="common-radio-deep-blue-label pl-2" htmlFor="wareType4">Under Construction</label>
                        </div>
                      </div>
                      <div className="col-md-auto col-xl-4 mt-2">
                        <div className="form-check common-radio-deep-blue">
                          <Field className="common-radio-deep-blue-input" type="radio" name="type" id="wareType5" value="Land Parcel (Yard)" checked={values.type==="Land Parcel (Yard)"} disabled={viewMood} hidden/>
                          <label className="common-radio-deep-blue-label pl-2" htmlFor="wareType5">Land Parcel (Yard)</label>
                        </div>
                      </div> */}

                        </div>
                      </div>
                      <div className="form-group form-inline col-12 mb-3 mt-2">
                        <label htmlFor="warehouseName" className="mb-2 mr-3">Warehouse Display Name</label>
                        <Field name="warehouseName" className={'form-control bg-white px-4 w-300px' + (errors.warehouseName && touched.warehouseName ? ' is-invalid' : '')} placeholder="Enter Display Name" id="warehouseName" readOnly={viewMood} />
                        <ErrorMessage name="warehouseName" component="div" className="invalid-feedback" />
                      </div>

                      <div className={`col-12 ${viewMood ? "d-none" : ""}`}>
                        <div className="row justify-content-end">
                          {Object.keys(errors).length !== 0 ? <FormErrorCard message="Fill All Required Fields" /> : null}
                          {data.isError !== "" ? <FormErrorCard message={data.isError} /> : null}
                          <div className="col-auto">
                            <button type="submit" disabled={data.isPending} className="btn btn-deep-primary px-5">Save
                              {data.isPending ? <Spinner animation="border" /> : null}
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
