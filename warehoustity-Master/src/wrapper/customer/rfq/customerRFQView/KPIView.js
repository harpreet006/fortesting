import React from 'react';

const KPIView = () => {
  return (
    <form className="">
    <div className="row pt-2"> 
    <div className="col-lg-12 mb-2">
        <h6>KPI</h6>
      </div> 
     
      <div className="row col-12 ml-0">
        <div className="col-12 mb-md-4 mb-5 pt-md-1 px-0">
          <div className="custom-file form-group form-inline">
            <input type="file" id="custom-file-upload-input1" className="custom-file-input" hidden />
            <span id="custom-file-name" className="d-block custom-file-name px-0 mr-3 mb-2">Do you have specific KPI requirements? If yes, pls clarify the definition and targets.</span>
            <div>
              <label className="custom-file-upload-label btn-deep-primary btn text-nowrap w-250px" htmlFor="custom-file-upload-input1">
                Attach File
              </label> 
            </div>
          </div>
        </div>
      </div>
      {/* <div className="col-12 mt-5">
        <div className="row justify-content-end">
          <div className="col-auto">
            <button type="button" className="btn btn-outline-deep-primary mb-3 add-className remove-className" data-add-target=".steps10" data-add-target-className="d-none" data-remove-target=".steps9" data-remove-target-className="d-none">Back</button>
          </div>
          <div className="col-auto">
            <button type="button" className="btn btn-deep-primary mb-3 add-className remove-className">Submit</button>
          </div>
        </div>
      </div> */}
    </div>
  </form>
  );
}

export default KPIView;
