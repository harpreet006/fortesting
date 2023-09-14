import React, { useEffect } from "react";
import Layout from "../../layout/Layout";
import { useLocation, useHistory } from "react-router-dom";
import CustomerLayout from "../../layout/CustomerLayout";
import { customerGstByPage } from "../../store/actions/customer/myWarehouseAction";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "react-js-pagination";
import CustomerGstList from "../../components/dashboard/CustomerGstList";

const GST = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.MYWAREHOUSEINFO);
  const pageCount = new URLSearchParams(window.location.search).get("page");
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(customerGstByPage(parseInt(pageCount)));
  }, [pathname, dispatch, pageCount]);

  const handlePageChange = (pageNumber) => {
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("page", pageNumber);
    history.push(window.location.pathname + "?" + currentUrlParams.toString());
    dispatch(customerGstByPage(pageNumber));
  };

  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });

  return (
    <Layout>
      <CustomerLayout title={`GST Update`}>
        <div className="row">
          <div className="content col-12">
            <div className="d-sm-flex justify-content-between fixed-top-height">
              <div>
                <button className="btn px-0 text-dark font-weight-bold mr-3">
                  <i
                    onClick={() => history.goBack()}
                    className="fas fa-chevron-left pr-3"
                  ></i>
                  GST Update
                </button>
              </div>
            </div>
            <div className="row border-top py-2">
              <div className="col-12  table-responsive table-dashboard ">
                <table className="table border">
                  <thead  className="theader">
                    <tr>
                      <th className="text-nowrap">Sr. No.</th>
                      <th className="text-nowrap">Warehouse ID</th>
                      <th>WH Address</th>
                      <th>State</th>
                      <th>GST NO</th>
                      <th>Create On</th>
                      <th>Updae GST</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.gstCustomer &&
                    data.gstCustomer.data &&
                    data.gstCustomer.data.length > 0
                      ? data.gstCustomer.data.map((value, index) => {
                          return (
                            <CustomerGstList
                              key={index}
                              value={
                                value &&
                                value.warehouse &&
                                value.warehouse.warehouseContactDetailInfo &&
                                value.warehouse.warehouseContactDetailInfo
                                  .address
                              }
                              index={index}
                              booking={value.id}
                              checkId={value.warehouse.id}
                              warehouse={value.warehouse}
                              gstid={value.gst ? value.gst.id : null}
                              viewMood={value.customerGstUpdated}
                              create_at = {value?.created_at}
                            />
                          );
                        })
                      : null}
                  </tbody>
                </table>

                <div className="pagination-custom">
                  {data.gstCustomer && data.gstCustomer.data !== undefined && (
                    <Pagination
                      activePage={parseInt(pageCount)}
                      itemsCountPerPage={10}
                      totalItemsCount={data.gstCustomer.totalCount}
                      pageRangeDisplayed={5}
                      onChange={handlePageChange}
                      prevPageText={<i className="fas fa-chevron-left" />}
                      nextPageText={<i className="fas fa-chevron-right" />}
                      hideFirstLastPages={true}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* <div className="row p-3">
              {
                data.gstCustomer && data.gstCustomer.data && data.gstCustomer.data.length > 0 ?
                  data.gstCustomer.data.map((value, index) => {
                    return (
                      <GstList value={value && value.warehouse && value.warehouse.warehouseContactDetailInfo && value.warehouse.warehouseContactDetailInfo.address}
                        index={index} booking={value.id} checkId={value.warehouse.id} gstid={value.gst ? value.gst.id : null} viewMood={value.customerGstUpdated} />
                    )
                  })
                  :
                  null
              }

            </div> */}
          </div>
        </div>
      </CustomerLayout>
    </Layout>
  );
};

export default GST;
