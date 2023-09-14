import React from "react";
import Layout from "../../../../layout/Layout";
import CustomerLayout from "../../../../layout/CustomerLayout";
import { Link, useParams } from "react-router-dom";
import BackButton from "../../../../components/helper/BackButton";

const ValueAddedServiceDetail = () => {
  const { type, id, index } = useParams();

  const imageArr = {
    layout: ["VAS/Layout/Layout.jpg"],
    wms: ["W.jpg", "W1.jpg", "w2.jpg"],
    dms: ["VAS/DMS/DMS1.jpg", "VAS/DMS/DMS2.jpg", "VAS/DMS/DMS3.jpg"],
    it: ["VAS/IT/it-1.png"],
    gps: [
      "VAS/GPS & Geo Fencing/GPS1.jpg",
      "VAS/GPS & Geo Fencing/GPS2.jpg",
      "VAS/GPS & Geo Fencing/GPS3.jpg",
    ],
    telephonic: [
      "VAS/Cloud Telephonic/CL.jpg",
      "VAS/Cloud Telephonic/CL1.jpg",
      "VAS/Cloud Telephonic/CL1A.jpg",
      "VAS/Cloud Telephonic/CL2.jpg",
    ],
    automation: ["VAS/Automation/A4.jpg"],
    barcode: ["VAS/Barcode/bar1.jpg", "VAS/Barcode/b3.jpg"],
    demand: [
      "VAS/Demand Forecasting/DF1.jpg",
      "VAS/Demand Forecasting/DF2.jpg",
      "VAS/Demand Forecasting/DF3.jpg",
    ],
  };

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
    "Demand Forcasting",
  ];

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
                    to="/dashboard/valueaddedservices?search=Value%20Added%20Services"
                    className="nav-link btn-md btn py-2"
                  >
                    Value Added Services
                  </Link>
                </li>

                <li className="nav-item">
                  <button className="nav-link btn-md btn py-2 active">
                    {pageName[parseInt(index)]}
                  </button>
                </li>
              </ul>
              <BackButton />
            </div>
            <div className="tab-content" id="pills-tabContent">
              <div className="dashboard-cards row">
                {console.log(type)}
                {imageArr[type].length - 1 > id ? (
                  <Link
                    to={`/dashboard/valueaddedservices/${index}/${
                      parseInt(id) + 1
                    }/${type}`}
                  >
                    <img
                      src={`/assets/images/dashboard/valueadded/${imageArr[type][id]}`}
                      style={{ width: "100%" }}
                      alt="value"
                    />
                  </Link>
                ) : (
                  <img
                    src={`/assets/images/dashboard/valueadded/${imageArr[type][id]}`}
                    style={{ width: "100%" }}
                    alt="value"
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

export default ValueAddedServiceDetail;
