import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import VendorLayout from "../../../layout/VendorLayout";

import { readableDate } from "../../../components/validation";
import { departmentById } from "../../../store/actions/subUserAction";
import { useDispatch, useSelector } from "react-redux";

const DepartmentDetails = () => {
  const history = useHistory();
  const { departmentId } = useParams();

  const dispatch = useDispatch();
  const data = useSelector((state) => state.WHS_USER_INFO);
  useEffect(() => {
    dispatch(departmentById(departmentId));
  }, [dispatch, departmentId]);

  return (
    <VendorLayout>
      <div className="content-admin px-">
       
        <div className="row align-items-center pb-3 px-3 mx-0">

        <div className="col-12 pt-3 ">
            <span onClick={() => history.goBack()}>
              <h5 className="text-dark">
                <i className="fas fa-chevron-left mr-2"></i> View Sub Users
                Roles Details
              </h5>
            </span>
          </div>

          <div className="col-12 bg-white p-3">
            {data.departmentDetail ? (
              <div className="row">
                <div className="col-md-12 d-flex py-1">
                  <div className="card py-1 px-4 mb-0">
                    <p className="mb-2">Department Name</p>
                    <p className="text-gray mb-0">
                      {data.departmentDetail?.name}
                    </p>
                  </div>
                </div>
                {/* <div className="col-md-12 d-flex py-3">
                <div className="card py-3 px-4 mb-0">
                  <p className="mb-2">Mobile No.</p>
                  <p className="text-gray mb-0">+9178545666556</p>
                </div>
              </div> */}
                <div className="col-md-6 d-flex py-1">
                  <div className="card py-1 px-4 mb-0">
                    <p className="mb-2">Created On</p>
                    <p className="text-gray mb-0">
                      {readableDate(data.departmentDetail?.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="col-md-6 d-flex py-1">
                  <div className="card py-1 px-4 mb-0">
                    <p className="mb-2">Status</p>
                    <p className="text-gray mb-0">
                      {data.departmentDetail?.isActive ? "Active" : "in Active"}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div className="col-auto">
            <button
              onClick={() => history.goBack()}
              className="btn btn-outline-deep-blue my-4"
            >
              back
            </button>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default DepartmentDetails;
