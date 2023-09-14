import React from 'react';

const ValueAddedServiceView = () => {
  return (
    <form className="">
    <div className="row pt-2"> 
    <div className="col-lg-12 mt-3 mb-4">
            <h6>Value Added Service</h6>
        </div>   
      <div className="row col-12 ml-0">
        <div className="col-12 px-0 table-responsive border bg-deep-gray rounded-md table-cell">
          <table className="table text-center">
            <tbody> 
              <tr>
                <td className="border-top-0 font-weight-bold py-3">S.no</td>  
                <td className="text-left border-top-0 font-weight-bold text-nowrap py-3 w-160px">Process Description</td>  
                <td className="border-top-0 font-weight-bold text-nowrap py-3 mw-150px">Qty per Month</td>  
                <td className="border-top-0 font-weight-bold py-3 mw-200px">Remarks</td>  
              </tr> 
              <tr> 
                <td>
                  1
                </td>
                <td className="text-left">
                  Quality Control
                </td>
                <td>
                  <input type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
                </td>
                <td>
                  <input type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
                </td>
              </tr>
              <tr> 
                <td>
                  2
                </td>
                <td className="text-left">
                  Repackaging
                </td>
                <td>
                  <input type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
                </td>
                <td>
                  <input type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
                </td>
              </tr>
              <tr> 
                <td>
                  3
                </td>
                <td className="text-left">
                  Labelling
                </td>
                <td>
                  <input type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
                </td>
                <td>
                  <input type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
                </td>
              </tr>
              <tr> 
                <td>
                  4
                </td>
                <td className="text-left">
                  Kitting
                </td>
                <td>
                  <input type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
                </td>
                <td>
                  <input type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
                </td>
              </tr>
              <tr> 
                <td>
                  5
                </td>
                <td className="text-left">
                  Shrink wrapping
                </td>
                <td>
                  <input type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
                </td>
                <td>
                  <input type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
                </td>
              </tr>
              <tr> 
                <td>
                  6
                </td>
                <td className="text-left">
                  Strapping
                </td>
                <td>
                  <input type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
                </td>
                <td>
                  <input type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
                </td>
              </tr>
              <tr> 
                <td>
                  7
                </td>
                <td className="text-left">
                  Palletization
                </td>
                <td>
                  <input type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
                </td>
                <td>
                  <input type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
                </td>
              </tr>
              <tr> 
                <td>
                  8
                </td>
                <td className="text-left">
                  Bar code
                </td>
                <td>
                  <input type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
                </td>
                <td>
                  <input type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
                </td>
              </tr>
              <tr> 
                <td>
                  9
                </td>
                <td className="text-left">
                  Others(please specify) 
                </td>
                <td>
                  <input type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
                </td>
                <td>
                  <input type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
                </td>
              </tr>
            </tbody>
          </table>
        </div> 
      </div>
      {/* <div className="col-12 mt-5">
        <div className="row justify-content-end">
          <div className="col-auto">
            <button type="button" className="btn btn-outline-deep-primary mb-3 add-className remove-class">Back</button>
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

export default ValueAddedServiceView;
