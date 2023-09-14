import React from "react";
import Layout from "../../../../layout/Layout";
import CustomerLayout from "../../../../layout/CustomerLayout";
import { Link, useParams } from "react-router-dom";

const ValueAddedServiceDetailTwo = () => {
    const { id, pageId } = useParams();

    const imageArra = [
        "gps-first.png",
        "layout-second.png",
        "w2.jpg",
        "dms-second.png",
        "gps-first.png",
        "gps-second.png",
        "cloud-second.png",
        "it-first.png",
        "automation-first.png",
        "bc2.png",
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
                                    {pageName[parseInt(pageId)]}
                                    </button>
                                </li>

                            </ul>
                        </div>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="dashboard-cards row">
                                <Link to={`/dashboard/valueaddedservices/${id}/${pageId}/${pageId}`}>
                                    <img src={`/assets/images/dashboard/valueadded/${imageArra[parseInt(pageId)]}`}  style={{width:'100%'}} alt="value" />
                                </Link>

                            </div>

                        </div>
                    </div>


                </div>
            </CustomerLayout>
        </Layout>
    )
}

export default ValueAddedServiceDetailTwo
