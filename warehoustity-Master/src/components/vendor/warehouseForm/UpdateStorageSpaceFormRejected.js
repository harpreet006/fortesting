import React, {useState, useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage, getIn } from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import {updateStorageSpace, changeWarehouseStatus} from '../../../store/actions/vendor/warehouseList';
import FormSuccess from '../../helper/FormSuccess';
import Spinner from 'react-bootstrap/Spinner';
import ErrorCard, { FormErrorCard } from '../../helper/ErrorCard';
import { CardLoader } from '../../helper/CustomLoader';

const UpdateStorageSpaceForm = ({viewMood}) => {
    const dispatch = useDispatch()
    const data=useSelector((state)=>state.WAREHOUSELIST);
    // console.log("storeage single ===>",data.singleFormData)
    const [formField, setFormField] = useState(null);

  const [yesForm, setYesForm] = useState({
    racksSlottedYes:true,
    racksShelveYes:true,
    racksHDRYes:true,
    parkingYes:true
  })
  const [checkForm1, setCheckForm1] =useState({
    basementCheck1:true,
    groundFloorCheck1: true,
    firstFloorCheck1 : false,
    secondFloorCheck1 : false
  })
  const {basementCheck1, groundFloorCheck1, firstFloorCheck1, secondFloorCheck1} = checkForm1;
  const handleYes =(e)=>{
    setYesForm({...yesForm, [e.target.name]:e.target.value==="true"})
  }
  const handleCheck1 = (e) =>{
    setCheckForm1({...checkForm1, [e.target.name]:e.target.value=== "true"})
  }
  const {racksSlottedYes, racksShelveYes,parkingYes}=yesForm;


  // Check BOx state and handler
const [checkForm, setCheckForm] =useState({
  basementCheck:true,
  groundFloorCheck: true,
  firstFloorCheck : false,
  secondFloorCheck : false
})

const {basementCheck, groundFloorCheck, firstFloorCheck, secondFloorCheck} = checkForm;

const handleCheck = (e) =>{
  setCheckForm({...checkForm, [e.target.name]:e.target.value=== "true"})
}


  // Storege Form

  const [storeForm, setStoreForm] = useState(
    {
      "storageType": "floorarea",
      "availableSpace": "",
      "loadingAndUnloadingBays": "",
      "palletsOnFloor": "",
      "parkingArea": "",
      "totalArea":"",
    "noOfShift":"",
      "floors": [
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

  "availableSpaces": [
    {
      "availableSpaceType": "basement",
      "availableSpaceDimension": {
          "dimension":"SQFT",
          "length": "",
          "breath": "",
          "height": ""
      },
      "unit":"FEET"
  },
    {
      "availableSpaceType": "groundFloor",
      "availableSpaceDimension": {
          "dimension":"SQFT",
          "length": "",
          "breath": "",
          "height": ""
      },
      "unit":"FEET"
  },

{
      "availableSpaceType": "firstFloor",
      "availableSpaceDimension": {
          "dimension":"SQFT",
          "length": "",
          "breath": "",
          "height": ""
      },
      "unit":"FEET"
  },
  
{
  "availableSpaceType": "secondFloor",
  "availableSpaceDimension": {
      "dimension":"SQFT",
      "length": "",
      "breath": "",
      "height": ""
  },
  "unit":"FEET"
}],
"totalAvailableSpace":"",
      "racks": [{
          "name": "binsracks",
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
  }
  )


  function floorValidation1a(value) {
    let error;
    if (basementCheck1 && value === "") {
      error = 'Required';
    }

    return error;
  }

  function floorValidation2a(value) {
    let error;
    if (firstFloorCheck1 && value === "") {
      error = 'Required';
    }

    return error;
  }
  function floorValidationa(value) {
    let error;
    if(groundFloorCheck1 && value===""){
      error = 'Required';
    }

    return error;
  }
  function floorValidation3a(value) {
    let error;
    if (secondFloorCheck1 && value === "") {
      error = 'Required';
    }

    return error;
  }
  useEffect(()=>{
    setFormField(data.singleFormData.storageSpaceInfo)

    let spaceInfo= data.singleFormData.storageSpaceInfo
    if(spaceInfo !== null && spaceInfo !== undefined ){
      // Floors
      let  gFloor = spaceInfo.floors.find(o => o.floorType === 'groundFloor');
      let  bFloor = spaceInfo.floors.find(o => o.floorType === 'basement');
      let  fFloor = spaceInfo.floors.find(o => o.floorType === 'firstFloor');
      let  sFloor = spaceInfo.floors.find(o => o.floorType === 'secondFloor');

      //available spaces

      
      //availablespace
      let  gFloor1 = spaceInfo.availableSpaces.find(o => o.availableSpaceType === 'groundFloor');
      let  bFloor1 = spaceInfo.availableSpaces.find(o => o.availableSpaceType === 'basement');
      let  fFloor1 = spaceInfo.availableSpaces.find(o => o.availableSpaceType === 'firstFloor');
      let  sFloor1 = spaceInfo.availableSpaces.find(o => o.availableSpaceType === 'secondFloor');

      // racks
      let  slaveRack = spaceInfo.racks.find(o => o.name === 'shelveracks');
      let  binRack = spaceInfo.racks.find(o => o.name === 'binsracks');

        setStoreForm(
            {
                "storageType":spaceInfo ? spaceInfo.storageType : "floorarea",
                "availableSpace":spaceInfo ? spaceInfo.availableSpace : "",
                "loadingAndUnloadingBays": spaceInfo ? spaceInfo.loadingAndUnloadingBays : "",
                "palletsOnFloor":spaceInfo ? spaceInfo.palletsOnFloor : "",
                "parkingArea": spaceInfo ? spaceInfo.parkingArea : "",
                "totalArea":spaceInfo ? spaceInfo.totalArea : "",
              
                "floors": [
                  {
                    "floorType": "basement",
                    "floorDimension": {
                        "dimension":"SQFT",
                        "length":bFloor ?  bFloor.floorDimension.length : "",
                        "breath": bFloor ? bFloor.floorDimension.breath : "",
                        "height": bFloor ? bFloor.floorDimension.height : ""
                    },
                    "unit":bFloor.unit
                },
                  {
                    "floorType": "groundFloor",
                    "floorDimension": {
                        "dimension":"SQFT",
                        "length": gFloor? gFloor.floorDimension.length : "",
                        "breath": gFloor ? gFloor.floorDimension.breath:"",
                        "height": gFloor ? gFloor.floorDimension.height:""
                    },
                    "unit":gFloor.unit
                },
              
              {
                    "floorType": "firstFloor",
                    "floorDimension": {
                        "dimension":"SQFT",
                        "length": fFloor ? fFloor.floorDimension.length : "",
                        "breath": fFloor ? fFloor.floorDimension.breath : "",
                        "height": fFloor ? fFloor.floorDimension.height : ""
                    },
                    "unit":fFloor.unit
                },
                
              {
                "floorType": "secondFloor",
                "floorDimension": {
                    "dimension":"SQFT",
                    "length": sFloor ? sFloor.floorDimension.length : "",
                    "breath": sFloor ? sFloor.floorDimension.breath : "",
                    "height": sFloor ? sFloor.floorDimension.height : ""
                },
                "unit":sFloor.unit
            }],
            "totalAvailableSpace":spaceInfo ? spaceInfo.totalAvailableSpace : "",

            "noOfShift":spaceInfo ? spaceInfo.noOfShift : "",
            "availableSpaces": [
              {
                "availableSpaceType": "basement",
                "availableSpaceDimension": {
                    "dimension":"SQFT",
                    "length":bFloor1 ?  bFloor1?.availableSpaceDimension.length : "",
                    "breath": bFloor1 ? bFloor1?.availableSpaceDimension.breath : "",
                    "height": bFloor1 ? bFloor1?.availableSpaceDimension.height : ""
                },
                "unit":"FEET"
            },
              {
                "availableSpaceType": "groundFloor",
                "availableSpaceDimension": {
                    "dimension":"SQFT",
                    "length": gFloor1? gFloor1?.availableSpaceDimension.length : "",
                    "breath": gFloor1 ? gFloor1?.availableSpaceDimension.breath:"",
                    "height": gFloor1 ? gFloor1?.availableSpaceDimension.height:""
                },
                "unit":"FEET"
            },
          
          {
                "availableSpaceType": "firstFloor",
                "availableSpaceDimension": {
                    "dimension":"SQFT",
                    "length": fFloor1 ? fFloor1.availableSpaceDimension.length : "",
                    "breath": fFloor1 ? fFloor1.availableSpaceDimension.breath : "",
                    "height": fFloor1 ? fFloor1.availableSpaceDimension.height : ""
                },
                "unit":"FEET"
            },
            
          {
            "availableSpaceType": "secondFloor",
            "availableSpaceDimension": {
                "dimension":"SQFT",
                "length": sFloor1 ? sFloor1.availableSpaceDimension.length : "",
                "breath": sFloor1 ? sFloor1.availableSpaceDimension.breath : "",
                "height": sFloor1 ? sFloor1.availableSpaceDimension.height : ""
            },
            "unit":"FEET"
        }],
                "racks": [{
                    "name": "shelveracks",
                    "rackInfo":{
                        "quantity": slaveRack ? slaveRack.rackInfo.quantity : "",
                        "length": slaveRack ? slaveRack.rackInfo.length : "",
                        "breath": slaveRack ? slaveRack.rackInfo.breath : "",
                        "height": slaveRack ? slaveRack.rackInfo.height : ""
                    }
                },{
                    "name": "binsracks",
                    "rackInfo":{
                        "quantity": binRack ? binRack.rackInfo.quantity : "",
                        "length": binRack ? binRack.rackInfo.length : "",
                        "breath": binRack ? binRack.rackInfo.breath : "",
                        "height": binRack ? binRack.rackInfo.height : ""
                    }
                }],
                "dockSize": {
                    "height": spaceInfo ? spaceInfo.dockSize.height : "",
                    "width": spaceInfo ? spaceInfo.dockSize.width : "",
                    "heightFromGound": spaceInfo ? spaceInfo.dockSize.heightFromGound : ""
                }            
              }
      )
  console.log("fdjfj",bFloor.floorDimension.breath.length)
      setCheckForm({
        basementCheck:bFloor.floorDimension.breath.length!==0?true:false,
        groundFloorCheck: gFloor.floorDimension.breath.length!==0?true:false,
        firstFloorCheck : fFloor.floorDimension.breath.length!==0?true:false,
        secondFloorCheck : sFloor.floorDimension.breath.length!==0?true:false
      })
      setCheckForm1({
        basementCheck1:bFloor1?.availableSpaceDimension.breath.length!==0?true:false,
        groundFloorCheck1: gFloor1?.availableSpaceDimension.breath.length!==0?true:false,
        firstFloorCheck1 : fFloor1?.availableSpaceDimension.breath.length!==0?true:false,
        secondFloorCheck1 : sFloor1?.availableSpaceDimension.breath.length!==0?true:false
      })
    }
  },[data.singleFormData]);
  
        // for validation

        const storeSchema = Yup.object().shape({

          // floors: Yup.array().of(
          //   Yup.object().shape({
          //     floorDimension: Yup.object().shape({
          //       length: Yup.number().required('Required'),
          //       breath: Yup.number().required('Required'),
          //       height: Yup.number().required('Required')
          //     })
          // })),

          noOfShift: Yup.number().required('Required'),

          // availableSpace : Yup.number().required('Required'),
          loadingAndUnloadingBays : Yup.number().required('Required'),

          // parkingArea: Yup.number().required('Required'),  

          parkingArea: Yup.lazy(() =>{
            if(parkingYes){
              return Yup.number().required('Required')
            }
            return Yup.mixed().notRequired();
          }),

          dockSize: Yup.object().shape({
            height: Yup.number().required('Required'),
            width: Yup.number().required('Required'),
            heightFromGound: Yup.number().required('Required'),
          }),

          // racks: Yup.array().of(
          //     Yup.object().shape({
          //       rackInfo: Yup.object().shape({
          //         quantity: Yup.number().required('Required'),
          //         length: Yup.number().required('Required'),
          //         breath: Yup.number().required('Required'),
          //         height: Yup.number().required('Required')
          //       })
          //   })),
            // ######################################


            // racks: Yup.array().when(
            //   Yup.object().shape({
            //     rackInfo: Yup.object().shape({
            //       quantity: Yup.number().required('Required'),
            //       length: Yup.number().required('Required'),
            //       breath: Yup.number().required('Required'),
            //       height: Yup.number().required('Required')
            //     })
            // })),


            // ######################################
    });

    // Racks Custom Validation

    function rack(value) {
      let error;
      if (racksSlottedYes && value === "") {
        error = 'Required';
      }

      return error;
    }

    function rack2(value) {
      let error;

      if(racksShelveYes && value === "") {
        error = 'Required';
      }

      return error;
    }

    // Floor Cutom Validation
    function floorValidation(value) {
      let error;
      if(groundFloorCheck && value===""){
        error = 'Required';
      }

      return error;
    }

    function floorValidation1(value) {
      let error;
      if (basementCheck && value === "") {
        error = 'Required';
      }

      return error;
    }

    function floorValidation2(value) {
      let error;
      if (firstFloorCheck && value === "") {
        error = 'Required';
      }

      return error;
    }

    function floorValidation3(value) {
      let error;
      if (secondFloorCheck && value === "") {
        error = 'Required';
      }

      return error;
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
          
          <div className="row align-items-center pb-3 mx-0"> 
            <div className="col-12">

            <Formik
              enableReinitialize={true}
              initialValues={storeForm}
              validationSchema={storeSchema}
              onSubmit={fields => {
                if(!parkingYes){
                  fields["parkingArea"]=""
                }

            
                if(racksSlottedYes === false && fields.racks[0].name === "binsracks"){
                  fields.racks[0].rackInfo['quantity'] = ""
                  fields.racks[0].rackInfo['length'] = ""
                  fields.racks[0].rackInfo['breath'] = ""
                  fields.racks[0].rackInfo['height'] = ""
                }
                if(racksShelveYes === false && fields.racks[1].name === "shelveracks"){
                  fields.racks[1].rackInfo['quantity'] = ""
                  fields.racks[1].rackInfo['length'] = ""
                  fields.racks[1].rackInfo['breath'] = ""
                  fields.racks[1].rackInfo['height'] = ""
                }

                if(groundFloorCheck === false){
                  fields.floors[1].floorDimension.length=""
                  fields.floors[1].floorDimension.breath=""
                  fields.floors[1].floorDimension.height=""
                }

                if(basementCheck === false){
                  fields.floors[0].floorDimension.length=""
                  fields.floors[0].floorDimension.breath=""
                  fields.floors[0].floorDimension.height=""
                }

                if(firstFloorCheck === false){
                  fields.floors[2].floorDimension.length=""
                  fields.floors[2].floorDimension.breath=""
                  fields.floors[2].floorDimension.height=""
                }

                if(secondFloorCheck === false){
                  fields.floors[3].floorDimension.length=""
                  fields.floors[3].floorDimension.breath=""
                  fields.floors[3].floorDimension.height=""
                }


                
                if(groundFloorCheck1 === false){
                  fields.availableSpaces[1].availableSpaceDimension.length=""
                  fields.availableSpaces[1].availableSpaceDimension.breath=""
                  fields.availableSpaces[1].availableSpaceDimension.height=""
                }

                if(basementCheck1 === false){
                  fields.availableSpaces[0].availableSpaceDimension.length=""
                  fields.availableSpaces[0].availableSpaceDimension.breath=""
                  fields.availableSpaces[0].availableSpaceDimension.height=""
                }

                if(firstFloorCheck1 === false){
                  fields.availableSpaces[2].availableSpaceDimension.length=""
                  fields.availableSpaces[2].availableSpaceDimension.breath=""
                  fields.availableSpaces[2].availableSpaceDimension.height=""
                }

                if(secondFloorCheck1 === false){
                  fields.availableSpaces[3].availableSpaceDimension.length=""
                  fields.availableSpaces[3].availableSpaceDimension.breath=""
                  fields.availableSpaces[3].availableSpaceDimension.height=""
                }
                if(basementCheck===true&&groundFloorCheck===true&&firstFloorCheck===true&&secondFloorCheck===true)
                {
                  fields["totalArea"]=((fields.floors[0].floorDimension.length)*(fields.floors[0].floorDimension.breath)
                  + (fields.floors[1].floorDimension.length)*(fields.floors[1].floorDimension.breath)
                  + (fields.floors[2].floorDimension.length)*(fields.floors[2].floorDimension.breath)
                  + (fields.floors[3].floorDimension.length)*(fields.floors[3].floorDimension.breath))
                  fields["palletsOnFloor"]=((fields.floors[0].floorDimension.length)*(fields.floors[0].floorDimension.breath)
                  + (fields.floors[1].floorDimension.length)*(fields.floors[1].floorDimension.breath)
                  + (fields.floors[2].floorDimension.length)*(fields.floors[2].floorDimension.breath)
                  + (fields.floors[3].floorDimension.length)*(fields.floors[3].floorDimension.breath))/29
                }
                if(basementCheck===true&&groundFloorCheck===true&&firstFloorCheck===true&&secondFloorCheck===false)
                {
                  fields["totalArea"]=((fields.floors[0].floorDimension.length)*(fields.floors[0].floorDimension.breath)
                  + (fields.floors[1].floorDimension.length)*(fields.floors[1].floorDimension.breath)
                  + (fields.floors[2].floorDimension.length)*(fields.floors[2].floorDimension.breath)
                  )
                  fields["palletsOnFloor"]=((fields.floors[0].floorDimension.length)*(fields.floors[0].floorDimension.breath)
                  + (fields.floors[1].floorDimension.length)*(fields.floors[1].floorDimension.breath)
                  + (fields.floors[2].floorDimension.length)*(fields.floors[2].floorDimension.breath)
                  )/29
                }
                if(basementCheck===true&&groundFloorCheck===true&&firstFloorCheck===false&&secondFloorCheck===false)
                {
                  fields["totalArea"]=((fields.floors[0].floorDimension.length)*(fields.floors[0].floorDimension.breath)
                  + (fields.floors[1].floorDimension.length)*(fields.floors[1].floorDimension.breath)
                  
                  )
                  fields["palletsOnFloor"]=((fields.floors[0].floorDimension.length)*(fields.floors[0].floorDimension.breath)
                  + (fields.floors[1].floorDimension.length)*(fields.floors[1].floorDimension.breath)
                  
                  )/29
                }
             
                if(basementCheck===true&&groundFloorCheck===false&&firstFloorCheck===false&&secondFloorCheck===false)
                {
                  fields["totalArea"]=((fields.floors[0].floorDimension.length)*(fields.floors[0].floorDimension.breath)
                 
                  
                  )
                  fields["palletsOnFloor"]=((fields.floors[0].floorDimension.length)*(fields.floors[0].floorDimension.breath)
                 
                  
                  )/29
                }

                /////////

                if(basementCheck1===true&&groundFloorCheck1===true&&firstFloorCheck1===true&&secondFloorCheck1===true)
                {
                  fields["totalAvailableSpace"]=((fields.availableSpaces[0].availableSpaceDimension.length)*(fields.availableSpaces[0].availableSpaceDimension.breath)
                  + (fields.availableSpaces[1].availableSpaceDimension.length)*(fields.availableSpaces[1].availableSpaceDimension.breath)
                  + (fields.availableSpaces[2].availableSpaceDimension.length)*(fields.availableSpaces[2].availableSpaceDimension.breath)
                  + (fields.availableSpaces[3].availableSpaceDimension.length)*(fields.availableSpaces[3].availableSpaceDimension.breath))
                }
                if(basementCheck1===true&&groundFloorCheck1===true&&firstFloorCheck1===true&&secondFloorCheck1===false)
                {
                  fields["totalAvailableSpace"]=((fields.availableSpaces[0].availableSpaceDimension.length)*(fields.availableSpaces[0].availableSpaceDimension.breath)
                  + (fields.availableSpaces[1].availableSpaceDimension.length)*(fields.availableSpaces[1].availableSpaceDimension.breath)
                  + (fields.availableSpaces[2].availableSpaceDimension.length)*(fields.availableSpaces[2].availableSpaceDimension.breath)
                  )
                }
                if(basementCheck1===true&&groundFloorCheck1===true&&firstFloorCheck1===false&&secondFloorCheck1===false)
                {
                  fields["totalAvailableSpace"]=((fields.availableSpaces[0].availableSpaceDimension.length)*(fields.availableSpaces[0].availableSpaceDimension.breath)
                  + (fields.availableSpaces[1].availableSpaceDimension.length)*(fields.availableSpaces[1].availableSpaceDimension.breath)
                  
                  )
                }
             
                if(basementCheck1===true&&groundFloorCheck1===false&&firstFloorCheck1===false&&secondFloorCheck1===false)
                {
                  fields["totalAvailableSpace"]=((fields.availableSpaces[0].availableSpaceDimension.length)*(fields.availableSpaces[0].availableSpaceDimension.breath)
                 
                  
                  )
                }
                fields["warehouse"] = data.singleFormData.id;

                console.log("Fields Data===>", fields);
                dispatch(updateStorageSpace(fields))           
              }}
              
              render={({values, errors, status,onChange,setFieldValue, touched }) => {
            const fieldClass =(fieldName, isYes=true)=>{
              return 'form-control bg-white px-4'+ (isYes ? errors[fieldName] && touched[fieldName] ? ' is-invalid' : '' : '')
            }

            const fieldClassObj =(fieldName, isTrue=true)=>{
              return 'form-control bg-white px-4'+ (isTrue ? (getIn(errors, fieldName) && getIn(touched,fieldName) ? ' is-invalid': '') :'')

            }


                return (

                    <Form> 
                      <div className="row bg-white rounded mx-0 col-xxxl-11">
                        <div className="form-group form-inline col-12 mb-3 mt-2">
                          <label htmlFor="staticEmail" className="mb-1 mr-3">Storage Type:</label>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <Field name="storageType" className="common-radio-deep-blue-input" type="radio" id="floor-area" value="floorarea" hidden="" disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="floor-area">Floor Area</label>
                            </div>
                            <div className="form-check common-radio-deep-blue mx-3">
                              <Field name="storageType" className="common-radio-deep-blue-input" type="radio" id="pallet-position" value="palletposition" hidden=""  disabled={viewMood} />
                              <label className="common-radio-deep-blue-label pl-4" htmlFor="pallet-position">Pallet Position</label>
                            </div>
                        </div>
                        <tr>
                    <td className="mw-150px">
</td>
<td className="mw-150px">
</td>
                    <td className="text-left px-4" colSpan="2">
                                  {/* <p className="font-weight-bold">Field Agent Remarks</p>  */}
                                  <div className="row ">
            <div className="col-auto">
                <p className="px-3 py-2">WHS Remarks</p>
            </div>
            <div className="col-auto form-inline form-group form-inline">
                <p className="py-2">{formField&&formField.storageSpaceRemark&&formField.storageSpaceRemark.storageType.whsstatus===true?"okay":"not okay"}</p>
            </div>
            <div className="mw-75px">
                <input  value={formField&&formField.storageSpaceRemark&&formField.storageSpaceRemark.storageType.whsremark} type="text" className="form-control  px-4 ml-xl-0 ml-3 mb-2" placeholder="Remarks" disabled/>
            </div>
            </div>
                                </td> 
                    </tr>
                        <div className="col-12 border-0 border-bottom-0 table-responsive table-collapse">
                          <table className="table"> 
                            <tbody> 
                            <tr>
                                <td className="w-160px">
                                  <p className="mb-3">Floor(in ft): <sup className="text-danger">*</sup></p>
                                </td>
                                <td className="col-auto"></td>
                                <td className="col-auto"></td>
                                <td className="w-150px">
                                  <div className="common-checkbox-deep-blue2 position-relative mb-2 mx-auto d-inline-block">
                                    <input disabled={values.storageType==="palletposition"||viewMood} name="basementCheck" onChange={(e)=>handleCheck(e)} value={!basementCheck} checked={basementCheck} className="common-checkbox-deep-blue2-input" type="checkbox" id="defaultCheck1"   />
                                    <label className="common-checkbox-deep-blue2-label pl-4 mr-3" htmlFor="defaultCheck1">Basement 
                                    </label>
                                  </div>
                                </td> 
                                <td className="w-150px">
                                  <div className="common-checkbox-deep-blue2 position-relative mb-2 mx-auto d-inline-block">
                                    <input name="groundFloorCheck" onChange={(e)=>handleCheck(e)}  value={!groundFloorCheck}  checked={groundFloorCheck} className="common-checkbox-deep-blue2-input" type="checkbox" id="defaultCheck2"  disabled={values.storageType==="palletposition"||viewMood} />
                                    <label className="common-checkbox-deep-blue2-label pl-4 mr-3" htmlFor="defaultCheck2">Ground Floor
                                    </label>
                                  </div>
                                </td> 
                                <td className="w-150px">
                                  <div className="common-checkbox-deep-blue2 position-relative mb-2 mx-auto d-inline-block">
                                    <Field name="firstFloorCheck" onChange={(e)=>handleCheck(e)} value={!firstFloorCheck} checked={firstFloorCheck} className="common-checkbox-deep-blue2-input" type="checkbox" id="defaultCheck3"  disabled={values.storageType==="palletposition"||viewMood} />
                                    <label className="common-checkbox-deep-blue2-label pl-4 mr-3" htmlFor="defaultCheck3">1st Floor
                                    </label>
                                  </div>
                                </td>
                                <td className="w-150px">
                                  <div className="common-checkbox-deep-blue2 position-relative mb-2 mx-auto d-inline-block">
                                    <Field name="secondFloorCheck" onChange={(e)=>handleCheck(e)} value={!secondFloorCheck} checked={secondFloorCheck} className="common-checkbox-deep-blue2-input" type="checkbox" id="defaultCheck4"  disabled={values.storageType==="palletposition"||viewMood} />
                                    <label className="common-checkbox-deep-blue2-label pl-4 mr-3" htmlFor="defaultCheck4">2nd Floor
                                    </label>
                                  </div>
                                </td>
                              </tr> 
                              <tr>
                                <td className="w-100px">
                                </td>
                                <td className="col-auto">
                                  {/* <Field  onChange={(e)=>{
                              let a=`floors[${0}].unit`
                              let b=`floors[${1}].unit`
                              let c=`floors[${2}].unit`
                              let d=`floors[${3}].unit`

                              setFieldValue(a,e.target.value)
                              setFieldValue(b,e.target.value)
                              setFieldValue(c,e.target.value)
                              setFieldValue(d,e.target.value)

                            }} name={`floors[${0}].unit`} defaultValue="FEET" as="select" className="form-control custom-select bg-white px-4 common-select-deep-blue" id="exampleFormControlSelect1" disabled={viewMood}>
                                    <option>Select Unit</option>
                                    <option>FEET</option>
                                    <option>INCH</option>
                                    <option>M</option>
                                  </Field> */}
                                </td>
                                <td className="col-auto"></td>
                                <td className="w-150px">
                                <label className=" pl-4 mr-3" htmlFor="defaultCheck1">Length
                        </label>
                                  <Field type="number" name={`floors[${0}].floorDimension.length`} validate={floorValidation1} className={fieldClassObj(`floors[${0}].floorDimension.length`, basementCheck)}  placeholder="Length"  readOnly={values.storageType==="palletposition"||viewMood||!basementCheck}  />
                                  <ErrorMessage name={`floors[${0}].floorDimension.length`}  component="div" className="invalid-feedback" />
                                </td> 
                                <td className="w-150px">
                                <label className=" pl-4 mr-3" htmlFor="defaultCheck1">Length
                        </label>
                                  <Field type="number" name={`floors[${1}].floorDimension.length`} validate={floorValidation} className={fieldClassObj(`floors[${1}].floorDimension.length`, groundFloorCheck)} placeholder="Length"  readOnly={values.storageType==="palletposition"||viewMood||!groundFloorCheck} />
                                  <ErrorMessage name={`floors[${1}].floorDimension].length`} component="div" className="invalid-feedback" />
                                </td> 
                                <td className="w-150px">
                                <label className=" pl-4 mr-3" htmlFor="defaultCheck1">Length
                        </label>
                                  <Field type="number" name={`floors[${2}].floorDimension.length`} validate={floorValidation2} className={fieldClassObj(`floors[${2}].floorDimension.length`, firstFloorCheck)} placeholder="Length"  readOnly={values.storageType==="palletposition"||viewMood||!firstFloorCheck} />
                                  <ErrorMessage name={`floors[${2}].floorDimension.length`} component="div" className="invalid-feedback" />
                                </td>
                                <td className="w-150px">
                                <label className=" pl-4 mr-3" htmlFor="defaultCheck1">Length
                        </label>
                                  <Field type="number" name={`floors[${3}].floorDimension.length`} validate={floorValidation3} className={fieldClassObj(`floors[${3}].floorDimension.length`, secondFloorCheck)} placeholder="Length"  readOnly={values.storageType==="palletposition"||viewMood||!secondFloorCheck} />
                                  <ErrorMessage name={`floors[${3}].floorDimension.length`} component="div" className="invalid-feedback" />
                                </td>
                              </tr> 
                              <tr>
                                <td className="w-100px">
                                </td>
                                <td className="col-auto"> 
                                </td>
                                <td className="col-auto"></td>
                                <td className="w-150px">
                                <label className=" pl-4 mr-3" htmlFor="defaultCheck1">Breadth
                        </label>
                                  <Field type="number" name={`floors[${0}].floorDimension.breath`} validate={floorValidation1} className={fieldClassObj(`floors[${0}].floorDimension.breath`, basementCheck)} placeholder="Breadth" readOnly={values.storageType==="palletposition"||viewMood||!basementCheck} />
                                  <ErrorMessage name={`floors[${0}].floorDimension.breath`} component="div" className="invalid-feedback" />
                                </td> 
                                <td className="w-150px">
                                <label className=" pl-4 mr-3" htmlFor="defaultCheck1">Breadth
                        </label>
                                  <Field type="number" name={`floors[${1}].floorDimension.breath`} validate={floorValidation} className={fieldClassObj(`floors[${1}].floorDimension.breath`,groundFloorCheck)} placeholder="Breadth" readOnly={values.storageType==="palletposition"||viewMood||!groundFloorCheck} />
                                  <ErrorMessage name={`floors[${1}].floorDimension.breath`} component="div" className="invalid-feedback" />
                                </td> 
                                <td className="w-150px">
                                <label className=" pl-4 mr-3" htmlFor="defaultCheck1">Breadth
                        </label>
                                  <Field type="number" name={`floors[${2}].floorDimension.breath`} validate={floorValidation2} className={fieldClassObj(`floors[${2}].floorDimension.breath`, firstFloorCheck)} placeholder="Breadth" readOnly={values.storageType==="palletposition"||viewMood||!firstFloorCheck} />
                                  <ErrorMessage name={`floors[${2}].floorDimension.breath`} component="div" className="invalid-feedback" />
                                </td>
                                <td className="w-150px">
                                <label className=" pl-4 mr-3" htmlFor="defaultCheck1">Breadth
                        </label>
                                  <Field type="number" name={`floors[${3}].floorDimension.breath`} validate={floorValidation3} className={fieldClassObj(`floors[${3}].floorDimension.breath`, secondFloorCheck)} placeholder="Breadth" readOnly={values.storageType==="palletposition"||viewMood||!secondFloorCheck} />
                                  <ErrorMessage name={`floors[${3}].floorDimension.breath`} component="div" className="invalid-feedback" />  
                                </td>
                              </tr> 
                              <tr>
                                <td className="w-100px">
                                </td>
                                <td className="col-auto"> 
                                </td>
                                <td className="col-auto"></td>
                                <td className="w-150px">
                                <label className=" pl-4 mr-3" htmlFor="defaultCheck1">Height
                        </label>
                                  <Field type="number" name={`floors[${0}].floorDimension.height`} validate={floorValidation1} className={fieldClassObj(`floors[${0}].floorDimension.height`, basementCheck)} placeholder="Height" readOnly={values.storageType==="palletposition"||viewMood||!basementCheck} />
                                  <ErrorMessage name={`floors[${0}].floorDimension.height`} component="div" className="invalid-feedback" />
                                </td> 
                                <td className="w-150px">
                                <label className=" pl-4 mr-3" htmlFor="defaultCheck1">Height
                        </label>
                                  <Field type="number" name={`floors[${1}].floorDimension.height`} validate={floorValidation} className={fieldClassObj(`floors[${1}].floorDimension.height`, groundFloorCheck)} placeholder="Height" readOnly={values.storageType==="palletposition"||viewMood||!groundFloorCheck} />
                                  <ErrorMessage name={`floors[${1}].floorDimension.height`} component="div" className="invalid-feedback" />
                                </td> 
                                <td className="w-150px">
                                <label className=" pl-4 mr-3" htmlFor="defaultCheck1">Height
                        </label>
                                  <Field type="number" name={`floors[${2}].floorDimension.height`} validate={floorValidation2} className={fieldClassObj(`floors[${2}].floorDimension.height`, firstFloorCheck)} placeholder="Height" readOnly={values.storageType==="palletposition"||viewMood||!firstFloorCheck} />
                                  <ErrorMessage name={`floors[${2}].floorDimension.height`} component="div" className="invalid-feedback" />
                                </td>
                                <td className="w-150px">
                                <label className=" pl-4 mr-3" htmlFor="defaultCheck1">Height
                        </label>
                                  <Field type="number" name={`floors[${3}].floorDimension.height`} validate={floorValidation3} className={fieldClassObj(`floors[${3}]floorDimension.height`, secondFloorCheck)} placeholder="Height" readOnly={values.storageType==="palletposition"||viewMood||!secondFloorCheck} />
                                  <ErrorMessage name={`floors[${3}].floorDimension.height`} component="div" className="invalid-feedback" />
                                </td>
                              </tr>
                              <tr>
                              <p className="mb-0 mt-3">Total Area({values.floors?values.floors[0].unit==="FEET"?"sqft":"":""}
                            {values.floors?values.floors[0].unit==="INCH"?"sqin":"":""}
                            {values.floors?values.floors[0].unit==="M"?"sqm":"":""}):</p>
                                <td className="col-auto">
                                  <Field name="totalArea" className="form-control bg-white px-4" value={(values.floors[0].floorDimension.length)*(values.floors[0].floorDimension.breath)
                                    + (values.floors[1].floorDimension.length)*(values.floors[1].floorDimension.breath)
                                    + (values.floors[2].floorDimension.length)*(values.floors[2].floorDimension.breath)
                                    + (values.floors[3].floorDimension.length)*(values.floors[3].floorDimension.breath)} disabled/> 
                                </td>
                                <td className="col-auto"></td>
                                <td className="w-150px">
                                  <input className="form-control bg-white px-4" value={(values.floors[0].floorDimension.length)*(values.floors[0].floorDimension.breath)} disabled />
                                </td> 
                                <td className="w-150px">
                                  <input className="form-control bg-white px-4" value={(values.floors[1].floorDimension.length)*(values.floors[1].floorDimension.breath)} disabled />
                                </td> 
                                <td className="w-150px">
                                  <input className="form-control bg-white px-4" value={(values.floors[2].floorDimension.length)*(values.floors[2].floorDimension.breath)} disabled />
                                </td>
                                <td className="w-150px">
                                  <input className="form-control bg-white px-4" value={(values.floors[3].floorDimension.length)*(values.floors[3].floorDimension.breath)} disabled />
                                </td>
                              </tr>
                              <tr>
                    <td className="mw-150px">
</td>
<td className="mw-150px">
</td>
                    <td className="text-left px-4" colSpan="2">
                                  {/* <p className="font-weight-bold">Field Agent Remarks</p>  */}
                                  <div className="row ">
            <div className="col-auto">
                <p className="px-3 py-2">WHS Remarks</p>
            </div>
            <div className="col-auto form-inline form-group form-inline">
                <p className="py-2">{formField&&formField.storageSpaceRemark&&formField.storageSpaceRemark.totalArea.whsstatus===true?"okay":"not okay"}</p>
            </div>
            <div className="mw-75px">
                <input  value={formField&&formField.storageSpaceRemark&&formField.storageSpaceRemark.totalArea.whsremark} type="text" className="form-control  px-4 ml-xl-0 ml-3 mb-2" placeholder="Remarks" disabled/>
            </div>
            </div>
                                </td> 
                    </tr>
                               
                    <tr>
                                <td className="w-100px">
                                  <p className="mb-0">Pallets on Floor:</p>
                                </td>
                                <td className="col-auto">
                                  <Field value={((values.floors[0].floorDimension.length)*(values.floors[0].floorDimension.breath)
                                    + (values.floors[1].floorDimension.length)*(values.floors[1].floorDimension.breath)
                                    + (values.floors[2].floorDimension.length)*(values.floors[2].floorDimension.breath)
                                    + (values.floors[3].floorDimension.length)*(values.floors[3].floorDimension.breath))/29}  name="palletsOnFloor" disabled type="number" className={fieldClass("palletsOnFloor")} placeholder="palletsOnFloor" readOnly={viewMood} /> 
                                  <ErrorMessage name="palletsOnFloor" component="div" className="invalid-feedback" />
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
                    <td className="mw-150px">
</td>
<td className="mw-150px">
</td>
                    <td className="text-left px-4" colSpan="2">
                                  {/* <p className="font-weight-bold">Field Agent Remarks</p>  */}
                                  <div className="row ">
            <div className="col-auto">
                <p className="px-3 py-2">Whs Remarks</p>
            </div>
            <div className="col-auto form-inline form-group form-inline">
                <p className="py-2">{formField&&formField.storageSpaceRemark&&formField.storageSpaceRemark.palletsOnFloor.whsstatus===true?"okay":"not okay"}</p>
            </div>
            <div className="mw-75px">
                <input  value={formField&&formField.storageSpaceRemark&&formField.storageSpaceRemark.palletsOnFloor.whsremark} type="text" className="form-control  px-4 ml-xl-0 ml-3 mb-2" placeholder="Remarks" disabled/>
            </div>
            </div>
                                </td> 
                    </tr>
                              <tr>
                                <td className="w-100px">
                                  <p className="mb-0">Racks (Slotted Angle) - No of Bins:</p>
                                </td>
                                <td className="col-auto form-inline form-group py-3 mb-0">
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <Field name="racksSlottedYes" onChange={(e)=>handleYes(e)} checked={racksSlottedYes} className="common-radio-deep-blue-input" type="radio" id="racksSlotted" value={true} hidden="" disabled={viewMood}/>
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="racksSlotted">Yes</label>
                                  </div>
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <Field name="racksSlottedYes" onChange={(e)=>handleYes(e)} checked={!racksSlottedYes} className="common-radio-deep-blue-input" type="radio" id="racksSlotted1" value={false} hidden="" disabled={viewMood}/>
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="racksSlotted1">No</label>
                                  </div> 
                                </td>
                                <td className="col-auto"></td>
                                <td className="w-150px">
                                  <Field type="number" name={`racks[${0}].rackInfo.quantity`} validate={rack} className={fieldClassObj(`racks[${0}].rackInfo.quantity`, racksSlottedYes)} placeholder="Qty" disabled={!racksSlottedYes} readOnly={viewMood}/>
                                  <ErrorMessage name={`racks[${0}].rackInfo.quantity`} component="div" className="invalid-feedback" />
                                </td> 
                                <td className="w-150px">
                                  <Field type="number" name={`racks[${0}].rackInfo.length`} validate={rack} className={fieldClassObj(`racks[${0}].rackInfo.length`, racksSlottedYes)} placeholder="L" disabled={!racksSlottedYes} readOnly={viewMood}/>
                                  <ErrorMessage name={`racks[${0}].rackInfo.length`} component="div" className="invalid-feedback" />
                                </td> 
                                <td className="w-150px">
                                  <Field type="number" name={`racks[${0}].rackInfo.breath`} validate={rack} className={fieldClassObj(`racks[${0}].rackInfo.breath`, racksSlottedYes)} placeholder="B" disabled={!racksSlottedYes} readOnly={viewMood}/>
                                  <ErrorMessage name={`racks[${0}].rackInfo.breath`} component="div" className="invalid-feedback" />
                                </td>
                                <td className="w-150px">
                                  <Field type="number" name={`racks[${0}].rackInfo.height`} validate={rack} className={fieldClassObj(`racks[${0}].rackInfo.height`, racksSlottedYes)} placeholder="H" disabled={!racksSlottedYes} readOnly={viewMood}/>
                                  <ErrorMessage name={`racks[${0}].rackInfo.height`} component="div" className="invalid-feedback" />
                                </td>
                              </tr>
                              <tr>
                    <td className="mw-150px">
</td>
<td className="mw-150px">
</td>
                    <td className="text-left px-4" colSpan="2">
                                  {/* <p className="font-weight-bold">Field Agent Remarks</p>  */}
                                  <div className="row ">
            <div className="col-auto">
                <p className="px-3 py-2">Whs Remarks</p>
            </div>
            <div className="col-auto form-inline form-group form-inline">
                <p className="py-2">{formField &&formField.storageSpaceRemark&& formField.storageSpaceRemark.racks && formField.storageSpaceRemark.racks.length>0 && formField.storageSpaceRemark.racks[0].rack.whsstatus===true?"okay" : "not okay"}</p>
            </div>
            <div className="mw-75px">
                <input   value={formField &&formField.storageSpaceRemark&& formField.storageSpaceRemark.racks && formField.storageSpaceRemark.racks.length>0 && formField.storageSpaceRemark.racks[0].rack.whsremark} type="text" className="form-control  px-4 ml-xl-0 ml-3 mb-2" placeholder="Remarks" disabled/>
            </div>
            </div>
                                </td> 
                    </tr>
                              <tr>
                                <td className="w-100px">
                                  <p className="mb-0">Racks (Shelve Racks) - No of Shelve:</p>
                                </td>
                                <td className="col-auto form-inline form-group py-3 mb-0">
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <Field name="racksShelveYes" onChange={(e)=>handleYes(e)} className="common-radio-deep-blue-input" type="radio" id="racksShelveYes" checked={racksShelveYes} value={true} hidden="" disabled={viewMood}/>
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="racksShelveYes">Yes</label>
                                  </div>
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <Field name="racksShelveYes" onChange={(e)=>handleYes(e)} className="common-radio-deep-blue-input" type="radio" id="racksShelveYes1" checked={!racksShelveYes} value={false} hidden="" disabled={viewMood}/>
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="racksShelveYes1">No</label>
                                  </div> 
                                </td>
                                <td className="col-auto"></td>
                                <td className="w-150px">
                                  <Field type="number" name={`racks[${1}].rackInfo.quantity`} validate={rack2} className={fieldClassObj(`racks[${1}].rackInfo.quantity`, racksShelveYes)} placeholder="Qty" disabled={!racksShelveYes} readOnly={viewMood}/>
                                  <ErrorMessage name={`racks[${1}].rackInfo.quantity`} component="div" className="invalid-feedback" />
                                </td> 
                                <td className="w-150px">
                                  <Field type="number" name={`racks[${1}].rackInfo.length`} validate={rack2} className={fieldClassObj(`racks[${1}].rackInfo.length`, racksShelveYes)} placeholder="L" disabled={!racksShelveYes} readOnly={viewMood}/>
                                  <ErrorMessage name={`racks[${1}].rackInfo.length`} component="div" className="invalid-feedback" /></td> 
                                <td className="w-150px">
                                  <Field type="number" name={`racks[${1}].rackInfo.breath`} validate={rack2} className={fieldClassObj(`racks[${1}].rackInfo.breath`, racksShelveYes)} placeholder="B" disabled={!racksShelveYes} readOnly={viewMood}/>
                                  <ErrorMessage name={`racks[${1}].rackInfo.breath`} component="div" className="invalid-feedback" />
                                </td>
                                <td className="w-150px">
                                  <Field type="number" name={`racks[${1}].rackInfo.height`} validate={rack2} className={fieldClassObj(`racks[${1}].rackInfo.height`, racksShelveYes)} placeholder="H" disabled={!racksShelveYes} readOnly={viewMood}/>
                                  <ErrorMessage name={`racks[${1}].rackInfo.height`} component="div" className="invalid-feedback" />
                                </td>
                              </tr>
                              <tr>
                    <td className="mw-150px">
</td>
<td className="mw-150px">
</td>
                    <td className="text-left px-4" colSpan="2">
                                  {/* <p className="font-weight-bold">Field Agent Remarks</p>  */}
                                  <div className="row ">
            <div className="col-auto">
                <p className="px-3 py-2">Whs Remarks</p>
            </div>
            <div className="col-auto form-inline form-group form-inline">
                <p className="py-2">{formField &&formField.storageSpaceRemark&& formField.storageSpaceRemark.racks && formField.storageSpaceRemark.racks.length>0 && formField.storageSpaceRemark.racks[1].rack.whsstatus===true?"okay" : "not okay"}</p>
            </div>
            <div className="mw-75px">
                <input   value={formField &&formField.storageSpaceRemark&& formField.storageSpaceRemark.racks && formField.storageSpaceRemark.racks.length>0 && formField.storageSpaceRemark.racks[1].rack.whsremark} type="text" className="form-control  px-4 ml-xl-0 ml-3 mb-2" placeholder="Remarks" disabled/>
            </div>
            </div>
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
                                  <Field name="availableSpace" type="number" className={fieldClass("availableSpace")} placeholder="Enter Space" readOnly={viewMood}/> 
                                  <ErrorMessage name="availableSpace" component="div" className="invalid-feedback" />
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
                    <td className="mw-150px">
</td>
<td className="mw-150px">
</td>
                    <td className="text-left px-4" colSpan="2">
                                  {/* <p className="font-weight-bold">Field Agent Remarks</p>  */}
                                  <div className="row ">
            <div className="col-auto">
                <p className="px-3 py-2">Whs Remarks</p>
            </div>
            <div className="col-auto form-inline form-group form-inline">
                <p className="py-2">{formField &&formField.storageSpaceRemark&&formField.storageSpaceRemark.availableSpace.whsstatus===true?"okay" : "not okay"}</p>
            </div>
            <div className="mw-75px">
                <input   value={formField &&formField.storageSpaceRemark&&formField.storageSpaceRemark.availableSpace.whsremark} type="text" className="form-control  px-4 ml-xl-0 ml-3 mb-2" placeholder="Remarks" disabled/>
            </div>
            </div>
                                </td> 
                    </tr>
                              <tr>
                                <td className="w-100px">
                                  <p className="mb-0">No. of Loading/ unloading Bays:</p>
                                </td>
                                <td className="col-auto">
                                  <Field  name="loadingAndUnloadingBays" type="number" className={fieldClass("loadingAndUnloadingBays")} placeholder="Enter Bays" readOnly={viewMood}/> 
                                  <ErrorMessage name="loadingAndUnloadingBays" component="div" className="invalid-feedback" />
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
                    <td className="mw-150px">
</td>
<td className="mw-150px">
</td>
                    <td className="text-left px-4" colSpan="2">
                                  {/* <p className="font-weight-bold">Field Agent Remarks</p>  */}
                                  <div className="row ">
            <div className="col-auto">
                <p className="px-3 py-2">Whs Remarks</p>
            </div>
            <div className="col-auto form-inline form-group form-inline">
                <p className="py-2">{formField &&formField.storageSpaceRemark&&formField.storageSpaceRemark.loadingAndUnloadingBays.whsstatus===true?"okay" : "not okay"}</p>
            </div>
            <div className="mw-75px">
                <input   value={formField &&formField.storageSpaceRemark&&formField.storageSpaceRemark.loadingAndUnloadingBays.whsremark} type="text" className="form-control  px-4 ml-xl-0 ml-3 mb-2" placeholder="Remarks" disabled/>
            </div>
            </div>
                                </td> 
                    </tr>
                    <tr>
                                <td className="w-100px">
                                  <p className="mb-0">No. of Shifts:</p>
                                </td>
                                <td className="col-auto">
                                  <Field  name="noOfShift" type="number" className={fieldClass("noOfShift")} placeholder="Enter No Of Shifts" /> 
                                  <ErrorMessage name="noOfShift" component="div" className="invalid-feedback" />
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
                    <td className="mw-150px">
</td>
<td className="mw-150px">
</td>
                    <td className="text-left px-4" colSpan="2">
                                  {/* <p className="font-weight-bold">Field Agent Remarks</p>  */}
                                  <div className="row ">
            <div className="col-auto">
                <p className="px-3 py-2">Whs Remarks</p>
            </div>
            <div className="col-auto form-inline form-group form-inline">
                <p className="py-2">{formField &&formField.storageSpaceRemark&&formField.storageSpaceRemark.noOfShift.whsstatus===true?"okay" : "not okay"}</p>
            </div>
            <div className="mw-75px">
                <input   value={formField &&formField.storageSpaceRemark&&formField.storageSpaceRemark.noOfShift.whsremark} type="text" className="form-control  px-4 ml-xl-0 ml-3 mb-2" placeholder="Remarks" disabled/>
            </div>
            </div>
                                </td> 
                    </tr>
                              <tr>
                                <td className="w-100px">
                                  <p className="mb-0">Dock Size:</p>
                                </td>
                                <td className="col-auto">
                                  <Field type="number" name="dockSize.heightFromGound" className={fieldClassObj("dockSize.heightFromGound")} placeholder="Height From Ground" readOnly={viewMood} /> 
                                  <ErrorMessage name="dockSize.heightFromGound" component="div" className="invalid-feedback" />
                                </td>
                                <td className="col-auto"></td>
                                <td className="w-150px" colSpan="2">
                                  <Field type="number" name={`dockSize.height`} className={fieldClassObj(`dockSize.height`)} placeholder="Enter Height" readOnly={viewMood} /> 
                                  <ErrorMessage name={`dockSize.height`} component="div" className="invalid-feedback" />
                                </td> 
                                <td className="w-150px" colSpan="2">
                                  <Field type="number" name={`dockSize.width`} className={fieldClassObj(`dockSize.width`)} placeholder="Enter Width" readOnly={viewMood} /> 
                                  <ErrorMessage name={`dockSize.width`} component="div" className="invalid-feedback" />
                                </td>  
                              </tr>
                              <tr>
                    <td className="mw-150px">
</td>
<td className="mw-150px">
</td>
                    <td className="text-left px-4" colSpan="2">
                                  {/* <p className="font-weight-bold">Field Agent Remarks</p>  */}
                                  <div className="row ">
            <div className="col-auto">
                <p className="px-3 py-2">Whs Remarks</p>
            </div>
            <div className="col-auto form-inline form-group form-inline">
                <p className="py-2">{formField &&formField.storageSpaceRemark&&formField.storageSpaceRemark.dockSize.whsstatus===true?"okay" : "not okay"}</p>
            </div>
            <div className="mw-75px">
                <input   value={formField &&formField.storageSpaceRemark&&formField.storageSpaceRemark.dockSize.whsremark} type="text" className="form-control  px-4 ml-xl-0 ml-3 mb-2" placeholder="Remarks" disabled/>
            </div>
            </div>
                                </td> 
                    </tr>
                              <tr>
                                <td className="w-100px">
                                  <p className="mb-0">Parking Area (sqft):</p>
                                </td>
                                <td className="col-auto form-inline form-group py-3 mt-1 mb-0">
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input name="parkingYes" onChange={(e)=>handleYes(e)} checked={parkingYes} className="common-radio-deep-blue-input" type="radio" id="parkingYes" value={true} hidden="" disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="parkingYes">Yes</label>
                                  </div>
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input name="parkingYes" onChange={(e)=>handleYes(e)} checked={!parkingYes} className="common-radio-deep-blue-input" type="radio" id="parkingYes1" value={false} hidden="" disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="parkingYes1">No</label>
                                  </div> 
                                </td>
                                <td className="col-auto"></td>
                                <td className="w-150px" colSpan="2">
                                  <Field type="number" name="parkingArea" disabled={!parkingYes} className={fieldClass("parkingArea", parkingYes)} placeholder="" readOnly={viewMood}/>
                                  <ErrorMessage name="parkingArea" component="div" className="invalid-feedback" />
                                </td> 
                                <td className="w-150px"> 
                                </td> 
                                <td className="w-150px"> 
                                </td> 
                              </tr>
                              <tr>
                    <td className="mw-150px">
</td>
<td className="mw-150px">
</td>
                    <td className="text-left px-4" colSpan="2">
                                  {/* <p className="font-weight-bold">Field Agent Remarks</p>  */}
                                  <div className="row ">
            <div className="col-auto">
                <p className="px-3 py-2">Whs Remarks</p>
            </div>
            <div className="col-auto form-inline form-group form-inline">
                <p className="py-2">{formField &&formField.storageSpaceRemark&&formField.storageSpaceRemark.parkingArea.whsstatus===true?"okay" : "not okay"}</p>
            </div>
            <div className="mw-75px">
                <input   value={formField &&formField.storageSpaceRemark&&formField.storageSpaceRemark.parkingArea.whsremark} type="text" className="form-control  px-4 ml-xl-0 ml-3 mb-2" placeholder="Remarks" disabled/>
            </div>
            </div>
                                </td> 
                    </tr>
                            </tbody>
                            
                          </table>
                        </div>
                        <div className="col-12 border-0 border-bottom-0 table-responsive table-collapse">
                          <table className="table"> 
                            <tbody> 
                              <tr>
                                <td className="w-160px">
                                  <p className="mb-3">Available Space(in ft): <sup className="text-danger">*</sup></p>
                                </td>
                                <td className="col-auto"></td>
                                <td className="col-auto"></td>
                                <td className="w-150px">
                                  <div className="common-checkbox-deep-blue2 position-relative mb-2 mx-auto d-inline-block">
                                    <input disabled={values.storageType==="palletposition"||viewMood} name="basementCheck1" onChange={(e)=>handleCheck1(e)} value={!basementCheck1} checked={basementCheck1} className="common-checkbox-deep-blue2-input" type="checkbox" id="defaultCheck100"   />
                                    <label className="common-checkbox-deep-blue2-label pl-4 mr-3" htmlFor="defaultCheck100">Basement 
                                    </label>
                                  </div>
                                </td> 
                                <td className="w-150px">
                                  <div className="common-checkbox-deep-blue2 position-relative mb-2 mx-auto d-inline-block">
                                    <input name="groundFloorCheck1" onChange={(e)=>handleCheck1(e)}  value={!groundFloorCheck1}  checked={groundFloorCheck1} className="common-checkbox-deep-blue2-input" type="checkbox" id="defaultCheck200"  disabled={values.storageType==="palletposition"||viewMood} />
                                    <label className="common-checkbox-deep-blue2-label pl-4 mr-3" htmlFor="defaultCheck200">Ground Floor
                                    </label>
                                  </div>
                                </td> 
                                <td className="w-150px">
                                  <div className="common-checkbox-deep-blue2 position-relative mb-2 mx-auto d-inline-block">
                                    <Field name="firstFloorCheck1" onChange={(e)=>handleCheck1(e)} value={!firstFloorCheck1} checked={firstFloorCheck1} className="common-checkbox-deep-blue2-input" type="checkbox" id="defaultCheck300"  disabled={values.storageType==="palletposition"||viewMood} />
                                    <label className="common-checkbox-deep-blue2-label pl-4 mr-3" htmlFor="defaultCheck300">1st Floor
                                    </label>
                                  </div>
                                </td>
                                <td className="w-150px">
                                  <div className="common-checkbox-deep-blue2 position-relative mb-2 mx-auto d-inline-block">
                                    <Field name="secondFloorCheck1" onChange={(e)=>handleCheck1(e)} value={!secondFloorCheck1} checked={secondFloorCheck1} className="common-checkbox-deep-blue2-input" type="checkbox" id="defaultCheck400"  disabled={values.storageType==="palletposition"||viewMood} />
                                    <label className="common-checkbox-deep-blue2-label pl-4 mr-3" htmlFor="defaultCheck400">2nd Floor
                                    </label>
                                  </div>
                                </td>
                              </tr> 
                              <tr>
                                <td className="w-100px">
                                </td>
                                <td className="col-auto">
                                  {/* <Field  onChange={(e)=>{
                              let a=`floors[${0}].unit`
                              let b=`floors[${1}].unit`
                              let c=`floors[${2}].unit`
                              let d=`floors[${3}].unit`

                              setFieldValue(a,e.target.value)
                              setFieldValue(b,e.target.value)
                              setFieldValue(c,e.target.value)
                              setFieldValue(d,e.target.value)

                            }} name={`floors[${0}].unit`} defaultValue="FEET" as="select" className="form-control custom-select bg-white px-4 common-select-deep-blue" id="exampleFormControlSelect1" disabled={viewMood}>
                                    <option>Select Unit</option>
                                    <option>FEET</option>
                                    <option>INCH</option>
                                    <option>M</option>
                                  </Field> */}
                                </td>
                                <td className="col-auto"></td>
                                <td className="w-150px">
                                <label className=" pl-4 mr-3" htmlFor="defaultCheck100">Length
                        </label>
                                  <Field type="number" name={`availableSpaces[${0}].availableSpaceDimension.length`} validate={floorValidation1a} className={fieldClassObj(`availableSpaces[${0}].availableSpaceDimension.length`, basementCheck1)}  placeholder="Length"  readOnly={values.storageType==="palletposition"||viewMood||!basementCheck1}  />
                                  <ErrorMessage name={`availableSpaces[${0}].availableSpaceDimension.length`}  component="div" className="invalid-feedback" />
                                </td> 
                                <td className="w-150px">
                                <label className=" pl-4 mr-3" htmlFor="defaultCheck100">Length
                        </label>
                                  <Field type="number" name={`availableSpaces[${1}].availableSpaceDimension.length`} validate={floorValidationa} className={fieldClassObj(`availableSpaces[${1}].availableSpaceDimension.length`, groundFloorCheck1)} placeholder="Length"  readOnly={values.storageType==="palletposition"||viewMood||!groundFloorCheck1} />
                                  <ErrorMessage name={`availableSpaces[${1}].availableSpaceDimension].length`} component="div" className="invalid-feedback" />
                                </td> 
                                <td className="w-150px">
                                <label className=" pl-4 mr-3" htmlFor="defaultCheck100">Length
                        </label>
                                  <Field type="number" name={`availableSpaces[${2}].availableSpaceDimension.length`} validate={floorValidation2a} className={fieldClassObj(`availableSpaces[${2}].availableSpaceDimension.length`, firstFloorCheck1)} placeholder="Length"  readOnly={values.storageType==="palletposition"||viewMood||!firstFloorCheck1} />
                                  <ErrorMessage name={`availableSpaces[${2}].availableSpaceDimension.length`} component="div" className="invalid-feedback" />
                                </td>
                                <td className="w-150px">
                                <label className=" pl-4 mr-3" htmlFor="defaultCheck100">Length
                        </label>
                                  <Field type="number" name={`availableSpaces[${3}].availableSpaceDimension.length`} validate={floorValidation3a} className={fieldClassObj(`availableSpaces[${3}].availableSpaceDimension.length`, secondFloorCheck1)} placeholder="Length"  readOnly={values.storageType==="palletposition"||viewMood||!secondFloorCheck1} />
                                  <ErrorMessage name={`availableSpaces[${3}].availableSpaceDimension.length`} component="div" className="invalid-feedback" />
                                </td>
                              </tr> 
                              <tr>
                                <td className="w-100px">
                                </td>
                                <td className="col-auto"> 
                                </td>
                                <td className="col-auto"></td>
                                <td className="w-150px">
                                <label className=" pl-4 mr-3" htmlFor="defaultCheck100">Breadth
                        </label>
                                  <Field type="number" name={`availableSpaces[${0}].availableSpaceDimension.breath`} validate={floorValidation1a} className={fieldClassObj(`availableSpaces[${0}].availableSpaceDimension.breath`, basementCheck1)} placeholder="Breadth" readOnly={values.storageType==="palletposition"||viewMood||!basementCheck1} />
                                  <ErrorMessage name={`availableSpaces[${0}].availableSpaceDimension.breath`} component="div" className="invalid-feedback" />
                                </td> 
                                <td className="w-150px">
                                <label className=" pl-4 mr-3" htmlFor="defaultCheck100">Breadth
                        </label>
                                  <Field type="number" name={`availableSpaces[${1}].availableSpaceDimension.breath`} validate={floorValidationa} className={fieldClassObj(`availableSpaces[${1}].availableSpaceDimension.breath`,groundFloorCheck1)} placeholder="Breadth" readOnly={values.storageType==="palletposition"||viewMood||!groundFloorCheck1} />
                                  <ErrorMessage name={`availableSpaces[${1}].availableSpaceDimension.breath`} component="div" className="invalid-feedback" />
                                </td> 
                                <td className="w-150px">
                                <label className=" pl-4 mr-3" htmlFor="defaultCheck100">Breadth
                        </label>
                                  <Field type="number" name={`availableSpaces[${2}].availableSpaceDimension.breath`} validate={floorValidation2a} className={fieldClassObj(`availableSpaces[${2}].availableSpaceDimension.breath`, firstFloorCheck1)} placeholder="Breadth" readOnly={values.storageType==="palletposition"||viewMood||!firstFloorCheck1} />
                                  <ErrorMessage name={`availableSpaces[${2}].availableSpaceDimension.breath`} component="div" className="invalid-feedback" />
                                </td>
                                <td className="w-150px">
                                <label className=" pl-4 mr-3" htmlFor="defaultCheck100">Breadth
                        </label>
                                  <Field type="number" name={`availableSpaces[${3}].availableSpaceDimension.breath`} validate={floorValidation3a} className={fieldClassObj(`availableSpaces[${3}].availableSpaceDimension.breath`, secondFloorCheck1)} placeholder="Breadth" readOnly={values.storageType==="palletposition"||viewMood||!secondFloorCheck1} />
                                  <ErrorMessage name={`availableSpaces[${3}].availableSpaceDimension.breath`} component="div" className="invalid-feedback" />  
                                </td>
                              </tr> 
                              <tr>
                                <td className="w-100px">
                                </td>
                                <td className="col-auto"> 
                                </td>
                                <td className="col-auto"></td>
                                <td className="w-150px">
                                <label className=" pl-4 mr-3" htmlFor="defaultCheck100">Height
                        </label>
                                  <Field type="number" name={`availableSpaces[${0}].availableSpaceDimension.height`} validate={floorValidation1a} className={fieldClassObj(`availableSpaces[${0}].availableSpaceDimension.height`, basementCheck1)} placeholder="Height" readOnly={values.storageType==="palletposition"||viewMood||!basementCheck1} />
                                  <ErrorMessage name={`availableSpaces[${0}].availableSpaceDimension.height`} component="div" className="invalid-feedback" />
                                </td> 
                                <td className="w-150px">
                                <label className=" pl-4 mr-3" htmlFor="defaultCheck100">Height
                        </label>
                                  <Field type="number" name={`availableSpaces[${1}].availableSpaceDimension.height`} validate={floorValidationa} className={fieldClassObj(`availableSpaces[${1}].availableSpaceDimension.height`, groundFloorCheck1)} placeholder="Height" readOnly={values.storageType==="palletposition"||viewMood||!groundFloorCheck1} />
                                  <ErrorMessage name={`availableSpaces[${1}].availableSpaceDimension.height`} component="div" className="invalid-feedback" />
                                </td> 
                                <td className="w-150px">
                                <label className=" pl-4 mr-3" htmlFor="defaultCheck100">Height
                        </label>
                                  <Field type="number" name={`availableSpaces[${2}].availableSpaceDimension.height`} validate={floorValidation2a} className={fieldClassObj(`availableSpaces[${2}].availableSpaceDimension.height`, firstFloorCheck1)} placeholder="Height" readOnly={values.storageType==="palletposition"||viewMood||!firstFloorCheck1} />
                                  <ErrorMessage name={`availableSpaces[${2}].availableSpaceDimension.height`} component="div" className="invalid-feedback" />
                                </td>
                                <td className="w-150px">
                                <label className=" pl-4 mr-3" htmlFor="defaultCheck100">Height
                        </label>
                                  <Field type="number" name={`availableSpaces[${3}].availableSpaceDimension.height`} validate={floorValidation3a} className={fieldClassObj(`availableSpaces[${3}]availableSpaceDimension.height`, secondFloorCheck1)} placeholder="Height" readOnly={values.storageType==="palletposition"||viewMood||!secondFloorCheck1} />
                                  <ErrorMessage name={`availableSpaces[${3}].availableSpaceDimension.height`} component="div" className="invalid-feedback" />
                                </td>
                              </tr>
                              <tr>
                              <p className="mb-0 mt-3">Total Available Space({values.availableSpaces?values.availableSpaces[0].unit==="FEET"?"sqft":"":""}
                            {values.availableSpaces?values.availableSpaces[0].unit==="INCH"?"sqin":"":""}
                            {values.availableSpaces?values.availableSpaces[0].unit==="M"?"sqm":"":""}):</p>
                                <td className="col-auto">
                                  <Field name="totalAvailableSpace" className="form-control bg-white px-4" value={(values.availableSpaces[0].availableSpaceDimension.length)*(values.availableSpaces[0].availableSpaceDimension.breath)
                                    + (values.availableSpaces[1].availableSpaceDimension.length)*(values.availableSpaces[1].availableSpaceDimension.breath)
                                    + (values.availableSpaces[2].availableSpaceDimension.length)*(values.availableSpaces[2].availableSpaceDimension.breath)
                                    + (values.availableSpaces[3].availableSpaceDimension.length)*(values.availableSpaces[3].availableSpaceDimension.breath)} disabled/> 
                                </td>
                                <td className="col-auto"></td>
                                <td className="w-150px">
                                  <input className="form-control bg-white px-4" value={(values.availableSpaces[0].availableSpaceDimension.length)*(values.availableSpaces[0].availableSpaceDimension.breath)} disabled />
                                </td> 
                                <td className="w-150px">
                                  <input className="form-control bg-white px-4" value={(values.availableSpaces[1].availableSpaceDimension.length)*(values.availableSpaces[1].availableSpaceDimension.breath)} disabled />
                                </td> 
                                <td className="w-150px">
                                  <input className="form-control bg-white px-4" value={(values.availableSpaces[2].availableSpaceDimension.length)*(values.availableSpaces[2].availableSpaceDimension.breath)} disabled />
                                </td>
                                <td className="w-150px">
                                  <input className="form-control bg-white px-4" value={(values.availableSpaces[3].availableSpaceDimension.length)*(values.availableSpaces[3].availableSpaceDimension.breath)} disabled />
                                </td>
                              </tr>
                              <tr>
                    <td className="mw-150px">
</td>
<td className="mw-150px">
</td>
                    <td className="text-left px-4" colSpan="2">
                                  {/* <p className="font-weight-bold">Field Agent Remarks</p>  */}
                                  <div className="row ">
            <div className="col-auto">
                <p className="px-3 py-2">Whs Remarks</p>
            </div>
            <div className="col-auto form-inline form-group form-inline">
                <p className="py-2">{formField &&formField.storageSpaceRemark&&formField.storageSpaceRemark.availableSpace.whsstatus===true?"okay" : "not okay"}</p>
            </div>
            <div className="mw-75px">
                <input   value={formField &&formField.storageSpaceRemark&&formField.storageSpaceRemark.availableSpace.whsremark} type="text" className="form-control  px-4 ml-xl-0 ml-3 mb-2" placeholder="Remarks" disabled/>
            </div>
            </div>
                                </td> 
                    </tr>
                              </tbody>
                              </table>
                              </div>
                        <div className={`col-12 mt-2 ${viewMood ? 'd-none' :""}`}>
                          <div className="row justify-content-end">
                            {/* <div className="col-auto mx-auto"> */}
                            {Object.keys(errors).length !== 0 ? <FormErrorCard message="Fill All Required Fields" /> : null}
                            {data.isError !== "" ? <FormErrorCard message={data.isError} /> : null}
                            
                              {/* <button type="button" className="btn btn-outline-deep-blue add-className remove-className" data-add-target=".steps3" data-add-target-class="d-none" data-remove-target=".steps2" data-remove-target-class="d-none">Back</button> */}
                            {/* </div> */}
                            <div className="col-auto">
                              <button type="submit"  disabled={data.isPending}  className="btn btn-deep-blue add-className remove-className">Save
                              {data.isPending ? <Spinner animation="border"  /> :null}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>  
                    </Form>
                    )}
              }
            />
            </div>
          </div> 

          </>)
          }
          
        </>
    )
}

export default UpdateStorageSpaceForm
