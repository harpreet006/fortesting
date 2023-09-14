import React, {useState, useEffect} from 'react'
import {updateSafetySecurity, changeWarehouseStatus} from '../../../store/actions/vendor/warehouseList';
import {useDispatch, useSelector} from 'react-redux';
import FormSuccess from '../../helper/FormSuccess';
import {readableDate} from '../../validation';
import Spinner from 'react-bootstrap/Spinner';
import ErrorCard, { FormErrorCard } from '../../helper/ErrorCard';
import { CardLoader } from '../../helper/CustomLoader';

const SafetySecurityForm = ({viewMood}) => {
  const dispatch = useDispatch()
  const data=useSelector((state)=>state.WAREHOUSELIST);
  // console.log("Update It Office STATE===>", data.singleFormData);

  const [errors, setErrors] = useState({})
  const [formSub,setFormSub]= useState(false)

  // State Change of yes no option
  const [yesForm, setYesForm] = useState({
    fireABCYes:"yes",
    fireCO2Yes:"yes",
    fireOtherYes:"yes",
    fireSprinklersYes:"yes",
    fireHydrantYes:"yes",
    cctvYes:"yes",
    waterYes:"yes",
    smokeYes:"yes",
    securityYes:"yes",
    metalYes:"yes",
    pestYes:"yes",
  })

  const {
    fireABCYes,
    fireCO2Yes,
    fireOtherYes,
    fireSprinklersYes,
    fireHydrantYes,
    cctvYes,
    waterYes,
    smokeYes,
    securityYes,
    metalYes,
    pestYes
  } = yesForm;

  const yesFormHandle = (e) =>{
    setYesForm({...yesForm, [e.target.name]:e.target.value})
  }

  // Main form summition controll

  const [safetyForm, setSafetyForm] = useState({
    fireABCQty:"",
    fireABCFrom:"",
    fireABCTill:"",
    fireCO2Qty:"",
    fireCO2From:"",
    fireCO2Till:"",
    fireOtherQty:"",
    fireOtherFrom:"",
    fireOtherTill:"",
    fireSprinklers:"",
    fireHydrant:"",
    cctv:"",
    waterQty:"",
    waterLiter:"",
    smoke:"",
    security:"",
    metal:"",
    pest:"",
    others:""
  })


  useEffect(()=>{

    let  safetyInfo= data.singleFormData.safetyAndSecurityInfo

    if(safetyInfo!==null && safetyInfo!==undefined){

      // console.log("safetyInfo====>", safetyInfo)

      let  fireCode = safetyInfo.fireExtinguishers.find(o => o.type === 'code');
      let  fireCo2 = safetyInfo.fireExtinguishers.find(o => o.type === 'co2');
      let  fireH2o = safetyInfo.fireExtinguishers.find(o => o.type === 'h20');

      setSafetyForm(
            {
              fireABCQty: fireCode ? fireCode.quantity : "",
              fireABCFrom:fireCode ? fireCode.fireExtinguisherValidity.validFrom : "",
              fireABCTill:fireCode ? fireCode.fireExtinguisherValidity.validTill : "",
              fireCO2Qty:fireCo2 ? fireCo2.quantity : "",
              fireCO2From:fireCo2 ? fireCo2.fireExtinguisherValidity.validFrom : "",
              fireCO2Till:fireCo2 ? fireCo2.fireExtinguisherValidity.validTill : "",
              fireOtherQty:fireH2o ? fireH2o.quantity : "",
              fireOtherFrom:fireH2o ? fireH2o.fireExtinguisherValidity.validFrom : "",
              fireOtherTill:fireH2o ? fireH2o.fireExtinguisherValidity.validTill : "",
              fireSprinklers:safetyInfo ? safetyInfo.fireSprinklers :"",
              fireHydrant:safetyInfo ? safetyInfo.fireHydrant :"",
              cctv:safetyInfo ? safetyInfo.cctv :"",
              waterQty:safetyInfo ? safetyInfo.waterTank.quantity :"",
              waterLiter:safetyInfo ? safetyInfo.waterTank.storage :"",
              smoke:safetyInfo ? safetyInfo.smokeDetectorsAndFireAlarm:"",
              security:safetyInfo ? safetyInfo.securityGuard:"",
              metal:safetyInfo ? safetyInfo.metalDetector:"",
              pest:safetyInfo ? safetyInfo.pestControl:"",
              others:safetyInfo ? safetyInfo.others :""
              }
      )

      setYesForm({
        fireABCYes: fireCode && fireCode.quantity ? "yes" : "no",
        fireCO2Yes: fireCo2 && fireCo2.quantity ? "yes" : "no",
        fireOtherYes: fireH2o && fireH2o.quantity ? "yes" : "no",
        fireSprinklersYes: safetyInfo && safetyInfo.fireSprinklers ? "yes" : "no",
        fireHydrantYes: safetyInfo && safetyInfo.fireHydrant ? "yes" : "no",
        cctvYes: safetyInfo && safetyInfo.cctv ? "yes" : "no",
        waterYes: safetyInfo && safetyInfo.waterTank.storage ? "yes" : "no",
        smokeYes: safetyInfo && safetyInfo.smokeDetectorsAndFireAlarm ? "yes" : "no",
        securityYes: safetyInfo && safetyInfo.securityGuard ? "yes" : "no",
        metalYes: safetyInfo && safetyInfo.metalDetector ? "yes" : "no",
        pestYes: safetyInfo && safetyInfo.pestControl ? "yes" : "no",
      })


    }
  },[data.singleFormData, data.id])

  const HandleChange = (e) =>{
    setSafetyForm({...safetyForm, [e.target.name]:e.target.value})
    if(formSub){
      handleValidation();
    }
  }

  const handleValidation =() =>{
    let errors = {}
    let isError= true;
    if(fireABCYes=== "yes" && safetyForm.fireABCQty===""){
      isError=false
      errors["fireABCQty"]="Required"
    }

    if(fireABCYes=== "yes" && safetyForm.fireABCFrom===""){
      isError=false
      errors["fireABCFrom"]="Required"
    }

    if(fireABCYes=== "yes" && safetyForm.fireABCTill===""){
      isError=false
      errors["fireABCTill"]="Required"
    }

    if(fireCO2Yes=== "yes" && safetyForm.fireCO2Qty===""){
      isError=false
      errors["fireCO2Qty"]="Required"
    }

    if(fireCO2Yes=== "yes" && safetyForm.fireCO2From===""){
      isError=false
      errors["fireCO2From"]="Required"
    }

    if(fireCO2Yes=== "yes" && safetyForm.fireCO2Till===""){
      isError=false
      errors["fireCO2Till"]="Required"
    }

    if(fireOtherYes=== "yes" && safetyForm.fireOtherQty===""){
      isError=false
      errors["fireOtherQty"]="Required"
    }

    if(fireOtherYes=== "yes" && safetyForm.fireOtherFrom===""){
      isError=false
      errors["fireOtherFrom"]="Required"
    }

    if(fireOtherYes=== "yes" && safetyForm.fireOtherTill===""){
      isError=false
      errors["fireOtherTill"]="Required"
    }

    if(fireSprinklersYes=== "yes" && safetyForm.fireSprinklers===""){
      isError=false
      errors["fireSprinklers"]="Required"
    }

    if(fireHydrantYes=== "yes" && safetyForm.fireHydrant===""){
      isError=false
      errors["fireHydrant"]="Required"
    }

    if(cctvYes=== "yes" && safetyForm.cctv===""){
      isError=false
      errors["cctv"]="Required"
    }
    if(waterYes=== "yes" && safetyForm.waterQty===""){
      isError=false
      errors["waterQty"]="Required"
    }

    if(waterYes=== "yes" && safetyForm.waterLiter===""){
      isError=false
      errors["waterLiter"]="Required"
    }

    if(smokeYes=== "yes" && safetyForm.smoke===""){
      isError=false
      errors["smoke"]="Required"
    }

    if(securityYes=== "yes" && safetyForm.security===""){
      isError=false
      errors["security"]="Required"
    }

    if(metalYes=== "yes" && safetyForm.metal===""){
      isError=false
      errors["metal"]="Required"
    }

    if(pestYes=== "yes" && safetyForm.pest===""){
      isError=false
      errors["pest"]="Required"
    }

    if(safetyForm.others===""){
      isError=false
      errors["others"]="Required"
    }

    setErrors(errors)
    return isError;
  }


  const {
    fireABCQty,
    fireABCFrom,
    fireABCTill,
    fireCO2Qty,
    fireCO2From,
    fireCO2Till,
    fireOtherQty,
    fireOtherFrom,
    fireOtherTill,
    fireSprinklers,
    fireHydrant,
    cctv,
    waterQty,
    waterLiter,
    smoke,
    security,
    metal,
    pest,
    others
  } = safetyForm;


  const safetySubmit = (e) =>{
    e.preventDefault();
    setFormSub(true)
    if(handleValidation()){
      let formData={
        "fireExtinguishers":[{
            "type":"code",
            "quantity": fireABCYes === "yes" ? fireABCQty :"",
            "fireExtinguisher":{
                "validFrom":fireABCYes === "yes" ? fireABCFrom :"",
                "validTill":fireABCYes === "yes" ? fireABCTill:""
            }
        },{
            "type":"co2",
            "quantity":fireCO2Yes === "yes" ? fireCO2Qty :"",
            "fireExtinguisher":{
                "validFrom":fireCO2Yes === "yes" ? fireCO2From :"",
                "validTill":fireCO2Yes === "yes" ? fireCO2Till :""
            }
        },{
            "type":"h20",
            "quantity": fireOtherYes === "yes" ? fireOtherQty :"",
            "fireExtinguisher":{
                "validFrom": fireOtherYes === "yes" ? fireOtherFrom : "",
                "validTill": fireOtherYes === "yes" ? fireOtherTill :""
            }
        }],
        "fireSprinklers": fireSprinklersYes === "yes" ? fireSprinklers : "",
        "fireHydrant": fireHydrantYes === "yes"? fireHydrant : "",
        "cctv": cctvYes === "yes" ? cctv : "",
        "waterTank": {
            "quantity": waterYes === "yes" ? waterQty : "",
            "storage": waterYes === "yes" ? waterLiter : ""
        },
        "smokeDetectorsAndFireAlarm": smokeYes === "yes" ? smoke : "",
        "securityGuard": securityYes === "yes" ? security :"",
        "metalDetector": metalYes === "yes" ? metal : "",
        "pestControl": pestYes === "yes" ? pest :"",
        "others": others,
        "warehouse":data.singleFormData.id
    }
    dispatch(updateSafetySecurity(formData))
    // console.log("Submitted==>",formData)

    }else{
      console.log("submission Fail")
    }
  
  }

    return (
        <>
        {/* Loader */}

        {data.isLoading ?  <CardLoader />: (data.isError !=="" ? 
            <ErrorCard message={data.isError} />
            :
              <>

{
      data.addNewResponse.statusCode===201 ?
        <FormSuccess onClick={()=>dispatch(changeWarehouseStatus())} message={data.addNewResponse.message} />
      :null
    }



          <div className="row align-items-center pb-3 mx-0 overflow-auto"> 
            <div className="col-12">
              <form onSubmit={safetySubmit}> 
                <div className="row bg-white rounded mx-0 col-xxxl-11">
                  <div className="col-12 border-0 border-bottom-0 table-responsive table-collapse">
                    <table className="table customTable"> 
                      <tbody>
                        <tr>
                          <td className="mw-200px">
                            <p className="mb-0 pb-1">Fire Extinguisher (ABC):</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-4 w-200px mt-3 mb-0">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>yesFormHandle(e)} checked={fireABCYes==="yes"} className="common-radio-deep-blue-input" type="radio" name="fireABCYes" id="fireABCYes" value="yes" hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="fireABCYes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>yesFormHandle(e)} checked={fireABCYes==="no"} className="common-radio-deep-blue-input" type="radio" name="fireABCYes" id="fireABCYes1" value="no" hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="fireABCYes1">No</label>
                            </div> 
                          </td> 
                          <td className="pb-4"> 
                            <input type="number" name="fireABCQty" value={fireABCQty} onChange={(e)=>HandleChange(e)} disabled={fireABCYes==="no"} className="form-control bg-white px-1 mb-1 mt-3 text-center" placeholder="Qty" style={{width:"50px"}} readOnly={viewMood} />
                            <span className="errorMsg">{fireABCYes==="no" ? null : errors["fireABCQty"]}</span>
                          </td>
                          <td className="pb-4">
                            <label htmlFor="" className="mb-0 px-4 small text-uppercase">Valid from</label>
                            <input type="date" name="fireABCFrom" value={readableDate(fireABCFrom)} onChange={(e)=>HandleChange(e)} disabled={fireABCYes==="no"} className="form-control bg-white px-4 mb-2" placeholder="" readOnly={viewMood} />
                            <span className="errorMsg">{fireABCYes==="no" ? null : errors["fireABCFrom"]}</span>
                          </td>
                          <td className="pb-4">
                            <label htmlFor="" className="mb-0 px-4 small text-uppercase">Valid till</label>
                            <input type="date" name="fireABCTill" value={readableDate(fireABCTill)} onChange={(e)=>HandleChange(e)} disabled={fireABCYes==="no"} className="form-control bg-white px-4 mb-2" placeholder="" readOnly={viewMood} />
                            <span className="errorMsg">{fireABCYes==="no" ? null : errors["fireABCTill"]}</span>
                          </td> 
                        </tr>
                     
                        <tr>	
                    <td className="w-25px"> 	
                    </td> 	
                   	
                    <td className="w-25px"> 	
                    </td>	
                    <td className="mw-250px form-inline form-group py-3 mb-0 pr-0" colSpan="2">	
                   <p>WHS Remarks: {data.singleFormData&&data.singleFormData.safetyAndSecurityRemark&&data.singleFormData.safetyAndSecurityRemark.fireExtinguishers[0]&&data.singleFormData.safetyAndSecurityRemark.fireExtinguishers[0].fireExtinguisher.whsstatus===true?"okay":"not okay"}</p>	
                    </td>	
                    <td className="mw-150px">	
                    <input     disabled               value={data.singleFormData&&data.singleFormData.safetyAndSecurityRemark&&data.singleFormData.safetyAndSecurityRemark.fireExtinguishers[0]&&data.singleFormData.safetyAndSecurityRemark.fireExtinguishers[0].fireExtinguisher.whsremark}	
 type="text" className="form-control  px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </td>	
                 </tr>	
                     
                        <tr>
                          <td className="mw-200px">
                            <p className="mb-0 pb-1">Fire Extinguisher (CO2):</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-4 w-200px mt-3 mb-0">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>yesFormHandle(e)} checked={fireCO2Yes==="yes"} className="common-radio-deep-blue-input" type="radio" name="fireCO2Yes" id="fireCO2Yes" value="yes" hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="fireCO2Yes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>yesFormHandle(e)} checked={fireCO2Yes==="no"} className="common-radio-deep-blue-input" type="radio" name="fireCO2Yes" id="fireCO2Yes1" value="no" hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="fireCO2Yes1">No</label>
                            </div> 
                          </td> 
                          <td className="pb-4"> 
                            <input type="number" name="fireCO2Qty" value={fireCO2Qty} onChange={(e)=>HandleChange(e)} disabled={fireCO2Yes==="no"} className="form-control bg-white px-1 mb-1 mt-3 text-center" placeholder="Qty" style={{width:"50px"}}  readOnly={viewMood}  />
                            <span className="errorMsg">{fireCO2Yes==="no" ? null : errors["fireCO2Qty"]}</span>
                          </td>
                          <td className="pb-4">
                            <label htmlFor="" className="mb-0 px-4 small text-uppercase">Valid from</label>
                            <input type="date" name="fireCO2From" value={readableDate(fireCO2From)} onChange={(e)=>HandleChange(e)} disabled={fireCO2Yes==="no"} className="form-control bg-white px-4 mb-2" placeholder="" readOnly={viewMood} />
                            <span className="errorMsg">{fireCO2Yes==="no" ? null : errors["fireCO2From"]}</span>
                          </td>
                          <td className="pb-4">
                            <label htmlFor="" className="mb-0 px-4 small text-uppercase">Valid till</label>
                            <input type="date" name="fireCO2Till" value={readableDate(fireCO2Till)} onChange={(e)=>HandleChange(e)} disabled={fireCO2Yes==="no"} className="form-control bg-white px-4 mb-2" placeholder="" readOnly={viewMood} />
                            <span className="errorMsg">{fireCO2Yes==="no" ? null : errors["fireCO2Till"]}</span>
                          </td> 
                        </tr>
               
                        <tr>	
                    <td className="w-25px"> 	
                    </td> 	
                   	
                    <td className="w-25px"> 	
                    </td>	
                    <td className="mw-250px form-inline form-group py-3 mb-0 pr-0" colSpan="2">	
                   <p>WHS Remarks: {data.singleFormData&&data.singleFormData.safetyAndSecurityRemark&&data.singleFormData.safetyAndSecurityRemark.fireExtinguishers[1]&&data.singleFormData.safetyAndSecurityRemark.fireExtinguishers[1].fireExtinguisher.whsstatus===true?"okay":"not okay"}</p>	
                    </td>	
                    <td className="mw-150px">	
                    <input     disabled               value={data.singleFormData&&data.singleFormData.safetyAndSecurityRemark&&data.singleFormData.safetyAndSecurityRemark.fireExtinguishers[1]&&data.singleFormData.safetyAndSecurityRemark.fireExtinguishers[1].fireExtinguisher.whsremark}	
 type="text" className="form-control  px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </td>	
                 </tr>	
                        <tr>
                          <td className="mw-200px">
                            <p className="mb-0 pb-1">Fire Extinguisher (Others):</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-4 w-200px mt-3 mb-0">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>yesFormHandle(e)} checked={fireOtherYes==="yes"} className="common-radio-deep-blue-input" type="radio" name="fireOtherYes" id="fireOtherYes" value="yes" hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="fireOtherYes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>yesFormHandle(e)} checked={fireOtherYes==="no"} className="common-radio-deep-blue-input" type="radio" name="fireOtherYes" id="fireOtherYes1" value="no" hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="fireOtherYes1">No</label>
                            </div> 
                          </td> 
                          <td className="pb-4"> 
                            <input type="number" name="fireOtherQty" value={fireOtherQty} onChange={(e)=>HandleChange(e)} disabled={fireOtherYes==="no"} className="form-control bg-white px-1 mb-1 mt-3 text-center" placeholder="Qty" style={{width:"50px"}} readOnly={viewMood} />
                            <span className="errorMsg">{fireOtherYes==="no" ? null : errors["fireOtherQty"]}</span>
                          </td>
                          <td className="pb-4">
                            <label htmlFor="" className="mb-0 px-4 small text-uppercase">Valid from</label>
                            <input type="date" name="fireOtherFrom" value={readableDate(fireOtherFrom)} onChange={(e)=>HandleChange(e)} disabled={fireOtherYes==="no"} className="form-control bg-white px-4 mb-2" placeholder="" readOnly={viewMood} />
                            <span className="errorMsg">{fireOtherYes==="no" ? null : errors["fireOtherFrom"]}</span>
                          </td>
                          <td className="pb-4">
                            <label htmlFor="" className="mb-0 px-4 small text-uppercase">Valid till</label>
                            <input type="date" name="fireOtherTill" value={readableDate(fireOtherTill)} onChange={(e)=>HandleChange(e)} disabled={fireOtherYes==="no"} className="form-control bg-white px-4 mb-2" placeholder="" readOnly={viewMood} />
                            <span className="errorMsg">{fireOtherYes==="no" ? null : errors["fireOtherTill"]}</span>
                          </td> 
                        </tr>  
                     
                        <tr>	
                    <td className="w-25px"> 	
                    </td> 	
                   	
                    <td className="w-25px"> 	
                    </td>	
                    <td className="mw-250px form-inline form-group py-3 mb-0 pr-0" colSpan="2">	
                   <p>WHS Remarks: {data.singleFormData&&data.singleFormData.safetyAndSecurityRemark&&data.singleFormData.safetyAndSecurityRemark.fireExtinguishers[2]&&data.singleFormData.safetyAndSecurityRemark.fireExtinguishers[2].fireExtinguisher.whsstatus===true?"okay":"not okay"}</p>	
                    </td>	
                    <td className="mw-150px">	
                    <input     disabled               value={data.singleFormData&&data.singleFormData.safetyAndSecurityRemark&&data.singleFormData.safetyAndSecurityRemark.fireExtinguishers[2]&&data.singleFormData.safetyAndSecurityRemark.fireExtinguishers[2].fireExtinguisher.whsremark}	
 type="text" className="form-control  px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </td>	
                 </tr>	
                     
                        <tr>
                          <td className="mw-200px">
                            <p className="mb-0 pb-1">Fire Sprinklers:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-4 mt-2 mb-0">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>yesFormHandle(e)} checked={fireSprinklersYes==="yes"} className="common-radio-deep-blue-input" type="radio" name="fireSprinklersYes" id="fireSprinklersYes" value="yes" hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="fireSprinklersYes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>yesFormHandle(e)} checked={fireSprinklersYes==="no"} className="common-radio-deep-blue-input" type="radio" name="fireSprinklersYes" id="fireSprinklersYes1" value="no" hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="fireSprinklersYes1">No</label>
                            </div> 
                          </td> 
                          <td className="pb-4" colSpan="2">
                            <input type="number" name="fireSprinklers" value={fireSprinklers} onChange={(e)=>HandleChange(e)} disabled={fireSprinklersYes==="no"} className="form-control bg-white px-4 mt-2 mb-2" placeholder="Qty" readOnly={viewMood} />
                            <span className="errorMsg">{fireSprinklersYes==="no" ? null : errors["fireSprinklers"]}</span>
                          </td> 
                          <td className="pb-4"> 
                          </td> 
                        </tr> 
                        <tr>	
                    <td className="w-25px"> 	
                    </td> 	
                   	
                    <td className="w-25px"> 	
                    </td>	
                    <td className="mw-250px form-inline form-group py-3 mb-0 pr-0" colSpan="2">	
                   <p>WHS Remarks: {data.singleFormData&&data.singleFormData.safetyAndSecurityRemark&&data.singleFormData.safetyAndSecurityRemark.fireSprinklers.whsstatus === true?"okay":"not okay"}</p>	
                    </td>	
                    <td className="mw-150px">	
                    <input     disabled               value={data.singleFormData&&data.singleFormData.safetyAndSecurityRemark&&data.singleFormData.safetyAndSecurityRemark.fireSprinklers.whsremark}	
 type="text" className="form-control  px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </td>	
                 </tr>	
                        <tr>
                          <td className="mw-200px">
                            <p className="mb-0 pb-1">Fire Hydrant:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-4 mt-2 mb-0">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>yesFormHandle(e)} checked={fireHydrantYes==="yes"} className="common-radio-deep-blue-input" type="radio" name="fireHydrantYes" id="fireHydrantYes" value="yes" hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="fireHydrantYes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>yesFormHandle(e)} checked={fireHydrantYes==="no"} className="common-radio-deep-blue-input" type="radio" name="fireHydrantYes" id="fireHydrantYes1" value="no" hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="fireHydrantYes1">No</label>
                            </div> 
                          </td> 
                          <td className="pb-4" colSpan="2">
                            <input type="number" name="fireHydrant" value={fireHydrant} onChange={(e)=>HandleChange(e)} disabled={fireHydrantYes==="no"} className="form-control bg-white px-4 mt-2 mb-2" placeholder="Qty" readOnly={viewMood} />
                            <span className="errorMsg">{fireHydrantYes==="no" ? null : errors["fireHydrant"]}</span>
                          </td> 
                          <td className="pb-4"> 
                          </td> 
                        </tr>
                        <tr>
                          <td className="mw-200px">
                            <p className="mb-0 pb-1">CCTV:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-4 mt-2 mb-0">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>yesFormHandle(e)} checked={cctvYes==="yes"} className="common-radio-deep-blue-input" type="radio" name="cctvYes" id="cctvYes" value="yes" hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="cctvYes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>yesFormHandle(e)} checked={cctvYes==="no"} className="common-radio-deep-blue-input" type="radio" name="cctvYes" id="cctvYes1" value="no" hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="cctvYes1">No</label>
                            </div> 
                          </td> 
                          <td className="pb-4" colSpan="2">
                            <input type="number" name="cctv" onChange={(e)=>HandleChange(e)} disabled={cctvYes==="no"} value={cctv} className="form-control bg-white px-4 mt-2 mb-2" placeholder="Qty" />
                            <span className="errorMsg">{cctvYes==="no" ? null : errors["cctv"]}</span>
                          </td> 
                          <td className="pb-4"> 
                          </td> 
                        </tr>
                        <tr>	
                    <td className="w-25px"> 	
                    </td> 	
                   	
                    <td className="w-25px"> 	
                    </td>	
                    <td className="mw-250px form-inline form-group py-3 mb-0 pr-0" colSpan="2">	
                   <p>WHS Remarks: {data.singleFormData&&data.singleFormData.safetyAndSecurityRemark&&data.singleFormData.safetyAndSecurityRemark.fireHydrant.whsstatus === true?"okay":"not okay"}</p>	
                    </td>	
                    <td className="mw-150px">	
                    <input     disabled               value={data.singleFormData&&data.singleFormData.safetyAndSecurityRemark&&data.singleFormData.safetyAndSecurityRemark.fireHydrant.whsremark}	
 type="text" className="form-control  px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </td>	
                 </tr>	
                        <tr>
                          <td className="mw-200px">
                            <p className="mb-0 pb-1">Water Tank:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-4 mt-2 mb-0">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>yesFormHandle(e)} checked={waterYes==="yes"} className="common-radio-deep-blue-input" type="radio" name="waterYes" id="waterYes" value="yes" hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="waterYes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>yesFormHandle(e)} checked={waterYes==="no"} className="common-radio-deep-blue-input" type="radio" name="waterYes" id="waterYes1" value="no" hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="waterYes1">No</label>
                            </div> 
                          </td> 
                          <td className="pb-4" colSpan="2">
                            <input type="number" name="waterQty" value={waterQty} onChange={(e)=>HandleChange(e)} disabled={waterYes==="no"} className="form-control bg-white px-4 mt-2 mb-2" placeholder="Qty" readOnly={viewMood} />
                            <span className="errorMsg">{waterYes==="no" ? null : errors["waterQty"]}</span>
                          </td> 
                          <td className="pb-4"> 
                            <input type="number" name="waterLiter" value={waterLiter} onChange={(e)=>HandleChange(e)} disabled={waterYes==="no"} className="form-control bg-white px-4 mt-2 mb-2" placeholder="Total Storage in Liter" readOnly={viewMood} />
                            <span className="errorMsg">{waterYes==="no" ? null : errors["waterLiter"]}</span>
                          </td> 
                        </tr>

                        <tr>	
                    <td className="w-25px"> 	
                    </td> 	
                   	
                    <td className="w-25px"> 	
                    </td>	
                    <td className="mw-250px form-inline form-group py-3 mb-0 pr-0" colSpan="2">	
                   <p>WHS Remarks: {data.singleFormData&&data.singleFormData.safetyAndSecurityRemark&&data.singleFormData.safetyAndSecurityRemark.waterTank.whsstatus === true?"okay":"not okay"}</p>	
                    </td>	
                    <td className="mw-150px">	
                    <input     disabled               value={data.singleFormData&&data.singleFormData.safetyAndSecurityRemark&&data.singleFormData.safetyAndSecurityRemark.waterTank.whsremark}	
 type="text" className="form-control  px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </td>	
                 </tr>	
                        <tr>
                          <td className="mw-200px">
                            <p className="mb-0 pb-1">Smoke Detectors / Fire Alarm:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-4 mt-2 mb-0">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>yesFormHandle(e)} checked={smokeYes==="yes"} className="common-radio-deep-blue-input" type="radio" name="smokeYes" id="smokeYes" value="yes" hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="smokeYes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>yesFormHandle(e)} checked={smokeYes==="no"} className="common-radio-deep-blue-input" type="radio" name="smokeYes" id="smokeYes1" value="no" hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="smokeYes1">No</label>
                            </div> 
                          </td> 
                          <td className="pb-4" colSpan="2">
                            <input type="number" name="smoke" value={smoke} onChange={(e)=>HandleChange(e)} disabled={smokeYes==="no"} className="form-control bg-white px-4 mt-2 mb-2" placeholder="Qty" readOnly={viewMood} />
                            <span className="errorMsg">{smokeYes==="no" ? null : errors["smoke"]}</span>
                          </td> 
                          <td className="pb-4"> 
                          </td> 
                        </tr>
                 
                        <tr>	
                    <td className="w-25px"> 	
                    </td> 	
                   	
                    <td className="w-25px"> 	
                    </td>	
                    <td className="mw-250px form-inline form-group py-3 mb-0 pr-0" colSpan="2">	
                   <p>WHS Remarks: {data.singleFormData&&data.singleFormData.safetyAndSecurityRemark&&data.singleFormData.safetyAndSecurityRemark.smokeDetectorsAndFireAlarm.whsstatus === true?"okay":"not okay"}</p>	
                    </td>	
                    <td className="mw-150px">	
                    <input     disabled               value={data.singleFormData&&data.singleFormData.safetyAndSecurityRemark&&data.singleFormData.safetyAndSecurityRemark.smokeDetectorsAndFireAlarm.whsremark}	
 type="text" className="form-control  px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </td>	
                 </tr>	
                        <tr>
                          <td className="mw-200px">
                            <p className="mb-0 pb-1">Security Guard:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-4 mt-2 mb-0">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>yesFormHandle(e)} checked={securityYes==="yes"} className="common-radio-deep-blue-input" type="radio" name="securityYes" id="securityYes" value="yes" hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="securityYes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>yesFormHandle(e)} checked={securityYes==="no"} className="common-radio-deep-blue-input" type="radio" name="securityYes" id="securityYes1" value="no" hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="securityYes1">No</label>
                            </div> 
                          </td> 
                          <td className="pb-4" colSpan="2">
                            <input type="number" name="security" value={security} onChange={(e)=>HandleChange(e)} disabled={securityYes==="no"} className="form-control bg-white px-4 mt-2 mb-2" placeholder="Qty" readOnly={viewMood} />
                            <span className="errorMsg">{securityYes==="no" ? null : errors["security"]}</span>
                          </td> 
                          <td className="pb-4"> 
                          </td> 
                        </tr>
                        <tr>	
                    <td className="w-25px"> 	
                    </td> 	
                   	
                    <td className="w-25px"> 	
                    </td>	
                    <td className="mw-250px form-inline form-group py-3 mb-0 pr-0" colSpan="2">	
                   <p>WHS Remarks: {data.singleFormData&&data.singleFormData.safetyAndSecurityRemark&&data.singleFormData.safetyAndSecurityRemark.securityGuard.whsstatus === true?"okay":"not okay"}</p>	
                    </td>	
                    <td className="mw-150px">	
                    <input     disabled               value={data.singleFormData&&data.singleFormData.safetyAndSecurityRemark&&data.singleFormData.safetyAndSecurityRemark.securityGuard.whsremark}	
 type="text" className="form-control  px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </td>	
                 </tr>	
                        <tr>
                          <td className="mw-200px">
                            <p className="mb-0 pb-1">Metal Detector:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-4 mt-2 mb-0">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>yesFormHandle(e)} checked={metalYes==="yes"} className="common-radio-deep-blue-input" type="radio" name="metalYes" id="metalYes" value="yes" hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="metalYes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>yesFormHandle(e)} checked={metalYes==="no"} className="common-radio-deep-blue-input" type="radio" name="metalYes" id="metalYes1" value="no" hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="metalYes1">No</label>
                            </div> 
                          </td> 
                          <td className="pb-4" colSpan="2">
                            <input type="number" name="metal" value={metal} onChange={(e)=>HandleChange(e)} disabled={metalYes==="no"} className="form-control bg-white px-4 mt-2 mb-2" placeholder="Qty" readOnly={viewMood} />
                            <span className="errorMsg">{metalYes==="no" ? null : errors["metal"]}</span>
                          </td> 
                          <td className="pb-4"> 
                          </td> 
                        </tr>

                        <tr>	
                    <td className="w-25px"> 	
                    </td> 	
                   	
                    <td className="w-25px"> 	
                    </td>	
                    <td className="mw-250px form-inline form-group py-3 mb-0 pr-0" colSpan="2">	
                   <p>WHS Remarks: {data.singleFormData&&data.singleFormData.safetyAndSecurityRemark&&data.singleFormData.safetyAndSecurityRemark.metalDetector.whsstatus === true?"okay":"not okay"}</p>	
                    </td>	
                    <td className="mw-150px">	
                    <input     disabled               value={data.singleFormData&&data.singleFormData.safetyAndSecurityRemark&&data.singleFormData.safetyAndSecurityRemark.metalDetector.whsremark}	
 type="text" className="form-control  px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </td>	
                 </tr>	
                        <tr>
                          <td className="mw-200px">
                            <p className="mb-0 pb-1">Pest Control:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-4 mt-2 mb-0">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>yesFormHandle(e)} checked={pestYes==="yes"} className="common-radio-deep-blue-input" type="radio" name="pestYes" id="pestYes" value="yes" hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="pestYes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>yesFormHandle(e)} checked={pestYes==="no"} className="common-radio-deep-blue-input" type="radio" name="pestYes" id="pestYes1" value="no" hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="pestYes1">No</label>
                            </div> 
                          </td> 
                          <td className="pb-4" colSpan="2">
                            <label htmlFor="" className="mb-0 text-uppercase small px-4">Select Last Date of Pest Control</label>
                            <input type="date" name="pest" value={readableDate(pest)} onChange={(e)=>HandleChange(e)} disabled={pestYes==="no"} className="form-control bg-white px-4" readOnly={viewMood} />
                            <span className="errorMsg">{pestYes==="no" ? null : errors["pest"]}</span>
                          </td> 
                          <td className="pb-4"> 
                          </td> 
                        </tr>  

                        <tr>	
                    <td className="w-25px"> 	
                    </td> 	
                   	
                    <td className="w-25px"> 	
                    </td>	
                    <td className="mw-250px form-inline form-group py-3 mb-0 pr-0" colSpan="2">	
                   <p>WHS Remarks: {data.singleFormData&&data.singleFormData.safetyAndSecurityRemark&&data.singleFormData.safetyAndSecurityRemark.pestControl.whsstatus === true?"okay":"not okay"}</p>	
                    </td>	
                    <td className="mw-150px">	
                    <input     disabled               value={data.singleFormData&&data.singleFormData.safetyAndSecurityRemark&&data.singleFormData.safetyAndSecurityRemark.pestControl.whsremark}	
 type="text" className="form-control  px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </td>	
                 </tr>	
                        <tr>
                          <td className="">
                            <p className="mb-5 pb-1">Others:</p>
                          </td> 
                          <td className="" colSpan="4">
                            <textarea type="text" name="others" value={others} onChange={(e)=>HandleChange(e)} className="form-control bg-white px-4 rounded-sm" placeholder="" rows="3"  readOnly={viewMood}></textarea>
                          
                            <span className="errorMsg">{errors["others"]}</span></td>  
                        </tr>
                        <tr>	
                    <td className="w-25px"> 	
                    </td> 	
                   	
                    <td className="w-25px"> 	
                    </td>	
                    <td className="mw-250px form-inline form-group py-3 mb-0 pr-0" colSpan="2">	
                   <p>WHS Remarks: {data.singleFormData&&data.singleFormData.safetyAndSecurityRemark&&data.singleFormData.safetyAndSecurityRemark.safetySecurityOther.whsstatus === true?"okay":"not okay"}</p>	
                    </td>	
                    <td className="mw-150px">	
                    <input     disabled               value={data.singleFormData&&data.singleFormData.safetyAndSecurityRemark&&data.singleFormData.safetyAndSecurityRemark.safetySecurityOther.whsremark}	
 type="text" className="form-control  px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </td>	
                 </tr>	
                      </tbody>
                    </table>
                  </div>

                  <div className={`col-12 mt-4 ${viewMood ? 'd-none' : '' }`}>
                    <div className="row justify-content-end">
                      {/* <div className="col-auto"> */}
                        {/* <button type="button" className="btn btn-outline-deep-blue add-className remove-className" data-add-target=".steps6" data-add-target-class="d-none" data-remove-target=".steps5" data-remove-target-class="d-none">Back</button> */}
                      {/* </div> */}
                      {Object.keys(errors).length !== 0 ? <FormErrorCard message="Fill All Required Fields" /> : null}
                      {data.isError !== "" ? <FormErrorCard message={data.isError} /> : null}
                      <div className="col-auto">
                        <button type="submit"  disabled={data.isPending} className="btn btn-deep-blue add-className remove-className">Save
                        {data.isPending ? <Spinner animation="border"  /> :null}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>  
              </form>
            </div>
          </div>
          </>)
          }
        </>
    )
}

export default SafetySecurityForm
