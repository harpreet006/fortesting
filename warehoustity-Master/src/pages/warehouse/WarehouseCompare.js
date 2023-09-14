import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { useHistory } from "react-router-dom";
import { getWarehouseCompare } from "../../store/actions/customer/compareAction";
import {
  favoriteAdd,
  favoriteRemove,
  favoriteIds,
} from "../../store/actions/customer/favoriteAction";
import { useSelector, useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import BreadcrumbLayout from "../../layout/BreadcrumbLayout";
import { addToCart } from "../../store/actions/customer/cartAction";
import { Link } from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import axiosauth from "../../api/axios-auth";
import { CardLoader } from "../../components/helper/CustomLoader";

import "./compare.scss";
const WarehouseCompare = () => {
  const { addToast } = useToasts();
  // let options={
  //   name:'rohan'
  // }
  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };
  const [flooractive, setflooractive] = useState(false);
  const [officespaceactive, setofficespaceactive] = useState(false);
  const [mhinfraactive, setmhinfraactive] = useState(false);
  const [safetysecurity, setsafetysecurity] = useState(false);

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item) => {
    // the item selected
    // setSearchForm({...searchForm, "location":item.name})
    console.log(item);
    console.log("yahafaetg", wh3, wh4);
    if (wh3 === null && wh4 === null) {
      let currentUrlParams = new URLSearchParams(window.location.search);
      currentUrlParams.set("wh3", item.id);
      history.push(
        window.location.pathname + "?" + currentUrlParams.toString()
      );
    }
    if (wh4 === null && wh3) {
      let currentUrlParams = new URLSearchParams(window.location.search);
      currentUrlParams.set("wh4", item.id);
      history.push(
        window.location.pathname + "?" + currentUrlParams.toString()
      );
    }
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (item) => {
    return item;
    // return (<p dangerouslySetInnerHTML={{__html: '<strong>'+item+'</strong>'}}></p>); //To format result as html
  };
  const dispatch = useDispatch();
  const [loading, setloading] = useState(true);
  const history = useHistory();
  const data = useSelector((state) => state.COMPARE_INFO);
  const authData = useSelector((state) => state);
  const wh1 = new URLSearchParams(window.location.search).get("wh1");
  const wh2 = new URLSearchParams(window.location.search).get("wh2");
  const wh3 = new URLSearchParams(window.location.search).get("wh3");
  const wh4 = new URLSearchParams(window.location.search).get("wh4");
  const [itInfraactive, setitInfraactive] = useState();

  const addCart = (warehouseId) => {
    if (authData.authenticated && warehouseId) {
      dispatch(
        addToCart(
          {
            type: "warehouse",
            warehouse: warehouseId,
          },
          addToast
        )
      );
    } else {
      addToast("Please Login", { appearance: "error", autoDismiss: true });
    }
  };
  const [options, setoptions] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    axiosauth
      .post(`/api/v1/warehouses/filterwarehouse?page=${1}&limit=${10}`, {
        warehouseName: "",
      })
      .then((response) => {
        let res = JSON.parse(response.data);
        let arr = [];
        if (wh1) {
          arr.push(parseInt(wh1));
        }
        if (wh2) {
          arr.push(parseInt(wh2));
        }
        if (wh3) {
          arr.push(parseInt(wh3));
        }

        if (wh4) {
          arr.push(parseInt(wh4));
        }

        if (res.statusCode === 200) {
          let restoption = [];

          for (let i = 0; i < res.data.length; i++) {
            if (arr.includes(res.data[i].id) === false) {
              restoption.push({
                name: res.data[i].id,
                id: res.data[i].id,
              });
            }
          }
          setoptions(restoption);
        } else {
        }
      })
      .catch((error) => {})
      .then(() => {});
    dispatch(
      getWarehouseCompare({
        warehouses: [wh1, wh2, wh3, wh4],
      })
    );
    // setloading(false)
    setTimeout(function () {
      setloading(false);
    }, 5000);
  }, [dispatch, wh1, wh2, wh3, wh4]);

  const addToFavorite = (id) => {
    if (
      authData.authenticated &&
      authData.FAVORITEINFO?.favoriteListIds?.includes(id)
    ) {
      dispatch(favoriteRemove(id, addToast));
    } else if (authData.authenticated) {
      dispatch(favoriteAdd(id, addToast));
    } else {
      addToast("Please Login", { appearance: "error", autoDismiss: true });
    }
  };

  // Favorite compare
  useEffect(() => {
    dispatch(favoriteIds());
  }, [dispatch]);

  return (
    <Layout>
      <BreadcrumbLayout
        title={
          <>
            <span onClick={() => history.goBack()} className="cursorPointer">
              {" "}
              Warehouse &nbsp;{" "}
            </span>{" "}
            / Warehouse Compare
          </>
        }
      />

      <section className="filter-warehouse py-0">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 text-center mb-3">
              <h4 className="pl-1">Warehouse Comparison</h4>
            </div>
          </div>

          {loading ? <CardLoader loaderCard={false} /> : null}

          <div style={{ display: loading ? "none" : "" }} className="row">
            <div className="col-12 table-responsive text-nowrap">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td className="col-xl-2"></td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              {item.warehouseImagesInfo.coverImage.url ===
                              "/assets/images/logo.png" ? (
                                <td>
                                  <div
                                    style={{
                                      height: "224px",
                                      objectFit: "cover",
                                    }}
                                    className="card custom-warehouse-detail custom-shadow my-3"
                                  >
                                    {/* <div className={`card-bookmark ${authData.FAVORITEINFO.favoriteListIds.includes(item?.id) ? "active-book" : ""}`}>
      <button className="px-2 pt-0 btn"><i onClick={()=>addToFavorite(item.id)} className={`fas fa-heart`} /></button>
    </div> */}
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: "84px",
                                        marginLeft: "45px",
                                      }}
                                    >
                                      <div className="img-holder card-img">
                                        <img
                                          src={
                                            item?.warehouseImagesInfo
                                              ?.coverImage?.url
                                          }
                                          alt=""
                                          className="img-fluid"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              ) : (
                                <td>
                                  <div className="card custom-warehouse-detail custom-shadow my-3">
                                    <div
                                      className={`card-bookmark ${
                                        authData.FAVORITEINFO.favoriteListIds.includes(
                                          item?.id
                                        )
                                          ? "active-book"
                                          : ""
                                      }`}
                                    >
                                      <button className="px-2 pt-0 btn">
                                        <i
                                          onClick={() => addToFavorite(item.id)}
                                          className={`fas fa-heart`}
                                        />
                                      </button>
                                    </div>
                                    <div className="card card-overlay">
                                      <div className="img-holder ">
                                        <img
                                          src={
                                            item?.warehouseImagesInfo
                                              ?.coverImage?.url
                                          }
                                          alt=""
                                          className="img-fluid"
                                          style={{
                                            height: "224px",
                                            width: "526px",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            objectFit: "cover",
                                          }}
                                        />
                                      </div>
                                      <div className="card-img-overlay d-flex align-items-center">
                                        <div className="card-body p-0">
                                          <div>
                                            <div className="d-flex justify-content-center my-3">
                                              <Link
                                                to={`/wh-detail/${item.id}`}
                                                className="btn btn-light font-weight-bold"
                                              >
                                                View Detail
                                              </Link>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              )}
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr>
                    <td />
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td>
                                {item.id === "" ? (
                                  <div className="">
                                    <form className="row">
                                      {/* <div className="col-md-9">
              <input type="text" placeholder="Search Product by title " onChange={e => setSearch(e.target.value)} /> */}
                                      <div className="input-group px-2">
                                        {/* <input
                type='text'
                className='form-control col-md-10 col-lg-10'
                placeholder='Search Warehouse'
                // onChange={(e) => setSearch(e.target.value)}
                required
              /> */}
                                        <div
                                          className=" col-md-12 col-lg-12"
                                          style={{ width: 200 }}
                                        >
                                          <ReactSearchAutocomplete
                                            styling={{
                                              height: "44px",
                                              border: "1px solid #dfe1e5",
                                              borderRadius: "24px",
                                              backgroundColor: "white",
                                              boxShadow:
                                                "rgba(32, 33, 36, 0.28) 0px 1px 6px 0px",
                                              hoverBackgroundColor: "#eee",
                                              color: "#212121",
                                              fontSize: "16px",
                                              fontFamily: "Arial",
                                              iconColor: "grey",
                                              lineColor: "rgb(232, 234, 237)",
                                              placeholderColor: "grey",
                                              clearIconMargin: "3px 14px 0 0",
                                              searchIconMargin: "0 0 0 16px",
                                            }}
                                            // resultStringKeyName="id"
                                            placeholder="Search Warehouse"
                                            items={options}
                                            onSearch={handleOnSearch}
                                            onHover={handleOnHover}
                                            onSelect={handleOnSelect}
                                            onFocus={handleOnFocus}
                                            autoFocus
                                            formatResult={formatResult}
                                          />
                                        </div>
                                        {/* <div className='input-group-prepend col-md-2 col-lg-2' style={{ paddingLeft: '0px',color:"#5A86C5" }}>
                <button style={{backgroundColor:"#5A86C5"}} className='input-group-text'
                //  onClick={() => search1()}
                 >
                  <i style={{color:"white"}}  className='pe-7s-search' />
                </button>
              </div> */}
                                      </div>{" "}
                                    </form>
                                  </div>
                                ) : (
                                  <div className="d-flex justify-content-between">
                                    <h6 className="card-title">
                                      ID: {item?.warehouseId} <br />
                                      <span style={{ fontSize: 12 }}>
                                        {item.warehouseContactDetailInfo
                                          ?.address?.district +
                                          " " +
                                          item.warehouseContactDetailInfo
                                            ?.address?.state}
                                      </span>
                                    </h6>

                                    {!authData.CARTINFO.cartIdList?.includes(
                                      parseInt(item.id)
                                    ) ? (
                                      <i
                                        onClick={() => {
                                          addCart(item.id);
                                        }}
                                        className="fas fa-shopping-cart cursorPointer"
                                      ></i>
                                    ) : (
                                      <i className="fas fa-shopping-cart text-warning cursorPointer"></i>
                                    )}
                                  </div>
                                )}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr style={{ border: "0.5px solid #808080" }}>
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Warehouse Category:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <td
                              key={index}
                              style={{ borderRight: "0.5px solid #808080" }}
                            >
                              {" "}
                              <h6 className="col-6 text-gray">
                                {item?.category.categoryName}
                              </h6>{" "}
                            </td>
                          );
                        })
                      : null}
                  </tr>
                  <tr style={{ border: "0.5px solid #808080" }}>
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Warehouse Type:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                key={index}
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item?.type.type}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr style={{ border: "0.5px solid #808080" }}>
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Total Area:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item &&
                                    item.storageSpaceInfo &&
                                    item.storageSpaceInfo.totalArea}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr style={{ border: "0.5px solid #808080" }}>
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Total Available Space:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item &&
                                    item.storageSpaceInfo &&
                                    item.storageSpaceInfo.totalAvailableSpace}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  {/* <tr style={{border:"0.5px solid #808080"}}>
                  <td style={{borderRight:"0.5px solid #808080"}} className="font-heading">Structure Type:</td>
                  {data.compareList && data.compareList.length>0 ? 

data.compareList.map((item, index)=>{
    
 return(<>
                  <td style={{borderRight:"0.5px solid #808080"}}> <h6 className="col-6 text-gray">{item.structureType}</h6> </td> 
                 </>
                  )

}):null}
                </tr> */}
                  <tr style={{ border: "0.5px solid #808080" }}>
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      No Of Shifts:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item &&
                                    item.storageSpaceInfo &&
                                    item.storageSpaceInfo.noOfShift}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr>
                    <td className="font-heading">
                      Storage Space:
                      <span onClick={() => setflooractive(!flooractive)}>
                        {flooractive ? (
                          <img src="/assets/images/arrup.png" alt=""></img>
                        ) : (
                          <img src="/assets/images/arrdown.png" alt=""></img>
                        )}
                      </span>
                    </td>
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: flooractive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Storage Type:{" "}
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.storageSpaceInfo &&
                                      item.storageSpaceInfo.storageType}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>

                  <tr style={{ display: flooractive ? "" : "none" }}>
                    <td className="font-heading">Floor:</td>
                  </tr>
                  <tr style={{ display: flooractive ? "" : "none" }}>
                    <td className="font-heading"> 1. Basement(Feet):</td>
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: flooractive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Length:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          let abasement =
                            item &&
                            item.storageSpaceInfo &&
                            item.storageSpaceInfo.floors &&
                            item.storageSpaceInfo.floors.find(
                              (o) => o.floorType === "basement"
                            );

                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : abasement.floorDimension.length}

                                  {/* {item && item.storageSpaceInfo && item.storageSpaceInfo.storageType} */}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: flooractive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Breadth:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          let abasement =
                            item &&
                            item.storageSpaceInfo &&
                            item.storageSpaceInfo.floors &&
                            item.storageSpaceInfo.floors.find(
                              (o) => o.floorType === "basement"
                            );

                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : abasement.floorDimension.breath}
                                </h6>
                                {/* <h6 className="col-6 text-gray">{item && item.storageSpaceInfo && item.storageSpaceInfo.storageType}</h6> */}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: flooractive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Height:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          let abasement =
                            item &&
                            item.storageSpaceInfo &&
                            item.storageSpaceInfo.floors &&
                            item.storageSpaceInfo.floors.find(
                              (o) => o.floorType === "basement"
                            );

                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : abasement.floorDimension.height}
                                </h6>
                                {/* <h6 className="col-6 text-gray">{item && item.storageSpaceInfo && item.storageSpaceInfo.storageType}</h6> */}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: flooractive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Area sqft:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          let abasement =
                            item &&
                            item.storageSpaceInfo &&
                            item.storageSpaceInfo.floors &&
                            item.storageSpaceInfo.floors.find(
                              (o) => o.floorType === "basement"
                            );

                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : abasement.floorDimension.length *
                                      abasement.floorDimension.breath}
                                  {/* {abasement.floorDimension.length*abasement.floorDimension.breath} */}
                                </h6>
                                {/* <h6 className="col-6 text-gray">{item && item.storageSpaceInfo && item.storageSpaceInfo.storageType}</h6> */}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr style={{ display: flooractive ? "" : "none" }}>
                    <td className="font-heading"> 2. Ground Floor(Feet):</td>
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: flooractive ? "" : "none",
                    }}
                  >
                    <td
                      style={{
                        borderRight: "0.5px solid #808080",
                        display: flooractive ? "" : "none",
                      }}
                      className="font-heading"
                    >
                      Length:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          let agroundFloor =
                            item &&
                            item.storageSpaceInfo &&
                            item.storageSpaceInfo.floors &&
                            item.storageSpaceInfo.floors.find(
                              (o) => o.floorType === "groundFloor"
                            );

                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : agroundFloor.floorDimension.length}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: flooractive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Breadth:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          let agroundFloor =
                            item &&
                            item.storageSpaceInfo &&
                            item.storageSpaceInfo.floors &&
                            item.storageSpaceInfo.floors.find(
                              (o) => o.floorType === "groundFloor"
                            );

                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : agroundFloor.floorDimension.breath}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: flooractive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Height:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          let agroundFloor =
                            item &&
                            item.storageSpaceInfo &&
                            item.storageSpaceInfo.floors &&
                            item.storageSpaceInfo.floors.find(
                              (o) => o.floorType === "groundFloor"
                            );

                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : agroundFloor.floorDimension.height}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: flooractive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Area Sqft:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          let agroundFloor =
                            item &&
                            item.storageSpaceInfo &&
                            item.storageSpaceInfo.floors &&
                            item.storageSpaceInfo.floors.find(
                              (o) => o.floorType === "groundFloor"
                            );

                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : agroundFloor.floorDimension.length *
                                      agroundFloor.floorDimension.breath}
                                </h6>
                                {/* <h6 className="col-6 text-gray">{item && item.storageSpaceInfo && item.storageSpaceInfo.storageType}</h6> */}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr style={{ display: flooractive ? "" : "none" }}>
                    <td className="font-heading"> 3. First Floor(Feet):</td>
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: flooractive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Length:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          let afirstFloor =
                            item &&
                            item.storageSpaceInfo &&
                            item.storageSpaceInfo.floors &&
                            item.storageSpaceInfo.floors.find(
                              (o) => o.floorType === "firstFloor"
                            );

                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : afirstFloor.floorDimension.length}

                                  {/* {item && item.storageSpaceInfo && item.storageSpaceInfo.storageType} */}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: flooractive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Breadth:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          let afirstFloor =
                            item &&
                            item.storageSpaceInfo &&
                            item.storageSpaceInfo.floors &&
                            item.storageSpaceInfo.floors.find(
                              (o) => o.floorType === "firstFloor"
                            );

                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : afirstFloor.floorDimension.breath}

                                  {/* {item && item.storageSpaceInfo && item.storageSpaceInfo.storageType} */}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: flooractive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Height:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          let afirstFloor =
                            item &&
                            item.storageSpaceInfo &&
                            item.storageSpaceInfo.floors &&
                            item.storageSpaceInfo.floors.find(
                              (o) => o.floorType === "firstFloor"
                            );

                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : afirstFloor.floorDimension.height}

                                  {/* {item && item.storageSpaceInfo && item.storageSpaceInfo.storageType} */}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: flooractive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Area sqft:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          let afirstFloor =
                            item &&
                            item.storageSpaceInfo &&
                            item.storageSpaceInfo.floors &&
                            item.storageSpaceInfo.floors.find(
                              (o) => o.floorType === "firstFloor"
                            );

                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : afirstFloor.floorDimension.length *
                                      afirstFloor.floorDimension.breath}
                                </h6>
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr style={{ display: flooractive ? "" : "none" }}>
                    <td className="font-heading"> 4. Second Floor(Feet):</td>
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: flooractive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Length:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          let asecondFloor =
                            item &&
                            item.storageSpaceInfo &&
                            item.storageSpaceInfo.floors &&
                            item.storageSpaceInfo.floors.find(
                              (o) => o.floorType === "firstFloor"
                            );

                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : asecondFloor.floorDimension.length}
                                  {/* {item && item.storageSpaceInfo && item.storageSpaceInfo.storageType} */}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: flooractive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Breadth:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          let asecondFloor =
                            item &&
                            item.storageSpaceInfo &&
                            item.storageSpaceInfo.floors &&
                            item.storageSpaceInfo.floors.find(
                              (o) => o.floorType === "firstFloor"
                            );

                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                <h6 className="col-6 text-gray">
                                  {" "}
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : asecondFloor.floorDimension.breath}
                                </h6>
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: flooractive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Height:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          let asecondFloor =
                            item &&
                            item.storageSpaceInfo &&
                            item.storageSpaceInfo.floors &&
                            item.storageSpaceInfo.floors.find(
                              (o) => o.floorType === "firstFloor"
                            );

                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : asecondFloor.floorDimension.height}
                                </h6>
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: flooractive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Area sqft:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          let asecondFloor =
                            item &&
                            item.storageSpaceInfo &&
                            item.storageSpaceInfo.floors &&
                            item.storageSpaceInfo.floors.find(
                              (o) => o.floorType === "firstFloor"
                            );

                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : asecondFloor.floorDimension.length *
                                      asecondFloor.floorDimension.breath}
                                </h6>
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr style={{ display: flooractive ? "" : "none" }}>
                    <td className="font-heading">Racks:</td>
                  </tr>

                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: flooractive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Racks (Slotted Angle) - No. of Bins:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.storageSpaceInfo &&
                                      item.storageSpaceInfo.racks &&
                                      item &&
                                      item.storageSpaceInfo.racks[0].rackInfo &&
                                      item.storageSpaceInfo.racks[0].rackInfo
                                        .quantity}
                                </h6>

                                {/* <h6 className="col-6 text-gray"> </h6>  */}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: flooractive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Racks (Shelve Racks) - No. of Shelve:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.storageSpaceInfo &&
                                      item.storageSpaceInfo.racks &&
                                      item &&
                                      item.storageSpaceInfo.racks[1].rackInfo &&
                                      item.storageSpaceInfo.racks[1].rackInfo
                                        .quantity}
                                </h6>
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>

                  <tr style={{ display: flooractive ? "" : "none" }}>
                    <td></td>
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: flooractive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Total Area:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.storageSpaceInfo &&
                                      item.storageSpaceInfo.floors &&
                                      item.storageSpaceInfo.totalArea}{" "}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: flooractive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Pallets On Floor:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.storageSpaceInfo &&
                                      item.storageSpaceInfo.floors &&
                                      item.storageSpaceInfo.totalArea / 29}{" "}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: flooractive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Available Space:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.storageSpaceInfo &&
                                      item.storageSpaceInfo.floors &&
                                      item.storageSpaceInfo
                                        .totalAvailableSpace}{" "}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: flooractive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      No. of Loading/ unloading Bays:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.storageSpaceInfo &&
                                      item.storageSpaceInfo.floors &&
                                      item.storageSpaceInfo
                                        .loadingAndUnloadingBays}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr style={{ display: flooractive ? "" : "none" }}>
                    <td className="font-heading">Dock Size:</td>
                  </tr>

                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: flooractive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Height_from_ground:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.storageSpaceInfo &&
                                      item.storageSpaceInfo.dockSize &&
                                      item.storageSpaceInfo.dockSize
                                        .heightFromGound}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: flooractive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Height:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.storageSpaceInfo &&
                                      item.storageSpaceInfo.dockSize &&
                                      item.storageSpaceInfo.dockSize.height}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: flooractive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Width:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.storageSpaceInfo &&
                                      item.storageSpaceInfo.dockSize &&
                                      item.storageSpaceInfo.dockSize.width}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr style={{ display: flooractive ? "" : "none" }}>
                    <td></td>
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: flooractive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Parking Area sqft:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.storageSpaceInfo &&
                                      item.storageSpaceInfo.floors &&
                                      item.storageSpaceInfo.parkingArea}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>

                  <tr>
                    <td className="font-heading">
                      IT Infra:{" "}
                      {itInfraactive ? (
                        <span onClick={() => setitInfraactive(!itInfraactive)}>
                          {" "}
                          <img src="/assets/images/arrup.png" alt=""></img>
                        </span>
                      ) : (
                        <span onClick={() => setitInfraactive(!itInfraactive)}>
                          {" "}
                          <img src="/assets/images/arrdown.png" alt=""></img>
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: itInfraactive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Desktop:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.itInfraAndOfficeSpaceInfo &&
                                      item.itInfraAndOfficeSpaceInfo.itInfra &&
                                      item.itInfraAndOfficeSpaceInfo.itInfra
                                        .desktop}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: itInfraactive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Printer:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.itInfraAndOfficeSpaceInfo &&
                                      item.itInfraAndOfficeSpaceInfo.itInfra &&
                                      item.itInfraAndOfficeSpaceInfo.itInfra
                                        .printer}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: itInfraactive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Printer(MultiFunction):
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.itInfraAndOfficeSpaceInfo &&
                                      item.itInfraAndOfficeSpaceInfo.itInfra &&
                                      item.itInfraAndOfficeSpaceInfo.itInfra
                                        .printerMultifunction}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: itInfraactive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      UPS/Inverter:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.itInfraAndOfficeSpaceInfo &&
                                      item.itInfraAndOfficeSpaceInfo.itInfra &&
                                      item.itInfraAndOfficeSpaceInfo.itInfra
                                        .upsAndInverter}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>

                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: itInfraactive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Broadband:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.itInfraAndOfficeSpaceInfo &&
                                      item.itInfraAndOfficeSpaceInfo.itInfra &&
                                      item.itInfraAndOfficeSpaceInfo.itInfra
                                        .broadBand}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>

                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: itInfraactive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Scanner:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.itInfraAndOfficeSpaceInfo &&
                                      item.itInfraAndOfficeSpaceInfo.itInfra &&
                                      item.itInfraAndOfficeSpaceInfo.itInfra
                                        .scanner}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>

                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: itInfraactive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Telephone(Landline):
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.itInfraAndOfficeSpaceInfo &&
                                      item.itInfraAndOfficeSpaceInfo.itInfra &&
                                      item.itInfraAndOfficeSpaceInfo.itInfra
                                        .telephone}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>

                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: itInfraactive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      WMS:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.itInfraAndOfficeSpaceInfo &&
                                      item.itInfraAndOfficeSpaceInfo.itInfra &&
                                      item.itInfraAndOfficeSpaceInfo.itInfra
                                        .wms}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>

                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: itInfraactive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Others:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.itInfraAndOfficeSpaceInfo &&
                                      item.itInfraAndOfficeSpaceInfo.itInfra &&
                                      item.itInfraAndOfficeSpaceInfo.itInfra
                                        .others}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>

                  <tr>
                    <td className="font-heading">
                      Office Space:{" "}
                      {officespaceactive ? (
                        <span
                          onClick={() =>
                            setofficespaceactive(!officespaceactive)
                          }
                        >
                          {" "}
                          <img src="/assets/images/arrup.png" alt=""></img>
                        </span>
                      ) : (
                        <span
                          onClick={() =>
                            setofficespaceactive(!officespaceactive)
                          }
                        >
                          {" "}
                          <img src="/assets/images/arrdown.png" alt=""></img>
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: officespaceactive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Area (sqft):
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.itInfraAndOfficeSpaceInfo &&
                                      item.itInfraAndOfficeSpaceInfo.itInfra &&
                                      item.itInfraAndOfficeSpaceInfo.officeSpace
                                        .area}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: officespaceactive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Air Conditioner:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.itInfraAndOfficeSpaceInfo &&
                                      item.itInfraAndOfficeSpaceInfo.itInfra &&
                                      item.itInfraAndOfficeSpaceInfo.officeSpace
                                        .airConditioner}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: officespaceactive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Work Stations:{" "}
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.itInfraAndOfficeSpaceInfo &&
                                      item.itInfraAndOfficeSpaceInfo.itInfra &&
                                      item.itInfraAndOfficeSpaceInfo.officeSpace
                                        .workStations}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: officespaceactive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Chairs:{" "}
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.itInfraAndOfficeSpaceInfo &&
                                      item.itInfraAndOfficeSpaceInfo.itInfra &&
                                      item.itInfraAndOfficeSpaceInfo.officeSpace
                                        .chairs}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>

                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: officespaceactive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Tables:{" "}
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.itInfraAndOfficeSpaceInfo &&
                                      item.itInfraAndOfficeSpaceInfo.itInfra &&
                                      item.itInfraAndOfficeSpaceInfo.officeSpace
                                        .tables}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>

                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: officespaceactive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Cabins:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.itInfraAndOfficeSpaceInfo &&
                                      item.itInfraAndOfficeSpaceInfo.itInfra &&
                                      item.itInfraAndOfficeSpaceInfo.officeSpace
                                        .cabins}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>

                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: officespaceactive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Meeting Rooms:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.itInfraAndOfficeSpaceInfo &&
                                      item.itInfraAndOfficeSpaceInfo.itInfra &&
                                      item.itInfraAndOfficeSpaceInfo.officeSpace
                                        .meetingRooms}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: officespaceactive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Record Rooms:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.itInfraAndOfficeSpaceInfo &&
                                      item.itInfraAndOfficeSpaceInfo.itInfra &&
                                      item.itInfraAndOfficeSpaceInfo.officeSpace
                                        .recordRooms}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: officespaceactive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Strong Rooms:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.itInfraAndOfficeSpaceInfo &&
                                      item.itInfraAndOfficeSpaceInfo.itInfra &&
                                      item.itInfraAndOfficeSpaceInfo.officeSpace
                                        .strongRooms}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: officespaceactive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Electric Load:{" "}
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.itInfraAndOfficeSpaceInfo &&
                                      item.itInfraAndOfficeSpaceInfo.itInfra &&
                                      item.itInfraAndOfficeSpaceInfo.officeSpace
                                        .electricLoad}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: officespaceactive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Security Guard Office / Table:{" "}
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.itInfraAndOfficeSpaceInfo &&
                                      item.itInfraAndOfficeSpaceInfo.itInfra &&
                                      item.itInfraAndOfficeSpaceInfo.officeSpace
                                        .securityGuardOfficeTable}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: officespaceactive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Others:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.itInfraAndOfficeSpaceInfo &&
                                      item.itInfraAndOfficeSpaceInfo.itInfra &&
                                      item.itInfraAndOfficeSpaceInfo.officeSpace
                                        .others}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>

                  {/* {/////////} */}

                  {/* {////////} */}

                  <tr>
                    <td className="font-heading">
                      MH Infra:{" "}
                      {mhinfraactive ? (
                        <span onClick={() => setmhinfraactive(!mhinfraactive)}>
                          {" "}
                          <img src="/assets/images/arrup.png" alt=""></img>
                        </span>
                      ) : (
                        <span onClick={() => setmhinfraactive(!mhinfraactive)}>
                          {" "}
                          <img src="/assets/images/arrdown.png" alt=""></img>
                        </span>
                      )}{" "}
                    </td>
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: mhinfraactive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Pallets:{" "}
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.mhInfraInfo &&
                                      item.mhInfraInfo.pallets &&
                                      item.mhInfraInfo.pallets.quantity}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: mhinfraactive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Hand Pallet Truck(Hydraulic):{" "}
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.mhInfraInfo &&
                                      item.mhInfraInfo.handPalletTruck}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: mhinfraactive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Weighing Machine:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.mhInfraInfo &&
                                      item.mhInfraInfo.weighingMachine &&
                                      item.mhInfraInfo.weighingMachine
                                        .validTill}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: mhinfraactive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Picking Trolley:{" "}
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.mhInfraInfo &&
                                      item.mhInfraInfo.pickingTrolley}
                                </h6>
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>

                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: mhinfraactive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Hydraulic Dock Levler:{" "}
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.mhInfraInfo &&
                                      item.mhInfraInfo.hydraulicDockLevler}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>

                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: mhinfraactive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Battery Operated Pallet Truck(BOPT):{" "}
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.mhInfraInfo &&
                                      item.mhInfraInfo
                                        .batteryOperatedPalletTruck}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>

                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: mhinfraactive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Forklift (Battery Operated)(In ton):{" "}
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.mhInfraInfo &&
                                      item.mhInfraInfo.forkLifts &&
                                      item.mhInfraInfo.forkLifts[0].capacityTon}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: mhinfraactive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Forklift (Diesel Operated)(In ton):{" "}
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.mhInfraInfo &&
                                      item.mhInfraInfo.forkLifts &&
                                      item.mhInfraInfo.forkLifts[1].capacityTon}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: mhinfraactive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Electric Stacker:{" "}
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.mhInfraInfo &&
                                      item.mhInfraInfo.electricStacker}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: mhinfraactive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Hydra Crane:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.mhInfraInfo &&
                                      item.mhInfraInfo.hydraCrane &&
                                      item.mhInfraInfo.hydraCrane.remark}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: mhinfraactive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Load Capacity:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.mhInfraInfo &&
                                      item.mhInfraInfo.hydraCrane &&
                                      item.mhInfraInfo.hydraCrane.loadCapacity}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: mhinfraactive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Shrink / Stretch Wrap Machine:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.mhInfraInfo &&
                                      item.mhInfraInfo
                                        .shrinkAndStretchWrapMachine}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: mhinfraactive ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Others:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.mhInfraInfo &&
                                      item.mhInfraInfo.others}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr>
                    <td className="font-heading">
                      Safety and security:{" "}
                      {safetysecurity ? (
                        <span
                          onClick={() => setsafetysecurity(!safetysecurity)}
                        >
                          {" "}
                          <img src="/assets/images/arrup.png" alt=""></img>
                        </span>
                      ) : (
                        <span
                          onClick={() => setsafetysecurity(!safetysecurity)}
                        >
                          {" "}
                          <img src="/assets/images/arrdown.png" alt=""></img>
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: safetysecurity ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Fire Extinguisher (ABC):{" "}
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.safetyAndSecurityInfo &&
                                      item.safetyAndSecurityInfo
                                        .fireExtinguishers &&
                                      item.safetyAndSecurityInfo
                                        .fireExtinguishers[0].quantity}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: safetysecurity ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Fire Extinguisher (CO2):{" "}
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.safetyAndSecurityInfo &&
                                      item.safetyAndSecurityInfo
                                        .fireExtinguishers &&
                                      item.safetyAndSecurityInfo
                                        .fireExtinguishers[1].quantity}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: safetysecurity ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Fire Extinguisher (Others):
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.safetyAndSecurityInfo &&
                                      item.safetyAndSecurityInfo
                                        .fireExtinguishers &&
                                      item.safetyAndSecurityInfo
                                        .fireExtinguishers[2].quantity}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: safetysecurity ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Fire Sprinklers:{" "}
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.safetyAndSecurityInfo &&
                                      item.safetyAndSecurityInfo.fireSprinklers}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>

                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: safetysecurity ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Fire Hydrant:{" "}
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.safetyAndSecurityInfo &&
                                      item.safetyAndSecurityInfo.fireHydrant}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>

                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: safetysecurity ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      CCTV:{" "}
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.safetyAndSecurityInfo &&
                                      item.safetyAndSecurityInfo.cctv}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>

                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: safetysecurity ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Water Tank:{" "}
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.safetyAndSecurityInfo &&
                                      item.safetyAndSecurityInfo.waterTank &&
                                      item.safetyAndSecurityInfo.waterTank
                                        .quantity}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: safetysecurity ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Storage:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.safetyAndSecurityInfo &&
                                      item.safetyAndSecurityInfo.waterTank &&
                                      item.safetyAndSecurityInfo.waterTank
                                        .storage}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: safetysecurity ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Smoke Detectors / Fire Alarm:{" "}
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.safetyAndSecurityInfo &&
                                      item.safetyAndSecurityInfo
                                        .smokeDetectorsAndFireAlarm}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: safetysecurity ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Security Guard:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.safetyAndSecurityInfo &&
                                      item.safetyAndSecurityInfo.securityGuard}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>
                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: safetysecurity ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Metal Detector:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.safetyAndSecurityInfo &&
                                      item.safetyAndSecurityInfo.metalDetector}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>

                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: safetysecurity ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Pest Control:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.safetyAndSecurityInfo &&
                                      item.safetyAndSecurityInfo.pestControl}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>

                  <tr
                    style={{
                      border: "0.5px solid #808080",
                      display: safetysecurity ? "" : "none",
                    }}
                  >
                    <td
                      style={{ borderRight: "0.5px solid #808080" }}
                      className="font-heading"
                    >
                      Others:
                    </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              <td
                                style={{ borderRight: "0.5px solid #808080" }}
                              >
                                {" "}
                                <h6 className="col-6 text-gray">
                                  {item.warehouseImagesInfo.coverImage.url ===
                                  "/assets/images/logo.png"
                                    ? null
                                    : item &&
                                      item.safetyAndSecurityInfo &&
                                      item.safetyAndSecurityInfo.others}
                                </h6>{" "}
                              </td>
                            </>
                          );
                        })
                      : null}
                  </tr>

                  <tr>
                    <td> </td>
                    {data.compareList && data.compareList.length > 0
                      ? data.compareList.map((item, index) => {
                          return (
                            <>
                              {item.warehouseImagesInfo.coverImage.url ===
                              "/assets/images/logo.png" ? (
                                <td></td>
                              ) : (
                                <td>
                                  {!authData.CARTINFO.cartIdList?.includes(
                                      parseInt(item.id)
                                    ) 
                                    
                                    ?
                                    <button
                                    onClick={() => {
                                      addCart(item.id);
                                    }}
                                    className="btn btn-deep-primary cursorPointer"
                                  >
                                    Add to Cart
                                  </button>
                                  :
                                  <button
                                  disabled={true}
                                    className="btn btn-deep-primary cursorPointer"
                                  >
                                    Already In Cart
                                  </button>
                                  }
                                  
                                </td>
                              )}
                            </>
                          );
                        })
                      : null}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WarehouseCompare;
