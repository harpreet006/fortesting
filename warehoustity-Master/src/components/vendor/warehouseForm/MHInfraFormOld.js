import React, {useState} from 'react'

const MHInfraFormOld = () => {

  const [errors, setErrors] = useState({})
  const [formSub,setFormSub]= useState(false)
  // Only for Disable and enable
  const [yesForm, setYesForm] = useState({
    palletYes:"yes",
    handPalletYes:"yes",
    weighingMachineYes:"yes",
    pickingTrolleyYes:"yes",
    hydraulicYes:"yes",
    batteryYes:"yes",
    forkliftYes:"yes",
    forkliftDieselYes:"yes",
    electricYes:"yes",
    hydraYes:"yes",
    shrinkYes:"yes"
  })

  const {
    palletYes,
    handPalletYes,
    weighingMachineYes,
    pickingTrolleyYes,
    hydraulicYes,
    batteryYes,
    forkliftYes,
    forkliftDieselYes,
    electricYes,
    hydraYes,
    shrinkYes
  } = yesForm;

  const handleChange = (e) =>{
    setYesForm({...yesForm, [e.target.name]:e.target.value});
    // console.log("yesForm:====>", yesForm);
  }

  // State for infraForm

  const [infraForm, setInfraForm] = useState({
    pallet:"",
    palletRemark:"",
    handPallet:"",
    weighingMachineFrom:"",
    weighingMachineTill:"",
    pickingTrolley:"",
    hydraulic:"",
    battery:"",
    forklift:"",
    forkliftDiesel:"",
    electric:"",
    hydra:"",
    hydraRemark:"",
    shrink:"",
    others:""
  })

  

  const handleValidation =()=>{
    let isValidForm = true;
    let errors = {}

    if(palletYes==="yes" && infraForm.pallet ===""){
      isValidForm = false;
      errors["pallet"] = "Required"
    }

    if(handPalletYes==="yes" && infraForm.handPallet ===""){
      isValidForm = false;
      errors["handPallet"] = "Required"
    }

    if(weighingMachineYes==="yes" && infraForm.weighingMachineFrom ===""){
      isValidForm = false;
      errors["weighingMachineFrom"] = "Required"
    }

    if(weighingMachineYes==="yes" && infraForm.weighingMachineTill ===""){
      isValidForm = false;
      errors["weighingMachineTill"] = "Required"
    }

    if(pickingTrolleyYes==="yes" && infraForm.pickingTrolley ===""){
      isValidForm = false;
      errors["pickingTrolley"] = "Required"
    }

    if(hydraulicYes==="yes" && infraForm.hydraulic ===""){
      isValidForm = false;
      errors["hydraulic"] = "Required"
    }

    if(batteryYes==="yes" && infraForm.battery ===""){
      isValidForm = false;
      errors["battery"] = "Required"
    }

    if(forkliftYes==="yes" && infraForm.forklift ===""){
      isValidForm = false;
      errors["forklift"] = "Required"
    }

    if(forkliftDieselYes==="yes" && infraForm.forkliftDiesel ===""){
      isValidForm = false;
      errors["forkliftDiesel"] = "Required"
    }

    if(electricYes==="yes" && infraForm.electric ===""){
      isValidForm = false;
      errors["electric"] = "Required"
    }


    if(hydraYes==="yes" && infraForm.hydra ===""){
      isValidForm = false;
      errors["hydra"] = "Required"
    }

    if(shrinkYes==="yes" && infraForm.shrink ===""){
      isValidForm = false;
      errors["shrink"] = "Required"
    }

    if(infraForm.others ===""){
      isValidForm = false;
      errors["others"] = "Required"
    }


    setErrors(errors)
    return isValidForm;
  }

  const handleForm = (e)=>{
    setInfraForm({...infraForm, [e.target.name]:e.target.value});
    if(formSub){
      handleValidation()
    }
  }

  const onInfraSubmit = (e) =>{
    e.preventDefault();
    setFormSub(true)
    if(handleValidation()){
      console.log("Submitted ===>", infraForm);
    }else{
      console.log("Form Submit Fail")
    }
    
  }

    return (
        <>
            
          <div className="row align-items-center pb-3 mx-0 overflow-auto"> 
            <div className="col-12">
              <form onSubmit={onInfraSubmit}> 
                <div className="row bg-white rounded mx-0 col-xxxl-11">
                  <div className="col-12 border-0 border-bottom-0 table-responsive table-collapse">
                    <table className="table customTable"> 
                      <tbody> 
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-2">Pallets:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-3 mt-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={palletYes === "yes"} className="common-radio-deep-blue-input" type="radio" name="palletYes" id="palletYes" value="yes" hidden=""/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="palletYes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={palletYes === "no"} className="common-radio-deep-blue-input" type="radio" name="palletYes" id="palletYes1" value="no" hidden=""/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="palletYes1">No</label>
                            </div> 
                          </td>
                          <td className="col-auto mt-1">
                            <p className="mb-2">Qty:</p>
                          </td>
                          <td className="">
                            <input  type="number" name="pallet" onChange={(e)=>handleForm(e)} disabled={palletYes === "no"} className="form-control bg-white px-4 mb-2" placeholder=""/>
                            <span className="errorMsg">{palletYes==="no" ? null : errors["pallet"]}</span>
                          </td> 
                          <td className="">
                            <input type="text" name="palletRemark" onChange={(e)=>handleForm(e)} disabled={palletYes === "no"} className="form-control bg-white px-4 mb-2" placeholder="Remarks"/>
                          </td> 
                        </tr> 
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-2">Hand Pallet Truck(Hydraulic):</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-3 mt-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={handPalletYes === "yes"} className="common-radio-deep-blue-input" type="radio" name="handPalletYes" id="handPalletYes" value="yes" hidden=""/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="handPalletYes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={handPalletYes === "no"} className="common-radio-deep-blue-input" type="radio" name="handPalletYes" id="handPalletYes1" value="no" hidden=""/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="handPalletYes1">No</label>
                            </div> 
                          </td>
                          <td className="col-auto mt-1">
                            <p className="mb-2">Qty:</p>
                          </td>
                          <td className="">
                            <input type="number" name="handPallet" onChange={(e)=>handleForm(e)} disabled={handPalletYes === "no"} className="form-control bg-white px-4 mb-2" placeholder=""/>
                            <span className="errorMsg">{handPalletYes==="no" ? null : errors["handPallet"]}</span>
                          </td>  
                          <td></td> 
                        </tr>
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-2">Weighing Machine:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-4 mb-2 mt-2">
                            <div className="form-check common-radio-deep-blue mx-3 mt-1">
                              <input onChange={(e)=>handleChange(e)} checked={weighingMachineYes === "yes"} className="common-radio-deep-blue-input" type="radio" name="weighingMachineYes" id="weighingMachineYes" value="yes" hidden=""/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="weighingMachineYes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3 mt-1">
                              <input onChange={(e)=>handleChange(e)} checked={weighingMachineYes === "no"} className="common-radio-deep-blue-input" type="radio" name="weighingMachineYes" id="weighingMachineYes1" value="no" hidden=""/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="weighingMachineYes1">No</label>
                            </div> 
                          </td>
                          <td className="col-auto">
                            <p className="mb-0">Calliberated on:</p>
                          </td>
                          <td className="pb-4">
                            <label htmlFor="" className="mb-0 px-4 small text-uppercase">Valid from</label>
                            <input name="weighingMachineFrom" onChange={(e)=>handleForm(e)} disabled={weighingMachineYes === "no"} type="date" className="form-control bg-white px-4 mb-2" placeholder="" />
                            <span className="errorMsg">{weighingMachineYes==="no" ? null : errors["weighingMachineFrom"]}</span>
                          </td>
                          <td className="pb-4">
                            <label htmlFor="" className="mb-0 px-4 small text-uppercase">Valid till</label>
                            <input name="weighingMachineTill" onChange={(e)=>handleForm(e)} disabled={weighingMachineYes === "no"} type="date" className="form-control bg-white px-4 mb-2" placeholder="" />
                            <span className="errorMsg">{weighingMachineYes==="no" ? null : errors["weighingMachineTill"]}</span>
                          </td> 
                        </tr>
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-2">Picking Trolley:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-3 mt-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={pickingTrolleyYes === "yes"} className="common-radio-deep-blue-input" type="radio" name="pickingTrolleyYes" id="pickingTrolleyYes" value="yes" hidden=""/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="pickingTrolleyYes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={pickingTrolleyYes === "no"} className="common-radio-deep-blue-input" type="radio" name="pickingTrolleyYes" id="pickingTrolleyYes1" value="no" hidden=""/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="pickingTrolleyYes1">No</label>
                            </div> 
                          </td>
                          <td className="col-auto mt-1">
                            <p className="">Qty:</p>
                          </td>
                          <td className="">
                            <input type="number" name="pickingTrolley" onChange={(e)=>handleForm(e)} disabled={pickingTrolleyYes === "no"}  className="form-control bg-white px-4 mb-2" placeholder=""/>
                            <span className="errorMsg">{pickingTrolleyYes==="no" ? null : errors["pickingTrolley"]}</span>
                          </td>  
                          <td></td> 
                        </tr>
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-2">Hydraulic Dock Levler:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-3 mt-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={hydraulicYes === "yes"} className="common-radio-deep-blue-input" type="radio" name="hydraulicYes" id="hydraulicYes" value="yes" hidden=""/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="hydraulicYes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={hydraulicYes === "no"} className="common-radio-deep-blue-input" type="radio" name="hydraulicYes" id="hydraulicYes1" value="no" hidden=""/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="hydraulicYes1">No</label>
                            </div> 
                          </td>
                          <td className="col-auto mt-1">
                            <p className="mb-2">Qty:</p>
                          </td>
                          <td className="">
                            <input type="number" name="hydraulic" onChange={(e)=>handleForm(e)} disabled={hydraulicYes === "no"}  className="form-control bg-white px-4 mb-2" placeholder=""/>
                            <span className="errorMsg">{hydraulicYes==="no" ? null : errors["hydraulic"]}</span>
                          </td> 
                          <td></td>  
                        </tr>
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-2"> Battery Operated Pallet Truck(BOPT)</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-3 mt-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={batteryYes === "yes"} className="common-radio-deep-blue-input" type="radio" name="batteryYes" id="batteryYes" value="yes" hidden=""/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="batteryYes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={batteryYes === "no"} className="common-radio-deep-blue-input" type="radio" name="batteryYes" id="batteryYes1" value="no" hidden=""/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="batteryYes1">No</label>
                            </div> 
                          </td>
                          <td className="col-auto mt-1">
                            <p className="mb-2">Qty:</p>
                          </td>
                          <td className="">
                            <input type="number" name="battery" onChange={(e)=>handleForm(e)} disabled={batteryYes === "no"}  className="form-control bg-white px-4 mb-2" placeholder=""/>
                            <span className="errorMsg">{batteryYes==="no" ? null : errors["battery"]}</span>
                          </td>  
                          <td></td> 
                        </tr>
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-2">Forklift (Battery Operated):</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-4">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={forkliftYes === "yes"} className="common-radio-deep-blue-input" type="radio" name="forkliftYes" id="forkliftYes" value="yes" hidden=""/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="forkliftYes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={forkliftYes === "no"} className="common-radio-deep-blue-input" type="radio" name="forkliftYes" id="forkliftYes1" value="no" hidden=""/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="forkliftYes1">No</label>
                            </div> 
                          </td>
                          <td className="col-auto">
                            <p className="mb-0"> Capacity in ton:</p>
                          </td>
                          <td className="">
                            <input type="number" name="forklift" onChange={(e)=>handleForm(e)} disabled={forkliftYes === "no"}  className="form-control bg-white px-4 mb-2" placeholder="Ton Capacity"/>
                            <span className="errorMsg">{forkliftYes==="no" ? null : errors["forklift"]}</span>
                          </td> 
                          <td></td> 
                        </tr> 
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-2">Forklift (Diesel Operated):</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-4">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={forkliftDieselYes === "yes"} className="common-radio-deep-blue-input" type="radio" name="forkliftDieselYes" id="forkliftDieselYes" value="yes" hidden=""/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="forkliftDieselYes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={forkliftDieselYes === "no"} className="common-radio-deep-blue-input" type="radio" name="forkliftDieselYes" id="forkliftDieselYes1" value="no" hidden=""/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="forkliftDieselYes1">No</label>
                            </div> 
                          </td>
                          <td className="col-auto">
                            <p className="mb-0"> Capacity in ton:</p>
                          </td>
                          <td className="">
                            <input type="number" name="forkliftDiesel" onChange={(e)=>handleForm(e)} disabled={forkliftDieselYes === "no"}  className="form-control bg-white px-4 mb-2" placeholder="Ton Capacity"/>
                            <span className="errorMsg">{forkliftDieselYes==="no" ? null : errors["forkliftDiesel"]}</span>
                          </td> 
                          <td></td> 
                        </tr>
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-2">Electric Stacker:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-3 mt-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={electricYes === "yes"} className="common-radio-deep-blue-input" type="radio" name="electricYes" id="electricYes" value="yes" hidden=""/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="electricYes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={electricYes === "no"} className="common-radio-deep-blue-input" type="radio" name="electricYes" id="electricYes1" value="no" hidden=""/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="electricYes1">No</label>
                            </div> 
                          </td>
                          <td className="col-auto mt-1">
                            <p className="mb-2">Qty:</p>
                          </td>
                          <td className="">
                            <input type="number" name="electric" onChange={(e)=>handleForm(e)} disabled={electricYes === "no"}  className="form-control bg-white px-4 mb-2" placeholder=""/>
                            <span className="errorMsg">{electricYes==="no" ? null : errors["electric"]}</span>
                          </td>  
                          <td></td> 
                        </tr> 
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-1">Hydra Crane:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-4 mt-2">
                            <div className="form-check common-radio-deep-blue mx-3 mt-1">
                              <input onChange={(e)=>handleChange(e)} checked={hydraYes === "yes"} className="common-radio-deep-blue-input" type="radio" name="hydraYes" id="hydraYes" value="yes" hidden=""/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="hydraYes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3 mt-1">
                              <input onChange={(e)=>handleChange(e)} checked={hydraYes === "no"} className="common-radio-deep-blue-input" type="radio" name="hydraYes" id="hydraYes1" value="no" hidden=""/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="hydraYes1">No</label>
                            </div> 
                          </td>
                          <td className="col-auto">
                            <p className="mb-0">Load Capacity:</p>
                          </td>
                          <td className="">
                            <select name="hydra" onChange={(e)=>handleForm(e)} disabled={hydraYes === "no"} className="form-control custom-select bg-white px-4 common-select-deep-blue" id="exampleFormControlSelect1">
                              <option>Select</option>
                              <option>Delhi</option>
                              <option>Mumbai</option>
                              <option>Kolkata</option>
                            </select>
                          </td> 
                          <td>
                            <input type="text" name="hydraRemark" onChange={(e)=>handleForm(e)} disabled={hydraYes === "no"}  className="form-control bg-white px-4 mb-2" placeholder="Remarks"/>
                          </td> 
                        </tr> 
                        <tr>
                          <td className="">
                            <p className="mb-0 pb-2">Shrink / Stretch Wrap Machine:</p>
                          </td>
                          <td className="col-auto form-inline form-group form-inline py-4 mt-2">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={shrinkYes === "yes"} className="common-radio-deep-blue-input" type="radio" name="shrinkYes" id="shrinkYes" value="yes" hidden=""/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="shrinkYes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={shrinkYes === "no"} className="common-radio-deep-blue-input" type="radio" name="shrinkYes" id="shrinkYes1" value="no" hidden=""/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="shrinkYes1">No</label>
                            </div> 
                          </td>
                          <td className="col-auto">
                            <p className="mb-2">Qty:</p>
                          </td>  
                          <td>
                            <input type="number" name="shrink" onChange={(e)=>handleForm(e)} disabled={shrinkYes === "no"}  className="form-control bg-white px-4 mb-2" placeholder=""/>
                            <span className="errorMsg">{shrinkYes==="no" ? null : errors["shrink"]}</span>
                          </td> 
                          <td></td>
                        </tr> 
                        <tr>
                          <td className="">
                            <p className="mb-5 pb-1">Others:</p>
                          </td> 
                          <td className="" colSpan="4">
                            <textarea type="text" name="others" onChange={(e)=>handleForm(e)} className="form-control bg-white px-4 rounded-sm" placeholder="" rows="3"></textarea>
                            <span className="errorMsg">{errors["others"]}</span>
                          </td>  
                        </tr>
                      </tbody>
                      
                    </table>
                  </div>

                  <div className="col-12 mt-4">
                    <div className="row justify-content-end">
                      <div className="col-auto">
                        {/* <button type="button" className="btn btn-outline-deep-blue add-class remove-class" data-add-target=".steps5" data-add-target-class="d-none" data-remove-target=".steps4" data-remove-target-class="d-none">Back</button> */}
                      </div>
                      <div className="col-auto">
                        <button type="submit" className="btn btn-deep-blue add-class remove-class">Save</button>
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

export default MHInfraFormOld
