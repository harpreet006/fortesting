import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { useHistory } from "react-router-dom";
import CustomerLayout from "../../layout/CustomerLayout";
import BrowserTitle from "../../components/helper/BrowserTitle";
import { fetchFeedback } from "../../store/actions/feedbackAction";
import { useDispatch } from "react-redux";
import { ItemNotFlund } from "../../components/helper/CustomLoader";
import { Link } from "react-router-dom";

const WhFeedback = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    dispatch(fetchFeedback(setFeedback));
  }, [dispatch]);
  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });
  return (
    <Layout>
      <BrowserTitle title="Enquiry" />
      <CustomerLayout title="Manage Enquiry">
        <div className="row mb-3">
          <div className="content col-12  view-enquiry-details">
            <div className="border-bottom d-sm-flex justify-content-between fixed-top-height">
              <div>
                <button className="btn px-0 text-dark font-weight-bold mr-3">
                  <i
                    onClick={() => history.goBack()}
                    className="fas fa-chevron-left pr-3"
                  ></i>
                  Feedback
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col-12 table-responsive table-dashboard p-3">
                {feedback && feedback?.data?.length > 0 ? (
                  <table className="table">
                    <thead>
                      <tr className="theader">
                        <th>S. No</th>
                        <th>User Name</th>
                        <th>Warehouse ID</th>
                        <th>Warehouse Name</th>
                        <th>Feedback</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feedback?.data?.map((feed, index) => {
                        return (
                          <tr
                          key={index}
                            className={`${
                              index % 2 !== 0 ? "firstRow" : "secondRow"
                            }`}
                          >
                            <td>{index+1}</td>
                            <td>
                              {feed?.user?.firstName +
                                " " +
                                feed?.user?.lastName}
                            </td>
                            <td>{feed?.warehouse?.warehouseId}</td>
                            <td>{feed?.warehouse?.warehouseName}</td>
                            <td>{feed?.feedbackText}</td>
                            <td>
                              <Link to={`/wh-feedback/${feed.id}`}>
                                <button className="btn p-0 btn-line-black mb-2">
                                  <i className="fas fa-eye"></i>
                                </button>
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <ItemNotFlund message="No Data Available" />
                )}
              </div>
            </div>
          </div>
        </div>
      </CustomerLayout>
    </Layout>
  );
};

export default WhFeedback;
