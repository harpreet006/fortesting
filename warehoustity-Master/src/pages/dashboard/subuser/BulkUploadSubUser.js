import React, { useEffect } from 'react';
import BrowserTitle from '../../../components/helper/BrowserTitle';
import CustomerLayout from '../../../layout/CustomerLayout';
import Layout from '../../../layout/Layout';
import {useHistory} from 'react-router-dom';
import {ExcelRenderer, OutTable} from 'react-excel-renderer';
import { useState } from 'react';
import * as XLSX from "xlsx";
import { Title } from '@material-ui/icons';





const BulkUploadSubUser = () => {
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
  
    const history = useHistory();
    useEffect(() => {
      document.getElementsByTagName("footer")[0].classList.add("d-none");
    });
    // const[Title,setTitle] = useState("Choose a File");
    const[para,setPara]=useState("Choose a File")
  return (
    
    <Layout>
    <BrowserTitle title="Bulk Upload" />
    <CustomerLayout title="Bulk Upload">
    <div className="content col-12 bulk-upload">
        <div className="border-bottom d-sm-flex justify-content-between">
          <div>
              
          <button className="btn name-breadcrumb px-0 text-dark font-heading mr-3 toggle-class ">
                <i  onClick={()=>history.goBack()}  className="fas fa-chevron-left pr-3"></i>
                Bulk Upload Sub User
            </button>
          </div> 
        </div>
        <div className="row px-3 pb-3"> 
          <div className="col-xl-6 col-lg-7 col-md-8 col-sm-10 mx-auto">
            <form> 
              <div className="row">
                <div className="form-group col-12">
                  <div className="custom-file position-relative">
                    {/* <!-- name of file chosen --> */}
                    {/* <!-- actual upload which is hidden --> */}
                    <input type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" onChange={(e) => {
                 upload(e)}
          // setTitle(file);
          
        } id="custom-file-upload-input" className="custom-file-input"/>
                    {/* <!-- our custom upload button --> */}
                    <div className="col-auto mx-auto border py-4">
                      <label className="custom-file-upload-label btn btn-block mb-3" for="custom-file-upload-input">
                        <img className="img-fluid w-200px" src="/assets/images/icons/excel-icon.webp" alt="alt"/>
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
                  <button type="submit"  onClick={(e) => e.preventDefault()} className="btn btn-deep-primary my-4 w-100">Upload
                  </button>
                </div>
              </div>
            </form>
          </div>
          
        </div>
      </div>
    </CustomerLayout>
    </Layout>
  );
}

export default BulkUploadSubUser;
