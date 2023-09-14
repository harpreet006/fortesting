import React from 'react';
import { useHistory } from 'react-router-dom'
import VendorLayout from '../../../layout/VendorLayout';
import { useState } from 'react';
const BulkUpload = () => {
  const upload=(e)=>{
  
    let a=Array.from(e.target.files)
    console.log("yyyyyyyyyy",a[0])
    // let jsonString = JSON.stringify(a[0]);
    // console.log("zzzzzz",jsonString)
    var fileObject = a[0]
   console.log("nnnnnn",fileObject.name)
   setPara(fileObject.name)
  // reCreate new Object and set File Data into it
  // var newObject  = {
  //    'lastModified'     : fileObject.lastModified,
  //    'lastModifiedDate' : fileObject.lastModifiedDate,
  //    'name'             : fileObject.name,
  //    'size'             : fileObject.size,
  //    'type'             : fileObject.type
  // };  
   
  // then use JSON.stringify on new object
  // JSON.stringify(newObject);
    
  
  }
  const[para,setPara]=useState("Choose a File")
  const history = useHistory();
    return(
      <VendorLayout>
        <div className="content-admin px-5">
          <div className="row align-items-center py-3 px-3 mx-0"> 
            <div className="col-12 py-3 mt-4">
              <h5 className="text-dark"><i onClick={()=>history.goBack()} className="fas fa-chevron-left mr-3 cursorPointer"></i>Bulk Upload</h5>
            </div>
            <div className="col-xl-5 col-lg-7 col-md-8 col-sm-10 mx-auto mt-4">
              <form action=""> 
                <div className="row">
                  <div className="form-group col-12">
                    <div className="custom-file position-relative">
                      {/* <!-- name of file chosen -->
                      <!-- actual upload which is hidden --> */}
                      <input type="file"  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" onChange={(e) => {
                 upload(e)}
          // setTitle(file);
          
        } id="custom-file-upload-input" className="custom-file-input" required="" hidden/>
                      {/* <!-- our custom upload button --> */}
                      <div className="col-auto mx-auto border py-5">
                        <label className="custom-file-upload-label btn btn-block mb-3" for="custom-file-upload-input">
                          <img className="img-fluid w-200px" src={"/assets/images/icons/excel-icon.webp"} alt="alt"/>
                        </label>
                        <span id="custom-file-name" className="d-block h4 text-center custom-file-name">{para}</span>
                      </div>
                      <div className="invalid-feedback">
                        Example upload your curriculum vitae
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-12">
                    <button onClick={(e) => e.preventDefault()} type="submit" className="btn btn-deep-blue btn-block my-4"><span className="h4 text-white">Upload</span></button>
                  </div>
                  <div className="col-12">
                    <button onClick={()=>history.goBack()} type="button" className="btn btn-deep-blue btn-block my-4"><span className="h4 text-white">Back</span></button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
 
      </VendorLayout>

    )
}

export default BulkUpload;