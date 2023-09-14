import React, { useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import RFQManageList from "../../../wrapper/customer/rfq/RFQManageList";
import CustomerLayout from "../../../layout/CustomerLayout";
// import SearchBox from '../../../components/helper/SearchBox';
import BrowserTitle from "../../../components/helper/BrowserTitle";
import {
  rfqCustomerAuth,
  rfqList,
} from "../../../store/actions/customer/rfqAction";
import { useSelector, useDispatch } from "react-redux";
import {
  CardLoader,
  ItemNotFlund,
} from "../../../components/helper/CustomLoader";
import Pagination from "react-js-pagination";
import { useHistory, Link } from "react-router-dom";
// import axios from '../../../api/axios-auth';
// import Spinner from 'react-bootstrap/Spinner';
import FormSuccess from "../../../components/helper/FormSuccess";

const ManageRfq = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.CUSTOMER_RFQ_INFO);
  const read = useSelector((state) => state.SIDEMENU_INFO.read_only);
  const pageCount = new URLSearchParams(window.location.search).get("page");
  const [success, setSuccess] = useState(null);

  const handlePageChange = (pageNumber) => {
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("page", pageNumber);
    history.push(window.location.pathname + "?" + currentUrlParams.toString());
    dispatch(rfqCustomerAuth(pageNumber));
  };

  useEffect(() => {
    dispatch(rfqCustomerAuth(parseInt(pageCount)));

    return () => {
      dispatch(rfqList([]));
    };
  }, [dispatch, pageCount]);

  // const [rfqLoad, setRfqLoad] = useState(false)

  // const createAndRedirectOnRfq = () => {
  //   setRfqLoad(true)

  //   dispatch({ payload: {}, type: "INITIAL_EMPTY" })
  //   dispatch({ payload: null, type: "CART_FAVORITE" })
  //   dispatch({ payload: [], type: "WAREHOUSE_LIST" })

  //   let data = {
  //     "warehouseSpaceRequired": 0,
  //     "warehouses": [],
  //     "location": {
  //       "city": {
  //         "name": ""
  //       },
  //       "area": {
  //         "name": ""
  //       }
  //     }
  //   }

  //   axios.post(`/api/v1/customerrfq`, data).then(response => {
  //     let res = JSON.parse(response.data)
  //     if (res.statusCode === 200) {
  //       dispatch(initialRfqByIdAndType(res.data.id, "customerRfq"))
  //       history.replace(`/createnewrfq?rfqid=${res.data.id}&hide=${false}`)
  //     }
  //   }).catch((error) => {
  //   }).then(() => {
  //     setRfqLoad(false)
  //     console.log("-----always executes");
  //   })
  // }

  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });

  return (
    <Layout>
      <BrowserTitle title="RFQ" />

      {success && (
        <FormSuccess onClick={() => setSuccess(null)} message={success} />
      )}

      <CustomerLayout title={`RFQ`}>
        <div className="row shadow-sm">
          <div className="content col-12  mb-0 pt-3">
            <div className="d-sm-flex justify-content-between">
              <span className=" px-0 text-dark font-weight-bold mr-3 mb-2 text-uppercase">
                <i
                  onClick={() => history.goBack()}
                  className="fas fa-chevron-left pr-3"
                ></i>
                Manage RFQ  alsjdflaskdjlksdjf
              </span>
              <Link
                to="/rfq-create"
                //  onClick={createAndRedirectOnRfq}
                type="button"
                className={`btn btn-deep-primary px-2 text-white py-1 ${
                  read ? "d-none" : ""
                }`}
              >
                {/* {rfqLoad ? <Spinner animation="border" /> : null} */}
                Create RFQ
              </Link>
            </div>

            {data.isLoading ? (
              <CardLoader />
            ) : (
              <>
                <div className="row mt-1 border-top">
                  <div className="col-12  table-responsive table-dashboard p-3">
                    {data.rfqList.data && data.rfqList.data.length > 0 ? (
                      <table className="table">
                        <thead className="theader">
                          <tr>
                            <th className="w-100px">S. No</th>
                            <th>RFQ ID</th>
                            <th>Created On</th>
                            <th className="text-center">Rfq Open List</th>
                            <th className="text-center">Rfq Warehouse List</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.rfqList.data.map((item, index) => (
                            <RFQManageList
                              item={item}
                              index={(pageCount - 1) * 10 + (index + 1)}
                              key={index}
                              pageCount={pageCount}
                              setSuccess={setSuccess}
                            />
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <ItemNotFlund message="No Data Available" />
                    )}

                    <div className="pagination-custom">
                      <Pagination
                        activePage={parseInt(pageCount)}
                        itemsCountPerPage={10}
                        pageRangeDisplayed={5}
                        totalItemsCount={
                          data.rfqList ? data.rfqList.totalCount : null
                        }
                      
                        onChange={handlePageChange}
                        prevPageText={<i className="fas fa-chevron-left" />}
                        nextPageText={<i className="fas fa-chevron-right" />}
                        hideFirstLastPages={true}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </CustomerLayout>
    </Layout>
  );
};

export default ManageRfq;
