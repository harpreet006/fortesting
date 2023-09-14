import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import VendorLayout from "../../layout/VendorLayout";
import { notificationById } from "../../store/actions/notificationAction";
import { useSelector, useDispatch } from "react-redux";
import { readableDate, readableTime } from "../../components/validation";
import { CardLoader } from "../../components/helper/CustomLoader";

const ViewNotification = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.NOTIFICATIONINFO);
  const { notificationId } = useParams();
  const history = useHistory();

  useEffect(() => {
    dispatch(notificationById(notificationId));
  }, [dispatch, notificationId]);

  return (
    <VendorLayout>
      <div className="content-admin px-1">
        <div className="row align-items-center px-3 py-3">
          <div className="col-12 mt-2">
            <h5 className="text-dark backButton">
              <i
                onClick={() => history.goBack()}
                className="fas fa-chevron-left mr-1 cursorPointer"
              ></i>{" "}
              View Notification
            </h5>
          </div>
        </div>
        <div className="row align-items-center pb-3 px-3 mx-0">
          <div className="col-12">
            <div className="row">
              {data.isLoading ? (
                <CardLoader />
              ) : (
                <div className="col-12 py-2 bg-white px-3">
                  <div className="row justify-content-between">
                    <div className="col-auto">
                      <h5 className="text-center mb-2">
                        {data.notificationDetail.title}
                      </h5>
                    </div>
                    <div className="col-auto">
                      <div className="d-flex align-items-end">
                        <h5>
                        <i class="fa fa-calendar" aria-hidden="true"></i>    {readableDate(data.notificationDetail.created_at)}
                        </h5>
                        <h5 className="text-gray px-3">
                        <i class="fa fa-clock-o" aria-hidden="true"></i>  {readableTime(data.notificationDetail.created_at)}
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="text-gray col-8">
                    <p>{data.notificationDetail.content}</p>
                  </div>
                </div>
              )}
              <div className="col-12 mt-2 text-left">
                <button
                  onClick={() => history.goBack()}
                  className="btn btn-outline-deep-primary py-2 px-5"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default ViewNotification;
