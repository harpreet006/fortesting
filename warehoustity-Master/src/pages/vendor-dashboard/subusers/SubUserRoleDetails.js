import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import VendorLayout from "../../../layout/VendorLayout";

import { readableDate } from "../../../components/validation";
import { roleById } from "../../../store/actions/subUserAction";
import { useDispatch, useSelector } from "react-redux";

const SubUserRoleDetails = () => {
  const history = useHistory();
  const { roleId } = useParams();

  const dispatch = useDispatch();
  const data = useSelector((state) => state.WHS_USER_INFO);

  useEffect(() => {
    dispatch(roleById(roleId));
  }, [dispatch, roleId]);

  return (
    <VendorLayout>
      <div className="content-admin px-2">
        <div className="row align-items-center pb-3 px-3 mx-0">

        <div className="col-12 mt-2 pl-0">
            <span onClick={() => history.goBack()}>
              <h5 className="text-dark backButton">
                <i className="fas fa-chevron-left mr-2"></i> View Sub Users
                Roles Details
              </h5>
            </span>
          </div>

        <div className="bg-white p-3">
        <div className="col-12">
            {data.roleDetail ? (
              <div className="row">
                <div className="col-md-12 d-flex py-2">
                  <div className="card py-1 px-4 mb-0">
                    <p className="mb-2">Role Name</p>
                    <p className="text-gray mb-0">{data.roleDetail?.name}</p>
                  </div>
                </div>
                {/* <div className="col-md-12 d-flex py-3">
                  <div className="card py-3 px-4 mb-0">
                    <p className="mb-2">Mobile No.</p>
                    <p className="text-gray mb-0">+9178545666556</p>
                  </div>
                </div> */}
                <div className="col-md-6 d-flex py-2">
                  <div className="card py-1 px-4 mb-0">
                    <p className="mb-2">Created On</p>
                    <p className="text-gray mb-0">
                      {readableDate(data.roleDetail?.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="col-md-6 d-flex py-2">
                  <div className="card py-1 px-4 mb-0">
                    <p className="mb-2">Status</p>
                    <p className="text-gray mb-0">
                      {data.roleDetail?.isActive ? "Active" : "in Active"}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
          <div className="col-12 text-right">
            <button
              onClick={() => history.goBack()}
              className="btn btn-outline-deep-primary my-1 px-5 "
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default SubUserRoleDetails;
