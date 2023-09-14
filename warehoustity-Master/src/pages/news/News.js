import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../layout/Layout";
import Slider from "react-slick";

const News = () => {
  function SampleNextArrow(props) {
    const { onClick } = props;

    return (
      <button
        onClick={onClick}
        className="btn next slick-arrow mr-4 line-arrow-center"
      >
        <span className="fas fa-chevron-left"></span>
      </button>
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;

    return (
      <button onClick={onClick} className="btn prev slick-arrow ml-4">
        <span className="fas  fa-chevron-right"></span>
      </button>
    );
  }

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: false,
    arrows: true,
    // className: "cardActive",
    // centerMode: true,
    centerPadding: "60px",
    prevArrow: <SampleNextArrow />,
    nextArrow: <SamplePrevArrow />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          infinite: false,
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          infinite: false,
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          infinite: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  //   function DotsNextArrow(props) {
  //     const { onClick } = props;

  //     return (
  //       <button
  //         onClick={onClick}
  //         className="btn next slick-arrow mr-4 line-arrow-center"
  //       >
  //         <span className="fa fa-circle"></span>

  //       </button>
  //     );
  //   }

  //   function DotsPrevArrow(props) {
  //     const { onClick } = props;

  //     return (
  //       <button onClick={onClick} className="btn prev slick-arrow ml-4">
  //         <span className="fa fa-circle"></span>
  //       </button>
  //     );
  //   }
  var morenews_settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: false,
    arrows: true,
    // className: "cardActive",
    // centerMode: true,
    centerPadding: "60px",
    prevArrow: <SampleNextArrow />,
    nextArrow: <SamplePrevArrow />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          infinite: false,
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          infinite: false,
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          infinite: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <Layout>
        
        <section className="news">
          <div className="container-fluid pt-5 px-md-5 ">
            <div className="row pt-5">
              <div className="col-lg-7 col-xl-8 mb-3 d-flex">
                <div class="card text-white position-relative">
                  <img
                    class="card-img img-fluid"
                    src="assets/images/news/travel3.jpg"
                    alt="fashion5.jpeg"
                  />
                  <div class="card-img-overlay">
                    <div className="content-box-news">
                      {" "}
                      <Link to="/news-details">
                        <h5 class="card-title font_large">
                          Clothing and Accessories for the Fashionable Crypto
                          Trader
                        </h5>
                      </Link>
                      <p class="card-text pt-2">
                        <span className="font-weight-lighter">
                          {" "}
                          <i class="fa fa-clock-o" aria-hidden="true"></i> March
                          21, 2019
                        </span>
                        <Link to="/news">
                          <span className="pl-3 font-weight-lighter">
                            {" "}
                            <i
                              class="fa fa-comment"
                              aria-hidden="true"
                            ></i>{" "}
                            Comments
                          </span>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-xl-4 h-100 d-flex align-items-stretch mb-2">
                <div className="row no-gutters">
                  <div className="col-12 mb-3">
                    <div class="card text-white position-relative">
                      <img
                        class="card-img img-fluid"
                        src="assets/images/news/travel3.jpg"
                        alt="fashion5.jpeg"
                      />
                      <div class="card-img-overlay">
                        <div className="content-box-news">
                          {" "}
                          <Link to="news">
                            <h5 class="card-title">
                              Clothing and Accessories for the Fashionable
                              Crypto Trader
                            </h5>
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
                            <Link to="/news">
                              <span className="pl-3 font-weight-lighter">
                                {" "}
                                <i
                                  class="fa fa-comment"
                                  aria-hidden="true"
                                ></i>{" "}
                                Comments
                              </span>
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div class="card text-white position-relative">
                      <img
                        class="card-img img-fluid"
                        src="assets/images/news/fashion5.jpeg"
                        alt="fashion5.jpeg"
                      />
                      <div class="card-img-overlay">
                        <div className="content-box-news">
                          {" "}
                          <Link to="news">
                            <h5 class="card-title">
                              Clothing and Accessories for the Fashionable
                              Crypto Trader
                            </h5>
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
                            <Link to="/news">
                              <span className="pl-3 font-weight-lighter">
                                {" "}
                                <i
                                  class="fa fa-comment"
                                  aria-hidden="true"
                                ></i>{" "}
                                Comments
                              </span>
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="most_popular most_popular_slider pt-0">
          <div className="container-fluid px-md-5">
            <div className="row">
              <div className="col-lg-9">
                <div className="shadow-sm border p-3">
                  <div className="row">
                    <div className="">
                      <h2 className="line font-weight-normal main_heading">
                        Most Popular
                      </h2>
                    </div>
                    <div className="">
                      <Slider {...settings}>
                        <div className="px-2">
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
                                  Tesla just lost its head of global just
                                  finance
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
                        <div className="px-2">
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
                                  Tesla just lost its head of global just
                                  finance
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
                        <div className="px-2">
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
                                  Tesla just lost its head of global just
                                  finance
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
                        <div className="px-2">
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
                                  Tesla just lost its head of global just
                                  finance
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
                        <div className="px-2">
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
                                  Tesla just lost its head of global just
                                  finance
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
                      </Slider>
                    </div>
                  </div>
                </div>

                <div className="shadow-sm border p-3 mt-3 position-relative">
                  <div className="row">
                    <div className="main_heading">
                      <h2 className="line main-heading font-weight-normal">
                        Hot Topics
                      </h2>
                    </div>
                    <div className="col-12">
                      <div className="row">
                        <div className="col-lg-6 d-flex mb-3">
                          <div class="card">
                            <div className="img-holder overflow-hidden">
                              <img
                                class="card-img-top"
                                src="assets/images/news/travel3.jpg"
                                alt="Card image cap"
                              />
                            </div>
                            <div class="card-body">
                              <Link to="/" className="text-decoration-none">
                                <h5 class="card-title">
                                  They are backed up Kennedy Darling and Cras
                                  named to return
                                </h5>
                              </Link>

                              <p class="card-text mb-1">
                                <span className="font-weight-lighter">
                                  {" "}
                                  <i
                                    class="fa fa-clock-o"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  March 21, 2019
                                </span>
                              </p>
                              <p class="card-text pt-3">
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
                              </p>
                            </div>
                            <div className="title-news-box warning">
                              <p className="mb-0 px-2">Travel</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 d-flex">
                          <div className="row">
                            <div className="col-lg-6">
                              <div class="card border-0">
                                <div className="img-holder overflow-hidden">
                                  <img
                                    class="card-img-top"
                                    src="assets/images/news/travel3.jpg"
                                    alt="Card image cap"
                                  />
                                </div>
                                <div class="card-body px-2 pt-2">
                                  <Link to="/" className="text-decoration-none">
                                    <h5 class="card-title fs-15px ">
                                      They are backed up Kennedy Darling and
                                      Cras named to return
                                    </h5>
                                  </Link>

                                  <p class="card-text mb-1">
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
                            <div className="col-lg-6">
                              <div class="card border-0">
                                <div className="img-holder overflow-hidden">
                                  <img
                                    class="card-img-top"
                                    src="assets/images/news/travel3.jpg"
                                    alt="Card image cap"
                                  />
                                </div>
                                <div class="card-body px-2 pt-2">
                                  <Link to="/" className="text-decoration-none">
                                    <h5 class="card-title fs-15px ">
                                      They are backed up Kennedy Darling and
                                      Cras named to return
                                    </h5>
                                  </Link>

                                  <p class="card-text mb-1">
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
                            <div className="col-lg-6">
                              <div class="card border-0">
                                <div className="img-holder overflow-hidden">
                                  <img
                                    class="card-img-top"
                                    src="assets/images/news/travel3.jpg"
                                    alt="Card image cap"
                                  />
                                </div>
                                <div class="card-body px-2 pt-2 pb-0">
                                  <Link to="/" className="text-decoration-none">
                                    <h5 class="card-title fs-15px ">
                                      They are backed up Kennedy Darling and
                                      Cras named to return
                                    </h5>
                                  </Link>

                                  <p class="card-text mb-1">
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
                            <div className="col-lg-6">
                              <div class="card border-0">
                                <div className="img-holder overflow-hidden">
                                  <img
                                    class="card-img-top"
                                    src="assets/images/news/travel3.jpg"
                                    alt="Card image cap"
                                  />
                                </div>
                                <div class="card-body px-2 pt-2 pb-0">
                                  <Link to="/" className="text-decoration-none">
                                    <h5 class="card-title fs-15px ">
                                      They are backed up Kennedy Darling and
                                      Cras named to return
                                    </h5>
                                  </Link>

                                  <p class="card-text mb-1">
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="view-all-link">
                    <Link to="/view-all">View All</Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 mt-3">
                <div className="shadow-sm border news p-3 mb-2">
                  <div className="row">
                    <div className="">
                      <h2 className="line main-heading font-weight-normal">
                        Populer Post
                      </h2>
                    </div>
                    <div className="col-12">
                      <div class="card text-white position-relative w-100 border-0 ">
                        <img
                          class="card-img img-fluid"
                          src="assets/images/news/fashion5.jpeg"
                          alt="fashion5.jpeg"
                        />
                        <div class="card-img-overlay popular_post">
                          <div className="content-box-news">
                            {" "}
                            <Link to="news">
                              <h5 class="card-title fs-15px mb-1">
                                Clothing and Accessories for the Fashionable
                                Crypto Trader
                              </h5>
                            </Link>
                            <p class="card-text">
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
                    </div>
                    <div className="col-12 mt-3">
                      <div className="row no-gutters">
                        <div className="col-auto">
                          <div
                            className="img-holder"
                            style={{ width: "100px" }}
                          >
                            <img
                              className="img-fluid object-fit-cover"
                              src="assets/images/news/travel2.jpeg"
                            />
                          </div>
                        </div>
                        <div className="col align-self-center">
                          <p
                            className="mb-0 pl-2 fs-15px font-weight-bold text-dark"
                            style={{ lineHeight: "17px" }}
                          >
                            18 month shoots himself by gun
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mt-3">
                      <div className="row no-gutters">
                        <div className="col-auto">
                          <div
                            className="img-holder"
                            style={{ width: "100px" }}
                          >
                            <img
                              className="img-fluid object-fit-cover"
                              src="assets/images/news/travel2.jpeg"
                            />
                          </div>
                        </div>
                        <div className="col align-self-center">
                          <p
                            className="mb-0 pl-2 fs-15px font-weight-bold text-dark"
                            style={{ lineHeight: "17px" }}
                          >
                            18 month shoots himself by gun
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="shadow-sm border news p-3 mt-3 categories">
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
                        <span class="badge badge-primary badge-pill pink">
                          1
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="more-news-slide py-5">
          <div className="container-fluid px-md-5">
            <div className="col-12">
              <div className="row">
                <div className="position-relative  bg-after">
                  <div className="">
                    <div className="main_heading pt-4">
                      <h2 className="line main-heading font-weight-normal">
                        More News
                      </h2>
                    </div>
                    <div className="col-12 news most_popular_slider">
                      <Slider {...morenews_settings}>
                        <div className="px-md-2">
                          <div class="card text-white rounded-0 border-0 position-relative">
                            <div className="overflow-hidden">
                              <img
                                class="card-img img-fluid card-img-top"
                                src="assets/images/news/travel3.jpg"
                                alt="fashion5.jpeg"
                              />
                            </div>
                            <div class="card-img-overlay">
                              <div className="content-box-news">
                                {" "}
                                <Link to="news">
                                  <h5 class="card-title">
                                    Clothing and Accessories for the Fashionable
                                    Crypto Trader
                                  </h5>
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
                            </div>
                          </div>
                        </div>
                        <div className="px-md-2">
                          <div class="card text-white rounded-0 border-0 position-relative">
                            <div className="overflow-hidden">
                              <img
                                class="card-img img-fluid card-img-top"
                                src="assets/images/news/travel3.jpg"
                                alt="fashion5.jpeg"
                              />
                            </div>
                            <div class="card-img-overlay">
                              <div className="content-box-news">
                                {" "}
                                <Link to="news">
                                  <h5 class="card-title">
                                    Clothing and Accessories for the Fashionable
                                    Crypto Trader
                                  </h5>
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
                            </div>
                          </div>
                        </div>
                        <div className="px-md-2">
                          <div class="card text-white rounded-0 border-0 position-relative">
                            <div className="overflow-hidden">
                              <img
                                class="card-img img-fluid card-img-top"
                                src="assets/images/news/travel3.jpg"
                                alt="fashion5.jpeg"
                              />
                            </div>
                            <div class="card-img-overlay">
                              <div className="content-box-news">
                                {" "}
                                <Link to="news">
                                  <h5 class="card-title">
                                    Clothing and Accessories for the Fashionable
                                    Crypto Trader
                                  </h5>
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
                            </div>
                          </div>
                        </div>
                        <div className="px-md-2">
                          <div class="card text-white rounded-0 border-0 position-relative">
                            <div className="overflow-hidden">
                              <img
                                class="card-img img-fluid card-img-top"
                                src="assets/images/news/travel3.jpg"
                                alt="fashion5.jpeg"
                              />
                            </div>
                            <div class="card-img-overlay">
                              <div className="content-box-news">
                                {" "}
                                <Link to="news">
                                  <h5 class="card-title">
                                    Clothing and Accessories for the Fashionable
                                    Crypto Trader
                                  </h5>
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
                            </div>
                          </div>
                        </div>
                      </Slider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default News;
