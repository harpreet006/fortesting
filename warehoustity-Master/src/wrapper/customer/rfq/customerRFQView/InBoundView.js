import React from 'react';

const InBoundView = () => {
  return (
     <form className="w-100">
        <div className="row pt-2"> 
        <div className="col-lg-12 mt-3 mb-4">
            <h6>In Bound</h6>
        </div> 
            
            <div className="col-12 ml-0">
            <div className="table-responsive border bg-deep-gray rounded-md table-cell">
                <table className="table text-center">
                <tbody> 
                    <tr>
                    <td className="border-top-0 font-weight-bold py-3">S.no</td>  
                    <td className="text-left border-top-0 font-weight-bold text-nowrap py-3">Process Description</td>  
                    <td className="border-top-0 font-weight-bold py-3 mw-250px">UoM</td>  
                    <td className="border-top-0 font-weight-bold text-nowrap py-3">Weight per UOM</td>  
                    <td className="border-top-0 font-weight-bold py-3 w-100px">Daily/Weekly/Monthly Volume</td>  
                    <td className="border-top-0 font-weight-bold py-3 mw-150px">Qty</td>  
                    <td className="border-top-0 font-weight-bold text-nowrap py-3">Vehicle Type</td>  
                    <td className="border-top-0 font-weight-bold py-3 mw-200px">Remarks</td>  
                    </tr> 
                    <tr> 
                    <td>
                        1
                    </td>
                    <td className="text-left">
                        PO Processing
                    </td>
                    <td>
                        <input readOnly type="text" className="form-control text-center bg-white border-0 my-1" name="" placeholder="Nos"/>
                    </td>
                    <td>
                        <input readOnly type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
                    </td>
                    <td>
                        <select className="form-control h-35px bg-white border-0 my-1">
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                        </select>
                    </td>
                    <td>
                        <input readOnly type="number" className="form-control text-center bg-white border-0 my-1" name="" placeholder="60"/>
                    </td>
                    <td>
                        <input readOnly type="text" className="form-control text-center bg-white border-0 my-1" name="" placeholder="20Ft"/>
                    </td>
                    <td>
                        <input readOnly type="text" className="form-control text-center bg-white border-0 my-1" name="" placeholder="Approx"/>
                    </td>
                    </tr>  
                    <tr> 
                    <td>
                        2
                    </td>
                    <td className="text-left">
                        Vehicles Inbound
                    </td>
                    <td>
                        <input readOnly type="text" className="form-control text-center bg-white border-0 my-1" name="" placeholder="# Vehicles"/>
                    </td>
                    <td>
                        <input readOnly type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
                    </td>
                    <td>
                        <select className="form-control h-35px bg-white border-0 my-1">
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                        </select>
                    </td>
                    <td>
                        <input readOnly type="number" className="form-control text-center bg-white border-0 my-1" name="" placeholder="4"/>
                    </td>
                    <td>
                        <input readOnly type="text" className="form-control text-center bg-white border-0 my-1" name="" placeholder="20Ft"/>
                    </td>
                    <td>
                        <input readOnly type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
                    </td>
                    </tr>
                    <tr> 
                    <td>
                        3
                    </td>
                    <td className="text-left">
                        Invoice per Vehicle
                    </td>
                    <td>
                        <input readOnly type="text" className="form-control text-center bg-white border-0 my-1" name="" placeholder="# Shipments/Invoice"/>
                    </td>
                    <td>
                        <input readOnly type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
                    </td>
                    <td>
                        <select className="form-control h-35px bg-white border-0 my-1">
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                        </select>
                    </td>
                    <td>
                        <input readOnly type="number" className="form-control text-center bg-white border-0 my-1" name="2"/>
                    </td>
                    <td>
                        <input readOnly type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
                    </td>
                    <td>
                        <input readOnly type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
                    </td>
                    </tr>
                    <tr> 
                    <td>
                        4
                    </td>
                    <td className="text-left">
                        Cartons/ Boxes /Pallets per vehicle
                    </td>
                    <td>
                        <input readOnly type="text" className="form-control text-center bg-white border-0 my-1" name="" placeholder="Nos"/>
                    </td>
                    <td>
                        <input readOnly type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
                    </td>
                    <td>
                        <select className="form-control h-35px bg-white border-0 my-1">
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                        </select>
                    </td>
                    <td>
                        <input readOnly type="number" className="form-control text-center bg-white border-0 my-1" name=""/>
                    </td>
                    <td>
                        <input readOnly type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
                    </td>
                    <td>
                        <input readOnly type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
                    </td>
                    </tr>
                    <tr> 
                    <td>
                        5
                    </td>
                    <td className="text-left">
                        SKU Items per Invoice
                    </td>
                    <td>
                        <input readOnly type="text" className="form-control text-center bg-white border-0 my-1" name="" placeholder="Nos"/>
                    </td>
                    <td>
                        <input readOnly type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
                    </td>
                    <td>
                        <select className="form-control h-35px bg-white border-0 my-1">
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                        </select>
                    </td>
                    <td>
                        <input readOnly type="number" className="form-control text-center bg-white border-0 my-1" name="" placeholder="10"/>
                    </td>
                    <td>
                        <input readOnly type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
                    </td>
                    <td>
                        <input readOnly type="text" className="form-control text-center bg-white border-0 my-1" name="" placeholder="Approx"/>
                    </td>
                    </tr>    
                    <tr> 
                    <td>
                        6
                    </td>
                    <td className="text-left">
                        Generate barcode/Lable/Sticker
                    </td>
                    <td>
                        <input readOnly type="text" className="form-control text-center bg-white border-0 my-1" name="" placeholder="# Carton/Boxes/Pallets"/>
                    </td>
                    <td>
                        <input readOnly type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
                    </td>
                    <td>
                        <select className="form-control h-35px bg-white border-0 my-1">
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                        </select>
                    </td>
                    <td>
                        <input readOnly type="number" className="form-control text-center bg-white border-0 my-1" name=""/>
                    </td>
                    <td>
                        <input readOnly type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
                    </td>
                    <td>
                        <input readOnly type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
                    </td>
                    </tr> 
                    <tr> 
                    <td>
                        7
                    </td>
                    <td className="text-left">
                        Scanning Inbound
                    </td>
                    <td>
                        <input readOnly type="text" className="form-control text-center bg-white border-0 my-1" name="" placeholder="# Carton/Boxes/Pallets"/>
                    </td>
                    <td>
                        <input readOnly type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
                    </td>
                    <td>
                        <select className="form-control h-35px bg-white border-0 my-1">
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                        </select>
                    </td>
                    <td>
                        <input readOnly type="number" className="form-control text-center bg-white border-0 my-1" name=""/>
                    </td>
                    <td>
                        <input readOnly type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
                    </td>
                    <td>
                        <input readOnly type="text" className="form-control text-center bg-white border-0 my-1" name=""/>
                    </td>
                    </tr>  
                    <tr> 
                    <td>
                        8
                    </td>
                    <td className="text-left">
                        MRN/GRN in System
                    </td>
                    <td>
                        <input readOnly type="text" className="form-control text-center bg-white border-0 my-1" name="" placeholder="Nos"/>
                    </td>
                    <td>
                        <input readOnly type="text" className="form-control text-center bg-white border-0 my-1" name="" />
                    </td>
                    <td>
                        <select className="form-control h-35px bg-white border-0 my-1">
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                        </select>
                    </td>
                    <td>
                        <input readOnly type="number" className="form-control text-center bg-white border-0 my-1" name=""/>
                    </td>
                    <td>
                        <input readOnly type="text" className="form-control text-center bg-white border-0 my-1" name="" />
                    </td>
                    <td>
                        <input readOnly type="text" className="form-control text-center bg-white border-0 my-1" name="" />
                    </td>
                    </tr>  
                </tbody>
                </table>
            </div> 
            </div>
            {/* <div className="col-12 mt-5">
            <div className="row justify-content-end">
                <div className="col-auto">
                <button type="button" className="btn btn-outline-deep-primary mb-3 add-className remove-className" data-add-target=".steps4" data-add-target-className="d-none" data-remove-target=".steps3" data-remove-target-className="d-none">Back</button>
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

export default InBoundView;
