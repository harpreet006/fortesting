import React from "react";
import Layout from "../../../../layout/Layout";
import CustomerLayout from "../../../../layout/CustomerLayout";
import { Link } from "react-router-dom";
import { PieChart } from 'react-minimal-pie-chart';

const WarehouseStatsByChart = () => {
    let data =[
        { title: 'One', value: 10, color: '#E38627' },
        { title: 'Two', value: 15, color: '#C13C37' },
        { title: 'Three', value: 20, color: '#6A2135' },
      ]
      
    return (
        <Layout>

            <CustomerLayout title={`Dashboard`} subtitle={"My Operations"}>
                <div className="row">
                    <div className="content col-12">
                        <div className="dashboard-btns pb-1 border-bottom mb-2">
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
                                    <Link to="/customer-stats-by-table-infra" className="nav-link btn-md btn py-2">
                                        Stats By List
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to="/customer-stats-by-chart-infra" className="nav-link btn-md btn py-2 active">
                                        Stats By Chart
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to="/customer-stats-by-map-infra" className="nav-link btn-md btn py-2">
                                        Stats By Map
                                    </Link>
                                </li>

                            </ul>
                        </div>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="dashboard-cards row">
                            <PieChart
                              data={data}
                              style={{ width: 250 }}
                            />
                            </div>

                        </div>
                    </div>


                </div>
            </CustomerLayout>
        </Layout>
    )
}

export default WarehouseStatsByChart
