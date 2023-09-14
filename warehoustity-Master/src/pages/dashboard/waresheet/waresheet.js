import React, { useEffect } from "react";
import Layout from "../../../layout/Layout";
import { useHistory } from "react-router-dom";
import WaresheetListCard from "../../../components/dashboard/WaresheetListCard";
import CustomerLayout from "../../../layout/CustomerLayout";
import { allWaresheet } from "../../../store/actions/customer/waresheetAction";
import { useSelector, useDispatch } from "react-redux";
import {
  CardLoader,
  ItemNotFlund,
} from "../../../components/helper/CustomLoader";
import Pagination from "react-js-pagination";

const ManageWaresheet = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.WARESHEETINFO);
  // const read = useSelector((state) => state.SIDEMENU_INFO.read_only);

  const pageCount = new URLSearchParams(window.location.search).get("page")

  const handlePageChange = (pageNumber) => {
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("page", pageNumber);
    history.push(window.location.pathname + "?" + currentUrlParams.toString());
    dispatch(allWaresheet(pageNumber, 8));
  };

  useEffect(() => {
    dispatch(allWaresheet(parseInt(pageCount), 8));
  }, [dispatch, pageCount]);

  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });

  return (
    <Layout>
      <CustomerLayout title="My Waresheet">
        <div className="row">
          <div className="content col-12 create-new-warehouse shadow-sm pb-4">
            <div className="pb-2 border-bottom mb-1 d-sm-flex justify-content-between">
              <button className="btn px-0 text-dark font-weight-bold mr-3">
                <i
                  onClick={() => history.goBack()}
                  className="fas fa-chevron-left pr-3 "
                ></i>
                List of Waresheet{" "}
              </button>

              {/* <button className="btn px-0 text-gray font-weight-bold mr-3">
                {data.waresheetList.default?.length &&
                  data.waresheetList.default[0].waresheetName}
              </button> */}
            </div> 
            <div className="row mx-0">
              <div className="col-12 px-3 border">
                {data.isLoading ? (
                  <CardLoader />
                ) : (
                  <>
                    <div className="row">
                      {data.waresheetList.data &&
                      data.waresheetList.data.length > 0 ? (
                        data.waresheetList.data.map((item, index) => {
                          return (
                            <WaresheetListCard
                              key={index}
                              item={item}
                              pageCount={pageCount}
                              dispatch={dispatch}
                            />
                          );
                        })
                      ) : (
                        <ItemNotFlund mtop="mt-5" message="No Data Available" />
                      )}

                      {/* <div className={`col-12 my-4 ${read ? "d-none" : ""}`}>
                        <Link
                          className="btn btn-deep-primary"
                          to={"/createnewwaresheet"}
                        >
                          Create New Waresheet
                        </Link>
                      </div> */}
                    </div>
                    <div className="pagination-custom">
                      {data.waresheetList.data &&
                        data.waresheetList.data.length > 0 && (
                          <Pagination
                            activePage={parseInt(pageCount)}
                            itemsCountPerPage={10}
                            totalItemsCount={data.waresheetList.totalCount}
                            pageRangeDisplayed={5}
                            onChange={handlePageChange}
                            prevPageText={<i className="fas fa-chevron-left" />}
                            nextPageText={
                              <i className="fas fa-chevron-right" />
                            }
                            hideFirstLastPages={true}
                          />
                        )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </CustomerLayout>
    </Layout>
  );
};

export default ManageWaresheet;
