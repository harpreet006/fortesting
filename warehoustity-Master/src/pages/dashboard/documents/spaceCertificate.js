import React, { useEffect } from 'react'
import Layout from '../../../layout/Layout';
import BrowserTitle from '../../../components/helper/BrowserTitle';
import CustomerLayout from '../../../layout/CustomerLayout';
import { bookingByPage } from '../../../store/actions/customer/documentAction'
import { useSelector, useDispatch } from 'react-redux';
import SpaceCertificateList from '../../../components/dashboard/SpaceCertificateList';
import { useHistory } from "react-router-dom";

const SpaceCertificate = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.CUSTOMER_DOCUMENT);

  useEffect(() => {
    dispatch(bookingByPage())
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
            <div className="pb-2 border-bottom d-sm-flex justify-content-between">
              <div>
                <p className="btn name-breadcrumb px-0 text-dark font-heading mr-3 py-0 my-0">
                <i
                    onClick={() => history.goBack()}
                    className="fas fa-chevron-left pr-3"
                  ></i>
                  Space Certificate</p>
              </div>
            </div>


            {data && data.documentList.data && data.documentList.data.length > 0 ?

              data.documentList.data.map((val, index) => {

                return (
                  <SpaceCertificateList docType="space_certificate" userType="customer" val={val} srn={index} key={index} docFile="/assets/documents/Space Certificate - Customer.docx" />
                )
              }
              )

              : null}

          </div>
        </div>
      </CustomerLayout>
    </Layout>
  )
}

export default SpaceCertificate;