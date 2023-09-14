import React, {useEffect} from 'react';
import Slider from "react-slick";
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {typeByPage} from '../../store/actions/whyAction';


const WarehouseType = ({typeData}) => {

  const dispatch = useDispatch()
  const data = useSelector((state)=>state.WHY_INFO);


  useEffect(()=>{
    dispatch(typeByPage())
  },[dispatch])


  function SampleNextArrow(props) {
    const {onClick } = props;
    return (
    <button  onClick={onClick} className='btn next slick-arrow'><span className='fas fa-chevron-right'></span></button>
     
    );
  }
  
  function SamplePrevArrow(props) {
    const {onClick } = props;
    return (
     <button  onClick={onClick} className='btn prev slick-arrow'><span className='fas  fa-chevron-left'></span></button>
     
    );
  }
  

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay:false,
    arrows: true,
    prevArrow:<SampleNextArrow />,
    nextArrow: <SamplePrevArrow/>,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };


  return (
    <section className="four-carousel" id="four-carousel1">
    <div className="container-fluid">
      <div className="row section-heading text-center">
        <div className="col-12">
          <h2 className="h1 main-heading">Warehouses Type</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-9 col-lg-8 col-md-7 col-sm-5 four-element-slider order-sm-2">
          <div className="four-element-carousel">

          <Slider {...settings}>

        {data.typeList?.data && data.typeList.data.length>0 ?

          data.typeList.data.map((item, index)=>{
            return(

              <div  key={index} className="px-3 mx-2">
              <div className="card margin0 custom-card custom-shadow my-sm-5 my-4 mx-3 ">
                <div className="img-holder">
                  <img src={item.image} alt="warehouse" className="img-fluid w-100" style={{height:200}} />
                </div>
                <div className="card-body">
                  <h6 className="card-title">{item?.type}</h6>  
                </div>
                <div className="card-footer btn-bottom">
                <Link to={`/warehouse?warehouseType=${item?.type}&page=1`} className="btn btn-deep-primary btn-block">View Details</Link>
                </div>
              </div>      
              </div>  

            )
          })

        :null}

            
          </Slider>

          </div>
        </div>
        <div className="col-xl-3 zindex col-lg-4 col-md-5 col-sm-7  d-flex bg-dark-primary order-sm-1 align-items-end justify-content-center">
          <div className="four-element-carousel-counter" data-carousel-target=".four-element-carousel" data-carousel-parent="#four-carousel1" id="four-carousel-counter3">
            <div className="counter d-flex align-items-end mb-5">
              <div className="current-item counter-item fa-4x"></div> 
              <div className="total-item counter-item fa-2x"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}

export default WarehouseType;
