import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import VendorLayout from '../../layout/VendorLayout';
import MenuDrawer from '../../components/vendor/MenuDrawer';
import BrowserTitle from '../../components/helper/BrowserTitle';
import InfoCard from '../../wrapper/vendor/vendorDashboard/InfoCard';
// eslint-disable-next-line
import WarehouseList from '../../wrapper/vendor/vendorDashboard/WarehouseList';
// import { vendorDashboardCategory, vendorDashboard, vendorDashboardNoOFWarehouse } from '../../store/actions/dashboardAction'
import { useSelector, useDispatch } from 'react-redux';

const Index = () => {

  const dispatch = useDispatch();
  // eslint-disable-next-line
  const data = useSelector((state) => state.DASHBOARD_INFO);

  useEffect(() => {
    // dispatch(vendorDashboardNoOFWarehouse())
    // dispatch(vendorDashboard())
    // dispatch(vendorDashboardCategory())
  }, [dispatch]);


  return (
    <VendorLayout>
      <BrowserTitle title="Vendor" />
      <div className="content-admin px-1">
          <MenuDrawer />


        <div className="row justify-content-end align-items-center py-3 px-3 mx-0">
          <div className="col-12 bg-white custom-shadow p-1 mb-1  tabs-scroll">
            <ul className="nav nav-pills admin-tabs-blue" id="pills-tab" role="tablist">
              <li className="nav-item">
                <Link to="/vendor" className="nav-link vendorActive text-uppercase">My Dashboard</Link>
              </li>
              {/* <li className="nav-item">
                  <Link to="/vendor/space-summary" className="nav-link text-uppercase">space summary</Link>
                </li> */}
              <li className="nav-item">
                <Link to="/vendor/valueAddedServices" className="nav-link text-uppercase">Analytics</Link>
              </li>
              {/* <li className="nav-item">
                  <Link to="/vendor/wms" className="nav-link text-uppercase">wms</Link>
                </li> */}
            </ul>
          </div>

        <b>Analytics</b>
          <p></p>
          <div className="col-12 px-0 pt-1">
            <div className="tab-content" id="pills-tabContent">
              <div className="tab-pane fade show active" id="pills-warehouse-summary" role="tabpanel" aria-labelledby="pills-warehouse-summary-tab">
                <div className="dashboard-cards">
                <div className="row">
                  
                  <InfoCard redirect={""} key={0} count={5} title={"Inventory Analysis "} imgIcon={`fas fa-question  text-blue`} />


                  <InfoCard redirect={""} key={0} count={10} title={"Slow moving and Non Moving"} imgIcon={`fas fa-question  text-blue`} />
                  <InfoCard redirect={""} key={0} count={15} title={"Demand Forcasting "} imgIcon={`fas fa-question  text-blue`} />
                  <InfoCard redirect={""} key={0} count={15} title={"Comparitive of my warehouses "} imgIcon={`fas fa-question  text-blue`} />

                

              
 
                 

                  
               

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