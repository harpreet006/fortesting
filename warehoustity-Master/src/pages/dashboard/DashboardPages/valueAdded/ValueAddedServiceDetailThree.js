import React from "react";
import Layout from "../../../../layout/Layout";
import CustomerLayout from "../../../../layout/CustomerLayout";
import { Link, useParams } from "react-router-dom";

const ValueAddedServiceDetailThree = () => {

    const {pageThreeId } = useParams();

    const imageArra = [
        "gps-first.png",
        "layout-third.png",
        "W1.jpg",
        "dms-third.png",
        "gps-first.png",
        "gps-third.png",
        "cloud-third.png",
        "it-first.png",
        "automation-first.png",
        "bc2",
        "demond-forcosting-first.png"
    ]

    const pageName = [
        "Centrea of Gravity",
        "Warehouse Layout",
        "WMS",
        "DMS",
        "Detailed Analisys",
        "GPS & Geo Fencing",
        "Cloud Telephonic",
        "It & Software Development",
        "Automation",
        "Barcode & QR Codes",
        "Demand Forcasting"
    ]


    return (
        <Layout>

        <CustomerLayout title={`Dashboard`} subtitle={"Value Added Services"}>
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
                                <Link to="/dashboard/valueaddedservices?search=Value%20Added%20Services" className="nav-link btn-md btn py-2">
                                    Value Added Services
                                </Link>
                            </li>

                            <li className="nav-item">
                                <button className="nav-link btn-md btn py-2 active">
                                {pageName[parseInt(pageThreeId)]}
                                </button>
                            </li>

                        </ul>
                    </div>
                    <div className="tab-content" id="pills-tabContent">
                        <div className="dashboard-cards row">
                            <img
                             src={`/assets/images/dashboard/valueadded/${imageArra[parseInt(pageThreeId)]}`}  style={{width:'100%'}} alt="value" />

                        </div>

                    </div>
                </div>


            </div>
        </CustomerLayout>
    </Layout>
    )
}

export default ValueAddedServiceDetailThree
