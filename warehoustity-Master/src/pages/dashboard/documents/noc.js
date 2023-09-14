import React, { useEffect } from 'react'
import Layout from '../../../layout/Layout';
import { useHistory } from 'react-router-dom';
// import CertificateList from '../../../components/dashboard/CertificateList';
import BrowserTitle from '../../../components/helper/BrowserTitle';
import CustomerLayout from '../../../layout/CustomerLayout';
import { bookingByPage } from '../../../store/actions/customer/documentAction'
import { useSelector, useDispatch } from 'react-redux';
import DocList from './DocList';
import { ItemNotFlund } from '../../../components/helper/CustomLoader';

const NOC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.CUSTOMER_DOCUMENT);

  useEffect(() => {
    dispatch(bookingByPage("noc_certificate"))
    // dispatch(getAllDocument("customer", 1, "noc_certificate"));
  }, [dispatch]);

  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });

  return (
    <Layout>
      <BrowserTitle title="Documents" />
      <CustomerLayout title="Documents" >
        <div className="row">
          <div className="content col-12 download-certificate">
            <div className="border-bottom d-sm-flex justify-content-between">
              <div>
                <button className="btn name-breadcrumb px-0 text-dark font-heading mr-3">
                <i
                    onClick={() => history.goBack()}
                    className="fas fa-chevron-left pr-3"
                  ></i>
                   NOC</button>
              </div>
            </div>

            {/* {data && data.documentList.data && data.documentList.data.length > 0 ?

              data.documentList.data.map((val, index) =>
                <CertificateList docType="noc_certificate" userType="customer" val={val} srn={index} key={index} docFile="/assets/documents/Customer_Warehousity_Agreement Offline - 04Feb20 V1.doc" />
              )
              : null} */}


            <div className="row py-3">
              <div className="col-12  table-responsive table-dashboard">
                {data &&
                  data.documentList.data &&
                  data.documentList.data.length > 0 ? (
                  <table className="table text-center border">
                    <thead className='bg-dark '>
                      <tr>
                        <th className='text-white'>Warehouse Id</th>
                        <th className='text-white'>Sample Certificate</th>
                        <th className='text-white'>Signed Certificate</th>
                        <th className='text-white'>Signed Certificate from Warehousity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.documentList.data.map((val, index) => (
                        <DocList
                          key={index}
                          docType="noc_certificate"
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

export default NOC;