import React, { useEffect } from "react";
import Layout from "../../layout/Layout";
import CustomerLayout from "../../layout/CustomerLayout";
import { Link } from "react-router-dom";
import BackButton from "../../components/helper/BackButton";

const DashboardDocs = () => {
  const docs = [
    {
      docName: "Space Certificates",
      // docIcon:"http://139.59.13.212:8080/api/v1/upload/eb49cc25-bc92-4b36-aada-82afa8b68d49.png",
      docIcon: "/dashboard-icons/space-doc.png",
      docUrl: "/spacecertificate",
      docValue: "",
    },
    {
      docName: "Agreement Package",
      // docIcon:"http://139.59.13.212:8080/api/v1/upload/eb49cc25-bc92-4b36-aada-82afa8b68d49.png",
      docIcon: "/dashboard-icons/Agreement-package.png",
      docUrl: "/agreementpackage",
      docValue: "",
    },
    {
      docName: "SOW",
      // docIcon:"http://139.59.13.212:8080/api/v1/upload/eb49cc25-bc92-4b36-aada-82afa8b68d49.png",
      docIcon: "/dashboard-icons/MyCFA.png",
      docUrl: "/sow",
      docValue: "",
    },
    {
      docName: "SOP",
      // docIcon:"http://139.59.13.212:8080/api/v1/upload/eb49cc25-bc92-4b36-aada-82afa8b68d49.png",
      docIcon: "/dashboard-icons/sop.png",
      docUrl: "/sop",
      docValue: "",
    },
    {
      docName: "NOC",
      // docIcon:"http://139.59.13.212:8080/api/v1/upload/eb49cc25-bc92-4b36-aada-82afa8b68d49.png",
      docIcon: "/dashboard-icons/noc.png",
      docUrl: "/noc",
      docValue: "",
    },
    {
      docName: "Others",
      // docIcon:"http://139.59.13.212:8080/api/v1/upload/eb49cc25-bc92-4b36-aada-82afa8b68d49.png",
      docIcon: "/dashboard-icons/others.png",
      docUrl: "/others",
      docValue: "",
    },
  ];

  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });

  return (
    <Layout>
      <CustomerLayout title={`Dashboard`} subtitle={"Analytics"}>
        <div className="row">
          <div className="content col-12 shadow-sm">
            <div className="dashboard-btns pb-1 border-bottom mb-2 d-flex justify-content-between">
              <nav className="pt-3" aria-label="breadcrumb">
                <ol class="breadcrumb bg-transparent py-0">
                  <li class="breadcrumb-item ">
                    <Link to="/dashboard" className="text-dark">
                      My Dashboard
                    </Link>
                  </li>
                  <li
                    class="breadcrumb-item active text-warning"
                    aria-current="page"
                  >
                    Documents
                  </li>
                </ol>
              </nav>

              <BackButton />
            </div>

            <div className="tab-content" id="pills-tabContent">
              <div className="dashboard-cards row new-card-box">
                {docs.map((item, index) => (
                  <div
                    key={index}
                    className="col-xxl-3 col-xl-4 col-md-6 mb-4 "
                  >
                    <Link to={item.docUrl}>
                      <div
                        className="dashboard-card bg-white d-flex cardHover"
                        style={{ height: 100 }}
                      >
                        <div className="size-50px d-flex align-items-center justify-content-center mx-4 my-auto">
                          <div className="icons-box">
                            <img
                              src={item.docIcon}
                              alt={`documents`}
                              className="p-2"
                            />
                          </div>
                        </div>
                        <div className="card-body py-xxl-5 py-3 px-4">
                          <p className="text-center">{item.docName}</p>
                          <h6 className="text-center  font-weight-bold">
                            {item.docValue}
                          </h6>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CustomerLayout>
    </Layout>
  );
};

export default DashboardDocs;
