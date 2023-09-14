import React, { useEffect } from "react";
import Slider from "react-slick/lib/slider";
import { slickheightequal } from "../util/main";
import { SRLWrapper } from "simple-react-lightbox";

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      // style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    >
      <button className="translate-middel-x"></button>
    </div>
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      // style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    >
      <button className="translate-middel-x"></button>
    </div>
  );
}

const EventGallery = () => {
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    arrows: false,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: false,
    // centerPadding: "80px",
    // centerMode: true,
    swipeToSlide: true,
    // focusOnSelect: true,
    initialSlide: 0,
    slidesToScroll: 1,
    variableWidth: true,
    // prevArrow: <SamplePrevArrow />,
    // nextArrow: <SampleNextArrow />,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  useEffect(() => {
    slickheightequal();
  });

  return (
    <>
     <SRLWrapper> 
      <div className="col-12 py-md-5 overflow-hidden popular-influencers-carousel slick-height-equal slick-arrow-before-none">
        <Slider {...settings}>
            <div className="px-1">
              <div className="card w-200px">
                <div className="card-body p-0">
                  <div className="row">
                    <div className="col-12 mb-1">
                      <div className="img-holder">
                         
                        <a href="https://media.istockphoto.com/photos/smiling-colleagues-riding-on-forklift-in-textile-factory-storage-room-picture-id1314976879?k=20&m=1314976879&s=612x612&w=0&h=1w8fRYM7SwM9ede-qx-nbEK43jnDD1byP_qbbe10uQw=">
                          <img
                             className="img-fluid w-100"
                            src="/assets/images/events/ev-details-1.png"
                            alt="lightbox"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-1">
              <div className="card w-200px">
                <div className="card-body p-0">
                  <div className="row">
                    <div className="col-12 mb-1">
                      <div className="img-holder">
                        <a href="https://media.istockphoto.com/photos/smiling-colleagues-riding-on-forklift-in-textile-factory-storage-room-picture-id1314976879?k=20&m=1314976879&s=612x612&w=0&h=1w8fRYM7SwM9ede-qx-nbEK43jnDD1byP_qbbe10uQw=">
                          <img
                            className="img-fluid w-100"
                            src="/assets/images/events/ev-details-2.png"
                            alt="lightbox"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-1">
              <div className="card w-200px">
                <div className="card-body p-0">
                  <div className="row">
                    <div className="col-12 mb-1">
                      <div className="img-holder">
                        <a href="https://media.istockphoto.com/photos/smiling-colleagues-riding-on-forklift-in-textile-factory-storage-room-picture-id1314976879?k=20&m=1314976879&s=612x612&w=0&h=1w8fRYM7SwM9ede-qx-nbEK43jnDD1byP_qbbe10uQw=">
                          <img
                            className="img-fluid w-100"
                            src="/assets/images/events/ev-details-1.png"
                            alt="lightbox"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-1">
              <div className="card w-200px">
                <div className="card-body p-0">
                  <div className="row">
                    <div className="col-12 mb-1">
                      <div className="img-holder">
                        <a href="https://media.istockphoto.com/photos/smiling-colleagues-riding-on-forklift-in-textile-factory-storage-room-picture-id1314976879?k=20&m=1314976879&s=612x612&w=0&h=1w8fRYM7SwM9ede-qx-nbEK43jnDD1byP_qbbe10uQw=">
                          <img
                            src="/assets/images/events/ev-details-1.png"
                            alt="lightbox"
                            className="w-100"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </Slider>
      </div>
      </SRLWrapper>
    </>
  );
};

export default EventGallery;
