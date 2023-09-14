import React, { useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import { Link, useHistory } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import BrowserTitle from "../../../components/helper/BrowserTitle";
import CustomerLayout from "../../../layout/CustomerLayout";
import {
  responseWhs,
  departmentV2,
} from "../../../store/actions/subUserAction";
import { useDispatch, useSelector } from "react-redux";
import FormSuccess from "../../../components/helper/FormSuccess";
import DepartmentList from "./DepartmentList";
import CustomLoader, {
  ItemNotFlund,
} from "../../../components/helper/CustomLoader";

function CreateRole(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body style={{ textAlign: "center" }}>
        <img
          src={"/assets/images/success.png"}
          className="size-150px p-4 mx-auto"
          alt="success"
        />
        <h6>Role created successful</h6>
        <Button className="my-3" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Body>
    </Modal>
  );
}

const ManageCustomerDepartment = () => {
  const [successModal, setSuccessModal] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.WHS_USER_INFO);
  const [departments, setDepartments] = useState({
    isLoading: false,
    data: [],
  });

  useEffect(() => {
    dispatch(departmentV2("all", setDepartments));
  }, [dispatch]);

  const redirect = () => {
    dispatch(responseWhs(null));
    dispatch(departmentV2("all", setDepartments));
    history.replace(`/manage-customer-department`);
  };
  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });


  return (
    <Layout>
      {successModal ? (
        <CreateRole show={successModal} onHide={() => setSuccessModal(false)} />
      ) : null}
      <BrowserTitle title="Manage Role" />

      {data.whsResponse?.statusCode === 200 ? (
        <FormSuccess onClick={redirect} message={data.whsResponse?.message} />
      ) : null}

      {data.whsResponse !== null && data.whsResponse?.statusCode !== 200 && (
        <FormSuccess onClick={redirect} message={`Status Updated`} />
      )}

      {/* {data.whsResponse !== null ? (
        <FormSuccess onClick={redirect} message={`Status Updated`} />
      ) : null} */}

      <CustomerLayout title="Manage Role">
        <div className="row">
          <div className="content col-12 roles-and-permissions view-users-log view-users-roles edit-users-roles add-subuser">
            <div className="border-bottom d-sm-flex justify-content-between fixed-top-height">
              <button className="btn px-0 text-gray mr-3 text-dark">
                <i
                  onClick={() => history.goBack()}
                  className="fas fa-chevron-left pr-3"
                ></i>
                Manage Department
              </button>
              <div className="col-auto px-2 mb-2">
                <Link
                  to="/create-customer-department"
                  className="btn btn-deep-primary py-1"
                >
                  Create Department
                </Link>
              </div>
            </div>
            {departments?.isLoading ? (
              <CustomLoader />
            ) : (
              <div className="row p-3">
                <div className="col-12 border table-responsive table-dashboard px-0">
                  {departments?.data?.length > 0 ? (
                    <table className="table">
                      <thead className="theader">
                        <tr>
                          <th>S. No.</th>
                          <th style={{width:100}}>Name</th>
                          <th className="text-nowrap">Department Head</th>
                          <th className="text-capitalize text-nowrap">User Count</th>
                          <th className="text-capitalize text-nowrap">Created By</th>
                          <th className="text-capitalize text-nowrap">Created On</th>
                          <th className="text-capitalize text-nowrap">Active/Inactive</th>
                          <th className="text-center">Action</th>
                          {/* <th className="text-center">Permissions</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {departments?.data.map((item, index) => (
                          <DepartmentList
                            item={item}
                            index={index}
                            key={index}
                          />
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <ItemNotFlund message="No Data Available" />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </CustomerLayout>
    </Layout>
  );
};

export default ManageCustomerDepartment;
