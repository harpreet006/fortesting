import React, { useEffect } from "react";
import Layout from "../../layout/Layout";
import SubSummaryCard from "../../components/dashboard/SubSummaryCard";
import CustomerLayout from "../../layout/CustomerLayout";
import { Link } from "react-router-dom";
import {
  getDashboardV2
} from "../../store/actions/dashboardAction";
import { useSelector, useDispatch } from "react-redux";
import BackButton from "../../components/helper/BackButton";

const Dashboard = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const data = useSelector((state) => state.DASHBOARD_INFO);
  const search = new URLSearchParams(window.location.search).get('search');

 
  useEffect(() => {
    dispatch(getDashboardV2(search))
  }, [dispatch, search]);
  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });
  return (
    <Layout>

      <CustomerLayout title={`Dashboard`} subtitle={"Analytics"}> 
        <div className="row">
          <div className="content col-12">
            <div className="dashboard-btns pb-1 border-bottom mb-2 d-flex justify-content-between">
              <ul
                className="nav nav-pills common-tabs3 mb-1"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link btn-md btn py-2">
                    My Dashboard
                  </Link>
                </li>
               
                <li className="nav-item">
                  <Link to="/dashboard/analytics" className="nav-link btn-md btn py-2 active">
                    Analytics
                  </Link>
                </li>
              </ul>
              <BackButton />
            </div>
            
            <div className="tab-content" id="pills-tabContent">
              <div className="dashboard-cards row">

              {data.dashboardDetail && data.dashboardDetail.length > 0 ?
                  <>
                    {data.dashboardDetail[0].data && data.dashboardDetail[0].data.length > 0 && typeof data.dashboardDetail[0].data === ! "string" &&
                      data.dashboardDetail[0].data.map((item, index) =>
                        <SubSummaryCard
                          redirect={item?.url}
                          key={index}
                          data={item.data}
                          title={item.key}
                          imgIcon={item.imageUrl}
                        />

                      )
                    }
                  </>
                  : null}


              {/* <SummaryCard
              redirect={""}
                          count={0}
                          title={"Inventory Analysis"}
                          imgIcon={`fas fa-question  text-blue`}
                        />
                            <SummaryCard
                                          redirect={""}

                          count={0}
                          title={"Slow moving and Non Moving"}
                          imgIcon={`fas fa-question  text-blue`}
                        />
                                  <SummaryCard
                                          redirect={""}

                          count={0}
                          title={"Demand Forcasting"}
                          imgIcon={`fas fa-question  text-blue`}
                        />
                         
                         <SummaryCard
                                          redirect={""}

                          count={0}
                          title={"Comparitive of my warehouses"}
                          imgIcon={`fas fa-question  text-blue`}
                        />
                          */}
                       
                         
                         
                         
                             
                                    
                       
                         
                                 
              </div>
              
            </div>
          </div>

         
        </div>
      </CustomerLayout>
    </Layout>
  );
};

export default Dashboard;
