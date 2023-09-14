import React, { useEffect } from 'react';
import Layout from '../../../layout/Layout';
import CustomerLayout from '../../../layout/CustomerLayout';
import BrowserTitle from '../../../components/helper/BrowserTitle';
import { openRfqByPage } from '../../../store/actions/customer/rfqAction';
import { useSelector, useDispatch } from 'react-redux';
import { CardLoader, ItemNotFlund } from '../../../components/helper/CustomLoader';
import { useParams, useHistory } from 'react-router-dom';
import RfqManageRow from '../../../wrapper/customer/rfq/RfqManageRow';

const RfqManageOpenList = () => {
  const { rfqId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const data = useSelector((state) => state.CUSTOMER_RFQ_INFO);

  useEffect(() => {
    dispatch(openRfqByPage(rfqId))
  }, [dispatch, rfqId]);

  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });

  return (
    <Layout>
      <BrowserTitle title="RFQ" />


      <CustomerLayout title={`RFQ`}>
        <div className="row">
          <div className="content col-12">
            <div className="border-bottom d-sm-flex justify-content-between">
              <div>
                <span
                  className="btn name-breadcrumb px-0 text-dark font-heading mr-3 mb-2 text-uppercase">
                  <i
                    onClick={() => history.goBack()}
                    className="fas fa-chevron-left pr-3"
                  ></i>
                  Manage Open RFQ (RFQ ID : {rfqId})
                </span>
              </div>
            </div>

            {data.isLoading ?
              <CardLoader />
              :
              <>
                <div className="row">
                  <div className="col-12 border px-0 table-responsive table-dashboard">
                    {data.rfqList.data && data.rfqList.data.length > 0 ?
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
                          {data.rfqList.data.map((item, index) =>
                            <RfqManageRow item={item} index={index} rfqId={rfqId} isOpen={true} key={index} />
                          )
                          }
                        </tbody>
                      </table>
                      :
                      <ItemNotFlund mtop="mt-5" message={`RFQ Not Found`} />
                    }

                  </div>
                </div>

              </>
            }
          </div>

        </div>
      </CustomerLayout>
    </Layout>
  );
}

export default RfqManageOpenList;
