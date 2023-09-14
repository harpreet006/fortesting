import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import BrowserTitle from "../../components/helper/BrowserTitle";
import CustomerLayout from "../../layout/CustomerLayout";
import { useHistory, useParams } from "react-router-dom";

import { fetchFeedbackById } from "../../store/actions/feedbackAction";
import { useDispatch } from "react-redux";

const WhFeedbackDetails = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { feedbackId } = useParams();
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    dispatch(fetchFeedbackById(feedbackId, setFeedback));
  }, [dispatch, feedbackId]);
  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });

  return (
    <Layout>
      <BrowserTitle title="Feedback" />
      <CustomerLayout title="Feedback">
        <div className="content col-12 view-users-details">
          <div className="border-bottom d-sm-flex justify-content-between">
            <div>
              <button className="btn name-breadcrumb px-0 text-dark font-heading mr-3 toggle-class">
                <i
                  onClick={() => history.goBack()}
                  className="fas fa-chevron-left pr-3"
                ></i>
                Feedback View Details{" "}
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {feedback ? (
                <div className="row">
                  <div className="col-md-6 d-flex py-1">
                    <div className="card py-2 px-3 mb-0">
                      <p className="mb-2">User Name</p>
                      <p className="text-gray mb-0">
                        {feedback?.data?.user?.firstName +
                          " " +
                          feedback?.data?.user?.lastName}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex py-1">
                    <div className="card py-2 px-3 mb-0">
                      <p className="mb-2">Warehouse ID</p>
                      <p className="text-gray mb-0">
                        {feedback?.data?.warehouse?.warehouseId}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex py-1">
                    <div className="card py-2 px-3 mb-0">
                      <p className="mb-2">Warehouse Name</p>
                      <p className="text-gray mb-0">
                        {feedback?.data?.warehouse?.warehouseName}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex py-1">
                    <div className="card py-2 px-3 mb-0">
                      <p className="mb-2">Feedback</p>
                      <p className="text-gray mb-0">
                        {feedback?.data?.feedbackText}
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="col-12 text-end">
              <button
                onClick={() => history.goBack()}
                className="btn btn-deep-primary my-4 py-1 px-5"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </CustomerLayout>
    </Layout>
  );
};

export default WhFeedbackDetails;
