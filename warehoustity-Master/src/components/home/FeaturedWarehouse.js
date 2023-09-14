import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import FeatureCard from "./FeatureCard";
import { useDispatch, useSelector } from "react-redux";
import { FeaturesWarehouse } from "../../store/actions/warehouseAction";

const FeaturedWarehouse = () => {
  const items = useSelector((state) => state.WAREHOUSEINFO);
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const [slideCount, setSlideCount] = useState(0);

  useEffect(() => {
    dispatch(FeaturesWarehouse());
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

  function concatArray() {
    // if(items.fetureWarehouse?.length <5){
    //   let fcount = items.fetureWarehouse?.concat(items.fetureWarehouse)
    //   return fcount?.concat(items.fetureWarehouse)
    // }
    return items.fetureWarehouse;
  }


  // console.log(items, "items- testing=======")
 
  return (
 
    <section id="four-carousel1"
   className={`four-carousel ${concatArray()?.length === 0 && "d-none"}`}>
 
      <div className="container-fluid">
        <div className="sectionWidth  pt-5">
          <div className="row section-heading text-center">
            <div className="col-12 d-flex justify-content-between">
              <h2 className="largHeading">Featured Warehouses</h2>
              {/* <span className="mt-2">View All</span> */}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-9 col-lg-8 col-md-7 col-sm-5 four-element-slider order-sm-2">
            <div className="four-element-carousel">
              <Slider {...settings}>
                {concatArray()?.length > 0 &&
                  concatArray().map((item, index) => {
                    return (
                      <div key={index} className="px-3 mx-2">
                        <FeatureCard item={item} />
                      </div>
                    );
                  })}
              </Slider>
            </div>
          </div>
          <div className="col-xl-3 zindex col-lg-4 col-md-5 col-sm-7  d-flex bg-dark-primary order-sm-1 align-items-end justify-content-center">
            <div
              className="four-element-carousel-counter"
              data-carousel-target=".four-element-carousel"
              data-carousel-parent="#four-carousel1"
              id="four-carousel-counter2"
            >
              {/* <div className="counter d-flex align-items-end mb-5">
                <div className="current-item counter-item fa-4x">
                  {slideCount}
                </div>
                <div className="total-item counter-item fa-2x">
                  {items.fetureWarehouse?.length}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWarehouse;
