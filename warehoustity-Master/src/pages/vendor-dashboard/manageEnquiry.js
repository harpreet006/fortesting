import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import EnquiryList from "../../components/dashboard/EnquiryListVendor";
import BrowserTitle from "../../components/helper/BrowserTitle";
import { enguiryByPageVendor } from "../../store/actions/customer/enquiryAction";
import { useSelector, useDispatch } from "react-redux";
import { CardLoader, ItemNotFlund } from "../../components/helper/CustomLoader";
import Pagination from "react-js-pagination";
import VendorLayout from "../../layout/VendorLayout";

const ManageEnquiry = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.ENQUIRYINFO);
  const pageCount = new URLSearchParams(window.location.search).get("page");

  const handlePageChange = (pageNumber) => {
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("page", pageNumber);
    history.push(window.location.pathname + "?" + currentUrlParams.toString());
    dispatch(enguiryByPageVendor(pageNumber));
  };

  useEffect(() => {
    dispatch(enguiryByPageVendor(parseInt(pageCount)));
  }, [dispatch, pageCount]);

  return (
    <VendorLayout>
      <div className="content-admin px-1">
        <BrowserTitle title="Enquiry" />
        <div className="row align-items-center px-3 mx-0">
          <div className="col-12 pl-0 pt-3">
          <h5 className="backButton text-dark">
              <i
                onClick={() => history.goBack()}
                className="fas fa-chevron-left mr-2 cursorPointer"
              ></i>{" "}
             New Enquiry
            </h5>
          </div>
          <div className="row">
            <div className="content col-12  view-enquiry-details">
              {data.isLoading ? (
                <CardLoader />
              ) : (
                <>
                  <div className="row p-3">
                    <div className="col-12 text-nowrap table-responsive table-gray-admin bg-white p-3">
                      {data.enquiryList.data &&
                      data.enquiryList.data.length > 0 ? (
                        <table className="table">
                          <thead>
                            <tr>
                              <th className="text-center bg-dark text-white px-2">S. No.</th>
                              <th className="bg-dark text-white px-2">Date Of Question</th>
                              <th className="bg-dark text-white px-2">Status</th>
                              <th className="bg-dark text-white px-2">view</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.enquiryList.data.map((enquiry, index) => {
                              return (
                                <EnquiryList
                                  key={index}
                                  enquiry={enquiry}
                                  index={(pageCount - 1) * 10 + (index + 1)}
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
                  {data.enquiryList?.totalCount > 10 && (
                    <div className="pagination-custom">
                      <Pagination
                        activePage={parseInt(pageCount)}
                        itemsCountPerPage={10}
                        totalItemsCount={data.enquiryList.totalCount}
                        pageRangeDisplayed={1}
                        onChange={handlePageChange}
                        prevPageText={<i className="fas fa-chevron-left" />}
                        nextPageText={<i className="fas fa-chevron-right" />}
                        hideFirstLastPages={true}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default ManageEnquiry;
