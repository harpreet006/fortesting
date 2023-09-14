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

  const imgLists = [""]

  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });

  const dashboardIcons = [
    {
      id: 1,
      imgIcon: "/dashboard-icons/mycompliances-2.png",
    },
    {
      id: 2,
      imgIcon: "/dashboard-icons/manpower-compliance.png",
    },
    {
      id: 3,
      imgIcon: "/dashboard-icons/safety-compliance.png",
    },
    {
      id: 4,
      imgIcon: "/dashboard-icons/Licenses.png",
    },
    {
      id: 5,
      imgIcon: "/dashboard-icons/GST-certificate.png",
    },
    {
      id: 6,
      imgIcon: "/dashboard-icons/trade_lisence.png",
    },
    {
      id: 7,
      imgIcon: "/dashboard-icons/others.png",
    },
    
  ];

  return (
    <Layout>

      <CustomerLayout title={`Dashboard`} subtitle={"My Compliances"}>
        <div className="row">
          <div className="content col-12 shadow-sm">
            <div className="dashboard-btns pb-1 border-bottom mb-2 d-flex justify-content-between">
             
              <nav className="pt-3" aria-label="breadcrumb">
                <ol class="breadcrumb bg-transparent py-0">
                  <li class="breadcrumb-item ">
                    <Link to="/dashboard" className="text-dark">My Dashboard</Link>
                  </li>
                  <li class="breadcrumb-item active text-warning" aria-current="page">
                  My Compliances 
                  </li>
                </ol>
              </nav>

<BackButton /> 

            </div>
            
            <div className="tab-content " id="pills-tabContent">
              <div className="dashboard-cards row">

                {data.dashboardDetail && data.dashboardDetail.length > 0 ?
                  <>
                    {data.dashboardDetail[0].data && data.dashboardDetail[0].data.length > 0 &&
                      data.dashboardDetail[0].data.map((item, index) =>
                        <SubSummaryCard
                          redirect={item?.url}
                          key={index}
                          data={item.data}
                          title={item.key}
                          // imgIcon={imgLists[index]}
                          dashboardIcon={dashboardIcons[index]}
                        />

                      )
                    }
                  </>
                  : null}


                {/* <SummaryCard
              redirect={""}
                          count={0}
                          title={"Warehouse Compliance snapshot as per Warehousity 'on-boarding Checklist'"}
                          imgIcon={`fas fa-question  text-blue`}
                        />
                            <SummaryCard
                                          redirect={""}

                          count={0}
                          title={"Manpower Compliance"}
                          imgIcon={`fas fa-question  text-blue`}
                        />
                            <SummaryCard
                                          redirect={""}

                          count={0}
                          title={"Safety Compliance (EHS)"}
                          imgIcon={`fas fa-question  text-blue`}
                        />
                             <SummaryCard
                                           redirect={""}

                          count={0}
                          title={"Licenses (Mandatory vs availability)"}
                          imgIcon={`fas fa-question  text-blue`}
                        />
                          
                          <SummaryCard
                                           redirect={""}

                          count={0}
                          title={"GST Certificate"}
                          imgIcon={`fas fa-question  text-blue`}
                        />
                              <SummaryCard
                                           redirect={""}

                          count={0}
                          title={"Trade Licence"}
                          imgIcon={`fas fa-question  text-blue`}
                        />
                                      <SummaryCard
                                           redirect={""}

                          count={0}
                          title={"Others"}
                          imgIcon={`fas fa-question  text-blue`}
                        />       */}



              </div>

            </div>
          </div>


        </div>
      </CustomerLayout>
    </Layout>
  );
};

export default Dashboard;
