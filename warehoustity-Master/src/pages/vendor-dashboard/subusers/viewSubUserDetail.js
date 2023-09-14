import React, { useEffect } from "react";
import VendorLayout from "../../../layout/VendorLayout";
import { useHistory, useParams } from "react-router-dom";
import { whsById, whsUser_By_Id } from "../../../store/actions/subUserAction";
import { useDispatch, useSelector } from "react-redux";

const ViewSubUserDetail = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { subUserId } = useParams();
  const data = useSelector((state) => state.WHS_USER_INFO);

  useEffect(() => {
    dispatch(whsById(subUserId));

    return () => {
      dispatch(whsUser_By_Id(null));
    };
  }, [dispatch, subUserId]);

  return (
    <VendorLayout>
      <div className="content-admin px-2">
       
        <div className="row align-items-center py-3 px-3 mx-0">

        <div className="col-12 py-2 px-0">
            <h5 className="text-dark">
              <i
                onClick={() => history.goBack()}
                className="fas fa-chevron-left mr-2 cursorPointer"
              ></i>{" "}
              View Details
            </h5>
          </div>

          <div className="col-12 bg-white p-3">
            {data.whsUserDetail ? (
              <div className="row">
                <div className="col-md-6 d-flex py-2">
                  <div className="card py-1 px-4 mb-0">
                    <p className="mb-2">Name</p>
                    <p className="text-gray mb-0">
                      {data.whsUserDetail?.firstName +
                        " " +
                        data.whsUserDetail?.lastName}
                    </p>
                  </div>
                </div>
                <div className="col-md-6 d-flex py-2">
                  <div className="card py-1 px-4 mb-0">
                    <p className="mb-2">Email ID</p>
                    <p className="text-gray mb-0">
                      {data.whsUserDetail?.email}
                    </p>
                  </div>
                </div>
                <div className="col-md-6 d-flex py-2">
                  <div className="card py-1 px-4 mb-0">
                    <p className="mb-2">Mobile No.</p>
                    <p className="text-gray mb-0">
                      {data.whsUserDetail?.phone}
                    </p>
                  </div>
                </div>
                <div className="col-md-6 d-flex py-2">
                  <div className="card py-1 px-4 mb-0">
                    <p className="mb-2">Role</p>
                    <p className="text-gray mb-0">
                      {data.whsUserDetail?.accountRole?.name}
                    </p>
                  </div>
                </div>
                <div className="col-md-6 d-flex py-2">
                  <div className="card py-1 px-4 mb-0">
                    <p className="mb-2">City</p>
                    <p className="text-gray mb-0">{data.whsUserDetail?.city}</p>
                  </div>
                </div>
                <div className="col-md-6 d-flex py-2">
                  <div className="card py-1 px-4 mb-0">
                    <p className="mb-2">Area</p>
                    <p className="text-gray mb-0">{data.whsUserDetail?.area}</p>
                  </div>
                </div>
                <div className="col-md-6 d-flex py-2">
                  <div className="card py-1 px-4 mb-0">
                    <p className="mb-2">Department</p>
                    <p className="text-gray mb-0">
                      {data.whsUserDetail?.department?.name}
                    </p>
                  </div>
                </div>
                <div className="col-md-6 d-flex py-2">
                  <div className="card py-1 px-4 mb-0">
                    <p className="mb-2">Department Head</p>
                    <p className="text-gray mb-0">
                      {data.whsUserDetail?.isDepartmentHead ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
            <div className="row mt-1">
              <div className="col-12 px-0">
                <button
                  onClick={() => history.goBack()}
                  className="btn btn-outline-deep-blue m-3 px-5"
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

export default ViewSubUserDetail;
