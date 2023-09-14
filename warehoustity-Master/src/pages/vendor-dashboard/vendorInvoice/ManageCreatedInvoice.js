import React, {useEffect} from 'react';
import VendorLayout from '../../../layout/VendorLayout';
import { useHistory } from 'react-router-dom'
import {invoiceByuserType} from '../../../store/actions/customer/invoiceAction'
import {useSelector, useDispatch} from 'react-redux';
import {CardLoader} from '../../../components/helper/CustomLoader';
import VendorCreatedInvoiceList from '../../../wrapper/vendor/vendorInvoice/VendorCreatedInvoiceList';

const ManageCreatedInvoice = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const data = useSelector((state)=>state.INVOICEINFO);
  
    useEffect(() => {
        dispatch(invoiceByuserType("vendor"))
      }, [dispatch]);

    return (
        <VendorLayout>
     <div className="content-admin px-5">
        <div className="row justify-content-end align-items-center sticky-top py-3 px-3 bg-lighter-blue">
            <div className="col-auto d-lg-none">
              <button className="btn btn-deep-blue px-0 size-40px toggle-className btn-sidebar-admin sidebar-admin-toggle align-items-center justify-content-center" type="button" data-target=".sidebar-admin-toggle" data-toggle-class="open">
              <span></span>
              </button>
            </div>
           
          </div>
          <div className="row align-items-center py-3 px-3 mx-0"> 
            <div className="col-12 pb-1 px-0">
              <div className="row">
                <div className="col-auto order-sm-2 ml-auto">
                  {/* <Link to="/create-vendor-invoice" className="btn btn-deep-blue px-4">Create Invoice</Link> */}
                </div>
                <div className="col-auto order-sm-1">
                <h5 className="backButton mb-2"><i onClick={()=>history.goBack()} className="fas fa-chevron-left mr-3 cursorPointer"></i>Manage Vendor Invoice</h5>
                  {/* <h5 className="text-dark-blue">Manage Vendor Invoice</h5> */}
                </div>
              </div>
            </div>
        {data.isLoading ? <CardLoader /> :
            <div className="col-12 px-0 table-responsive table-row-margin-bottom-admin">
              <table className="table listTable">
                <thead>
                  <tr>
                    <th>S.NO</th>
                    <th className="text-nowrap">Vendor Name</th>
                    <th>Email Id</th>
                    <th>Date </th>
                    <th className="text-nowrap">Warehouse Id</th>
                    <th className="text-center text-nowrap">View Invoice</th> 
                  </tr>
                </thead>
                
                <tbody>
                {
                  data.invoiceList?.data && data.invoiceList.data.length ?
                  data.invoiceList.data.map((item, index)=>{
                    return(
                      <VendorCreatedInvoiceList item={item} index={index+1} key={index} />
                    )
                  })

                  :null}
               
                </tbody>
              </table>
            </div>
            }
          </div> 
          </div>
    </VendorLayout>
    )
}

export default ManageCreatedInvoice
