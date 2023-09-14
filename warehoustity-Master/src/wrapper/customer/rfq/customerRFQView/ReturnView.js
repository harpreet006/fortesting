import React from 'react';

const ReturnView = () => {
  return (
    <form className="w-100">
        <div className="row pt-2"> 
        <div className="col-lg-12 mt-3 mb-4">
            <h6>Return</h6>
        </div>  
            <div className="col-12 ml-0">
            <div className="table-responsive border bg-deep-gray rounded-md table-cell">
                <table className="table text-center">
                <tbody> 
                    <tr>
                    <td className="border-top-0 font-weight-bold py-3">S.no</td>  
                    <td className="text-left border-top-0 font-weight-bold text-nowrap py-3 w-160px">Process Description</td>  
                    <td className="border-top-0 font-weight-bold py-3 mw-160px">UoM</td>  
                    <td className="border-top-0 font-weight-bold py-3 text-nowrap mw-100px">Weight per UOM</td>  
                    <td className="border-top-0 font-weight-bold py-3 mw-100px">Daily/Weekly/ Monthly</td>  
                    <td className="border-top-0 font-weight-bold text-nowrap py-3 mw-150px">Qty</td>  
                    <td className="border-top-0 font-weight-bold py-3 mw-200px">Remarks</td>  
                    </tr> 
                    <tr> 
                    <td>
                        1
                    </td>
                    <td className="text-left">
                        Retail / Distributor Stores
                    </td>
                    <td>
                        <input type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
                    </td>
                    <td>
                        <input type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
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
                        E-com (Bulk)
                    </td>
                    <td>
                        <input type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
                    </td>
                    <td>
                        <input type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
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
                        E-com (Pcs)
                    </td>
                    <td>
                        <input type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
                    </td>
                    <td>
                        <input type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
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
                <button type="button" className="btn btn-outline-deep-primary mb-3 add-className remove-className" data-add-target=".steps6" data-add-target-className="d-none" data-remove-target=".steps5" data-remove-target-className="d-none">Back</button>
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

export default ReturnView;
