import React from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Layout from "../../layout/Layout";

// const onSubmit=()=>{
//  if()
// }
const NewBlogDetails = () => {
  return (
    <Layout>
      <div className="container-fluid px-0 blog-details-banner">
        <div className="row">
          <div className="banner-top ">
            <div
              className="bg-img-banner "
              style={{
                backgroundImage:
                  "url(https://warehousity.com/wp-content/uploads/2015/12/warehouse-dark.jpg)",
              }}
            >
              <div className=" ">
                <div className="container">
                  <div
                    className="row position-relative"
                    style={{ zIndex: "99" }}
                  >
                    <div className="col-12 mb-5 ">
                      <h4 className="text-white font-weight-bold fs-34px pt-5">
                        Direct to Consumer (D2C) Fulfillment for Ecommerce
                      </h4>
                      <span className="text-white py-4">
                        {" "}
                        <i class="fa fa-clock-o" aria-hidden="true"></i> March
                        21, 2019
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mb-4">
              <div className="row">
                <h2 className="text-capitalize mb-0 pt-3">
                  Direct to Consumer (D2C) Fulfillment for Ecommerce
                </h2>
              </div>
              <div className="row">
                <p className="fs-18px">
                  Do you like Cheese Whiz? Spray tan? Fake eyelashes? That's
                  what is Lorem Ipsum to many—it rubs them the wrong way, all
                  the way. It's unreal, uncanny, makes you wonder if something
                  is wrong, it seems to seek your attention for all the wrong
                  reasons. Usually, we prefer the real thing, wine without
                  sulfur based preservatives, real butter, not margarine, and so
                  we'd like our layouts and designs to be filled with real
                  words, with thoughts that count, information that has value.
                </p>
                <p className="fs-18px">
                  The toppings you may chose for that TV dinner pizza slice when
                  you forgot to shop for foods, the paint you may slap on your
                  face to impress the new boss is your business. But what about
                  your daily bread? Design comps, layouts, wireframes—will your
                  clients accept that you go about things the facile way?
                  Authorities in our business will tell in no uncertain terms
                  that Lorem Ipsum is that huge, huge no no to forswear forever.
                  Not so fast, I'd say, there are some redeeming factors in
                  favor of greeking text, as its use is merely the symptom of a
                  worse problem to take into consideration.
                </p>
                <div className="img-holder">
                  <img className="img-fluid w-100" src="/assets/images/vendorregister.jpg" alt="blog-img"/>
                </div>
                <p className="fs-18px">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. 
                </p>
              </div>
              <div className="row">
                <div className="highlighted-text">
                  <div className="col-lg-11 ml-auto border-left">
                    <p className="font-weight-bold fs-18px">
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
                <p className="fs-18px">
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
                <p className="fs-18px">
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
              <div className="row d-none">
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
                      src="/assets/images/placeholder.png"
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
                            src="/assets/images/placeholder.png"
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
            <div className="col-lg-4">
              <div className="sticky-top-custom">
                <div className="border news p-3 mb-2 ">
                  <div className="row">
                    <div className="">
                      <h2 className="line main-heading font-weight-normal mb-2">
                        Recent Posts
                      </h2>
                    </div>
                    {/* {console.log(recentPosts, "check ===============>")} */}
                    <div className="col-12 mb-3">
                      <Link
                        to="/new-blog-details"
                        // to={`/new-blog/${recentpost?.id}`}
                        className="text-decoration-none"
                      >
                        <div className="row no-gutters">
                          <div className="col-auto">
                            <div
                              className="img-holder"
                              style={{ width: "90px" }}
                            >
                              <img
                                className="img-fluid object-fit-cover"
                                src="/assets/images/news/travel2.jpeg"
                                style={{
                                  minHeight: "80px",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                          </div>
                          <div className="col">
                            <p
                              className="mb-0 pl-2 fs-15px font-weight-bold text-dark text-truncate2"
                              style={{ lineHeight: "17px" }}
                            >
                              {/* {recentpost?.title?.rendered} */}
                              Direct to Consumer (D2C) Fulfillment for
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="col-12 mb-3">
                      <Link
                        to="/new-blog-details"
                        // to={`/new-blog/${recentpost?.id}`}
                        className="text-decoration-none"
                      >
                        <div className="row no-gutters">
                          <div className="col-auto">
                            <div
                              className="img-holder"
                              style={{ width: "90px" }}
                            >
                              <img
                                className="img-fluid object-fit-cover"
                                src="/assets/images/news/travel2.jpeg"
                                style={{
                                  minHeight: "80px",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                          </div>
                          <div className="col">
                            <p
                              className="mb-0 pl-2 fs-15px font-weight-bold text-dark text-truncate2"
                              style={{ lineHeight: "17px" }}
                            >
                              {/* {recentpost?.title?.rendered} */}
                              Direct to Consumer (D2C) Fulfillment for
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="col-12 mb-3">
                      <Link
                        to="/new-blog-details"
                        // to={`/new-blog/${recentpost?.id}`}
                        className="text-decoration-none"
                      >
                        <div className="row no-gutters">
                          <div className="col-auto">
                            <div
                              className="img-holder"
                              style={{ width: "90px" }}
                            >
                              <img
                                className="img-fluid object-fit-cover"
                                src="/assets/images/news/travel2.jpeg"
                                style={{
                                  minHeight: "80px",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                          </div>
                          <div className="col">
                            <p
                              className="mb-0 pl-2 fs-15px font-weight-bold text-dark text-truncate2"
                              style={{ lineHeight: "17px" }}
                            >
                              {/* {recentpost?.title?.rendered} */}
                              Direct to Consumer (D2C) Fulfillment for
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className=" news  mb-2 pt-4">
                  <div className="row">
                    <div className="">
                      <h2 className=" main-heading font-weight-normal mb-2">
                      Featured Posts
                      </h2>
                    </div>
                    {/* {console.log(recentPosts, "check ===============>")} */}
                    <div className="col-12 mb-3">
                      <div class="card text-white position-relative rounded-0">
                        <img
                          class="card-img img-fluid rounded-0"
                          src="/assets/images/news/post-thumb-3.jpeg"
                          alt="fashion5.jpeg"
                          style={{ objectFit: "cover", height: "200px" }}
                        />
                        <div class="card-img-overlay px-2">
                          <div className="content-box-news px-1">
                            {" "}
                            <Link to="/">
                              <h6 class="card-title mb-1 fs-15px">
                                Direct To Consumer (D2C) Fulfillment For
                                Ecommerce
                              </h6>
                            </Link>
                            <p class="card-text">
                              <span className="font-weight-lighter">
                                {" "}
                                <i
                                  class="fa fa-clock-o"
                                  aria-hidden="true"
                                ></i>{" "}
                                March 02, 2022
                              </span>
                          
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mb-3">
                      <div class="card text-white position-relative rounded-0">
                        <img
                          class="card-img img-fluid rounded-0"
                          src="/assets/images/news/post-thumb-2.jpeg"
                          alt="fashion5.jpeg"
                          style={{ objectFit: "cover", height: "200px" }}
                        />
                        <div class="card-img-overlay px-2">
                          <div className="content-box-news px-1">
                            {" "}
                            <Link to="/">
                              <h6 class="card-title mb-1 fs-15px">
                                Direct To Consumer (D2C) Fulfillment For
                                Ecommercee
                              </h6>
                            </Link>
                            <p class="card-text">
                              <span className="font-weight-lighter">
                                {" "}
                                <i
                                  class="fa fa-clock-o"
                                  aria-hidden="true"
                                ></i>{" "}
                                March 02, 2022
                              </span>
                          
                            </p>
                          </div>
                        </div>
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
                      <Form.Control type="text" placeholder="Enter Name" />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-lg-6"
                      controlId="formBasicPassword"
                    >
                      <Form.Label>
                        Email <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control type="email" placeholder="Enter Email" />
                    </Form.Group>
                    <div class="form-group">
                      <label for="exampleFormControlTextarea1">
                        Comment <span className="text-danger">*</span>
                      </label>
                      <textarea
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="5"
                        style={{ minHeight: "100px" }}
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

export default NewBlogDetails;
