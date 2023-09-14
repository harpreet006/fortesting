import React from 'react'
import Layout from '../../../layout/Layout';
import { useHistory } from 'react-router-dom';
import BrowserTitle from '../../../components/helper/BrowserTitle';
import CustomerLayout from '../../../layout/CustomerLayout';

const SpaceCertificateView = () => {
    const  history = useHistory();

    return (
        <Layout>
        <BrowserTitle title="Documents" />
        
        <CustomerLayout  title = "Documents">
            <div className="row">
              <div className="content col-12 download-certificate"> 
                <div className="border-bottom d-sm-flex justify-content-between">
                  <div>
                    <p onClick={()=>history.goBack()} className="btn name-breadcrumb px-0 text-dark font-heading mr-3 my-0">Space Certificate</p>
                  </div> 
                </div>
                <div className="row p-3">
                  <div className="col-12 table-responsive table-row-border">
                  
                  </div>
                </div> 
              </div>

              <div className="content col-12 download-certificate"> 
                
                <div className="row p-3">
                  <div className="col-xl-8 col-lg-9 col-md-10 col-12">
                    <div className="bg-lighter-primary py-5 px-4">
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
                </div> 
                <div className="row">
                  <div className="col-12">
                  <button onClick={()=>history.goBack()} className="btn btn-deep-primary m-3">Back</button>
                    <button className="btn btn-deep-primary m-3">Download Certificate</button>
                  </div>
                </div>
              </div>

            </div>
            </CustomerLayout>
    
        </Layout>
    )
}

export default SpaceCertificateView
