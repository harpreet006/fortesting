import React, { useEffect } from "react";
import VendorLayout from "../../../layout/VendorLayout";
import { vendorRfqByPage } from "../../../store/actions/vendor/rfqAction";
import { useSelector, useDispatch } from "react-redux";
import {
  CardLoader,
  ItemNotFlund,
} from "../../../components/helper/CustomLoader";
import { Link } from "react-router-dom";
import { readableDate } from "../../../components/validation";
import Pagination from "react-js-pagination";
import { useHistory } from "react-router-dom";
import SearchBoxVendor from "../../../components/helper/SearchBoxVendor";

const ManageOpenRfq = () => {
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
            <h5 className="backButton text-dark ">
              <i
                onClick={() => history.goBack()}
                className="fas fa-chevron-left mr-2 cursorPointer"
              ></i>{" "}
              Manage Open RFQ
            </h5>
          </div>

          <div className="col-12 col-sm-6 col-md-6 col-lg-6 px-0">
            <SearchBoxVendor placeholder="search rfq" />
          </div>

          {data.isLoading ? (
            <CardLoader />
          ) : (
            <div className="col-12 text-nowrap table-responsive table-gray-admin bg-white py-3">
              {data.rfqList.data && data.rfqList.data.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th className="text-center bg-dark text-white  px-1">S. No.</th>
                      <th className="bg-dark text-white  px-1">RFQ ID</th>
                      <th className="bg-dark text-white  px-1">Date</th>
                      <th className="bg-dark text-white  px-1">Location</th>
                      <th className="bg-dark text-white  px-1">Status</th>
                      <th className="w-150px text-center bg-dark text-white  px-1">View</th>
                      {/* <th className="w-200px text-center"></th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {data.rfqList.data
                      .filter((item) => item.isOpenRfq === true)
                      .map((item, index) => {
                        return (
                          <tr>
                            <td className="text-center py-2">{index + 1}</td>
                            <td>RFQID {item?.customerRfq?.id}</td>
                            <td> {readableDate(item?.created_at)}</td>
                            <td>Delhi</td>
                            <td>
                              <button
                                className={`alert ${
                                  item.customerRfq.status === "Confirm"
                                    ? "alert-primary"
                                    : item.customerRfq.status === "Pending"
                                    ? "alert-primary"
                                    : "alert-primary"
                                }  text-white mb-0 py-1`}
                              >
                                {item.customerRfq.status}
                              </button>{" "}
                            </td>

                            <td className="px-3 text-center">
                              <Link
                                to={`/vendor/rfq-status/${item.id}/${item.customerRfq.id}`}
                              >
                                <i className="fas fa-eye text-dark"></i>
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

              {data.rfqList?.totalCount > 10 && (
                <div className="pagination-custom">
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
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </VendorLayout>
  );
};

export default ManageOpenRfq;
