import React, { useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import { Link, useHistory } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import BrowserTitle from "../../../components/helper/BrowserTitle";
import CustomerLayout from "../../../layout/CustomerLayout";
import { ItemNotFlund } from "../../../components/helper/CustomLoader";
import { roleByPage, responseWhs } from "../../../store/actions/subUserAction";
import { useDispatch, useSelector } from "react-redux";
import FormSuccess from "../../../components/helper/FormSuccess";
import RoleList from "./RoleList";

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

const ManageRoles = () => {
  const [successModal, setSuccessModal] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.WHS_USER_INFO);

  // console.log("data=====>>" , data.roleList.length)

  useEffect(() => {
    dispatch(roleByPage("all"));
    // return (() => {
    //   dispatch(roleList(null))
    // })
  }, [dispatch]);

  const redirect = () => {
    dispatch(responseWhs(null));
    history.replace(`/manageroles`);
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

      <CustomerLayout title="Manage Role">
        <div className="row">
          <div className="content col-12 roles-and-permissions view-users-log view-users-roles edit-users-roles add-subuser">
            <div className="pt-3 d-sm-flex justify-content-between fixed-top-height">
              <button className="btn px-0 text-gray font-weight-bold mr-3 text-dark">
                <i
                  onClick={() => history.goBack()}
                  className="fas fa-chevron-left pr-3"
                ></i>
                Manage Roles
              </button>
              <div className="col-auto px-2 mb-2">
                <Link to="/create-role" className="btn btn-deep-primary py-1">
                  Create Role
                </Link>
              </div>
            </div>
            <div className="row p-3 border-top mt-3">
              <div className="col-12 border table-responsive table-dashboard px-0">
                {data.roleList && data.roleList.length > 0 ? (
                  <table className="table">
                    <thead className="theader">
                      <tr>
                        <th>S. No.</th>
                        <th>Name</th>
                        <th>Create By</th>
                        <th>Created On</th>
                        <th>Active/In active</th>
                        <th className="text-center">Action</th>
                        <th className="text-center">Permissions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.roleList.map((item, index) => (
                        <RoleList item={item} index={index} key={index} />
                      ))}
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

export default ManageRoles;
