import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import SubUserRoleList from "../../../wrapper/vendor/SubUserRoleList";
import VendorLayout from "../../../layout/VendorLayout";
import { roleByPage, responseWhs } from "../../../store/actions/subUserAction";
import { useDispatch, useSelector } from "react-redux";
import FormSuccess from "../../../components/helper/FormSuccess";
import SearchBoxVendor from "../../../components/helper/SearchBoxVendor";
import { ItemNotFlund } from "../../../components/helper/CustomLoader";

const ManageRoles = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const read = useSelector((state) => state.SIDEMENU_INFO.read_only);
  const data = useSelector((state) => state.WHS_USER_INFO);

  useEffect(() => {
    dispatch(roleByPage("all"));
  }, [dispatch]);

  const redirect = () => {
    dispatch(responseWhs(null));
    history.replace(`/vendor/managerole`);
  };

  return (
    <VendorLayout>
      {data.whsResponse !== null ? (
        <FormSuccess onClick={redirect} message={`Status Updated`} />
      ) : null}

      <div className="content-admin px-2">
        <div className="row justify-content-end align-items-center py-1 px-3 mx-0">
          <div className="col-12 col-sm-6 col-md-6 col-lg-6 pb-1 px-0 d-flex justify-content-between">
            <h5 className="backButton text-dark">
              {" "}
              <i
                onClick={() => history.goBack()}
                className="fas fa-chevron-left mr-1 cursorPointer"
              ></i>{" "}
              Manage User Role
            </h5>
          </div>

          <div className="col-12 col-sm-6 col-md-6 col-lg-6 px-0">
            <SearchBoxVendor placeholder="search role" />
          </div>
          {/* Action Buttons */}

          {!read ? (
            <>
              <div className={`col-auto d-flex h-100 px-2 mb-2`}>
                {!read ? (
                  <Link to={"/vendor/createrole"} className="btn btn-deep-primary">
                    Create Role
                  </Link>
                ) : null}
              </div>
            </>
          ) : null}

          {/* End OF Action Buttons */}

         <div className="bg-white p-3">
         <div className="col-12 table-responsive table-gray-admin px-0">
            {data.roleList && data.roleList.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th className="text-center bg-dark text-white px-2">S.No.</th>
                    <th className="bg-dark text-white px-2">Created On</th>
                    <th className="bg-dark text-white px-2">Role</th>
                    <th className="bg-dark text-white px-2">Active/ Inactive</th>
                    <th className="bg-dark text-white px-2 text-nowrap">View Details</th>
                    <th className="bg-dark text-white px-2">Permissions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.roleList.map((item, index) => (
                    <SubUserRoleList
                      item={item}
                      index={index + 1}
                      key={index}
                      read={read}
                    />
                  ))}
                </tbody>
              </table>
            ) : (
              <ItemNotFlund message={`No Data Available`} />
            )}
          </div>
         </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default ManageRoles;
