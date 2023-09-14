import React, { useState, useEffect } from "react";
import Layout from "../../../layout/Layout";
import CustomerLayout from "../../../layout/CustomerLayout";
import BrowserTitle from "../../../components/helper/BrowserTitle";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { responseRfq } from "../../../store/actions/customer/rfqAction";
import {
  getWarehouseByCity,
  fetchWarehouseById,
  warehouseDetailPage,
} from "../../../store/actions/warehouseAction";
import { getRfqCart } from "../../../store/actions/customer/cartAction";
import FormSuccess from "../../../components/helper/FormSuccess";
import Spinner from "react-bootstrap/Spinner";
import StateList from "../../../json/pincode.json";
import axios from "../../../api/axios-auth";
import { favoriteByPage } from "../../../store/actions/customer/favoriteAction";

const RfqCreate = ({ isView }) => {
  const history = useHistory();
  const [isConcise, setIsConcise] = useState(true);
  // const [locationHouse, setLocationHouse] = useState([])
  const [cartHouse, setCartHouse] = useState([]);
  const [favHouse, setFavHouse] = useState([]);
  // const [cartError, setCartError] = useState(null);
  const [cityError, setCityError] = useState(null);
  const [stateError, setStateError] = useState(null);
  const [warehouseList, setWarehouseList] = useState([]);
  const [warehouseFavList, setWarehouseFavList] = useState([]);
  const [rfqLoad, setRfqLoad] = useState(false);
  const [fromBooking, setFromBooking] = useState(true);
  const [locationWarehouse, setLocationWarehouse] = useState([]);
  // const [whLocationError, setwhLocationError] = useState(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState([]);
  const [selectWhId, setSelectWhId] = useState([]);

  const [openActive, setOpenActive] = useState(true);
  const [cartActive, setCartActive] = useState(true);
  const [favoriteActive, setFavoriteActive] = useState(true);

  const dispatch = useDispatch();
  const data = useSelector((state) => state.FAVORITEINFO);
  const rfqData = useSelector((state) => state.CUSTOMER_RFQ_INFO);
  const allWarehouse = useSelector((state) => state.WAREHOUSEINFO);
  const cartWarehouse = useSelector((state) => state.CARTINFO);

  const whId = new URLSearchParams(window.location.search).get(
    "cartWarehouseId"
  );
  const whName = new URLSearchParams(window.location.search).get(
    "warehouseName"
  );
  // const hide = new URLSearchParams(window.location.search).get('hide');
  const wareId = new URLSearchParams(window.location.search).get("wareId");

  const handleChange5550 = (event) => {
    formHandleChange(event);
    setoptioncity([]);
    let stateObject = StateList.filter(
      (val) => val.stateName === event.target.value
    );

    var districtArr = new Set();
    stateObject.map((district) => {
      districtArr.add(district.districtName);
      return district;
    });

    let options = Array.from(districtArr).map((stateObj, index) => {
      return { value: index, label: stateObj };
    });

    setoptioncity(options);
  };

  useEffect(() => {
    if (whId !== null && whName !== null && fromBooking) {
      setCartHouse([...cartHouse, { value: parseInt(whId), label: whName }]);
      setFromBooking(false);
    }
  }, [whName, whId, cartHouse, fromBooking]);

  // Get All Cart Warehouse
  useEffect(() => {
    if (cartWarehouse.cartFavorite && cartWarehouse.cartFavorite?.length > 0) {
      let wList = [];
      cartWarehouse.cartFavorite.map((item) =>
        wList.push({
          value: item.id,
          label:
            item?.warehouseId +
            " - " +
            item.warehouseName +
            " - " +
            item.warehouseContactDetailInfo?.address?.district +
            " - " +
            item.warehouseContactDetailInfo?.address?.state,
        })
      );
      setWarehouseList(wList);
    } else {
      setWarehouseList([]);
    }

    if (
      data.favoriteList.data &&
      data.favoriteList.data.favoritesWarehouses &&
      data.favoriteList.data.favoritesWarehouses.length > 0
    ) {
      let wList = [];
      data.favoriteList.data.favoritesWarehouses.map((item) =>
        wList.push({
          value: item.id,
          label:
            item?.warehouseId +
            " - " +
            item.warehouseName +
            " - " +
            item.warehouseContactDetailInfo?.address?.district +
            " - " +
            item.warehouseContactDetailInfo?.address?.state,
        })
      );
      setWarehouseFavList(wList);
    } else {
      setWarehouseFavList([]);
    }
  }, [cartWarehouse.cartFavorite, data.favoriteList.data]);

  // All Warehouse By Location
  useEffect(() => {
    if (
      allWarehouse?.listOfWarehouse &&
      allWarehouse?.listOfWarehouse?.length > 0
    ) {
      let wList = [];

      for (let i = 0; i < allWarehouse?.listOfWarehouse?.length; i++) {
        wList.push({
          value: allWarehouse?.listOfWarehouse[i].id,
          label:
            allWarehouse?.listOfWarehouse[i].warehouseId +
            " - " +
            allWarehouse?.listOfWarehouse[i].warehouseName +
            " - " +
            allWarehouse?.listOfWarehouse[i].warehouseContactDetailInfo?.address
              ?.district +
            " - " +
            allWarehouse?.listOfWarehouse[i].warehouseContactDetailInfo?.address
              ?.state,
        });
      }
      setLocationWarehouse(wList);
    } else {
      setLocationWarehouse([]);
    }

    if (wareId !== null && wareId !== undefined) {
      dispatch(fetchWarehouseById(parseInt(wareId)));
    }

    return () => {
      dispatch(warehouseDetailPage(null));
    };
  }, [dispatch, allWarehouse.listOfWarehouse, wareId]);

  useEffect(() => {
    if (
      allWarehouse?.warehouseDetailPage?.warehouseContactDetailInfo?.address
    ) {
      setForm({
        city:
          allWarehouse?.warehouseDetailPage?.warehouseContactDetailInfo?.address
            ?.district ?? "",
        state:
          allWarehouse?.warehouseDetailPage?.warehouseContactDetailInfo?.address
            ?.state ?? "",
        warehouseSpaceRequired: "",
      });

      setSelectedWarehouse([
        {
          value: allWarehouse?.warehouseDetailPage.id,
          label:
            allWarehouse?.warehouseDetailPage?.warehouseId +
            " - " +
            allWarehouse?.warehouseDetailPage?.warehouseName +
            " - " +
            allWarehouse?.warehouseDetailPage?.warehouseContactDetailInfo
              ?.address?.district +
            " - " +
            allWarehouse?.warehouseDetailPage?.warehouseContactDetailInfo
              ?.address?.state,
        },
      ]);

      setSelectWhId(allWarehouse?.warehouseDetailPage?.warehouseId);

      // setLocationHouse([{ value: allWarehouse?.warehouseDetailPage.id, label: allWarehouse?.warehouseDetailPage.warehouseName }])

      setoptioncity([]);
      let stateObject = StateList.filter(
        (val) =>
          val.stateName ===
          allWarehouse?.warehouseDetailPage?.warehouseContactDetailInfo?.address
            ?.state
      );

      var districtArr = new Set();
      stateObject.map((district) => {
        districtArr.add(district.districtName);
        return district;
      });

      let options = Array.from(districtArr).map((stateObj, index) => {
        return { value: index, label: stateObj };
      });

      setoptioncity(options);
    }
  }, [allWarehouse]);

  const [form, setForm] = useState({
    city: "",
    state: "",
    warehouseSpaceRequired: "",
  });

  const formHandleChange = (e) => {
    if (e.target.name === "city") {
      let data = {
        district: e.target.value,
      };
      dispatch(getWarehouseByCity(data));
    }

    setForm({ ...form, [e.target.name]: e.target.value });
    setCityError(null);
    setStateError(null);
  };

  // const handleChange = selectedOption => {
  //     setLocationHouse(selectedOption)
  //     setwhLocationError(null)
  // };

  const handleCart = (cartSelected) => {
    setCartHouse(cartSelected);
  };

  const handleFav = (cartSelected) => {
    setFavHouse(cartSelected);
  };

  const submitHandle = (e) => {
    e.preventDefault();
    let wareList = [];

    if (form.state === "") {
      setStateError("Required");
      return 0;
    }

    if (form.city === "") {
      setCityError("Required");
      return 0;
    }

    // if (locationHouse && locationHouse.length > 0) {
    //     for (let i = 0; i < locationHouse.length; i++) {
    //         wareList.push(locationHouse[i]["value"])
    //     }
    // } else {
    //     setwhLocationError("Required");
    //     return 0;
    // }

    // console.log(openActive)
    // console.log(cartActive)
    // console.log(favoriteActive)

    if (cartActive && cartHouse && cartHouse.length > 0) {
      for (let i = 0; i < cartHouse.length; i++) {
        wareList.push(cartHouse[i]["value"]);
      }
    }

    if (favoriteActive && favHouse && favHouse.length > 0) {
      for (let i = 0; i < favHouse.length; i++) {
        wareList.push(favHouse[i]["value"]);
      }
    }

    if (locationWarehouse && locationWarehouse.length > 0) {
      for (let i = 0; i < locationWarehouse.length; i++) {
        wareList.push(locationWarehouse[i]["value"]);
      }
    }

    if (wareId || wareId !== null) {
      wareList.push(parseInt(wareId));
    }

    let unique = [...new Set(wareList)];
    dispatch({ payload: {}, type: "INITIAL_EMPTY" });
    dispatch({ payload: null, type: "CART_FAVORITE" });
    dispatch({ payload: [], type: "WAREHOUSE_LIST" });

    if (unique && unique.length > 0) {
      for (let i = 0; i < unique.length; i++) {
        let jsonData = {
          warehouseSpaceRequired: 0,
          warehouses: [unique[i]],
          location: {
            city: {
              name: form.state,
            },
            area: {
              name: form.city,
            },
          },
        }; 
        setRfqLoad(true);
        console.log("jsonData-->", isConcise);
        axios
          .post(`/api/v1/customerrf`, jsonData)
          .then((response) => {
            let res = JSON.parse(response.data);
            if (res.statusCode === 200) {
              // dispatch(initialRfqByIdAndType(res.data.id, "customerRfq"))
              if (unique.length === i + 1) {
                setRfqLoad(false);
                if (isConcise) {
                  history.replace(`/conciserfq/${res.data.id}`);
                } else {
                  history.replace(`/managerfq?page=1`);
                }
              }
              // history.replace(`/createnewrfq?rfqid=${res.data.id}&hide=${true}`)
            }
          })
          .catch((error) => { })
          .then(() => {
            setRfqLoad(false);
            console.log("-----always executes");
          });
      }
    } else {
      let jsonData = {
        warehouseSpaceRequired: 0,
        warehouses: [],
        location: {
          city: {
            name: form.state,
          },
          area: {
            name: form.city,
          },
        },
      };

      setRfqLoad(true);
      console.log("jsonData-->", jsonData);
      axios
        .post(`/api/v1/customerrfq`, jsonData)
        .then((response) => {
          console.log("lllllll")
          let res = JSON.parse(response.data);
          if (res.statusCode === 200) {
            // dispatch(initialRfqByIdAndType(res.data.id, "customerRfq"))
            setRfqLoad(false);
            if (isConcise) {
              // history.replace(`/conciserfq/${res.data.id}`);
              history.replace(`/conciserfq?rfqid=${res.data.id}&hide=false`)
            } else {
              history.replace(`/managerfq?page=1`);
            }
            // history.replace(`/createnewrfq?rfqid=${res.data.id}&hide=${true}`)
          }
        })
        .catch((error) => { })
        .then(() => {
          setRfqLoad(false);
          console.log("-----always executes");
        });
    }

    // let jsonData = {
    //     "warehouseSpaceRequired": "",
    //     "warehouses": unique,
    //     "location": {
    //         "city": {
    //             "name": form.state
    //         },
    //         "area": {
    //             "name": form.city
    //         }
    //     }
    // }

    // setRfqLoad(true)
    // console.log("jsonData-->", jsonData)

    // axios.post(`/api/v1/customerrfq`, jsonData).then(response => {
    //     let res = JSON.parse(response.data)
    //     if (res.statusCode === 200) {
    //         dispatch(initialRfqByIdAndType(res.data.id, "customerRfq"))
    //         history.replace(`/createnewrfq?rfqid=${res.data.id}&hide=${true}`)
    //     }
    // }).catch((error) => {
    // }).then(() => {
    //     setRfqLoad(false)
    //     console.log("-----always executes");
    // })
  };

  var stateArr = new Set();
  StateList.map((state) => {
    stateArr.add(state.stateName);
    return state;
  });

  const options = Array.from(stateArr).map((stateObj, index) => {
    return { id: index, name: stateObj };
  });

  const [optioncity, setoptioncity] = useState([]);

  function createSuccess() {
    dispatch(responseRfq([]));
    // history.replace(`/createnewrfq?rfqid=${res.data.id}&hide=${false}`)
  }

  useEffect(() => {
    dispatch(getRfqCart());
    dispatch(favoriteByPage());
  }, [dispatch]);

  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });

  return (
    <Layout>
      <BrowserTitle title="RFQ" />
      <CustomerLayout title="RFQ">
        <div className="row">
          <div className="content col-12 shadow-sm">
            <div className="border-bottom mb-3">
              <button className="btn name-breadcrumb px-0 text-dark font-heading mr-3">
                <i
                  onClick={() => history.goBack()}
                  className="fas fa-chevron-left mr-1 cursorPointer"
                ></i>
                CREATE NEW ENQUIRY/RFQ
              </button>
            </div>
            <>
              {rfqData.rfqResponse.message === 200 ||
                rfqData.rfqResponse.statusCode === 201 ? (
                <FormSuccess
                  onClick={createSuccess}
                  message={rfqData.rfqResponse.message}
                />
              ) : null}

              <form onSubmit={submitHandle}>
                <div className="row  px-4">
                  {selectedWarehouse && selectedWarehouse.length > 0
                    ? selectedWarehouse.map((wh, index) => (
                      <div key={index} className="col-12 px-0">
                        <div className="row">
                          <div className="col-xl-12 col-lg-12 px-md-0 col-md-12 col-sm-12 px-3">
                            <div className="form-check">
                              <label
                                className="form-check-label mb-2  w-250px justify-content-start"
                                htmlFor="flexCheckDefault"
                              >
                                Selected Warehouse
                              </label>
                            </div>

                            {/* <label htmlFor="staticEmail" className="mb-2 mt-2 w-250px justify-content-start px-3">Open RFQ</label> */}
                            <div className="row mx-0">
                              <div className="col-md-6 col-12 mb-3">
                                <div className="form-group m-0">
                                  <input
                                    value={selectWhId}
                                    className="form-control form-control-md"
                                    disabled={true}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6 col-12 mb-3">
                                <div className="form-group m-0">
                                  <input
                                    value={wh.label}
                                    className="form-control form-control-md"
                                    disabled={true}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                    : null}

                  <div className="col-12 px-0">
                    <div className="row">
                      {/* <div className="col-auto">
                                                <label htmlFor="staticEmail" className="mb-2 mt-2 w-250px justify-content-start px-3">Open RFQ</label>
                                            </div> */}
                      <div className="col-xl-12 col-lg-12 px-md-0 col-md-12 col-sm-12 px-3">
                        {/* <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            onChange={() => setOpenActive(!openActive)}
                            value={openActive}
                            checked={openActive}
                            id="flexCheckDefault"
                          />
                          <label
                            className="form-check-label mb-2 mt-2 w-250px justify-content-start"
                            htmlFor="flexCheckDefault"
                          >
                            Open RFQ
                          </label>
                        </div> */}

                        {/* <label htmlFor="staticEmail" className="mb-2 mt-2 w-250px justify-content-start px-3">Open RFQ</label> */}
                        <div className="row mx-0">
                          <div className="col-md-6">
                            <div className="form-group m-0">
                              <select
                                onChange={(e) => {
                                  handleChange5550(e);
                                  // setFieldValue("state",e.target.value)
                                }}
                                value={form.state}
                                name="state"
                                //  onChange={formHandleChange}
                                className="form-control form-control-md custom-select"
                                disabled={isView || !openActive}
                              >
                                <option value="">Select State</option>
                                {options && options.length > 0
                                  ? options.map((value, index) => {
                                    return (
                                      <option key={index} value={value.name}>
                                        {value.name}
                                      </option>
                                    );
                                  })
                                  : null}
                              </select>
                              <span className="errorMsg ml-3 mt-0">
                                {stateError}
                              </span>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group m-0">
                              <select
                                name="city"
                                value={form.city}
                                onChange={formHandleChange}
                                className="form-control form-control-md custom-select"
                                disabled={isView || !openActive}
                              >
                                <option value="">Select Cityy</option>
                                {optioncity && optioncity.length > 0
                                  ? optioncity.map((value, index) => {
                                    return (
                                      <option key={index}>
                                        {value.label}
                                      </option>
                                    );
                                  })
                                  : null}
                              </select>
                              <span className="errorMsg ml-3 mt-0">
                                {cityError}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="col-12 px-0">
                    <div className="row"> 
                      <div className="col-xl-12 col-lg-12 px-md-0 col-md-12 col-sm-12 px-3">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            onChange={() => setFavoriteActive(!favoriteActive)}
                            value={favoriteActive}
                            checked={favoriteActive}
                            id="flexCheckDefault"
                          />
                          <label
                            className="form-check-label mb-2 mt-2 w-250px justify-content-start"
                            htmlFor="flexCheckDefault"
                          >
                            Warehouse from Favorities
                          </label>
                        </div>
                        <div className="row mx-0">
                          <div className="col-12 px-3 mb-3">
                            <Select
                              value={favHouse}
                              onChange={handleFav}
                              options={warehouseFavList}
                              isDisabled={isView || !favoriteActive}
                              isMulti
                              placeholder={<div>Choose Warehouse</div>}
                              hideSelectedOptions={false}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  {/* <div className="col-12 px-0">
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 px-md-0 col-md-12 col-sm-12 px-3">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            onChange={() => setCartActive(!cartActive)}
                            value={cartActive}
                            checked={cartActive}
                            id="flexCheckDefault"
                          />
                          <label
                            className="form-check-label mb-2 mt-2 w-250px justify-content-start"
                            htmlFor="flexCheckDefault"
                          >
                            Warehouse From Cart
                          </label>
                        </div>
                        <div className="row mx-0">
                          <div className="col-12 px-3 mb-3">
                            <Select
                              value={cartHouse}
                              onChange={handleCart}
                              options={warehouseList}
                              isDisabled={isView || !cartActive}
                              isMulti
                              placeholder={<div>Choose Warehouse</div>}
                              hideSelectedOptions={false}
                            /> 
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  {/* <div className="row">
                    <div className="col-12">
                      <div class="form-check form-switch">
                        <input
                          onClick={() => setIsConcise(!isConcise)}
                          class="form-check-input"
                          type="checkbox"
                          checked={isConcise}
                          id="concise"
                        />
                        <label class="form-check-label" for="concise">
                          Concise Form
                        </label>
                      </div>
                    </div>
                  </div> */}

                  <div className={`col-12 mt-3 ${isView ? "d-none" : ""}`}>
                    <div className="row justify-content-end">
                      <div className="col-auto">
                        <button
                          disabled={rfqLoad}
                          type="submit"
                          className="btn btn-deep-primary mb-3 add-class remove-class"
                        >
                          Save
                          {rfqLoad && <Spinner animation="border" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </>
          </div>
        </div>
      </CustomerLayout>
    </Layout>
  );
};

export default RfqCreate;
