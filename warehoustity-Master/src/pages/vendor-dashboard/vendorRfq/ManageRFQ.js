import React, { useEffect } from "react";
import VendorLayout from "../../../layout/VendorLayout";
import { vendorRfqByPage } from "../../../store/actions/vendor/rfqAction";
import { useSelector, useDispatch } from "react-redux";
import {
  CardLoader,
  ItemNotFlund,
} from "../../../components/helper/CustomLoader";
import { Link, useHistory } from "react-router-dom";
import { readableDate } from "../../../components/validation";
import Pagination from "react-js-pagination";
import SearchBoxVendor from "../../../components/helper/SearchBoxVendor";

const ManageRFQ = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.VENDOR_RFQ_INFO);

  const pageCount = new URLSearchParams(window.location.search).get("page");

  const handlePageChange = (pageNumber) => {
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("page", pageNumber);
    history.push(window.location.pathname + "?" + currentUrlParams.toString());
    dispatch(vendorRfqByPage(pageNumber));
  };

  useEffect(() => {
    dispatch(vendorRfqByPage(parseInt(pageCount)));
  }, [dispatch, pageCount]);

  return (
    <VendorLayout>
      <div className="content-admin px-1">
        <div className="row align-items-center px-3 mx-0">
          <div className="col-12 col-sm-6 col-md-6 col-lg-6 pb-1 px-0 d-flex justify-content-between">
            <h5 className="backButton text-dark">
              <i
                onClick={() => history.goBack()}
                className="fas fa-chevron-left mr-2 cursorPointer"
              ></i>{" "}
              Manage RFQ
            </h5>
          </div>

          <div className="col-12 col-sm-6 col-md-6 col-lg-6 px-0">
            <SearchBoxVendor placeholder="search rfq" />
          </div>

          {data.isLoading ? (
            <CardLoader />
          ) : (
            <> 
            <div className="bg-white p-3">
              <div className="col-12 text-nowrap table-responsive table-gray-admin">
                {data.rfqList.data && data.rfqList.data.length > 0 ? (
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="text-center bg-dark text-white px-2">
                          S. No.
                        </th>
                        <th className=" bg-dark text-white px-2">RFQ ID</th>
                        <th className=" bg-dark text-white px-2">Date</th>
                        <th className=" bg-dark text-white px-2">Location</th>
                        <th className=" bg-dark text-white px-2">Status</th>
                        <th className="w-150px text-center  bg-dark text-white px-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.rfqList.data
                        .filter((item) => item.isOpenRfq === false)
                        .map((item, index) => {
                          return (
                            <tr>
                              <td className="text-center py-2">{index + 1}</td>
                              <td> {item?.customerRfq?.id}</td>
                              <td> {readableDate(item?.created_at)}</td>
                              <td>Delhi</td>
                              <td>
                                <button
                                  className={`alert ${
                                    item.customerRfq.status === "Confirm"
                                      ? "alert-success"
                                      : item.customerRfq.status === "Pending"
                                      ? "alert-warning"
                                      : "alert-danger"
                                  }  text-green mb-0 py-1`}
                                >
                                  {item.customerRfq.status}
                                </button>{" "}
                              </td>

                              <td>
                                <Link
                                  to={`/vendor/rfq-status/${item.id}/${item.customerRfq.id}`}
                                >
                                  <i className="fa fa-eye"></i>
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                ) : (
                  <ItemNotFlund message={`No Data Available`} />
                )}
              </div>
            </div>
            <div className="text-center">

            <div className="pagination-custom">
                {data.rfqList.data && data.rfqList.data !== undefined && (
                  <Pagination
                    activePage={parseInt(pageCount)}
                    itemsCountPerPage={10}
                    totalItemsCount={data.rfqList.totalCount}
                    pageRangeDisplayed={1}
                    onChange={handlePageChange}
                    prevPageText={<i className="fas fa-chevron-left" />}
                    nextPageText={<i className="fas fa-chevron-right" />}
                    hideFirstLastPages={true}
                  />
                )}
              </div>
            </div>
            </>
          )}
        </div>
      </div>
    </VendorLayout>
  );
};

export default ManageRFQ;
