import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import VendorLayout from "../../layout/VendorLayout";
import MenuDrawer from "../../components/vendor/MenuDrawer";
import BrowserTitle from "../../components/helper/BrowserTitle";
import { vendorDashboardV2 } from "../../store/actions/dashboardAction";
import { useSelector, useDispatch } from "react-redux";
import InfoRfqCard from "../../wrapper/vendor/vendorDashboard/InfoRfqCard";

const Index = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const data = useSelector((state) => state.DASHBOARD_INFO);
  const search = new URLSearchParams(window.location.search).get("search");

  useEffect(() => {
    dispatch(vendorDashboardV2(search));
  }, [dispatch, search]);
  const dashboardIcons = [
    {
      id: 1,
      imgIcon: "/dashboard-icons/new-warehouses.png",
    },
    {
      id: 2,
      imgIcon: "/dashboard-icons/RFQs.png",
    },
    {
      id: 3,
      imgIcon: "/dashboard-icons/booking.png",
    },
    {
      id: 4,
      imgIcon: "/dashboard-icons/Search.png",
    },
    {
      id: 5,
      imgIcon: "/dashboard-icons/waresheet.png",
    },
    {
      id: 6,
      imgIcon: "/dashboard-icons/cart.png",
    },
    {
      id: 7,
      imgIcon: "/dashboard-icons/favoruite.png",
    },
    {
      id: 7,
      imgIcon: "/dashboard-icons/PODAudit.png",
    },
  ];

  return (
    <VendorLayout>
      <BrowserTitle title="Vendor" />
      <div className="content-admin px-1">
        <MenuDrawer />

        <div className="row justify-content-end align-items-center py-3 px-3 mx-0">
          <div className="col-12 bg-white custom-shadow p-1 mb-1  tabs-scroll">
            <ul
              className="nav nav-pills admin-tabs-blue"
              id="pills-tab"
              role="tablist"
            >
              <li className="nav-item">
                <Link to="/vendor" className="nav-link  text-uppercase">
                  My Dashboard
                </Link>
              </li>
              {/* <li className="nav-item">
                  <Link to="/vendor/space-summary" className="nav-link text-uppercase">space summary</Link>
                </li> */}
              <li className="nav-item">
                <Link
                  to="/vendor/myRfqs"
                  className="nav-link text-uppercase vendorActive"
                >
                  My RFQs
                </Link>
              </li>
              {/* <li className="nav-item">
                  <Link to="/vendor/wms" className="nav-link text-uppercase">wms</Link>
                </li> */}
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
                    data.vendorDashboardDetail.length > 0 ? (
                      <>
                        {data.vendorDashboardDetail[0].data &&
                          data.vendorDashboardDetail[0].data.length > 0 &&
                          data.vendorDashboardDetail[0].data.map(
                            (item, index) => (
                              <InfoRfqCard
                                redirect={item?.url}
                                key={index}
                                renderData={item}
                                count={item?.data}
                                title={item?.key}
                                // imgIcon={`fas fa-question  text-blue`}
                                dashboardIcon={dashboardIcons[index]}
                              />
                            )
                          )}
                      </>
                    ) : null}
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
