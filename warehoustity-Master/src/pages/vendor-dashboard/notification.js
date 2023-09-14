import React, { useEffect } from "react";
import NotificationList from "../../wrapper/vendor/NotificationList";
import VendorLayout from "../../layout/VendorLayout";
import { notificationByPage } from "../../store/actions/notificationAction";
import { useSelector, useDispatch } from "react-redux";
import { CardLoader, ItemNotFlund } from "../../components/helper/CustomLoader";
import { useHistory } from "react-router-dom";
import Pagination from "react-js-pagination";
import SearchBoxVendor from "../../components/helper/SearchBoxVendor";

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

  return (
    <VendorLayout>
      <div className="content-admin px-1">
        <div className="row align-items-center py-2 px-3 mx-0">
          <div className="col-12 col-sm-6 col-md-6 col-lg-6 pb-1 px-0 d-flex justify-content-between">
            <h5 className="backButton text-dark">
              {" "}
              <i
                onClick={() => history.goBack()}
                className="fas fa-chevron-left mr-1 cursorPointer"
              ></i>{" "}
              Notification
            </h5>
          </div>

          <div className="col-12 col-sm-6 col-md-6 col-lg-6 px-0">
            <SearchBoxVendor placeholder="search notification" />
          </div>

          {data.isLoading ? (
            <CardLoader />
          ) : (
            <div className="col-12 text-nowrap table-responsive table-gray-admin bg-white py-2">
              {data.notificationList.data &&
                data.notificationList.data.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th className="text-center bg-dark text-white py-2 px-2">S.NO {`  `}</th>
                      <th className="text-nowrap bg-dark text-white py-2 px-2">Subject</th>
                      <th className="bg-dark text-white py-2 px-2">Notitfication</th>
                      <th className="bg-dark text-white py-2 px-2">Date</th>
                      <th className="bg-dark text-white py-2 px-2">View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.notificationList.data.map((notification, index) => {
                      return (
                        <NotificationList
                          key={index}
                          notification={notification}
                          index={index + 1}
                        />
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <ItemNotFlund message="No Data Available" />
              )}
            </div>
          )}
        </div>
        {data.notificationList?.totalCount > 10 &&
          <div className="pagination-custom">
            <Pagination
              activePage={parseInt(pageCount)}
              itemsCountPerPage={10}
              totalItemsCount={data.notificationList?.totalCount}
              pageRangeDisplayed={1}
              onChange={handlePageChange}
              prevPageText={<i className="fas fa-chevron-left" />}
              nextPageText={<i className="fas fa-chevron-right" />}
              hideFirstLastPages={true}
            />
          </div>
        }

      </div>
    </VendorLayout>
  );
};

export default Notification;
