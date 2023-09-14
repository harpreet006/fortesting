import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import VendorLayout from "../../../layout/VendorLayout";
import {
  departmentByPage,
  responseWhs,
} from "../../../store/actions/subUserAction";
import { useDispatch, useSelector } from "react-redux";
import FormSuccess from "../../../components/helper/FormSuccess";
import UserDepartmentList from "../../../wrapper/vendor/UserDepartmentList";
import SearchBoxVendor from "../../../components/helper/SearchBoxVendor";

const ManageDepartment = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const read = useSelector((state) => state.SIDEMENU_INFO.read_only);
  const data = useSelector((state) => state.WHS_USER_INFO);

  useEffect(() => {
    dispatch(departmentByPage("all"));
  }, [dispatch]);

  const redirect = () => {
    dispatch(responseWhs(null));
    history.replace(`/vendor/department`);
  };

  return (
    <VendorLayout>
      {data.whsResponse !== null ? (
        <FormSuccess onClick={redirect} message={`Status Updated`} />
      ) : null}

      <div className="content-admin px-2">
        <div className="row justify-content-end align-items-center py-3 px-3 mx-0">
          <div className="col-12 col-sm-6 col-md-6 col-lg-6 pb-1 px-0 d-flex justify-content-between">
            <h5 className="backButton text-dark ">
              {" "}
              <i
                onClick={() => history.goBack()}
                className="fas fa-chevron-left mr-1 cursorPointer"
              ></i>{" "}
              Manage Department
            </h5>
          </div>

          <div className="col-12 col-sm-6 col-md-6 col-lg-6 px-0">
            <SearchBoxVendor placeholder="search Department" />
          </div>

          {/* Action Buttons */}

          {!read && (
            <div className="col-auto d-flex h-100 px-2 mb-2">
              <Link
                to={"/vendor/create-department"}
                className="btn btn-deep-primary"
              >
                Create Department
              </Link>
            </div>
          )}

        <div className="bg-white py-3 px-2">
            {/* End OF Action Buttons */}
            <div className="col-12 table-responsive table-gray-admin">
            <table className="table">
              <thead>
                <tr>
                  <th  className="text-center bg-dark text-white px-3">S.No.</th>
                  <th className="bg-dark text-white px-3">Created On</th>
                  <th className="bg-dark text-white px-3">Department</th>
                  <th className="bg-dark text-white px-3">Active/ Inactive</th>
                  <th className="text-nowrap bg-dark text-white px-3">View Details</th>
                </tr>
              </thead>
              <tbody>
                {data.departmentList && data.departmentList.length > 0
                  ? data.departmentList.map((item, index) => (
                      <UserDepartmentList
                        item={item}
                        index={index + 1}
                        key={index}
                        read={read}
                      />
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>

        </div>
      </div>
    </VendorLayout>
  );
};

export default ManageDepartment;
