import React, { useEffect } from 'react'
import Layout from '../../layout/Layout';
import { Link, useParams } from 'react-router-dom';
import CustomerLayout from '../../layout/CustomerLayout';
import MisReportList from '../../components/dashboard/MisReportList';
import { misBookingByBookingId } from '../../store/actions/misAction';
import { useDispatch, useSelector } from 'react-redux';

const MisListPage = () => {
  const { misId, warehouseId } = useParams()
  const dispatch = useDispatch();
  const items = useSelector((state) => state.MIS_INFO)

  useEffect(() => {
    dispatch(misBookingByBookingId(misId))
  }, [dispatch, misId])

  return (
    <Layout>
      <CustomerLayout title="MIS">
        <div className="row">
          <div className="content col-12 download-report">
            <div className="border-bottom d-sm-flex justify-content-between">
              <div>
                <Link to="#" className="btn name-breadcrumb px-0 text-dark font-heading mr-3 text-uppercase">MIS Report List</Link>
              </div>
            </div>
            <div className="row">
              <div className="col-12 border table-responsive table-dashboard p-0">
                <table className="table">
                  <thead>
                    <tr>
                      <th>S. No.</th>
                      <th>Report ID</th>
                      <th>Date</th>
                      <th>Warehouse ID</th>
                      <th className="text-center">View details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items?.misBookingDetail?.reports && items?.misBookingDetail?.reports.length > 0 ?
                      items?.misBookingDetail?.reports.map((item, index) => <MisReportList warehouseId={warehouseId} item={item} index={index} />)
                      : null}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </CustomerLayout>
    </Layout>
  )
}

export default MisListPage
