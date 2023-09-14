import React, { useEffect } from 'react'
import Layout from '../../../layout/Layout';
import { useParams, useHistory } from 'react-router-dom';
import CustomerLayout from '../../../layout/CustomerLayout';
// import {myWarehouseById} from '../../../store/actions/customer/myWarehouseAction';
import { customerBookingById } from '../../../store/actions/customer/bookingAction'
import { useSelector, useDispatch } from 'react-redux';
import { readableDate } from '../../../components/validation'
import { CardLoader } from '../../../components/helper/CustomLoader';

const MyWarehouseDetails = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  // const data = useSelector((state)=>state.MYWAREHOUSEINFO);
  const data = useSelector((state) => state.BOOKINGINFO);
  const { mywarehouseId } = useParams()

  // useEffect(() => {
  //   dispatch(myWarehouseById(mywarehouseId))
  // }, [dispatch, mywarehouseId]);

  useEffect(() => {
    dispatch(customerBookingById(mywarehouseId))
  }, [dispatch, mywarehouseId]);
  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });
  return (
    <Layout>

      <CustomerLayout title={'My Warehouse'} >
        <div className="row">
          <div className="content col-12 booking-details">
            <div className="border-bottom mb-3">
              <button className="btn name-breadcrumb px-0 text-dark font-heading mr-3 toggle-class"><i onClick={() => history.goBack()} className="fas fa-chevron-left pr-3"></i> Booking Detail </button>
            </div>
            <div className="row mx-0">
              <div className="col-12">


                {data.isLoading ?
                  <CardLoader />
                  :
                  <div className="row">
                    <div className="card">
                      <div className="img-holder">
                        <img className="img-fluid w-100 border-rounded" src={data.bookingDetail.warehouse?.warehouseImagesInfo?.coverImage.url} alt="warehouse" style={{ height: "270px" }} />
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-lg-6">
                            <h5 className="mb-3">Warehouse ID:- <span className="font-weight-light">{data.bookingDetail.warehouse?.id}</span></h5>
                            <h6 className="mb-2">Space : <span className="font-weight-light">{data.bookingDetail.customerRfq?.warehouseSpaceRequired} sq Feet</span></h6>
                            <h6 className="mb-2">Location: <span className="font-weight-light">{data.bookingDetail.warehouse?.warehouseContactDetailInfo?.address?.district + ", " + data.bookingDetail.warehouse?.warehouseContactDetailInfo?.address?.state}</span></h6>
                            <h6 className="mb-2">Cost : <span className="font-weight-light">Rs. {data.bookingDetail?.customerRfq?.vendorResponseRfq && data.bookingDetail?.customerRfq?.vendorResponseRfq.length > 0 && data.bookingDetail?.customerRfq?.vendorResponseRfq[0].customerResponseRfq && data.bookingDetail?.customerRfq?.vendorResponseRfq[0].customerResponseRfq.length > 0 ? data.bookingDetail?.customerRfq?.vendorResponseRfq[0].customerResponseRfq[0].adminTotalPerUnitCost : null}</span></h6>
                          </div>
                          <div className="col-lg-6 text-lg-right">
                            <h6 className="mb-3">Date: <span className="font-weight-light">{readableDate(data.bookingDetail.created_at)}</span></h6>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <button onClick={() => history.goBack()} className="btn btn-outline-deep-primary px-5 mr-3 my-2 py-1">Back</button>
                      </div>
                    </div>
                  </div>


                }

              </div>
            </div>
          </div>

        </div>
      </CustomerLayout>
    </Layout>
  )
}

export default MyWarehouseDetails
