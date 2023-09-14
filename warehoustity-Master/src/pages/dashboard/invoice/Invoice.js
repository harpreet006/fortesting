import React, { useEffect } from "react";
import Layout from "../../../layout/Layout";
import InvoiceList from "../../../wrapper/customer/invoice/InvoiceList";
import { useHistory } from "react-router-dom";
import CustomerLayout from "../../../layout/CustomerLayout";
import { userInvoice } from "../../../store/actions/customer/invoiceAction";
import { useSelector, useDispatch } from "react-redux";
import { CardLoader } from "../../../components/helper/CustomLoader";
import Pagination from "react-js-pagination";

const Invoice = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.INVOICEINFO);

  const pageCount = new URLSearchParams(window.location.search).get("page");

  const handlePageChange = (pageNumber) => {
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("page", pageNumber);
    history.push(window.location.pathname + "?" + currentUrlParams.toString());
    dispatch(userInvoice(parseInt(pageCount), ""));
  };

  useEffect(() => {
    dispatch(userInvoice(parseInt(pageCount), ""));
  }, [dispatch, pageCount]);
  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });
  return (
    <Layout>
      <CustomerLayout title="Invoice Management">
        <div className="row">
          <div className="content col-12 view-invoice">
            <div className="border-bottom d-sm-flex justify-content-between">
              <div>
                <span className="btn px-0 text-dark font-weight-bold mr-3 mb-2">
                  <i
                    onClick={() => history.goBack()}
                    className="fas fa-chevron-left pr-3"
                  ></i>{" "}
                  Manage Invoice
                </span>
              </div>
            </div>

            {data.isLoading ? (
              <CardLoader />
            ) : (
              <>
                <div className="row">
                  <div className="col-12  table-responsive table-dashboard p-3">
                    <table className="table">
                      <thead className="theader">
                        <tr>
                          {/* <th className="w-100px">S. No.</th>
                          <th>Date</th>
                          <th>Warehouse ID</th>
                          <th>Warehouse Name</th>
                          <th className="text-center">View details</th> */}

                          <th className="text-center">S.NO</th>
                          <th className="text-nowrap px-2">WH ID</th>
                          <th className="text-nowrap px-2">Booking Id</th>
                          <th className="text-nowrap px-2" style={{minWidth:"205px"}}>Wh Display Name</th>
                          <th className="text-nowrap px-2">WH Location</th>
                          <th className="text-nowrap px-2" style={{minWidth:"205px"}}>Bill Description</th>
                          <th className="text-nowrap px-2">Invoice No</th>
                          <th className="text-nowrap px-2">Ammount </th>
                          <th className="text-nowrap px-2">GST Applicable</th>
                          <th className="text-nowrap px-2">GST %</th>
                          <th className="text-nowrap px-2">Total Ammount</th>
                          <th className="text-nowrap px-2">Creatit Days</th>
                          <th className="text-nowrap px-2">Due Date</th>
                          <th className="text-nowrap px-2">Payment Terms</th>
                          <th className="text-nowrap px-2">Create By</th>
                          <th className="text-nowrap px-2">Create On</th>
                          <th className="text-nowrap px-2">Status</th>
                          <th className="text-nowrap px-2">Remarks</th>
                          <th className="text-center text-nowrap">
                            View Invoice
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.invoiceList.data &&
                        data.invoiceList.data.length > 0
                          ? data.invoiceList.data.map((invoice, index) => {
                              return (
                                <InvoiceList
                                  key={index}
                                  index={index + 1}
                                  invoice={invoice}
                                />
                              );
                            })
                          : null}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="pagination-custom">
                  {data.invoiceList.data &&
                    data.invoiceList.data !== undefined && (
                      <Pagination
                        activePage={parseInt(pageCount)}
                        itemsCountPerPage={10}
                        totalItemsCount={data.invoiceList.totalCount}
                        pageRangeDisplayed={1}
                        onChange={handlePageChange}
                        prevPageText={<i className="fas fa-chevron-left" />}
                        nextPageText={<i className="fas fa-chevron-right" />}
                        hideFirstLastPages={true}
                      />
                    )}
                </div>
              </>
            )}
          </div>
        </div>
      </CustomerLayout>
    </Layout>
  );
};

export default Invoice;
