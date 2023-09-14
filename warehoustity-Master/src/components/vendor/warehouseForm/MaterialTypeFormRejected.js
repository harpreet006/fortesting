import React, {useState, useEffect} from 'react'
import {updateMaterialType, changeWarehouseStatus} from '../../../store/actions/vendor/warehouseList';
import {useDispatch, useSelector} from 'react-redux';
import FormSuccess from '../../helper/FormSuccess';
import Spinner from 'react-bootstrap/Spinner';
import ErrorCard, { FormErrorCard } from '../../helper/ErrorCard';
import { CardLoader } from '../../helper/CustomLoader';

const MaterialTypeForm = ({viewMood}) => {
  // const [error, setError] = useState("");

  const dispatch = useDispatch()
  const data=useSelector((state)=>state.WAREHOUSELIST);
  // console.log("MaterialSTATE===>", data.singleFormData);

  const [materialForm, setMaterialForm] = useState({
    dryMaterial:true,
    wetMaterial:true,
    agriAndAlliedIndustries:true,
    autoMobiles:true,
    autoComponents:true,
    aviation:true,
    chemicalDry:true,
    chemicalWet:true,
    consumerDurables:true,
    ecommerce:true,
    educationRelated:true,
    engineeringGood:true,
    fmcg:true,
    healthAndPharma:true,
    itAndItes:true,
    manufacturing:true,
    entertainment:true,
    oilAndGas:true,
    power:true,
    energy:true,
    retail:true,
    scienceAndTechnology:true,
    steel:true,
    telecommunication:true,
    texTiles:true,
    tourism:true,
    prominentCustomersInTheWarehouse:"",
  })
  const {
    dryMaterial,
    wetMaterial,
    agriAndAlliedIndustries,
    autoMobiles,
    autoComponents,
    aviation,
    chemicalDry,
    chemicalWet,
    consumerDurables,
    ecommerce,
    educationRelated,
    engineeringGood,
    fmcg,
    healthAndPharma,
    itAndItes,
    manufacturing,
    entertainment,
    oilAndGas,
    power,
    energy,
    retail,
    scienceAndTechnology,
    steel,
    telecommunication,
    texTiles,
    tourism,
    prominentCustomersInTheWarehouse
  } = materialForm;

  const handleChange = (e) =>{
    setMaterialForm({...materialForm, [e.target.name]:e.target.value === "true"});
  }

  const handleChange1 = (e) =>{
    setMaterialForm({...materialForm, [e.target.name]:e.target.value});
  }
  
  // console.log("materialForm==>",materialForm)

  const submitMaterial = (e)=>{
    e.preventDefault();
    // if(prominentCustomersInTheWarehouse===""){
    //   setError("Required")
    //   return 0;
    // }

    let materialData = {
      "dryMaterial": dryMaterial,
      "wetMaterial": wetMaterial,
      "agriAndAlliedIndustries": agriAndAlliedIndustries,
      "autoMobiles": autoMobiles,
      "autoComponents": autoComponents,
      "aviation": aviation,
      "chemicals": [{
          "type":"updatedry",
            "active":chemicalDry  
      },{
          "type":"wet",
            "active":chemicalWet 
      }],
      "consumerDurables": consumerDurables,
      "ecommerce": ecommerce,
      "educationRelated": educationRelated,
      "engineeringGoods": engineeringGood,
      "fmcg": fmcg,
      "healthAndPharma": healthAndPharma,
      "itAndItes":itAndItes,
      "manufacturing":manufacturing,
      "mediaAndEntertainment":entertainment,
      "oilAndGas":oilAndGas,
      "power": power,
      "renewableEnergy": energy,
      "retail": retail,
      "scienceAndTechnology": scienceAndTechnology,
      "steel": steel,
      "telecommunication": telecommunication,
      "textTiles": texTiles,
      "tourismAndHospitality": tourism,
      "prominentCustomersInTheWarehouse": prominentCustomersInTheWarehouse,
      "warehouse":data.singleFormData.id
  }

  dispatch(updateMaterialType(materialData))
    // console.log("Submitted Data===>",materialData)
  }


  useEffect(()=>{

    let  materialInfo= data.singleFormData.materialTypeInfo
    // console.log("material==>",materialInfo)
      
    if(materialInfo !==null){
      setMaterialForm(
            {
              dryMaterial:materialInfo ? materialInfo.dryMaterial :true,
              wetMaterial:materialInfo ? materialInfo.wetMaterial :true,
              agriAndAlliedIndustries:materialInfo ? materialInfo.agriAndAlliedIndustries :true,
              autoMobiles:materialInfo ? materialInfo.autoMobiles :true,
              autoComponents:materialInfo ? materialInfo.autoComponents :true,
              aviation:materialInfo ? materialInfo.aviation :true,
              chemicalDry:materialInfo?materialInfo.chemicals ? materialInfo.chemicals[0].active:"" :"",
              chemicalWet:materialInfo?materialInfo.chemicals ? materialInfo.chemicals[1].active:"" :"",
              consumerDurables:materialInfo ? materialInfo.consumerDurables :true,
              ecommerce:materialInfo ? materialInfo.ecommerce :true,
              educationRelated:materialInfo ? materialInfo.educationRelated :true,  
              engineeringGood:materialInfo ? materialInfo.engineeringGoods :true,
              fmcg:materialInfo ? materialInfo.fmcg :true,
              healthAndPharma:materialInfo ? materialInfo.healthAndPharma :true,
              itAndItes:materialInfo ? materialInfo.itAndItes :true,
              manufacturing:materialInfo ? materialInfo.manufacturing :true,
              entertainment:materialInfo ? materialInfo.mediaAndEntertainment :true,
              oilAndGas:materialInfo ? materialInfo.oilAndGas :true,
              power:materialInfo ? materialInfo.power :true,
              energy:materialInfo ? materialInfo.renewableEnergy :true,
              retail:materialInfo ? materialInfo.retail :true,
              scienceAndTechnology:materialInfo ? materialInfo.scienceAndTechnology :true,
              steel:materialInfo ? materialInfo.steel :true,
              telecommunication:materialInfo ? materialInfo.telecommunication :true,
              texTiles:materialInfo ? materialInfo.textTiles :true,
              tourism:materialInfo ? materialInfo.tourismAndHospitality :true,
              prominentCustomersInTheWarehouse:materialInfo ? materialInfo.prominentCustomersInTheWarehouse :"",
            
              }
      )
    }
  },[data.singleFormData, data.id])




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


          <div className="row align-itAndItems-center pb-3 px-3 mx-0 w-100"> 
            <div className="col-12">
              <form onSubmit={submitMaterial}> 
                <div className="row bg-whitAndIte rounded mx-0 col-xxxl-11">
                  <div className="col-12 border-0 border-bottom-0 table-responsive table-collapse">
                    <table className="table customTable"> 
                      <tbody>
                        <tr>
                          <td className="w-200px">
                            <p className="mb-0 pb-1">Dry Material:</p>
                          </td>
                          <td className="col-auto form-inline py-4 mb-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input name="dryMaterial"  onChange={(e)=>handleChange(e)} checked={dryMaterial} className="common-radio-deep-blue-input" type="radio" id="dryMaterial" value={true} disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="dryMaterial">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input  onChange={(e)=>handleChange(e)} name="dryMaterial"  checked={!dryMaterial} className="common-radio-deep-blue-input" type="radio" id="dryMaterial1" value={false} disabled={viewMood} />
                              <label   className="common-radio-deep-blue-label pl-4" htmlFor="dryMaterial1">No</label>
                            </div> 
                          </td>  
                    
                    
                        </tr>

                        <tr>
                    <td className="w-25px"> 	
                    </td> 	
               	
                    <td className="mw-250px form-inline form-group py-3 mb-0 pr-0" colSpan="2">	
                   <p>WHS Remarks: 
                     {data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.dryMaterial.whsstatus===true?"   okay":"   not okay"}
                     </p>	
                    </td>	
                    <td className="mw-150px">	
                    <input     disabled            
                       value={data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.dryMaterial.whsremark}	
 type="text" className="form-control  px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </td>	
                 </tr>	
                
                        <tr>
                          <td className="w-200px">
                            <p className="mb-0 pb-1">Wet Material:</p>
                          </td>
                          <td className="col-auto form-inline py-4 mb-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={wetMaterial} className="common-radio-deep-blue-input" type="radio" name="wetMaterial" id="wetMaterial" value={true} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="wetMaterial">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={!wetMaterial} className="common-radio-deep-blue-input" type="radio" name="wetMaterial" id="wetMaterial1" value={false} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="wetMaterial1">No</label>
                            </div> 
                          </td>  
                        </tr>
                        <tr>
                    <td className="w-25px"> 	
                    </td> 	
               	
                    <td className="mw-250px form-inline form-group py-3 mb-0 pr-0" colSpan="2">	
                   <p>WHS Remarks: 
                     {data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.wetMaterial.whsstatus===true?"   okay":"   not okay"}
                     </p>	
                    </td>	
                    <td className="mw-150px">	
                    <input     disabled            
                       value={data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.wetMaterial.whsremark}	
 type="text" className="form-control  px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </td>	
                 </tr>	
                
                        <tr>
                          <td className="w-200px">
                            <p className="mb-0 pb-1">Agri & Allied Industries:</p>
                          </td>
                          <td className="col-auto form-inline py-4 mb-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={agriAndAlliedIndustries} className="common-radio-deep-blue-input" type="radio" name="agriAndAlliedIndustries" id="alliedIndustries" value={true} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="alliedIndustries">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={!agriAndAlliedIndustries} className="common-radio-deep-blue-input" type="radio" name="agriAndAlliedIndustries" id="alliedIndustries1" value={false} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="alliedIndustries1">No</label>
                            </div> 
                          </td>  
                        </tr>
                        <tr>
                    <td className="w-25px"> 	
                    </td> 	
               	
                    <td className="mw-250px form-inline form-group py-3 mb-0 pr-0" colSpan="2">	
                   <p>WHS Remarks: 
                     {data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.agriAndAlliedIndustries.whsstatus===true?"   okay":"   not okay"}
                     </p>	
                    </td>	
                    <td className="mw-150px">	
                    <input     disabled            
                       value={data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.agriAndAlliedIndustries.whsremark}	
 type="text" className="form-control  px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </td>	
                 </tr>	
                
                        <tr>
                          <td className="w-200px">
                            <p className="mb-0 pb-1">AutoMobiles:</p>
                          </td>
                          <td className="col-auto form-inline py-4 mb-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={autoMobiles} className="common-radio-deep-blue-input" type="radio" name="autoMobiles" id="autoMobiles" value={true} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="autoMobiles">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={!autoMobiles} className="common-radio-deep-blue-input" type="radio" name="autoMobiles" id="autoMobiles1" value={false} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="autoMobiles1">No</label>
                            </div> 
                          </td>  
                        </tr>
                        <tr>
                    <td className="w-25px"> 	
                    </td> 	
               	
                    <td className="mw-250px form-inline form-group py-3 mb-0 pr-0" colSpan="2">	
                   <p>WHS Remarks: 
                     {data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.autoMobiles.whsstatus===true?"   okay":"   not okay"}
                     </p>	
                    </td>	
                    <td className="mw-150px">	
                    <input     disabled            
                       value={data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.autoMobiles.whsremark}	
 type="text" className="form-control  px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </td>	
                 </tr>	
                
                        <tr>
                          <td className="w-200px">
                            <p className="mb-0 pb-1">Auto Components:</p>
                          </td>
                          <td className="col-auto form-inline py-4 mb-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={autoComponents} className="common-radio-deep-blue-input" type="radio" name="autoComponents" id="autoComponents" value={true} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="autoComponents">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={!autoComponents} className="common-radio-deep-blue-input" type="radio" name="autoComponents" id="autoComponents1" value={false} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="autoComponents1">No</label>
                            </div> 
                          </td>  
                        </tr>
                        <tr>
                    <td className="w-25px"> 	
                    </td> 	
               	
                    <td className="mw-250px form-inline form-group py-3 mb-0 pr-0" colSpan="2">	
                   <p>WHS Remarks: 
                     {data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.autoComponents.whsstatus===true?"   okay":"   not okay"}
                     </p>	
                    </td>	
                    <td className="mw-150px">	
                    <input     disabled            
                       value={data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.autoComponents.whsremark}	
 type="text" className="form-control  px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </td>	
                 </tr>	
                
                        <tr>
                          <td className="w-200px">
                            <p className="mb-0 pb-1">Aviation::</p>
                          </td>
                          <td className="col-auto form-inline py-4 mb-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={aviation} className="common-radio-deep-blue-input" type="radio" name="aviation" id="aviation" value={true} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="aviation">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={!aviation} className="common-radio-deep-blue-input" type="radio" name="aviation" id="aviation1" value={false} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="aviation1">No</label>
                            </div> 
                          </td>  
                        </tr>
                        <tr>
                    <td className="w-25px"> 	
                    </td> 	
               	
                    <td className="mw-250px form-inline form-group py-3 mb-0 pr-0" colSpan="2">	
                   <p>WHS Remarks: 
                     {data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.aviation.whsstatus===true?"   okay":"   not okay"}
                     </p>	
                    </td>	
                    <td className="mw-150px">	
                    <input     disabled            
                       value={data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.aviation.whsremark}	
 type="text" className="form-control  px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </td>	
                 </tr>	
                
                        <tr>
                          <td className="w-200px">
                            <p className="mb-0 pb-1">Chemicals (Dry):</p>
                          </td>
                          <td className="col-auto form-inline py-4 mb-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={chemicalDry} className="common-radio-deep-blue-input" type="radio" name="chemicalDry" id="chemicalDry" value={true} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="chemicalDry">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={!chemicalDry} className="common-radio-deep-blue-input" type="radio" name="chemicalDry" id="chemicalDry1" value={false} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="chemicalDry1">No</label>
                            </div> 
                          </td>  
                        </tr>
                        <tr>
                    <td className="w-25px"> 	
                    </td> 	
               	
                    <td className="mw-250px form-inline form-group py-3 mb-0 pr-0" colSpan="2">	
                   <p>WHS Remarks: 
                     {data.singleFormData&&data.singleFormData.materialTypeRemark&&
                     data.singleFormData.materialTypeRemark.chemicals&&
                     data.singleFormData.materialTypeRemark.chemicals[0].whsstatus===true?"   okay":"   not okay"}
                     </p>	
                    </td>	
                    <td className="mw-150px">	
                    <input     disabled            
                       value={data.singleFormData&&data.singleFormData.materialTypeRemark&&
                        data.singleFormData.materialTypeRemark.chemicals&&
                        data.singleFormData.materialTypeRemark.chemicals[0].whsremark}	
 type="text" className="form-control  px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </td>	
                 </tr>	
                
                        <tr>
                          <td className="w-200px">
                            <p className="mb-0 pb-1">Chemicals (Wet):</p>
                          </td>
                          <td className="col-auto form-inline py-4 mb-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={chemicalWet} className="common-radio-deep-blue-input" type="radio" name="chemicalWet" id="chemicalWet" value={true} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="chemicalWet">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={!chemicalWet} className="common-radio-deep-blue-input" type="radio" name="chemicalWet" id="chemicalWet1" value={false} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="chemicalWet1">No</label>
                            </div> 
                          </td>  
                        </tr>
                        <tr>
                    <td className="w-25px"> 	
                    </td> 	
               	
                    <td className="mw-250px form-inline form-group py-3 mb-0 pr-0" colSpan="2">	
                   <p>WHS Remarks: 
                     {data.singleFormData&&data.singleFormData.materialTypeRemark&&
                     data.singleFormData.materialTypeRemark.chemicals&&
                     data.singleFormData.materialTypeRemark.chemicals[1].whsstatus===true?"   okay":"   not okay"}
                     </p>	
                    </td>	
                    <td className="mw-150px">	
                    <input     disabled            
                       value={data.singleFormData&&data.singleFormData.materialTypeRemark&&
                        data.singleFormData.materialTypeRemark.chemicals&&
                        data.singleFormData.materialTypeRemark.chemicals[1].whsremark}	
 type="text" className="form-control  px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </td>	
                 </tr>	
                        <tr>
                          <td className="w-200px">
                            <p className="mb-0 pb-1">Consumer Durables:</p>
                          </td>
                          <td className="col-auto form-inline py-4 mb-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={consumerDurables} className="common-radio-deep-blue-input" type="radio" name="consumerDurables" id="consumerDurables" value={true} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="consumerDurables">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={!consumerDurables} className="common-radio-deep-blue-input" type="radio" name="consumerDurables" id="consumerDurables1" value={false} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="consumerDurables1">No</label>
                            </div> 
                          </td>  
                        </tr>
                        <tr>
                    <td className="w-25px"> 	
                    </td> 	
               	
                    <td className="mw-250px form-inline form-group py-3 mb-0 pr-0" colSpan="2">	
                   <p>WHS Remarks: 
                     {data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.consumerDurables.whsstatus===true?"   okay":"   not okay"}
                     </p>	
                    </td>	
                    <td className="mw-150px">	
                    <input     disabled            
                       value={data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.consumerDurables.whsremark}	
 type="text" className="form-control  px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </td>	
                 </tr>	
                
                        <tr>
                          <td className="w-200px">
                            <p className="mb-0 pb-1">Ecommerce:</p>
                          </td>
                          <td className="col-auto form-inline py-4 mb-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={ecommerce} className="common-radio-deep-blue-input" type="radio" name="ecommerce" id="ecommerce" value={true} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="ecommerce">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={!ecommerce} className="common-radio-deep-blue-input" type="radio" name="ecommerce" id="ecommerce1" value={false} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="ecommerce1">No</label>
                            </div> 
                          </td>  
                        </tr>
                        <tr>
                    <td className="w-25px"> 	
                    </td> 	
               	
                    <td className="mw-250px form-inline form-group py-3 mb-0 pr-0" colSpan="2">	
                   <p>WHS Remarks: 
                     {data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.ecommerce.whsstatus===true?"   okay":"   not okay"}
                     </p>	
                    </td>	
                    <td className="mw-150px">	
                    <input     disabled            
                       value={data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.ecommerce.whsremark}	
 type="text" className="form-control  px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </td>	
                 </tr>	
                
                        <tr>
                          <td className="w-200px">
                            <p className="mb-0 pb-1">Education Related:</p>
                          </td>
                          <td className="col-auto form-inline py-4 mb-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={educationRelated} className="common-radio-deep-blue-input" type="radio" name="educationRelated" id="educationRelated" value={true} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="educationRelated">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={!educationRelated} className="common-radio-deep-blue-input" type="radio" name="educationRelated" id="educationRelated1" value={false} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="educationRelated1">No</label>
                            </div> 
                          </td>  
                        </tr>      
                        <tr>
                    <td className="w-25px"> 	
                    </td> 	
               	
                    <td className="mw-250px form-inline form-group py-3 mb-0 pr-0" colSpan="2">	
                   <p>WHS Remarks: 
                     {data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.educationRelated.whsstatus===true?"   okay":"   not okay"}
                     </p>	
                    </td>	
                    <td className="mw-150px">	
                    <input     disabled            
                       value={data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.educationRelated.whsremark}	
 type="text" className="form-control  px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </td>	
                 </tr>	
                                    
                        <tr>
                          <td className="w-200px">
                            <p className="mb-0 pb-1">Engineering Goods:</p>
                          </td>
                          <td className="col-auto form-inline py-4 mb-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={engineeringGood} className="common-radio-deep-blue-input" type="radio" name="engineeringGood" id="engineeringGood" value={true} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="engineeringGood">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={!engineeringGood} className="common-radio-deep-blue-input" type="radio" name="engineeringGood" id="engineeringGood1" value={false} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="engineeringGood1">No</label>
                            </div> 
                          </td>  
                        </tr>
                      
                        <tr>
                    <td className="w-25px"> 	
                    </td> 	
               	
                    <td className="mw-250px form-inline form-group py-3 mb-0 pr-0" colSpan="2">	
                   <p>WHS Remarks: 
                     {data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.engineeringGoods.whsstatus===true?"   okay":"   not okay"}
                     </p>	
                    </td>	
                    <td className="mw-150px">	
                    <input     disabled            
                       value={data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.engineeringGoods.whsremark}	
 type="text" className="form-control  px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </td>	
                 </tr>	
                
                        <tr>
                          <td className="w-200px">
                            <p className="mb-0 pb-1">FMCG:</p>
                          </td>
                          <td className="col-auto form-inline py-4 mb-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={fmcg} className="common-radio-deep-blue-input" type="radio" name="fmcg" id="fmcg" value={true} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="fmcg">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={!fmcg} className="common-radio-deep-blue-input" type="radio" name="fmcg" id="fmcg1" value={false} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="fmcg1">No</label>
                            </div> 
                          </td>  
                        </tr>
                        <tr>
                    <td className="w-25px"> 	
                    </td> 	
               	
                    <td className="mw-250px form-inline form-group py-3 mb-0 pr-0" colSpan="2">	
                   <p>WHS Remarks: 
                     {data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.fmcg.whsstatus===true?"   okay":"   not okay"}
                     </p>	
                    </td>	
                    <td className="mw-150px">	
                    <input     disabled            
                       value={data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.fmcg.whsremark}	
 type="text" className="form-control  px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </td>	
                 </tr>	
                
                        <tr>
                          <td className="w-200px">
                            <p className="mb-0 pb-1">Health & Pharma:</p>
                          </td>
                          <td className="col-auto form-inline py-4 mb-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={healthAndPharma} className="common-radio-deep-blue-input" type="radio" name="healthAndPharma" id="healthAndPharma" value={true} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="healthAndPharma">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={!healthAndPharma} className="common-radio-deep-blue-input" type="radio" name="healthAndPharma" id="healthAndPharma1" value={false} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="healthAndPharma1">No</label>
                            </div> 
                          </td>  
                        </tr>
                        <tr>
                    <td className="w-25px"> 	
                    </td> 	
               	
                    <td className="mw-250px form-inline form-group py-3 mb-0 pr-0" colSpan="2">	
                   <p>WHS Remarks: 
                     {data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.healthAndPharma.whsstatus===true?"   okay":"   not okay"}
                     </p>	
                    </td>	
                    <td className="mw-150px">	
                    <input     disabled            
                       value={data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.healthAndPharma.whsremark}	
 type="text" className="form-control  px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </td>	
                 </tr>	
                
                        <tr>
                          <td className="w-200px">
                            <p className="mb-0 pb-1">IT & ITES:</p>
                          </td>
                          <td className="col-auto form-inline py-4 mb-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={itAndItes} className="common-radio-deep-blue-input" type="radio" name="itAndItes" id="itAndItes" value={true} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="itAndItes">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={!itAndItes} className="common-radio-deep-blue-input" type="radio" name="itAndItes" id="itAndItes1" value={false} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="itAndItes1">No</label>
                            </div> 
                          </td>  
                        </tr>
                        <tr>
                    <td className="w-25px"> 	
                    </td> 	
               	
                    <td className="mw-250px form-inline form-group py-3 mb-0 pr-0" colSpan="2">	
                   <p>WHS Remarks: 
                     {data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.itAndItes.whsstatus===true?"   okay":"   not okay"}
                     </p>	
                    </td>	
                    <td className="mw-150px">	
                    <input     disabled            
                       value={data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.itAndItes.whsremark}	
 type="text" className="form-control  px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </td>	
                 </tr>	
                
                        <tr>
                          <td className="w-200px">
                            <p className="mb-0 pb-1">Manufacturing:</p>
                          </td>
                          <td className="col-auto form-inline py-4 mb-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={manufacturing} className="common-radio-deep-blue-input" type="radio" name="manufacturing" id="manufacturing" value={true} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="manufacturing">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={!manufacturing} className="common-radio-deep-blue-input" type="radio" name="manufacturing" id="manufacturing1" value={false} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="manufacturing1">No</label>
                            </div> 
                          </td>  
                        </tr>
                        <tr>
                    <td className="w-25px"> 	
                    </td> 	
               	
                    <td className="mw-250px form-inline form-group py-3 mb-0 pr-0" colSpan="2">	
                   <p>WHS Remarks: 
                     {data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.manufacturing.whsstatus===true?"   okay":"   not okay"}
                     </p>	
                    </td>	
                    <td className="mw-150px">	
                    <input     disabled            
                       value={data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.manufacturing.whsremark}	
 type="text" className="form-control  px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </td>	
                 </tr>	
                
                        <tr>
                          <td className="w-200px">
                            <p className="mb-0 pb-1">Media & Entertainment:</p>
                          </td>
                          <td className="col-auto form-inline py-4 mb-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={entertainment} className="common-radio-deep-blue-input" type="radio" name="entertainment" id="entertainment" value={true} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="entertainment">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={!entertainment} className="common-radio-deep-blue-input" type="radio" name="entertainment" id="entertainment1" value={false} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="entertainment1">No</label>
                            </div> 
                          </td>  
                        </tr>
                        <tr>
                    <td className="w-25px"> 	
                    </td> 	
               	
                    <td className="mw-250px form-inline form-group py-3 mb-0 pr-0" colSpan="2">	
                   <p>WHS Remarks: 
                     {data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.mediaAndEntertainment.whsstatus===true?"   okay":"   not okay"}
                     </p>	
                    </td>	
                    <td className="mw-150px">	
                    <input     disabled            
                       value={data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.mediaAndEntertainment.whsremark}	
 type="text" className="form-control  px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </td>	
                 </tr>	
                
                        <tr>
                          <td className="w-200px">
                            <p className="mb-0 pb-1">Oil & Gas:</p>
                          </td>
                          <td className="col-auto form-inline py-4 mb-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={oilAndGas} className="common-radio-deep-blue-input" type="radio" name="oilAndGas" id="oilAndGas" value={true} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="oilAndGas">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={!oilAndGas} className="common-radio-deep-blue-input" type="radio" name="oilAndGas" id="oilAndGas1" value={false} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="oilAndGas1">No</label>
                            </div> 
                          </td>  
                        </tr>
                        <tr>
                    <td className="w-25px"> 	
                    </td> 	
               	
                    <td className="mw-250px form-inline form-group py-3 mb-0 pr-0" colSpan="2">	
                   <p>WHS Remarks: 
                     {data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.oilAndGas.whsstatus===true?"   okay":"   not okay"}
                     </p>	
                    </td>	
                    <td className="mw-150px">	
                    <input     disabled            
                       value={data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.oilAndGas.whsremark}	
 type="text" className="form-control  px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </td>	
                 </tr>	
                
                        <tr>
                          <td className="w-200px">
                            <p className="mb-0 pb-1">Power:</p>
                          </td>
                          <td className="col-auto form-inline py-4 mb-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={power} className="common-radio-deep-blue-input" type="radio" name="power" id="power" value={true} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="power">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={!power} className="common-radio-deep-blue-input" type="radio" name="power" id="power1" value={false} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="power1">No</label>
                            </div> 
                          </td>  
                        </tr>
                        <tr>
                    <td className="w-25px"> 	
                    </td> 	
               	
                    <td className="mw-250px form-inline form-group py-3 mb-0 pr-0" colSpan="2">	
                   <p>WHS Remarks: 
                     {data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.power.whsstatus===true?"   okay":"   not okay"}
                     </p>	
                    </td>	
                    <td className="mw-150px">	
                    <input     disabled            
                       value={data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.power.whsremark}	
 type="text" className="form-control  px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </td>	
                 </tr>	
                
                        <tr>
                          <td className="w-200px">
                            <p className="mb-0 pb-1">Renewable Energy:</p>
                          </td>
                          <td className="col-auto form-inline py-4 mb-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={energy} className="common-radio-deep-blue-input" type="radio" name="energy" id="energy" value={true} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="energy">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={!energy} className="common-radio-deep-blue-input" type="radio" name="energy" id="energy1" value={false} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="energy1">No</label>
                            </div> 
                          </td>  
                        </tr>
                        <tr>
                    <td className="w-25px"> 	
                    </td> 	
               	
                    <td className="mw-250px form-inline form-group py-3 mb-0 pr-0" colSpan="2">	
                   <p>WHS Remarks: 
                     {data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.renewableEnergy.whsstatus===true?"   okay":"   not okay"}
                     </p>	
                    </td>	
                    <td className="mw-150px">	
                    <input     disabled            
                       value={data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.renewableEnergy.whsremark}	
 type="text" className="form-control  px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </td>	
                 </tr>	
                
                        <tr>
                          <td className="w-200px">
                            <p className="mb-0 pb-1">Retail:</p>
                          </td>
                          <td className="col-auto form-inline py-4 mb-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={retail} className="common-radio-deep-blue-input" type="radio" name="retail" id="retail" value={true} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="retail">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={!retail} className="common-radio-deep-blue-input" type="radio" name="retail" id="retail1" value={false} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="retail1">No</label>
                            </div> 
                          </td>  
                        </tr>
                        <tr>
                    <td className="w-25px"> 	
                    </td> 	
               	
                    <td className="mw-250px form-inline form-group py-3 mb-0 pr-0" colSpan="2">	
                   <p>WHS Remarks: 
                     {data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.retail.whsstatus===true?"   okay":"   not okay"}
                     </p>	
                    </td>	
                    <td className="mw-150px">	
                    <input     disabled            
                       value={data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.retail.whsremark}	
 type="text" className="form-control  px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </td>	
                 </tr>	
                
                        <tr>
                          <td className="w-200px">
                            <p className="mb-0 pb-1">Science & Technology:</p>
                          </td>
                          <td className="col-auto form-inline py-4 mb-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={scienceAndTechnology} className="common-radio-deep-blue-input" type="radio" name="scienceAndTechnology" id="scienceAndTechnology" value={true} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="scienceAndTechnology">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={!scienceAndTechnology} className="common-radio-deep-blue-input" type="radio" name="scienceAndTechnology" id="scienceAndTechnology1" value={false} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="scienceAndTechnology1">No</label>
                            </div> 
                          </td>  
                        </tr>
                        <tr>
                    <td className="w-25px"> 	
                    </td> 	
               	
                    <td className="mw-250px form-inline form-group py-3 mb-0 pr-0" colSpan="2">	
                   <p>WHS Remarks: 
                     {data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.scienceAndTechnology.whsstatus===true?"   okay":"   not okay"}
                     </p>	
                    </td>	
                    <td className="mw-150px">	
                    <input     disabled            
                       value={data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.scienceAndTechnology.whsremark}	
 type="text" className="form-control  px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </td>	
                 </tr>	
                
                        <tr>
                          <td className="w-200px">
                            <p className="mb-0 pb-1">Steel:</p>
                          </td>
                          <td className="col-auto form-inline py-4 mb-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={steel} className="common-radio-deep-blue-input" type="radio" name="steel" id="steel" value={true} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="steel">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={!steel} className="common-radio-deep-blue-input" type="radio" name="steel" id="steel1" value={false} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="steel1">No</label>
                            </div> 
                          </td>  
                        </tr>
                        <tr>
                    <td className="w-25px"> 	
                    </td> 	
               	
                    <td className="mw-250px form-inline form-group py-3 mb-0 pr-0" colSpan="2">	
                   <p>WHS Remarks: 
                     {data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.steel.whsstatus===true?"   okay":"   not okay"}
                     </p>	
                    </td>	
                    <td className="mw-150px">	
                    <input     disabled            
                       value={data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.steel.whsremark}	
 type="text" className="form-control  px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </td>	
                 </tr>	
                
                        <tr>
                          <td className="w-200px">
                            <p className="mb-0 pb-1">Telecommunication:</p>
                          </td>
                          <td className="col-auto form-inline py-4 mb-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={telecommunication} className="common-radio-deep-blue-input" type="radio" name="telecommunication" id="telecommunication" value={true} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="telecommunication">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={!telecommunication} className="common-radio-deep-blue-input" type="radio" name="telecommunication" id="telecommunication1" value={false} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="telecommunication1">No</label>
                            </div> 
                          </td>  
                        </tr>
                        <tr>
                    <td className="w-25px"> 	
                    </td> 	
               	
                    <td className="mw-250px form-inline form-group py-3 mb-0 pr-0" colSpan="2">	
                   <p>WHS Remarks: 
                     {data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.telecommunication.whsstatus===true?"   okay":"   not okay"}
                     </p>	
                    </td>	
                    <td className="mw-150px">	
                    <input     disabled            
                       value={data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.telecommunication.whsremark}	
 type="text" className="form-control  px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </td>	
                 </tr>	
                
                        <tr>
                          <td className="w-200px">
                            <p className="mb-0 pb-1">TexTiles:</p>
                          </td>
                          <td className="col-auto form-inline py-4 mb-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={texTiles} className="common-radio-deep-blue-input" type="radio" name="texTiles" id="texTiles" value={true} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="texTiles">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={!texTiles} className="common-radio-deep-blue-input" type="radio" name="texTiles" id="texTiles1" value={false} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="texTiles1">No</label>
                            </div> 
                          </td>  
                        </tr>
                        <tr>
                    <td className="w-25px"> 	
                    </td> 	
               	
                    <td className="mw-250px form-inline form-group py-3 mb-0 pr-0" colSpan="2">	
                   <p>WHS Remarks: 
                     {data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.textTiles.whsstatus===true?"   okay":"   not okay"}
                     </p>	
                    </td>	
                    <td className="mw-150px">	
                    <input     disabled            
                       value={data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.textTiles.whsremark}	
 type="text" className="form-control  px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </td>	
                 </tr>	
                
                        <tr>
                          <td className="w-200px">
                            <p className="mb-0 pb-1">Tourism & Hospitality:</p>
                          </td>
                          <td className="col-auto form-inline py-4 mb-1">
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={tourism} className="common-radio-deep-blue-input" type="radio" name="tourism" id="tourism" value={true} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="tourism">Yes</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <input onChange={(e)=>handleChange(e)} checked={!tourism} className="common-radio-deep-blue-input" type="radio" name="tourism" id="tourism1" value={false} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="tourism1">No</label>
                            </div> 
                          </td>  
                        </tr>
                        <tr>
                    <td className="w-25px"> 	
                    </td> 	
               	
                    <td className="mw-250px form-inline form-group py-3 mb-0 pr-0" colSpan="2">	
                   <p>WHS Remarks: 
                     {data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.tourismAndHospitality.whsstatus===true?"   okay":"   not okay"}
                     </p>	
                    </td>	
                    <td className="mw-150px">	
                    <input     disabled            
                       value={data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.tourismAndHospitality.whsremark}	
 type="text" className="form-control  px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </td>	
                 </tr>	
                
                        <tr>
                          <td className="w-200px">
                            <p className="mb-0 pb-1">Prominent Customers in the Warehouse:</p>
                          </td>
                          <td className="col-auto form-inline py-4 mb-1">

                              {/* <input onChange={(e)=>handleChange(e)} checked={!prominentCustomersInTheWarehouse} className="common-radio-deep-blue-input" type="radio" name="prominentCustomersInTheWarehouse" id="prominentCustomersInTheWarehouse1" value={false} hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="prominentCustomersInTheWarehouse1">No</label> */}
                                  <input onChange={(e)=>handleChange1(e)} name="prominentCustomersInTheWarehouse" value={prominentCustomersInTheWarehouse}  type="text" className="form-control" readOnly={viewMood} />
                          </td>  
                        </tr>
                        <tr>
                    <td className="w-25px"> 	
                    </td> 	
               	
                    <td className="mw-250px form-inline form-group py-3 mb-0 pr-0" colSpan="2">	
                   <p>WHS Remarks: 
                     {data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.prominentCustomersInTheWarehouse.whsstatus===true?"   okay":"   not okay"}
                     </p>	
                    </td>	
                    <td className="mw-150px">	
                    <input     disabled            
                       value={data.singleFormData&&data.singleFormData.materialTypeRemark&&data.singleFormData.materialTypeRemark.prominentCustomersInTheWarehouse.whsremark}	
 type="text" className="form-control  px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </td>	
                 </tr>	
                
                        {/* <tr>
                          <td className="w-200px">
                            <p className="mb-0 pb-1">Prominent Customers in the Warehouse:</p>
                          </td>
                          <td className="col-auto form-inline py-4 mb-1">
                            <input onChange={(e)=>handleChange1(e)} name="prominentCustomersInTheWarehouse" value={prominentCustomersInTheWarehouse}  type="text" className="form-control" readOnly={viewMood} />
                          </td> 
                          <label className="errorMsg">{error}</label> 
                        </tr> */}
                      </tbody>
                      
                    </table>
                  </div>
                  <div className={`col-12 mt-4 ${viewMood ? 'd-none' : ''}`}>
                    <div className="row justify-content-end">
                      {/* <div className="col-auto"> */}
                        {/* <button type="button" className="btn btn-outline-deep-blue add-className remove-class" data-add-target=".steps8" data-add-target-class="d-none" data-remove-target=".steps7" data-remove-target-class="d-none">Back</button> */}
                      {/* </div> */}
                      {/* {error !== "" ? <FormErrorCard message="Fill All Required Fields" /> : null} */}
                      {data.isError !== "" ? <FormErrorCard message={data.isError} /> : null}
                     
                      {data.isErrorMsg !== "" ? <FormErrorCard message={data.isErrorMsg} /> : null}
                      <div className="col-auto">
                        <button type="submit"  disabled={data.isPending}  className="btn btn-deep-blue add-className remove-class">Save
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

export default MaterialTypeForm
