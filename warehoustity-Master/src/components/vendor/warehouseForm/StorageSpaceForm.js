import React, {useState} from 'react';
import { Formik, Form, Field } from 'formik';

const StorageSpaceForm = () => {

  const [yesForm, setYesForm] = useState({
    racksSlottedYes:"yes",
    racksShelveYes:"yes",
    racksHDRYes:"yes",
    parkingYes:"yes"
  })

  const handleYes =(e)=>{
    setYesForm({...yesForm, [e.target.name]:e.target.value})
  }

  const {racksSlottedYes, parkingYes}=yesForm;

  // Storege Form


    return (
        <>
          
          <div className="row align-items-center pb-3 mx-0"> 
            <div className="col-12">

            <Formik
              initialValues={{
      "storageType": "floorarea",
      "availableSpace": "",
      "loadingAndUnloadingBays": "",
      "palletsOnFloor": "",
      "parkingArea": "",
      "warehouse":1,
      "floors": [
        {
          "floorType": "groundFloor",
          "floorDimension": {
              "dimension":"SQFT",
              "length": "",
              "breath": "",
              "height": ""
          },
          "unit":"FEET"
      },
      {
        "floorType": "basement",
        "floorDimension": {
            "dimension":"SQFT",
            "length": "",
            "breath": "",
            "height": ""
        },
        "unit":"FEET"
    },
    {
          "floorType": "firstFloor",
          "floorDimension": {
              "dimension":"SQFT",
              "length": "",
              "breath": "",
              "height": ""
          },
          "unit":"FEET"
      },
      
    {
      "floorType": "secondFloor",
      "floorDimension": {
          "dimension":"SQFT",
          "length": "",
          "breath": "",
          "height": ""
      },
      "unit":"FEET"
  }],
      "racks": [{
          "name": "mukesh",
          "rackInfo":{
              "quantity": "",
              "length": "",
              "breath": "",
              "height": ""
          }
      },{
          "name": "shelveracks",
          "rackInfo":{
              "quantity": "",
              "length": "",
              "breath": "",
              "height": ""
          }
      }],
      "dockSize": {
         "height":"",
         "width":"",
         "heightFromGound":""
      }
  }}
              // validationSchema={contactDetailsSchema}
              onSubmit={fields => {
                console.log("---->", fields)

            
              }}
              
              render={({values, errors, status,onChange,setFieldValue, touched }) => (

              <Form> 
                <div className="row bg-white rounded mx-0 col-xxxl-11">
                  <div className="form-group form-inline col-12 mb-3 mt-2">
                    <label htmlFor="staticEmail" className="mb-1 mr-3">Storage Type:</label>
                      <div className="form-check common-radio-deep-blue mx-3">
                        <Field name="storageType" className="common-radio-deep-blue-input" type="radio" id="floor-area" value="floorarea" hidden=""/>
                        <label className="common-radio-deep-blue-label pl-4" htmlFor="floor-area">Floor Area</label>
                      </div>
                      <div className="form-check common-radio-deep-blue mx-3">
                        <Field name="storageType" className="common-radio-deep-blue-input" type="radio" id="pallet-position" value="palletposition" hidden=""/>
                        <label className="common-radio-deep-blue-label pl-4" htmlFor="pallet-position">Pallet Position</label>
                      </div>
                  </div>
                  <div className="col-12 border-0 border-bottom-0 table-responsive table-collapse">
                    <table className="table"> 
                      <tbody> 
                        <tr>
                          <td className="w-160px">
                            <p className="mb-3">Floor: <sup className="text-danger">*</sup></p>
                          </td>
                          <td className="col-auto"></td>
                          <td className="col-auto"></td>
                          <td className="w-150px">
                            <div className="common-checkbox-deep-blue2 position-relative mb-2 mx-auto d-inline-block">
                              <Field name={`floors[${0}].floorType`} className="common-checkbox-deep-blue2-input" type="checkbox" value="basement" id="defaultCheck1"/>
                              <label className="common-checkbox-deep-blue2-label pl-4 mr-3" htmlFor="defaultCheck1">
                              Basement
                           
                              </label>
                            </div>
                          </td> 
                          <td className="w-150px">
                            <div className="common-checkbox-deep-blue2 position-relative mb-2 mx-auto d-inline-block">
                              <Field name={`floors[${1}].floorType`} className="common-checkbox-deep-blue2-input" type="checkbox" value="groundFloor" id="defaultCheck2"/>
                              <label className="common-checkbox-deep-blue2-label pl-4 mr-3" htmlFor="defaultCheck2">     Ground Floor 
                              </label>
                            </div>
                          </td> 
                          <td className="w-150px">
                            <div className="common-checkbox-deep-blue2 position-relative mb-2 mx-auto d-inline-block">
                              <Field name={`floors[${2}].floorType`} className="common-checkbox-deep-blue2-input" type="checkbox" value="firstFloor" id="defaultCheck3"/>
                              <label className="common-checkbox-deep-blue2-label pl-4 mr-3" htmlFor="defaultCheck3">1st Floor
                              </label>
                            </div>
                          </td>
                          <td className="w-150px">
                            <div className="common-checkbox-deep-blue2 position-relative mb-2 mx-auto d-inline-block">
                              <Field name={`floors[${3}].floorType`} className="common-checkbox-deep-blue2-input" type="checkbox" value="seceondFloor" id="defaultCheck4"/>
                              <label className="common-checkbox-deep-blue2-label pl-4 mr-3" htmlFor="defaultCheck4">2nd Floor
                              </label>
                            </div>
                          </td>
                        </tr> 
                        <tr>
                          <td className="w-100px">
                          </td>
                          <td className="col-auto">
                            <select onChange={(e)=>{
                              let a=`floors[${0}].unit`
                              let b=`floors[${1}].unit`
                              let c=`floors[${2}].unit`
                              let d=`floors[${3}].unit`

                              setFieldValue(a,e.target.value)
                              setFieldValue(b,e.target.value)
                              setFieldValue(c,e.target.value)
                              setFieldValue(d,e.target.value)

                            }} className="form-control custom-select bg-white px-4 common-select-deep-blue" id="sdds">
                              <option>Select Unit</option>
                              <option>FEET</option>
                              <option>INCH</option>
                              <option>M</option>
                            </select>
                          </td>
                          <td className="col-auto"></td>
                          <td className="w-150px">
                            <Field type="number" name={`floors[${0}][floorDimension].length`} className="form-control bg-white px-4" placeholder="Length"/>
                          </td> 
                          <td className="w-150px">
                            <Field type="number" name={`floors[${1}][floorDimension].length`} className="form-control bg-white px-4" placeholder="Length"/>
                          </td> 
                          <td className="w-150px">
                            <Field type="number" name={`floors[${2}][floorDimension].length`} className="form-control bg-white px-4" placeholder="Length"/>
                          </td>
                          <td className="w-150px">
                            <Field type="number" name={`floors[${3}][floorDimension].length`} className="form-control bg-white px-4" placeholder="Length"/>
                          </td>
                        </tr> 
                        <tr>
                          <td className="w-100px">
                          </td>
                          <td className="col-auto"> 
                          </td>
                          <td className="col-auto"></td>
                          <td className="w-150px">
                            <Field type="number" name={`floors[${0}][floorDimension].breath`} className="form-control bg-white px-4" placeholder="Breadth"/>
                          </td> 
                          <td className="w-150px">
                            <Field type="number" name={`floors[${1}][floorDimension].breath`} className="form-control bg-white px-4" placeholder="Breadth"/>
                          </td> 
                          <td className="w-150px">
                            <Field type="number" name={`floors[${2}][floorDimension].breath`} className="form-control bg-white px-4" placeholder="Breadth"/>
                          </td>
                          <td className="w-150px">
                            <Field type="number" name={`floors[${3}][floorDimension].breath`} className="form-control bg-white px-4" placeholder="Breadth"/>
                          </td>
                        </tr> 
                        <tr>
                          <td className="w-100px">
                          </td>
                          <td className="col-auto"> 
                          </td>
                          <td className="col-auto"></td>
                          <td className="w-150px">
                            <Field type="number" name={`floors[${0}][floorDimension].height`} className="form-control bg-white px-4" placeholder="Height"/>
                          </td> 
                          <td className="w-150px">
                            <Field type="number" name={`floors[${1}][floorDimension].height`} className="form-control bg-white px-4" placeholder="Height"/>
                          </td> 
                          <td className="w-150px">
                            <Field type="number" name={`floors[${2}][floorDimension].height`} className="form-control bg-white px-4" placeholder="Height"/>
                          </td>
                          <td className="w-150px">
                            <Field type="number" name={`floors[${3}][floorDimension].height`} className="form-control bg-white px-4" placeholder="Height"/>
                          </td>
                        </tr>
                        <tr>
                          {console.log("fjdjfdj",values.floors)}
                          <td className="w-100px">
                            <p className="mb-0">Total Area({values.floors?values.floors[0].unit==="FEET"?"sqft":"":""}
                            {values.floors?values.floors[0].unit==="INCH"?"sqin":"":""}
                            {values.floors?values.floors[0].unit==="M"?"sqm":"":""}):</p>
                          </td>
                          <td className="col-auto">
                            <input className="form-control bg-white px-4"/> 
                          </td>
                          <td className="col-auto"></td>
                          <td className="w-150px">
                            <input className="form-control bg-white px-4" value={(values.floors[0].floorDimension.length)*(values.floors[0].floorDimension.breath)} readOnly />
                          </td> 
                          <td className="w-150px">
                            <input className="form-control bg-white px-4" value={(values.floors[1].floorDimension.length)*(values.floors[1].floorDimension.breath)} readOnly />
                          </td> 
                          <td className="w-150px">
                            <input className="form-control bg-white px-4" value={(values.floors[2].floorDimension.length)*(values.floors[2].floorDimension.breath)} readOnly />
                          </td>
                          <td className="w-150px">
                            <input className="form-control bg-white px-4" value={(values.floors[3].floorDimension.length)*(values.floors[3].floorDimension.breath)} readOnly />
                          </td>
                        </tr>
                        <tr>
                          <td className="w-100px">
                            <p className="mb-0">Pallets on Floor:</p>
                          </td>
                          <td className="col-auto">
                            <Field  name="palletsOnFloor" type="number" className="form-control bg-white px-4" placeholder="0"/> 
                          </td>
                          <td className="col-auto"></td>
                          <td className="w-150px">
                          </td> 
                          <td className="w-150px">
                          </td> 
                          <td className="w-150px">
                          </td>
                          <td className="w-150px">
                          </td>
                        </tr> 
                        <tr>
                          <td className="w-100px">
                            <p className="mb-0">Racks (Slotted Angle) - No of Bins:</p>
                          </td>
                          <td className="col-auto form-inline form-group py-3 mb-0">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <Field name={`racks[${0}].name`} onClick={(e)=>handleYes(e)} checked={racksSlottedYes==="yes"} className="common-radio-deep-blue-input" type="radio" id="racksSlotted" value="racksSlotted" hidden=""/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="racksSlotted">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <Field name={`racks[${0}].name`} onClick={(e)=>handleYes(e)} checked={racksSlottedYes==="no"} className="common-radio-deep-blue-input" type="radio" id="racksSlotted1" value="no" hidden=""/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="racksSlotted1">No</label>
                            </div> 
                          </td>
                          <td className="col-auto"></td>
                          <td className="w-150px">
                            <Field type="number" name={`racks[${0}].rackInfo.quantity`} className="form-control bg-white px-4" placeholder="Qty"/>
                          </td> 
                          <td className="w-150px">
                            <Field type="number" name={`racks[${0}].rackInfo.length`} className="form-control bg-white px-4" placeholder="L"/>
                          </td> 
                          <td className="w-150px">
                            <Field type="number" name={`racks[${0}].rackInfo.breath`} className="form-control bg-white px-4" placeholder="B"/>
                          </td>
                          <td className="w-150px">
                            <Field type="number" name={`racks[${0}].rackInfo.height`} className="form-control bg-white px-4" placeholder="H"/>
                          </td>
                        </tr>
                        <tr>
                          <td className="w-100px">
                            <p className="mb-0">Racks (Shelve Racks) - No of Shelve:</p>
                          </td>
                          <td className="col-auto form-inline form-group py-3 mb-0">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <Field name={`racks[${1}].name`} className="common-radio-deep-blue-input" type="radio" id="racksShelveYes" value="shelveracks" hidden=""/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="racksShelveYes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <Field name={`racks[${1}].name`} className="common-radio-deep-blue-input" type="radio" id="racksShelveYes1" value="no" hidden=""/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="racksShelveYes1">No</label>
                            </div> 
                          </td>
                          <td className="col-auto"></td>
                          <td className="w-150px">
                            <Field type="number" name={`racks[${1}].rackInfo.quantity`} className="form-control bg-white px-4" placeholder="Qty"/>
                          </td> 
                          <td className="w-150px">
                            <Field type="number" name={`racks[${1}].rackInfo.length`}  className="form-control bg-white px-4" placeholder="L"/>
                          </td> 
                          <td className="w-150px">
                            <Field type="number" name={`racks[${1}].rackInfo.breath`}  className="form-control bg-white px-4" placeholder="B"/>
                          </td>
                          <td className="w-150px">
                            <Field type="number" name={`racks[${1}].rackInfo.height`}  className="form-control bg-white px-4" placeholder="H"/>
                          </td>
                        </tr>
                        {/* <tr>
                          <td className="w-100px">
                            <p className="mb-0">Racks (HDR) - No of Pallet Positions:</p>
                          </td>
                          <td className="col-auto form-inline form-group py-3 mb-0">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input  name="racksHDRYes" onClick={(e)=>handleYes(e)} checked={racksHDRYes==="yes"} className="common-radio-deep-blue-input" type="radio" id="racksHDRYes" value="yes" hidden=""/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="racksHDRYes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input  name="racksHDRYes" onClick={(e)=>handleYes(e)} checked={racksHDRYes==="no"} className="common-radio-deep-blue-input" type="radio" id="racksHDRYes1" value="no" hidden=""/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="racksHDRYes1">No</label>
                            </div> 
                          </td>
                          <td className="col-auto"></td>
                          <td className="w-150px">
                            <input type="text"  disabled={racksHDRYes==="no"} className="form-control bg-white px-4" placeholder="Qty"/>
                          </td> 
                          <td className="w-150px">
                            <input type="text"  disabled={racksHDRYes==="no"} className="form-control bg-white px-4" placeholder="L"/>
                          </td> 
                          <td className="w-150px">
                            <input type="text"  disabled={racksHDRYes==="no"} className="form-control bg-white px-4" placeholder="B"/>
                          </td>
                          <td className="w-150px">
                            <input type="text"  disabled={racksHDRYes==="no"}className="form-control bg-white px-4" placeholder="H"/>
                          </td>
                        </tr> */}
                        <tr>
                          <td className="w-100px">
                            <p className="mb-0">Available Space(sqft): </p>
                          </td>
                          <td className="col-auto">
                            <Field name="availableSpace" type="number" className="form-control bg-white px-4" placeholder="Enter Space"/> 
                          </td>
                          <td className="col-auto"></td>
                          <td className="w-150px">
                          </td> 
                          <td className="w-150px">
                          </td> 
                          <td className="w-150px">
                          </td>
                          <td className="w-150px">
                          </td>
                        </tr>
                        <tr>
                          <td className="w-100px">
                            <p className="mb-0">No. of Loading/ unloading Bays:</p>
                          </td>
                          <td className="col-auto">
                            <Field  name="loadingAndUnloadingBays" type="number" className="form-control bg-white px-4" placeholder="Enter Bays"/> 
                          </td>
                          <td className="col-auto"></td>
                          <td className="w-150px">
                          </td> 
                          <td className="w-150px">
                          </td> 
                          <td className="w-150px">
                          </td>
                          <td className="w-150px">
                          </td>
                        </tr>
                        <tr>
                          <td className="w-100px">
                            <p className="mb-0">Dock Size:</p>
                          </td>
                          <td className="col-auto">
                            <Field type="number" name={`dockSize.heightFromGound`} className="form-control bg-white px-4" placeholder="Height From Ground"/> 
                          </td>
                          <td className="col-auto"></td>
                          <td className="w-150px" colSpan="2">
                            <Field type="number" name={`dockSize.height`} className="form-control bg-white px-4" placeholder="Enter Height"/> 
                          </td> 
                          <td className="w-150px" colSpan="2">
                            <Field type="number" name={`dockSize.width`} className="form-control bg-white px-4" placeholder="Enter Width"/> 
                          </td>  
                        </tr>
                        <tr>
                          <td className="w-100px">
                            <p className="mb-0">Parking Area (sqft):</p>
                          </td>
                          <td className="col-auto form-inline form-group py-3 mt-1 mb-0">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input name="parkingYes" onClick={(e)=>handleYes(e)} checked={parkingYes==="yes"} className="common-radio-deep-blue-input" type="radio" id="parkingYes" value="yes" hidden=""/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="parkingYes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input name="parkingYes" onClick={(e)=>handleYes(e)} checked={parkingYes==="no"} className="common-radio-deep-blue-input" type="radio" id="parkingYes1" value="no" hidden=""/>
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="parkingYes1">No</label>
                            </div> 
                          </td>
                          <td className="col-auto"></td>
                          <td className="w-150px" colSpan="2">
                            <Field type="number" name="parkingArea" disabled={parkingYes==="no"} className="form-control bg-white px-4" placeholder=""/>
                          </td> 
                          <td className="w-150px"> 
                          </td> 
                          <td className="w-150px"> 
                          </td> 
                        </tr>
                      </tbody>
                      
                    </table>
                  </div>

                  <div className="col-12 mt-2">
                    <div className="row justify-content-end">
                      <div className="col-auto">
                        {/* <button type="button" className="btn btn-outline-deep-blue add-className remove-className" data-add-target=".steps3" data-add-target-class="d-none" data-remove-target=".steps2" data-remove-target-class="d-none">Back</button> */}
                      </div>
                      <div className="col-auto">
                        <button type="submit" className="btn btn-deep-blue add-className remove-className">Save</button>
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

export default StorageSpaceForm
