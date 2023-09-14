import React, {useState} from 'react';
// import {updateWarehouseContact, changeWarehouseStatus} from '../../../store/actions/vendor/warehouseList';
// import {useDispatch, useSelector} from 'react-redux';
// import Spinner from 'react-bootstrap/Spinner';
// import FormSuccess from '../../helper/FormSuccess';

const ITInfraForm = () => {

  // Yes no State Set
  const [desktopYes, setDesktopYes] = useState(true)
  const [printerYes, setPrinterYes] = useState(true)
  const [printerMultiFunctionYes, setPrinterMultiFunctionYes] = useState(true)
  const [upsYes, setUpsYes] = useState(true)
  const [broadbandYes, setBroadbandYes] = useState(true)
  const [scannerYes, setScannerYes] = useState(true)
  const [landlineYes, setLandlineYes] = useState(true)
  const [wmsYes, setWmsYes] = useState(true)
  const [airConditionerYes, setAirConditionerYes] = useState(true)
  const [workStationsYes, setWorkStationsYes] = useState(true)
  const [tablesYes, setTablesYes] = useState(true)
  const [cabinsYes, setCabinsYes] = useState(true)
  const [meetingRoomsYes, setMeetingRoomsYes] = useState(true)
  const [recordRoomsYes, setRecordRoomsYes] = useState(true)
  const [strongRoomsYes, setStrongRoomsYes] = useState(true)
  const [guardOfficeYes, setGuardOfficeYes] = useState(true)

  const [errors, setErrors] = useState({})
  const [formSub,setFormSub]= useState(false)

  

  const [itInfra, setItInfra] = useState({
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

  })

  const {desktop, printer, printerMultiFunction,ups, broadband,scanner,landline,wms,others,
    area,airConditioner,workStations,tables,cabins,meetingRooms,recordRooms,strongRooms,
    guardOffice,electricLoad,others2} = itInfra;


// Validation Function Call from submit and useEffect
  const handleValidation = ()=>{

    let errors={}
    let formIsValid = true;

    if(desktopYes===true && itInfra.desktop===""){
      formIsValid = false;
      errors["desktop"] = "Required";
   }

   if(printerYes===true && itInfra.printer===""){
    formIsValid = false;
    errors["printer"] = "Required";
  }

  if(printerMultiFunctionYes===true && itInfra.printerMultiFunction===""){
    formIsValid = false;
    errors["printerMultiFunction"] = "Required";
  }

  if(upsYes===true && itInfra.ups===""){
    formIsValid = false;
    errors["ups"] = "Required";
  }

  if(broadbandYes===true && itInfra.broadband===""){
    formIsValid = false;
    errors["broadband"] = "Required";
  }

  if(scannerYes===true && itInfra.scanner===""){
    formIsValid = false;
    errors["scanner"] = "Required";
  }

  if(landlineYes===true && itInfra.landline===""){
    formIsValid = false;
    errors["landline"] = "Required";
  }

  if(wmsYes===true && itInfra.wms===""){
    formIsValid = false;
    errors["wms"] = "Required";
  }

  if(itInfra.others===""){
    formIsValid = false;
    errors["others"] = "Required";
  }
  if(itInfra.area===""){
    formIsValid = false;
    errors["area"] = "Required";
  }

  if(airConditionerYes===true && itInfra.airConditioner===""){
    formIsValid = false;
    errors["airConditioner"] = "Required";
  }

  if(workStationsYes===true && itInfra.workStations===""){
    formIsValid = false;
    errors["workStations"] = "Required";
  }

  if(tablesYes===true && itInfra.tables===""){
    formIsValid = false;
    errors["tables"] = "Required";
  }

  if(cabinsYes===true && itInfra.cabins===""){
    formIsValid = false;
    errors["cabins"] = "Required";
  }

  if(meetingRoomsYes===true && itInfra.meetingRooms===""){
    formIsValid = false;
    errors["meetingRooms"] = "Required";
  }

  if(recordRoomsYes===true && itInfra.recordRooms===""){
    formIsValid = false;
    errors["recordRooms"] = "Required";
  }

  if(strongRoomsYes===true && itInfra.strongRooms===""){
    formIsValid = false;
    errors["strongRooms"] = "Required";
  }

  if(guardOfficeYes===true && itInfra.guardOffice===""){
    formIsValid = false;
    errors["guardOffice"] = "Required";
  }

  if(itInfra.electricLoad===""){
    formIsValid = false;
    errors["electricLoad"] = "Required";
  }


  if(itInfra.others2===""){
    formIsValid = false;
    errors["others2"] = "Required";
  }
 
  setErrors(errors);
    return formIsValid;
  }


  const handleChange = (e)=>{
    setItInfra({...itInfra, [e.target.name]:e.target.value })
    if(formSub){
       handleValidation()
    }
  }


 
  

  const itInfraSubmit = (e) =>{
    e.preventDefault();
    setFormSub(true)
  if(handleValidation()){

    let obj= {
      desktop: desktopYes ? desktop : 0,
      printer: printerYes ? printer : 0,
      printerMultiFunction:printerMultiFunction,
      ups:ups,
      broadband:broadband,
      scanner:scanner,
      landline:landline,
      wms:wms,
      others:others,
      area:area,
      airConditioner:airConditioner,
      workStations:workStations,
      tables:tables,
      cabins:cabins,
      meetingRooms:meetingRooms,
      recordRooms:recordRooms,
      strongRooms:strongRooms,
      guardOffice:guardOffice,
      electricLoad:electricLoad,
      others2:others2
    }
    // console.log("obj====>", obj)


    console.log('validation successful')
  }else{
    console.log('validation failed')
  }

  }



    return (
        <>

      
          <div className="row align-items-center pb-3 px-3 mx-0"> 
            <div className="col-12">
              <form onSubmit={itInfraSubmit}> 
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
                              <input  checked={desktopYes} className="common-radio-deep-blue-input" type="radio" id="desktopOption" hidden/>
                              <label onClick={()=>setDesktopYes(true)} className="common-radio-deep-blue-label pl-4" htmlFor="desktopOption">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input  checked={!desktopYes} className="common-radio-deep-blue-input" type="radio" id="desktopOption1" hidden/>
                              <label onClick={()=>setDesktopYes(false)} className="common-radio-deep-blue-label pl-4" htmlFor="desktopOption2">No</label>
                            </div> 
                          </td>
                          <td className="col-auto mt-1">
                            <p className="">Qty:</p>
                          </td>
                          <td className="">
                            <input type="number" disabled={!desktopYes} onChange={handleChange} name="desktop" className="form-control bg-white px-4 mb-2" placeholder=""/>
                            <span className="errorMsg">{!desktopYes ? null : errors["desktop"]}</span>
                          </td> 
                        </tr> 
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-1">Printer:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-3 mt-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input checked={printerYes} className="common-radio-deep-blue-input" type="radio" id="printerYes" hidden/>
                              <label onClick={()=>setPrinterYes(true)} className="common-radio-deep-blue-label pl-4" htmlFor="printerYes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input checked={!printerYes} className="common-radio-deep-blue-input" type="radio" id="printerYes1" hidden/>
                              <label onClick={()=> setPrinterYes(false)} className="common-radio-deep-blue-label pl-4" htmlFor="printerYes1">No</label>
                            </div> 
                          </td>
                          <td className="col-auto mt-1">
                            <p className="">Qty:</p>
                          </td>
                          <td className="">
                            <input type="number" disabled={!printerYes} name="printer" onChange={handleChange} className="form-control bg-white px-4 mb-2" placeholder=""/>
                            <span className="errorMsg">{!printerYes ? null : errors["printer"]}</span>
                          </td> 
                        </tr>
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-1">Printer (Multi Function):</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-3 mt-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input checked={printerMultiFunctionYes} className="common-radio-deep-blue-input" type="radio" id="yes2" hidden/>
                              <label onClick={()=>setPrinterMultiFunctionYes(true)} className="common-radio-deep-blue-label pl-4" htmlFor="yes2">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input checked={!printerMultiFunctionYes} className="common-radio-deep-blue-input" type="radio" id="no2" hidden/>
                              <label onClick={()=>setPrinterMultiFunctionYes(false)} className="common-radio-deep-blue-label pl-4" htmlFor="no2">No</label>
                            </div> 
                          </td>
                          <td className="col-auto mt-1">
                            <p className="">Qty:</p>
                          </td>
                          <td className="">
                            <input type="number" name="printerMultiFunction" disabled={!printerMultiFunctionYes} onChange={handleChange} className="form-control bg-white px-4 mb-2" placeholder=""/>
                            <span className="errorMsg">{!printerMultiFunctionYes ? null : errors["printerMultiFunction"]}</span>
                          </td>  
                        </tr>
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-1">UPS / Inverter:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-3 mt-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input checked={upsYes} className="common-radio-deep-blue-input" type="radio" id="yes2" hidden/>
                              <label onClick={()=>setUpsYes(true)} className="common-radio-deep-blue-label pl-4" htmlFor="yes2">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input checked={!upsYes} className="common-radio-deep-blue-input" type="radio" id="no2" hidden/>
                              <label onClick={()=>setUpsYes(false)} className="common-radio-deep-blue-label pl-4" htmlFor="no2">No</label>
                            </div> 
                          </td>
                          <td className="col-auto mt-1">
                            <p className="">Qty:</p>
                          </td>
                          <td className="">
                            <input type="number" name="ups" disabled={!upsYes} onChange={handleChange} className="form-control bg-white px-4 mb-2" placeholder="KVA"/>
                            <span className="errorMsg">{!upsYes ? null : errors["ups"]}</span>
                          </td> 
                        </tr>
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-1">Broadband:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-3 mt-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input checked={broadbandYes} className="common-radio-deep-blue-input" type="radio" id="yes2" hidden/>
                              <label onClick={()=>setBroadbandYes(true)} className="common-radio-deep-blue-label pl-4" htmlFor="yes2">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input checked={!broadbandYes} className="common-radio-deep-blue-input" type="radio"  id="no2" hidden/> 
                              <label onClick={()=>setBroadbandYes(false)} className="common-radio-deep-blue-label pl-4" htmlFor="no2">No</label>
                            </div> 
                          </td>
                          <td className="col-auto mt-1">
                            <p className="">MBPS:</p>
                          </td>
                          <td className="">
                            <input type="number" name="broadband" disabled={!broadbandYes} onChange={handleChange} className="form-control bg-white px-4 mb-2" placeholder=""/>
                            <span className="errorMsg">{!broadbandYes ? null : errors["broadband"]}</span>
                          </td>  
                        </tr>
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-1">Scanner:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-3 mt-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input checked={scannerYes} className="common-radio-deep-blue-input" type="radio" id="yes2" hidden/>
                              <label onClick={()=>setScannerYes(true)} className="common-radio-deep-blue-label pl-4" htmlFor="yes2">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input checked={!scannerYes} className="common-radio-deep-blue-input" type="radio" id="no2" hidden/>
                              <label onClick={()=>setScannerYes(false)} className="common-radio-deep-blue-label pl-4" htmlFor="no2">No</label>
                            </div> 
                          </td>
                          <td className="col-auto mt-1">
                            <p className="">Qty:</p>
                          </td>
                          <td className="">
                            <input type="number" name="scanner" disabled={!scannerYes} onChange={handleChange} className="form-control bg-white px-4 mb-2" placeholder=""/>
                            <span className="errorMsg">{!scannerYes ? null : errors["scanner"]}</span>
                          </td>  
                        </tr>
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-1">Telephone(Landline):</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-3 mt-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input checked={landlineYes} className="common-radio-deep-blue-input" type="radio" id="yes2" hidden/>
                              <label onClick={()=>setLandlineYes(true)} className="common-radio-deep-blue-label pl-4" htmlFor="yes2">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input checked={!landlineYes} className="common-radio-deep-blue-input" type="radio" id="no2" hidden/>
                              <label onClick={()=>setLandlineYes(false)} className="common-radio-deep-blue-label pl-4" htmlFor="no2">No</label>
                            </div> 
                          </td>
                          <td className="col-auto mt-1">
                            <p className="">Qty:</p>
                          </td>
                          <td className="">
                            <input type="number" name="landline" disabled={!landlineYes} onChange={handleChange} className="form-control bg-white px-4 mb-2" placeholder=""/>
                            <span className="errorMsg">{!landlineYes ? null : errors["landline"]}</span>
                          </td>  
                        </tr>
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-1">WMS:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-3 mt-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input checked={wmsYes} className="common-radio-deep-blue-input" type="radio"  id="yes2" hidden/>
                              <label onClick={()=>setWmsYes(true)} className="common-radio-deep-blue-label pl-4" htmlFor="yes2">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input checked={!wmsYes} className="common-radio-deep-blue-input" type="radio" id="no2" hidden/>
                              <label onClick={()=>setWmsYes(false)} className="common-radio-deep-blue-label pl-4" htmlFor="no2">No</label>
                            </div> 
                          </td> 
                          <td className="" colSpan="2">
                            <input type="text" name="wms" disabled={!wmsYes} onChange={handleChange} className="form-control bg-white px-4 mb-2" placeholder="Enter WMS Company"/>
                            <span className="errorMsg">{!wmsYes ? null : errors["wms"]}</span>
                          </td>  
                        </tr>
                        <tr>
                          <td className="">
                            <p className="mb-5 pb-1">Others:</p>
                          </td> 
                          <td className="" colSpan="3">
                            <textarea type="text" name="others" onChange={handleChange} className="form-control bg-white px-4 rounded-sm" placeholder="" rows="3"></textarea>
                            <span className="errorMsg">{errors["others"]}</span>
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
                            <input type="text" name="area" onChange={handleChange} className="form-control bg-white px-4mb-2" placeholder="Enter Area"/>
                            <span className="errorMsg">{errors["area"]}</span>
                          </td> 
                        </tr>   
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-1">Air Conditioner:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-3 mt-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input checked={airConditionerYes} className="common-radio-deep-blue-input" type="radio" id="yes2" hidden/>
                              <label onClick={()=>setAirConditionerYes(true)} className="common-radio-deep-blue-label pl-4" htmlFor="yes2">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input checked={!airConditionerYes} className="common-radio-deep-blue-input" type="radio" id="no2" hidden/>
                              <label onClick={()=>setAirConditionerYes(false)} className="common-radio-deep-blue-label pl-4" htmlFor="no2">No</label>
                            </div> 
                          </td>
                          <td className="col-auto mt-1">
                            <p className="">Qty:</p>
                          </td>
                          <td className="">
                            <input type="text" name="airConditioner" disabled={!airConditionerYes} onChange={handleChange} className="form-control bg-white px-4 mb-2" placeholder=""/>
                            <span className="errorMsg">{!airConditionerYes ? null : errors["airConditioner"]}</span>
                          </td>   
                        </tr>
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-1">Work Stations:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-3 mt-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input checked={workStationsYes} className="common-radio-deep-blue-input" type="radio" id="yes2" hidden/>
                              <label onClick={()=>setWorkStationsYes(true)} className="common-radio-deep-blue-label pl-4" htmlFor="yes2">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input checked={!workStationsYes} className="common-radio-deep-blue-input" type="radio" id="no2" hidden/>
                              <label onClick={()=>setWorkStationsYes(false)} className="common-radio-deep-blue-label pl-4" htmlFor="no2">No</label>
                            </div> 
                          </td>
                          <td className="col-auto mt-1">
                            <p className="">Qty:</p>
                          </td>
                          <td className="">
                            <input type="text" name="workStations" disabled={!workStationsYes} onChange={handleChange} className="form-control bg-white px-4 mb-2" placeholder=""/>
                            <span className="errorMsg">{!workStationsYes ? null : errors["workStations"]}</span>
                          </td>   
                        </tr>
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-1">Tables:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-3 mt-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input checked={tablesYes} className="common-radio-deep-blue-input" type="radio" id="yes2" hidden/>
                              <label onClick={()=>setTablesYes(true)} className="common-radio-deep-blue-label pl-4" htmlFor="yes2">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input checked={!tablesYes} className="common-radio-deep-blue-input" type="radio" id="no2" hidden/>
                              <label onClick={()=>setTablesYes(false)} className="common-radio-deep-blue-label pl-4" htmlFor="no2">No</label>
                            </div> 
                          </td>
                          <td className="col-auto mt-1">
                            <p className="">Qty:</p>
                          </td>
                          <td className="">
                            <input type="text" name="tables" disabled={!tablesYes} onChange={handleChange} className="form-control bg-white px-4 mb-2" placeholder=""/>
                            <span className="errorMsg">{!tablesYes ? tablesYes : errors["tables"]}</span>
                          </td>   
                        </tr>
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-1">Cabins:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-3 mt-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input checked={cabinsYes} className="common-radio-deep-blue-input" type="radio" id="yes2" hidden/>
                              <label onClick={()=>setCabinsYes(true)}className="common-radio-deep-blue-label pl-4" htmlFor="yes2">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input checked={!cabinsYes} className="common-radio-deep-blue-input" type="radio" id="no2" hidden/>
                              <label onClick={()=>setCabinsYes(false)} className="common-radio-deep-blue-label pl-4" htmlFor="no2">No</label>
                            </div> 
                          </td>
                          <td className="col-auto mt-1">
                            <p className="">Qty:</p>
                          </td>
                          <td className="">
                            <input type="text" name="cabins" disabled={!cabinsYes} onChange={handleChange} className="form-control bg-white px-4 mb-2" placeholder=""/>
                            <span className="errorMsg">{!cabinsYes ? null : errors["cabins"]}</span>
                          </td>   
                        </tr>
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-1">Meeting Rooms:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-3 mt-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input checked={meetingRoomsYes} className="common-radio-deep-blue-input" type="radio"  id="yes2"  hidden/>
                              <label onClick={()=>setMeetingRoomsYes(true)} className="common-radio-deep-blue-label pl-4" htmlFor="yes2">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input checked={!meetingRoomsYes} className="common-radio-deep-blue-input" type="radio" id="no2" hidden/>
                              <label onClick={()=>setMeetingRoomsYes(false)} className="common-radio-deep-blue-label pl-4" htmlFor="no2">No</label>
                            </div> 
                          </td>
                          <td className="col-auto mt-1">
                            <p className="">Qty:</p>
                          </td>
                          <td className="">
                            <input type="text" name="meetingRooms" disabled={!meetingRoomsYes} onChange={handleChange} className="form-control bg-white px-4 mb-2" placeholder=""/>
                            <span className="errorMsg">{!meetingRoomsYes ? null : errors["meetingRooms"]}</span>
                          </td>   
                        </tr>
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-1">Record Rooms:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-3 mt-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input checked={recordRoomsYes} className="common-radio-deep-blue-input" type="radio" id="yes2" hidden/>
                              <label onClick={()=>setRecordRoomsYes(true)} className="common-radio-deep-blue-label pl-4" htmlFor="yes2">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input checked={!recordRoomsYes} className="common-radio-deep-blue-input" type="radio" id="no2" hidden/>
                              <label onClick={()=>setRecordRoomsYes(false)} className="common-radio-deep-blue-label pl-4" htmlFor="no2">No</label>
                            </div> 
                          </td>
                          <td className="col-auto mt-1">
                            <p className="">Qty:</p>
                          </td>
                          <td className="">
                            <input type="text" name="recordRooms" disabled={!recordRoomsYes} onChange={handleChange} className="form-control bg-white px-4 mb-2" placeholder=""/>
                            <span className="errorMsg">{!recordRoomsYes ? null : errors["recordRooms"]}</span>
                          </td>   
                        </tr> 
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-1">Strong Rooms:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-3 mt-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input checked={strongRoomsYes} className="common-radio-deep-blue-input" type="radio" id="yes2" hidden/>
                              <label onClick={()=>setStrongRoomsYes(true)} className="common-radio-deep-blue-label pl-4" htmlFor="yes2">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input checked={!strongRoomsYes} className="common-radio-deep-blue-input" type="radio" id="no2" hidden/>
                              <label onClick={()=>setStrongRoomsYes(false)} className="common-radio-deep-blue-label pl-4" htmlFor="no2">No</label>
                            </div> 
                          </td>
                          <td className="col-auto mt-1">
                            <p className="">Qty:</p>
                          </td>
                          <td className="">
                            <input type="text" name="strongRooms" disabled={!strongRoomsYes} onChange={handleChange} className="form-control bg-white px-4 mb-2" placeholder=""/>
                            <span className="errorMsg">{!strongRoomsYes ? null : errors["strongRooms"]}</span>
                          </td>   
                        </tr> 
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-1">Security Guard Office / Table:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-3 mt-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input checked={guardOfficeYes} className="common-radio-deep-blue-input" type="radio" id="yes2" hidden/>
                              <label onClick={()=>setGuardOfficeYes(true)} className="common-radio-deep-blue-label pl-4" htmlFor="yes2">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input checked={!guardOfficeYes} className="common-radio-deep-blue-input" type="radio" id="no2" hidden/>
                              <label onClick={()=>setGuardOfficeYes(false)} className="common-radio-deep-blue-label pl-4" htmlFor="no2">No</label>
                            </div> 
                          </td>
                          <td className="col-auto mt-1">
                            <p className="">Qty:</p>
                          </td>
                          <td className="">
                            <input type="text" name="guardOffice" disabled={!guardOfficeYes} onChange={handleChange} className="form-control bg-white px-4 mb-2" placeholder=""/>
                            <span className="errorMsg">{!guardOfficeYes ? null : errors["guardOffice"]}</span>
                          </td>   
                        </tr> 
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-1">Electric Load:</p>
                          </td> 
                          <td className="" colSpan="2">
                            <input type="text" name="electricLoad" onChange={handleChange} className="form-control bg-white px-4" placeholder="KVA"/>
                            <span className="errorMsg">{errors["electricLoad"]}</span>
                          </td>  
                        </tr>
                        <tr>
                          <td className="">
                            <p className="mb-5 pb-1">Others:</p>
                          </td> 
                          <td className="" colSpan="3">
                            <textarea type="text" name="others2" onChange={handleChange} className="form-control bg-white px-4 rounded-sm" placeholder="" rows="3"></textarea>
                            <span className="errorMsg">{errors["others2"]}</span>
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
              </form>
            </div>
          </div>
            
        </>
    )
}

export default ITInfraForm
