import React, { useEffect, useState } from "react";
import Layout from "../../../../layout/Layout";
import CustomerLayout from "../../../../layout/CustomerLayout";
import { Link } from "react-router-dom";
// import Maps from '../../../../pages/warehouse/Maps';
import Map from '../../../../pages/warehouse/Map'
import { useDispatch, useSelector } from 'react-redux';
import { warehouseByPage } from '../../../../store/actions/warehouseAction';
import pinCode from '../../../../json/pincode.json';
import { getCustomerDemograpgy } from "../../../../store/actions/dashboardAction";
import { getWarehouseListByFilter } from '../../../../components/utils';
import { typeByPage } from "../../../../store/actions/whyAction";
import { categoryByPage } from "../../../../store/actions/categoryAction";
import BackButton from "../../../../components/helper/BackButton";

const WarehouseStatsByMap = (props) => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.WAREHOUSEINFO);
    const category = useSelector((state) => state.CATEGORY_INFO.categoryList);
    const typeWh = useSelector((state) => state.WHY_INFO);


    const [location, setLocation] = useState("Delhi");
    const [districtName, setDistrictName] = useState([])
    const [filterState, setFilterState] = useState({})
    // const data = useSelector((state) => state.DASHBOARD_INFO);

     // eslint-disable-next-line
    const [selectedState, setSelectedState] = useState([])
     // eslint-disable-next-line
    const [selectedCity, setSelectedCity] = useState([])
     // eslint-disable-next-line
    const [selectedType, setSelectedType] = useState([])
    const [selectedCategory, setSelectedCategory] = useState([])

    const [coordinates1, setCoordinates1] = useState([])


    async function getFilteredWarehouses() {

        const wareHouseList = getWarehouseListByFilter(filterState, items?.listOfWarehouse?.data)

        let coord = []
        if (wareHouseList && wareHouseList.length > 0) {
            wareHouseList.map((warehouse) => {return(
                coord.push({
                    category: warehouse.category,
                    id: warehouse.id,
                    image: "http://139.59.13.212:8080/api/v1/warehouseimage/166dd3ee-4a5a-4caa-a1a5-18863a7dc115.jpg",
                    lat: parseFloat(warehouse.warehouseContactDetailInfo.address.latitude),
                    lng: parseFloat(warehouse.warehouseContactDetailInfo.address.longnitude),
                    location: warehouse.warehouseContactDetailInfo.address.city,
                    totalArea: warehouse.totalArea,
                    type: warehouse.category
                }))
            }
            )
        }
        setCoordinates1(coord)
    }


    useEffect(()=>{
        if(items?.listOfWarehouse?.data && items?.listOfWarehouse?.data.length>0){
            let coord = []
            items.listOfWarehouse.data.map((warehouse) => {
                coord.push({
                    category: warehouse.category,
                    id: warehouse.id,
                    image: "http://139.59.13.212:8080/api/v1/warehouseimage/166dd3ee-4a5a-4caa-a1a5-18863a7dc115.jpg",
                    lat: parseFloat(warehouse.warehouseContactDetailInfo?.address.latitude),
                    lng: parseFloat(warehouse.warehouseContactDetailInfo?.address.longnitude),
                    location: warehouse.warehouseContactDetailInfo?.address.city,
                    totalArea: warehouse.totalArea,
                    type: warehouse.category
                })
            return warehouse    
            }
            )
            setCoordinates1(coord)
        }
    }, [items])


    async function stateSelectionChange(state) { // 233227

        setSelectedState([state])
        filterState.state = [state.toUpperCase()]
        setFilterState(filterState)

        getFilteredWarehouses()


        const district = new Set()
        // console.log('pin--', pin)
        await pinCode.forEach(pin => {
            if (pin.stateName === state.toUpperCase()) {
                district.add(pin.districtName)
            }
        })
        console.log(Array.from(district))
        setDistrictName(Array.from(district))
        return Array.from(district)
    }



    async function typeSelectionChange(warehouseType) { // 233227

        setSelectedType(warehouseType)
        filterState.warehouseType = [warehouseType.toUpperCase()]
        setFilterState(filterState)
        getFilteredWarehouses()
    }

    async function categorySelectionChange(warehouseCategory) { // 233227

        setSelectedCategory(warehouseCategory)
        filterState.warehouseCategory = [warehouseCategory.toUpperCase()]
        setFilterState(filterState)
        getFilteredWarehouses()
    }


    const demographyCall = (state) => {
        if (state !== "") {
            stateSelectionChange(state)
            setLocation(state);
            dispatch(
                getCustomerDemograpgy({
                    city: null,
                    state: state,
                })
            );
        }
    };

    const demographyCallByCity = (city) => {
        if (city !== "") {
            dispatch(
                getCustomerDemograpgy({
                    city: city,
                    state: location,
                })
            );

            // stateSelectionChange(city)
            // setLocation(city);
            // dispatch(
            //   getCustomerDemograpgy({
            //     city: city,
            //   })
            // );
        }
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

    // =========================

    useEffect(() => {

        // dispatch(dashboardFilter())

        let filter = {
            "filter": {
                "type": "adminStatus",
                "status": "approved",
            }
        }
        dispatch(warehouseByPage(parseInt(1), filter, 100000000))

        setFilterState({
            "state": [],
            "city": [],
            "warehouseType": [],
            "warehouseCategory": [],
            "cfa": [],
        })

    }, [dispatch])

    useEffect(() => {
        dispatch(typeByPage());
        dispatch(categoryByPage());
    }, [dispatch]);


    return (
        <Layout>

            <CustomerLayout title={`Dashboard`} subtitle={"My Operations"}>
                <div className="row">
                    <div className="content col-12">
                        <div className="dashboard-btns pb-1 border-bottom mb-2 d-flex justify-content-between">
                            <ul
                                className="nav nav-pills common-tabs3 mb-1"
                                id="pills-tab"
                                role="tablist"
                            >
                                <li className="nav-item">
                                    <Link to="/dashboard" className="nav-link btn-md btn py-2 ">
                                        My Dashboard
                                    </Link>
                                </li>

                                {/* <li className="nav-item">
                                    <Link to="/customer-stats-by-table" className="nav-link btn-md btn py-2">
                                    Informative View
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to="/customer-stats-by-chart" className="nav-link btn-md btn py-2">
                                    Demography View
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to="/customer-stats-by-map" className="nav-link btn-md btn py-2 active">
                                    Map View
                                    </Link>
                                </li> */}
                            </ul>
                            <BackButton />
                        </div>
                        <div className="tab-content" id="pills-tabContent" style={{ height: "100vh" }}>
                            <div className="dashboard-cards pr-5 pb-5">

                            <div className="dashboard-btns pb-1  mb-2">
                            <ul
                                className="nav nav-pills common-tabs3 mb-1"
                                id="pills-tab"
                                role="tablist"
                            >
                                

                                <li className="nav-item">
                                    <Link to="/customer-stats-by-table" className="nav-link btn-sm btn py-2 mt-0">
                                    Informative View
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to="/customer-stats-by-chart" className="nav-link btn-sm btn py-2 mt-0">
                                    Demography View
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to="/customer-stats-by-map" className="nav-link btn-sm btn py-2 mt-0 active">
                                    Map View
                                    </Link>
                                </li>

                            </ul>
                        </div>






                                <div className="row">
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 col-sm-12 mb-3 d-flex">

                                                <select
                                                    value={location}
                                                    onChange={(e) => demographyCall(e.target.value)}
                                                    className="common-select  form-select form-control"
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
                                                    value={location}
                                                    onChange={(e) => demographyCallByCity(e.target.value)}
                                                    className="common-select  form-select form-control ml-2"
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
                                                    className="common-select  form-select form-control mx-1"
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
                                                    className="common-select  form-select form-control"
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


                                {coordinates1 && coordinates1.length > 0 &&
                                    <div id="deliverynearbymap" style={{ width: '100%' }}>
                                        <Map
                                            google={props.google}
                                            center={{
                                                lat: coordinates1 && coordinates1.length > 0 ? coordinates1[0].lat : 28.70,
                                                lng: coordinates1 && coordinates1.length > 0 ? coordinates1[0].lng : 77.1025
                                            }}
                                            latlng={coordinates1}
                                            height='200px'
                                            zoom={5}
                                        />
                                    </div>

                                }


                            </div>

                        </div>
                    </div>


                </div>
            </CustomerLayout>
        </Layout>
    )
}

export default WarehouseStatsByMap
