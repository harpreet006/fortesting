import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import SummaryCard from "../../components/dashboard/SummaryCard";
import CustomerLayout from "../../layout/CustomerLayout";
import { Link } from "react-router-dom";
// import { getDashboardV2 } from "../../store/actions/dashboardAction";
// import { useSelector, useDispatch } from "react-redux";
import CustomLoader, {
  ItemNotFlund,
} from "../../components/helper/CustomLoader";
import BackButton from "../../components/helper/BackButton";
import axiosauth from "../../api/axios-auth";

const Dashboard = () => {
  // const dispatch = useDispatch();
  // const data = useSelector((state) => state.DASHBOARD_INFO);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);
 
  console.log(data, "check ");

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
      id: 9,
      imgIcon: "/dashboard-icons/icon _note_.png",
    },
    {
      id: 9,
      imgIcon: "/dashboard-icons/icon _idea alt_.png",
    },
  ];
  

  useEffect(() => {
    try {
      axiosauth
        .get(`/api/v1/dashboard/customer?search=${""}`)
        .then((response) => {
          let res = JSON.parse(response.data);

          if (res.statusCode === 200) {
            setData(res.data);
            setLoader(false);
          }
        })
        .catch((error) => {
          setError(error.response?.statusText);
        })
        .then(() => {});
    } catch (e) {}
  }, []);

  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });

  return (
    <Layout>
      <CustomerLayout title={`Dashboard`}>
        <div className="row">
          <div className="content col-12 shadow-lg pl-3" style={{backgroundColor:"#F5F7F9"}}>
            <div className="dashboard-btns border-bottom mb-2 d-flex justify-content-between">
              
              <nav className="align-self-center mb-0 pb-0" aria-label="breadcrumb">
                <ol class="bg-transparent breadcrumb py-0 mb-0 px-0">
                  <li class="breadcrumb-item active text-warning" aria-current="page">
                  My Dashboard
                  </li>
                </ol>
              </nav>
              <BackButton />
            </div>
            {error == null ? (
              loader ? (
                <CustomLoader />
              ) : (
                <div className="tab-content sha" id="pills-tabContent">
                  <div className="dashboard-cards row">
                    {data?.length > 0 ? (
                      data.map((item, index) => (
                        <SummaryCard
                          redirect={item?.url}
                          key={index}
                          index={index}
                          data={item}
                          title={item.key}
                          // imgIcon={item.imageUrl}
                          dashboardIcon={dashboardIcons[index]}
                        />
                      ))
                    ) : (
                      <ItemNotFlund message="No Data Available" mtop="my-5" />
                    )}

                    <div className="col-xxl-3 col-xl-4 col-md-6 mb-4 new-card-box">
                    <Link to={`/dashboard/docs`} className="d-flex h-100 w-100">
                      <div
                        className="dashboard-card bg-white d-flex cardHover w-100 "
                        // style={{ height: 100 }}
                      >
                        <div className="d-flex align-items-center justify-content-center mx-4 my-auto">
                        <div className="icons-box">
                          <img
                          src="/dashboard-icons/myReports.png"
                            // src={`https://backlive.warehousity.com/api/v1/buildingtraderelated/bfdcdf57-7fc6-4003-ba83-3632b0dc3fc1.png`}
                            alt={`documents`}
                            className="p-2"
                            // style={{ maxWidth: 65, height: 65 }}
                          />
                          </div>  
                        </div>
                        <div className="card-body align-self-center px-0 py-0">
                        <h6 className=" font-weight-bold">
                            6
                          </h6>
                          <p className="" style={{fontSize:"17px"}}>Documents</p>
                       
                        </div>
                      </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            ) : (
              <ItemNotFlund message={error} mtop="my-5" />
            )}
          </div>
          
        </div>
   
        
      </CustomerLayout>
    </Layout>
  );
};

export default Dashboard;
