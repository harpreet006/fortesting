import React from 'react';
import VendorLayout from '../../../layout/VendorLayout';
import { useHistory } from 'react-router-dom'

const ViewCertificate = () => {
  const history = useHistory();
    return(
            
      <VendorLayout>
      <div className="content-admin px-5">
        <div className="row align-items-center py-3 px-3 mx-0"> 
          <div className="col-12 px-0 py-3 mt-4">
            {/* <h5 className="text-dark-blue">DL-01379</h5> */}
            <h5 className="backButton mb-4"><i onClick={()=>history.goBack()} className="fas fa-chevron-left mr-3 cursorPointer"></i>DL-01379</h5>
          </div>
          <div className="col-xl-6 px-0 col-lg-7 col-md-10 col-12">
            <div className="bg-white py-5 px-4">
              <div className="px-2">
                <h3 className="text-center mb-5">Space Certificate</h3>
                <h6 className="mb-4">Date: <span className="font-heading">25/10/2020</span></h6>
                <h6 className="mb-4">To: <span className="font-heading">01/11/2020</span></h6>
                <h6 className="mb-4">From: <span className="font-heading">01/02/2021</span></h6>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus, viverra vitae congue eu, consequat ac felis donec et odio pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus, viverra vitae congue eu, consequat ac felis donec et odio pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus.</p>
                <div className="my-3 border-bottom border-dark py-5 w-160px">

                </div>
                <p>Signature</p>
              </div>
            </div>
          </div>
          <div className="col-12 my-5 px-0">
            <button className="btn btn-deep-blue">Download Certificate</button>
          </div>
        </div>
      </div>

  </VendorLayout>

    )
}

export default ViewCertificate;