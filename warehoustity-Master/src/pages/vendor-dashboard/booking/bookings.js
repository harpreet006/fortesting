import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import BookingList from "../../../wrapper/vendor/BookingList";
import MenuDrawer from "../../../components/vendor/MenuDrawer";
import VendorLayout from "../../../layout/VendorLayout";
import Pagination from "react-js-pagination";
import { useSelector, useDispatch } from "react-redux";
import { vendorBookingAuth } from "../../../store/actions/customer/bookingAction";
import { CardLoader } from "../../../components/helper/CustomLoader";
import SearchBoxVendor from "../../../components/helper/SearchBoxVendor";

const Booking = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.BOOKINGINFO);
  const pageCount = new URLSearchParams(window.location.search).get("page");

  useEffect(() => {
    dispatch(vendorBookingAuth(parseInt(pageCount), "ALL"));
  }, [dispatch, pageCount]);

  const handlePageChange = (pageNumber) => {
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("page", pageNumber);
    history.push(window.location.pathname + "?" + currentUrlParams.toString());
    dispatch(vendorBookingAuth(pageNumber, ""));
  };

  return (
    <VendorLayout>
      <div className="content-admin px-1">
        <div className="row justify-content-end align-items-center pb-1 px-4 mx-0">
          <MenuDrawer />
          <div className="col-12 col-sm-6 col-md-6 col-lg-6 pb-1 px-0 d-flex justify-content-between">
            <h5 className="backButton text-dark">
              {" "}
              <i
                onClick={() => history.goBack()}
                className="fas fa-chevron-left mr-1 cursorPointer"
              ></i>{" "}
              Manage Booking
            </h5>
          </div>

          <div className="col-12 col-sm-6 col-md-6 col-lg-6 px-0">
            <SearchBoxVendor placeholder="search booking" />
          </div>


          <div className="col-12 bg-white custom-shadow p-1 mb-1  tabs-scroll">
            <ul
              className="nav nav-pills admin-tabs-blue"
              id="pills-tab"
              role="tablist"
            >
              <li className="nav-item">
                <Link
                  to="/vendor/booking?page=1"
                  className="nav-link vendorActive"
                >
                  All
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/vendor/booking-pending?page=1" className="nav-link">
                  Pending
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/vendor/booking-confirm?page=1"
                  className="nav-link text-uppercase"
                >
                  Confirmed
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/vendor/booking-cancel?page=1"
                  className="nav-link text-uppercase"
                >
                  Cancelled
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-12 px-3">
            <div className="row">
              {data.isLoading ? (
                <CardLoader />
              ) : (
               <div className="bg-white p-3 col-12">
               <div className="w-100 table-responsive table-gray-admin">
                  <table className="table listTable">
                    <thead className="">
                      <tr>
                        <th className="w-100px bg-dark text-white px-2">S.No</th>
                        <th className="text-nowrap bg-dark text-white px-2">Booking ID</th>
                        <th className="bg-dark text-white px-2">Date</th>
                        <th className="text-nowrap bg-dark text-white px-2">Warehosue ID</th>
                        <th className="bg-dark text-white px-2">Category</th>
                        <th className="bg-dark text-white px-2">Status</th>
                        <th className="text-center bg-dark text-white px-2">View</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.bookingList.data && data.bookingList.data.length > 0
                        ? data.bookingList.data.map((item, index) => {
                          return (
                            <BookingList
                              item={item}
                              status="ALL"
                              index={index + 1}
                              key={index}
                            />
                          );
                        })
                        : null}
                    </tbody>
                  </table>
                </div>
               </div>
              )}
            </div>

            {data.bookingList?.totalCount > 10 &&
              <div className="pagination-custom">
                <Pagination
                  activePage={parseInt(pageCount)}
                  itemsCountPerPage={10}
                  totalItemsCount={data.bookingList?.totalCount}
                  pageRangeDisplayed={5}
                  onChange={handlePageChange}
                  prevPageText={<i className="fas fa-chevron-left" />}
                  nextPageText={<i className="fas fa-chevron-right" />}
                  hideFirstLastPages={true}
                />
              </div>
            }
          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default Booking;
