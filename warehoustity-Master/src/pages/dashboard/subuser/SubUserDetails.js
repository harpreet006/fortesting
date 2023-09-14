import React, { useEffect } from 'react';
import Layout from '../../../layout/Layout';
import BrowserTitle from '../../../components/helper/BrowserTitle';
import CustomerLayout from '../../../layout/CustomerLayout';
import { useHistory, useParams } from 'react-router-dom';

import { whsById } from '../../../store/actions/subUserAction';
import { useDispatch, useSelector } from 'react-redux';

const SubUserDetails = () => {

  const history = useHistory();
  const dispatch = useDispatch()
  const { userId } = useParams();
  const data = useSelector((state) => state.WHS_USER_INFO);


  useEffect(() => {
    dispatch(whsById(userId))
  }, [dispatch, userId]);

  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });


  return (
    <Layout>
      <BrowserTitle title="Edit Sub User" />
      <CustomerLayout title="Edit Sub User">

        <div className="content col-12 view-users-details">
          <div className="border-bottom d-sm-flex justify-content-between">
            <div>
              <button className="btn name-breadcrumb px-0 text-dark font-heading mr-3 toggle-class"><i onClick={() => history.goBack()} className="fas fa-chevron-left pr-3"></i>View Details </button>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {data.whsUserDetail ?
                <div className="row">
                  <div className="col-md-6 d-flex py-1">
                    <div className="card py-2 px-3 mb-0">
                      <p className="mb-2">Name</p>
                      <p className="text-gray mb-0">{data.whsUserDetail?.firstName + " " + data.whsUserDetail?.lastName}</p>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex py-1">
                    <div className="card py-2 px-3 mb-0">
                      <p className="mb-2">Employee ID</p>
                      <p className="text-gray mb-0">{data.whsUserDetail?.employeeId}</p>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex py-1">
                    <div className="card py-2 px-3 mb-0">
                      <p className="mb-2">Email ID</p>
                      <p className="text-gray mb-0">{data.whsUserDetail?.email}</p>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex py-1">
                    <div className="card py-2 px-3 mb-0">
                      <p className="mb-2">Mobile No.</p>
                      <p className="text-gray mb-0">{data.whsUserDetail?.phone}</p>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex py-1">
                    <div className="card py-2 px-3 mb-0">
                      <p className="mb-2">Role</p>
                      <p className="text-gray mb-0">{data.whsUserDetail?.accountRole?.name}</p>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex py-1">
                    <div className="card py-2 px-3 mb-0">
                      <p className="mb-2">Work Location</p>
                      <p className="text-gray mb-0">{data.whsUserDetail?.city}</p>
                    </div>
                  </div>
                  {/* <div className="col-md-6 d-flex py-1">
                    <div className="card py-2 px-3 mb-0">
                      <p className="mb-2">Area</p>
                      <p className="text-gray mb-0">{data.whsUserDetail?.area}</p>
                    </div>
                  </div> */}
                  <div className="col-md-6 d-flex py-1">
                    <div className="card py-2 px-3 mb-0">
                      <p className="mb-2">Department</p>
                      <p className="text-gray mb-0">{data.whsUserDetail?.department?.name}</p>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex py-1">
                    <div className="card py-2 px-3 mb-0">
                      <p className="mb-2">Department Head</p>
                      <p className="text-gray mb-0">{data.whsUserDetail?.isDepartmentHead ? "Yes" : "No"}</p>
                    </div>
                  </div>
                </div>
                : null}
            </div>

            <div className="col-12">
              <button onClick={() => history.goBack()} className="btn btn-deep-primary my-4 py-1 px-5">Back</button>
            </div>
          </div>
        </div>

      </CustomerLayout>
    </Layout>
  );
}

export default SubUserDetails;
