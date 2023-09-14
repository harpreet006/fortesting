import React, { useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import { useHistory } from "react-router-dom";
import BookingList from "../../../components/dashboard/BookingList";
import CustomerLayout from "../../../layout/CustomerLayout";
import {
  customerBookingAuth,
  bookingList,
} from "../../../store/actions/customer/bookingAction";
import { useSelector, useDispatch } from "react-redux";
import {
  CardLoader,
  ItemNotFlund,
} from "../../../components/helper/CustomLoader";
import Pagination from "react-js-pagination";
import { fetchMappedWarehouse } from "../../../store/actions/warehouseAction";

const Booking = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.BOOKINGINFO);
  const [mappedWarehouse, setMappedWarehouse] = useState([]);
  // console.log("mappedWarehouse=>", mappedWarehouse)

  const pageCount = new URLSearchParams(window.location.search).get("page");

  const handlePageChange = (pageNumber) => {
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("page", pageNumber);
    history.push(window.location.pathname + "?" + currentUrlParams.toString());
    dispatch(customerBookingAuth(pageNumber));
  };

  useEffect(() => {
    dispatch(customerBookingAuth(parseInt(pageCount)));
    dispatch(fetchMappedWarehouse(setMappedWarehouse));

    return () => {
      dispatch(bookingList([]));
    };
  }, [dispatch, pageCount]);

  function getBooking() {
    console.log("bookingList=>", data.bookingList);
    console.log("mappedWarehouse=>", mappedWarehouse);

    if (mappedWarehouse?.length > 0) {
      return mappedWarehouse;
    }

    return data.bookingList;
  }
  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });

  return (
    <Layout>
      <CustomerLayout title="My Bookings">
        <div className="row">
          <div className="content col-12  booking-details">
            <div className="border-bottom d-sm-flex justify-content-between fixed-top-height">
              <span className="btn px-0 text-dark font-weight-bold mr-3">
                <i
                  onClick={() => history.goBack()}
                  className="fas fa-chevron-left pr-3"
                ></i>
                My Bookings
              </span>
            </div>

            {data.isLoading ? (
              <CardLoader />
            ) : (
              <>
                <div className="row p-3">
                  <div className="col-12 border table-responsive table-dashboard px-0">
                    {getBooking() && getBooking().length > 0 ? (
                      <table className="table">
                        <thead>
                          <tr className="theader">
                            <th>Image</th>
                            <th className="w-130px">Date</th>
                            <th className="w-150px text-nowrap">Warehouse ID</th>
                            <th>Category</th>
                            <th>Type</th>
                            <th>View</th>
                            <th>Status</th>
                            <th>Review</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getBooking().map((booking, index) => {
                            return (
                              <BookingList
                                key={index}
                                index={index}
                                booking={booking}
                              />
                            );
                          })}
                        </tbody>
                      </table>
                    ) : (
                      <ItemNotFlund mtop="mt-5" message="No Data Available" />
                    )}
                  </div>
                </div>

                <div className="pagination-custom">
                  {data.bookingList.data &&
                    data.bookingList.data !== undefined && (
                      <Pagination
                        activePage={parseInt(pageCount)}
                        itemsCountPerPage={10}
                        totalItemsCount={data.bookingList.totalCount}
                        pageRangeDisplayed={5}
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

export default Booking;
