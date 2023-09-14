import React, { useEffect } from "react";
import Layout from "../../../layout/Layout";
import { Link, useHistory } from "react-router-dom";
import CustomerLayout from "../../../layout/CustomerLayout";
import { serviceFavorite } from "../../../store/actions/serviceAction";
import { useSelector, useDispatch } from "react-redux";
import {
  ItemNotFlund,
} from "../../../components/helper/CustomLoader";
import { useToasts } from "react-toast-notifications";
import {
  removeFavorite,
} from "../../../store/actions/serviceAction";
import { confirmAlert } from "react-confirm-alert";

const ServiceFavorite = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const data = useSelector((state) => state.SERVICEINFO);

  const pageCount = new URLSearchParams(window.location.search).get("page");

  useEffect(() => {
    dispatch(serviceFavorite(100));
  }, [dispatch, pageCount]);

  const addToFavorite = (id) => {
    confirmAlert({
      // title: 'Confirm to submit',
      message: "Are you sure to remove this service",
      buttons: [
        {
          label: "Yes",
          onClick: () =>
          dispatch(removeFavorite(id, addToast))
        },
        {
          label: "No"
        },
      ],
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
                  className="btn px-0 text-dark font-weight-bold mr-3"
                >
                  <i onClick={()=>history.goBack()} className="fas fa-chevron-left pr-2"></i>
                  Services Favorite
                </button>
              </div>
            </div>

            <div className="row">
              {data.serviceList.data?.length > 0 ? (
                data.serviceList.data?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="col-xl-4 col-lg-4 col-md-6 py-3 "
                    >
                      <div className="card shadow">
                        <div className="img-holder">
                          {item?.service?.images &&
                          item?.service?.images.length > 0 ? (
                            <img
                              className="img-fluid w-100"
                              src={item?.service?.images[0]?.imageURL}
                              alt="Card warehouse cap"
                              style={{ height: 150 }}
                            />
                          ) : (
                            <img
                              className="img-fluid w-100"
                              src="/assets/images/imageNotFound1.png"
                              alt="Card warehouse cap"
                              style={{ height: 150 }}
                            />
                          )}
                        </div>
                        <div className="card-body">
                          <div>
                            <span>
                              <b>Category : </b> {item?.service?.category?.name}
                            </span>
                            <br/>
              
                            <span>
                              <b>Sub Category : </b>{" "}
                              {item?.service?.subcategory?.name}
                            </span>
                            <br/>
                            
                            <span>
                              <b>Service : </b> {item?.service?.name}
                            </span>
                          </div>

                          {/* <h6 style={{ fontSize: 12 }}>
                            <span className="font-weight-bold">
                              Sub Category Name :
                            </span>{" "}
                            {item?.subcategory?.name?.slice(0, 25)}..
                          </h6> */}
                          {/* <p className="card-text" style={{ height: "20px" }}>
                            {item?.service?.description?.slice(0, 25)} &nbsp;
                            <Link to={`/service-detail/${item?.id}`}>
                              read more
                            </Link>
                          </p> */}
                          <div className="text-center d-flex">
                            <i
                              onClick={() => addToFavorite(item?.service?.id)}
                              className="fas fa-trash-alt actionIconDelete mt-2 mr-2"
                            ></i>
                            <Link
                              to={`/service-detail/${item?.service?.id}`}
                              className="btn btn-deep-primary btn-block"
                            >
                              View Details
                            </Link>
                            {/* <Link
                              to={`/service-detail/${item?.id}`}
                              className="btn btn-line-dark-primary rounded-0 px-3"
                            >
                              View Details
                            </Link> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <ItemNotFlund message="Services Not Found" />
              )}
            </div>

            {/* 
            <div className="row">
              {data.isLoading ? (
                <CardLoader />
              ) : (
                <div className="col-12 table-responsive table-row-border">
                  <div className="row">
                    <div className="col-12 p-0 border table-responsive table-dashboard">
                      {data.serviceList.data &&
                      data.serviceList.data.length > 0 ? (
                        <table className="table">
                          <thead className="theader">
                            <tr>
                              <th>Service Id</th>
                              <th>Service Name</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.serviceList.data.map((service, index) => {
                              return (
                                <tr className={`${index % 2 !== 0 ? "firstRow" : "secondRow"}`}>
                                  <td> {service?.service.id}</td>
                                  <td> {service?.service.name}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      ) : (
                        <ItemNotFlund message="No Data Available" />
                      )}
                    </div>
                  </div>

                  {data.serviceList.totalCount > 10 && (
                    <div className="pagination-custom">
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
                    </div>
                  )}
                </div>
              )}
            </div> */}
          </div>
        </div>
      </CustomerLayout>
    </Layout>
  );
};

export default ServiceFavorite;
