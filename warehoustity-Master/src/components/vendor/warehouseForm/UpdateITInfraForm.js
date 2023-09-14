import React, { useState, useEffect } from 'react';
import { updateItInfra, changeWarehouseStatus } from '../../../store/actions/vendor/warehouseList';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import FormSuccess from '../../helper/FormSuccess';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ErrorCard, { FormErrorCard } from '../../helper/ErrorCard';
import { CardLoader } from '../../helper/CustomLoader';
import { maxLengthCheck, onlyNumberAllow } from '../../validation';


const UpdateITInfraForm = ({ viewMood, warehouseId }) => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.WAREHOUSELIST);

  // Only for Disable and enable

  const [yesForm, setYesForm] = useState({
    desktopYes: false,
    printerYes: false,
    printerMultiFunctionYes: false,
    upsYes: false,
    scannerYes: false,
    broadbandYes: false,
    landlineYes: false,
    wmsYes: false,
    airConditionerYes: false,
    workStationsYes: false,
    tablesYes: false,
    cabinsYes: false,
    meetingRoomsYes: false,
    recordRoomsYes: false,
    strongRoomsYes: false,
    guardOfficeYes: false,
  })

  const {
    desktopYes,
    printerYes,
    printerMultiFunctionYes,
    upsYes,
    scannerYes,
    broadbandYes,
    landlineYes,
    wmsYes,
    airConditionerYes,
    workStationsYes,
    tablesYes,
    cabinsYes,
    meetingRoomsYes,
    recordRoomsYes,
    strongRoomsYes,
    guardOfficeYes,
  } = yesForm;

  const handleChange = (e) => {
    setYesForm({ ...yesForm, [e.target.name]: e.target.value === "true" });
    

  }
  console.log("sss",yesForm)

  const [itInfra, setItInfra] = useState({
    desktop: "",
    printer: "",
    printerMultiFunction: "",
    ups: "",
    broadband: "",
    scanner: "",
    landline: "",
    wms: "",
    others: "",
    area: "",
    airConditioner: "",
    workStations: "",
    tables: "",
    chairs: 500,
    cabins: "",
    meetingRooms: "",
    recordRooms: "",
    strongRooms: "",
    guardOffice: "",
    electricLoad: "",
    others2: ""

  })

  useEffect(() => {



    if (data.singleFormData.itInfraAndOfficeSpaceInfo !== null && data.singleFormData.itInfraAndOfficeSpaceInfo !== undefined) {
      let officeInfo = data.singleFormData.itInfraAndOfficeSpaceInfo.officeSpace
      let officeItInfo = data.singleFormData.itInfraAndOfficeSpaceInfo.itInfra

      setItInfra(
        {
          desktop: officeItInfo ? officeItInfo.desktop : "",
          printer: officeItInfo ? officeItInfo.printer : "",
          printerMultiFunction: officeItInfo ? officeItInfo.printerMultifunction : "",
          ups: officeItInfo ? officeItInfo.upsAndInverter : "",
          broadband: officeItInfo ? officeItInfo.broadBand : "",
          scanner: officeItInfo ? officeItInfo.scanner : "",
          landline: officeItInfo ? officeItInfo.telephone : "",
          wms: officeItInfo ? officeItInfo.wms : "",
          others: officeItInfo ? officeItInfo.others : "",
          area: officeInfo ? officeInfo.area : "",
          airConditioner: officeInfo ? officeInfo.airConditioner : "",
          workStations: officeInfo ? officeInfo.workStations : "",
          tables: officeInfo ? officeInfo.tables : "",
          cabins: officeInfo ? officeInfo.cabins : "",
          chairs: 500,
          meetingRooms: officeInfo ? officeInfo.meetingRooms : "",
          recordRooms: officeInfo ? officeInfo.recordRooms : "",
          strongRooms: officeInfo ? officeInfo.strongRooms : "",
          guardOffice: officeInfo ? officeInfo.securityGuardOfficeTable : "",
          electricLoad: officeInfo ? officeInfo.electricLoad : "",
          others2: officeInfo ? officeInfo.others : ""
        })

      setYesForm({
        desktopYes: officeItInfo && officeItInfo.desktop ? true : false,
        printerYes: officeItInfo && officeItInfo.printer ? true : false,
        printerMultiFunctionYes: officeItInfo && officeItInfo.printerMultifunction ? true : false,
        upsYes: officeItInfo && officeItInfo.upsAndInverter ? true : false,
        scannerYes: officeItInfo && officeItInfo.scanner ? true : false,
        broadbandYes: officeItInfo && officeItInfo.broadBand ? true : false,
        landlineYes: officeItInfo && officeItInfo.telephone ? true : false,
        wmsYes: officeItInfo && officeItInfo.wms ? true : false,
        airConditionerYes: officeInfo && officeInfo.airConditioner ? true : false,
        workStationsYes: officeInfo && officeInfo.workStations ? true : false,
        tablesYes: officeInfo && officeInfo.tables ? true : false,
        cabinsYes: officeInfo && officeInfo.cabins ? true : false,
        meetingRoomsYes: officeInfo && officeInfo.meetingRooms ? true : false,
        recordRoomsYes: officeInfo && officeInfo.recordRooms ? true : false,
        strongRoomsYes: officeInfo && officeInfo.strongRooms ? true : false,
        guardOfficeYes: officeInfo && officeInfo.securityGuardOfficeTable ? true : false,
      })


    }
  }, [data.singleFormData.itInfraAndOfficeSpaceInfo])


  const InfraSchema = Yup.object().shape({

    desktop: Yup.lazy(() => {
      if (desktopYes) {
        return Yup.number()

      }
      return Yup.mixed().notRequired();
    }),

    printer: Yup.lazy(() => {
      if (printerYes) {
        return Yup.number()
      }
      return Yup.mixed().notRequired();
    }),

    printerMultiFunction: Yup.lazy(() => {
      if (printerMultiFunctionYes) {
        return Yup.number()
      }
      return Yup.mixed().notRequired();
    }),

    ups: Yup.lazy(() => {
      if (upsYes) {
        return Yup.number()
      }
      return Yup.mixed().notRequired();
    }),

    broadband: Yup.lazy(() => {
      if (broadbandYes) {
        return Yup.number()
      }
      return Yup.mixed().notRequired();
    }),

    scanner: Yup.lazy(() => {
      if (scannerYes) {
        return Yup.number()
      }
      return Yup.mixed().notRequired();
    }),

    landline: Yup.lazy(() => {
      if (landlineYes) {
        return Yup.number()
      }
      return Yup.mixed().notRequired();
    }),

    wms: Yup.lazy(() => {
      if (wmsYes) {
        console.log("hi");
        return  Yup.string().matches(/^[\w .,!?()]+$/, 'Please enter valid')
                            .required('Input is required')
      }
      else{
      return Yup.mixed().notRequired();
      }
    }),

    others: Yup.lazy(() => {
      return Yup.string().matches(/^[\w .,!?()]+$/, 'Please enter valid')
    }),
    area: Yup.lazy(() => {
      return Yup.number()
    }),

    airConditioner: Yup.lazy(() => {
      if (airConditionerYes) {
        return Yup.number()
      }
      return Yup.mixed().notRequired();
    }),

    workStations: Yup.lazy(() => {
      if (workStationsYes) {
        return Yup.number()
      }
      return Yup.mixed().notRequired();
    }),

    tables: Yup.lazy(() => {
      if (tablesYes) {
        return Yup.number()
      }
      return Yup.mixed().notRequired();
    }),

    cabins: Yup.lazy(() => {
      if (cabinsYes) {
        return Yup.number()
      }
      return Yup.mixed().notRequired();
    }),

    meetingRooms: Yup.lazy(() => {
      if (meetingRoomsYes) {
        return Yup.number()
      }
      return Yup.mixed().notRequired();
    }),

    recordRooms: Yup.lazy(() => {
      if (recordRoomsYes) {
        return Yup.number()
      }
      return Yup.mixed().notRequired();
    }),

    strongRooms: Yup.lazy(() => {
      if (strongRoomsYes) {
        return Yup.number()
      }
      return Yup.mixed().notRequired();
    }),

    guardOffice: Yup.lazy(() => {
      if (guardOfficeYes) {
        return Yup.number()
      }
      return Yup.mixed().notRequired();
    }),

    electricLoad: Yup.lazy(() => {
      return Yup.string().matches(/^[\w .,!?()]+$/, 'Please enter valid')
    }),

    others2: Yup.lazy(() => {
      return Yup.string().matches(/^[\w .,!?()]+$/, 'Please enter valid')
    })

  });



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

          <div className="row align-items-center pb-3 px-3 mx-0">
            <div className="col-12">

              <Formik
                enableReinitialize={true}
                initialValues={

                  itInfra

                }
                validationSchema={InfraSchema}
                onSubmit={fields => {

                  let itSpace = {
                    "itInfra": {
                      "desktop": desktopYes ? fields.desktop : "",
                      "printer": printerYes ? fields.printer : "",
                      "printerMultifunction": printerMultiFunctionYes ? fields.printerMultiFunction : "",
                      "upsAndInverter": upsYes ? fields.ups : "",
                      "broadBand": broadbandYes ? fields.broadband : "",
                      "scanner": scannerYes ? fields.scanner : "",
                      "telephone": landlineYes ? fields.landline : "",
                      "wms": wmsYes ? fields.wms : "",
                      "others": fields.others
                    },

                    "officeSpace": {
                      "area": fields.area,
                      "airConditioner": airConditionerYes ? fields.airConditioner : "",
                      "workStations": workStationsYes ? fields.workStations : "",
                      "chairs": fields.chairs,
                      "cabins": cabinsYes ? fields.cabins : "",
                      "tables": tablesYes ? fields.tables : "",
                      "meetingRooms": meetingRoomsYes ? fields.meetingRooms : "",
                      "recordRooms": recordRoomsYes ? fields.recordRooms : "",
                      "strongRooms": strongRoomsYes ? fields.strongRooms : "",
                      "securityGuardOfficeTable": guardOfficeYes ? fields.guardOffice : "",
                      "electricLoad": fields.electricLoad,
                      "others": fields.others2
                    },
                    "warehouse": warehouseId
                  }

                  dispatch(updateItInfra(itSpace));
                }}

                render={({ errors, status, onChange, touched }) => {

                  const fieldClass = (fieldName, isYes) => {
                    return 'form-control form-control-sm bg-white px-4' + (isYes ? errors[fieldName] && touched[fieldName] ? ' is-invalid' : '' : '')
                  }

                  return (
                    <Form>
                      <div className="row bg-white rounded mx-0 col-xxxl-11">
                        <div className="col-12 px-0">
                        <h5 className="pb-1 mb-3 border-bottom">IT Infra</h5></div>
                        <div className="col-12 border-0 border-bottom-0 table-responsive table-collapse">
                          <table className="table customTable">
                            <tbody>
                              <tr className='border'>
                                <td className="col-auto py-1">
                                  <p className="mb-0">Desktop:</p>
                                </td>
                                <td className="col-auto form-inline form-group form-inline border-0 mb-0 mt-2">
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} value={true} name="desktopYes" checked={desktopYes} className="common-radio-deep-blue-input" type="radio" id="desktopOption" hidden disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="desktopOption">Yes</label>
                                  </div>
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} value={false} name="desktopYes" checked={!desktopYes} className="common-radio-deep-blue-input" type="radio" id="desktopOption2" hidden disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="desktopOption2">No</label>
                                  </div>
                                </td>
                                <td className="col-auto py-1">
                                  <p className="my-0">Qty:</p>
                                </td>
                                <td className="py-1">
                                  <Field maxLength="5" onInput={maxLengthCheck} onKeyPress={(e) => onlyNumberAllow(e)} disabled={!desktopYes} name="desktop" type="number" className={fieldClass('desktop', desktopYes)} placeholder="" readOnly={viewMood} />
                                  <ErrorMessage name="desktop" component="div" className="invalid-feedback" />
                                </td>
                              </tr>
                              <tr className="border">
                                <td className="">
                                  <p className="mb-0 pb-1">Printer:</p>
                                </td>
                                <td className="col-auto form-inline form-group form-inline border-0 mb-0 mt-2">
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} value={true} name="printerYes" checked={printerYes} className="common-radio-deep-blue-input" type="radio" id="printerYes" hidden disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="printerYes">Yes</label>
                                  </div>
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} value={false} name="printerYes" checked={!printerYes} className="common-radio-deep-blue-input" type="radio" id="printerYes1" hidden disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="printerYes1">No</label>
                                  </div>
                                </td>
                                <td className="col-auto">
                                  <p className="my-0">Qty:</p>
                                </td>
                                <td className="">
                                  <Field maxLength="5" onInput={maxLengthCheck} onKeyPress={(e) => onlyNumberAllow(e)} disabled={!printerYes} name="printer" type="number" className={fieldClass('printer', printerYes)} placeholder="" readOnly={viewMood} />
                                  <ErrorMessage name="printer" component="div" className="invalid-feedback" />
                                </td>
                              </tr>
                              <tr className='border'>
                                <td className="">
                                  <p className="mb-0 pb-1">Printer (Multi Function):</p>
                                </td>
                                <td className="col-auto form-inline form-group form-inline border-0 mb-0 mt-2">
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} value={true} name="printerMultiFunctionYes" checked={printerMultiFunctionYes} className="common-radio-deep-blue-input" type="radio" id="printerMultiFunctionYes" hidden disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="printerMultiFunctionYes">Yes</label>
                                  </div>
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} value={false} name="printerMultiFunctionYes" checked={!printerMultiFunctionYes} className="common-radio-deep-blue-input" type="radio" id="printerMultiFunctionYes1" hidden disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="printerMultiFunctionYes1">No</label>
                                  </div>
                                </td>
                                <td className="col-auto">
                                  <p className="my-0">Qty:</p>
                                </td>
                                <td className="">
                                  <Field maxLength="5" onInput={maxLengthCheck} onKeyPress={(e) => onlyNumberAllow(e)} name="printerMultiFunction" type="number" disabled={!printerMultiFunctionYes} className={fieldClass('printerMultiFunction', printerMultiFunctionYes)} placeholder="" readOnly={viewMood} />
                                  <ErrorMessage name="printerMultiFunction" component="div" className="invalid-feedback" />
                                </td>
                              </tr>
                              <tr className="border">
                                <td className="">
                                  <p className="mb-0 pb-1">UPS / Inverter:</p>
                                </td>
                                <td className="col-auto form-inline form-group form-inline border-0 mb-0 mt-2">
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} value={true} name="upsYes" checked={upsYes} className="common-radio-deep-blue-input" type="radio" id="upsYes" hidden />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="upsYes">Yes</label>
                                  </div>
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} value={false} name="upsYes" checked={!upsYes} className="common-radio-deep-blue-input" type="radio" id="upsYes1" hidden />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="upsYes1">No</label>
                                  </div>
                                </td>
                                <td className="col-auto">
                                  <p className="my-0">Qty:</p>
                                </td>
                                <td className="">
                                  <Field maxLength="5" onInput={maxLengthCheck} onKeyPress={(e) => onlyNumberAllow(e)} name="ups" disabled={!upsYes} type="number" className={fieldClass('ups', upsYes)} placeholder="KVA" readOnly={viewMood} />
                                  <ErrorMessage name="ups" component="div" className="invalid-feedback" />
                                </td>
                              </tr>
                              <tr className='border'>
                                <td className="">
                                  <p className="mb-0 pb-1">Broadband:</p>
                                </td>
                                <td className="col-auto form-inline form-group form-inline border-0 mb-0 mt-2">
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} value={true} name="broadbandYes" checked={broadbandYes} className="common-radio-deep-blue-input" type="radio" id="broadbandYes" hidden disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="broadbandYes">Yes</label>
                                  </div>
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} value={false} name="broadbandYes" checked={!broadbandYes} className="common-radio-deep-blue-input" type="radio" id="broadbandYes1" hidden disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="broadbandYes1">No</label>
                                  </div>
                                </td>
                                <td className="col-auto">
                                  <p className="my-0">MBPS:</p>
                                </td>
                                <td className="">
                                  <Field maxLength="5" onInput={maxLengthCheck} onKeyPress={(e) => onlyNumberAllow(e)} name="broadband" type="number" disabled={!broadbandYes} className={fieldClass('broadband', broadbandYes)} placeholder="" readOnly={viewMood} />
                                  <ErrorMessage name="broadband" component="div" className="invalid-feedback" />
                                </td>
                              </tr>
                              <tr>
                                <td className="">
                                  <p className="mb-0 pb-1">Scanner:</p>
                                </td>
                                <td className="col-auto form-inline form-group form-inline border-0 mb-0 mt-2">
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} value={true} name="scannerYes" checked={scannerYes} className="common-radio-deep-blue-input" type="radio" id="scannerYes" hidden disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="scannerYes">Yes</label>
                                  </div>
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} value={false} name="scannerYes" checked={!scannerYes} className="common-radio-deep-blue-input" type="radio" id="scannerYes1" hidden disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="scannerYes1">No</label>
                                  </div>
                                </td>
                                <td className="col-auto">
                                  <p className="my-0">Qty:</p>
                                </td>
                                <td className="">
                                  <Field maxLength="5" onInput={maxLengthCheck} onKeyPress={(e) => onlyNumberAllow(e)} name="scanner" type="number" disabled={!scannerYes} className={fieldClass('scanner', scannerYes)} placeholder="" readOnly={viewMood} />
                                  <ErrorMessage name="scanner" component="div" className="invalid-feedback" />
                                </td>
                              </tr>
                              <tr className='border'>
                                <td className="">
                                  <p className="mb-0 pb-1">Telephone(Landline):</p>
                                </td>
                                <td className="col-auto form-inline form-group form-inline border-0 mb-0 mt-2">
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} value={true} name="landlineYes" checked={landlineYes} className="common-radio-deep-blue-input" type="radio" id="landlineYes" hidden disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="landlineYes">Yes</label>
                                  </div>
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} value={false} name="landlineYes" checked={!landlineYes} className="common-radio-deep-blue-input" type="radio" id="landlineYes1" hidden disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="landlineYes1">No</label>
                                  </div>
                                </td>
                                <td className="col-auto">
                                  <p className="my-0">Qty:</p>
                                </td>
                                <td className="">
                                  <Field maxLength="5" onInput={maxLengthCheck} onKeyPress={(e) => onlyNumberAllow(e)} type="number" name="landline" disabled={!landlineYes} className={fieldClass('landline', landlineYes)} placeholder="" readOnly={viewMood} />
                                  <ErrorMessage name="landline" component="div" className="invalid-feedback" />
                                </td>
                              </tr>
                              <tr>
                                <td className="">
                                  <p className="mb-0 pb-1">WMS:</p>
                                </td>
                                <td className="col-auto form-inline form-group form-inline border-0 mb-0 mt-2">
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} value={true} name="wmsYes" checked={wmsYes} className="common-radio-deep-blue-input" type="radio" id="wmsYes" hidden disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="wmsYes">Yes</label>
                                  </div>
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} value={false} name="wmsYes" checked={!wmsYes} className="common-radio-deep-blue-input" type="radio" id="wmsYes1" hidden disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="wmsYes1">No</label>
                                  </div>
                                </td>
                                <td className="" colSpan="2">
                                  <Field maxLength="15" onInput={maxLengthCheck} onKeyPress={(e) => onlyNumberAllow(e)} name="wms" disabled={!wmsYes} className={fieldClass('wms', wmsYes)} placeholder="Enter WMS Company" />
                                  <ErrorMessage name="wms" component="div" className="invalid-feedback" />
                                </td>
                              </tr>
                              <tr>
                                <td className="">
                                  <p className="my-0">Others:</p>
                                </td>
                                <td className="" colSpan="3">
                                  <Field as="textarea" name="others" className={'form-control bg-white px-4 rounded-sm' + (errors.others && touched.others ? ' is-invalid' : '')} placeholder="" rows="3" readOnly={viewMood} />
                                  <ErrorMessage name="others" component="div" className="invalid-feedback" />
                                </td>
                              </tr>
                            </tbody>

                          </table>
                        </div>
                      </div>
                      <div className="row bg-white rounded mx-0 col-xxxl-11">
                        <div className="col-12">
                        <h5 className="py-2 mb-3 border-bottom">Office Space</h5></div>
                        <div className="col-12 border-0 border-bottom-0 table-responsive table-collapse">
                          <table className="table customTable">
                            <tbody>
                              <tr>
                                <td className="">
                                  <p className="mb-0 pb-1">Area (sqft):</p>
                                </td>
                                <td className="" colSpan="3">
                                  <Field maxLength="5" onInput={maxLengthCheck} onKeyPress={(e) => onlyNumberAllow(e)} type="number" name="area" className={'form-control form-control-sm bg-white px-4' + (errors.area && touched.area ? ' is-invalid' : '')} placeholder="Enter Area" readOnly={viewMood} />
                                  <ErrorMessage name="area" component="div" className="invalid-feedback" />
                                </td>
                              </tr>
                              <tr>
                                <td className="">
                                  <p className="mb-0 pb-1">Air Conditioner:</p>
                                </td>
                                <td className="col-auto form-inline form-group form-inline border-0 mb-0 mt-2">
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} value={true} name="airConditionerYes" checked={airConditionerYes} className="common-radio-deep-blue-input" type="radio" id="airConditionerYes" hidden disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="airConditionerYes">Yes</label>
                                  </div>
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} value={false} name="airConditionerYes" checked={!airConditionerYes} className="common-radio-deep-blue-input" type="radio" id="airConditionerYes1" hidden disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="airConditionerYes1">No</label>
                                  </div>
                                </td>
                                <td className="col-auto">
                                  <p className="my-0">Qty:</p>
                                </td>
                                <td className="">
                                  <Field maxLength="5" onInput={maxLengthCheck} onKeyPress={(e) => onlyNumberAllow(e)} name="airConditioner" type="number" disabled={!airConditionerYes} className={fieldClass('airConditioner', airConditionerYes)} placeholder="" readOnly={viewMood} />
                                  <ErrorMessage name="airConditioner" component="div" className="invalid-feedback" />
                                </td>
                              </tr>
                              <tr>
                                <td className="">
                                  <p className="mb-0 pb-1">Work Stations:</p>
                                </td>
                                <td className="col-auto form-inline form-group form-inline border-0 mb-0 mt-2">
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} value={true} name="workStationsYes" checked={workStationsYes} className="common-radio-deep-blue-input" type="radio" id="workStationsYes" hidden disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="workStationsYes">Yes</label>
                                  </div>
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} value={false} name="workStationsYes" checked={!workStationsYes} className="common-radio-deep-blue-input" type="radio" id="workStationsYes1" hidden disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="workStationsYes1">No</label>
                                  </div>
                                </td>
                                <td className="col-auto">
                                  <p className="my-0">Qty:</p>
                                </td>
                                <td className="">
                                  <Field maxLength="5" onInput={maxLengthCheck} onKeyPress={(e) => onlyNumberAllow(e)} name="workStations" type="number" disabled={!workStationsYes} className={fieldClass('workStations', workStationsYes)} placeholder="" readOnly={viewMood} />
                                  <ErrorMessage name="workStations" component="div" className="invalid-feedback" />
                                </td>
                              </tr>
                              <tr>
                                <td className="">
                                  <p className="mb-0 pb-1">Tables:</p>
                                </td>
                                <td className="col-auto form-inline form-group form-inline border-0 mb-0 mt-2">
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} value={true} name="tablesYes" checked={tablesYes} className="common-radio-deep-blue-input" type="radio" id="tablesYes" hidden disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="tablesYes">Yes</label>
                                  </div>
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} value={false} name="tablesYes" checked={!tablesYes} className="common-radio-deep-blue-input" type="radio" id="tablesYes1" hidden disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="tablesYes1">No</label>
                                  </div>
                                </td>
                                <td className="col-auto">
                                  <p className="my-0">Qty:</p>
                                </td>
                                <td className="">
                                  <Field maxLength="5" onInput={maxLengthCheck} onKeyPress={(e) => onlyNumberAllow(e)} name="tables" type="number" disabled={!tablesYes} className={fieldClass('tables', tablesYes)} placeholder="" readOnly={viewMood} />
                                  <ErrorMessage name="tables" component="div" className="invalid-feedback" />
                                </td>
                              </tr>
                              <tr>
                                <td className="">
                                  <p className="mb-0 pb-1">Cabins:</p>
                                </td>
                                <td className="col-auto form-inline form-group form-inline border-0 mb-0 mt-2">
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} value={true} name="cabinsYes" checked={cabinsYes} className="common-radio-deep-blue-input" type="radio" id="cabinsYes" hidden disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="cabinsYes">Yes</label>
                                  </div>
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} value={false} name="cabinsYes" checked={!cabinsYes} className="common-radio-deep-blue-input" type="radio" id="cabinsYes1" hidden disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="cabinsYes1">No</label>
                                  </div>
                                </td>
                                <td className="col-auto">
                                  <p className="my-0">Qty:</p>
                                </td>
                                <td className="">
                                  <Field maxLength="5" onInput={maxLengthCheck} onKeyPress={(e) => onlyNumberAllow(e)} name="cabins" type="number" disabled={!cabinsYes} className={fieldClass('cabins', cabinsYes)} placeholder="" readOnly={viewMood} />
                                  <ErrorMessage name="cabins" component="div" className="invalid-feedback" />
                                </td>
                              </tr>
                              <tr>
                                <td className="">
                                  <p className="mb-0 pb-1">Meeting Rooms:</p>
                                </td>
                                <td className="col-auto form-inline form-group form-inline border-0 mb-0 mt-2">
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} value={true} name="meetingRoomsYes" checked={meetingRoomsYes} className="common-radio-deep-blue-input" type="radio" id="meetingRoomsYes" hidden disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="meetingRoomsYes">Yes</label>
                                  </div>
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} value={false} name="meetingRoomsYes" checked={!meetingRoomsYes} className="common-radio-deep-blue-input" type="radio" id="meetingRoomsYes1" hidden disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="meetingRoomsYes1">No</label>
                                  </div>
                                </td>
                                <td className="col-auto">
                                  <p className="my-0">Qty:</p>
                                </td>
                                <td className="">
                                  <Field maxLength="5" onInput={maxLengthCheck} onKeyPress={(e) => onlyNumberAllow(e)} name="meetingRooms" type="number" disabled={!meetingRoomsYes} className={fieldClass('meetingRooms', meetingRoomsYes)} placeholder="" readOnly={viewMood} />
                                  <ErrorMessage name="meetingRooms" component="div" className="invalid-feedback" />
                                </td>
                              </tr>
                              <tr>
                                <td className="">
                                  <p className="mb-0 pb-1">Record Rooms:</p>
                                </td>
                                <td className="col-auto form-inline form-group form-inline border-0 mb-0 mt-2">
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} value={true} name="recordRoomsYes" checked={recordRoomsYes} className="common-radio-deep-blue-input" type="radio" id="recordRoomsYes" hidden disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="recordRoomsYes">Yes</label>
                                  </div>
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} value={false} name="recordRoomsYes" checked={!recordRoomsYes} className="common-radio-deep-blue-input" type="radio" id="recordRoomsYes1" hidden disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="recordRoomsYes1">No</label>
                                  </div>
                                </td>
                                <td className="col-auto">
                                  <p className="my-0">Qty:</p>
                                </td>
                                <td className="">
                                  <Field maxLength="5" onInput={maxLengthCheck} onKeyPress={(e) => onlyNumberAllow(e)} name="recordRooms" type="number" disabled={!recordRoomsYes} className={fieldClass('recordRooms', recordRoomsYes)} placeholder="" readOnly={viewMood} />
                                  <ErrorMessage name="recordRooms" component="div" className="invalid-feedback" />
                                </td>
                              </tr>
                              <tr>
                                <td className="">
                                  <p className="mb-0 pb-1">Strong Rooms:</p>
                                </td>
                                <td className="col-auto form-inline form-group form-inline border-0 mb-0 mt-2">
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} value={true} name="strongRoomsYes" checked={strongRoomsYes} className="common-radio-deep-blue-input" type="radio" id="strongRoomsYes" hidden disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="strongRoomsYes">Yes</label>
                                  </div>
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} value={false} name="strongRoomsYes" checked={!strongRoomsYes} className="common-radio-deep-blue-input" type="radio" id="strongRoomsYes1" hidden disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="strongRoomsYes1">No</label>
                                  </div>
                                </td>
                                <td className="col-auto">
                                  <p className="my-0">Qty:</p>
                                </td>
                                <td className="">
                                  <Field maxLength="5" onInput={maxLengthCheck} onKeyPress={(e) => onlyNumberAllow(e)} name="strongRooms" type="number" disabled={!strongRoomsYes} className={fieldClass('strongRooms', strongRoomsYes)} placeholder="" readOnly={viewMood} />
                                  <ErrorMessage name="strongRooms" component="div" className="invalid-feedback" />
                                </td>
                              </tr>
                              <tr>
                                <td className="">
                                  <p className="mb-0 pb-1">Security Guard Office / Table:</p>
                                </td>
                                <td className="col-auto form-inline form-group form-inline border-0 mb-0 mt-2">
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} value={true} name="guardOfficeYes" checked={guardOfficeYes} className="common-radio-deep-blue-input" type="radio" id="guardOfficeYes" hidden disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="guardOfficeYes">Yes</label>
                                  </div>
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} value={false} name="guardOfficeYes" checked={!guardOfficeYes} className="common-radio-deep-blue-input" type="radio" id="guardOfficeYes1" hidden disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="guardOfficeYes1">No</label>
                                  </div>
                                </td>
                                <td className="col-auto">
                                  <p className="my-0">Qty:</p>
                                </td>
                                <td className="">
                                  <Field maxLength="5" onInput={maxLengthCheck} onKeyPress={(e) => onlyNumberAllow(e)} name="guardOffice" type="number" disabled={!guardOfficeYes} className={fieldClass('guardOffice', guardOfficeYes)} placeholder="" readOnly={viewMood} />
                                  <ErrorMessage name="guardOffice" component="div" className="invalid-feedback" />
                                </td>
                              </tr>
                              <tr>
                                <td className="">
                                  <p className="mb-0 pb-1">Electric Load:</p>
                                </td>
                                <td className="" colSpan="2">
                                  <Field name="electricLoad" className={'form-control form-control-sm bg-white px-4' + (errors.electricLoad && touched.electricLoad ? ' is-invalid' : '')} placeholder="KVA" readOnly={viewMood} />
                                  <ErrorMessage name="electricLoad" component="div" className="invalid-feedback" />
                                </td>
                              </tr>
                              <tr>
                                <td className="">
                                  <p className="mb-0 pb-1">Others:</p>
                                </td>
                                <td className="" colSpan="3">
                                  <Field as="textarea" name="others2" className={'form-control bg-white px-4 rounded-sm' + (errors.others2 && touched.others2 ? ' is-invalid' : '')} placeholder="" rows="3" readOnly={viewMood} />
                                  <ErrorMessage name="area" component="div" className="invalid-feedback" />
                                </td>
                              </tr>
                            </tbody>

                          </table>
                        </div>

                        <div className={`col-12 mt-2 ${viewMood ? 'd-none' : ""}`}>
                          <div className="row justify-content-end">
                            {Object.keys(errors).length !== 0 ? <FormErrorCard message="Fill All Required Fields" /> : null}
                            {data.isError !== "" ? <FormErrorCard message={data.isError} /> : null}
                            {/* <div className="col-auto"> */}
                            {/* <button type="button" className="btn btn-outline-deep-blue add-className remove-class" data-add-target=".steps4" data-add-target-="d-none" data-remove-target=".steps3" data-remove-target-class="d-none">Back</button> */}
                            {/* </div> */}
                            <div className="col-auto">
                              <button type="submit"  className="btn btn-deep-primary add-className remove-class px-5">Save
                                {data.isPending ? <Spinner animation="border" /> : null}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Form>
                  )
                }}

              />
            </div>
          </div>

        </>)
      }
    </>
  )
}

export default UpdateITInfraForm
