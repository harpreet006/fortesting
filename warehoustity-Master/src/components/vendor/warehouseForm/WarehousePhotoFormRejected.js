import React, {useState, useEffect} from 'react';
import {updatePhoto} from '../../../store/actions/vendor/warehouseList';
import {useDispatch, useSelector} from 'react-redux';
import { WAREHOUSELIST } from '../../../store/reducers/vendor/warehouse';


const WarehousePhotoForm = ({warehouseId}) => {
  const dispatch = useDispatch()
  const data=useSelector((state)=>state.WAREHOUSELIST);
  // console.log("warehouse Photo===>", data.singleFormData)

  const [ imgId, setImgId]=useState(null);

  const [coverView, setCoverView]=useState(null);

  const [inDoor, setInDoor] = useState([]);
  const [inDoorView, setInDoorView] = useState([1]);

  const [outDoor, setOutDoor] = useState([]);
  const [outDoorView, setOutDoorView] = useState([1]);

  const coverHandle=(e)=>{
    const data = new FormData();
    data.append('image', e.target.files[0]);
    data.append('type', "coverImage");
    data.append('warehouse', warehouseId);
    dispatch(updatePhoto(data,warehouseId));
  }



  const inDoorHandle=(e, index)=>{

    const updatedArray = {...inDoor};
    updatedArray[index] = e.target.files[0];
    setInDoor(updatedArray);
      console.log("yaha")
    if(imgId !==null){
      const data = new FormData();
      data.append('image', e.target.files[0]);
      data.append('type', "indoor");
      data.append('warehouseImage', imgId);
      data.append('warehouse',warehouseId)
      dispatch(updatePhoto(data,warehouseId));
    }
    else
    {
      const data = new FormData();
      data.append('image', e.target.files[0]);
      data.append('type', "indoor");
      data.append('warehouseImage',WAREHOUSELIST.IMAGEID)
      data.append('warehouse',warehouseId)

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


    return (
        <>
             
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
                  </div> 
            
                  <div className="col-12">	
                <div className="row">	
                <div className="col-auto mw-200px px-0">	
   	
             <div className="form-inline form-group pt-3">     	
                 	
                     <p>Whs Remark:   {data.singleFormData&&data.singleFormData.warehouseImageRemark
                     &&
                     data.singleFormData.warehouseImageRemark.whsCoverImage&&data.singleFormData.warehouseImageRemark.whsCoverImage.coverImg.whsstatus===true?"okay":"not okay"}</p>	
                    </div>	
                      	
                    </div>	
                    <div className="col-auto mw-150px mt-2 ml-2">	
                    <input disabled       value={data.singleFormData&&data.singleFormData.warehouseImageRemark
                     &&
                     data.singleFormData.warehouseImageRemark.whsCoverImage&&data.singleFormData.warehouseImageRemark.whsCoverImage.coverImg.whsremark}	
 type="text" className="form-control bg-white px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </div>	
                </div>
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
                          <div className="col-12">	
                <div className="row">	
                <div className="col-auto mw-200px px-0">	
   	
             <div className="form-inline form-group pt-3">     	
                 	
                     <p>WHS Status:   {data.singleFormData&&data.singleFormData.warehouseImageRemark
                     &&
                     data.singleFormData.warehouseImageRemark.whsCoverImage&&data.singleFormData.warehouseImageRemark.whsIndoors[index]&&
                     data.singleFormData.warehouseImageRemark.whsIndoors[index].indoor&&data.singleFormData.warehouseImageRemark.whsIndoors[index].indoor.whsstatus===true?"okay":"not okay"
                     }</p>	
                    </div>	
                      	
                    </div>	
                    <div className="col-auto mw-150px mt-2 ml-2">	
                    <input disabled       value={data.singleFormData&&data.singleFormData.warehouseImageRemark
                     &&
                     data.singleFormData.warehouseImageRemark.whsCoverImage&&data.singleFormData.warehouseImageRemark.whsIndoors[index]&&
                     data.singleFormData.warehouseImageRemark.whsIndoors[index].indoor&&data.singleFormData.warehouseImageRemark.whsIndoors[index].indoor.whsremark}	
 type="text" className="form-control bg-white px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </div>	
                </div>
                </div>
                      </div>
                    )
                  })
                } 

                  <div className="col-12 mt-4">
                    <div className="row justify-content-end"> 
                      <div className="col-auto">
                        <button  type="button" onClick={()=>setInDoorView([...inDoorView, inDoorView.length+1])}  className="btn text-deep-blue text-uppercase font-weight-bold">Add More</button>
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
                       <div className="col-12">	
                <div className="row">	
                <div className="col-auto mw-200px px-0">	
   	
             <div className="form-inline form-group pt-3">     	
                 	
                     <p>WHS Status:   {data.singleFormData&&data.singleFormData.warehouseImageRemark
                     &&
                     data.singleFormData.warehouseImageRemark.whsCoverImage&&data.singleFormData.warehouseImageRemark.whsOutdoors[index]&&
                     data.singleFormData.warehouseImageRemark.whsOutdoors[index].outdoor&&data.singleFormData.warehouseImageRemark.whsOutdoors[index].outdoor.whsstatus===true?"okay":"not okay"
                     }</p>	
                    </div>	
                      	
                    </div>	
                    <div className="col-auto mw-150px mt-2 ml-2">	
                    <input disabled       value={data.singleFormData&&data.singleFormData.warehouseImageRemark
                     &&
                     data.singleFormData.warehouseImageRemark.whsCoverImage&&data.singleFormData.warehouseImageRemark.whsOutdoors[index]&&
                     data.singleFormData.warehouseImageRemark.whsOutdoors[index].outdoor&&data.singleFormData.warehouseImageRemark.whsOutdoors[index].outdoor.whsremark}	
 type="text" className="form-control bg-white px-4 mb-2 mr-4" placeholder="Remarks" />	
                    </div>	
                </div>
                </div>
                  </div>
                    )
                  })
                } 

                  <div className="col-12 mt-4">
                    <div className="row justify-content-end"> 
                      <div className="col-auto">
                        <button type="button" onClick={()=>setOutDoorView([...outDoorView, outDoorView.length+1])}  className="btn text-deep-blue text-uppercase font-weight-bold">Add More</button>
                      </div>
                    </div>
                  </div>


                  <div className="col-12 mt-4">
                    <div className="row justify-content-end">
                      <div className="col-auto">
                        {/* <button type="button" className="btn btn-outline-deep-blue add-class remove-class" data-add-target=".steps9" data-add-target-class="d-none" data-remove-target=".steps8" data-remove-target-class="d-none">Back</button> */}
                      </div>
                      <div className="col-auto">
                        {/* <button type="button" className="btn btn-deep-blue add-class remove-class">Save</button> */}
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
