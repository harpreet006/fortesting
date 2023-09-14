import React, { useEffect } from 'react';
import Layout from '../../../layout/Layout';
import CustomerLayout from '../../../layout/CustomerLayout';
import BrowserTitle from '../../../components/helper/BrowserTitle';
import { statusRfqById } from '../../../store/actions/customer/rfqAction';
import { useSelector, useDispatch } from 'react-redux';
import { CardLoader, ItemNotFlund } from '../../../components/helper/CustomLoader';
import { useParams, useHistory } from 'react-router-dom';
import RfqManageRow from '../../../wrapper/customer/rfq/RfqManageRow';

const ManageRfqList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { rfqId } = useParams();
  const data = useSelector((state) => state.CUSTOMER_RFQ_INFO);

  console.log("rfqid",rfqId)

  // useEffect(() => {
    
  //   dispatch(statusRfqById(rfqId))
  // }, [dispatch, rfqId]);

  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });
  return (
    <Layout>
      <BrowserTitle title="RFQ" />

      <CustomerLayout title={`RFQ`}>
        <div className="row">
          <div className="content col-12">
            <div className='bg-white'>
            <div className="border-bottom d-sm-flex justify-content-between py-4 my-3">
              <div>
                <span
                  className="btn name-breadcrumb px-0 text-dark font-heading mr-3 mb-2 text-uppercase">
                  <i
                    onClick={() => history.goBack()}
                    className="fas fa-chevron-left pr-3"
                  ></i>
                  Manage RFQ (RFQ ID : {rfqId})
                </span>
              </div>
            </div>

            {data.isLoading ?
              <CardLoader />
              :
              <>

                <div className="row">
                  <div className="col-12 pb-4 table-responsive table-dashboard">
                    {data.rfqDetail?.warehouses && data.rfqDetail?.warehouses.length > 0 ?
                      <table className="table">
                        <thead>
                          <tr>
                            <th className="w-100px">S. No</th>
                            <th>WH ID</th>
                            <th>Created On</th>
                            <th className="text-center">View RFQ Detail</th>
                          </tr>
                        </thead>
                        <tbody>

                          {data.rfqDetail?.warehouses.map((item, index) =>
                            <RfqManageRow item={item} index={index} rfqId={rfqId} isOpen={false} key={index} />
                          )}

                        </tbody>
                      </table>
                      :
                      <ItemNotFlund message={`RFQ Not Found`} />
                    }

                  </div>
                </div>

              </>
            }
            </div>
          </div>

        </div>
      </CustomerLayout>
    </Layout>
  );
}

export default ManageRfqList;
