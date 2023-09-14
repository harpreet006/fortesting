import React, { useEffect } from "react";
import VendorLayout from "../../layout/VendorLayout";
// import MenuDrawer from "../../components/vendor/MenuDrawer";
import WarehouseList from "../../wrapper/vendor/vendorWarehouse/WarehouseList";
import { fetchWarehouseByPage } from "../../store/actions/vendor/warehouseList";
import { useDispatch, useSelector } from "react-redux";
import CustomLoader from "../../components/helper/CustomLoader";
import Pagination from "react-js-pagination";
import { useHistory } from "react-router-dom";
import ErrorCard from "../../components/helper/ErrorCard";

const MyWarehouse = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const data = useSelector((state) => state.WAREHOUSELIST);
  const pageCount = new URLSearchParams(window.location.search).get("page");

  useEffect(() => {
    dispatch(fetchWarehouseByPage(parseInt(pageCount)));
  }, [dispatch, pageCount]);

  const handlePageChange = (pageNumber) => {
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("page", pageNumber);
    history.push(window.location.pathname + "?" + currentUrlParams.toString());
    dispatch(fetchWarehouseByPage(pageNumber));
  };

  return (
    <VendorLayout>
      <div className="content-admin px-1">
        <div className="row justify-content-end align-items-center py-3 px-3 ml-3 mr-0">
          {/* <MenuDrawer /> */}
          <h5 className="backButton text-dark px-0">
            <i
              onClick={() => history.goBack()}
              className="fas fa-chevron-left mr-3 cursorPointer"
            ></i>
            List of Warehouse
          </h5>
          <div className="col-12 px-0">
            <div className="row">
              <div className="col-12 table-responsive table-gray-admin">
                {data.isLoading ? (
                  <CustomLoader />
                ) : data.isError !== "" ? (
                  <ErrorCard message={data.isError} />
                ) : (
                  <>
                  <div className="bg-white p-3 w-100 table-responsive">
                  <table className="table">
                      <thead className="bg-dark">
                        <tr>
                          <th className="text-nowrap bg-dark text-white px-3">Display Name</th>
                          <th className="text-nowrap px-1 bg-dark text-white px-3">Warehouse Category</th>
                          <th className='bg-dark text-white px-3'>Status</th>
                          <th className="text-nowrap px-1 bg-dark text-white px-3">Warehouse ID</th>
                          <th className="bg-dark text-white px-3">Action</th>
                          <th className="text-center px-1 bg-dark text-white px-3">Preview</th>
                          <th className="text-center text-nowrap px-1 bg-dark text-white px-3">
                            Mark as Featured
                          </th>
                          <th className="text-center text-nowrap px-1 bg-dark text-white px-3">
                            Featured Status
                          </th>
                          <th className="text-center text-nowrap px-1 bg-dark text-white px-3">
                            View Feature Warehouse
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {data.listOfWarehouse.data &&
                          data.listOfWarehouse.data.length > 0 &&
                          data.listOfWarehouse.data.map((item, index) => {
                            return (
                              <WarehouseList
                                data={item}
                                key={index}
                                index={(pageCount - 1) * 10 + (index + 1)}
                                pageCount={pageCount}
                              />
                            );
                          })}
                      </tbody>
                    </table>
                  </div>

                    {/* ============ Pagination ============ */}
                    {data.listOfWarehouse &&
                      data.listOfWarehouse.totalCount !== undefined && (
                        <div className="pagination-custom">
                          <Pagination
                            activePage={parseInt(pageCount)}
                            itemsCountPerPage={10}
                            totalItemsCount={data.listOfWarehouse.totalCount}
                            pageRangeDisplayed={1}
                            onChange={handlePageChange}
                            prevPageText={<i className="fas fa-chevron-left" />}
                            nextPageText={
                              <i className="fas fa-chevron-right" />
                            }
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
      </div>
    </VendorLayout>
  );
};

export default MyWarehouse;
