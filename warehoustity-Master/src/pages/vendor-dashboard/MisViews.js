import React from 'react';
import {useHistory} from 'react-router-dom';
import VendorLayout from '../../layout/VendorLayout';

const MisViews = () => {
    const history = useHistory();
    return (
        <VendorLayout>

  
      <div className="content-admin px-5">
        <div className="row align-items-center py-3 px-3 mt-5 mx-0"> 
          
          <div className="col-12"> 
            
            
              <div className="content col-12 download-report"> 
                  <div className="pb-2 border-bottom mb-4 d-sm-flex justify-content-between">
                    <div>
                      <button className="btn name-breadcrumb px-0 text-dark font-heading mr-3 mb-3 toggle-class"><i onClick={()=>history.goBack()} className="fas fa-chevron-left pr-3"></i> Report: 12121</button>
                    </div> 
                  </div>
                  <div className="row p-3">
                    <div className="col-xl-8 col-lg-9 col-md-10 col-12">
                      <div className="bg-lighter-primary py-5 px-4">
                        <div className="px-2">
                          <h3 className="text-center mb-5">Report</h3>
                          <h6 className="mb-4">Date: <span className="font-heading">25/10/2020</span></h6>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus, viverra vitae congue eu, consequat ac felis donec et odio pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus.</p>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus, viverra vitae congue eu, consequat ac felis donec et odio pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus.</p>
                          <div className="my-3 border-bottom border-dark py-5 w-160px">

                          </div>
                          <p>Signature</p>
                        </div>
                      </div>
                    </div>
                  </div> 
                  <div className="row">
                    <div className="col-12">
                      <button className="btn btn-deep-blue m-3">Download Report</button>
                    </div>
                  </div>
                </div>

          </div>
        </div>
      </div>
    </VendorLayout>
    )
}

export default MisViews
