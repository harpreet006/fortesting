import React, {useState} from 'react';
// import {updateWarehouseContact, changeWarehouseStatus} from '../../../store/actions/vendor/warehouseList';
// import {useDispatch, useSelector} from 'react-redux';
// import Spinner from 'react-bootstrap/Spinner';
// import FormSuccess from '../../helper/FormSuccess';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const ITInfraForm = () => {

  // Only for Disable and enable

  const [yesForm, setYesForm] = useState({
      desktopYes : true,
      printerYes : true,
      printerMultiFunctionYes : true,
      upsYes : true,
      scannerYes : true,
      broadbandYes : true,
      landlineYes : true,
      wmsYes : true,
      airConditionerYes : true,
      workStationsYes : true,
      tablesYes : true,
      cabinsYes : true,
      meetingRoomsYes : true,
      recordRoomsYes : true,
      strongRoomsYes : true,
      guardOfficeYes : true,
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
  
  const handleChange = (e) =>{
    setYesForm({...yesForm, [e.target.name]:e.target.value==="true"});
  
  }
  // console.log("yesForm:====>", yesForm);

 
  
    const InfraSchema = Yup.object().shape({

      desktop: Yup.lazy(() =>{
        if(desktopYes){
          return Yup.string().required('Required') 
        }
        return Yup.mixed().notRequired(); 
      }),

      printer: Yup.lazy(() =>{
        if(printerYes){
          return Yup.string().required('Required') 
        }
        return Yup.mixed().notRequired();  
      }),

      printerMultiFunction: Yup.lazy(() =>{
        if(printerMultiFunctionYes){
          return Yup.string().required('Required') 
        }
        return Yup.mixed().notRequired(); 
      }),
  
      ups: Yup.lazy(() =>{
        if(upsYes){
          return Yup.string().required('Required') 
        }
        return Yup.mixed().notRequired();  
      }),

      broadband: Yup.lazy(() =>{
         if(broadbandYes){
          return Yup.string().required('Required') 
        }
        return Yup.mixed().notRequired();  
      }),

      scanner: Yup.lazy(() =>{
         if(scannerYes){
          return Yup.string().required('Required') 
        }
        return Yup.mixed().notRequired(); 
      }),

      landline: Yup.lazy(() =>{
         if(landlineYes){
          return Yup.string().required('Required') 
        }
        return Yup.mixed().notRequired();  
      }),

      wms: Yup.lazy(() =>{
         if(wmsYes){
          return Yup.string().required('Required') 
        }
        return Yup.mixed().notRequired();  
      }),

      others: Yup.lazy(() =>{
        return Yup.string().required('Required') 
      }),
      area: Yup.lazy(() =>{
        return Yup.string().required('Required') 
      }),

      airConditioner: Yup.lazy(() =>{
         if(airConditionerYes){
          return Yup.string().required('Required') 
        }
        return Yup.mixed().notRequired();  
      }),

      workStations: Yup.lazy(() =>{
        if(workStationsYes){
          return Yup.string().required('Required') 
        }
        return Yup.mixed().notRequired();  
      }),

      tables: Yup.lazy(() =>{
         if(tablesYes){
          return Yup.string().required('Required') 
        }
        return Yup.mixed().notRequired();  
      }),

      cabins: Yup.lazy(() =>{
         if(cabinsYes){
          return Yup.string().required('Required') 
        }
        return Yup.mixed().notRequired();  
      }),

      meetingRooms: Yup.lazy(() =>{
         if(meetingRoomsYes){
          return Yup.string().required('Required') 
        }
        return Yup.mixed().notRequired();  
      }),

      recordRooms: Yup.lazy(() =>{
         if(recordRoomsYes){
          return Yup.string().required('Required') 
        }
        return Yup.mixed().notRequired();  
      }),

      strongRooms: Yup.lazy(() =>{
         if(strongRoomsYes){
          return Yup.string().required('Required') 
        }
        return Yup.mixed().notRequired(); 
      }),

      guardOffice: Yup.lazy(() =>{
         if(guardOfficeYes){
          return Yup.string().required('Required') 
        }
        return Yup.mixed().notRequired(); 
      }),

      electricLoad: Yup.lazy(() =>{
          return Yup.string().required('Required') 
      }),

      others2: Yup.lazy(() =>{
          return Yup.string().required('Required') 
      })
    
      });



    return (
        <>

      
          <div className="row align-items-center pb-3 px-3 mx-0"> 
            <div className="col-12">

            <Formik
            enableReinitialize={true}
              initialValues={
                  
                {
            desktop:"",
            printer:"",
            printerMultiFunction:"",
            ups:"",
            broadband:"",
            scanner:"",
            landline:"",
            wms:"",
            others:"",
            area:"",
            airConditioner:"",
            workStations:"",
            tables:"",
            cabins:"",
            meetingRooms:"",
            recordRooms:"",
            strongRooms:"",
            guardOffice:"",
            electricLoad:"",
            others2:""

          }

              }
              validationSchema={InfraSchema}
              onSubmit={fields => {

                // console.log("---->", fields)
                let itInfraData ={
                  "desktop": desktopYes ? fields.desktop :"",
                  "printer": printerYes ? fields.printer : "",
                  "printerMultifunction": printerMultiFunctionYes ? fields.printerMultiFunction : "",
                  "upsAndInverter": upsYes ? fields.ups :"",
                  "broadBand": broadbandYes ? fields.broadband :"",
                  "scanner": scannerYes ? fields.scanner : "",
                  "telephone": landlineYes ? fields.landline : "",
                  "wms": wmsYes ? fields.wms : "",
                  "others": fields.others,
                  "warehouse":5
                }

                let officeInfra = {
                  "area": fields.area,
                  "airConditioner": airConditionerYes ? fields.airConditioner : "",
                  "workStations": workStationsYes ? fields.workStations : "",
                  "chairs": "",
                  "cabins": cabinsYes ? fields.cabins : "",
                  "tables": tablesYes ? fields.tables : "",
                  "meetingRooms": meetingRoomsYes ? fields.meetingRooms : "",
                  "recordRooms": recordRoomsYes ? fields.recordRooms : "",
                  "strongRooms": strongRoomsYes ? fields.strongRooms : "",
                  "securityGuardOfficeTable":guardOfficeYes ? fields.guardOffice : "",
                  "electricLoad": fields.electricLoad,
                  "others": fields.others2,
                  "warehouse":5
              }

                console.log("itInfraData==>", itInfraData);
                console.log("officeInfra==>", officeInfra);
              
            
              }}
              
              render={({  errors, status,onChange, touched }) =>{

                const fieldClass =(fieldName, isYes)=>{
                return 'form-control bg-white px-4 mb-2'+ (isYes ? errors[fieldName] && touched[fieldName] ? ' is-invalid' : '':'')
            }

                  return(
              <Form> 
                <div className="row bg-white rounded mx-0 col-xxxl-11">
                  <div className="col-12"><h5 className="pb-1 mb-3 border-bottom">IT Infra</h5></div>
                  <div className="col-12 border-0 border-bottom-0 table-responsive table-collapse">
                    <table className="table customTable"> 
                      <tbody> 
                        <tr>
                          <td className="col-auto">
                            <p className="mb-0 pb-2">Desktop:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-3 mt-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} value={true} name="desktopYes"  checked={desktopYes} className="common-radio-deep-blue-input" type="radio" id="desktopOption" hidden/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="desktopOption">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} value={false} name="desktopYes" checked={!desktopYes} className="common-radio-deep-blue-input" type="radio" id="desktopOption2" hidden/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="desktopOption2">No</label>
                            </div> 
                          </td>
                          <td className="col-auto mt-1">
                            <p className="">Qty:</p>
                          </td>
                          <td className="">
                            <Field disabled={!desktopYes} name="desktop" className={fieldClass('desktop', desktopYes)} placeholder=""/>
                            <ErrorMessage name="desktop" component="div" className="invalid-feedback" />
                          </td> 
                        </tr> 
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-1">Printer:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-3 mt-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} value={true} name="printerYes" checked={printerYes} className="common-radio-deep-blue-input" type="radio" id="printerYes" hidden/>
                              <label  className="common-radio-deep-blue-label pl-4" htmlFor="printerYes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} value={false} name="printerYes" checked={!printerYes} className="common-radio-deep-blue-input" type="radio" id="printerYes1" hidden/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="printerYes1">No</label>
                            </div> 
                          </td>
                          <td className="col-auto mt-1">
                            <p className="">Qty:</p>
                          </td>
                          <td className="">
                            <Field disabled={!printerYes} name="printer" className={fieldClass('printer',printerYes)} placeholder=""/>
                            <ErrorMessage name="printer" component="div" className="invalid-feedback" />
                          </td> 
                        </tr>
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-1">Printer (Multi Function):</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-3 mt-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} value={true} name="printerMultiFunctionYes" checked={printerMultiFunctionYes} className="common-radio-deep-blue-input" type="radio" id="printerMultiFunctionYes" hidden/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="printerMultiFunctionYes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} value={false}  name="printerMultiFunctionYes"  checked={!printerMultiFunctionYes} className="common-radio-deep-blue-input" type="radio" id="printerMultiFunctionYes1" hidden/>
                              <label  className="common-radio-deep-blue-label pl-4" htmlFor="printerMultiFunctionYes1">No</label>
                            </div> 
                          </td>
                          <td className="col-auto mt-1">
                            <p className="">Qty:</p>
                          </td>
                          <td className="">
                            <Field name="printerMultiFunction" disabled={!printerMultiFunctionYes} className={fieldClass('printerMultiFunction',printerMultiFunctionYes)} placeholder=""/>
                            <ErrorMessage name="printerMultiFunction" component="div" className="invalid-feedback" />
                          </td>  
                        </tr>
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-1">UPS / Inverter:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-3 mt-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} value={true}  name="upsYes"  checked={upsYes} className="common-radio-deep-blue-input" type="radio" id="upsYes" hidden/>
                              <label  className="common-radio-deep-blue-label pl-4" htmlFor="upsYes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} value={false}  name="upsYes"  checked={!upsYes} className="common-radio-deep-blue-input" type="radio" id="upsYes1" hidden/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="upsYes1">No</label>
                            </div> 
                          </td>
                          <td className="col-auto mt-1">
                            <p className="">Qty:</p>
                          </td>
                          <td className="">
                            <Field name="ups" disabled={!upsYes} className={fieldClass('ups', upsYes)} placeholder="KVA"/>
                            <ErrorMessage name="ups" component="div" className="invalid-feedback" />
                          </td> 
                        </tr>
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-1">Broadband:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-3 mt-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} value={true}  name="broadbandYes" checked={broadbandYes} className="common-radio-deep-blue-input" type="radio" id="broadbandYes" hidden/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="broadbandYes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} value={false}  name="broadbandYes" checked={!broadbandYes} className="common-radio-deep-blue-input" type="radio"  id="broadbandYes1" hidden/> 
                              <label  className="common-radio-deep-blue-label pl-4" htmlFor="broadbandYes1">No</label>
                            </div> 
                          </td>
                          <td className="col-auto mt-1">
                            <p className="">MBPS:</p>
                          </td>
                          <td className="">
                            <Field name="broadband" disabled={!broadbandYes} className={fieldClass('broadband', broadbandYes)} placeholder=""/>
                            <ErrorMessage name="broadband" component="div" className="invalid-feedback" />
                          </td>  
                        </tr>
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-1">Scanner:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-3 mt-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} value={true}  name="scannerYes" checked={scannerYes} className="common-radio-deep-blue-input" type="radio" id="scannerYes" hidden/>
                              <label  className="common-radio-deep-blue-label pl-4" htmlFor="scannerYes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} value={false}  name="scannerYes" checked={!scannerYes} className="common-radio-deep-blue-input" type="radio" id="scannerYes1" hidden/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="scannerYes1">No</label>
                            </div> 
                          </td>
                          <td className="col-auto mt-1">
                            <p className="">Qty:</p>
                          </td>
                          <td className="">
                            <Field name="scanner" disabled={!scannerYes} className={fieldClass('scanner', scannerYes)} placeholder=""/>
                            <ErrorMessage name="scanner" component="div" className="invalid-feedback" />
                          </td>  
                        </tr>
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-1">Telephone(Landline):</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-3 mt-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} value={true}  name="landlineYes" checked={landlineYes} className="common-radio-deep-blue-input" type="radio" id="landlineYes" hidden/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="landlineYes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} value={false}  name="landlineYes" checked={!landlineYes} className="common-radio-deep-blue-input" type="radio" id="landlineYes1" hidden/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="landlineYes1">No</label>
                            </div> 
                          </td>
                          <td className="col-auto mt-1">
                            <p className="">Qty:</p>
                          </td>
                          <td className="">
                            <Field type="number" name="landline" disabled={!landlineYes} className={fieldClass('landline', landlineYes)} placeholder=""/>
                            <ErrorMessage name="landline" component="div" className="invalid-feedback" />
                          </td>  
                        </tr>
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-1">WMS:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-3 mt-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} value={true}  name="wmsYes" checked={wmsYes} className="common-radio-deep-blue-input" type="radio"  id="wmsYes" hidden/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="wmsYes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} value={false}  name="wmsYes" checked={!wmsYes} className="common-radio-deep-blue-input" type="radio" id="wmsYes1" hidden/>
                              <label  className="common-radio-deep-blue-label pl-4" htmlFor="wmsYes1">No</label>
                            </div> 
                          </td> 
                          <td className="" colSpan="2">
                            <Field name="wms" disabled={!wmsYes} className={fieldClass('wms', wmsYes)} placeholder="Enter WMS Company"/>
                            <ErrorMessage name="wms" component="div" className="invalid-feedback" />
                          </td>  
                        </tr>
                        <tr>
                          <td className="">
                            <p className="mb-5 pb-1">Others:</p>
                          </td> 
                          <td className="" colSpan="3">
                            <Field as="textarea" name="others" className={'form-control bg-white px-4 rounded-sm'+ (errors.others && touched.others? ' is-invalid' : '')} placeholder="" rows="3"/>
                            <ErrorMessage name="others" component="div" className="invalid-feedback" />
                          </td>  
                        </tr>
                      </tbody>
                      
                    </table>
                  </div> 
                </div>
                <div className="row bg-white px-4 py-3 rounded mx-0 col-xxxl-11">
                  <div className="col-12"><h5 className="py-3 mb-3 border-bottom">Office Space</h5></div>
                  <div className="col-12 border-0 border-bottom-0 table-responsive table-collapse">
                    <table className="table customTable"> 
                      <tbody> 
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-1">Area (sqft):</p>
                          </td>  
                          <td className="" colSpan="3">
                            <Field type="text" name="area" className={'form-control bg-white px-4mb-2' + (errors.area && touched.area? ' is-invalid' : '')} placeholder="Enter Area"/>
                            <ErrorMessage name="area" component="div" className="invalid-feedback" />
                          </td> 
                        </tr>   
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-1">Air Conditioner:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-3 mt-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} value={true}  name="airConditionerYes" checked={airConditionerYes} className="common-radio-deep-blue-input" type="radio" id="airConditionerYes" hidden/>
                              <label  className="common-radio-deep-blue-label pl-4" htmlFor="airConditionerYes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} value={false}  name="airConditionerYes" checked={!airConditionerYes} className="common-radio-deep-blue-input" type="radio" id="airConditionerYes1" hidden/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="airConditionerYes1">No</label>
                            </div> 
                          </td>
                          <td className="col-auto mt-1">
                            <p className="">Qty:</p>
                          </td>
                          <td className="">
                            <Field name="airConditioner" disabled={!airConditionerYes} className={fieldClass('airConditioner', airConditionerYes)} placeholder=""/>
                            <ErrorMessage name="airConditioner" component="div" className="invalid-feedback" />
                          </td>   
                        </tr>
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-1">Work Stations:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-3 mt-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} value={true}  name="workStationsYes" checked={workStationsYes} className="common-radio-deep-blue-input" type="radio" id="workStationsYes" hidden/>
                              <label  className="common-radio-deep-blue-label pl-4" htmlFor="workStationsYes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} value={false}  name="workStationsYes" checked={!workStationsYes} className="common-radio-deep-blue-input" type="radio" id="workStationsYes1" hidden/>
                              <label  className="common-radio-deep-blue-label pl-4" htmlFor="workStationsYes1">No</label>
                            </div> 
                          </td>
                          <td className="col-auto mt-1">
                            <p className="">Qty:</p>
                          </td>
                          <td className="">
                            <Field name="workStations" disabled={!workStationsYes} className={fieldClass('workStations', workStationsYes)} placeholder=""/>
                            <ErrorMessage name="workStations" component="div" className="invalid-feedback" />
                          </td>   
                        </tr>
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-1">Tables:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-3 mt-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} value={true}  name="tablesYes" checked={tablesYes} className="common-radio-deep-blue-input" type="radio" id="tablesYes" hidden/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="tablesYes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} value={false}  name="tablesYes" checked={!tablesYes} className="common-radio-deep-blue-input" type="radio" id="tablesYes1" hidden/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="tablesYes1">No</label>
                            </div> 
                          </td>
                          <td className="col-auto mt-1">
                            <p className="">Qty:</p>
                          </td>
                          <td className="">
                            <Field  name="tables" disabled={!tablesYes} className={fieldClass('tables', tablesYes)} placeholder=""/>
                            <ErrorMessage name="tables" component="div" className="invalid-feedback" />
                          </td>   
                        </tr>
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-1">Cabins:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-3 mt-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} value={true}  name="cabinsYes" checked={cabinsYes} className="common-radio-deep-blue-input" type="radio" id="cabinsYes" hidden/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="cabinsYes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} value={false}  name="cabinsYes" checked={!cabinsYes} className="common-radio-deep-blue-input" type="radio" id="cabinsYes1" hidden/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="cabinsYes1">No</label>
                            </div> 
                          </td>
                          <td className="col-auto mt-1">
                            <p className="">Qty:</p>
                          </td>
                          <td className="">
                            <Field name="cabins" disabled={!cabinsYes} className={fieldClass('cabins', cabinsYes)} placeholder=""/>
                            <ErrorMessage name="cabins" component="div" className="invalid-feedback" />
                          </td>   
                        </tr>
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-1">Meeting Rooms:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-3 mt-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} value={true}  name="meetingRoomsYes" checked={meetingRoomsYes} className="common-radio-deep-blue-input" type="radio"  id="meetingRoomsYes"  hidden/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="meetingRoomsYes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} value={false}  name="meetingRoomsYes" checked={!meetingRoomsYes} className="common-radio-deep-blue-input" type="radio" id="meetingRoomsYes1" hidden/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="meetingRoomsYes1">No</label>
                            </div> 
                          </td>
                          <td className="col-auto mt-1">
                            <p className="">Qty:</p>
                          </td>
                          <td className="">
                            <Field name="meetingRooms" disabled={!meetingRoomsYes} className={fieldClass('meetingRooms', meetingRoomsYes)} placeholder=""/>
                            <ErrorMessage name="meetingRooms" component="div" className="invalid-feedback" />
                          </td>   
                        </tr>
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-1">Record Rooms:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-3 mt-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} value={true} name="recordRoomsYes" checked={recordRoomsYes} className="common-radio-deep-blue-input" type="radio" id="recordRoomsYes" hidden/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="recordRoomsYes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} value={false}  name="recordRoomsYes" checked={!recordRoomsYes} className="common-radio-deep-blue-input" type="radio" id="recordRoomsYes1" hidden/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="recordRoomsYes1">No</label>
                            </div> 
                          </td>
                          <td className="col-auto mt-1">
                            <p className="">Qty:</p>
                          </td>
                          <td className="">
                            <Field name="recordRooms" disabled={!recordRoomsYes} className={fieldClass('recordRooms', recordRoomsYes)} placeholder=""/>
                            <ErrorMessage name="recordRooms" component="div" className="invalid-feedback" />
                          </td>   
                        </tr> 
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-1">Strong Rooms:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-3 mt-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} value={true}  name="strongRoomsYes" checked={strongRoomsYes} className="common-radio-deep-blue-input" type="radio" id="strongRoomsYes" hidden/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="strongRoomsYes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} value={false}  name="strongRoomsYes" checked={!strongRoomsYes} className="common-radio-deep-blue-input" type="radio" id="strongRoomsYes1" hidden/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="strongRoomsYes1">No</label>
                            </div> 
                          </td>
                          <td className="col-auto mt-1">
                            <p className="">Qty:</p>
                          </td>
                          <td className="">
                            <Field name="strongRooms" disabled={!strongRoomsYes} className={fieldClass('strongRooms', strongRoomsYes)} placeholder=""/>
                            <ErrorMessage name="strongRooms" component="div" className="invalid-feedback" />
                          </td>   
                        </tr> 
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-1">Security Guard Office / Table:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-3 mt-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} value={true}  name="guardOfficeYes" checked={guardOfficeYes} className="common-radio-deep-blue-input" type="radio" id="guardOfficeYes" hidden/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="guardOfficeYes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} value={false}  name="guardOfficeYes" checked={!guardOfficeYes} className="common-radio-deep-blue-input" type="radio" id="guardOfficeYes1" hidden/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="guardOfficeYes1">No</label>
                            </div> 
                          </td>
                          <td className="col-auto mt-1">
                            <p className="">Qty:</p>
                          </td>
                          <td className="">
                            <Field name="guardOffice" disabled={!guardOfficeYes} className={fieldClass('guardOffice', guardOfficeYes)} placeholder=""/>
                            <ErrorMessage name="guardOffice" component="div" className="invalid-feedback" />
                          </td>   
                        </tr> 
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-1">Electric Load:</p>
                          </td> 
                          <td className="" colSpan="2">
                            <Field  name="electricLoad" className={'form-control bg-white px-4'+ (errors.electricLoad && touched.electricLoad? ' is-invalid' : '')} placeholder="KVA"/>
                            <ErrorMessage name="electricLoad" component="div" className="invalid-feedback" />
                          </td>  
                        </tr>
                        <tr>
                          <td className="">
                            <p className="mb-5 pb-1">Others:</p>
                          </td> 
                          <td className="" colSpan="3">
                            <Field as="textarea" name="others2" className={'form-control bg-white px-4 rounded-sm' + (errors.others2 && touched.others2? ' is-invalid' : '')} placeholder="" rows="3"/>
                            <ErrorMessage name="area" component="div" className="invalid-feedback" />
                          </td>  
                        </tr>
                      </tbody>
                      
                    </table>
                  </div>

                  <div className="col-12 mt-4">
                    <div className="row justify-content-end">
                      <div className="col-auto">
                        {/* <button type="button" className="btn btn-outline-deep-blue add-className remove-class" data-add-target=".steps4" data-add-target-="d-none" data-remove-target=".steps3" data-remove-target-class="d-none">Back</button> */}
                      </div>
                      <div className="col-auto">
                        <button type="submit" className="btn btn-deep-blue add-className remove-class">Save</button>
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
            
        </>
    )
}

export default ITInfraForm
