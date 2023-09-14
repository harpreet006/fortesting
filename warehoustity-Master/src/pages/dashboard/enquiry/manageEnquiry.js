import React, { useEffect } from "react";
import Layout from "../../../layout/Layout";
import { useHistory } from "react-router-dom";
import EnquiryList from "../../../components/dashboard/EnquiryList";
import CustomerLayout from "../../../layout/CustomerLayout";
import BrowserTitle from "../../../components/helper/BrowserTitle";
import { enguiryByPage } from "../../../store/actions/customer/enquiryAction";
import { useSelector, useDispatch } from "react-redux";
import {
  CardLoader,
  ItemNotFlund,
} from "../../../components/helper/CustomLoader";
// import Pagination from "react-js-pagination";
import CreateNewEnquiry from "./createNewEnquiry";
import ReactPaginate from "react-paginate";

const ITEM_COUNT_PER_PAGE = 10;

const ManageEnquiry = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.ENQUIRYINFO);

  const pageCount = new URLSearchParams(window.location.search).get("page");

  const handlePageChange = (pageNumber) => {
    const pNumber = pageNumber['selected']+1
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("page", pNumber);
    history.push(window.location.pathname + "?" + currentUrlParams.toString());
    dispatch(enguiryByPage(pNumber));
  };

  useEffect(() => {
    dispatch(enguiryByPage(parseInt(pageCount)));
  }, [dispatch, pageCount]);
  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });

  return (
    <Layout>
      <BrowserTitle title="Enquiry" />
      <CustomerLayout title="Manage Enquiry">
        <div className="row mb-3">
          <div className="content col-12  view-enquiry-details bg-white">
            <div className="border-bottom d-sm-flex justify-content-between fixed-top-height">
              <div>
                <button className="btn px-0 text-dark font-weight-bold mr-3">
                  <i
                    onClick={() => history.goBack()}
                    className="fas fa-chevron-left pr-3"
                  ></i>
                  Enquiry
                </button>
              </div>
            </div>

            <CreateNewEnquiry />

            {data.isLoading ? (
              <CardLoader />
            ) : (
              <>
                <div className=" ">
                  <div className=" border table-responsive table-dashboard px-0">
                    {data.enquiryList.data &&
                    data.enquiryList.data.length > 0 ? (
                      <table className="table">
                        <thead>
                          <tr className="theader">
                            <th>S. No</th>
                            <th>Ticket-ID</th>
                            <th>Ticket Date</th>
                            {/* <th>User Id</th>
                            <th>User Name</th> */}
                            <th className="w-100px">Status</th>
                            <th className="w-10">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.enquiryList.data.map((enquiry, index) => {
                            return (
                              <EnquiryList
                                key={index}
                                enquiry={enquiry}
                                index={(pageCount - 1) * 10 + (index + 1)}
                                pageCount={parseInt(pageCount)}
                                enguiryByPage={enguiryByPage}
                              />
                            );
                          })}
                        </tbody>
                      </table>
                    ) : (
                      <ItemNotFlund message="No Data Available" />
                    )}
                  </div>
                </div>

                <div className="pagination-custom">
                  {/* <Pagination
                    activePage={parseInt(pageCount)}
                    itemsCountPerPage={10}
                    totalItemsCount={data.enquiryList.totalCount}
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
                    pageCount={Math.ceil(data.enquiryList.totalCount / ITEM_COUNT_PER_PAGE)}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    pageRangeDisplayed={ITEM_COUNT_PER_PAGE}
                    marginPagesDisplayed={2}
                    forcePage={parseInt(pageCount)-1}
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
              </>
            )}
          </div>
        </div>
      </CustomerLayout>
    </Layout>
  );
};

export default ManageEnquiry;
