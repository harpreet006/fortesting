import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import VendorLayout from "../../layout/VendorLayout";
import MenuDrawer from "../../components/vendor/MenuDrawer";
import BrowserTitle from "../../components/helper/BrowserTitle";
import InfoCard from "../../wrapper/vendor/vendorDashboard/InfoCard";
// eslint-disable-next-line
import WarehouseList from "../../wrapper/vendor/vendorDashboard/WarehouseList";
import {
  vendorDashboardV2,
  // vendorDashboardCategory,
  //  vendorDashboard,
  // vendorDashboardNoOFWarehouse
} from "../../store/actions/dashboardAction";
import { useSelector, useDispatch } from "react-redux";

const Index = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const data = useSelector((state) => state.DASHBOARD_INFO);

  useEffect(() => {
    dispatch(vendorDashboardV2(""));
    // dispatch(vendorDashboardNoOFWarehouse())
    // dispatch(vendorDashboard())
    // dispatch(vendorDashboardCategory())
  }, [dispatch]);

  const dashboardIcons = [
    {
      id: 1,
      imgIcon: "/dashboard-icons/warehouse.png",
    },
    {
      id: 2,
      imgIcon: "/dashboard-icons/user-circle-gear_.png",
    },
    {
      id: 3,
      imgIcon: "/dashboard-icons/myReports.png",
    },
    {
      id: 4,
      imgIcon: "/dashboard-icons/Document Edit_.png",
    },
    {
      id: 5,
      imgIcon: "/dashboard-icons/review-icon.png",
    },
    {
      id: 6,
      imgIcon: "/dashboard-icons/myaudit.png",
    },
    {
      id: 7,
      imgIcon: "/dashboard-icons/query_.png",
    },
    {
      id: 8,
      imgIcon: "/dashboard-icons/services_.png",
    },
    {
      id: 9,
      imgIcon: "/dashboard-icons/analytics_.png",
    },
    {
      id: 10,
      imgIcon: "/dashboard-icons/icon _note_.png",
    },
    {
      id: 11,
      imgIcon: "/dashboard-icons/My-Set-up.png",
    },
    {
      id: 12,
      imgIcon: "/dashboard-icons/icon _idea alt_.png",
    },
  ];

  return (
    <VendorLayout>
      <BrowserTitle title="Vendor" />

      <div className="content-admin px-1">
        <MenuDrawer />

        <div className="row justify-content-end align-items-center py-3 px-3 ml-3 mr-0">
          <div className="col-12 custom-shadow p-1 mb-1  tabs-scroll">
            <ul
              className="nav nav-pills admin-tabs-blue"
              id="pills-tab"
              role="tablist"
            >
              <li className="nav-item">
                <Link
                  to="/vendor"
                  className="nav-link vendorActive text-uppercase"
                >
                  My Dashboard
                </Link>
              </li>
              {/* <li className="nav-item">
                  <Link to="/vendor/space-summary" className="nav-link text-uppercase">space summary</Link>
                </li> */}
              <li className="nav-item">
                <Link
                  to="/vendor/demograpgy-summary"
                  className="nav-link text-uppercase"
                >
                  Demographics summary
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/vendor/wms" className="nav-link text-uppercase">
                  wms
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-12 px-0 pt-1">
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-warehouse-summary"
                role="tabpanel"
                aria-labelledby="pills-warehouse-summary-tab"
              >
                <div className="dashboard-cards">
                  <div className="row">
                    {data.vendorDashboardDetail &&
                      data.vendorDashboardDetail.length > 0 &&
                      data.vendorDashboardDetail.map((item, index) => (
                        <InfoCard
                          redirect={item?.url}
                          key={index}
                          data={item}
                          index={index}
                          title={item?.key}
                          // imgIcon={item?.imageUrl}
                          dashboardIcon={dashboardIcons[index]}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default Index;
