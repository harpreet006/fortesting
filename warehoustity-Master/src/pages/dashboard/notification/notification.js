import React, { useEffect } from "react";
import Layout from "../../../layout/Layout";
import NotificationList from "../../../components/dashboard/NotificationList";
import CustomerLayout from "../../../layout/CustomerLayout";
import { notificationByPage } from "../../../store/actions/notificationAction";
import { useSelector, useDispatch } from "react-redux";
import {
  CardLoader,
  ItemNotFlund,
} from "../../../components/helper/CustomLoader";
import { useHistory } from "react-router-dom";
import Pagination from "react-js-pagination";

const Notification = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.NOTIFICATIONINFO);
  const pageCount = new URLSearchParams(window.location.search).get("page");
  const history = useHistory();

  const handlePageChange = (pageNumber) => {
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("page", pageNumber);
    history.push(window.location.pathname + "?" + currentUrlParams.toString());
    dispatch(notificationByPage(pageNumber));
  };

  useEffect(() => {
    dispatch(notificationByPage(parseInt(pageCount)));
  }, [pageCount, dispatch]);
  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });
  return (
    <Layout>
      <CustomerLayout title={`Notification`}>
        <div className="row">
          <div className="content col-12 view-notification">
            <div className="border-bottom mb-2 d-sm-flex justify-content-between">
              <div>
                <p className="text-dark backButton font-weight-bold mr-3 my-0 py-2">
                  <i
                    onClick={() => history.goBack()}
                    className="fas fa-chevron-left pr-3"
                  ></i>
                  Notification
                </p>
              </div>
            </div>

            {data.isLoading ? (
              <CardLoader />
            ) : (
              <div className="row py-2 w-100">
                <div className="col-12  table-responsive table-dashboard ">
                  {data.notificationList.data &&
                  data.notificationList.data.length > 0 ? (
                    <table className="table border bg-white">
                      <thead className="theader">
                        <tr>
                          <th>Sr.No.</th>
                          <th className="w-160px">Subject</th>
                          <th>Message</th>
                          <th className="w-130px">Date</th>
                          <th>View</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.notificationList.data.map(
                          (notification, index) => {
                            return (
                              <NotificationList
                                index={
                                  ((parseInt(pageCount)
                                    ? parseInt(pageCount)
                                    : 1) -
                                    1) *
                                    10 +
                                  (index + 1)
                                }
                                key={index}
                                notification={notification}
                              />
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  ) : (
                    <ItemNotFlund mtop="mt-5" message="No Data Available" />
                  )}

                  <div className="pagination-custom">
                    {data.notificationList.totalCount > 10 && (
                      <Pagination
                        activePage={parseInt(pageCount)}
                        itemsCountPerPage={10}
                        totalItemsCount={data.notificationList.totalCount}
                        pageRangeDisplayed={1}
                        onChange={handlePageChange}
                        prevPageText={<i className="fas fa-chevron-left" />}
                        nextPageText={<i className="fas fa-chevron-right" />}
                        hideFirstLastPages={true}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CustomerLayout>
    </Layout>
  );
};

export default Notification;
