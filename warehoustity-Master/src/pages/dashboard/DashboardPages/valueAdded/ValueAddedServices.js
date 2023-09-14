import React, { useEffect } from "react";
import Layout from "../../../../layout/Layout";
// import SubSummaryCard from "../../components/dashboard/SubSummaryCard";
import CustomerLayout from "../../../../layout/CustomerLayout";
import { Link } from "react-router-dom";
import { getDashboardV2 } from "../../../../store/actions/dashboardAction";
import { useSelector, useDispatch } from "react-redux";
import ValueAddedSummeryCard from "../../../../components/dashboard/ValueAddedSummeryCard";
import BackButton from "../../../../components/helper/BackButton";

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

  return (
    <Layout>
      <CustomerLayout title={`Dashboard`} subtitle={"Value Added Services"}>
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

                <li className="nav-item">
                  <Link
                    to="/dashboard/valueaddedservices"
                    className="nav-link btn-md btn py-2 active"
                  >
                    Value Added Services
                  </Link>
                </li>
              </ul>
              <BackButton />
            </div>
            <div className="tab-content" id="pills-tabContent">
              <div className="dashboard-cards row">
                {data.dashboardDetail &&
                  data.dashboardDetail.length > 0 && typeof data.dashboardDetail[0].data === ! "string" &&
                  data.dashboardDetail[0].data.map((item, index) => 
                    <ValueAddedSummeryCard
                      redirect={item?.url}
                      key={index}
                      data={item.data}
                      title={item.key}
                      index={index}
                      service={item}
                      imgIcon={imgLists[index]}
                    />
                  )}
              </div>
            </div>
          </div>
        </div>
      </CustomerLayout>
    </Layout>
  );
};

export default Dashboard;
