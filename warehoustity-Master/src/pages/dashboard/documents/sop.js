import React, { useEffect } from 'react'
import Layout from '../../../layout/Layout';
// import CertificateList from '../../../components/dashboard/CertificateList';
import BrowserTitle from '../../../components/helper/BrowserTitle';
import CustomerLayout from '../../../layout/CustomerLayout';
import { bookingByPage } from '../../../store/actions/customer/documentAction'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DocList from './DocList';
import { ItemNotFlund } from '../../../components/helper/CustomLoader';

const SOP = () => {

  const history  = useHistory()
  const dispatch = useDispatch();
  const data = useSelector((state) => state.CUSTOMER_DOCUMENT);

  useEffect(() => {
    dispatch(bookingByPage("sop_certificate"))
    // dispatch(getAllDocument("customer", 1, "sop_certificate"));
  }, [dispatch]);

  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });

  return (
    <Layout>
      <BrowserTitle title="Documents" />
      <CustomerLayout title="Documents">
        <div className="row">
          <div className="content col-12 download-certificate">
            <div className="border-bottom d-sm-flex justify-content-between">
              <div>
                <p className="btn name-breadcrumb px-0 text-dark font-heading mr-3 my-0">
                <i
                    onClick={() => history.goBack()}
                    className="fas fa-chevron-left pr-3"
                  ></i>
                  SOP</p>
              </div>
            </div>

            {/* {data && data.documentList.data && data.documentList.data.length > 0 ?

              data.documentList.data.map((val, index) =>
                <CertificateList docType="sop_certificate" userType="customer" val={val} srn={index} key={index} docFile="/assets/documents/Customer_Warehousity_Agreement Offline - 04Feb20 V1.doc" />
              )
              : null} */}

            <div className="row">
              <div className="col-12 table-responsive table-dashboard p-3">
                {data &&
                  data.documentList.data &&
                  data.documentList.data.length > 0 ? (
                  <table className="table text-center table-dark-custom bg-white">
                    <thead>
                      <tr>
                        <th>Warehouse Id</th>
                        <th>Sample Certificate</th>
                        <th>Signed Certificate</th>
                        <th>Signed Certificate from Warehousity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.documentList.data.map((val, index) => (
                        <DocList
                          key={index}
                          docType="sop_certificate"
                          userType="customer"
                          val={val}
                        />
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <ItemNotFlund mtop="mt-5" message="No Data Available" />
                )}
              </div>
            </div>

          </div>
        </div>
      </CustomerLayout>

    </Layout>
  )
}

export default SOP;