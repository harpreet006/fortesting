import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../layout/Layout";
function RecentlyGlossary() {
  return (
    <Layout>
      <section>
        <div className="container-fluid px-0 blog-details-banner contact-us-banner">
          <div className="row">
            <div className="banner-top ">
              <div
                className="bg-img-banner pb-0 pt-4"
                style={{
                  backgroundImage:
                    "url(https://images.ctfassets.net/n4ncz0i02v4l/4LF0hf0dILukqh1UuF5wk3/addb59fb10a548f5a5fb85aeb5bf1c97/banner__glossary.png?q=1)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className=" overlay-dark-half ">
                  <div className="container">
                    <div
                      className="row position-relative"
                      style={{ zIndex: "99" }}
                    >
                      <div className="col-12 py-5 my-md-5">
                        <h4 className="text-white font-weight-bold fs-34px pt-5">
                          <span className="font-weight-bold text-deep-primary">
                            Glossary of Inventory
                          </span>{" "}
                          <br />
                          Management and Warehouse Operation Terms
                        </h4>

                        <div class="input-group mb-3 col-md-6 px-0 pt-3">
                          <div class="input-group-append p-0 border-0">
                            <span
                              class="input-group-text  p-0 bg-white px-3 border-right-0 border-0"
                              id="basic-addon2"
                            >
                              <i
                                class="fas fa-search py-2"
                                aria-hidden="true"
                              ></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            class="form-control border-left-0 input-height-41"
                            placeholder="What are you looking for?"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            
                          />
                          <div class="input-group-append p-0 border-0">
                          <span
                              class="input-group-text p-0 px-4 pt-2 border-0 btn btn-deep-primary"
                              id="basic-addon2"
                            >
                               
                              Search
                            </span>
                          </div>
                        </div>

                        {/* 
                        <nav aria-label="breadcrumb bg-transparent text-white">
                          <ol class="bg-transparent breadcrumb justify-content-center">
                            <li class="breadcrumb-item">
                              <a href="/" className="text-white">
                                Home
                              </a>
                            </li>
                            <li
                              class="breadcrumb-item active text-white font-weight-bold"
                              aria-current="page"
                            >
                              Warehousity Events
                            </li>
                          </ol>
                        </nav> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-12 bg-gradient-glossary my-4 pb-4">
              <div className="row">
                <div className="col-12">
                  <div className="row justify-content-between py-3">
                    <div className="col-auto">
                      <h5 className="text-white">Recently Added</h5>
                    </div>
                  </div>
                </div>
                <div className=" col-md-3 col-sm-6 mb-3">
                  <div className="card p-2 shadow-sm">
                    <Link to="glossary-detail">
                      <div className="card-title h5 text-uppercase mb-1">
                        ERTMS
                      </div>
                      <p>
                        ERTMS is theabbreviation for European Rail Traffic
                        Management System.
                      </p>
                    </Link>
                  </div>
                </div>
                <div className=" col-md-3 col-sm-6 mb-3">
                  <div className="card p-2 shadow-sm">
                    <div className="card-title h5 text-uppercase mb-1">WMS</div>
                    <p>
                      ERTMS is theabbreviation for European Rail Traffic
                      Management System.
                    </p>
                  </div>
                </div>
                <div className=" col-md-3 col-sm-6 mb-3">
                  <div className="card p-2 shadow-sm">
                    <div className="card-title h5 text-uppercase mb-1">
                      ERTMS
                    </div>
                    <p>
                      ERTMS is theabbreviation for European Rail Traffic
                      Management System.
                    </p>
                  </div>
                </div>
                <div className=" col-md-3 col-sm-6 mb-3">
                  <div className="card p-2 shadow-sm">
                    <div className="card-title h5 text-uppercase mb-1">
                      ERTMS
                    </div>
                    <p>
                      ERTMS is theabbreviation for European Rail Traffic
                      Management System.
                    </p>
                  </div>
                </div>
                <div className=" col-md-3 col-sm-6 mb-3">
                  <div className="card p-2 shadow-sm">
                    <div className="card-title h5 text-uppercase mb-1">WMS</div>
                    <p>
                      ERTMS is theabbreviation for European Rail Traffic
                      Management System.
                    </p>
                  </div>
                </div>
                <div className=" col-md-3 col-sm-6 mb-3">
                  <div className="card p-2 shadow-sm">
                    <div className="card-title h5 text-uppercase mb-1">
                      ERTMS
                    </div>
                    <p>
                      ERTMS is theabbreviation for European Rail Traffic
                      Management System.
                    </p>
                  </div>
                </div>
                <div className=" col-md-3 col-sm-6 mb-3">
                  <div className="card p-2 shadow-sm">
                    <div className="card-title h5 text-uppercase mb-1">WMS</div>
                    <p>
                      ERTMS is theabbreviation for European Rail Traffic
                      Management System.
                    </p>
                  </div>
                </div>
                <div className=" col-md-3 col-sm-6 mb-3">
                  <div className="card p-2 shadow-sm">
                    <div className="card-title h5 text-uppercase mb-1">
                      ERTMS
                    </div>
                    <p>
                      ERTMS is theabbreviation for European Rail Traffic
                      Management System.
                    </p>
                  </div>
                </div>
                <div className=" col-md-3 col-sm-6 mb-3">
                  <div className="card p-2 shadow-sm">
                    <div className="card-title h5 text-uppercase mb-1">
                      ERTMS
                    </div>
                    <p>
                      ERTMS is theabbreviation for European Rail Traffic
                      Management System.
                    </p>
                  </div>
                </div>
                <div className=" col-md-3 col-sm-6 mb-3">
                  <div className="card p-2 shadow-sm">
                    <div className="card-title h5 text-uppercase mb-1">WMS</div>
                    <p>
                      ERTMS is theabbreviation for European Rail Traffic
                      Management System.
                    </p>
                  </div>
                </div>
                <div className=" col-md-3 col-sm-6 mb-3">
                  <div className="card p-2 shadow-sm">
                    <div className="card-title h5 text-uppercase mb-1">
                      ERTMS
                    </div>
                    <p>
                      ERTMS is theabbreviation for European Rail Traffic
                      Management System.
                    </p>
                  </div>
                </div>
                <div className=" col-md-3 col-sm-6 mb-3">
                  <div className="card p-2 shadow-sm">
                    <div className="card-title h5 text-uppercase mb-1">WMS</div>
                    <p>
                      ERTMS is theabbreviation for European Rail Traffic
                      Management System.
                    </p>
                  </div>
                </div>
                <div className=" col-md-3 col-sm-6 mb-3">
                  <div className="card p-2 shadow-sm">
                    <div className="card-title h5 text-uppercase mb-1">
                      ERTMS
                    </div>
                    <p>
                      ERTMS is theabbreviation for European Rail Traffic
                      Management System.
                    </p>
                  </div>
                </div>
                <div className=" col-md-3 col-sm-6 mb-3">
                  <div className="card p-2 shadow-sm">
                    <div className="card-title h5 text-uppercase mb-1">
                      ERTMS
                    </div>
                    <p>
                      ERTMS is theabbreviation for European Rail Traffic
                      Management System.
                    </p>
                  </div>
                </div>
                <div className=" col-md-3 col-sm-6 mb-3">
                  <div className="card p-2 shadow-sm">
                    <div className="card-title h5 text-uppercase mb-1">WMS</div>
                    <p>
                      ERTMS is theabbreviation for European Rail Traffic
                      Management System.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default RecentlyGlossary;
