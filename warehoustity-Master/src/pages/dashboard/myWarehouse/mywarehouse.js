import React, { useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import { useHistory } from "react-router-dom";
import MyWarehouseList from "../../../components/dashboard/MyWarehouseList";
import CustomerLayout from "../../../layout/CustomerLayout";
// import SearchBox from '../../../components/helper/SearchBox';
// import {myWarehouseByPage} from '../../../store/actions/customer/myWarehouseAction'
import { useSelector, useDispatch } from "react-redux";
import { CardLoader } from "../../../components/helper/CustomLoader";
// import Pagination from "react-js-pagination";
import { customerBookingAuth } from "../../../store/actions/customer/bookingAction";
import { fetchMappedWarehouse } from "../../../store/actions/warehouseAction";

const Mywarehouse = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.BOOKINGINFO);
  const [mappedWarehouse, setMappedWarehouse] = useState([]);
  console.log("mappedWarehouse=>", mappedWarehouse);

  const pageCount = new URLSearchParams(window.location.search).get("page");

  // const handlePageChange = (pageNumber) => {
  //   let currentUrlParams = new URLSearchParams(window.location.search);
  //   currentUrlParams.set('page', pageNumber);
  //   history.push(window.location.pathname + "?" + currentUrlParams.toString());
  //   dispatch(customerBooking(pageNumber))
  // };

  useEffect(() => {
    dispatch(customerBookingAuth(parseInt(pageCount)));
    dispatch(fetchMappedWarehouse(setMappedWarehouse));
  }, [dispatch, pageCount]);

  function getWarehouse() {
    console.log("bookingList=>", data.bookingList);
    console.log("mappedWarehouse=>", mappedWarehouse);

    if (mappedWarehouse?.length > 0) {
      return mappedWarehouse;
    }

    return data.bookingList;
  }

  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });

  return (
    <Layout>
      <CustomerLayout title={`My warehouses`}>
        <div className="row">
          <div className="content col-12  view-warehouse-details">
            <div className="border-bottom d-sm-flex justify-content-between fixed-top-height">
              <div>
                <button className="btn font-weight-bold">
                  <i
                    onClick={() => history.goBack()}
                    className="fas fa-chevron-left pr-3"
                  ></i>
                  My Warehouse
                </button>
              </div>
            </div>

            {data.isLoading ? (
              <CardLoader />
            ) : (
              <>
                <div className="row">
                  <div className="col-12  table-responsive table-dashboard p-3">
                    <table className="table">
                      <thead className="theader">
                        <tr>
                          <th>Image</th>
                          <th>Warehouse Id</th>
                          <th>Warehouse Name</th>
                          <th>Category</th>
                          <th>Type</th>
                          <th>View</th>
                          {/* <th>Status</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {getWarehouse() && getWarehouse().length > 0
                          ? getWarehouse().map((booking, index) => {
                              return (
                                <MyWarehouseList
                                  key={index}
                                  index={index}
                                  house={booking}
                                />
                              );
                            })
                          : null}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* <div className="pagination-custom">
                { data.myWarehouseList.data && data.myWarehouseList.data !== undefined  && (
                <Pagination
                activePage={parseInt(pageCount)}
                itemsCountPerPage={10}
                totalItemsCount={data.myWarehouseList.totalCount}
                pageRangeDisplayed={1}
                onChange={handlePageChange}
                prevPageText = {<i className="fas fa-chevron-left"/>}
                nextPageText= {<i className="fas fa-chevron-right"/>}
                hideFirstLastPages={true}
                />
                )}
            </div> */}
              </>
            )}
          </div>
        </div>
      </CustomerLayout>
    </Layout>
  );
};

export default Mywarehouse;
