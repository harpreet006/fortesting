import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { maxLengthCheck, contactDetailsSchema } from '../../validation'
import { updateWarehouseContact, changeWarehouseStatus } from '../../../store/actions/vendor/warehouseList';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import FormSuccess from '../../helper/FormSuccess';
import ErrorCard, { FormErrorCard } from '../../helper/ErrorCard';
import { CardLoader } from '../../helper/CustomLoader';
import Maps from '../../../pages/warehouse/Maps2'
import ShowMap from '../../../pages/warehouse/ShowMap';
import pinCode from '../../../json/pincode.json';

const UpdateContactDetailForm = ({ warehouseId, viewMood }) => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.WAREHOUSELIST);
  const profile = useSelector((state) => state.USERPROFILE.userProfile)


  const [contactForm, setContactForm] = useState({
    warehouseName: '',
    companyName: '',
    mobileNumber: '',
    altMobileNumber: '',
    email: '',
    altEmail: '',
    addressOne: '',
    addressTwo: '',
    country: 'India',
    state: '',
    city: '',
    district: '',
    landmark: '',
    pincode: '',
    gpsLatitude: 28.6280,
    gpsLongitude: 77.2956
  })




  function pinCodeChange(pin) { // 233227
    // console.log('pin--', pin)
    let pinCodeObject = pinCode.filter(v => parseInt(v.pincode) === parseInt(pin))
    if (pinCodeObject.length > 0) {
      return pinCodeObject[0]
    }
    else {
      return null;
    }
  }


  useEffect(() => {
    let contactInfo = data.singleFormData.warehouseContactDetailInfo ? data.singleFormData.warehouseContactDetailInfo.contactInfo : ""
    let address = data.singleFormData.warehouseContactDetailInfo ? data.singleFormData.warehouseContactDetailInfo.address : ""


    if (address !== null && contactInfo && contactInfo.length > 0) {
      setContactForm(
        {
          warehouseName: contactInfo ? contactInfo[0].name : "",
          companyName: contactInfo ? contactInfo[1].name : "",
          mobileNumber: contactInfo ? contactInfo[0].phone : "",
          altMobileNumber: contactInfo ? contactInfo[1].phone : "",
          email: contactInfo ? contactInfo[0].email : "",
          altEmail: contactInfo ? contactInfo[1].email : "",
          addressOne: address ? address.line1 : "",
          addressTwo: address ? address.line2 : "",
          country: address ? address.country : "",
          state: address ? address.state : "",
          city: address ? address.city : "",
          district: address ? address.district : "",
          landmark: address ? address.landmark : "",
          pincode: address ? address.pinCode : "",
          gpsLatitude: address ? address.latitude : "",
          gpsLongitude: address ? address.longnitude : ""
        }
      )
    } else {
      setContactForm({
        ...contactForm,
        warehouseName: data.warehouseDetail.warehouseName || '',
        companyName: profile.companyName || '',
        mobileNumber: profile.phone || '',
        email: profile.email || '',
      })
    }

    // eslint-disable-next-line
  }, [data.singleFormData.address, data.warehouseDetail, data.singleFormData.warehouseContactDetailInfo])


  return (
    <>

      {/* Loader */}

      {data.isLoading ? <CardLoader /> : (data.isError !== "" ?
        <ErrorCard message={data.isError} />
        :
        <>

          {
            data.addNewResponse.statusCode === 201 ?
              <FormSuccess onClick={() => dispatch(changeWarehouseStatus())} message={data.addNewResponse.message} />
              : null
          }

          <div className="row align-items-center mx-0">
            <div className="col-12">
              <Formik
                enableReinitialize={true}
                initialValues={contactForm}
                validationSchema={contactDetailsSchema}
                onSubmit={fields => {
                  let data = {
                    "contactInfo": [{
                      "name": fields.warehouseName,
                      "phone": fields.mobileNumber,
                      "email": fields.email,
                      "type": "contact",
                      // "warehouse":parseInt(warehouseId)
                    }, {
                      "name": fields.companyName,
                      "phone": fields.altMobileNumber,
                      "email": fields.altEmail,
                      "type": "alternateContact",
                      // "warehouse":parseInt(warehouseId)
                    }],
                    "address": {
                      "line1": fields.addressOne,
                      "line2": fields.addressTwo,
                      "city": fields.city,
                      "state": fields.state,
                      "district": fields.district,
                      "country": fields.country,
                      "pinCode": fields.pincode,
                      "landmark": fields.landmark,
                      "latitude": fields.gpsLatitude,
                      "longnitude": fields.gpsLongitude,
                      // "warehouse": parseInt(warehouseId)
                    },
                    'companyName': fields.companyName,
                    "warehouse": parseInt(warehouseId)
                  }

                  dispatch(updateWarehouseContact(data))
                }}
                render={({ errors, status, onChange, setFieldValue, touched, values }) => (

                  <Form>
                    <div className="row bg-white rounded mx-0 col-xxxl-11">
                      <div className="col-md-6 col-12">
                        <div className="row">
                          <div className="col-12">
                            <div className="form-group w-100 mb-1 mt-2">
                              <label htmlFor="staticEmail" className="mb-1">Company Name</label>
                              <Field name="companyName" className={'form-control form-control-sm bg-white' + (errors.companyName && touched.companyName ? ' is-invalid' : '')} placeholder="Enter Company Name" readOnly={viewMood} />
                              <ErrorMessage name="companyName" component="div" className="invalid-feedback" />
                            </div>
                          </div>

                          <div className="col-12">
                            <div className="form-group w-100 mb-1">
                              <label htmlFor="staticEmail" className="mb-1">Contact Persion Name</label>
                              <input type="text" value={`${profile?.firstName} ${profile.lastName}`} className={'form-control form-control-sm bg-white'} disabled={true} />

                            </div>
                          </div>

                          <div className="col-12">
                            <div className="form-group w-100 mb-1">
                              <label htmlFor="staticEmail" className="mb-1">Mobile No.:</label>
                              <input
                                className='form-control ps-2'
                                value={profile?.phone}
                                type="text"
                                disabled={true}
                              />
                            </div>
                          </div>

                          <div className="col-12">
                            <div className="form-group  mb-1">
                              <label htmlFor="staticEmail" className="mb-1">Email:</label>
                              <input value={profile?.email} type="text" className={'form-control form-control-sm bg-white'} disabled />

                            </div>
                          </div>

                          <div className="col-12">
                            <div className="form-group mb-1">
                              <label htmlFor="staticEmail" className="mb-1">Pincode:</label>
                              <input
                                name="pincode"
                                type="text"
                                value={profile?.pinCode}
                                className={'form-control form-control-sm bg-white'}

                                disabled
                              />
                            </div>
                          </div>

                          <div className="col-12">
                            <div className="form-group mb-1">
                              <label htmlFor="state" className="mb-1"> 	State:</label>

                              <input
                                name="state"
                                type="text"
                                value={profile?.state}
                                className={'form-control form-control-sm bg-white'} id="state" disabled={true} />
                            </div>
                          </div>

                          <div className="col-12">
                            <div className="form-group mb-1">
                              <label htmlFor="city" className="mb-1">City:</label>
                              <input
                                value={profile?.city}
                                type="text"
                                className={'form-control form-control-sm bg-white'} id="city" disabled={true} />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group mb-1">
                              <label htmlFor="staticEmail" className="mb-1">District:</label>
                              <input
                                value={profile?.district}
                                type="text" className={'form-control form-control-sm bg-white'} disabled={true} />

                            </div>
                          </div>

                          <div className="col-12">
                            <div className="form-group  mb-1 ">
                              <label htmlFor="country" className="mb-1">Country:</label>
                              <input type="text" className="form-control" value={'India'} name="country" />
                            </div>
                          </div>
                        </div>
                      </div>




                      <div className="col-md-6 col-12">
                        <div className="row">
                          <div className="col-12">
                            <div className="form-group mb-1  mt-2">
                              <label htmlFor="staticEmail" className="mb-1 px-2">Warehouse Name:</label>
                              <Field name="warehouseName" className={'form-control form-control-sm bg-white' } placeholder="Enter Warehouse Name" readOnly={viewMood} />
                              <ErrorMessage name="warehouseName" component="div" className="invalid-feedback" />
                            </div>
                          </div>

                          <div className="col-12">
                            <div className="form-group mb-1">
                              <label htmlFor="staticEmail" className="mb-1">Mobile No.:</label>
                              <Field
                                name="mobileNumber"
                                type="number"
                                className={'form-control form-control-sm bg-white ' + (errors.mobileNumber && touched.mobileNumber ? ' is-invalid' : '')}
                                placeholder="Enter Mobile No."
                                maxLength="10"
                                onInput={maxLengthCheck}
                                onKeyDown={(e) =>
                                  /[+\-.,]$/.test(e.key) && e.preventDefault()}
                                readOnly={viewMood}
                              />
                              <ErrorMessage name="mobileNumber" component="div" className="invalid-feedback" />
                            </div>

                          </div>

                          <div className="col-12">

                            <div className="form-group mb-1">
                              <label htmlFor="staticEmail" className="mb-1">Alternate Mobile::</label>
                              <Field
                                name="altMobileNumber"
                                type="number"
                                className={'form-control form-control-sm bg-white' + (errors.altMobileNumber && touched.altMobileNumber ? ' is-invalid' : '')}
                                placeholder="Enter Alternate Mobile"
                                maxLength="10"
                                onInput={maxLengthCheck}
                                onKeyDown={(e) =>
                                  /[+\-.,]$/.test(e.key) && e.preventDefault()}
                                readOnly={viewMood}
                              />
                              <ErrorMessage name="altMobileNumber" component="div" className="invalid-feedback" />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group mb-1">
                              <label htmlFor="staticEmail" className="mb-1">Email:</label>
                              <Field name="email" type="text" className={'form-control form-control-sm bg-white' + (errors.email && touched.email ? ' is-invalid' : '')} placeholder="Enter Email" readOnly={viewMood} />
                              <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group mb-1">
                              <label htmlFor="staticEmail" className="mb-1 ">Pincode:</label>
                              <Field
                                name="pincode"
                                type="number"
                                className={'form-control form-control-sm bg-white ' + (errors.pincode && touched.pincode ? ' is-invalid' : '')}
                                placeholder="Enter Pincode"

                                onChange={(e) => {
                                  let data = pinCodeChange(e.target.value)
                                  setFieldValue("pincode", parseInt((e.target.value)))
                                  if (data) {
                                    setFieldValue("state", data.stateName)
                                    setFieldValue("district", data.districtName)
                                  }
                                }}
                                maxLength="6"
                                onInput={maxLengthCheck}
                                onKeyDown={(e) =>
                                  /[+\-.,]$/.test(e.key) && e.preventDefault()}
                                readOnly={viewMood}
                              />
                              <ErrorMessage name="pincode" component="div" className="invalid-feedback" />
                            </div>
                          </div>

                          <div className="col-12">
                            <div className="form-group  mb-1 ">
                              <label htmlFor="state" className="mb-1 ">State:</label>

                              <Field
                                name="state"
                                //  as="select" 
                                type="text"
                                className={'form-control form-control-sm bg-white' + (errors.state && touched.state ? ' is-invalid' : '')} id="state" disabled={true} >

                              </Field>
                              <ErrorMessage name="state" component="div" className="invalid-feedback" />
                            </div>
                          </div>

                          <div className="col-12">
                            <div className="form-group mb-1">
                              <label htmlFor="city" className="mb-1 "> 	City:</label>
                              <Field name="city"
                                //  as="select"
                                type="text"
                                className={'form-control form-control-sm bg-white' + (errors.city && touched.city ? ' is-invalid' : '')} id="city" disabled={viewMood} >

                              </Field>
                              <ErrorMessage name="city" component="div" className="invalid-feedback" />
                            </div>
                          </div>

                          <div className='row'>
                            <div className='col-6 w-100'>
                              <div className="form-group mb-1">
                                <label htmlFor="staticEmail" className="mb-1">District:</label>
                                <Field name="district" type="text" className={'form-control form-control-sm bg-white w-100 ' + (errors.district && touched.district ? ' is-invalid' : '')} placeholder="" disabled={true} />
                                <ErrorMessage name="district" component="div" className="invalid-feedback" />
                              </div>
                            </div>
                            <div className='col-6'>
                              <div className="form-group mb-1 w-100">
                                <label htmlFor="country" className="mb-1">Country:</label>
                                <Field name="country" as="select" className={'form-control w-100 form-control-sm custom-select bg-white common-select-deep-blue w-100' + (errors.country && touched.country ? ' is-invalid' : '')} id="country" disabled={viewMood} >

                                  <option selected>India</option>

                                </Field>
                                <ErrorMessage name="country" component="div" className="invalid-feedback" />
                              </div>
                            </div>
                          </div>




                          <div className="col-12">
                            <div className="form-group mb-1 ">
                              <label htmlFor="staticEmail" className="mb-1">Landmark:</label>
                              <Field name="landmark" type="text" className={'form-control form-control-sm bg-white' + (errors.landmark && touched.landmark ? ' is-invalid' : '')} placeholder="Enter Landmark" readOnly={viewMood} />
                              <ErrorMessage name="landmark" component="div" className="invalid-feedback" />
                            </div>
                          </div>


                          <div className="col-12">
                            <div className="form-group mb-1">
                              <label htmlFor="staticEmail" className="mb-1"> 	Alternate Email:</label>
                              <Field name="altEmail" type="email" className={'form-control form-control-sm bg-white' + (errors.altEmail && touched.altEmail ? ' is-invalid' : '')} placeholder="Enter Alternate Email" readOnly={viewMood} />
                              <ErrorMessage name="altEmail" component="div" className="invalid-feedback" />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group mb-1">
                              <label htmlFor="staticEmail" className="mb-1">Address 1:</label>
                              <Field
                                name="addressOne"
                                type="text" className={'form-control form-control-sm bg-white' + (errors.addressOne && touched.addressOne ? ' is-invalid' : '')} placeholder="Enter Address" readOnly={viewMood} />
                              <ErrorMessage name="addressOne" component="div" className="invalid-feedback" />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group mb-1 ">
                              <label htmlFor="staticEmail" className="mb-1"> 	Address 2:</label>
                              <Field name="addressTwo" type="text" className={'form-control form-control-sm bg-white' + (errors.addressTwo && touched.addressTwo ? ' is-invalid' : '')} placeholder="Enter Address" readOnly={viewMood} />
                              <ErrorMessage name="addressTwo" component="div" className="invalid-feedback" />
                            </div>
                          </div>
                        </div>
                      </div>



                      {/* <div className="col-xl-6 px-0">
                        <div className="form-group col-12 mb-1  mt-2">
                          <label htmlFor="staticEmail" className="mb-1 px-2">Company Name</label>
                          <Field name="companyName" className={'form-control form-control-sm bg-white px-4' + (errors.companyName && touched.companyName ? ' is-invalid' : '')} placeholder="Enter Company Name" readOnly={viewMood} />
                          <ErrorMessage name="companyName" component="div" className="invalid-feedback" />
                        </div>
                      </div> */}

                      {/* <div className="col-xl-6 px-0">
                        <div className="form-group col-12 mb-1  mt-2">
                          <label htmlFor="staticEmail" className="mb-1 px-2">Warehouse Name:</label>
                          <Field name="warehouseName" className={'form-control form-control-sm bg-white px-4' + (errors.warehouseName && touched.warehouseName ? ' is-invalid' : '')} placeholder="Enter Warehouse Name" readOnly={viewMood} />
                          <ErrorMessage name="warehouseName" component="div" className="invalid-feedback" />
                        </div>
                      </div> */}

                      {/* <div className="col-xl-6 px-0">
                        <div className="form-group col-12 mb-1  mt-2">
                          <label htmlFor="staticEmail" className="mb-1 px-2">Mobile No.:</label>
                          <Field
                            name="mobileNumber"
                            type="number"
                            className={'form-control form-control-sm bg-white px-4' + (errors.mobileNumber && touched.mobileNumber ? ' is-invalid' : '')}
                            placeholder="Enter Mobile No."
                            maxLength="10"
                            onInput={maxLengthCheck}
                            onKeyDown={(e) =>
                              /[+\-.,]$/.test(e.key) && e.preventDefault()}
                            readOnly={viewMood}
                          />
                          <ErrorMessage name="mobileNumber" component="div" className="invalid-feedback" />
                        </div>
                      </div> */}
                      {/* <div className="col-xl-6 px-0">
                        <div className="form-group col-12 mb-1  mt-2">
                          <label htmlFor="staticEmail" className="mb-1 px-2">Alternate Mobile:</label>
                          <Field
                            name="altMobileNumber"
                            type="number"
                            className={'form-control form-control-sm bg-white px-4' + (errors.altMobileNumber && touched.altMobileNumber ? ' is-invalid' : '')}
                            placeholder="Enter Alternate Mobile"
                            maxLength="10"
                            onInput={maxLengthCheck}
                            onKeyDown={(e) =>
                              /[+\-.,]$/.test(e.key) && e.preventDefault()}
                            readOnly={viewMood}
                          />
                          <ErrorMessage name="altMobileNumber" component="div" className="invalid-feedback" />
                        </div>
                      </div> */}
                      {/* <div className="col-xl-6 px-0">
                        <div className="form-group col-12 mb-1  mt-2">
                          <label htmlFor="staticEmail" className="mb-1 px-2">Email:</label>
                          <Field name="email" type="text" className={'form-control form-control-sm bg-white px-4' + (errors.email && touched.email ? ' is-invalid' : '')} placeholder="Enter Email" readOnly={viewMood} />
                          <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                      </div> */}
                      {/* <div className="col-xl-6 px-0">
                        <div className="form-group col-12 mb-1  mt-2">
                          <label htmlFor="staticEmail" className="mb-1 px-2"> 	Alternate Email:</label>
                          <Field name="altEmail" type="email" className={'form-control form-control-sm bg-white px-4' + (errors.altEmail && touched.altEmail ? ' is-invalid' : '')} placeholder="Enter Alternate Email" readOnly={viewMood} />
                          <ErrorMessage name="altEmail" component="div" className="invalid-feedback" />
                        </div>
                      </div> */}
                      {/* <div className="col-xl-6 px-0">
                        <div className="form-group col-12 mb-1  mt-2">
                          <label htmlFor="staticEmail" className="mb-1 px-2">Address 1:</label>
                          <Field
                            name="addressOne"
                            type="text" className={'form-control form-control-sm bg-white px-4' + (errors.addressOne && touched.addressOne ? ' is-invalid' : '')} placeholder="Enter Address" readOnly={viewMood} />
                          <ErrorMessage name="addressOne" component="div" className="invalid-feedback" />
                        </div>
                      </div> */}
                      {/* <div className="col-xl-6 px-0">
                        <div className="form-group col-12 mb-1  mt-2">
                          <label htmlFor="staticEmail" className="mb-1 px-2"> 	Address 2:</label>
                          <Field name="addressTwo" type="text" className={'form-control form-control-sm bg-white px-4' + (errors.addressTwo && touched.addressTwo ? ' is-invalid' : '')} placeholder="Enter Address" readOnly={viewMood} />
                          <ErrorMessage name="addressTwo" component="div" className="invalid-feedback" />
                        </div>
                      </div> */}
                      {/* <div className="col-xl-6 px-0">
                        <div className="form-group col-12 mb-1  mt-2">
                          <label htmlFor="country" className="mb-1 px-2">Country:</label><br />
                          <Field name="country" as="select" className={'form-control form-control-sm custom-select bg-white px-4 common-select-deep-blue w-100' + (errors.country && touched.country ? ' is-invalid' : '')} id="country" disabled={viewMood} >

                            <option selected>India</option>

                          </Field>
                          <ErrorMessage name="country" component="div" className="invalid-feedback" />
                        </div>
                      </div> */}
                      {/* <div className="col-xl-6 px-0">
                        <div className="form-group col-12 mb-1  mt-2">
                          <label htmlFor="state" className="mb-1 px-2">State:</label><br />

                          <Field
                            name="state"
                            //  as="select" 
                            type="text"
                            className={'form-control form-control-sm bg-white px-4' + (errors.state && touched.state ? ' is-invalid' : '')} id="state" disabled={true} >

                          </Field>
                          <ErrorMessage name="state" component="div" className="invalid-feedback" />
                        </div>
                      </div> */}
                      {/* <div className="col-xl-6 px-0">
                        <div className="form-group col-12 mb-1  mt-2">
                          <label htmlFor="city" className="mb-1 px-2"> 	City:</label><br />
                          <Field name="city"
                            //  as="select"
                            type="text"
                            className={'form-control form-control-sm bg-white px-4' + (errors.city && touched.city ? ' is-invalid' : '')} id="city" disabled={viewMood} >

                          </Field>
                          <ErrorMessage name="city" component="div" className="invalid-feedback" />
                        </div>
                      </div> */}
                      {/* <div className="col-xl-6 px-0">
                        <div className="form-group col-12 mb-1  mt-2">
                          <label htmlFor="staticEmail" className="mb-1 px-2">District:</label>
                          <Field name="district" type="text" className={'form-control form-control-sm bg-white px-4' + (errors.district && touched.district ? ' is-invalid' : '')} placeholder="" disabled={true} />
                          <ErrorMessage name="district" component="div" className="invalid-feedback" />
                        </div>
                      </div> */}
                      {/* <div className="col-xl-6 px-0">
                        <div className="form-group col-12 mb-1  mt-2">
                          <label htmlFor="staticEmail" className="mb-1 px-2">Landmark:</label>
                          <Field name="landmark" type="text" className={'form-control form-control-sm bg-white px-4' + (errors.landmark && touched.landmark ? ' is-invalid' : '')} placeholder="Enter Landmark" readOnly={viewMood} />
                          <ErrorMessage name="landmark" component="div" className="invalid-feedback" />
                        </div>
                      </div> */}
                      {/* <div className="col-xl-6 px-0">
                        <div className="form-group col-12 mb-1  mt-2">
                          <label htmlFor="staticEmail" className="mb-1 px-2">Pincode:</label>
                          <Field
                            name="pincode"
                            type="number"
                            className={'form-control form-control-sm bg-white px-4' + (errors.pincode && touched.pincode ? ' is-invalid' : '')}
                            placeholder="Enter Pincode"

                            onChange={(e) => {
                              let data = pinCodeChange(e.target.value)
                              setFieldValue("pincode", parseInt((e.target.value)))
                              if (data) {
                                setFieldValue("state", data.stateName)
                                setFieldValue("district", data.districtName)
                              }
                            }}
                            maxLength="6"
                            onInput={maxLengthCheck}
                            onKeyDown={(e) =>
                              /[+\-.,]$/.test(e.key) && e.preventDefault()}
                            readOnly={viewMood}
                          />
                          <ErrorMessage name="pincode" component="div" className="invalid-feedback" />
                        </div>
                      </div> */}

                      <div className="col-xl-6 px-0 mb-3">
                        <div className="form-group col-12 mb-1  mt-2">
                          <label htmlFor="staticEmail" className="mb-1 px-2">Warehouse GPS Location -  latitude </label>
                          <Field name="gpsLatitude" type="number" className={'form-control form-control-sm bg-white px-4' + (errors.gpsLatitude && touched.gpsLatitude ? ' is-invalid' : '')} placeholder="Warehouse GPS Location -  latitude " readOnly />
                          <ErrorMessage name="gpsLatitude" component="div" className="invalid-feedback" />
                        </div>
                      </div>
                      <div className="col-xl-6 px-0 mb-3">
                        <div className="form-group col-12 mb-1  mt-2">
                          <label htmlFor="staticEmail" className="mb-1 px-2">Warehouse GPS Location -  longitude</label>
                          <Field name="gpsLongitude" type="number" className={'form-control form-control-sm bg-white px-4' + (errors.gpsLongitude && touched.gpsLongitude ? ' is-invalid' : '')} placeholder="Warehouse GPS Location -  longitude" readOnly />
                          <ErrorMessage name="gpsLongitude" component="div" className="invalid-feedback" />

                        </div>
                      </div>
                      <div className="col-12">
                        <div style={{ width: '100%' }}>
                          <div style={{ width: '100%', height: '200px' }}>
                            {!errors.gpsLatitude && !errors.gpsLongitude && !viewMood ? (
                              <Maps
                                lat={parseFloat(values.gpsLatitude)}
                                lng={parseFloat(values.gpsLongitude)}
                                latName="gpsLatitude"
                                lngName="gpsLongitude"
                              />) : null}

                            {!errors.gpsLatitude && !errors.gpsLongitude && viewMood ? (
                              <ShowMap
                                lat={parseFloat(values.gpsLatitude)}
                                lng={parseFloat(values.gpsLongitude)}
                                latName="gpsLatitude"
                                lngName="gpsLongitude"
                              />) : null}
                            {/* <iframe title="GPS" width="100%" height="200" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=200&amp;hl=en&amp;q=escale%20solution+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe> */}
                          </div>
                        </div>
                      </div>
                      <div className={`col-12 mt-5 ${viewMood ? "d-none" : ""}`}>
                        <div className="row justify-content-end">
                          {/* <div className="col-auto"> */}
                          {/* <button type="button" className="btn btn-outline-deep-blue add-class remove-class" data-add-target=".steps2" data-add-target-classname="d-none" data-remove-target=".steps1" data-remove-target-class="d-none">Back</button> */}
                          {/* </div> */}
                          {console.log("kkkkk", Object.keys(errors).length)}
                        {console.log("kkkkk", Object.keys(errors))}
                          {Object.keys(errors).length !== 0 ? <FormErrorCard message="Fill All Required Fields" /> : null}
                          {data.isError !== "" ? <FormErrorCard message={data.isError} /> : null}
                          <div className="col-auto">
                            <button type="submit"  className="btn btn-deep-primary add-class remove-class px-5">Save
                              {data.isPending ? <Spinner animation="border" /> : null}</button>
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
  )
}

export default UpdateContactDetailForm
