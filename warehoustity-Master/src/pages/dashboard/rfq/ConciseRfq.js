import React, { useEffect } from "react";
import Layout from "../../../layout/Layout";
import CustomerLayout from "../../../layout/CustomerLayout";
import BrowserTitle from "../../../components/helper/BrowserTitle";
import ConciseFrqForm from "../../../wrapper/customer/rfq/customerRFQFormView/ConciseFrqForm";
import { useParams, useLocation } from "react-router";
import CreateRFQ from "../../../wrapper/customer/rfq/CreateRFQ";

const ConciseRfq = () => {
  // const { rfqId } = useParams();
  
  const location = useLocation();
  console.log("useParams",location);

  const query = new URLSearchParams(location.search)

  console.log("query",query)

  const rfqId = query.get('rfqid');
  console.log("rfqid",rfqId)
  // const cId = query.get('cId')

  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });

  return (
    <Layout>
      <BrowserTitle title="RFQ" />
      <CustomerLayout title="RFQ">
        <div className="row">
          <div className="content col-12 shadow-sm">
            <div className="border-bottom mb-3">
              <button className="btn name-breadcrumb px-0 text-dark font-heading mr-3">
                <i className="fas fa-chevron-left mr-1 cursorPointer"></i>
                UPDATE ENQUIRY/RFQ
              </button>
            </div>
            <ConciseFrqForm rfqId={rfqId} />
          </div>

          <div className="mt-3">
            <CreateRFQ/>
          </div>

        </div>
      </CustomerLayout>
    </Layout>
  );
};

export default ConciseRfq;
