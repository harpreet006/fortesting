import React from 'react';

const InventoryManagementView = () => {
  return (
    <form className="w-100">
    <div className="row pt-2">
    <div className="col-lg-12 mt-3 mb-4">
            <h6>Inventory Management</h6>
        </div>  
        
      <div className="col-12 ml-0">
        <div className="table-responsive border bg-deep-gray rounded-md table-cell">
          <table className="table text-center">
            <tbody> 
              <tr>
                <td className="border-top-0 font-weight-bold py-3">S.no</td>  
                <td className="text-left border-top-0 font-weight-bold text-nowrap py-3 w-160px">Process Description</td>  
                <td className="border-top-0 font-weight-bold py-3 mw-160px">Yes/No</td>    
                <td className="border-top-0 font-weight-bold py-3 mw-100px">Daily/Weekly/ Monthly</td>  
                <td className="border-top-0 font-weight-bold text-nowrap py-3 mw-150px">Qty</td>  
                <td className="border-top-0 font-weight-bold py-3 mw-200px">Remarks</td>  
              </tr> 
              <tr> 
                <td>
                  1
                </td>
                <td className="text-left">
                  FIFO
                </td>
                <td>
                  <select className="form-control h-35px bg-white border-0 my-1">
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </td>
                <td>
                  <select className="form-control h-35px bg-white border-0 my-1">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
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
                  LIFO
                </td>
                <td>
                  <select className="form-control h-35px bg-white border-0 my-1">
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </td>
                <td>
                  <select className="form-control h-35px bg-white border-0 my-1">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
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
                  Lot Control
                </td>
                <td>
                  <select className="form-control h-35px bg-white border-0 my-1">
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </td>
                <td>
                  <select className="form-control h-35px bg-white border-0 my-1">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
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
                  Serial No
                </td>
                <td>
                  <select className="form-control h-35px bg-white border-0 my-1">
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </td>
                <td>
                  <select className="form-control h-35px bg-white border-0 my-1">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
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
                  Expiration Date
                </td>
                <td>
                  <select className="form-control h-35px bg-white border-0 my-1">
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </td>
                <td>
                  <select className="form-control h-35px bg-white border-0 my-1">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
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
                  Others
                </td>
                <td>
                  <select className="form-control h-35px bg-white border-0 my-1">
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </td>
                <td>
                  <select className="form-control h-35px bg-white border-0 my-1">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
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
                  Inventory Count - 
                </td>
                <td>
                  <select className="form-control h-35px bg-white border-0 my-1">
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </td>
                <td>
                  <select className="form-control h-35px bg-white border-0 my-1">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
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
                  7.1
                </td>
                <td className="text-left">
                  Cycle Count
                </td>
                <td>
                  <select className="form-control h-35px bg-white border-0 my-1">
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </td>
                <td>
                  <select className="form-control h-35px bg-white border-0 my-1">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
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
                  7.2
                </td>
                <td className="text-left">
                  Perpitual Inventory
                </td>
                <td>
                  <select className="form-control h-35px bg-white border-0 my-1">
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </td>
                <td>
                  <select className="form-control h-35px bg-white border-0 my-1">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
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
                  7.3
                </td>
                <td className="text-left">
                  Wall  to wall
                </td>
                <td>
                  <select className="form-control h-35px bg-white border-0 my-1">
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </td>
                <td>
                  <select className="form-control h-35px bg-white border-0 my-1">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
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
                  7.4
                </td>
                <td className="text-left">
                  Others
                </td>
                <td>
                  <select className="form-control h-35px bg-white border-0 my-1">
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </td>
                <td>
                  <select className="form-control h-35px bg-white border-0 my-1">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
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
                  Average Stock Level (Product)
                </td>
                <td>
                  <select className="form-control h-35px bg-white border-0 my-1">
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </td>
                <td>
                  <select className="form-control h-35px bg-white border-0 my-1">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
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
                  Average Inventory Value in INR
                </td>
                <td>
                  <select className="form-control h-35px bg-white border-0 my-1">
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </td>
                <td>
                  <select className="form-control h-35px bg-white border-0 my-1">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
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
                  10
                </td>
                <td className="text-left">
                  Peak Month
                </td>
                <td>
                  <select className="form-control h-35px bg-white border-0 my-1">
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </td>
                <td>
                  <select className="form-control h-35px bg-white border-0 my-1">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
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
                  11
                </td>
                <td className="text-left">
                  Lean Month
                </td>
                <td>
                  <select className="form-control h-35px bg-white border-0 my-1">
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </td>
                <td>
                  <select className="form-control h-35px bg-white border-0 my-1">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
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
            <button type="button" className="btn btn-outline-deep-primary mb-3 add-className remove-className" data-add-target=".steps7" data-add-target-className="d-none" data-remove-target=".steps6" data-remove-target-className="d-none">Back</button>
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

export default InventoryManagementView;
