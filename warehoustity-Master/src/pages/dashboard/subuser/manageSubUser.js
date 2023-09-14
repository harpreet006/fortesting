import React, { useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import { Link, useHistory } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import BrowserTitle from "../../../components/helper/BrowserTitle";
import CustomerLayout from "../../../layout/CustomerLayout";
import SubUserList from "../../../wrapper/customer/subuser/SubUserList";
import {
  whsByPage,
  responseWhs,
  // whsUserList,
} from "../../../store/actions/subUserAction";
import { useDispatch, useSelector } from "react-redux";
import FormSuccess from "../../../components/helper/FormSuccess";
import CustomLoader, {
  ItemNotFlund,
} from "../../../components/helper/CustomLoader";
// import Pagination from "react-js-pagination";
import ReactPaginate from "react-paginate";

const ITEM_COUNT_PER_PAGE = 10;

function UpdateSubUser(props) {
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
        <h6>Sub user updated successful</h6>
        <Button className="my-3" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Body>
    </Modal>
  );
}

function CreateSubUser(props) {
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
        <h6>Sub user created successful</h6>
        <Button className="my-3" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Body>
    </Modal>
  );
}

const ManageSubUser = () => {
  const [successModal, setSuccessModal] = useState(false);
  const [createSubUserSuccessModal, setCreateSubUserSuccessModal] =
    useState(false);
  const pageCount = new URLSearchParams(window.location.search).get("page") ?? 1;

  const dispatch = useDispatch();
  const history = useHistory();
  const data = useSelector((state) => state.WHS_USER_INFO);

  useEffect(() => {
    dispatch(whsByPage(pageCount, ITEM_COUNT_PER_PAGE));
    // return () => {
    //   dispatch(whsUserList(null));
    // };
  }, [dispatch, pageCount]);

  const handlePageChange = (pageNumber) => {
    const pNumber = pageNumber['selected']+1
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("page", pNumber);
    history.push(window.location.pathname + "?" + currentUrlParams.toString());
    dispatch(whsByPage(parseInt(pNumber), ITEM_COUNT_PER_PAGE));
  };

  const redirect = () => {
    dispatch(responseWhs(null));
    history.replace(`/managesubusers`);
  };
  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });


  return (
    <Layout>
      {successModal ? (
        <UpdateSubUser
          show={successModal}
          onHide={() => setSuccessModal(false)}
        />
      ) : null}

      {createSubUserSuccessModal ? (
        <CreateSubUser
          show={createSubUserSuccessModal}
          onHide={() => setCreateSubUserSuccessModal(false)}
        />
      ) : null}

      {data.whsResponse !== null ? (
        <FormSuccess onClick={redirect} message={`Status Updated`} />
      ) : null}

      <BrowserTitle title="Sub Users" />
      <CustomerLayout title="Sub Users">
       <div className="shadow-sm col-12">
       <div className="row">
          <div className="content col-12 view-users-log view-users-details edit-users-details add-subuser bulk-upload">
            <div className=" mb-1 pt-3 d-sm-flex justify-content-between fixed-top-height pr-2">
              <button className="btn px-0 text-gray font-weight-bold mr-3 text-dark">
                <i
                  onClick={() => history.goBack()}
                  className="fas fa-chevron-left pr-3"
                ></i>
                Manage Sub User
              </button>
              <div className="row justify-content-lg-end ">
                <div className="col-auto px-2 mb-2">
                  <div className="dropdown btn-export">
                    <button
                      className="btn btn-deep-primary py-1"
                      type="button"
                      id="dropdownMenu5"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Export
                    </button>
                    <div className="dropdown-menu">
                      <Link className="dropdown-item" to="#!">
                        Excel
                      </Link>
                      <div className="dropdown-divider"></div>
                      <Link className="dropdown-item" to="#!">
                        PDF
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-auto px-2 mb-2">
                  <Link
                    to="/bulk-upload-sub-user"
                    className="btn btn-deep-primary py-1"
                  >
                    Bulk Upload
                  </Link>
                </div>
                <div className="col-auto px-2 mb-2">
                  <Link
                    to="/add-sub-user"
                    className="btn btn-deep-primary py-1"
                  >
                    Add Sub User
                  </Link>
                </div>
              </div>
            </div>
            {data.isLoading ? (
              <CustomLoader />
            ) : (
              <div className="row p-3 border-top mt-3">
                <div className="col-12 border table-responsive table-dashboard px-0">
                  {data?.whsUserList?.data &&
                  data?.whsUserList?.data?.length > 0 ? (
                    <table className="table">
                      <thead className="theader">
                        <tr >
                          <th className="w-100px text-nowrap">S. No.</th>
                          <th>Name</th>
                          <th className="text-nowrap">Employee ID</th>
                          <th>Contact No.</th>
                          <th className="text-nowrap">Email ID</th>
                          <th>Role</th>
                          <th>Department</th>
                          <th className="text-nowrap">Active/In active</th>
                          {/* <th className="text-center">View Log</th> */}
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {data?.whsUserList?.data?.map((item, index) => {
                          return (
                            <SubUserList
                              item={item}
                              index={(pageCount - 1) * ITEM_COUNT_PER_PAGE + (index + 1)}
                              key={index}
                            />
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <ItemNotFlund message="No Data Available" />
                  )}

                  {data.whsUserList?.totalCount > 5 && (
                      <div className="pagination-custom">
                        {/* <Pagination
                          activePage={parseInt(pageCount)}
                          itemsCountPerPage={ITEM_COUNT_PER_PAGE}
                          totalItemsCount={data?.whsUserList?.totalCount}
                          pageRangeDisplayed={1}
                          onChange={handlePageChange}
                          prevPageText={<i className="fas fa-chevron-left" />}
                          nextPageText={<i className="fas fa-chevron-right" />}
                          hideFirstLastPages={true}
                        /> */}

                        <ReactPaginate
                          breakLabel="..."
                          nextLabel=">"
                          onPageChange={handlePageChange}
                          pageCount={Math.ceil(
                            data?.whsUserList.totalCount / ITEM_COUNT_PER_PAGE
                          )}
                          previousLabel="<"
                          renderOnZeroPageCount={null}
                          pageRangeDisplayed={ITEM_COUNT_PER_PAGE}
                          marginPagesDisplayed={2}
                          forcePage={parseInt(pageCount) - 1}
                          pageClassName="page-item"
                          pageLinkClassName="page-link"
                          previousClassName="page-item"
                          previousLinkClassName="page-link"
                          nextClassName="page-item"
                          nextLinkClassName="page-link"
                          breakClassName="page-item"
                          breakLinkClassName="page-link"
                          containerClassName="pagination"
                          activeClassName="active"
                        />
                      </div>
                    )}
                </div>
              </div>
            )}
          </div>

          <div className="content d-none col-12 view-users-log">
            <div className="pb-2 border-bottom mb-4 d-sm-flex justify-content-between">
              <div>
                <button
                  className="btn name-breadcrumb px-0 text-dark font-heading mr-3 mb-3 toggle-class"
                  data-target=".view-users-log"
                  data-toggle-class="d-none"
                >
                  <i className="fas fa-chevron-left pr-3"></i>View Log
                </button>
                {/* <Link to="#" className="btn name-breadcrumb px-0 text-dark font-heading mr-3 mb-3 toggle className" data-target=".view-users-log" data-toggle className="d-none"><i className="fas fa-chevron-left pr-3"></i>View Log</Link> */}
              </div>
            </div>
            <div className="row p-3">
              <div className="col-12 border h-320px"></div>
              <div className="col-12 px-0">
                <button
                  className="btn btn-deep-primary toggle-class my-4"
                  data-target=".view-users-log"
                  data-toggle-class="d-none"
                >
                  Back
                </button>
              </div>
            </div>
          </div>

          <div className="content d-none col-12 bulk-upload">
            <div className="border-bottom d-sm-flex justify-content-between">
              <div>
                <button
                  className="btn name-breadcrumb px-0 text-dark font-heading mr-3 toggle-class "
                  data-target=".bulk-upload"
                  data-toggle-class="d-none"
                >
                  <i className="fas fa-chevron-left pr-3"></i>
                  Bulk Upload Sub User
                </button>
              </div>
            </div>
            <div className="row px-3 pb-3">
              <div className="col-xl-6 col-lg-7 col-md-8 col-sm-10 mx-auto">
                <form>
                  <div className="row">
                    <div className="form-group col-12">
                      <div className="custom-file position-relative">
                        {/* <!-- name of file chosen --> */}
                        {/* <!-- actual upload which is hidden --> */}
                        <input
                          type="file"
                          id="custom-file-upload-input"
                          className="custom-file-input"
                          required=""
                          hidden=""
                        />
                        {/* <!-- our custom upload button --> */}
                        <div className="col-auto mx-auto border py-4">
                          <label
                            className="custom-file-upload-label btn btn-block mb-3"
                            htmlFor="custom-file-upload-input"
                          >
                            <img
                              className="img-fluid w-200px"
                              src="/assets/images/icons/excel-icon.webp"
                              alt="alt"
                            />
                          </label>
                          <span
                            id="custom-file-name"
                            className="d-block h4 text-center custom-file-name"
                          >
                            Choose a file{" "}
                            <span className="font-weight-light">
                              or drag it here
                            </span>
                          </span>
                        </div>
                        <div className="invalid-feedback">
                          Example upload your curriculum vitae
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-12">
                      <button
                        type="submit"
                        onClick={(e) => e.preventDefault()}
                        className="btn btn-deep-primary btn-block my-4"
                      >
                        <span className="h4">Upload</span>
                      </button>
                    </div>
                    {/* <div className="col-12">
                  <button type="button" className="btn btn-deep-primary btn-block toggle className my-4" data-target=".bulk-upload" data-toggle className="d-none"><span className="h4">Back</span></button>
                </div> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
       </div>
      </CustomerLayout>
    </Layout>
  );
};

export default ManageSubUser;
