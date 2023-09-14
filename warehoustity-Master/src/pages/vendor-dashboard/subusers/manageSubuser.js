import React, { useEffect } from "react";
import SubUserList from "../../../wrapper/vendor/SubUserList";
import VendorLayout from "../../../layout/VendorLayout";
import Pagination from "react-js-pagination";
import { Link, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { whsByPage, responseWhs } from "../../../store/actions/subUserAction";
import { useDispatch, useSelector } from "react-redux";
import FormSuccess from "../../../components/helper/FormSuccess";
import SearchBoxVendor from "../../../components/helper/SearchBoxVendor";
import { ItemNotFlund } from "../../../components/helper/CustomLoader";

const ManageSubUser = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const read = useSelector((state) => state.SIDEMENU_INFO.read_only);
  const data = useSelector((state) => state.WHS_USER_INFO);
  const pageCount = new URLSearchParams(window.location.search).get("page");

  useEffect(() => {
    dispatch(whsByPage(parseInt(pageCount)));
  }, [dispatch, pageCount]);


  const handlePageChange = (pageNumber) => {
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("page", pageNumber);
    history.push(window.location.pathname + "?" + currentUrlParams.toString());
    dispatch(whsByPage(parseInt(pageNumber)));
  };

  const redirect = () => {
    dispatch(responseWhs(null));
    history.replace(`/vendor/managesubuser`);
  };

  return (
    <VendorLayout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sub User</title>
      </Helmet>

      {data.whsResponse !== null ? (
        <FormSuccess onClick={redirect} message={`Status Updated`} />
      ) : null}

      <div className="content-admin">
        <div className="row justify-content-end align-items-center py-1 px-3 mx-0">
          <div className="col-12 col-sm-6 col-md-6 col-lg-6 pb-1 px-0 d-flex justify-content-between">
            <h5 className="backButton text-dark">
              {" "}
              <i
                onClick={() => history.goBack()}
                className="fas fa-chevron-left mr-1 cursorPointer"
              ></i>{" "}
              Manage Users
            </h5>
          </div>

          <div className="col-12 col-sm-6 col-md-6 col-lg-6 px-0">
            <SearchBoxVendor placeholder="search user" />
          </div>

          {/* Action Buttons */}
          <div className="col-auto d-flex h-100 px-2 mb-2">
            <div className="dropdown btn-export">
              <button
                className="customButton btn-deep-primary dropdown-toggle"
                type="button"
                id="dropdownMenu5"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Export
              </button>
              <div className="dropdown-menu">
                <Link className="dropdown-item" href="#!">
                  Excel
                </Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" href="#!">
                  PDF
                </Link>
              </div>
            </div>
          </div>
          {!read ? (
            <>
              <div className={`col-auto d-flex h-100 px-2 mb-2`}>
                <Link
                  to={"/vendor/bulkupload"}
                  className="customButton btn-deep-primary"
                >
                  Bulk Upload
                </Link>
              </div>
              <div className={`col-auto d-flex h-100 px-2 mb-2`}>
                <Link
                  to={"/vendor/addnewuser"}
                  className="customButton btn-deep-primary"
                >
                  Add Sub User
                </Link>
              </div>
            </>
          ) : null}

         <div className="bg-white p-3">
             {/* End OF Action Buttons */}
          <div className="col-12 px-0 table-responsive table-gray-admin">
            {data?.whsUserList?.data && data?.whsUserList?.data?.length > 0 ? (
              <table className="table tableHead">
                <thead>
                  <tr>
                    <th className="text-center bg-dark text-white">S.No.</th>
                    <th className="bg-dark text-white">Name</th>
                    <th className="bg-dark text-white">Role</th>
                    <th className="bg-dark text-white">Contact No.</th>
                    <th className="bg-dark text-white">Email ID</th>
                    <th className="bg-dark text-white">Department</th>
                    <th className="bg-dark text-white">Active/ Inactive</th>
                    <th className="bg-dark text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.whsUserList?.data?.map((item, index) => {
                    return (
                      <SubUserList
                        item={item}
                        index={index + 1}
                        key={index}
                        read={read}
                      />
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <ItemNotFlund message={`No Data Available`} />
            )}

           
          </div>
         </div>
         <div className="text-center">
         {data?.whsUserList?.data && data?.whsUserList?.data?.length > 0 &&
              <div className="pagination-custom">
                <Pagination
                  activePage={parseInt(pageCount)}
                  itemsCountPerPage={10}
                  totalItemsCount={data?.whsUserList?.totalCount}
                  pageRangeDisplayed={1}
                  onChange={handlePageChange}
                  prevPageText={<i className="fas fa-chevron-left" />}
                  nextPageText={<i className="fas fa-chevron-right" />}
                  hideFirstLastPages={true}
                />
              </div>
            }
         </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default ManageSubUser;
