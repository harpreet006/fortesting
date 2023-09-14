import React, { useEffect } from "react";
import VendorLayout from "../../layout/VendorLayout";
import MenuDrawer from "../../components/vendor/MenuDrawer";
import WarehouseList from "../../wrapper/vendor/vendorWarehouse/WarehouseListRejected";
import { fetchWarehouseByPageRejected } from "../../store/actions/vendor/warehouseList";
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
    dispatch(fetchWarehouseByPageRejected(parseInt(pageCount)));
  }, [dispatch, pageCount]);

  const handlePageChange = (pageNumber) => {
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("page", pageNumber);
    history.push(window.location.pathname + "?" + currentUrlParams.toString());
    dispatch(fetchWarehouseByPageRejected(pageNumber));
  };

  return (
    <VendorLayout>
      <div className="content-admin px-3 mt-2">
   
      
        <div className="row justify-content-end align-items-center px-3 mx-0">
        <MenuDrawer />
        <h5 className="backButton text-dark px-0">
          <i
            onClick={() => history.goBack()}
            className="fas fa-chevron-left mr-3 cursorPointer"
          ></i>
          Rejected By WHS
        </h5>

          <div className="col-12 px-0">
            <div className="row">
              <div className="col-12 table-responsive  table-gray-admin">
                {data.isLoading ? (
                  <CustomLoader />
                ) : data.isError !== "" ? (
                  <ErrorCard message={data.isError} />
                ) : (
                  <>
                  <div className="bg-white p-3">
                  <table className="table">
                      <thead className="">
                        <tr>
                          <th className="text-nowrap  bg-dark text-white px-2">Warehouse ID</th>
                          <th className="text-nowrap bg-dark text-white px-2">Display Name</th>
                          <th className="text-nowrap bg-dark text-white px-2">Warehouse Category</th>
                          <th className="bg-dark text-white px-2">Status</th>
                          <th className="bg-dark text-white px-2">Action</th>
                          <th className="text-center bg-dark text-white px-2">Preview</th>
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
                              />
                            );
                          })}

                        {/* <tr> 
                        <td>763247AK</td>
                        <td>Delhi House</td>
                        <td>Genral Warehouse</td>
                        <td>Pending</td>
                        <td><Link to="#" className="btn px-0 text-deep-blue font-weight-bold text-uppercase">Update</Link></td>
                        <td className="text-center"><Link to="#" className="btn font-weight-bold px-1"><i className="fas fa-eye"></i></Link></td> 
                      </tr>  
                      <tr> 
                        <td>763247AH</td>
                        <td>Delhi House</td>
                        <td>Genral Warehouse</td>
                        <td>Draft</td>
                        <td><Link to="#" className="btn px-0 text-deep-blue font-weight-bold text-uppercase">Update</Link></td>
                        <td className="text-center"><Link to="#" className="btn font-weight-bold px-1"><i className="fas fa-eye"></i></Link></td> 
                      </tr>   
                      <tr> 
                        <td>763247AH</td>
                        <td>3Fleet Ware</td>
                        <td>FTWZ</td>
                        <td>Live</td>
                        <td><Link to="#" className="btn px-0 text-deep-blue font-weight-bold text-uppercase">Update</Link></td>
                        <td className="text-center"><Link to="#" className="btn font-weight-bold px-1"><i className="fas fa-eye"></i></Link></td> 
                      </tr> */}
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
