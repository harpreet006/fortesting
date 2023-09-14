import React, { useEffect, useState } from "react";
import { getCustomerDemograpgy } from "../../store/actions/dashboardAction";
import { useSelector, useDispatch } from "react-redux";
import { PieChart } from "react-minimal-pie-chart";
import pinCode from "../../json/pincode.json";
import { getWarehouseListByFilter } from "../../components/utils";
// eslint-disable-next-line
import { typeByPage } from "../../store/actions/whyAction";
// eslint-disable-next-line
import { categoryByPage } from "../../store/actions/categoryAction";
import {
  customerBookingAuth,
  bookingList,
} from "../../store/actions/customer/bookingAction";
// import { waresheetList } from "../../store/actions/customer/waresheetAction";

const Demographics = () => {
  const [location, setLocation] = useState("");
  const [districtName, setDistrictName] = useState([]);
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.DASHBOARD_INFO);
  const category = useSelector((state) => state.CATEGORY_INFO.categoryList);
  const bookingData = useSelector((state) => state.BOOKINGINFO);
  const typeWh = useSelector((state) => state.WHY_INFO);

  const [filterState, setFilterState] = useState({});
  const [warehouseList, setWarehouseList] = useState([]);
  // eslint-disable-next-line
  const [selectedType, setSelectedType] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [demographicsStats, setDemographicsStats] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState([]);

  var colorArray = [
    "#FF6633",
    "#FFB399",
    "#FF33FF",
    "#FFFF99",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#99FF99",
    "#B34D4D",
    "#80B300",
    "#809900",
    "#E6B3B3",
    "#6680B3",
    "#66991A",
    "#FF99E6",
    "#CCFF1A",
    "#FF1A66",
    "#E6331A",
    "#33FFCC",
    "#66994D",
    "#B366CC",
    "#4D8000",
    "#B33300",
    "#CC80CC",
    "#66664D",
    "#991AFF",
    "#E666FF",
    "#4DB3FF",
    "#1AB399",
    "#E666B3",
    "#33991A",
    "#CC9999",
    "#B3B31A",
    "#00E680",
    "#4D8066",
    "#809980",
    "#E6FF80",
    "#1AFF33",
    "#999933",
    "#FF3380",
    "#CCCC00",
    "#66E64D",
    "#4D80CC",
    "#9900B3",
    "#E64D66",
    "#4DB380",
    "#FF4D4D",
    "#99E6E6",
    "#6666FF",
  ];

  async function getFilteredWarehouses() {
    const wareHouseList1 = getWarehouseListByFilter(filterState, warehouseList);

    console.log("warehouse--", wareHouseList1);
    let titleList = [];
    let colorCount = 0;

    let formattedData = [];

    if (wareHouseList1 && wareHouseList1.length > 0) {
      wareHouseList1.map((warehouse, pos) => {
        const index = titleList.indexOf(
          warehouse.warehouseContactDetailInfo.address.city
        );
        if (index !== -1) {
          formattedData[index].value += 1;
        } else {
          titleList.push(warehouse.warehouseContactDetailInfo.address.city);
          formattedData.push({
            title: warehouse.warehouseContactDetailInfo.address.city,
            value: 1,
            color: colorArray[colorCount],
          });
          colorCount += 1;
        }
        return formattedData;
      });
    }
    setDemographicsStats(formattedData);
  }

  // const [isRun, setIsRun] = useState(false)

  // if(isRun){
  //   getFilteredWarehouses()
  // }

  useEffect(() => {
    const warehouse = [];

    if (bookingData.bookingList && bookingData.bookingList.length > 0) {
      // setIsRun(true)
      console.log("");
      bookingData.bookingList.map((item) => {
        warehouse.push(item.warehouse);
        return warehouse;
      });
      setWarehouseList(warehouse);
    }
  }, [bookingData]);

  // Booking Data Fetch

  useEffect(() => {
    dispatch(customerBookingAuth(parseInt(1)));

    return () => {
      dispatch(bookingList([]));
    };
  }, [dispatch]);

  async function typeSelectionChange(warehouseType) {
    // 233227

    setSelectedType(warehouseType);
    filterState.warehouseType = [warehouseType.toUpperCase()];
    setFilterState(filterState);
    getFilteredWarehouses();
  }

  async function categorySelectionChange(warehouseCategory) {
    // 233227

    setSelectedCategory(warehouseCategory);
    filterState.warehouseCategory = [warehouseCategory.toUpperCase()];
    setFilterState(filterState);
    getFilteredWarehouses();
  }

  async function stateSelectionChange(state) {
    filterState.state = [state.toUpperCase()];
    setFilterState(filterState);
    getFilteredWarehouses();

    const district = new Set();
    // console.log('pin--', pin)
    await pinCode.forEach((pin) => {
      if (pin.stateName === state.toUpperCase()) {
        district.add(pin.districtName);
      }
    });
    console.log(Array.from(district));
    setDistrictName(Array.from(district));
    return Array.from(district);
  }

  const demographyCall = (state) => {
    if (state !== "") {
      stateSelectionChange(state);
      setLocation(state);
      // dispatch(
      //   getCustomerDemograpgy({
      //     city:null,
      //     state: state,
      //   })
      // );
    }
  };

  const demographyCallByCity = (city) => {
    setSelectedDistrict(city);
    filterState.city = [city.toUpperCase()];
    setFilterState(filterState);

    getFilteredWarehouses();

    // if (city !== "") {
    //   dispatch(
    //     getCustomerDemograpgy({
    //       city: city,
    //       state: location,
    //     })
    //   );

    // stateSelectionChange(city)
    // setLocation(city);
    // dispatch(
    //   getCustomerDemograpgy({
    //     city: city,
    //   })
    // );
    // }
  };

  useEffect(() => {
    dispatch(
      getCustomerDemograpgy({
        state: "Delhi",
      })
    );
  }, [dispatch]);

  const options = [
    // { value: '0', label: 'Select State' },

    { value: "1", label: "Andaman & Nicobar" },
    { value: "2", label: "Andhra Pradesh" },
    { value: "3", label: "Arunachal Pradesh" },
    { value: "4", label: "Assam" },
    { value: "5", label: "Bihar" },
    { value: "6", label: "Chandigarh" },
    { value: "7", label: "Chhattisgarh" },
    { value: "8", label: "Dadra & Nagar Haveli" },
    { value: "9", label: "Daman & Diu" },
    { value: "10", label: "Delhi" },
    { value: "11", label: "Goa" },
    { value: "12", label: "Gujarat" },
    { value: "13", label: "Haryana" },
    { value: "14", label: "Himachal Pradesh" },
    { value: "15", label: "Jammu & Kashmir" },
    { value: "16", label: "Jharkhand" },
    { value: "17", label: "Karnataka" },
    { value: "18", label: "Kerala" },
    { value: "19", label: "Lakshadweep" },
    { value: "20", label: "Madhya Pradesh" },
    { value: "21", label: "Maharashtra" },
    { value: "22", label: "Manipur" },
    { value: "23", label: "Meghalaya" },
    { value: "24", label: "Mizoram" },
    { value: "25", label: "Nagaland" },
    { value: "26", label: "Orissa" },
    { value: "27", label: "Pondicherry" },
    { value: "28", label: "Punjab" },
    { value: "29", label: "Rajasthan" },
    { value: "30", label: "Sikkim" },
    { value: "31", label: "Tamil Nadu" },
    { value: "32", label: "Tripura" },
    { value: "33", label: "Uttar Pradesh" },
    { value: "34", label: "Uttaranchal" },
    { value: "35", label: "West Bengal" },
  ];

  return (
    <>
      <div className="col-12 d-none">
        <div className="col-12 d-flex px-0">
          <select
            value={location}
            onChange={(e) => demographyCall(e.target.value)}
            className="common-select form-select form-control"
          >
            <option value="">Select State</option>
            <option value="all">All</option>

            {options && options.length > 0
              ? options.map((item, index) => {
                  return (
                    <option value={item.label} key={index}>
                      {item.label}
                    </option>
                  );
                })
              : null}
          </select>

          <select
            value={selectedDistrict}
            onChange={(e) => demographyCallByCity(e.target.value)}
            className="common-select form-select form-control ml-2"
          >
            <option value="">Select District</option>
            <option value="all">All</option>

            {districtName && districtName.length > 0
              ? districtName.map((item, index) => {
                  return (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  );
                })
              : null}
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => categorySelectionChange(e.target.value)}
            className="common-select form-select form-control mx-1"
          >
            <option value="">Select Category</option>
            <option value="all">All</option>

            {category && category.length > 0
              ? category
                  .filter((item) => item.categoryStatus === true)
                  .map((item, index) => {
                    return (
                      <option
                        value={item.categoryName}
                        key={index}
                        className="text-capitalize"
                      >
                        {item.categoryName}
                      </option>
                    );
                  })
              : null}
          </select>

          <select
            value={setSelectedType}
            onChange={(e) => typeSelectionChange(e.target.value)}
            className="common-select form-select form-control"
          >
            <option value="">Select Type</option>
            <option value="all">All</option>

            {typeWh.typeList?.data && typeWh.typeList?.data?.length > 0
              ? typeWh.typeList.data.map((item, index) => {
                  return (
                    <option
                      value={item.type}
                      key={index}
                      className="text-capitalize"
                    >
                      {item.type}
                    </option>
                  );
                })
              : null}
          </select>
        </div>
      </div>
      <div className="row d-none">
        <div className="col-lg-12 mb-3 d-flex shadow-sm py-4 border bg-white">
          <select
            value={location}
            onChange={(e) => demographyCall(e.target.value)}
            className="common-select form-select form-control"
            style={{ width: "100%" }}
          >
            <option value="">Select State</option>
            <option value="all">All</option>

            {options && options.length > 0
              ? options.map((item, index) => {
                  return (
                    <option value={item.label} key={index}>
                      {item.label}
                    </option>
                  );
                })
              : null}
          </select>

          <select
            value={selectedDistrict}
            onChange={(e) => demographyCallByCity(e.target.value)}
            className="common-select form-select form-control ml-2"
            style={{ width: "100%" }}
          >
            <option value="">Select District</option>
            <option value="all">All</option>

            {districtName && districtName.length > 0
              ? districtName.map((item, index) => {
                  return (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  );
                })
              : null}
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => categorySelectionChange(e.target.value)}
            className="common-select form-select form-control mx-1"
            style={{ width: "100%" }}
          >
            <option value="">Select Category</option>
            <option value="all">All</option>

            {category && category.length > 0
              ? category
                  .filter((item) => item.categoryStatus === true)
                  .map((item, index) => {
                    return (
                      <option
                        value={item.categoryName}
                        key={index}
                        className="text-capitalize"
                      >
                        {item.categoryName}
                      </option>
                    );
                  })
              : null}
          </select>

          <select
            value={selectedType}
            onChange={(e) => typeSelectionChange(e.target.value)}
            className="common-select form-select form-control"
            style={{ width: "100%" }}
          >
            <option value="">Select Type</option>
            <option value="all">All</option>

            {typeWh.typeList?.data && typeWh.typeList?.data?.length > 0
              ? typeWh.typeList.data.map((item, index) => {
                  return (
                    <option
                      value={item.type}
                      key={index}
                      className="text-capitalize"
                    >
                      {item.type}
                    </option>
                  );
                })
              : null}
          </select>
        </div>

        {/* <div className="col-lg-6 col-md-6 col-sm-6 mt-2">
                                                Total Warehouse :{" "}
                                                {data.customerDemography?.totalWarehouse}
                                            </div> */}
      </div>

      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 mb-3 d-flex shadow-sm py-4 px-3 mx-3 border bg-white">
              <select
                value={location}
                onChange={(e) => demographyCall(e.target.value)}
                className="common-select form-select form-control"
                style={{ width: "100%" }}
              >
                <option value="">Select State</option>
                <option value="all">All</option>

                {options && options.length > 0
                  ? options.map((item, index) => {
                      return (
                        <option value={item.label} key={index}>
                          {item.label}
                        </option>
                      );
                    })
                  : null}
              </select>

              <select
                value={selectedDistrict}
                onChange={(e) => demographyCallByCity(e.target.value)}
                className="common-select form-select form-control ml-2"
                style={{ width: "100%" }}
              >
                <option value="">Select District</option>
                <option value="all">All</option>

                {districtName && districtName.length > 0
                  ? districtName.map((item, index) => {
                      return (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      );
                    })
                  : null}
              </select>

              <select
                value={selectedCategory}
                onChange={(e) => categorySelectionChange(e.target.value)}
                className="common-select form-select form-control mx-1"
                style={{ width: "100%" }}
              >
                <option value="">Select Category</option>
                <option value="all">All</option>

                {category && category.length > 0
                  ? category
                      .filter((item) => item.categoryStatus === true)
                      .map((item, index) => {
                        return (
                          <option
                            value={item.categoryName}
                            key={index}
                            className="text-capitalize"
                          >
                            {item.categoryName}
                          </option>
                        );
                      })
                  : null}
              </select>

              <select
                value={selectedType}
                onChange={(e) => typeSelectionChange(e.target.value)}
                className="common-select form-select form-control"
                style={{ width: "100%" }}
              >
                <option value="">Select Type</option>
                <option value="all">All</option>

                {typeWh.typeList?.data && typeWh.typeList?.data?.length > 0
                  ? typeWh.typeList.data.map((item, index) => {
                      return (
                        <option
                          value={item.type}
                          key={index}
                          className="text-capitalize"
                        >
                          {item.type}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>

            {/* <div className="col-lg-6 col-md-6 col-sm-6 mt-2">
                                                Total Warehouse :{" "}
                                                {data.customerDemography?.totalWarehouse}
                                            </div> */}
          </div>
        </div>
      </div>

      <div className="">
        <div className="col-12 mt-1 px-0">
          <div className="card">
            <div className="card-header bg-none py-1">
              <h5 className="mb-0">State count</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-xl-6">
                  <div className="row">
                    {demographicsStats && demographicsStats.length > 0
                      ? demographicsStats.map((item, index) => {
                          return (
                            <div key={index} className="col-sm-6">
                              <ul className="list-group">
                                <li className="d-flex align-items-center py-2 px-3 border-0 text-gray justify-content-between">
                                  <div className="d-flex align-items-center">
                                    <div style={{ color: `${item.color}` }}>
                                      <i className="fas fa-square mr-2"></i>
                                    </div>{" "}
                                    <div>{item.title}</div>
                                  </div>
                                  <div>{item.value}</div>
                                </li>
                              </ul>
                            </div>
                          );
                        })
                      : null}
                  </div>
                </div>
                <div className="col-md-6 mx-auto p-3">
                  {demographicsStats && demographicsStats.length > 0 ? (
                    <PieChart data={demographicsStats} style={{ width: 250 }} />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Demographics;
