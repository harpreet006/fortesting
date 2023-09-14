import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import VendorLayout from '../../../layout/VendorLayout';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getBookingById, booking_By_Id, updateBookingStatus, responseBooking } from '../../../store/actions/customer/bookingAction';
import { readableDate } from '../../../components/validation';
import FormSuccess from '../../../components/helper/FormSuccess';
import Spinner from 'react-bootstrap/Spinner';
import { CardLoader } from '../../../components/helper/CustomLoader';

const BookingDetail = () => {
  const history = useHistory();
  const { bookingId } = useParams();
  const dispatch = useDispatch()
  const data = useSelector((state) => state.BOOKINGINFO);
  const read = useSelector((state) => state.SIDEMENU_INFO.read_only);
  const status = new URLSearchParams(window.location.search).get('status');

  useEffect(() => {
    dispatch(getBookingById(bookingId))
    return () => {
      dispatch(booking_By_Id([]))
    }
  }, [dispatch, bookingId]);

  const changeStatus = (vendorStatus) => {
    let d = { vendorStatus: vendorStatus }
    dispatch(updateBookingStatus(bookingId, d))
  }


  const redirect = () => {
    dispatch(responseBooking(null))

    if (status === "CONFIRMED") {
      history.replace(`/vendor/booking-confirm?page=1`)
    }
    if (status === "CANCELLED") {
      history.replace(`/vendor/booking-cancel?page=1`)
    }
    if (status === "ALL") {
      history.replace(`/vendor/booking?page=1`)
    }
    if (status === "PENDING") {
      history.replace(`/vendor/booking-pending?page=1`)
    }
  }

  return (
    <VendorLayout>

      {data.bookingResponse && data.bookingResponse.statusCode === 200 ?
        <FormSuccess onClick={redirect} message={data.bookingResponse.message} />
        : null}

      <div className="content-admin px-1">
        <div className="row justify-content-end align-items-center py-3 px-3 mx-0">
          <div className="col-12 px-0">
            <h5 className="backButton text-dark"><i onClick={() => history.goBack()} className="fas fa-chevron-left mr-3 cursorPointer"></i>BOOKING DETAILS</h5>
          </div>

          {data.isLoading ? <CardLoader /> :
            <div className="bg-white p-3">
            <div className="col-12 px-0">
              <div className="row">
                <div className="col-md-6 d-flex py-2">
                  <div className="card py-1 px-4 mb-0">
                    <p className="mb-2">Booking ID</p>
                    <p className="text-gray mb-0">{data.bookingDetail.id} </p>
                  </div>
                </div>
                <div className="col-md-6 d-flex py-2">
                  <div className="card py-1 px-4 mb-0">
                    <p className="mb-2">Booking Date</p>
                    <p className="text-gray mb-0">{readableDate(data.bookingDetail.created_at)} </p>
                  </div>
                </div>
                <div className="col-md-6 d-flex py-2">
                  <div className="card py-1 px-4 mb-0">
                    <p className="mb-2">Customer Name</p>
                    <p className="text-gray mb-0">{data.bookingDetail.customer?.firstName + " " + data.bookingDetail.customer?.lastName} </p>
                  </div>
                </div>
                <div className="col-md-6 d-flex py-2">
                  <div className="card py-1 px-4 mb-0">
                    <p className="mb-2">Company Name</p>
                    <p className="text-gray mb-0">{data.bookingDetail.customer?.companyName}</p>
                  </div>
                </div>
                <div className="col-md-6 d-flex py-2">
                  <div className="card py-1 px-4 mb-0">
                    <p className="mb-2">Customer Email ID</p>
                    <p className="text-gray mb-0">{data.bookingDetail.customer?.email}</p>
                  </div>
                </div>
                <div className="col-md-6 d-flex py-2">
                  <div className="card py-1 px-4 mb-0">
                    <p className="mb-2">Warehouse ID</p>
                    <p className="text-gray mb-0">{data.bookingDetail.warehouse?.warehouseId}  </p>
                  </div>
                </div>
                <div className="col-md-6 d-flex py-2">
                  <div className="card py-1 px-4 mb-0">
                    <p className="mb-2">Status</p>
                    <p className="text-gray mb-0">{data.bookingDetail.vendorStatus} </p>
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-12 px-0 text-sm-right">
                  <Link to={"/vendor/booking"} className="btn btn-outline-deep-blue m-3 px-5">Back</Link>


                  <button
                    onClick={() => changeStatus("CONFIRMED")}
                    type="button"
                    disabled={data.isPending}
                    class={`btn btn-deep-blue m-3 ${!read ? "" : "d-none"} ${(status === "ALL" || status === "CONFIRMED") && data.bookingDetail.vendorStatus === "CONFIRMED" ? "d-none" : ""}`}
                  >
                    Confirm {data.isPending ? <Spinner animation="border" /> : null}
                  </button>


                  <button
                    onClick={() => changeStatus("CANCELLED")}
                    type="button"
                    class={`btn btn-deep-primary m-3 px-5 ${!read ? "" : "d-none"} ${(status === "ALL" || status === "CANCELLED") && data.bookingDetail.vendorStatus === "CANCELLED" ? "d-none" : ""}`}
                    disabled={data.isPending}
                  >
                    Cancel {data.isPending ? <Spinner animation="border" /> : null}
                  </button>

                </div>
              </div>
            </div>
            </div>
          }

        </div>
      </div>

    </VendorLayout>

  )
}

export default BookingDetail;