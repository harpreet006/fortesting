import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery'; 

const WarehouseImage = () => {


  return (
      <>
    <div className="row align-items-center mx-0">
    <div className="col-md-6 bg-light-green">
      <div className="product-item-view py-3" id="product-item-view">
        <div>
          <div className="d-flex justify-content-end">
            <button type="button" className="btn p-0" data-toggle="modal" data-target="#product-item-show-modal">
              <img src="/assets/images/icons/icon-full.png" alt="warehouse"/>
            </button>
          </div>
          <div className="img-holer product-item-images">
            <img src="/assets/images/warehouse/warehouse-details1.png" alt="warehouse" className="img-fluid w-100"/>
          </div>
        </div>
      </div>
    </div>
    <div className="col-md-6 bg-light-green py-3">
      <div className="row d-flex flex-column">
        <div className="col-md-12 col-sm-6 pb-2 mb-2">
          <div className="card custom-card-overlay2">
            <div className="img-holder">
              <img src="/assets/images/warehouse/warehouse-details2.png" alt="warehouse" className="img-fluid w-100"/>
            </div>
            <div className="card-img-overlay d-flex align-items-center justify-content-center">
              <div className="card-body text-center">
                <button className="indoor-outdoor-tab-open btn text-white" data-target="#indoor-outdoor-modal" data-target-tab="#indoor" data-toggle="modal">
                  <span className="font-heading h4 text-white">Indoor</span>
                  <p className="d-block">26 photos</p>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 col-sm-6 pt-2">
          <div className="card custom-card-overlay2">
            <div className="img-holder">
              <img src="/assets/images/warehouse/warehouse-details3.png" alt="warehouse" className="img-fluid w-100"/>
            </div>
            <div className="card-img-overlay d-flex align-items-center justify-content-center">
              <div className="card-body text-center">
                <button className="indoor-outdoor-tab-open btn text-white" data-target="#indoor-outdoor-modal" data-target-tab="#outdoor" data-toggle="modal">
                  <span className="font-heading h4 text-white">Outdoor</span>
                  <p className="d-block">8 photos</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>




    {/* indoor outdoor Modal */}
    <div className="modal px-0" id="indoor-outdoor-modal" tabIndex="-1" role="dialog" aria-labelledby="indoor-outdoor-modalLabel" aria-hidden="true">
      <div className="modal-dialog modal-xl" role="document">
        <div className="modal-content border-0"> 
          <div className="modal-body">
            <div className="row">
              <div className="col-12 modal-body-right-content pt-4 px-sm-5 px-2">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <div className="card-body py-0">
                  <ul className="nav nav-pills common-tabs2 mb-3 justify-content-center" id="indoor-outdoor-tab" role="tablist" data-getelement="#modal-body-left-content">
                    <li className="nav-item px-0">
                      <Link className="nav-link h5 px-4 active" id="indoor-tab" data-toggle="pill" to="#indoor" role="tab" aria-controls="indoor" aria-selected="true">INDOOR</Link>
                    </li>
                    <li className="nav-item px-0">
                      <Link className="nav-link h5 px-4" id="outdoor-tab" data-toggle="pill" to="#outdoor" role="tab" aria-controls="outdoor" aria-selected="false">OUTDOOR</Link>
                    </li> 
                  </ul>
                  
                </div> 
              </div>
              <div className="col-12 px-5 py-3">
                <div className="tab-content px-sm-3 px-2" id="indoor-outdoor-tabContent">
                  <div className="tab-pane fade show active" id="indoor" role="tabpanel" aria-labelledby="indoor-tab">
                    <div className="four-card-carousel  owl-carousel">
                      <div className="card custom-card-overlay2 mx-2">
                        <div className="img-holder card-img"><img src={"/assets/images/warehouse/warehouse-indoor-outdoor-modal.png"} alt="warehouse" className="img-fluid w-100"/></div>
                        <div className="card-img-overlay d-flex align-items-end">
                          <div className="card-body px-0 d-flex justify-content-center">
                            <button className="btn-light card-bookmark active-book px-3 py-2 rounded">
                              <p className="card-title mb-0"><i className="fas fa-bookmark"></i> Save this image</p> 
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="card custom-card-overlay2 mx-2">
                        <div className="img-holder card-img"><img src={"/assets/images/warehouse/warehouse-indoor-outdoor-modal.png"} alt="warehouse" className="img-fluid w-100"/></div>
                        <div className="card-img-overlay d-flex align-items-end">
                          <div className="card-body px-0 d-flex justify-content-center">
                            <button className="btn-light card-bookmark active-book px-3 py-2 rounded">
                              <p className="card-title mb-0"><i className="fas fa-bookmark"></i> Save this image</p> 
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="card custom-card-overlay2 mx-2">
                        <div className="img-holder card-img"><img src={"/assets/images/warehouse/warehouse-indoor-outdoor-modal.png"} alt="warehouse" className="img-fluid w-100"/></div>
                        <div className="card-img-overlay d-flex align-items-end">
                          <div className="card-body px-0 d-flex justify-content-center">
                            <button className="btn-light card-bookmark px-3 py-2 rounded">
                              <p className="card-title mb-0"><i className="fas fa-bookmark"></i> Save this image</p> 
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="card custom-card-overlay2 mx-2">
                        <div className="img-holder card-img"><img src={"/assets/images/warehouse/warehouse-indoor-outdoor-modal.png"} alt="warehouse" className="img-fluid w-100"/></div>
                        <div className="card-img-overlay d-flex align-items-end">
                          <div className="card-body px-0 d-flex justify-content-center">
                            <button className="btn-light card-bookmark px-3 py-2 rounded">
                              <p className="card-title mb-0"><i className="fas fa-bookmark"></i> Save this image</p> 
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="card custom-card-overlay2 mx-2">
                        <div className="img-holder card-img"><img src={"/assets/images/warehouse/warehouse-indoor-outdoor-modal.png"} alt="warehouse" className="img-fluid w-100"/></div>
                        <div className="card-img-overlay d-flex align-items-end">
                          <div className="card-body px-0 d-flex justify-content-center">
                            <button className="btn-light card-bookmark px-3 py-2 rounded">
                              <p className="card-title mb-0"><i className="fas fa-bookmark"></i> Save this image</p> 
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div className="tab-pane fade" id="outdoor" role="tabpanel" aria-labelledby="outdoor-tab">
                    <div className="four-card-carousel owl-carousel">
                      <div className="card custom-card-overlay2 mx-2">
                        <div className="img-holder card-img"><img src={"/assets/images/warehouse/warehouse-indoor-outdoor-modal.png"} alt="warehouse" className="img-fluid w-100"/></div>
                        <div className="card-img-overlay d-flex align-items-end">
                          <div className="card-body px-0 d-flex justify-content-center">
                            <button className="btn-light card-bookmark active-book px-3 py-2 rounded">
                              <p className="card-title mb-0"><i className="fas fa-bookmark"></i> Save this image</p> 
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="card custom-card-overlay2 mx-2">
                        <div className="img-holder card-img"><img src={"/assets/images/warehouse/warehouse-indoor-outdoor-modal.png"} alt="warehouse" className="img-fluid w-100"/></div>
                        <div className="card-img-overlay d-flex align-items-end">
                          <div className="card-body px-0 d-flex justify-content-center">
                            <button className="btn-light card-bookmark active-book px-3 py-2 rounded">
                              <p className="card-title mb-0"><i className="fas fa-bookmark"></i> Save this image</p> 
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="card custom-card-overlay2 mx-2">
                        <div className="img-holder card-img"><img src={"/assets/images/warehouse/warehouse-indoor-outdoor-modal.png"} alt="warehouse" className="img-fluid w-100"/></div>
                        <div className="card-img-overlay d-flex align-items-end">
                          <div className="card-body px-0 d-flex justify-content-center">
                            <button className="btn-light card-bookmark px-3 py-2 rounded">
                              <p className="card-title mb-0"><i className="fas fa-bookmark"></i> Save this image</p> 
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="card custom-card-overlay2 mx-2">
                        <div className="img-holder card-img"><img src={"/assets/images/warehouse/warehouse-indoor-outdoor-modal.png"} alt="warehouse" className="img-fluid w-100"/></div>
                        <div className="card-img-overlay d-flex align-items-end">
                          <div className="card-body px-0 d-flex justify-content-center">
                            <button className="btn-light card-bookmark px-3 py-2 rounded">
                              <p className="card-title mb-0"><i className="fas fa-bookmark"></i> Save this image</p> 
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="card custom-card-overlay2 mx-2">
                        <div className="img-holder card-img"><img src={"/assets/images/warehouse/warehouse-indoor-outdoor-modal.png"} alt="warehouse" className="img-fluid w-100"/></div>
                        <div className="card-img-overlay d-flex align-items-end">
                          <div className="card-body px-0 d-flex justify-content-center">
                            <button className="btn-light card-bookmark px-3 py-2 rounded">
                              <p className="card-title mb-0"><i className="fas fa-bookmark"></i> Save this image</p> 
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                
              </div> 
            </div>
          </div> 
        </div>
      </div>
    </div>






{/* product image modal */}
  <div className="modal fade" id="product-item-show-modal" tabIndex="-1" role="dialog" aria-labelledby="product-item-show-modalTitle" aria-hidden="true">
      <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="product-item-show-modalTitle">Warehouse</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span className="text-warning fa" aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="img-holder">
              <img src={"/assets/images/warehouse/warehouse-details1.png"} alt="productImage" id="product-item-show-large" className="img-fluid w-100"/>
            </div>
          </div>
        </div>
      </div>
     </div>



  </>
  );
}

export default WarehouseImage;
