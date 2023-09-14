import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import VendorLayout from '../../layout/VendorLayout';
import MenuDrawer from '../../components/vendor/MenuDrawer';
import BrowserTitle from '../../components/helper/BrowserTitle';
import InfoCard from '../../wrapper/vendor/vendorDashboard/InfoCard';
// eslint-disable-next-line
import WarehouseList from '../../wrapper/vendor/vendorDashboard/WarehouseList';
import { useSelector, useDispatch } from 'react-redux';

import {
  vendorDashboardV2,
  // vendorDashboardCategory,
  //  vendorDashboard,
  // vendorDashboardNoOFWarehouse
} from '../../store/actions/dashboardAction'

const VendorDashboardDynamic = () => {

    const dispatch = useDispatch();
  // eslint-disable-next-line
  const data = useSelector((state) => state.DASHBOARD_INFO);
  const search = new URLSearchParams(window.location.search).get('search');

  useEffect(() => {
    dispatch(vendorDashboardV2(search))
    // dispatch(vendorDashboardNoOFWarehouse())
    // dispatch(vendorDashboard())
    // dispatch(vendorDashboardCategory())
  }, [dispatch, search]);

    return (
        <VendorLayout>
        <BrowserTitle title="Vendor" />
        <div className="content-admin px-1">
          <MenuDrawer />
  
  
          <div className="row justify-content-end align-items-center py-3 px-3 mx-0">
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
  
            <b>My Warehouses</b>
            <p></p>
            <div className="col-12 px-0 pt-1">
              <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-warehouse-summary" role="tabpanel" aria-labelledby="pills-warehouse-summary-tab">
                  <div className="dashboard-cards">
                    <div className="row">
  
  
                      {data.vendorDashboardDetail && data.vendorDashboardDetail.length > 0 &&
  
                        data.vendorDashboardDetail.map((item, index) => <InfoCard redirect={item?.url} key={index} data={item} count={item?.data} title={item?.key} imgIcon={`fas fa-question  text-blue`} />)
                      }
  
                      <InfoCard redirect={""} key={0} count={5} title={"List of my warehouses with cities / states / Customers etc"} imgIcon={`fas fa-question  text-blue`} />
  
  
                      <InfoCard redirect={""} key={0} count={10} title={"List of warehouses with contact details and escalation matrix"} imgIcon={`fas fa-question  text-blue`} />
                      <InfoCard redirect={""} key={0} count={15} title={"Geopraphical distribution - Qty wise / Area wise (State / City / Pin Code)"} imgIcon={`fas fa-question  text-blue`} />
  
  
                      <InfoCard redirect={""} key={0} count={20} title={"Warehousewise Map-representation of the area "} imgIcon={`fas fa-question  text-blue`} />
  
  
                      <InfoCard redirect={""} key={0} count={25} title={"My Team"} imgIcon={`fas fa-question  text-blue`} />
  
  
                      <InfoCard redirect={""} key={0} count={30} title={"My Attendance"} imgIcon={`fas fa-question  text-blue`} />
  
                      <InfoCard redirect={""} key={0} count={5} title={"My Infra (categoriwise infra Based on the infra checklist)"} imgIcon={`fas fa-question  text-blue`} />
  
  
  
  
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

export default VendorDashboardDynamic
