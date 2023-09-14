import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { Link, useParams } from "react-router-dom";
import {
  serviceByCategryId,
  serviceNewBySubId,
  getSubCategoryById,
  serviceCategoryByPage,
} from "../../store/actions/serviceAction";
import { useSelector, useDispatch } from "react-redux";
import { CardLoader, ItemNotFlund } from "../../components/helper/CustomLoader";

const Service = () => {
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const data = useSelector((state) => state.SERVICEINFO);

  const isVas = new URLSearchParams(window.location.search).get("vas");
// const isActive = true

const currentUrl = window.location.href;

console.log("url",currentUrl)

console.log("isVas",isVas);
  useEffect(() => {
    dispatch(getSubCategoryById(categoryId));
    dispatch(serviceByCategryId(categoryId));
    dispatch(serviceCategoryByPage());
  }, [dispatch, categoryId]);

  const callService = (id) => {
    if (id === "ALL") {
      dispatch(serviceByCategryId(categoryId));
    } else {
      dispatch(serviceNewBySubId(id));
    }
  };

  function checkVasService() {
  
    if (data.serviceList?.length > 0) {
      // return data.serviceList.filter((item) => item?.active === true && item?.category?.active === true && item?.subcategory?.active === true);
      // return data.serviceList.filter((item) => item?.vas === true);

    
      
      return data.serviceList.filter((item) => item?.vas === Boolean(isVas));
    }
    return data.serviceList;
  }

  function getCategory() {
    if (data.categoryList?.length > 0) {
      return data.categoryList.find((item) => item.id === parseInt(categoryId));
    }
  }

  return (
    <Layout>
      <section className="about-deatail pt-5">
        <div className="container mt-5">
          <div className="row">
            <div className="section-heading col-xl-9 mb-0">
              <h3 className="font-weight-bold">Services</h3>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 col-12">
              <p>
                {" "}
                <b className="text-black font-heading">Category Name : </b>
                {getCategory()?.name}
              </p>
            </div>

            <div className="col-md-6 col-12">
              <div className="form-group mb-0">
                <div className="row">
                  <div className="col-md-3 col-12">
                    <label htmlFor="subcat" className="mt-1">
                      <b className="font-heading font-weight-bold">Sub Category</b>
                    </label>
                  </div>
                  <div className="col-md-9 col-12">
                    <select
                      className="form-control form-select"
                      onChange={(e) => {
                        callService(e.target.value);
                      }}
                      id="subcat"
                    >
                      <option value={"ALL"}>--- All ---</option>
                      {data.subCategoryList &&
                        data.subCategoryList.length > 0 &&
                        data.subCategoryList.map((subCat, index) => {
                          return (
                            <option key={index} value={subCat?.id}>
                              {" "}
                              {subCat?.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="row justify-content-end align-items-center mx-0">
            <div className="col-12 py-2 pr-2 mb-3  tabs-scroll">
              <ul
                className="nav nav-pills admin-tabs-blue"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item h6 font-weight-bold">Sub Categories</li>
                <li className="nav-item">
                  <button
                    onClick={() => callService("ALL")}
                    className={`btn btn-deep-primary btn-block ${
                      activeLink === "ALL" ? "vendorActive" : ""
                    }`}
                  >
                    All
                  </button>
                </li>

                {data.subCategoryList && data.subCategoryList.length > 0
                  ? data.subCategoryList.map((subCat, index) => {
                      return (
                        <li className="nav-item" key={index}>
                          <button
                            onClick={() => callService(subCat?.id)}
                            className={`btn btn-deep-primary btn-block ${
                              activeLink === subCat?.id ? "vendorActive" : ""
                            } `}
                          >
                            {subCat?.name}
                          </button>
                        </li>
                      );
                    })
                  : null}
              </ul>
            </div>
          </div> */}

          {data.isLoading ? (
            <CardLoader />
          ) : (
            <div className="row">
              
              {checkVasService()?.length > 0 ? (
                checkVasService()?.map((item, index) => {

                  
                  return (
                    
                    <div
                      key={index}
                      className="col-xl-3 col-lg-4 col-md-6 py-3 "
                    >
                     
                      <div className="card shadow">
                        <div className="img-holder">
                          {item?.images && item?.images.length > 0 ? (
                            <img
                              className="img-fluid w-100"
                              src={item?.images[0]?.imageURL}
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
                          <div  >

                          <span>
                            <b>Category : </b> {getCategory()?.name}
                          </span>
                          <br/>
                          <span>
                            <b>Sub Category : </b> {item?.subcategory?.name}
                          </span><br/>
                          <span>
                            <b>Service : </b> {item?.name}
                          </span>

                          </div>
                        
                          {/* <h6 style={{ fontSize: 12 }}>
                            <span className="font-weight-bold">
                              Sub Category Name :
                            </span>{" "}
                            {item?.subcategory?.name?.slice(0, 25)}..
                          </h6> */}
                          {/* <p className="card-tex" style={{ height: "20px" }}>
                            {item?.description?.slice(0, 25)}  &nbsp;
                            <Link to={`/service-detail/${item?.id}`} className="text-deep-primary">
                            Read more
                            </Link>
                          </p> */}
                          <div className="text-center">
                            <Link
                              to={`/service-detail/${item?.id}`}
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
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Service;
