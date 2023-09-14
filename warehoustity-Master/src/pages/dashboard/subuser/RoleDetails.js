import React, { useEffect } from 'react';
import Layout from '../../../layout/Layout';
import { useParams, useHistory } from 'react-router-dom';
import BrowserTitle from '../../../components/helper/BrowserTitle';
import CustomerLayout from '../../../layout/CustomerLayout';
import { useDispatch, useSelector } from 'react-redux';
import { readableDate } from '../../../components/validation';
import { roleById } from '../../../store/actions/subUserAction';


const RoleDetails = () => {
  const history = useHistory();
  const { customerRoleId } = useParams();
  const dispatch = useDispatch()
  const data = useSelector((state) => state.WHS_USER_INFO)

  useEffect(() => {
    dispatch(roleById(customerRoleId))
  }, [dispatch, customerRoleId])

  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });
  return (
    <Layout>
      <BrowserTitle title="Manage Role" />
      <CustomerLayout title="Manage Role">


        <div className="content col-12 view-users-roles px-0">
          <div className="border-bottom d-sm-flex justify-content-between">
            <div>
              {/* <button className="btn name-breadcrumb px-0 text-dark font-heading mr-3"> */}
              <button className="btn font-weight-bold">
                <i onClick={() => history.goBack()} className="fas fa-chevron-left pr-3 cursorPointer"></i>View Role </button>
            </div>
          </div>
          <div className="row p-3">
            <div className="col-12 ">
              {data.roleDetail ?
                <div className="row">
                  <div className="col-md-12 d-flex py-1">
                    <div className="card  py-2 px-3 mb-0">
                      <p className="mb-2">Role Name</p>
                      <p className="text-gray mb-0">{data.roleDetail?.name}</p>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex py-1">
                    <div className="card  py-2 px-3 mb-0">
                      <p className="mb-2">Created On</p>
                      <p className="text-gray mb-0">{readableDate(data.roleDetail?.createdAt)}</p>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex py-1">
                    <div className="card  py-2 px-3 mb-0">
                      <p className="mb-2">Status</p>
                      <p className="text-gray mb-0">{data.roleDetail?.isActive ? "Active" : "in Active"}</p>
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

export default RoleDetails;
