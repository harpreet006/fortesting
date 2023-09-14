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


const MyReport = () => {
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
  
    const dashboardIcons = [
      {
        id: 1,
        imgIcon: "/dashboard-icons/MyInventory.png",
      },
      {
        id: 2,
        imgIcon: "/dashboard-icons/Agency.png",
      },
      {
        id: 3,
        imgIcon: "/dashboard-icons/MyGRNReports.png",
      },
      {
        id: 4,
        imgIcon: "/dashboard-icons/DReport.png",
      },
      {
        id: 5,
        imgIcon: "/dashboard-icons/Quareport.png",
      },
      {
        id: 6,
        imgIcon: "/dashboard-icons/conReport.png",
      },
      {
        id: 7,
        imgIcon: "/dashboard-icons/RReport.png",
      },
      {
        id: 9,
        imgIcon: "/dashboard-icons/DamReport.png",
      },
      {
        id: 10,
        imgIcon: "/dashboard-icons/DlyReport.png",
      },
      {
        id: 11,
        imgIcon: "/dashboard-icons/CusReporrt.png",
      },
      {
        id: 11,
        imgIcon: "/dashboard-icons/POD.png",
      },
      
    ];
    return (
        <Layout>

      <CustomerLayout title={`Dashboard`} subtitle={"My Audit"}>
        <div className="row">
          <div className="content col-12 shadow-sm">
            <div className="dashboard-btns pb-1 border-bottom mb-2 d-flex justify-content-between">
              
              <nav className="pt-3" aria-label="breadcrumb">
                <ol class="breadcrumb bg-transparent py-0">
                  <li class="breadcrumb-item ">
                    <Link to="/dashboard" className="text-dark">My Dashboard</Link>
                  </li>
                  <li class="breadcrumb-item active text-warning" aria-current="page">
                  My My Report
                  </li>
                </ol>
              </nav>
              <BackButton />
            </div>
            <div className="tab-content" id="pills-tabContent">
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
                          // imgIcon={item.imageUrl}
                          dashboardIcon={dashboardIcons[index]}
                        />

                      )
                    }
                  </>
                  : null}


              {/* <SummaryCard
              redirect={""}
                          count={0}
                          title={"My Inventory Audit (Cycle Count / Full Stock)"}
                          imgIcon={`fas fa-question  text-blue`}
                        />
                            <SummaryCard
                                          redirect={""}

                          count={0}
                          title={"My Delivery Audit"}
                          imgIcon={`fas fa-question  text-blue`}
                        />
                            <SummaryCard
                                          redirect={""}

                          count={0}
                          title={"My POD Audit"}
                          imgIcon={`fas fa-question  text-blue`}
                        />
                             <SummaryCard
                                           redirect={""}

                          count={0}
                          title={"My Delivery Confirmations"}
                          imgIcon={`fas fa-question  text-blue`}
                        /> */}
                          
                         
                             
                                    
                       
                         
                                 
              </div>
              
            </div>
          </div>

         
        </div>
      </CustomerLayout>
    </Layout>
    )
}

export default MyReport
