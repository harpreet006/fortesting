import React, { useEffect } from "react";
import Layout from "../../../layout/Layout";
import { useHistory } from "react-router-dom";
import CustomerLayout from "../../../layout/CustomerLayout";
import { serviceByPageV2 } from "../../../store/actions/serviceAction";
import { useSelector, useDispatch } from "react-redux";
import { CardLoader } from "../../../components/helper/CustomLoader";
import Pagination from "react-js-pagination";
import axios from "axios";

const Services = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.SERVICEINFO);

  console.log("datttt",data)
  const pageCount = new URLSearchParams(window.location.search).get("page");

  const handlePageChange = (pageNumber) => {
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("page", pageNumber);
    history.push(window.location.pathname + "?" + currentUrlParams.toString());
    dispatch(serviceByPageV2(pageNumber));
  };

  useEffect(() => {
    dispatch(serviceByPageV2(parseInt(pageCount)));
  }, [dispatch, pageCount]);

  const downloadAs = (url, name) => {
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/octet-stream",
        },
        responseType: "blob",
      })
      .then((response) => {
        const a = document.createElement("a");
        const url = window.URL.createObjectURL(response.data);
        a.href = url;
        a.download = name;
        a.click();
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });

  return (
    <Layout>
      <CustomerLayout title={`My Services`}>
        <div className="row">
          <div className="content col-12 service-details">
            <div className="border-bottom d-sm-flex justify-content-between fixed-top-height">
              <div>
                <button
                  onClick={() => history.goBack()}
                  className="btn px-0 text-dark font-weight-bold mr-3"
                >
                  <i className="fas fa-chevron-left pr-3"></i>
                  Services
                </button>
              </div>
            </div>
            <div className="row">
              {data.isLoading ? (
                <CardLoader />
              ) : (
                <div className="col-12">
                  <div className="row py-3">
                    <div className="col-12  table-responsive table-dashboard">
                      <table className="table table-border">
                        <thead>
                          <tr className="theader">
                            
                            <th className="text-center">Service Name</th>
                            <th className="text-center">Category Name</th>
                            <th className="text-center">SubCategory Name</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">View</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.serviceList.data &&
                          data.serviceList.data.length > 0
                            ? data.serviceList.data.map((service, index) => {
                                return (
                                  <tr
                                    key={index}
                                    className={`${
                                      index % 2 !== 0 ? "firstRow" : "secondRow"
                                    }`}
                                  >
                                    
                                    <td className="text-center"> {service?.service?.name}</td>
                                    <td className="text-center"> {service?.service?.category?.name}</td>
                                    <td className="text-center">{service?.service?.subcategory?.name}</td>
                                    <td className="text-center">{service?.status}</td>
                                    <td className="text-center">
                                      <button
                                        onClick={() =>
                                          downloadAs(
                                            service.file,
                                            // `service${service?.service?.id}warehouse${service?.warehouse?.id}`
                                            `service${service?.service?.id}`
                                          )
                                        }
                                        type="button"
                                        className="btn btn-line-blue rounded-0 p-0 toggle-class"
                                      >
                                        <span className="h6 text-blue">
                                          View Certificate
                                        </span>
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })
                            : null}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* ======================= */}
                  <div className="pagination-custom">
                    {data.serviceList.data &&
                      data.serviceList.data !== undefined && (
                        <Pagination
                          activePage={parseInt(pageCount)}
                          itemsCountPerPage={10}
                          totalItemsCount={data.serviceList.totalCount}
                          pageRangeDisplayed={1}
                          onChange={handlePageChange}
                          prevPageText={<i className="fas fa-chevron-left" />}
                          nextPageText={<i className="fas fa-chevron-right" />}
                          hideFirstLastPages={true}
                        />
                      )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CustomerLayout>
    </Layout>
  );
};

export default Services;
