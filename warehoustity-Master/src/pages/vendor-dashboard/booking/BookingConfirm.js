import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import BookingList from '../../../wrapper/vendor/BookingList';
import MenuDrawer from '../../../components/vendor/MenuDrawer';
import VendorLayout from '../../../layout/VendorLayout';
import Pagination from "react-js-pagination";
import { useSelector, useDispatch } from 'react-redux';
import { vendorBookingAuth } from '../../../store/actions/customer/bookingAction';
import { CardLoader, ItemNotFlund } from '../../../components/helper/CustomLoader';
import SearchBoxVendor from '../../../components/helper/SearchBoxVendor';

const BookingConfirm = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const data = useSelector((state) => state.BOOKINGINFO);
  const pageCount = new URLSearchParams(window.location.search).get('page');

  useEffect(() => {
    dispatch(vendorBookingAuth(parseInt(pageCount), "CONFIRMED"))
  }, [dispatch, pageCount]);


  const handlePageChange = (pageNumber) => {
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set('page', pageNumber);
    history.push(window.location.pathname + "?" + currentUrlParams.toString());
    dispatch(vendorBookingAuth(pageNumber, "CONFIRMED"))
  };

  return (
    <VendorLayout>
      <div className="content-admin px-1">

        <div className="row justify-content-end align-items-center px-4 mx-0">

          <MenuDrawer />
          <SearchBoxVendor />

          <div className="col-12 bg-white custom-shadow p-1 mb-1  tabs-scroll">
            <ul className="nav nav-pills admin-tabs-blue" id="pills-tab" role="tablist">
              <li className="nav-item">
                <Link to="/vendor/booking?page=1" className="nav-link">All</Link>
              </li>
              <li className="nav-item">
                <Link to="/vendor/booking-pending?page=1" className="nav-link">Pending</Link>
              </li>
              <li className="nav-item">
                <Link to="/vendor/booking-confirm?page=1" className="nav-link vendorActive text-uppercase">Confirmed</Link>
              </li>
              <li className="nav-item">
                <Link to="/vendor/booking-cancel?page=1" className="nav-link text-uppercase">Cancelled</Link>
              </li>
            </ul>
          </div>

          {data.isLoading ? <CardLoader /> :
            <div className="col-12 px-1">
              <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-all" role="tabpanel" aria-labelledby="pills-all-tab">
                  <div className="row justify-content-end align-items-center pb-1 mx-0">
                    <div className="col-12 px-0 bg-white p-3">
                      <div className="row">
                        <div className="col-12 table-responsive table-gray-admin">
                          {data.bookingList.data && data.bookingList.data.length > 0 ?
                            <table className="table listTable">
                              <thead>
                                <tr>
                                  <th className="w-100px bg-dark text-white px-2">S.No</th>
                                  <th className="text-nowrap bg-dark text-white px-2">Booking ID</th>
                                  <th className='bg-dark text-white px-2'>Date</th>
                                  <th className="text-nowrap bg-dark text-white px-2">Warehosue ID</th>
                                  <th className='bg-dark text-white px-2'>Category</th>
                                  <th className='bg-dark text-white px-2'>Status</th>
                                  <th className="text-center bg-dark text-white px-2">View</th>
                                </tr>
                              </thead>
                              <tbody>

                                {data.bookingList.data.map((item, index) => {
                                  return (<BookingList item={item} status="CONFIRMED" index={index + 1} key={index} />)
                                })}

                              </tbody>
                            </table>
                            :
                            <ItemNotFlund message="No Data Available" />
                          }
                        </div>
                      </div>
                    </div>
                    <div className='text-center'>
                    <div className="pagination-custom">
                        <Pagination
                          activePage={parseInt(pageCount)}
                          itemsCountPerPage={10}
                          totalItemsCount={data.bookingList?.totalCount}
                          pageRangeDisplayed={1}
                          onChange={handlePageChange}
                          prevPageText={<i className="fas fa-chevron-left" />}
                          nextPageText={<i className="fas fa-chevron-right" />}
                          hideFirstLastPages={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }

        </div>
      </div>
    </VendorLayout>
  );
}

export default BookingConfirm;
