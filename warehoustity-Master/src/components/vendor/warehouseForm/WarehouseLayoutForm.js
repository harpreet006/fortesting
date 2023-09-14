import React from 'react'

const WarehouseLayoutForm = () => {
    return (
        <>
          
          <div className="row align-items-center pb-3 mx-0"> 
            <div className="col-12">
              <form action="">    
                <div className="row bg-white rounded mx-0 col-xxxl-11">
                  <div className="col-xl-3 col-lg-3 col-sm-6">
                    <div className="card card-overlay upload-image-preview position-relative">
                      <div className="img-holder size-200px">
                        <img className="w-100 h-100 img-fluid rounded overflow-hideen" id="imageResult" src="../assets/images/upload-bg.png" alt=""/>
                      </div>
                      <div className="card-img-overlay size-200px d-flex justify-content-center align-items-center">
                        <div className="card-text">
                          <input id="upload-image-preview1" type="file"  className="form-control border-0" hidden />
                          <label id="upload-label" htmlFor="upload-image-preview1" className="font-weight-light text-muted"></label>
                          <div className="input-group-append">
                            <label htmlFor="upload-image-preview1" className="btn px-0 text-deep-blue font-weight-bold m-0 rounded-pill px-4"> 
                              <div>
                                <img src="../assets/images/icons/upload-icon-deep-blue.png" alt="" />
                              </div>
                              Upload image
                            </label>
                          </div> 
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-sm-6">
                    <div className="card card-overlay upload-image-preview position-relative">
                      <div className="img-holder size-200px">
                        <img className="w-100 h-100 img-fluid rounded overflow-hideen" id="imageResult" src="../assets/images/upload-bg.png" alt="" />
                      </div>
                      <div className="card-img-overlay size-200px d-flex justify-content-center align-items-center">
                        <div className="card-text">
                          <input id="upload-image-preview1" type="file" className="form-control border-0" hidden />
                          <label id="upload-label" htmlFor="upload-image-preview1" className="font-weight-light text-muted"></label>
                          <div className="input-group-append">
                            <label htmlFor="upload-image-preview1" className="btn px-0 text-deep-blue font-weight-bold m-0 rounded-pill px-4"> 
                              <div>
                                <img src="../assets/images/icons/upload-icon-deep-blue.png" alt="" />
                              </div>
                              Upload image
                            </label>
                          </div> 
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-sm-6">
                    <div className="card card-overlay upload-image-preview position-relative">
                      <div className="img-holder size-200px">
                        <img className="w-100 h-100 img-fluid rounded overflow-hideen" id="imageResult" src="../assets/images/upload-bg.png" alt="" />
                      </div>
                      <div className="card-img-overlay size-200px d-flex justify-content-center align-items-center">
                        <div className="card-text">
                          <input id="upload-image-preview1" type="file"  className="form-control border-0" hidden />
                          <label id="upload-label" htmlFor="upload-image-preview1" className="font-weight-light text-muted"></label>
                          <div className="input-group-append">
                            <label htmlFor="upload-image-preview1" className="btn px-0 text-deep-blue font-weight-bold m-0 rounded-pill px-4"> 
                              <div>
                                <img src="../assets/images/icons/upload-icon-deep-blue.png" alt="" />
                              </div>
                              Upload image
                            </label>
                          </div> 
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-sm-6">
                    <div className="card card-overlay upload-image-preview position-relative">
                      <div className="img-holder size-200px">
                        <img className="w-100 h-100 img-fluid rounded overflow-hideen" id="imageResult" src="../assets/images/upload-bg.png" alt="" />
                      </div>
                      <div className="card-img-overlay size-200px d-flex justify-content-center align-items-center">
                        <div className="card-text">
                          <input id="upload-image-preview5" type="file" className="form-control border-0" hidden />
                          <label id="upload-label" htmlFor="upload-image-preview5" className="font-weight-light text-muted"></label>
                          <div className="input-group-append">
                            <label htmlFor="upload-image-preview5" className="btn px-0 text-deep-blue font-weight-bold m-0 rounded-pill px-4"> 
                              <div>
                                <img src="../assets/images/icons/upload-icon-deep-blue.png" alt="" />
                              </div>
                              Upload image
                            </label>
                          </div> 
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mt-4">
                    <div className="row justify-content-end"> 
                      <div className="col-auto">
                        <button type="button" className="btn text-deep-blue text-uppercase font-weight-bold">Add More</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mt-4">
                    <div className="row justify-content-end">
                      <div className="col-auto">
                        {/* <button type="button" className="btn btn-outline-deep-blue add-class remove-class" data-add-target=".steps10" data-add-target-class="d-none" data-remove-target=".steps9" data-remove-target-class="d-none">Back</button> */}
                      </div>
                      <div className="col-auto">
                        <button type="button" className="btn btn-deep-blue add-class remove-class">Submit</button>
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

export default WarehouseLayoutForm
