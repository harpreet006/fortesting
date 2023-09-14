import React from "react";
import { Button, FloatingLabel, Form, Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import Layout from "../../layout/Layout";

const NewsDetails = () => {
  return (
    <Layout>
      <section className="news-details">
        <div className="container-fluid px-md-5 pt-5 mt-md-5 mt-2">
          <div className="row">
            <div className="col-xl-9 col-lg-8 mb-4">
              <div className="img-holder">
                <img
                  className="img-fluid w-100"
                  src="assets/images/news/travel3.jpg"
                  alt="details-img"
                />
              </div>
              <div className="row">
                <h2 className="text-capitalize mb-0 pt-3">
                  Clothing and Accessories for the Fashionable Crypto Trader
                </h2>
                <p className="mb-0">
                  <ul className="pl-0 d-flex">
                    <li className="pr-3">Thomson Smith</li>
                    <li className="ml-3" style={{ listStyleType: "circle" }}>
                      Apri 18,2022
                    </li>
                  </ul>
                </p>
              </div>
              <div className="row">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of type and scrambled it to make
                  a type specimen book.
                </p>
              </div>
              <div className="row">
                <div className="highlighted-text">
                  <div className="col-lg-11 ml-auto border-left">
                    <p className="font-weight-bold">
                      {" "}
                      It is a long established fact that a reader will be
                      distracted by the readable content of a page when looking
                      at its layout. The point of using Lorem Ipsum is that it
                      has a more-or-less normal distribution of letters,It is a
                      long established fact that a reader will be distracted by
                      the readable content of a page when looking at its layout.
                    </p>
                  </div>
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of type and scrambled it to make
                  a type specimen book.
                </p>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of type and scrambled it to make
                  a type specimen book.
                </p>
              </div>
              <div className="row">
                <div className="border shadow-sm">
                  <div className="pt-4">
                    <h2 className="line font-weight-normal main_heading mb-3">
                      Similar posts for you
                    </h2>
                  </div>
                  <div className="row">
                    <div className="col-lg-4 mb-3">
                      <div class="card">
                        <div className="img-holder overflow-hidden">
                          <img
                            class="card-img-top"
                            src="assets/images/news/travel2.jpeg"
                            alt="Card image cap"
                          />
                        </div>
                        <div class="card-body px-2 py-1">
                          <Link to="/news" className="text-decoration-none">
                            <h6
                              class="card-title mb-0 font-weight-bold"
                              style={{ fontSize: "15px" }}
                            >
                              Tesla just lost its head of global just finance
                            </h6>
                          </Link>
                          <p class="card-text pt-2">
                            <span className="font-weight-lighter">
                              {" "}
                              <i
                                class="fa fa-clock-o"
                                aria-hidden="true"
                              ></i>{" "}
                              March 21, 2019
                            </span>
                          </p>
                        </div>
                        <div className="title-news-box warning">
                          <p className="mb-0 px-2">Travel</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 mb-3">
                      <div class="card">
                        <div className="img-holder overflow-hidden">
                          <img
                            class="card-img-top"
                            src="assets/images/news/travel2.jpeg"
                            alt="Card image cap"
                          />
                        </div>
                        <div class="card-body px-2 py-1">
                          <Link to="/news" className="text-decoration-none">
                            <h6
                              class="card-title mb-0 font-weight-bold"
                              style={{ fontSize: "15px" }}
                            >
                              Tesla just lost its head of global just finance
                            </h6>
                          </Link>
                          <p class="card-text pt-2">
                            <span className="font-weight-lighter">
                              {" "}
                              <i
                                class="fa fa-clock-o"
                                aria-hidden="true"
                              ></i>{" "}
                              March 21, 2019
                            </span>
                          </p>
                        </div>
                        <div className="title-news-box warning">
                          <p className="mb-0 px-2">Travel</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 mb-3">
                      <div class="card">
                        <div className="img-holder overflow-hidden">
                          <img
                            class="card-img-top"
                            src="assets/images/news/travel2.jpeg"
                            alt="Card image cap"
                          />
                        </div>
                        <div class="card-body px-2 py-1">
                          <Link to="/news" className="text-decoration-none">
                            <h6
                              class="card-title mb-0 font-weight-bold"
                              style={{ fontSize: "15px" }}
                            >
                              Tesla just lost its head of global just finance
                            </h6>
                          </Link>
                          <p class="card-text pt-2">
                            <span className="font-weight-lighter">
                              {" "}
                              <i
                                class="fa fa-clock-o"
                                aria-hidden="true"
                              ></i>{" "}
                              March 21, 2019
                            </span>
                          </p>
                        </div>
                        <div className="title-news-box warning">
                          <p className="mb-0 px-2">Travel</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-12 px-0">
                  <hr />
                </div>
              </div>
              <div className="row no-gutters">
                <div className="col-12 px-md-0">
                  <h5 className="mb-3">
                    There are 02 Comments for this article
                  </h5>
                </div>
                <div className="col-auto">
                  <div className="img-holder">
                    <img
                      src="assets/images/placeholder.png"
                      alt="placeholder.pngs"
                    />
                  </div>
                </div>
                <div className="col pl-2">
                  <h6 className="mb-0">Prawesh Kumar</h6>
                  <p className="mb-0">
                    <ul className="pl-0 d-flex">
                      <li className=""> Apri</li>
                      <li className="ml-2">18,2,2022</li>
                      <li className="ml-2">12:00pm</li>
                    </ul>
                  </p>
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed a
                    page when looking at its layout. The point of using Lorem
                    Ipsum is that it has a more-or-less normal distribution of
                    letters, as opposed
                  </p>
                  <p>
                    <Link
                      to="/"
                      className="text-decoration-none text-dark text-uppercase"
                    >
                      Reply
                    </Link>
                  </p>
                  <div className="reply-box border-left">
                    <div className="row no-gutters">
                      <div className="col-auto">
                        <div className="img-holder">
                          <img
                            src="assets/images/placeholder.png"
                            alt="placeholder.pngs"
                          />
                        </div>
                      </div>
                      <div className="col pl-2">
                        <h6 className="mb-0">Prawesh Kumar</h6>
                        <p className="mb-0">
                          <ul className="pl-0 d-flex">
                            <li className=""> Apri</li>
                            <li className="ml-2">18,2,2022</li>
                            <li className="ml-2">12:00pm</li>
                          </ul>
                        </p>
                        <p>
                          It is a long established fact that a reader will be
                          distracted by the readable content of a page when
                          looking at its layout. The point of using Lorem Ipsum
                          is that it has a more-or-less normal distribution of
                          letters, as opposed a page when looking at its layout.
                          The point of using Lorem Ipsum is that it has a
                          more-or-less normal distribution of letters, as
                          opposed
                        </p>
                        <p>
                          <Link
                            to="/"
                            className="text-decoration-none text-dark text-uppercase"
                          >
                            Reply
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4">
              <div className="news-details-tabs">
                <Tabs
                  defaultActiveKey="Popular"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="Popular" title="Popular">
                    <ul class="list-group list-group-flush">
                      <div class="list-group-item px-0">
                        <div className="row no-gutters">
                          <div className="col-auto">
                            <div className="img-holder ">
                              <img
                                className="img-fluid"
                                src="assets/images/news/post-thumb-1.jpeg"
                                alt="travel3.jpg"
                              />
                            </div>
                          </div>
                          <div className="col pl-2">
                            <p className="mb-0">
                              Historical Placed & his Photoshopped
                            </p>
                            <p class="card-text pt-1">
                              <span className="font-weight-lighter">
                                {" "}
                                <i
                                  class="fa fa-clock-o"
                                  aria-hidden="true"
                                ></i>{" "}
                                March 21, 2019
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="list-group-item px-0">
                        <div className="row no-gutters">
                          <div className="col-auto">
                            <div className="img-holder">
                              <img
                                className="img-fluid"
                                src="assets/images/news/post-thumb-2.jpeg"
                                alt="travel3.jpg"
                              />
                            </div>
                          </div>
                          <div className="col pl-2">
                            <p className="mb-0">
                              Historical Placed & his Photoshopped
                            </p>
                            <p class="card-text pt-1">
                              <span className="font-weight-lighter">
                                {" "}
                                <i
                                  class="fa fa-clock-o"
                                  aria-hidden="true"
                                ></i>{" "}
                                March 21, 2019
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="list-group-item px-0">
                        <div className="row no-gutters">
                          <div className="col-auto">
                            <div className="img-holder">
                              <img
                                className="img-fluid"
                                src="assets/images/news/post-thumb-3.jpeg"
                                alt="travel3.jpg"
                              />
                            </div>
                          </div>
                          <div className="col pl-2">
                            <p className="mb-0">
                              Historical Placed & his Photoshopped
                            </p>
                            <p class="card-text pt-1">
                              <span className="font-weight-lighter">
                                {" "}
                                <i
                                  class="fa fa-clock-o"
                                  aria-hidden="true"
                                ></i>{" "}
                                March 21, 2019
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="list-group-item px-0">
                        <div className="row no-gutters">
                          <div className="col-auto">
                            <div className="img-holder">
                              <img
                                className="img-fluid"
                                src="assets/images/news/post-thumb-4.jpeg"
                                alt="travel3.jpg"
                              />
                            </div>
                          </div>
                          <div className="col pl-2">
                            <p className="mb-0">
                              Historical Placed & his Photoshopped
                            </p>
                            <p class="card-text pt-1">
                              <span className="font-weight-lighter">
                                {" "}
                                <i
                                  class="fa fa-clock-o"
                                  aria-hidden="true"
                                ></i>{" "}
                                March 21, 2019
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </ul>
                  </Tab>
                  <Tab eventKey="Recent" title="Recent">
                    <ul class="list-group list-group-flush">
                      <div class="list-group-item px-0">
                        <div className="row no-gutters">
                          <div className="col-auto">
                            <div className="img-holder ">
                              <img
                                className="img-fluid"
                                src="assets/images/news/post-thumb-1.jpeg"
                                alt="travel3.jpg"
                              />
                            </div>
                          </div>
                          <div className="col pl-2">
                            <p className="mb-0">
                              Historical Placed & his Photoshopped
                            </p>
                            <p class="card-text pt-1">
                              <span className="font-weight-lighter">
                                {" "}
                                <i
                                  class="fa fa-clock-o"
                                  aria-hidden="true"
                                ></i>{" "}
                                March 21, 2019
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="list-group-item px-0">
                        <div className="row no-gutters">
                          <div className="col-auto">
                            <div className="img-holder">
                              <img
                                className="img-fluid"
                                src="assets/images/news/post-thumb-2.jpeg"
                                alt="travel3.jpg"
                              />
                            </div>
                          </div>
                          <div className="col pl-2">
                            <p className="mb-0">
                              Historical Placed & his Photoshopped
                            </p>
                            <p class="card-text pt-1">
                              <span className="font-weight-lighter">
                                {" "}
                                <i
                                  class="fa fa-clock-o"
                                  aria-hidden="true"
                                ></i>{" "}
                                March 21, 2019
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="list-group-item px-0">
                        <div className="row no-gutters">
                          <div className="col-auto">
                            <div className="img-holder">
                              <img
                                className="img-fluid"
                                src="assets/images/news/post-thumb-3.jpeg"
                                alt="travel3.jpg"
                              />
                            </div>
                          </div>
                          <div className="col pl-2">
                            <p className="mb-0">
                              Historical Placed & his Photoshopped
                            </p>
                            <p class="card-text pt-1">
                              <span className="font-weight-lighter">
                                {" "}
                                <i
                                  class="fa fa-clock-o"
                                  aria-hidden="true"
                                ></i>{" "}
                                March 21, 2019
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="list-group-item px-0">
                        <div className="row no-gutters">
                          <div className="col-auto">
                            <div className="img-holder">
                              <img
                                className="img-fluid"
                                src="assets/images/news/post-thumb-4.jpeg"
                                alt="travel3.jpg"
                              />
                            </div>
                          </div>
                          <div className="col pl-2">
                            <p className="mb-0">
                              Historical Placed & his Photoshopped
                            </p>
                            <p class="card-text pt-1">
                              <span className="font-weight-lighter">
                                {" "}
                                <i
                                  class="fa fa-clock-o"
                                  aria-hidden="true"
                                ></i>{" "}
                                March 21, 2019
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </ul>
                  </Tab>
                  <Tab eventKey="Comments" title="Comments">
                    <ul class="list-group list-group-flush">
                      <div class="list-group-item px-0">
                        <div className="row">
                          <div className="col-lg-12">
                            <span className="font-weight-bold">
                              Prawesh Kumar -
                            </span>
                            <span>
                              " Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry... "
                            </span>
                            <span className="font-weight-bold">
                              Contrary to popular belief, Lorem Ipsum is not
                              simply random text.
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="list-group-item px-0">
                        <div className="row">
                          <div className="col-lg-12">
                            <span className="font-weight-bold">
                              Prawesh Kumar -
                            </span>
                            <span>
                              " Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry... "
                            </span>
                            <span className="font-weight-bold">
                              Contrary to popular belief, Lorem Ipsum is not
                              simply random text.
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="list-group-item px-0">
                        <div className="row">
                          <div className="col-lg-12">
                            <span className="font-weight-bold">
                              Prawesh Kumar -
                            </span>
                            <span>
                              " Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry... "
                            </span>
                            <span className="font-weight-bold">
                              Contrary to popular belief, Lorem Ipsum is not
                              simply random text.
                            </span>
                          </div>
                        </div>
                      </div>
                    </ul>
                  </Tab>
                </Tabs>
              </div>
              <div className=" border news p-3 mt-3 categories">
                <div className="row">
                  <div className="">
                    <h2 className="line main-heading font-weight-normal mb-1">
                      Categories
                    </h2>
                  </div>
                  <ul class="list-group pt-0">
                    <li class="list-group-item d-flex justify-content-between align-items-center border-0">
                      Categorie 1
                      <span class="badge badge-primary badge-pill warning">
                        14
                      </span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center border-0">
                      Categorie 2
                      <span class="badge badge-primary badge-pill success">
                        2
                      </span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center border-0">
                      Categorie 3
                      <span class="badge badge-primary badge-pill pink">1</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container-fluid px-md-5 border-top">
          <div className="row">
            <div className="col-md-7 mx-auto">
              <div className="border mt-4 p-4">
                <div className="title-form">
                  <h6>Leave A Comments</h6>
                  <p>
                    Your email address will not be publshed. Required fields are
                    marked <span className="text-danger">*</span>
                  </p>
                </div>
                <Form className="">
                  <div className="row">
                    <Form.Group
                      className="mb-3 col-lg-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>
                        Name <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control type="text" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-lg-6"
                      controlId="formBasicPassword"
                    >
                      <Form.Label>
                        Email <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control type="email" placeholder="Password" />
                    </Form.Group>
                    <div class="form-group">
                      <label for="exampleFormControlTextarea1">
                       Comment <span className="text-danger">*</span>
                      </label>
                      <textarea
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="5"
                        style={{minHeight:"100px"}}
                      ></textarea>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-warning text-white mt-3"
                  >
                    Post Comment
                  </button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NewsDetails;
