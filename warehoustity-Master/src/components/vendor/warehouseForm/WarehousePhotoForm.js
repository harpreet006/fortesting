import React, {useState, useEffect, createContext} from 'react';
import {changeWarehouseStatus, updatePhoto} from '../../../store/actions/vendor/warehouseList';
import {useDispatch, useSelector} from 'react-redux';
import { WAREHOUSELIST } from '../../../store/reducers/vendor/warehouse';
import { SAVEVALUE } from '../../../store/types';
import FormSuccess from '../../helper/FormSuccess';
import FormSuccess2 from '../../helper/FormSuccess2';
import { Spinner } from 'react-bootstrap';


export const UserContext = createContext()

const WarehousePhotoForm = ({warehouseId}) => {
  const dispatch = useDispatch()
  

  
  const data=useSelector((state)=>state.WAREHOUSELIST);
  
  // console.log("warehouse Photo===>", data.singleFormData)

  const [ imgId, setImgId]=useState(null);

  const[coverError,setCoverError] = useState("");
  const[indoorError,setIndoorError] = useState("");
  const[outdoorError,setOutdoorError] = useState("");

  const [coverView, setCoverView]=useState(null);

  const[coverViewDoor, setCoverViewDoor] = useState([]);
  const[indoorViewDoor, setIndoorViewDoor] = useState([]);
  const[outdoorViewDoor, setOutdoorViewDoor] = useState([]);

  const [inDoor, setInDoor] = useState([]);
  const [inDoorView, setInDoorView] = useState([1]);

  const[checkImage, setCheckImage] = useState(false)

  const [outDoor, setOutDoor] = useState([]);
  const [outDoorView, setOutDoorView] = useState([1]);
  console.log("coverr",coverViewDoor)

  const coverHandle=(e)=>{
    
    const array = [1,2,3]
  console.log("coverviewdoor")
    setCoverViewDoor(array)

    console.log("coverr",coverViewDoor)
    const data = new FormData();

    
    

   
    
    data.append('image', e.target.files[0]);
    data.append('type', "coverImage");
    data.append('warehouse', warehouseId);
    data.append('warehouseImage', imgId);
    console.log("zzzzzz",data)
    dispatch(updatePhoto(data,warehouseId));

    
  }

  console.log("indoorrr",indoorViewDoor)

  const inDoorHandle=(e, index)=>{

    const updatedArray = {...inDoor};
    updatedArray[index] = e.target.files[0];
    setInDoor(updatedArray);
    setIndoorViewDoor([1,2,3]);
   
    
    console.log("indoor",inDoor)
      console.log("yaha")
      
    if(imgId !==null){
      const data = new FormData();
      data.append('image', e.target.files[0]);
      data.append('type', "indoor");
      data.append('warehouseImage', imgId);
      data.append('warehouse',warehouseId)
      console.log("iiiii",data)
      dispatch(updatePhoto(data,warehouseId));
    }
    else
    {
      const data = new FormData();
      console.log("hi",WAREHOUSELIST)
      data.append('image', e.target.files[0]);
      console.log("hello",e.target.files[0])
      data.append('type', "indoor");
      data.append('warehouseImage',WAREHOUSELIST.IMAGEID)
      data.append('warehouse',warehouseId)
      console.log("iiiii",data)
      dispatch(updatePhoto(data,warehouseId));

    }

    
   

    // const inViewArray = {...inDoorView};
    // inViewArray[index] = window.URL.createObjectURL(e.target.files[0]);
    // setInDoorView(inViewArray);

  }

  const outDoorHandle=(e, index)=>{

    const updatedArray = {...outDoor};
    updatedArray[index] = e.target.files[0];
    console.log(e.target.files[0])
    setOutdoorViewDoor([1,2,3]);
    console.log("outdoorr",outdoorViewDoor)
    setOutDoor(updatedArray);
   

    if(imgId !==null){
      const data = new FormData();
      data.append('image', e.target.files[0]);
      data.append('type', "outdoor");
      data.append('warehouseImage', imgId);
      data.append('warehouse',warehouseId)

      dispatch(updatePhoto(data,warehouseId));
    }
    else{
      const data = new FormData();
      data.append('image', e.target.files[0]);
      data.append('type', "outdoor");
      data.append('warehouseImage', WAREHOUSELIST.IMAGEID);
      data.append('warehouse',warehouseId)

      dispatch(updatePhoto(data,warehouseId));
    }

    

  }


  useEffect(()=>{
    if(data.singleFormData.warehouseImagesInfo !== null && data.singleFormData.warehouseImagesInfo !== undefined){

      setImgId(data.singleFormData.warehouseImagesInfo.id)

      if(data.singleFormData.warehouseImagesInfo.coverImage !== null){
        setCoverView(data.singleFormData.warehouseImagesInfo.coverImage.url)
      }

      if(data.singleFormData.warehouseImagesInfo.indoorImages && data.singleFormData.warehouseImagesInfo.indoorImages.length>0){
        setInDoorView(data.singleFormData.warehouseImagesInfo.indoorImages)
      }

      if(data.singleFormData.warehouseImagesInfo.outdoorImages && data.singleFormData.warehouseImagesInfo.outdoorImages.length>0){
        setOutDoorView(data.singleFormData.warehouseImagesInfo.outdoorImages)
      }

    }
  }, [data.singleFormData.warehouseImagesInfo])
  console.log("photoformm",data.warehouseDetail.warehouseImages)

  let loader = false

  let enableCheckImage = () =>{
     
    

    console.log("photoform",data.warehouseDetail.warehouseImages)
    console.log("indoor",indoorViewDoor.length)
    console.log("outdoor",outdoorViewDoor.length)
    console.log("cover",coverViewDoor.length)

    if(data.warehouseDetail.warehouseImages === true)
    {
      

      if(indoorViewDoor.length > 0 && coverViewDoor.length > 0  && outdoorViewDoor.length > 0)

      {
        
   setCheckImage(true)
   dispatch({
    type: SAVEVALUE,
    payload: true,
  });

  loader = true;

  


   return checkImage
      }

      

    
    

    
  }
  

    console.log("indoor", outDoor)

    if(coverViewDoor.length === 0)
    {
      setCoverError("Please choose Cover Image")

      return
    }

    
    if(indoorViewDoor.length === 0 )
    {
      setIndoorError("Please choose Indoor Image")
      return
    }
    // if(indoorViewDoor.length > 0 )
    // {
    //   setIndoorError("")
      
    // }
    if(outdoorViewDoor.length === 0 )
    {
      setOutdoorError("Please choose  Outdoor Image")
      return

    }
    // if(outdoorViewDoor.length > 0 )
    // {
    //   setOutdoorError("")
      

    // }

    return (
      {
        
      }
    )
   
  }

    return (
      
        
             
          <div className="row align-items-center pb-3 mx-0"> 
            <div className="col-12">
              <form action=""> 
                <div className="row bg-white rounded mx-0 col-xxxl-11">
                  <div className="col-12">
                    <h5 className="py-3 mb-3 border-bottom">Warehouse Cover Photo</h5>
                  </div>
                  
                  
                 
                  <div className="col-12">
                    <div className="card card-overlay upload-image-preview position-relative border-0">
                      <div className="img-holder size-200px">
                        <img className="w-100 h-100 img-fluid rounded overflow-hideen" id="imageResult" src="/assets/images/upload-bg.png" alt=""/>
                      </div>
                      <div className="card-img-overlay size-200px d-flex justify-content-center align-items-center">
                       
                      {coverView ?  <img src={coverView} alt="" /> :
                        <div className="card-text">
                          <input onChange={(e)=>coverHandle(e)} id="upload-image-preview1" type="file"  className="form-control border-0" hidden />
                          <label id="upload-label" htmlFor="upload-image-preview1" className="font-weight-light text-muted"></label>
                          <div className="input-group-append">
                            <label htmlFor="upload-image-preview1" className="btn px-0 text-deep-blue font-weight-bold m-0 rounded-pill px-4"> 
                              <div>
                                <img src="/assets/images/icons/upload-icon-deep-blue.png" alt=""/>
                              </div>
                              Upload image
                            </label>
                            
                          </div> 
                        </div>
                      }
                            
                      </div>
                    </div>
                    <div className='text-danger'>{coverError}</div>
                  </div> 
              
              
                </div>

{/* ########################################## */}

 <div className="row bg-white pt-3 rounded mx-0 col-xxxl-11">
                  <div className="col-12">
                    <h5 className="py-3 mb-3 border-bottom">Warehouse Indoor Photos</h5>
                  </div>
                {
                  inDoorView.map((c, index)=>{
                    return(
                      <div key={index} className="col-xl-4 col-lg-4 col-sm-6">
                      {typeof c === "object" ?  <img src={c.url} alt="" className="img-fluid" /> :
                        <div className="card card-overlay upload-image-preview position-relative border-0 mb-2">
                          <div className="img-holder size-200px">
                            <img className="w-100 h-100 img-fluid rounded overflow-hideen" id="imageResult" src="/assets/images/upload-bg.png" alt=""/>
                          </div>

                         
                          <div className="card-img-overlay size-200px d-flex justify-content-center align-items-center">
                        
                            <div className="card-text">
                              <input
                                type="file" 
                                onChange={(e)=>inDoorHandle(e,index)}
                                className="form-control border-0" 
                                id={`upload-image-preview115${index}`}
                                hidden
                               />
                              <label id="upload-label" htmlFor={`upload-image-preview115${index}`} className="font-weight-light text-muted"></label>
                              
                              <div className="input-group-append">
                                <label htmlFor={`upload-image-preview115${index}`} className="btn px-0 text-deep-blue font-weight-bold m-0 rounded-pill px-4"> 
                                  <div>
                                    <img src="/assets/images/icons/upload-icon-deep-blue.png" alt=""/>
                                  </div>
                                  Upload image
                                </label>
                                
                              </div> 
                            </div>
                            </div>
                          
                        </div>
                        
                      }
                      
                      <div className='text-danger'>{indoorError}
                      {console.log("indoor2",inDoor)}
                      </div>
                      </div>
                     
                    )
                    
                  })
                } 

                  <div className="col-12 mt-4">
                    <div className="row justify-content-end"> 
                      <div className="col-auto">
                        <button  type="button" onClick={()=>{setInDoorView([...inDoorView, inDoorView.length+1]); setIndoorViewDoor([])}}
                        
                          className="btn text-deep-blue text-uppercase font-weight-bold">Add More</button>
                      </div>
                    </div>
                  </div> 

                </div> 

                
                <div className="row bg-white pt-3 pb-5 rounded mx-0 col-xxxl-11">
                  <div className="col-12">
                    <h5 className="py-3 mb-3 border-bottom">Warehouse Outdoor Photos</h5>
                  </div>

                  {
                    outDoorView.map((c, index)=>{
                    return(
                  <div key={index} className="col-xl-4 col-lg-4 col-sm-6 mb-2">
                  
                  {typeof c === "object"  ?  <img src={c.url} alt="" className="img-fluid" /> :
                    <div className="card card-overlay upload-image-preview position-relative border-0">
                      <div className="img-holder size-200px">
                      
                        <img className="w-100 h-100 img-fluid rounded overflow-hideen" id="imageResult" src="/assets/images/upload-bg.png" alt="" />
                      </div>
                      <div className="card-img-overlay size-200px d-flex justify-content-center align-items-center">
                       
                        <div className="card-text">
                          <input onChange={(e)=>outDoorHandle(e,index)} id={`upload-image-previewout${index}`} type="file" className="form-control border-0" hidden />
                          <label id="upload-label" htmlFor={`upload-image-previewout${index}`} className="font-weight-light text-muted"></label>
                          <div className="input-group-append">
                            <label htmlFor={`upload-image-previewout${index}`} className="btn px-0 text-deep-blue font-weight-bold m-0 rounded-pill px-4"> 
                              <div>
                                <img src="/assets/images/icons/upload-icon-deep-blue.png" alt="" />
                              </div>
                              Upload image
                            </label>
                          </div> 
                        </div>

                      </div>
                    </div>
                  }
                  <div className='text-danger'>{outdoorError}</div>
                  </div>
                    )
                  })
                } 

                  <div className="col-12 mt-4">
                    <div className="row justify-content-end"> 
                      <div className="col-auto">
                        <button type="button" onClick={()=>{setOutDoorView([...outDoorView, outDoorView.length+1]); setOutdoorViewDoor([])}}  className="btn text-deep-blue text-uppercase font-weight-bold">Add More</button>
                      </div>
                    </div>
                  </div>

{console.log("gg",checkImage)}
{

checkImage &&

<>
<FormSuccess onClick={() => {setCheckImage(false)}} />
{loader = false}
{console.log("loader",loader)}

{/* {setCheckImage(false)} */}


</>





}

                  <div className="col-12 mt-4">
                    <div className="row ">
                      <div className="col-4">

                        
                        {/* <button type="button" className="btn btn-deep-blue add-class remove-class" data-add-target=".steps9" data-add-target-class="d-none" data-remove-target=".steps8" data-remove-target-class="d-none">Save</button> */}
                        <button type="button" onClick={()=>{enableCheckImage()}} className="btn btn-deep-blue add-class remove-class">Save 
                        
                        </button>
                      </div>
                      {/* <div className="col-auto">
                        <button type="button" className="btn btn-deep-blue add-class remove-class">Save</button>
                      </div> */}
                    </div>
                  </div>
                </div>  
              </form>
            </div>
          </div>
       
    )
}

export default WarehousePhotoForm














  // const [cover, setCover]=useState(null);
  // const [coverView, setCoverView]=useState(null);

  // const [inDoor, setInDoor] = useState([]);
  // const [inDoorView, setInDoorView] = useState([]);

  // const [outDoor, setOutDoor] = useState([]);
  // const [outDoorView, setOutDoorView] = useState([]);

  // const [count, setCount] = useState([1])
  // const [countOut, setCountOut] = useState([1,2,3,4])




  // const inDoorHandle=(e, index)=>{

  //   const updatedArray = {...inDoor};
  //   updatedArray[index] = e.target.files[0];
  //   setInDoor(updatedArray);

  //   const inViewArray = {...inDoorView};
  //   inViewArray[index] = window.URL.createObjectURL(e.target.files[0]);
  //   setInDoorView(inViewArray);

  // }

  // const outDoorHandle=(e, index)=>{

  //   const updatedArray = {...outDoor};
  //   updatedArray[index] = e.target.files[0];
  //   setOutDoor(updatedArray);

  //   const inViewArray = {...outDoorView};
  //   inViewArray[index] = window.URL.createObjectURL(e.target.files[0]);
  //   setOutDoorView(inViewArray);

  // }

