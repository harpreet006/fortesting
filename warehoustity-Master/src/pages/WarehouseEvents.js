import React from "react";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";

const WarehouseEvents = () => {
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
                    "url(https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className=" overlay-dark-bottom ">
                  <div className="container">
                    <div
                      className="row position-relative"
                      style={{ zIndex: "99" }}
                    >
                      <div className="col-12 text-center py-5 my-md-5">
                        <h4 className="text-white font-weight-bold fs-34px pt-5">
                          Warehousity Events
                        </h4>

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
                        </nav>
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
        <div className="contianer-fluid px-md-5 px-3 position-relative">
          <div className="row">
            <div className="col-lg-12">
              <div className="background-title-events">Warehousity Events</div>
            </div>
          </div>
          <div className="row pt-md-5 mt-md-3">
            <div className="col-md-4 mb-3">
              <div class="card w-100 border-0 event-card">
                <div className="img-holder">
                  <img
                    src="/assets/images/events/ev-1.jpeg"
                    class="card-img-top"
                    alt="ev-1.png"
                    style={{
                      borderRadius: "10px",
                      height: "245px",
                      objectFit: "cover",
                    }}
                  />
                  <div class="event-date">26 may 2018 - 4.00 PM</div>
                </div>
                <div class="card-body border border-top-0">
                  <div className="title-top">
                    <p className="text-warning mb-0">Conference Event</p>
                  </div>
                  <h5 class="card-title">Designers Conference Event</h5>
                  <p class="card-text">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                  <Link to="/events-details" class="btn btn-deep-primary">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div class="card w-100 border-0 event-card">
                <div className="img-holder">
                  <img
                    src="/assets/images/events/ev-2.jpeg"
                    class="card-img-top"
                    alt="ev-1.png"
                    style={{ borderRadius: "10px" }}
                  />
                  <div class="event-date">26 may 2018 - 4.00 PM</div>
                </div>
                <div class="card-body border border-top-0">
                  <div className="title-top">
                    <p className="text-warning mb-0">Musical Event</p>
                  </div>
                  <h5 class="card-title">Biggest Musical Event</h5>
                  <p class="card-text">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                  <Link to="/events-details" class="btn btn-deep-primary">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div class="card w-100 border-0 event-card">
                <div className="img-holder">
                  <img
                    src="/assets/images/events/ev-3.jpeg"
                    class="card-img-top"
                    alt="ev-1.png"
                    style={{
                      borderRadius: "10px",
                      height: "245px",
                      objectFit: "cover",
                    }}
                  />
                  <div class="event-date">26 may 2018 - 4.00 PM</div>
                </div>
                <div class="card-body border border-top-0">
                  <div className="title-top">
                    <p className="text-warning mb-0">Conference Event</p>
                  </div>
                  <h5 class="card-title">Developer Conference Event</h5>
                  <p class="card-text">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                  <Link to="/events-details" class="btn btn-deep-primary">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div class="card w-100 border-0 event-card">
                <div className="img-holder">
                  <img
                    src="/assets/images/events/ev-4.jpeg"
                    class="card-img-top"
                    alt="ev-1.png"
                    style={{
                      borderRadius: "10px",
                      height: "245px",
                      objectFit: "cover",
                    }}
                  />
                  <div class="event-date">26 may 2018 - 4.00 PM</div>
                </div>
                <div class="card-body border border-top-0">
                  <div className="title-top">
                    <p className="text-warning mb-0">Special Event</p>
                  </div>
                  <h5 class="card-title">Warehousity Personal Event</h5>
                  <p class="card-text">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                  <Link to="/events-details" class="btn btn-deep-primary">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div class="card w-100 border-0 event-card">
                <div className="img-holder">
                  <img
                    src="/assets/images/events/ev-1.jpeg"
                    class="card-img-top"
                    alt="ev-1.png"
                    style={{
                      borderRadius: "10px",
                      height: "245px",
                      objectFit: "cover",
                    }}
                  />
                  <div class="event-date">26 may 2018 - 4.00 PM</div>
                </div>
                <div class="card-body border border-top-0">
                  <div className="title-top">
                    <p className="text-warning mb-0">Conference Event</p>
                  </div>
                  <h5 class="card-title">Designers Conference Event</h5>
                  <p class="card-text">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                  <Link to="/events-details" class="btn btn-deep-primary">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div class="card w-100 border-0 event-card">
                <div className="img-holder">
                  <img
                    src="/assets/images/events/ev-2.jpeg"
                    class="card-img-top"
                    alt="ev-1.png"
                    style={{ borderRadius: "10px" }}
                  />
                  <div class="event-date">26 may 2018 - 4.00 PM</div>
                </div>
                <div class="card-body border border-top-0">
                  <div className="title-top">
                    <p className="text-warning mb-0">Musical Event</p>
                  </div>
                  <h5 class="card-title">Biggest Musical Event</h5>
                  <p class="card-text">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                  <Link to="/events-details" class="btn btn-deep-primary">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WarehouseEvents;
