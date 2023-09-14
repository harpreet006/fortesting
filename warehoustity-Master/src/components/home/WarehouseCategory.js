import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { typeByPage } from "../../store/actions/whyAction";
import { categoryByPage } from "../../store/actions/categoryAction";

const WarehouseCategory = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.CATEGORY_INFO.categoryList);
  // const[updatedCategory,setUpdatedCategory] = useState()
  // const category = [category1]
  console.log("categoryone",category)
   let updatedCategoryy = []

   category.forEach((value,index)=>{

    return (  

      value.categoryStatus?

      updatedCategoryy.push(value):
      console.log("hello")
      
    )
   })

  //  useEffect(()=>{

  //   setUpdatedCategory(updatedCategory)
  //  },[])
    
   
   



   console.log("updatedcat",updatedCategoryy)
  


  console.log("categoryl",category)

  let count =0;
  category.forEach((value,index)=>{ 

    if (!value.categoryStatus) {
      count++;
    }

})

  console.log("countcategory",count);
  
 


  // eslint-disable-next-line
  const [slideCount, setSlideCount] = useState(0);
  // eslint-disable-next-line
  const [activeCard, setActiveCard] = useState(1)

  useEffect(() => {
    dispatch(typeByPage());
    dispatch(categoryByPage());
  }, [dispatch]);

  function SampleNextArrow(props) {
    const { onClick, currentSlide } = props;
    setSlideCount(currentSlide + 1);
    setActiveCard(currentSlide)
    return (
      <button onClick={onClick} className="btn next slick-arrow">
        <span className="fas fa-chevron-right"></span>
      </button>
    );
  }

  // function SamplePrevArrow(props) {
  //   const { onClick, currentSlide } = props;
  //   setSlideCount(currentSlide + 1);
  //   setActiveCard(currentSlide)
  //   return (
  //     <button onClick={onClick} className="btn prev slick-arrow">
  //       <span className="fas  fa-chevron-left"></span>
  //     </button>
  //   );
  // }

  function SamplePrevArrow(props) {
    const { onClick, currentSlide } = props;
    setSlideCount(currentSlide + 1);
    setActiveCard(currentSlide);
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
    // cssEase: "linear",
   
    // className: "cardActive",
    // centerMode: true,
  // centerPadding: '100px',
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
    {category.length !== count 
    ?
    <section 
    
    className={`four-carousel bg-deep-gray ${category?.length === 0 && "d-none"}`}
    id="four-carousel1">
      <div className="container-fluid pb-4">
        <div className="sectionWidth pt-2">
          <div className="row section-heading text-center">
            <div className="col-12 text-center">
              <h2 className="largHeading mb-0">Warehouse Categories </h2>
            
              {/* <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual</p> */}
              {/* <span className="mt-2">View All</span> */}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-9 col-lg-8 col-md-7 col-sm-5  order-sm-2 ps-md-2 ps-2 pt-1">
            <div className="four-element-carousel">
              <Slider {...settings}>
                {updatedCategoryy &&
                  updatedCategoryy.length > 0 &&
                  updatedCategoryy.map((item, index) => {
                    // console.log("itemddd",item)
                    return (

                      <>
                      {item.categoryStatus?
                      <div key={index} className={`px-3 mx-2 mx-auto`}>
                        <div className="custom-shadow margin0 mx-3 mx-auto my-4 w-100 card custom-card">
                          <div className="img-holder">
                            <img
                              src={item?.image}
                              alt="warehouse"
                              className="img-fluid w-100"
                              style={{ height: 200 }}
                            />
                          </div>
                          <div className="card-body">
                            <h6 className="card-title">{item?.categoryName}</h6>

                            <Link
                              to={`/warehouse?warehouseType=${item?.id}&page=1`}
                              className="btn btn-deep-primary btn-block"
                            >
                              View Details
                            </Link>
                          </div>
                          {/* <div className="card-footer btn-bottom">
                            <Link
                              to={`/warehouse?warehouseType=${item?.id}&page=1`}
                              className="btn btn-deep-primary btn-block"
                            >
                              View Details
                            </Link>
                          </div> */}
                        </div>
                      </div>

                      :
                     <>
                    {console.log("hi")}
                     </>
                  }
                      </>
                    );
                  })}
              </Slider>
            </div>
          </div>
          <div className="col-xl-3 zindex col-lg-4 col-md-5 col-sm-7  d-flex bg-dark-primary order-sm-1 align-items-end justify-content-center slick-activee">
            <div
              className="four-element-carousel-counter"
              data-carousel-target=".four-element-carousel"
              data-carousel-parent="#four-carousel1"
              id="four-carousel-counter3"
            >
              {/* <div className="counter d-flex align-items-end mb-5">
                <div className="current-item counter-item fa-4x">
                  {slideCount}
                </div>
                <div className="total-item counter-item fa-2x">
                  {category?.length}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>

:
<section>

<div className="col-12 text-center">
              <h2 className="largHeading mb-0">Warehouse Categories</h2>
            
              {/* <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual</p> */}
              {/* <span className="mt-2">View All</span> */}
            </div>

            <h4 className="text-center mt-5"> No Category Found</h4>
</section>
}

      </>
  );
};

export default WarehouseCategory;
