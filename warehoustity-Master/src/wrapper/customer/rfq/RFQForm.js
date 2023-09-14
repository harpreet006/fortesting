import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  updateRFQ,
  responseRfq,
} from "../../../store/actions/customer/rfqAction";
import {
  getWarehouseByCity,
  fetchWarehouseById,
} from "../../../store/actions/warehouseAction";
import { getRfqCart } from "../../../store/actions/customer/cartAction";
import FormSuccess from "../../../components/helper/FormSuccess";
import Spinner from "react-bootstrap/Spinner";
import StateList from "../../../json/pincode.json";
import { favoriteByPage } from "../../../store/actions/customer/favoriteAction";
import { Warehouse } from "@mui/icons-material";
import { RFQ_FIRST_FORM } from "../../../store/types";
import { CUSTOMER_RFQ_INFO } from "../../../store/reducers/customer/rfqReducer";

const RFQForm = ({ isView }) => {
  const [cartHouse, setCartHouse] = useState([]);
  const [cityError, setCityError] = useState(null);
  const [stateError, setStateError] = useState(null);
  const [warehouseList, setWarehouseList] = useState([]);
  const [fromBooking, setFromBooking] = useState(true);
  const [locationWarehouse, setLocationWarehouse] = useState([]);
  const [favHouse, setFavHouse] = useState([]);
  const [warehouseFavList, setWarehouseFavList] = useState([]);
  const [openActive, setOpenActive] = useState(false);
  const [cartActive, setCartActive] = useState(false);
  const [favoriteActive, setFavoriteActive] = useState(false);
  const [rfqWarehouse, setRfqWarehouse] = useState([]);
  const [commingWarehouse, setCommingWarehouse] = useState([]);
  const dispatch = useDispatch();

  const data = useSelector((state) => state.FAVORITEINFO);
  const rfqData = useSelector((state) => state.CUSTOMER_RFQ_INFO);
  const allWarehouse = useSelector((state) => state.WAREHOUSEINFO);
  const cartWarehouse = useSelector((state) => state.CARTINFO);

  console.log(rfqData, "check data alsdkfj")

  const whId = new URLSearchParams(window.location.search).get(
    "cartWarehouseId"
  );

  const whName = new URLSearchParams(window.location.search).get(
    "warehouseName"
  );
  const rfqid = new URLSearchParams(window.location.search).get("rfqid");
  // const hide = new URLSearchParams(window.location.search).get('hide');
  const wareId = new URLSearchParams(window.location.search).get("wareId");

  useEffect(() => {
    setCommingWarehouse([]);
    if (
      rfqData?.rfqFirstForm?.warehouses &&
      rfqData?.rfqFirstForm?.warehouses.length > 0
    ) {
      let wh = [];

      for (let p = 0; p < rfqData?.rfqFirstForm?.warehouses.length; p++) {
        wh.push({
          value: rfqData?.rfqFirstForm?.warehouses[p].id,
          label: rfqData?.rfqFirstForm?.warehouses[p].warehouseName,
        });
      }
      setCommingWarehouse(wh);
    }
  }, [rfqData]);
  useEffect(() => {
    // if (rfqData?.rfqFirstForm?.location) {
      setForm({
        city: rfqData?.rfqFirstForm.location.area.name,
        state: rfqData?.rfqFirstForm.location.city.name,
        warehouseSpaceRequired: 0,
      });
      setOpenActive(true);
        console.log("jj",rfqData?.rfqFirstForm?.warehouses)
      let wList = [];
      if (
        rfqData?.rfqFirstForm?.warehouses &&
        rfqData?.rfqFirstForm?.warehouses.length > 0
      ) {
        rfqData.rfqFirstForm.warehouses.map((item) =>{

          console.log("warehouseeeee",rfqData.rfqFirstForm.warehouses)
          
          wList.push({
            value: item.id,
            label: item?.warehouseId + " - " + item.warehouseName,
            warehouseId: item?.warehouseId,
            
          })
          
        }
        );
      }
      
        console.log("kkk",wList)
      setWarehouseList(wList);
      
      console.log("ware1",warehouseList);
      setRfqWarehouse(wList);
      console.log("ware2",rfqWarehouse);

      setoptioncity([]);
      let stateObject = StateList.filter(
        (val) => val.stateName === rfqData?.rfqFirstForm.location.city.name
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
    // }
  }, [rfqData.rfqFirstForm]);

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
          label: allWarehouse?.listOfWarehouse[i].warehouseName,
        });
      }
      setLocationWarehouse(wList);
    } else {
      setLocationWarehouse([]);
    }

    if (wareId !== null && wareId !== undefined) {
      dispatch(fetchWarehouseById(parseInt(wareId)));
    }
  }, [dispatch, allWarehouse.listOfWarehouse, wareId]);

  
  const [form, setForm] = useState({
    city: "" ,
    state: "",
    warehouseSpaceRequired: 0,
  });

  const formHandleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "city") {
      let data = {
        district: e.target.value,
      };
      dispatch(getWarehouseByCity(data));
    }

    

    console.log("formkk",form)
    setCityError(null);
    setStateError(null);
  };

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

    if (commingWarehouse && commingWarehouse.length > 0) {
      for (let i = 0; i < commingWarehouse.length; i++) {
        wareList.push(commingWarehouse[i]["value"]);
      }
    }

    let unique = [...new Set(wareList)];
    dispatch({ payload: {}, type: "INITIAL_EMPTY" });
    dispatch({ payload: null, type: "CART_FAVORITE" });
    dispatch({ payload: [], type: "WAREHOUSE_LIST" });

    setForm({ ...form, state: rfqData.rfqFirstForm.location.area.name  });
    setForm({ ...form, city: rfqData.rfqFirstForm.location.city.name  });

    console.log("ppp",form)

    let data = {
      warehouseSpaceRequired: 0,
      warehouses: rfqData?.rfqFirstForm?.warehouses.length>0?[rfqData?.rfqFirstForm?.warehouses[0]?.id]:[],
      location: {
        area: {
          name: rfqData?.rfqFirstForm?.warehouses.length>0?rfqData?.rfqFirstForm?.location?.area?.name:form.city,
        },
        city: {
          name: rfqData?.rfqFirstForm?.warehouses.length>0?rfqData?.rfqFirstForm?.location?.city?.name:form.state,
        },
      },
    };

    

    console.log("Rdata-->", data);



    if (rfqid || (rfqData?.rfqFirstForm && rfqData?.rfqFirstForm.id)) {
      dispatch(updateRFQ(parseInt(rfqData?.rfqFirstForm.id), data,rfqData?.rfqFirstForm?.warehouses));
    }
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
    dispatch({
      type: "IS_PENDING",
      isPending: false,
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getRfqCart());
    dispatch(favoriteByPage());
  }, [dispatch]);

  return (
    <>
      {rfqData.rfqResponse.message === 200 ||
      rfqData.rfqResponse.statusCode === 201 ? (
        <FormSuccess
          onClick={() => dispatch(responseRfq([]))}
          message={rfqData.rfqResponse.message}
        />
      ) : null}

      <form onSubmit={submitHandle}>
        <div className="row p-3 pb-0">
          <div className="col-12 px-0">
            <div className="form-group form-inline mb-3 px-0">
              <label
                htmlFor="inputPassword6"
                className="w-250px justify-content-start px-3"
              >
                RFQ IDD
              </label>
              <div className="row mx-md-0 mx-sm-3 mx-0">
                <div className="col-12 px-sm-3 px-0">
                  <input
                    value={
                      rfqData?.rfqFirstForm ? rfqData?.rfqFirstForm.id : ""
                    }
                    type="text"
                    id="inputPassword6"
                    className="form-control d-inline-block form-control-md w-160px mx-3"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>

          {rfqData?.rfqFirstForm?.warehouses  && rfqData?.rfqFirstForm?.warehouses.length>0
            ? 
            // {/* // rfqWarehouse.map((wh, index) => ( */}
             
                <div  className="col-12 px-0">

                  {console.log("hello",rfqWarehouse)}
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 px-md-0 col-md-12 col-sm-12 px-3">
                      <div className="form-check">
                        <label
                          className="form-check-label mb-2 mt-2 w-250px justify-content-start"
                          htmlFor="flexCheckDefault"
                        >
                          RFQ Warehouses
                        </label>
                      </div>


                      {/* <label htmlFor="staticEmail" className="mb-2 mt-2 w-250px justify-content-start px-3">Open RFQ</label> */}
                      <div className="row mx-0">
                        <div className="col-md-4 col-12">
                          <div className="form-group m-0">
                            {console.log("bvb",rfqData?.rfqFirstForm?.warehouses)}
                            <input
                              value={rfqData?.rfqFirstForm?.warehouses[0]?.warehouseId}
                              className="form-control form-control-md"
                              disabled={true}
                            />
                          </div>
                        </div>

                        <div className="col-md-8 col-12">
                          <div className="form-group m-0">
                            <input
                              value={rfqData?.rfqFirstForm?.warehouses[0]?.warehouseName}
                              className="form-control form-control-md"
                              disabled={true}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              
             : null
          } 
          {rfqData?.rfqFirstForm?.warehouses && rfqData?.rfqFirstForm?.warehouses.length>0
          ?
          
          <div className="col-12 px-0">
            {console.log("hkk")}
            <div className="row">
              {/* <div className="col-auto">
                                                <label htmlFor="staticEmail" className="mb-2 mt-2 w-250px justify-content-start px-3">Open RFQ</label>
                                            </div> */}
                                            {}
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 ">
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
                        // onChange={(e) => {
                        //   handleChange5550(e);
                        //   // setFieldValue("state",e.target.value)
                        // }}
                        value={rfqData?.rfqFirstForm?.location?.area?.name}
                        name="state"
                        //  onChange={formHandleChange}
                        className="form-control form-control-md custom-select"
                        disabled={isView}
                      >
                        <option value="">{rfqData?.rfqFirstForm?.location?.area?.name}</option>
                        {/* {options && options.length > 0
                          ? options.map((value, index) => {
                              return (
                                <option key={index} value={value.name}>
                                  {value.name}
                                </option>
                              );
                            })
                          : null} */}
                      </select>
                      <span className="errorMsg ml-3 mt-0">{stateError}</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group m-0">
                      <select
                        name="city"
                        value={rfqData?.rfqFirstForm?.location?.city?.name}
                        // onChange={formHandleChange}
                        className="form-control form-control-md custom-select"
                        disabled={isView}
                      >
                        <option value="">{rfqData?.rfqFirstForm?.location?.city?.name}</option>
                        {/* {optioncity && optioncity.length > 0
                          ? optioncity.map((value, index) => {
                              return <option key={index}>{value.label}</option>;
                            })
                          : null} */}
                      </select>
                      <span className="errorMsg ml-3 mt-0">{cityError}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          :

          // <div className="col-12 px-0">
          //   <div className="row">
          //     {/* <div className="col-auto">
          //                                       <label htmlFor="staticEmail" className="mb-2 mt-2 w-250px justify-content-start px-3">Open RFQ</label>
          //                                   </div> */}
          //                                   {}
          //     <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 ">
          //       {/* <div className="form-check">
          //         <input
          //           className="form-check-input"
          //           type="checkbox"
          //           onChange={() => setOpenActive(!openActive)}
          //           value={openActive}
          //           checked={openActive}
          //           id="flexCheckDefault"
          //         />
          //         <label
          //           className="form-check-label mb-2 mt-2 w-250px justify-content-start"
          //           htmlFor="flexCheckDefault"
          //         >
          //           Open RFQ
          //         </label>
          //       </div> */}

          //       {/* <label htmlFor="staticEmail" className="mb-2 mt-2 w-250px justify-content-start px-3">Open RFQ</label> */}
          //       <div className="row mx-0">
          //         <div className="col-md-6">
          //           <div className="form-group m-0">
          //             <select
          //               onChange={(e) => {
          //                 handleChange5550(e);
          //                 // setFieldValue("state",e.target.value)
          //               }}
          //               value={form.state}
          //               name="state"
                         
          //               className="form-control form-control-md custom-select"
          //               disabled={isView}
          //             >
          //               <option value="">Select State</option>
          //               {options && options.length > 0
          //                 ? options.map((value, index) => {

          //                   {console.log("lkl")}
          //                     return (
                                
          //                       <option key={index} value={value.name}>
          //                         {value.name}
          //                       </option>
          //                     );
          //                   })
          //                 : null}
          //             </select>
          //             <span className="errorMsg ml-3 mt-0">{stateError}</span>
          //           </div>
          //         </div>
          //         <div className="col-md-6">
          //           <div className="form-group m-0">
          //             <select
          //               name="city"
          //               value={form.city}
          //               onChange={formHandleChange}
          //               className="form-control form-control-md custom-select"
          //               disabled={isView}
          //             >
          //               <option value="">Select City</option>
          //               {optioncity && optioncity.length > 0
          //                 ? optioncity.map((value, index) => {
          //                   {console.log("asa",value)}
          //                     return <option key={index}>{value.label}</option>;
          //                   })
          //                 : null}
          //             </select>
          //             <span className="errorMsg ml-3 mt-0">{cityError}</span>
          //           </div>
          //         </div>
          //       </div>
          //     </div>
          //   </div>
          // </div>
          <div className="col-12 px-0">
            <div className="row">
              {/* <div className="col-auto">
                                                <label htmlFor="staticEmail" className="mb-2 mt-2 w-250px justify-content-start px-3">Open RFQ</label>
                                            </div> */}
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 ">
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
                          // formHandleChange(e);
                          handleChange5550(e);
                          // setFieldValue("state",e.target.value)
                        }}
                        value={form.state}
                        name="state"
                        //  onChange={formHandleChange}
                        className="form-control form-control-md custom-select"
                        disabled={isView}
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
                      <span className="errorMsg ml-3 mt-0">{stateError}</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group m-0">
                      <select
                        name="city"
                        value={form.city}
                        onChange={formHandleChange}
                        className="form-control form-control-md custom-select"
                        disabled={isView}
                      >
                        <option value="">Select City</option>
                        {optioncity && optioncity.length > 0
                          ? optioncity.map((value, index) => {
                              return <option key={index}>{value.label}</option>;
                            })
                          : null}
                      </select>
                      <span className="errorMsg ml-3 mt-0">{cityError}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
}



          <div className="col-12 px-0">
            <div className="row">
              {/* <div className="col-auto">
                                                <label htmlFor="staticEmail" className="mb-1 mt-2 w-250px justify-content-start px-3">Warehouse from Favorities</label>
                                            </div> */}
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                {/* <div className="form-check">
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
                </div> */}

                {/* <label htmlFor="staticEmail" className="mb-1 mt-2 w-250px justify-content-start px-3">Warehouse from Favorities</label> */}
                {/* <div className="row mx-0">
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
                </div> */}
              </div>
            </div>
          </div>

          <div className="col-12 px-0">
            <div className="row">
              {/* <div className="col-auto">
                                                <label htmlFor="staticEmail" className="mb-1 mt-2 w-250px justify-content-start px-3">Warehouse From Cart</label>
                                            </div> */}
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                {/* <div className="form-check">
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
                </div> */}

                {/* <label htmlFor="staticEmail" className="mb-1 mt-2 w-250px justify-content-start px-3">Warehouse From Cart</label> */}
                {/* <div className="row mx-0">
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
                </div> */}
              </div>
            </div>
          </div>

          <div className={`col-12 mt-2 ${isView ? "d-none" : ""}`}>
            <div className="row justify-content-end">
              <div className="col-auto">
                <button
                  disabled={rfqData.isPending}
                  type="submit"
                  className="btn btn-deep-primary add-class remove-class px-5"
                >
                  Save
                  {rfqData.isPending ? <Spinner animation="border" /> : null}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default RFQForm;
