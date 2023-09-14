import React, { useEffect } from "react";
import Layout from "../../../layout/Layout";
import SubSummaryCard from "../../../components/dashboard/SubSummaryCard";
import CustomerLayout from "../../../layout/CustomerLayout";
import { Link } from "react-router-dom";
import { getDashboardV2 } from "../../../store/actions/dashboardAction";
import { useSelector, useDispatch } from "react-redux";
import BackButton from "../../../components/helper/BackButton";

const Dashboard = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const data = useSelector((state) => state.DASHBOARD_INFO);
  const search = new URLSearchParams(window.location.search).get("search");

  useEffect(() => {
    dispatch(getDashboardV2(search));
  }, [dispatch, search]);

  const imgLists = [""];
  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });

  const dashboardIcons = [
    {
      id: 1,
      imgIcon: "/dashboard-icons/warehouse.png",
    },
    {
      id: 2,
      imgIcon: "/dashboard-icons/MyCFA.png",
    },
    {
      id: 3,
      imgIcon: "/dashboard-icons/SpaceUnder-Management.png",
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
    <Layout>
      <CustomerLayout title={`Dashboard`} subtitle={"My Warehouses"}>
        <div className="row">
          <div className="content col-12 shadow-sm">
            <div className="dashboard-btns pb-1 border-bottom mb-2  d-flex justify-content-between">
              <ul
                className="nav nav-pills common-tabs3 mb-1 d-none"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link btn-link py-2 ">
                    My Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/dashboard/mywarehouses"
                    className="nav-link btn-md btn py-2 active"
                  >
                    My Warehouses
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link to="/dashboard-wms" className="nav-link btn-md btn py-2">
                    WMS
                  </Link>
                </li> */}
              </ul>

              <nav className="pt-3" aria-label="breadcrumb">
                <ol class="breadcrumb bg-transparent py-0">
                  <li class="breadcrumb-item ">
                    <Link to="/dashboard" className="text-dark">My Dashboard</Link>
                  </li>
                  <li class="breadcrumb-item active text-warning" aria-current="page">
                  My Warehouses
                  </li>
                </ol>
              </nav>

              <BackButton />
            </div>

            <div className="tab-content" id="pills-tabContent">
              <div className="dashboard-cards row">
                {data.dashboardDetail &&
                data.dashboardDetail.length > 0 ? (
                  <>
                    {data.dashboardDetail[0].data &&
                      data.dashboardDetail[0].data.length > 0 &&
                      data.dashboardDetail[0].data.map((item, index) => (
                        <SubSummaryCard
                          redirect={item?.url}
                          key={index}
                          data={item.data}
                          count={item.count}
                          title={item.key}
                          // imgIcon={imgLists[index]}
                          dashboardIcon={dashboardIcons[index]}
                        />
                      ))}
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </CustomerLayout>
    </Layout>
  );
};

export default Dashboard;
