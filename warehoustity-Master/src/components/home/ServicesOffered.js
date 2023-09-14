import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import WarehouseCard from "./WarehouseCard";
import { serviceCategoryByPage } from "../../store/actions/serviceAction";
import { useSelector, useDispatch } from "react-redux";

const ServicesOffered = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.SERVICEINFO);
    // eslint-disable-next-line
  const [slideCount, setSlideCount] = useState(0);

  useEffect(() => {
    dispatch(serviceCategoryByPage());
  }, [dispatch]);

  function SampleNextArrow(props) {
    const { onClick, currentSlide } = props;
    setSlideCount(currentSlide + 1);
    return (
      <button onClick={onClick} className="btn next slick-arrow">
        <span className="fas fa-chevron-right"></span>
      </button>
    );
  }

  function SamplePrevArrow(props) {
    const { onClick, currentSlide } = props;
    setSlideCount(currentSlide + 1);
    return (
      <button onClick={onClick} className="btn prev slick-arrow">
        <span className="fas  fa-chevron-left"></span>
      </button>
    );
  }

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: false,
    arrows: true,
    prevArrow: <SampleNextArrow />,
    nextArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

// console.log(data.categoryList?.length, "checkcategorylist")

  return (
    <div id="rohan">
      <section
        className={`four-carousel ${data.categoryList?.length === 0 && "d-none"}`}
        id="four-carousel1"
      >
        <div className="container-fluid">
          <div className="sectionWidth  pt-4">
            <div className="row section-heading text-center">
              <div className="col-12 d-flex justify-content-center ">
                <h2 className="largHeading">Services Offered</h2>
                {/* <span className="mt-2">View All</span> */}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-9 col-lg-8 col-md-7 col-sm-5 four-element-slider order-sm-2">
              <div className="four-element-carousel">
                <Slider {...settings}>
                  {data.categoryList && data.categoryList.length > 0
                    ? data.categoryList.map((item, index) => {
                        return (
                          <div key={index} className="px-3 mx-2">
                            <WarehouseCard item={item} />
                          </div>
                        );
                      })
                    : null}
                </Slider>
              </div>
            </div>
            <div className="col-xl-3 zindex col-lg-4 col-md-5 col-sm-7  d-flex bg-dark-primary order-sm-1 align-items-end justify-content-center">
              <div
                className="four-element-carousel-counter"
                data-carousel-target=".four-element-carousel"
                data-carousel-parent="#four-carousel1"
                id="four-carousel-counter1"
              >
                {/* <div className="counter d-flex align-items-end mb-5">
                  <div className="current-item counter-item fa-4x">
                    {slideCount}
                  </div>
                  <div className="total-item counter-item fa-2x">
                    {data.categoryList?.length}
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesOffered;
