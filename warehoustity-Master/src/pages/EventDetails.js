import React from "react";
import { Link } from "react-router-dom";
import SimpleReactLightbox from "simple-react-lightbox";
import EventGallery from "../components/EventGallery";
import Layout from "../layout/Layout";

const EventDetails = () => {
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
            <div className="col-lg-8">
              <div className="row">
                <div className="img-fluid">
                  <img
                    className="w-100"
                    src="/assets/images/events/ev-2.jpeg"
                    alt="ev-2.jpeg"
                    style={{
                      borderRadius: "10px",
                      height: "400px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="date-and-location d-flex justify-content-between py-3">
                  <div className="col-auto">
                    <p className="font-paragraph fs-15px mb-0">
                      {" "}
                      <i
                        class="fa fa-calendar pr-2"
                        aria-hidden="true"
                      ></i>{" "}
                      January 21, 2021
                    </p>
                  </div>
                  <div className="col-auto">
                    <p className="font-paragraph fs-15px mb-0">
                      {" "}
                      <i
                        class="fa fa-map-marker pr-2"
                        aria-hidden="true"
                      ></i>{" "}
                      Dwarka, New Delhi,
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="my-0 border border-left-0 border-right-0 row mx-0 py-3">
                    <div className="col">
                      <div className="row">
                        <div className="col-1 pt-2 ">
                          <i
                            class="fa fa-th-list text-warning h4"
                            aria-hidden="true"
                          ></i>
                        </div>
                        <div className="col-auto pl-4">
                          <p className="font-paragraph font-weight-bold text-dark mb-0 fs-15px">
                            Event Type
                          </p>
                          <p className="mb-0">Web Development</p>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="row justify-content-end">
                        <div className="col-1 pt-2 ">
                          {/* <i class="fa fa-microphone text-warning h3" aria-hidden="true"></i> */}
                          <i
                            class="fa fa-bullhorn h3 text-warning"
                            aria-hidden="true"
                          ></i>
                        </div>
                        <div className="col-auto pl-4">
                          <p className="font-paragraph font-weight-bold text-dark mb-0 fs-15px">
                            Speaker
                          </p>
                          <p className="mb-0">10 Best Development</p>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="row justify-content-end">
                        <div className="col-1 pt-2 pr-2">
                          <i
                            class="fa fa-bolt text-warning h3"
                            aria-hidden="true"
                          ></i>
                        </div>
                        <div className="col-auto pl-4">
                          <p className="font-paragraph font-weight-bold text-dark mb-0 fs-15px">
                            Sponsor
                          </p>
                          <p className="mb-0">Event Lab</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row pt-4">
                <div className="col-12 mb-3">
                  <h5 className="">
                    Media Companies Need To Better One Then Educate Advertisers.
                    Better One Then Educate.
                  </h5>
                  <p className="fs-15px font-paragraph">
                    Cras semper, massa vel aliquam luctus, eros odio tempor
                    turpis, ac placerat metus tortor eget magna. Donec mattis
                    posuere pharetra. Donec vestibulum ornare velit ut
                    sollicitudin. Pellentesque in faucibus purus.Nulla nisl
                    tellus, hendrerit nec dignissim pellentesque, posuere in
                    est. Suspendisse bibendum vestibulum elit eu placerat. In ut
                    ipsum in odio euismod tincidunt non lacinia nunc. Donec
                    ligula augue, mattis eu varius ac.
                  </p>
                </div>
                <div className="col-lg-6">
                  <h2 className="mb-1">Over View</h2>
                  <ul className="pl-0">
                    <li className="fs-18px pb-2">
                      {" "}
                      <span>
                        <i class="fa fa-check pr-3" aria-hidden="true"></i>
                      </span>
                      You Got Full Free Certificate.
                    </li>
                    <li className="fs-18px pb-2">
                      {" "}
                      <span>
                        <i class="fa fa-check pr-3" aria-hidden="true"></i>
                      </span>
                      Unlimited Coffe & Tea When U Boring.
                    </li>
                    <li className="fs-18px pb-2">
                      {" "}
                      <span>
                        <i class="fa fa-check pr-3" aria-hidden="true"></i>
                      </span>{" "}
                      Etiam Dictum, Dui Sit Amet Venenatis.
                    </li>
                    <li className="fs-18px pb-2">
                      {" "}
                      <span>
                        <i class="fa fa-check pr-3" aria-hidden="true"></i>
                      </span>{" "}
                      Class Aptent Taciti Sociosqu Ad Litora.
                    </li>
                  </ul>
                </div>
                <div className="col-lg-6">
                  <div className="row">
                    <div className="col-6">
                      <div className="img-fluid">
                        <img
                          src="/assets/images/events/ev-details-1.png"
                          alt="ev-details-1.png"
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="img-fluid">
                        <img
                          src="/assets/images/events/ev-details-2.png"
                          alt="ev-details-2.png"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 pt-3">
                  <p className="font-paragraph">
                    Cras semper, massa vel aliquam luctus, eros odio tempor
                    turpis, ac placerat metus tortor eget magna. Donec mattis
                    posuere pharetra. Donec vestibulum ornare velit ut
                    sollicitudin. Pellentesque in faucibus purus.Nulla nisl
                    tellus, hendrerit nec dignissim pellentesque.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div
                className="border news p-3 mb-2  shadow-sm"
                style={{ borderRadius: "10px" }}
              >
                <div className="row">
                  <div className="">
                    <h2 className="line main-heading font-weight-normal mb-2 border-bottom mb-3">
                      Recent Event
                    </h2>
                  </div>
                  <div className="row no-gutters mb-3">
                    <div className="col-auto">
                      <div className="img-holder" style={{ width: "90px" }}>
                        <img
                          className="img-fluid object-fit-cover"
                          src="https://demo-egenslab.b-cdn.net/html/eventlab/assets/images/event/event-thumb-sm1.png"
                          style={{
                            minHeight: "50px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <p
                        className="pl-2 fs-15px font-weight-bold text-dark text-truncate2"
                        style={{ lineHeight: "17px" }}
                      >
                        Donec Risus Dui, Suscipit Iand Tempor Lacinia Vehicula.
                      </p>
                      <div className="date-and-location d-flex justify-content-between ">
                        <div className="col-auto">
                          <p className="font-paragraph fs-15px mb-0">
                            {" "}
                            <i
                              class="fa fa-calendar pr-2"
                              aria-hidden="true"
                            ></i>{" "}
                            January 21, 2021
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row no-gutters mb-3">
                    <div className="col-auto">
                      <div className="img-holder" style={{ width: "90px" }}>
                        <img
                          className="img-fluid object-fit-cover"
                          src="https://demo-egenslab.b-cdn.net/html/eventlab/assets/images/event/event-thumb-sm4.png"
                          style={{
                            minHeight: "50px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <p
                        className="pl-2 fs-15px font-weight-bold text-dark text-truncate2"
                        style={{ lineHeight: "17px" }}
                      >
                        Donec Risus Dui, Suscipit Iand Tempor Lacinia Vehicula.
                      </p>
                      <div className="date-and-location d-flex justify-content-between ">
                        <div className="col-auto">
                          <p className="font-paragraph fs-15px mb-0">
                            {" "}
                            <i
                              class="fa fa-calendar pr-2"
                              aria-hidden="true"
                            ></i>{" "}
                            January 21, 2021
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row no-gutters mb-3">
                    <div className="col-auto">
                      <div className="img-holder" style={{ width: "90px" }}>
                        <img
                          className="img-fluid object-fit-cover"
                          src="https://demo-egenslab.b-cdn.net/html/eventlab/assets/images/event/event-thumb-sm2.png"
                          style={{
                            minHeight: "50px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <p
                        className="pl-2 fs-15px font-weight-bold text-dark text-truncate2"
                        style={{ lineHeight: "17px" }}
                      >
                        Donec Risus Dui, Suscipit Iand Tempor Lacinia Vehicula.
                      </p>
                      <div className="date-and-location d-flex justify-content-between ">
                        <div className="col-auto">
                          <p className="font-paragraph fs-15px mb-0">
                            {" "}
                            <i
                              class="fa fa-calendar pr-2"
                              aria-hidden="true"
                            ></i>{" "}
                            January 21, 2021
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row no-gutters mb-3">
                    <div className="col-auto">
                      <div className="img-holder" style={{ width: "90px" }}>
                        <img
                          className="img-fluid object-fit-cover"
                          src="https://demo-egenslab.b-cdn.net/html/eventlab/assets/images/event/event-thumb-sm3.png"
                          style={{
                            minHeight: "50px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <p
                        className="pl-2 fs-15px font-weight-bold text-dark text-truncate2"
                        style={{ lineHeight: "17px" }}
                      >
                        Donec Risus Dui, Suscipit Iand Tempor Lacinia Vehicula.
                      </p>
                      <div className="date-and-location d-flex justify-content-between ">
                        <div className="col-auto">
                          <p className="font-paragraph fs-15px mb-0">
                            {" "}
                            <i
                              class="fa fa-calendar pr-2"
                              aria-hidden="true"
                            ></i>{" "}
                            January 21, 2021
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="border news p-3 mb-2 shadow-sm d-none"
                style={{ borderRadius: "10px" }}
              >
                <div className="">
                  <h2 className="line main-heading font-weight-normal mb-2 border-bottom mb-3">
                    Event Organized By
                  </h2>
                </div>
                <div className="img-holder text-center">
                  <img
                    className="mx-auto"
                    src="https://demo-egenslab.b-cdn.net/html/eventlab/assets/images/event/event-orgainizer.png"
                    alt="img"
                  />
                </div>
                <div className="h5 text-center">Ramesh Shah</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="d-none">
        <div className="container-fluid px-md-5 px-3">
          <div className="row">
            <div className="col-lg-12">
              <div className="h4 mb-3">Event Gallery</div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-3 d-flex">
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
                      height: "230px",
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
            <div className="col-md-4 mb-3 d-flex">
              <div class="card w-100 border-0 event-card">
                <div className="img-holder">
                  <img
                    src="/assets/images/events/ev-2.jpeg"
                    class="card-img-top"
                    alt="ev-1.png"
                    style={{ borderRadius: "10px", height: "230px" }}
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
            <div className="col-md-4 mb-3 d-flex">
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
                      height: "230px",
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
          </div>
        </div>
      </section>
      <section className="bg-deep-gray">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="h2 mb-0">Event Gallery</div>
            </div>
          </div>
          <div className="row">
            <SimpleReactLightbox>
               <EventGallery />
             </SimpleReactLightbox>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EventDetails;
