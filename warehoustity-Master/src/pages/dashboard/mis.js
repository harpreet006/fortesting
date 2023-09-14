import React, { useEffect } from 'react'
import Layout from '../../layout/Layout';
import { useHistory } from 'react-router-dom';
import MisList from '../../components/dashboard/MisList';
import CustomerLayout from '../../layout/CustomerLayout';
import { misByPage } from '../../store/actions/misAction';
import { useDispatch, useSelector } from 'react-redux';
import { ItemNotFlund } from '../../components/helper/CustomLoader';

const Mis = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.MIS_INFO)

  useEffect(() => {
    dispatch(misByPage(1))
  }, [dispatch])

  return (
    <Layout>
      <CustomerLayout title="MIS">
        <div className="row">
          <div className="content col-12 download-report">
            <div className="border-bottom d-sm-flex justify-content-between fixed-top-height">
              <div>
                <button
                  className="btn px-0 text-gray font-weight-bold mr-3 text-uppercase">
                  <i
                    onClick={() => history.goBack()}
                    className="fas fa-chevron-left pr-3"
                  ></i>
                  MIS
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-12 border table-responsive table-dashboard px-0">
                {items?.misList?.data && items?.misList?.data.length > 0 ?
                  <table className="table">
                    <thead>
                      <tr>
                        <th>S. No.</th>
                        <th>Booking ID</th>
                        <th>WAREHOSUE ID</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items?.misList?.data.map((item, index) => {
                        return (
                          <MisList key={index} item={item} index={index} />
                        )
                      })
                      }
                    </tbody>
                  </table>
                  :
                  <ItemNotFlund message="No Data Available" />
                }
              </div>
            </div>
          </div>
        </div>
      </CustomerLayout>
    </Layout>
  )
}

export default Mis;