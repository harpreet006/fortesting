import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {maxLengthCheck, contactDetailsSchema} from '../../validation'
import {updateWarehouseContact, changeWarehouseStatus} from '../../../store/actions/vendor/warehouseList';
import {useDispatch, useSelector} from 'react-redux';
// import Spinner from 'react-bootstrap/Spinner';
import FormSuccess from '../../helper/FormSuccess';

const ContactDetailForm = () => {
  const dispatch = useDispatch()
  const data=useSelector((state)=>state.WAREHOUSELIST);
  // console.log("State===>", data);
  
    return (
        <>
            {
              data.addNewResponse.statusCode===201 ?
                <FormSuccess onClick={()=>dispatch(changeWarehouseStatus())} message={data.addNewResponse.message} />
              :null
            }
          
          <div className="row align-items-center mx-0"> 
            <div className="col-12">
            <Formik
              initialValues={{
                warehouseName:'',
                companyName:'',
                mobileNumber:'',
                altMobileNumber:'',
                email:'',
                altEmail:'',
                addressOne:'',
                addressTwo:'',
                country:'',
                state:'',
                city:'',
                district:'',
                landmark:'',
                pincode:'',
                gpsLatitude:'',
                gpsLongitude:''
                }}
              validationSchema={contactDetailsSchema}
              onSubmit={fields => {
                console.log("---->", fields)
                // ===================================

               let data= {
                "contact":{
                    "name":fields.warehouseName,
                    "phone":fields.mobileNumber,
                    "email":fields.email,
                    "type":"contact",
                    "warehouse":5
                },
                "alternateContact":{
                    "name":fields.companyName,
                    "phone":fields.altMobileNumber,
                    "email":fields.altEmail,
                    "type":"alternatContact",
                    "warehouse":5
                },
                "address": {
                    "line1": fields.addressOne,
                    "line2": fields.addressTwo,
                    "city": fields.city,
                    "state": fields.state,
                    "country": fields.country,
                    "pinCode": fields.pincode,
                    "landmark": fields.landmark,
                    "latitude": fields.gpsLatitude,
                    "longnitude": fields.gpsLongitude,
                    "warehouse": 5
                },
                "companyName":"companyName",
                "warehouse":5
            }
          console.log("ejrjrej",data)
            // dispatch(updateWarehouseContact(data))

              console.log("Form Data===>", data)
            
              }}
              render={({ errors, status,onChange, touched }) => (

                <Form> 
                  <div className="row bg-white rounded mx-0 col-xxxl-11"> 
                    <div className="col-xl-6 px-0">
                      <div className="form-group col-12 mb-2 px-sm-5 mt-2">
                        <label htmlFor="staticEmail" className="mb-2 px-2">Warehouse Name:</label>
                        <Field name="warehouseName" className={'form-control bg-white px-4'+ (errors.warehouseName && touched.warehouseName ? ' is-invalid' : '')} placeholder="Enter Warehouse Name"/>
                        <ErrorMessage name="warehouseName" component="div" className="invalid-feedback" />
                      </div>
                    </div> 
                    <div className="col-xl-6 px-0">
                      <div className="form-group col-12 mb-2 px-sm-5 mt-2">
                        <label htmlFor="staticEmail" className="mb-2 px-2">Company Name</label>
                        <Field  name="companyName" className={'form-control bg-white px-4'+ (errors.companyName && touched.companyName ? ' is-invalid' : '')} placeholder="Enter Company Name"/>
                        <ErrorMessage name="companyName" component="div" className="invalid-feedback" />
                      </div>
                    </div>
                    <div className="col-xl-6 px-0">
                      <div className="form-group col-12 mb-2 px-sm-5 mt-2">
                        <label htmlFor="staticEmail" className="mb-2 px-2">Mobile No.:</label>
                        <Field 
                          name="mobileNumber"
                          type="number"
                          className={'form-control bg-white px-4'+ (errors.mobileNumber && touched.mobileNumber ? ' is-invalid' : '')}
                          placeholder="Enter Mobile No."
                          maxLength="10"
                          onInput={maxLengthCheck}
                          onKeyDown={(e) =>
                          /[+\-.,]$/.test(e.key) && e.preventDefault()}
                        />
                        <ErrorMessage name="mobileNumber" component="div" className="invalid-feedback" />
                      </div>
                    </div> 
                    <div className="col-xl-6 px-0">
                      <div className="form-group col-12 mb-2 px-sm-5 mt-2">
                        <label htmlFor="staticEmail" className="mb-2 px-2">Alternate Mobile::</label>
                        <Field 
                          name="altMobileNumber"
                          type="number"
                          className={'form-control bg-white px-4'+ (errors.altMobileNumber && touched.altMobileNumber ? ' is-invalid' : '')}
                          placeholder="Enter Alternate Mobile"
                          maxLength="10"
                          onInput={maxLengthCheck}
                          onKeyDown={(e) =>
                          /[+\-.,]$/.test(e.key) && e.preventDefault()}
                          />
                        <ErrorMessage name="altMobileNumber" component="div" className="invalid-feedback" />
                      </div>
                    </div>
                    <div className="col-xl-6 px-0">
                      <div className="form-group col-12 mb-2 px-sm-5 mt-2">
                        <label htmlFor="staticEmail" className="mb-2 px-2">Email:</label>
                        <Field name="email" type="text" className={'form-control bg-white px-4'+ (errors.email && touched.email ? ' is-invalid' : '')} placeholder="Enter Email"/>
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                      </div>
                    </div> 
                    <div className="col-xl-6 px-0">
                      <div className="form-group col-12 mb-2 px-sm-5 mt-2">
                        <label htmlFor="staticEmail" className="mb-2 px-2"> 	Alternate Email:</label>
                        <Field name="altEmail" type="email" className={'form-control bg-white px-4'+ (errors.altEmail && touched.altEmail ? ' is-invalid' : '')} placeholder="Enter Alternate Email"/>
                        <ErrorMessage name="altEmail" component="div" className="invalid-feedback" />
                      </div>
                    </div>
                    <div className="col-xl-6 px-0">
                      <div className="form-group col-12 mb-2 px-sm-5 mt-2">
                        <label htmlFor="staticEmail" className="mb-2 px-2">Address 1:</label>
                        <Field name="addressOne" type="text" className={'form-control bg-white px-4'+ (errors.addressOne && touched.addressOne ? ' is-invalid' : '')} placeholder="Enter Address"/>
                        <ErrorMessage name="addressOne" component="div" className="invalid-feedback" />
                      </div>
                    </div> 
                    <div className="col-xl-6 px-0">
                      <div className="form-group col-12 mb-2 px-sm-5 mt-2">
                        <label htmlFor="staticEmail" className="mb-2 px-2"> 	Address 2:</label>
                        <Field name="addressTwo" type="text" className={'form-control bg-white px-4'+ (errors.addressTwo && touched.addressTwo ? ' is-invalid' : '')} placeholder="Enter Address"/>
                        <ErrorMessage name="addressTwo" component="div" className="invalid-feedback" />
                      </div>
                    </div>
                    <div className="col-xl-6 px-0">
                      <div className="form-group col-12 mb-2 px-sm-5 mt-2">
                        <label htmlFor="country" className="mb-2 px-2">Country:</label>
                        <Field name="country" as="select" className={'form-control custom-select bg-white px-4 common-select-deep-blue w-300px' + (errors.country && touched.country ? ' is-invalid' : '')} id="country">
                          <option>Select Country</option>
                          <option>India</option>
                          <option>US</option>
                          <option>Japan</option>
                        </Field>
                        <ErrorMessage name="country" component="div"  className="invalid-feedback" />
                      </div>
                    </div> 
                    <div className="col-xl-6 px-0">
                      <div className="form-group col-12 mb-2 px-sm-5 mt-2">
                        <label htmlFor="state" className="mb-2 px-2"> 	State:</label>
                        <Field name="state" as="select" className={'form-control custom-select bg-white px-4 common-select-deep-blue w-300px' + (errors.state && touched.state ? ' is-invalid' : '')}  id="state">
                          <option>Select State</option>
                          <option>Andhra Pradesh</option>
                          <option>Delhi</option>
                          <option>Bihar</option>
                        </Field>
                        <ErrorMessage name="state" component="div"  className="invalid-feedback" />
                      </div>
                    </div>
                    <div className="col-xl-6 px-0">
                      <div className="form-group col-12 mb-2 px-sm-5 mt-2">
                        <label htmlFor="city" className="mb-2 px-2"> 	City:</label>
                        <Field name="city" as="select" className={'form-control custom-select bg-white px-4 common-select-deep-blue w-300px' + (errors.city && touched.city ? ' is-invalid' : '')} id="city">
                          <option>Select City</option>
                          <option>Delhi</option>
                          <option>Mumbai</option>
                          <option>Kolkata</option>
                        </Field>
                        <ErrorMessage name="city" component="div"  className="invalid-feedback" />
                      </div>
                    </div>
                    <div className="col-xl-6 px-0">
                      <div className="form-group col-12 mb-2 px-sm-5 mt-2">
                        <label htmlFor="staticEmail" className="mb-2 px-2">District:</label>
                        <Field name="district" type="text" className={'form-control bg-white px-4'+ (errors.district && touched.district ? ' is-invalid' : '')} placeholder="Enter District"/>
                        <ErrorMessage name="district" component="div" className="invalid-feedback" />
                      </div>
                    </div>
                    <div className="col-xl-6 px-0">
                      <div className="form-group col-12 mb-2 px-sm-5 mt-2">
                        <label htmlFor="staticEmail" className="mb-2 px-2">Landmark:</label>
                        <Field name="landmark" type="text" className={'form-control bg-white px-4'+ (errors.landmark && touched.landmark ? ' is-invalid' : '')} placeholder="Enter Landmark"/>
                        <ErrorMessage name="landmark" component="div" className="invalid-feedback" />
                      </div>
                    </div>
                    <div className="col-xl-6 px-0">
                      <div className="form-group col-12 mb-2 px-sm-5 mt-2">
                        <label htmlFor="staticEmail" className="mb-2 px-2">Pincode:</label>
                        <Field
                        name="pincode"
                        type="number"
                        className={'form-control bg-white px-4'+ (errors.pincode && touched.pincode ? ' is-invalid' : '')} 
                        placeholder="Enter Pincode"
                        maxLength="6"
                        onInput={maxLengthCheck}
                        onKeyDown={(e) =>
                        /[+\-.,]$/.test(e.key) && e.preventDefault()}
                        />
                        <ErrorMessage name="pincode" component="div" className="invalid-feedback" />
                      </div>
                    </div>
                    <div className="col-xl-6 px-0">
                      <div className="form-group col-12 mb-2 px-sm-5 mt-2">
                        <label htmlFor="staticEmail" className="mb-2 px-2">Warehouse GPS Location -  latitude </label>
                        <Field name="gpsLatitude" type="text" className={'form-control bg-white px-4'+ (errors.gpsLatitude && touched.gpsLatitude ? ' is-invalid' : '')} placeholder="Warehouse GPS Location -  latitude "/>
                        <ErrorMessage name="gpsLatitude" component="div" className="invalid-feedback" />
                        <div style={{width: '100%'}}>
                        <iframe title="GPS" width="100%" height="200" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=200&amp;hl=en&amp;q=escale%20solution+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
                        {/* <a href="https://www.maps.ie/route-planner.htm">.</a> */}
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 px-0">
                      <div className="form-group col-12 mb-2 px-sm-5 mt-2">
                        <label htmlFor="staticEmail" className="mb-2 px-2">Warehouse GPS Location -  longitude</label>
                        <Field name="gpsLongitude" type="text" className={'form-control bg-white px-4'+ (errors.gpsLongitude && touched.gpsLongitude ? ' is-invalid' : '')} placeholder="Warehouse GPS Location -  longitude"/>
                        <ErrorMessage name="gpsLongitude" component="div" className="invalid-feedback" />
                        <div style={{width: '100%'}}>
                          <iframe title="GPS" width="100%" height="200" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=200&amp;hl=en&amp;q=escale%20solution+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">

                          </iframe>
                          {/* <a href="https://www.maps.ie/route-planner.htm"></a> */}
                          </div> 
                      </div>
                    </div>

                    <div className="col-12 mt-2">
                      <div className="row justify-content-end">
                        <div className="col-auto">
                          {/* <button type="button" className="btn btn-outline-deep-blue add-class remove-class" data-add-target=".steps2" data-add-target-classname="d-none" data-remove-target=".steps1" data-remove-target-class="d-none">Back</button> */}
                        </div>
                        <div className="col-auto">
                          <button type="submit" className="btn btn-deep-blue add-class remove-class">Save</button>
                        </div>
                      </div>
                    </div>
                  </div>  
                  </Form>
       )}
    
              />
            </div>
          </div>
        </>
    )
}

export default ContactDetailForm
