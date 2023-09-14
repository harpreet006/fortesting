import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
// import GstList from '../../wrapper/vendor/GstList';
import VendorLayout from "../../layout/VendorLayout";
import { vendorGstByPage } from "../../store/actions/customer/myWarehouseAction";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "react-js-pagination";
import GstListTable from "../../wrapper/vendor/GstListTable";

const GST = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.MYWAREHOUSEINFO);

  const pageCount = new URLSearchParams(window.location.search).get("page");
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(vendorGstByPage(parseInt(pageCount)));
  }, [pathname, dispatch, pageCount]);

  const handlePageChange = (pageNumber) => {
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("page", pageNumber);
    history.push(window.location.pathname + "?" + currentUrlParams.toString());
    dispatch(vendorGstByPage(pageNumber));
  };
  return (
    <VendorLayout>
      <div className="content-admin px-1">
        <div className="row align-items-center py-3 px-3 mx-0">
          <div className="col-12 px-0">
            <h5 className="text-dark backButton pl-0">
              {" "}
              <i
                onClick={() => history.goBack()}
                className="fas fa-chevron-left mr-1 cursorPointer"
              ></i>{" "}
              GST Update
            </h5>
          </div>

          <div className="bg-white p-3">
            <div className="w-100 table-responsive table-row-margin-bottom-admin">
              <table className="table listTable">
                <thead>
                  <tr>
                    <th className="text-nowrap w-50px bg-dark text-white py-2">
                      Warehouse Id
                    </th>
                    <th className="text-nowrap bg-dark text-white py-2">
                      State
                    </th>
                    <th className="bg-dark text-white py-2">GST</th>
                    <th className="text-nowrap bg-dark text-white py-2">
                      Upload GST
                    </th>
                    <th className="bg-dark text-white py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.gstVendor &&
                  data.gstVendor.data &&
                  data.gstVendor.data.length > 0
                    ? data.gstVendor.data.map((value, index) => {
                        return (
                          <GstListTable
                            key={index}
                            value={
                              value &&
                              value.warehouse &&
                              value.warehouse.warehouseContactDetailInfo &&
                              value.warehouse.warehouseContactDetailInfo.address
                            }
                            index={index}
                            booking={value.id}
                            checkId={value.warehouse.id}
                            warehouseId={value.warehouse?.warehouseId}
                            gstid={value.gst ? value.gst.id : null}
                            viewMood={value.vendorGstUpdated}
                          />
                        );
                      })
                    : null}
                </tbody>
              </table>
            </div>
          </div>
          <div className="text-center">
            <div className="pagination-custom">
              {data.gstVendor && data.gstVendor.data !== undefined && (
                <Pagination
                  activePage={parseInt(pageCount)}
                  itemsCountPerPage={10}
                  totalItemsCount={data.gstVendor.totalCount}
                  pageRangeDisplayed={1}
                  onChange={handlePageChange}
                  prevPageText={<i className="fas fa-chevron-left" />}
                  nextPageText={<i className="fas fa-chevron-right" />}
                  hideFirstLastPages={true}
                />
              )}
            </div>
          </div>

          {/* 
          <div className="content col-12">
            <div className="border-bottom d-sm-flex justify-content-between">
              <div>
                <Link to="#" className="btn name-breadcrumb px-0 text-dark font-heading mr-3">
           
                  GST Update</Link>
              </div>
            </div>
            <div className="row pt-1">
              {
                data.gstVendor && data.gstVendor.data && data.gstVendor.data.length > 0 ?
                  data.gstVendor.data.map((value, index) => {
                    return (
                      <GstList
                        value={value && value.warehouse && value.warehouse.warehouseContactDetailInfo && value.warehouse.warehouseContactDetailInfo.address}
                        index={index} booking={value.id} checkId={value.warehouse.id} gstid={value.gst ? value.gst.id : null} viewMood={value.vendorGstUpdated} />
                    )
                  })
                  :
                  null
              }
            </div>
          </div> */}
        </div>
      </div>
    </VendorLayout>
  );
};

export default GST;
