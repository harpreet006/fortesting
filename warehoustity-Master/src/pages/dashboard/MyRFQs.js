import React, { useEffect } from "react";
import Layout from "../../layout/Layout";
import CustomerLayout from "../../layout/CustomerLayout";
import { Link } from "react-router-dom";
import { getDashboardV2 } from "../../store/actions/dashboardAction";
import { useSelector, useDispatch } from "react-redux";
import SubSummaryRfqCard from "../../components/dashboard/SubSummaryRfqCard";
import BackButton from "../../components/helper/BackButton";

const Dashboard = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const data = useSelector((state) => state.DASHBOARD_INFO);
  const search = new URLSearchParams(window.location.search).get("search");

  useEffect(() => {
    dispatch(getDashboardV2(search));
  }, [dispatch, search]);

  const imgLists = [""]
  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });
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
    <Layout>
      <CustomerLayout title={`Dashboard`} subtitle={"My RFQs"}>
        <div className="row">
          <div className="content col-12 shadow-sm">
            <div className="dashboard-btns pb-1 border-bottom mb-2 d-flex justify-content-between">
            
              <nav className="pt-3" aria-label="breadcrumb">
                <ol class="breadcrumb bg-transparent py-0 mb-0">
                  <li class="breadcrumb-item ">
                    <Link to="/dashboard" className="text-dark">My Dashboard</Link>
                  </li>
                  <li class="breadcrumb-item active text-warning" aria-current="page">
                  My RFQs
                  </li>
                </ol>
              </nav>
              
              <BackButton />
            </div>
            <div className="tab-content" id="pills-tabContent">
              <div className="dashboard-cards row">
                {data.dashboardDetail && data.dashboardDetail.length > 0 ? (
                  <>
                    {data.dashboardDetail[0].data &&
                      data.dashboardDetail[0].data.length > 0 &&
                      data.dashboardDetail[0].data.map((item, index) => (
                        <SubSummaryRfqCard
                          redirect={item?.url}
                          key={index}
                          data={item.data}
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
