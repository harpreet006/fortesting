import React, { useEffect } from 'react';
import Layout from '../../../layout/Layout';
import { useLocation } from 'react-router-dom';
import CreateRFQ from '../../../wrapper/customer/rfq/CreateRFQ';
import CustomerLayout from '../../../layout/CustomerLayout';
import BrowserTitle from '../../../components/helper/BrowserTitle';
import { useHistory } from 'react-router-dom';
import { confirmAlert } from "react-confirm-alert";
import { useSelector } from 'react-redux';

const CreateNewRfq = () => {
  const history = useHistory();
  // const dispatch = useDispatch();
  // const rfqid = new URLSearchParams(window.location.search).get('rfqid');
  const rfqData = useSelector((state) => state.CUSTOMER_RFQ_INFO);
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });

  let message = "Are you sure?, You leave the page"

  const backButton = () => {

    confirmAlert({
      // title: 'Confirm to submit',  
      message: message,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            if (rfqData.rfqInitialDetail.isRfq) {
              // rfqDelete()
              history.push('/managerfq?page=1')
            } else {
              history.push('/managerfq?page=1')
            }
          },
        },
        {
          label: "No",
          onClick: () => console.log("Cancel"),
        },
      ],
    });
  }



  return (
    <Layout>
      <BrowserTitle title="RFQ" />
      <CustomerLayout title="RFQ">
        <div className="row">
          <div className="content col-12 shadow-sm">
            <div className="border-bottom mb-3">
              <button className="btn name-breadcrumb px-0 text-dark font-heading mr-3">
                <i
                  onClick={backButton}
                  className="fas fa-chevron-left mr-1 cursorPointer"
                ></i>
                UPDATE ENQUIRY/RFQ</button>
            </div>
            <CreateRFQ />
          </div>
        </div>
      </CustomerLayout>
    </Layout>
  )
}

export default CreateNewRfq;