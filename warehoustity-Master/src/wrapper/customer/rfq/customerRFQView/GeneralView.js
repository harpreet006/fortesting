import React from 'react';

const GeneralView = () => {
  return (
    <form className="">
    <div className="row pt-2"> 
    <div className="col-lg-12 mt-3 mb-4">
        <h6>General</h6>
      </div> 
       
      <div className="form-group col-sm-6 mb-4">
        <label htmlFor="staticEmail" className="mb-2">Select Industry <span className="text-danger h6">*</span></label>
        <select defaultValue={`Select`}  className="form-control form-control-lg">
          <option>Select</option>
          <option>Retail</option>                              
          <option>Automotive</option>                              
          <option>Hi-tech</option> 
          <option>Chemicals</option>                              
          <option>Audio, Vidoe, Telecom</option>                              
          <option>Engineering</option>                              
          <option>E-Commerce</option>                              
          <option>Pharma</option>                              
          <option>Healthcare</option>                              
          <option>Public Sector</option>                              
          <option>others, pls specify</option>                              
        </select>
      </div>
      <div className="form-group col-sm-6 mb-4">
        <label htmlFor="staticEmail" className="mb-2">Select Product <span className="text-danger h6">*</span></label>
        <select defaultValue={`Select`}  className="form-control form-control-lg">
          <option>Select</option>
          <option>General</option>                              
          <option>Custom Bonded</option>                              
          <option>Temperature Controlled</option> 
        </select>
      </div> 
      <div className="form-group col-lg-4 col-sm-4 mb-sm-4">
        <label htmlFor="staticEmail" className="mb-2">Select Product <span className="text-danger h6">*</span></label>
        <select defaultValue={`Select`}  className="form-control form-control-lg">
          <option>Select</option>
          <option>finish goods</option>                              
          <option>raw materials</option>                              
          <option>spare part</option> 
        </select>
      </div> 
      <div className="form-group col-lg-4 col-sm-4 mb-sm-4 pt-sm-4">
        <select defaultValue={`Select`}  className="form-control form-control-lg mt-sm-1">
          <option>Select</option>
          <option>in FTWZ</option>                              
          <option>in BLP</option>                              
        </select>
      </div> 
      <div className="form-group col-lg-4 col-sm-4 mb-4 pt-sm-4">
        <input readOnly type="text" className="form-control form-control-lg mt-sm-1" placeholder="Other area, please specify"/>
      </div>
      <div className="col-12 mb-md-4 mb-5 pt-md-1">
        <div className="custom-file form-group form-inline d-flex">
          <input type="file" id="custom-file-upload-input20" className="custom-file-input" readOnly  hidden/>
          <span id="custom-file-name" className="d-block custom-file-name px-0 mr-3 mb-2">Dangerous Goods? If so, pls specify</span>
          <div>
            <label className="custom-file-upload-label btn-deep-primary btn text-nowrap" htmlFor="custom-file-upload-input"readOnly >
              Attach MSDS
            </label> 
          </div>
        </div>
      </div>
      <div className="form-group col-lg-4 col-sm-4 mb-sm-4">
        <label htmlFor="staticEmail" className="mb-2">Select Warehouse Location</label>
        <select defaultValue={`Select`}  className="form-control form-control-lg">
          <option>Select</option>
          <option>finish goods</option>                              
          <option>raw materials</option>                              
          <option>spare part</option> 
        </select>
      </div> 
      <div className="form-group col-lg-4 col-sm-4 mb-sm-4 pt-sm-4">
        <select defaultValue={`City/Area`}  className="form-control form-control-lg mt-sm-1">
          <option>City/Area</option>
          <option>Mumbai</option>                              
          <option>Delhi</option>                              
        </select>
      </div>  
      <div className="form-group col-lg-4 col-sm-4 mb-4 pt-sm-4">
        <input readOnly type="text" className="form-control form-control-lg mt-sm-1" placeholder="Other area, please specify"/>
      </div> 
      <div className="form-group col-md-auto mb-sm-4">
        <label htmlFor="staticEmail" className="mb-2">Required working hour :</label>
        <div className="row">
          <div className="col-sm-auto">
            <select defaultValue={`1`} className="form-control form-control-lg">
              <option>1</option>
              <option>2</option>                              
              <option>3</option>  
              <option>4</option>                              
              <option>5</option>
              <option>6</option>                              
              <option>7</option>
              <option>8</option>                              
              <option>9</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
              <option>13</option>
              <option>14</option>
              <option>15</option>
              <option>16</option>
              <option>17</option>
              <option>18</option>
              <option>19</option>
            </select>
          </div>
          <div className="col-sm-auto py-2 px-1 text-center">
            To
          </div>
          <div className="col-sm-auto">
            <select defaultValue={`1`} className="form-control form-control-lg">
              <option>1</option>
              <option>2</option>                              
              <option>3</option> 
              <option>4</option>                              
              <option>5</option>
              <option>6</option>                              
              <option>7</option>
              <option>8</option>                              
              <option>9</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
              <option>13</option>
              <option>14</option>
              <option>15</option>
              <option>16</option>
              <option>17</option>
              <option>18</option>
              <option>19</option>
            </select>
          </div>
        </div>
      </div> 
      <div className="form-group col-xl-5 col-auto mb-sm-4 pt-md-4">
        <div className="row">
          <div className="col-sm-auto">
            <select defaultValue={`Monday`}  className="form-control form-control-lg mt-md-1" readOnly>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>
          <div className="col-sm-auto py-2 mt-1 px-1 text-center">
            To
          </div>
          <div className="col-sm-auto">
            <select defaultValue={`Monday`} className="form-control form-control-lg mt-md-1">
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>                                
            </select>
          </div>
        </div>
      </div>  
      <div className="form-group col-xl mb-4 pt-xl-4">
        <input readOnly type="text" className="form-control form-control-lg mt-xl-1" placeholder="Other area, please specify"/>
      </div>
      <div className="form-group col-lg-4 col-sm-4 mb-sm-4">
        <label htmlFor="staticEmail" className="mb-2">contract period?<span className="text-danger h6">*</span></label>
        <select defaultValue={`Select`} className="form-control form-control-lg">
          <option>Select</option>
          <option>1 year</option>                              
          <option>2 years</option>                              
          <option>3 years</option> 
        </select>
      </div>  
      <div className="form-group col-lg-4 col-sm-4 mb-4 pt-sm-4">
        <input readOnly type="text" className="form-control form-control-lg mt-sm-1" placeholder="Other area, please specify"/>
      </div>
      <div className="form-group col-lg-5 col-md-6 mb-4">
        <label htmlFor="staticEmail" className="mb-2">planned go-live date?</label>
        <input readOnly type="date" className="form-control form-control-lg"/>
      </div> 
      {/* <div className="col-12 mt-3">
        <div className="row justify-content-end">
          <div className="col-auto">
            <button type="button" className="btn btn-outline-deep-primary mb-3 add-className remove-className" data-add-target=".steps3" data-add-target-className="d-none" data-remove-target=".steps2" data-remove-target-className="d-none">Back</button>
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

export default GeneralView;
