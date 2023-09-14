import React, { useEffect } from "react";
import VendorLayout from "../../../layout/VendorLayout";
import VendorInvoiceList from "../../../wrapper/vendor/vendorInvoice/VendorInvoiceList";
import { useHistory } from "react-router-dom";
import { invoiceonVendor } from "../../../store/actions/customer/invoiceAction";
import { useSelector, useDispatch } from "react-redux";
import {
  CardLoader,
  ItemNotFlund,
} from "../../../components/helper/CustomLoader";
import SearchBoxVendor from "../../../components/helper/SearchBoxVendor";

const ManageVendorInvoice = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.INVOICEINFO);

  useEffect(() => {
    dispatch(invoiceonVendor(1));
  }, [dispatch]);

  return (
    <VendorLayout>
      <div className="content-admin px-1">
        <div className="row align-items-center  px-3 ml-3 mr-2">
          <div className="col-12 col-sm-6 col-md-6 col-lg-6 pb-1 px-0 d-flex justify-content-between">
            <h5 className="backButton text-dark ">
              <i
                onClick={() => history.goBack()}
                className="fas fa-chevron-left mr-2 cursorPointer"
              ></i>{" "}
              Manage Vendor Invoice
            </h5>
          </div>

          <div className="col-12 col-sm-6 col-md-6 col-lg-6 px-0">
            <SearchBoxVendor placeholder="search invoice" />
          </div>

          {data.isLoading ? (
            <CardLoader />
          ) : (
            <div className="col-12 text-nowrap table-responsive table-gray-admin bg-white py-3">
              {data.invoiceList?.data && data.invoiceList.data.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th className="text-center bg-dark text-white px-2">S.NO</th>
                      <th className="text-nowrap bg-dark text-white px-2">WH ID</th>
                      <th className="text-nowrap bg-dark text-white px-2">Booking Id</th>
                      <th className="text-nowrap bg-dark text-white px-2">Wh Display Name</th>
                      <th className="text-nowrap bg-dark text-white px-2">WH Location</th>
                      <th className="text-nowrap bg-dark text-white px-2">Bill Description</th>
                      <th className="text-nowrap bg-dark text-white px-2">Invoice No</th>
                      <th className="text-nowrap bg-dark text-white px-2">Ammount </th>
                      <th className="text-nowrap bg-dark text-white px-2">GST Applicable</th>
                      <th className="text-nowrap bg-dark text-white px-2">GST %</th>
                      <th className="text-nowrap bg-dark text-white px-2">Total Ammount</th>
                      <th className="text-nowrap bg-dark text-white px-2">Creatit Days</th>
                      <th className="text-nowrap bg-dark text-white px-2">Due Day</th>
                      <th className="text-nowrap bg-dark text-white px-2">Payment Terms</th>
                      <th className="bg-dark text-white">Date </th>
                      <th className="text-center text-nowrap bg-dark text-white">View Invoice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.invoiceList.data.map((item, index) => {
                      return (
                        <VendorInvoiceList
                          item={item}
                          index={index + 1}
                          key={index}
                        />
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <ItemNotFlund message="No Data Available" />
              )}
            </div>
          )}
        </div>
      </div>
    </VendorLayout>
  );
};

export default ManageVendorInvoice;
