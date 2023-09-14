import React, {useState, useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {updateForm80, changeWarehouseStatus} from '../../../store/actions/vendor/warehouseList';
import Spinner from 'react-bootstrap/Spinner';
import FormSuccess from '../../helper/FormSuccess';
import ErrorCard, { FormErrorCard } from '../../helper/ErrorCard';
import { CardLoader } from '../../helper/CustomLoader';

const FormEighty = () => {

  const dispatch = useDispatch()
  const data=useSelector((state)=>state.WAREHOUSELIST);
  // console.log("Form 80 Data===>", data.singleFormData)

  const  [jsonData, setJsonData] =useState([
    {
      "heading": "Accessibility",
      "parameter": "How wide is the Road Access to the warehouse from the main road - Ft",
      "input": "",
      "remark": ""
  },
    {
      "heading": "Accessibility",
      "parameter": "Distance from Fire Station (KMs)",
      "input": "",
      "remark": ""
    },
     
        {
            "heading": "Accessibility",
            "parameter": "How wide is the Road / Pathway inside the premises - Ft.",
            "input": "",
            "remark": ""
        },
        {
            "heading": "Accessibility",
            "parameter": "Is the WH in residential area?",
            "input": "",
            "remark": ""
        },
        {
            "heading": "Accessibility",
            "parameter": "Is the WH in industrial area or any WH zone??",
            "input": "",
            "remark": ""
        },
        {
            "heading": "Accessibility",
            "parameter": "Distance from Police Station (KMs)",
            "input": "",
            "remark": ""
        },
        
        {
          "heading": "Accessibility",
          "parameter": "Distance from Nearest School (KMs)",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Accessibility",
          "parameter": "Distance from Highway Road (KMs)",
          "input": "",
          "remark": ""
        },
      
        {
          "heading": "Accessibility",
          "parameter": "Distance from transport Hub (KMs)",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Accessibility",
          "parameter": "Distance from warehousing Hub (KMs)",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Accessibility",
          "parameter": "Distance from Metro/ Bus Station (KMs)",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Accessibility",
          "parameter": "Distance from City Centre (KMs)",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Accessibility",
          "parameter": "Distance from ICD/CFS/Port (KMs)",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Accessibility",
          "parameter": "Distance from the Labour hub",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Accessibility",
          "parameter": "Public transport availability",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Accessibility",
          "parameter": "Distance from Hospital (KMs)",
          "input": "",
          "remark": ""
        },
        //
        {
          "heading": "Accommodation",
          "parameter": "Are additional rooms available in the compound to be used as residence for Supervisors / workers?",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Accommodation",
          "parameter": "How nearest is the resdential colony for workers from the warehouse?",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Affiliation",
          "parameter": "Is there any Labour Union in the area?",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Affiliation",
          "parameter": "Is there any Transportation Union in the area?",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Construction",
          "parameter": "Construction Type (RCC / Mixed / Shed)",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Construction",
          "parameter": "Construction Age (No of Years)",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Construction",
          "parameter": "Transparent Sheets in the roof (for Day Light) - Qty",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Construction",
          "parameter": "Turbo Ventilators in the shed - Qty",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Construction",
          "parameter": "Flooring Type – Trimix / Normal / Epoxy",
          "input": "",
          "remark": ""
        },
        //
        {
          "heading": "Construction",
          "parameter": "Shutter height from the platform",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Construction",
          "parameter": "Roof height of the storage area from the platform",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Construction",
          "parameter": "How many Loading / Unloading Docks avaibale in the warehouse?",
          "input": "",
          "remark": ""
        },
   
    
       
        {
          "heading": "Accommodation",
          "parameter": "Is the WH has Hydraulic Loading/Unloading Docs?",
          "input": "",
          "remark": ""
        },
  
        {
          "heading": "Construction",
          "parameter": "Dock height from the ground",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Construction",
          "parameter": "General apearance of the floor (Good / Bad / Ugly)",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Accommodation",
          "parameter": "What is the size of the parking area for personal vehicles inside the coumpound?",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Accommodation",
          "parameter": "What is the size of the parking area for trucks inside the coumpound?",
          "input": "",
          "remark": ""
        },
   
        {
          "heading": "Accommodation",
          "parameter": "Is there a meeting room available in the warehouse?",
          "input": "",
          "remark": ""
        },
  
        {
          "heading": "Accommodation",
          "parameter": "Is the WH structure capable to take load of solar panels?",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Electricity & Electrical Fittings",
          "parameter": "Is there Genset Area available in the coumpound.",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Electricity & Electrical Fittings",
          "parameter": "Electricity Connection (Kw)",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Electricity & Electrical Fittings",
          "parameter": "Dedicated Transformer (Kva)",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Electricity & Electrical Fittings",
          "parameter": "Electrical fittings /wirings /gadgets are with ISI marks.",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Electricity & Electrical Fittings",
          "parameter": "Electrical Earthing is available	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Electricity & Electrical Fittings",
          "parameter": "Is there is Electricity panel / Power Panel Room in the compound ?	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Electricity & Electrical Fittings",
          "parameter": "No open / loose wiring in and outside of the warehouse	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Electricity & Electrical Fittings",
          "parameter": "Is the WH using any green energy? Eg - Solar power	",
          "input": "",
          "remark": ""
        },
    
        {
          "heading": "Emergency Exit & Fire Prevention",
          "parameter": "No of Emergency Door available inside the warehouse?	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Emergency Exit & Fire Prevention",
          "parameter": "Is there an assembly area earmarked during fire breakout?	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Emergency Exit & Fire Prevention",
          "parameter": "What is the size of open area? - SQ Ft	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Emergency Exit & Fire Prevention",
          "parameter": "Are the fire fighting equipments in approachable limits inside the WH?	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Emergency Exit & Fire Prevention",
          "parameter": "Are the fire fighting equipments inside the WH are in adequate qty?	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Emergency Exit & Fire Prevention",
          "parameter": "Are the workers trained to fire fight and use fire fighting equipments?	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Emergency Exit & Fire Prevention",
          "parameter": "Is the evacuation route clearly marked and visible inside the warehouse?	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Emergency Exit & Fire Prevention",
          "parameter": "Emergency alarm is clearly audible, supported by battery and alarm buttons are available inside WH?	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Environment Protection",
          "parameter": "Does the compound has Green belt / plantation?	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Environment Protection",
          "parameter": "Is there a Rain Water Harvesting / Drainage system?	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Environment Protection",
          "parameter": "Is the open area well metteled?	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Environment Protection",
          "parameter": "Are the Sewage pipes connected to a sewage Pit ?	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Environment Protection",
          "parameter": "Are the Sewage pipes connected to the approved system of the area?	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Environment Protection",
          "parameter": "Ground contamination due to release of / keeping of chemical is taken care of?	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Environment Protection",
          "parameter": "Is the PUC getting done of the air pollutant releasing equipments as per Govt norms?	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Environment Protection",
          "parameter": "Handling of all of type of waste inluding Hazardous waste within WH premises is as per defined norms?	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Environment Protection",
          "parameter": "Disposal of all type of waste inluding Hazardous waste within WH premises is as per defined norms?	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Policy",
          "parameter": "Policy for child labour is available?	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Policy",
          "parameter": "Policy for ethical ways of conducting business is available?	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Policy",
          "parameter": "Policy for environmental protection is available?	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Policy",
          "parameter": "Policy for worker/labour insurance, compensation and benefits is available?	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Safety & Security	",
          "parameter": "Is the Warehouse inside a gated compound?	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Safety & Security	",
          "parameter": "Aprox Height of the Compound Boundary Wall height - Ft	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Safety & Security	",
          "parameter": "How far is HT (high tension) electric line from the WH premise - KMs	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Safety & Security	",
          "parameter": "Are their Glass pieces on boundary wall, as a safety maeasure.	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Safety & Security	",
          "parameter": "Are there Barbed Wire over boundary wall	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Safety & Security	",
          "parameter": "No. of gates into the premises compound	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Safety & Security	",
          "parameter": "Is there a proper Security Room at the main gate ?	",
          "input": "",
          "remark": ""
        },
     
        {
          "heading": "Warehouse Operations",
          "parameter": "Are the windows on side walls are properly pilferage proof?	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Warehouse Operations",
          "parameter": "Is WH operational for 24 hrs?	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Warehouse Operations",
          "parameter": "Does the WH operator provides Handling Equipments?	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Warehouse Operations",
          "parameter": "Does the WH operator provides Labour?	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Warehouse Operations",
          "parameter": "Are the workers/labours working in WH are permanent?	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Safety & Security	",
          "parameter": "Is the complete premises under CCTV survellience?	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Warehouse Operations",
          "parameter": "Is there a Weigh Bridge inside the WH premises?	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Worker Facility, Health & Safety	",
          "parameter": "Is there a Pantry area available within the warehouse premises ?	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Worker Facility, Health & Safety	",
          "parameter": "Are there washroosm for staff / workers?	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Worker Facility, Health & Safety	",
          "parameter": "Is there a creche available inside WH premises?	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Worker Facility, Health & Safety	",
          "parameter": "Are there enough lights in the open area in the night?	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Worker Facility, Health & Safety	",
          "parameter": "Source of Water in the warehouse (for regular use)?	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Worker Facility, Health & Safety	",
          "parameter": "Is drinking water available and accessible to all 24hrs?	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Worker Facility, Health & Safety	",
          "parameter": "Are the basic safety gears available for the labours/workers?	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Worker Facility, Health & Safety	",
          "parameter": "Are the safety signs visible and adequately availble inside the WH as well as WH premises?	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Worker Facility, Health & Safety	",
          "parameter": "Are the first aid boxes adequately available inside the WH?	",
          "input": "",
          "remark": ""
        },
        {
          "heading": "Worker Facility, Health & Safety	",
          "parameter": "Is there an Ambulance parked 24/7 inside the WH premises?	",
          "input": "",
          "remark": ""
        }]
)


useEffect(() => {

  if(data.singleFormData.formEightyInfo && data.singleFormData.formEightyInfo.length>0){
    setJsonData(
      data.singleFormData.formEightyInfo.map((item, i)=>{
        return (
          {
            "heading": item.heading,
            "parameter": item.parameter,
            "input": item.input,
            "remark": item.remark
          }
        )
      })
    )
  }

}, [data.singleFormData.formEightyInfo]);

const eightySchema = Yup.object().shape({
  formEighty: Yup.array().of(
    Yup.object().shape({
      input: Yup.string().matches(/^[A-Za-z ]*$/, 'Please enter valid')
            .required('Required'),
  
    remark: Yup.string().matches(/^[A-Za-z ]*$/, 'Please enter valid')
}),
  )
});


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

    <div className="row justify-content-end align-items-center py-3 px-3 mx-0 w-100"> 
      <div className="col-12">

      <Formik
          enableReinitialize={true}
          validationSchema={eightySchema}
            initialValues={{"formEighty":  jsonData }}
            onSubmit={fields => {
              fields["warehouse"] = data.singleFormData.id;
              dispatch(updateForm80(fields))
            }}
            
            render={({ values,  errors, status,onChange, touched }) =>{
              return(
                <Form>

        <div className="row">
          <div className="col-12 px-0 table-responsive table-gray-admin">
            <table className="table">
              <thead>
                <tr>
                  <th className="w-100px">S.NO</th>
                  <th>Headings</th>
                  <th className="mw-300px">Parameters</th> 
                  <th className="">Whs Status</th> 
                  <th className="">Whs Remark</th> 

                  <th className="">Input</th> 
                  <th className="text-center">Remark</th> 
                </tr>
              </thead>
              <tbody> 
              {values.formEighty.length > 0 &&
                  values.formEighty.map((eighty, index) => {
                    const eightyErrors = (errors.formEighty?.length && errors.formEighty[index]) || {};
                    const eightyTouched = (touched.formEighty?.length && touched.formEighty[index]) || {};
                    return(
                      <tr key={index}>
                        <td>{index+1}</td>
                        <td>{eighty.heading}</td>
                        <td>{eighty.parameter}</td>
                        <td>{data.singleFormData&&
                        data.singleFormData.formEightyremark&&data.singleFormData.formEightyremark.formEighties&&
                        data.singleFormData.formEightyremark.formEighties[index].whsstatus===true?"okay":"not okay"}</td>
                          <td>{data.singleFormData&&
                        data.singleFormData.formEightyremark&&data.singleFormData.formEightyremark.formEighties&&
                        data.singleFormData.formEightyremark.formEighties[index].whsremark}</td>
                        <td>
                          
                          <Field type="text" name={`formEighty.${index}.input`} className={'form-control border-1 w-150px'+ (eightyErrors.input && eightyTouched.input ? ' is-invalid' : '')} />
                          <ErrorMessage name={`formEighty.${index}.input`} component="div" className="invalid-feedback" />
                        </td>
                        <td>
                          <Field type="text"  name={`formEighty.${index}.remark`} className="form-control border-1 w-150px"/>
                        </td>
                      </tr>
                    )
                  })}

                {/* <tr>
                  <td>2</td>
                  <td>Accessibility</td>
                  <td>How wide is the Road / Pathway inside the premises - Ft.</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr> */}
                {/* <tr>
                  <td>3</td>
                  <td>Accessibility</td>
                  <td>Is the WH in residential area?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr> */}
                {/* <tr>
                  <td>4</td>
                  <td>Accessibility</td>
                  <td>Is the WH in industrial area or any WH zone?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr> */}
                {/* <tr>
                  <td>5</td>
                  <td>Accessibility</td>
                  <td>Distance from Police Station (KMs)</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr> */}
                {/* <tr>
                  <td>6</td>
                  <td>Accessibility</td>
                  <td>Distance from Fire Station (KMs)</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>Accessibility</td>
                  <td>Distance from Nearest School (KMs)</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>Accessibility</td>
                  <td>Distance from Highway Road (KMs)</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>Accessibility</td>
                  <td>Distance from Hospital (KMs)</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>Accessibility</td>
                  <td>Distance from transport Hub (KMs)</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>11</td>
                  <td>Accessibility</td>
                  <td>Distance from warehousing Hub (KMs)</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>Accessibility</td>
                  <td>Distance from Metro/ Bus Station (KMs)</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>13</td>
                  <td>Accessibility</td>
                  <td>Distance from City Centre (KMs)</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>14</td>
                  <td>Accessibility</td>
                  <td>Distance from ICD/CFS/Port (KMs)</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>15</td>
                  <td>Accessibility</td>
                  <td>Distance from the Labour hub</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>16</td>
                  <td>Accessibility</td>
                  <td>Public transport availability </td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>17</td>
                  <td>Accommodation</td>
                  <td>Are additional rooms available in the compound to be used as residence for Supervisors / workers?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>18</td>
                  <td>Accommodation</td>
                  <td>How nearest is the resdential colony for workers from the warehouse?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>19</td>
                  <td>Affiliation</td>
                  <td>Is there any Labour Union in the area?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>20</td>
                  <td>Affiliation</td>
                  <td>Is there any Transportation Union in the area?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>21</td>
                  <td>Construction</td>
                  <td>Construction Type (RCC / Mixed / Shed)</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>22</td>
                  <td>Construction</td>
                  <td>Construction Age (No of Years)</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>23</td>
                  <td>Construction</td>
                  <td>Transparent Sheets in the roof (for Day Light) - Qty</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>24</td>
                  <td>Construction</td>
                  <td>Turbo Ventilators in the shed - Qty</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>25</td>
                  <td>Construction</td>
                  <td>Flooring Type – Trimix / Normal / Epoxy</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>26</td>
                  <td>Construction</td>
                  <td>General apearance of the floor (Good / Bad / Ugly)</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>27</td>
                  <td>Construction</td>
                  <td>Dock height from the ground</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>28</td>
                  <td>Construction</td>
                  <td>Shutter height from the platform</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>29</td>
                  <td>Construction</td>
                  <td>Roof height of the storage area from the platform</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>30</td>
                  <td>Construction</td>
                  <td>How many Loading / Unloading Docks avaibale in the warehouse?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>31</td>
                  <td>Construction</td>
                  <td>Is the WH has Hydraulic Loading/Unloading Docs? </td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>32</td>
                  <td>Construction</td>
                  <td>What is the size of the parking area for trucks inside the coumpound?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>33</td>
                  <td>Construction</td>
                  <td>What is the size of the parking area for personal vehicles inside the coumpound?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>34</td>
                  <td>Construction</td>
                  <td>Is there a meeting room available in the warehouse?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>35</td>
                  <td>Construction</td>
                  <td>Side wall ventilation options</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>36</td>
                  <td>Construction</td>
                  <td>Is the WH structure capable to take load of solar panels?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>37</td>
                  <td>Electricity & Electrical Fittings</td>
                  <td>Is there Genset Area available in the coumpound. </td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>38</td>
                  <td>Electricity & Electrical Fittings</td>
                  <td>Electricity Connection (Kw)</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>39</td>
                  <td>Electricity & Electrical Fittings</td>
                  <td>Dedicated Transformer (Kva)</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>40</td>
                  <td>Electricity & Electrical Fittings</td>
                  <td>Electrical fittings /wirings /gadgets are with ISI marks.</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>41</td>
                  <td>Electricity & Electrical Fittings</td>
                  <td>Electrical Earthing is available </td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>42</td>
                  <td>Electricity & Electrical Fittings</td>
                  <td>Is there is Electricity panel / Power Panel Room in the compound ?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>43</td>
                  <td>Electricity & Electrical Fittings</td>
                  <td>No open / loose wiring in and outside of the warehouse</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>44</td>
                  <td>Electricity & Electrical Fittings</td>
                  <td>Is the WH using any green energy? Eg - Solar power</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>45</td>
                  <td>Emergency Exit & Fire Prevention</td>
                  <td>No of Emergency Door available inside the warehouse?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>46</td>
                  <td>Emergency Exit & Fire Prevention</td>
                  <td>Is there an assembly area earmarked during fire breakout? </td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>47</td>
                  <td>Emergency Exit & Fire Prevention</td>
                  <td>What is the size of open area? - SQ Ft</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>48</td>
                  <td>Emergency Exit & Fire Prevention</td>
                  <td>Are the fire fighting equipments in approachable limits inside the WH?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>49</td>
                  <td>Emergency Exit & Fire Prevention</td>
                  <td>Are the fire fighting equipments inside the WH are in adequate qty?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>50</td>
                  <td>Emergency Exit & Fire Prevention</td>
                  <td>Are the workers trained to fire fight and use fire fighting equipments?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>51</td>
                  <td>Emergency Exit & Fire Prevention</td>
                  <td>Is the evacuation route clearly marked and visible inside the warehouse?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>52</td>
                  <td>Emergency Exit & Fire Prevention</td>
                  <td>Emergency alarm is clearly audible, supported by battery and alarm buttons are available inside WH?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>53</td>
                  <td>Environment Protection</td>
                  <td>Does the compound has Green belt / plantation?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>54</td>
                  <td>Environment Protection</td>
                  <td>Is there a Rain Water Harvesting / Drainage system?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>55</td>
                  <td>Environment Protection</td>
                  <td>Is the open area well metteled?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>56</td>
                  <td>Environment Protection</td>
                  <td>Are the Sewage pipes connected to a sewage Pit ?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>57</td>
                  <td>Environment Protection</td>
                  <td>Are the Sewage pipes connected to the approved system of the area?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>58</td>
                  <td>Environment Protection</td>
                  <td>Ground contamination due to release of / keeping of chemical is taken care of? </td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>59</td>
                  <td>Environment Protection</td>
                  <td>Is the PUC getting done of the air pollutant releasing equipments as per Govt norms?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>60</td>
                  <td>Environment Protection</td>
                  <td>Handling of all of type of waste inluding Hazardous waste within WH premises is as per defined norms?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>61</td>
                  <td>Environment Protection</td>
                  <td>Disposal of all type of waste inluding Hazardous waste within WH premises is as per defined norms?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>62</td>
                  <td>Policy</td>
                  <td>Policy for child labour is available?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>63</td>
                  <td>Policy</td>
                  <td>Policy for ethical ways of conducting business is available?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>64</td>
                  <td>Policy</td>
                  <td>Policy for environmental protection is available?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>65</td>
                  <td>Policy</td>
                  <td>Policy for worker/labour insurance, compensation and benefits is available?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>66</td>
                  <td>Safety & Security</td>
                  <td>Is the Warehouse inside a gated compound?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>67</td>
                  <td>Safety & Security</td>
                  <td>Aprox Height of the Compound Boundary Wall height - Ft</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>68</td>
                  <td>Safety & Security</td>
                  <td>How far is HT (high tension) electric line from the WH premise - KMs</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>69</td>
                  <td>Safety & Security</td>
                  <td>Are their Glass pieces on boundary wall, as a safety maeasure.</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>70</td>
                  <td>Safety & Security</td>
                  <td>Are there Barbed Wire over boundary wall </td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>71</td>
                  <td>Safety & Security</td>
                  <td>No. of gates into the premises compound</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>72</td>
                  <td>Safety & Security</td>
                  <td>Is there a proper Security Room at the main gate ?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>73</td>
                  <td>Safety & Security</td>
                  <td>Is the complete premises under CCTV survellience?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>74</td>
                  <td>Warehouse Operations</td>
                  <td>Are the windows on side walls are properly pilferage proof?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>75</td>
                  <td>Warehouse Operations</td>
                  <td>Is WH operational for 24 hrs?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>76</td>
                  <td>Warehouse Operations</td>
                  <td>Does the WH operator provides Handling Equipments?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>77</td>
                  <td>Warehouse Operations</td>
                  <td>Does the WH operator provides Labour?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>78</td>
                  <td>Warehouse Operations</td>
                  <td>Are the workers/labours working in WH are permanent?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>79</td>
                  <td>Warehouse Operations</td>
                  <td>Is there a Weigh Bridge inside the WH premises?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>80</td>
                  <td>Worker Facility, Health & Safety</td>
                  <td>Is there a Pantry area available within the warehouse premises ?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>81</td>
                  <td>Worker Facility, Health & Safety</td>
                  <td>Are there washroosm for staff / workers?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>82</td>
                  <td>Worker Facility, Health & Safety</td>
                  <td>Is there a creche available inside WH premises?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>83</td>
                  <td>Worker Facility, Health & Safety</td>
                  <td>Are there enough lights in the open area in the night? </td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>84</td>
                  <td>Worker Facility, Health & Safety</td>
                  <td>Source of Water in the warehouse (for regular use)?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>85</td>
                  <td>Worker Facility, Health & Safety</td>
                  <td>Is drinking water available and accessible to all 24hrs?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>86</td>
                  <td>Worker Facility, Health & Safety</td>
                  <td>Are the basic safety gears available for the labours/workers?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>87</td>
                  <td>Worker Facility, Health & Safety</td>
                  <td>Are the safety signs visible and adequately availble inside the WH as well as WH premises?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>89</td>
                  <td>Worker Facility, Health & Safety</td>
                  <td>Are the first aid boxes adequately available inside the WH?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr>
                <tr>
                  <td>89</td>
                  <td>Worker Facility, Health & Safety</td>
                  <td>Is there an Ambulance parked 24/7 inside the WH premises?</td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                  <td><input type="text" className="form-control border-0 w-150px" name=""/></td>
                </tr> */}
              </tbody>
            </table>
          </div>
          <div className="col-12 mt-4">
          <div className="row justify-content-end">
            {/* <div className="col-auto"> */}
              {/* <button type="button" className="btn btn-outline-deep-blue add-className remove-className" data-add-target=".steps9" data-add-target-className="d-none" data-remove-target=".steps8" data-remove-target-className="d-none">Back</button> */}
            {/* </div> */}
            {Object.keys(errors).length !== 0 ? <FormErrorCard message="Fill All Required Fields" /> : null}
              {data.isError !== "" ? <FormErrorCard message={data.isError} /> : null}
                      
            <div className="col-auto">
              <button type="submit" disabled={data.isPending} className="btn btn-deep-blue add-className remove-className">Save
              {data.isPending ? <Spinner animation="border"  /> :null}
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
  );
}

export default FormEighty;
