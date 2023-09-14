import React, { useEffect } from "react";
import Layout from "../../../../layout/Layout";
import CustomerLayout from "../../../../layout/CustomerLayout";
import { Link } from "react-router-dom";
// import { PieChart } from 'react-minimal-pie-chart';
import Demographics from "../../../../components/dashboard/Demographics";
import BackButton from "../../../../components/helper/BackButton";

const WarehouseStatsByChart = () => {
  // let data =[
  //     { title: 'One', value: 10, color: '#E38627' },
  //     { title: 'Two', value: 15, color: '#C13C37' },
  //     { title: 'Three', value: 20, color: '#6A2135' },
  //   ]
  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });


  return (
    <Layout>
      <CustomerLayout title={`Dashboard`} subtitle={"My Operations"}>
        <div className="row">
          <div className="content col-12 shadow-sm pb-4">
            <div className="dashboard-btns pb-1 border-bottom mb-2 d-flex justify-content-between">
              <ul
                className="nav nav-pills common-tabs3 mb-1"
                id="pills-tab"
                role="tablist"
              >
                <nav className="pt-3" aria-label="breadcrumb">
                  <ol class="breadcrumb bg-transparent py-0 pl-0 mb-0">
                    <li
                      class="breadcrumb-item active text-warning"
                      aria-current="page"
                    >
                      My Dashboard
                    </li>
                  </ol>
                </nav>

                {/* <li className="nav-item">
                                    <Link to="/customer-stats-by-table" className="nav-link btn-md btn py-2">
                                    Informative View
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to="/customer-stats-by-chart" className="nav-link btn-md btn py-2 active">
                                    Demography View
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to="/customer-stats-by-map" className="nav-link btn-md btn py-2">
                                    Map View
                                    </Link>
                                </li> */}
              </ul>

              <BackButton />
            </div>
            <div className="tab-content" id="pills-tabContent">
              <div className="dashboard-cards row">
                <div className="row no-gutters">
                  <div className="col-md-3 align-self-center">
                    <h6 className="mb-md-0">My Warehouses</h6>
                  </div>
                  <div className="col-auto text-end ml-auto mr-0 pr-0">
                    <div className="dashboard-btns">
                      <ul
                        className="nav nav-pills common-tabs3 "
                        id="pills-tab"
                        role="tablist"
                      >
                        <li className="nav-item">
                          <Link
                            to="/customer-stats-by-table"
                            className="nav-link btn-sm btn py-2 mt-0"
                          >
                            Informative View
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link
                            to="/customer-stats-by-chart"
                            className="nav-link btn-sm btn py-2 mt-0 active mr-0"
                          >
                            Demography View
                          </Link>
                        </li>

                        {/* <li className="nav-item">
                      <Link
                        to="/customer-stats-by-map"
                        className="nav-link btn-sm btn py-2 mt-0"
                      >
                        Map View
                      </Link>
                    </li> */}
                      </ul>
                    </div>
                  </div>
                </div>

                <Demographics />
                {/* <PieChart
                              data={data}
                              style={{ width: 250 }}
                            /> */}
              </div>
            </div>
          </div>
        </div>
      </CustomerLayout>
    </Layout>
  );
};

export default WarehouseStatsByChart;
