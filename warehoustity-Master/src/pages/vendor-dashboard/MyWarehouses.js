import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import VendorLayout from '../../layout/VendorLayout';
import MenuDrawer from '../../components/vendor/MenuDrawer';
import BrowserTitle from '../../components/helper/BrowserTitle';
import { useSelector, useDispatch } from 'react-redux';
import {
  vendorDashboardV2
} from '../../store/actions/dashboardAction'
import InfoWarehouseCard from '../../wrapper/vendor/vendorDashboard/InfoWarehouseCard';

const Index = () => {

  const dispatch = useDispatch();
  // eslint-disable-next-line
  const data = useSelector((state) => state.DASHBOARD_INFO);
  console.log(data, "data")
  const search = new URLSearchParams(window.location.search).get('search');

  useEffect(() => {
    dispatch(vendorDashboardV2(search))
  }, [dispatch, search]);
  const dashboardIcons = [
    {
      id: 1,
      imgIcon: "/dashboard-icons/My-Warehouse_State-Wise.png",
    },
    {
      id: 2,
      imgIcon: "/dashboard-icons/Warehouse_C&F Wise.png",
    },
    {
      id: 3,
      imgIcon: "/dashboard-icons/My-Warehouse_Area Wise.png",
    },
    {
      id: 4,
      imgIcon: "/dashboard-icons/GeographicalDistribution.png",
    },
    {
      id: 5,
      imgIcon: "/dashboard-icons/Matrix.png",
    },
    {
      id: 6,
      imgIcon: "/dashboard-icons/MyTeam.png",
    },
    {
      id: 7,
      imgIcon: "/dashboard-icons/MyInfra.png",
    },
    {
      id: 8,
      imgIcon: "/dashboard-icons/MWcore.png",
    },
    
  ];

  return (
    <VendorLayout>
      <BrowserTitle title="Vendor" />
      <div className="content-admin px-1">
        <MenuDrawer />


        <div className="row justify-content-end align-items-center py-3 px-3 ml-3 mr-0">
          <div className="col-12 bg-white custom-shadow p-1 mb-1  tabs-scroll">
            <ul className="nav nav-pills admin-tabs-blue" id="pills-tab" role="tablist">
              <li className="nav-item">
                <Link to="/vendor" className="nav-link  text-uppercase">My Dashboard</Link>
              </li>
              {/* <li className="nav-item">
                  <Link to="/vendor/space-summary" className="nav-link text-uppercase">space summary</Link>
                </li> */}
              <li className="nav-item">
                <Link to="/vendor/myWarehouses" className="nav-link text-uppercase vendorActive">My Warehouses</Link>
              </li>
              {/* <li className="nav-item">
                  <Link to="/vendor/wms" className="nav-link text-uppercase">wms</Link>
                </li> */}
            </ul>
          </div>

          {/* <b>My Warehouses</b>
          <p></p> */}
          <div className="col-12 px-0 pt-1">
            <div className="tab-content" id="pills-tabContent">
              <div className="tab-pane fade show active" id="pills-warehouse-summary" role="tabpanel" aria-labelledby="pills-warehouse-summary-tab">
                <div className="dashboard-cards">

                  <div className="row">
                    {data.vendorDashboardDetail && data.vendorDashboardDetail.length > 0 ?
                      <>
                        {data?.vendorDashboardDetail[0]?.data && data?.vendorDashboardDetail[0]?.data.length > 0 &&
                          data?.vendorDashboardDetail[0]?.data?.map((item, index) =>
                            <InfoWarehouseCard
                              redirect={item?.url}
                              key={index}
                              data={item.data}
                              title={item?.key}
                              index={index}
                              // imgIcon={item?.imageUrl}
                              dashboardIcon={dashboardIcons[index]}
                            />
                          )
                        }
                      </>
                      : null}

                    {/* <InfoCardV2 redirect={""} key={0} count={5} title={"List of my warehouses with cities / states / Customers etc"} imgIcon={`fas fa-question  text-blue`} />
                    <InfoCardV2 redirect={""} key={0} count={10} title={"List of warehouses with contact details and escalation matrix"} imgIcon={`fas fa-question  text-blue`} />
                    <InfoCardV2 redirect={""} key={0} count={15} title={"Geopraphical distribution - Qty wise / Area wise (State / City / Pin Code)"} imgIcon={`fas fa-question  text-blue`} />
                    <InfoCardV2 redirect={""} key={0} count={20} title={"Warehousewise Map-representation of the area "} imgIcon={`fas fa-question  text-blue`} />
                    <InfoCardV2 redirect={""} key={0} count={25} title={"My Team"} imgIcon={`fas fa-question  text-blue`} />
                    <InfoCardV2 redirect={""} key={0} count={30} title={"My Attendance"} imgIcon={`fas fa-question  text-blue`} />
                    <InfoCardV2 redirect={""} key={0} count={5} title={"My Infra (categoriwise infra Based on the infra checklist)"} imgIcon={`fas fa-question  text-blue`} /> */}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </VendorLayout>
  )
}

export default Index;