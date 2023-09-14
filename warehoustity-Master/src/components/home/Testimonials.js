import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useDispatch } from "react-redux";
import { testimonialByPage } from "../../store/actions/testimonialAction";
import testimonial from "../../json/testimonial.json";
import TestimonialList from "../dashboard/TestimonialList";

const Testimonials = () => {
  // const items = useSelector((state) => state.TESTIMONIAL_INFO);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(testimonialByPage(1));
  }, [dispatch]);

    // eslint-disable-next-line
  const [slideCount, setSlideCount] = useState(0);
  // eslint-disable-next-line
  const [activeCard, setActiveCard] = useState(1)

  function SampleNextArrownew(props) {
    const { onClick, currentSlide } = props;
    setSlideCount(currentSlide + 1);
    setActiveCard(currentSlide)
    return (
      <button onClick={onClick} className="btn next slick-arrow btn-dark mx-5 ">
        <span className="fas fa-chevron-left"></span>
      </button>
    );
  }

  function SamplePrevArrownew(props) {
    const { onClick, currentSlide } = props;
    setSlideCount(currentSlide + 1);
    setActiveCard(currentSlide)
    return (
      <button onClick={onClick} className="btn prev slick-arrow btn-dark">
        <span className="fas  fa-chevron-right"></span>
      </button>
    );
  }

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    prevArrow: <SampleNextArrownew/>,
    nextArrow: <SamplePrevArrownew />,
    autoplay: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
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

  return (
    <section
      className={`testimonials bg-deep-gray ${
        testimonial?.length > 0 ? "" : "d-none"
      }`}
    >
      <div className="container-fluid mt-4 mb-lg-0 mb-4">
        <div className="sectionWidth  pt-4">
          <div className="row section-heading text-center">
            <div className="col-12 d-flex justify-content-between">
              <h2 className="largHeading mb-0">Testimonials</h2>
              {/* <span className="mt-2">View All</span> */}
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row mb-5">
            <div className="col-12 px-4">
              <Slider {...settings}>
                {testimonial?.length > 0 &&
                  testimonial.map((item, index) => {
                    return <TestimonialList key={index} item={item} />;
                  })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
