  import React, { useEffect, useState } from "react";
  import { Link } from "react-router-dom";
  import { useSelector, useDispatch } from "react-redux";
  import { warehouseCount } from "../../store/actions/homeAction";
  import $ from "jquery";
  import loadjs from "loadjs";

  const BrowseWarehouse = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.HOMEINFO);

    const [wareLocation, setwareLocation] = useState("delhi");

    const clickCount = (state) => {
      setwareLocation(state);
      dispatch(warehouseCount(state));
    };

    useEffect(() => {
      loadjs("/assets/js/jquery.min.js", function () {
        loadjs("/assets/js/brijesh.js", function () {
          // loadjs('/assets/js/product.js', function() {
          // });
        });
      });
    }, []);

    useEffect(() => {
      dispatch(warehouseCount("Delhi"));
    }, [dispatch]);

    useEffect(() => {
      function homeBrowse() {
        $(window).on("load", function () {
          var getactivebtn = $(".india-map .btn-map.active");
          var getlink = getactivebtn.attr("data-link");
          var getwarehousesnumber = getactivebtn.attr("data-warehouses-number");
          var gettitle = getactivebtn.attr("data-title");
          var getimage = getactivebtn.attr("data-image");

          var getcardlink = $(".filter-card").find(".card-link");
          var getcardtext = $(".filter-card").find(".card-text");
          var getcardtitle = $(".filter-card").find(".card-title");
          var getcardimage = $(".filter-card").find(".card-img");

          getcardlink.attr("href", getlink);
          getcardtext.html(getwarehousesnumber + " Warehouses");
          getcardtitle.text(gettitle);
          getcardimage.attr("src", getimage);
        });
        $(".india-map .btn-map").on("click", function () {
          $(".india-map .btn-map").removeClass("active");
          $(this).addClass("active");
          var getlink = $(this).attr("data-link");
          var getwarehousesnumber = $(this).attr("data-warehouses-number");
          var gettitle = $(this).attr("data-title");
          var getimage = $(this).attr("data-image");

          var getcardlink = $(".filter-card").find(".card-link");
          var getcardtext = $(".filter-card").find(".card-text");
          var getcardtitle = $(".filter-card").find(".card-title");
          var getcardimage = $(".filter-card").find(".card-img");

          getcardlink.attr("href", getlink);
          getcardtext.html(getwarehousesnumber + " Warehouses");
          getcardtitle.text(gettitle);
          getcardimage.attr("src", getimage);
        });
      }

      homeBrowse();
    }, []);

    // warehouseCount
    return (
      <div className="container d-none">
        <div className="row section-heading text-center">
          <div className="col-12">
            {/* <p className="text-dark text-uppercase my-4 pt-4">Welcome Warehousity</p> */}
            <h2 className="h1 text-capitalize text-white font-weight-bold">
              Our Presence In Major Cities
            </h2>
          </div>
        </div>
        <div className="row align-items-center-align-items-center d-flex align-items-center col-lg-10 mx-auto">
          <div className="col-lg-7 pt-5 mb-2">
            <div className="india-map px-md-5">
              <img
                // src={"/assets/images/filter-warehouse/india.png"}
                // src="assets/images/news/Cover.jpg"
                src="assets/images/news/map.png"
                alt="warehouse"
                className="img-fluid w-100"
                style={{ transform: "scale(1.2)" }}
              />

              <button
                onClick={() => clickCount("Delhi")}
                className="btn px-2 btn-map active btn-delhi"
                data-image={"/assets/images/filter-warehouse/delhi.png"}
                data-title="Warehouses in delhi"
                data-warehouses-number={data.homeCount ? data.homeCount : 0}
                data-link="#delhi"
              >
                <span className="dot"></span>
                <span className="state-name">Delhi</span>
              </button>
              <button
                onClick={() => clickCount("Gujarat")}
                className="btn px-2 btn-map btn-gandhinagar"
                data-image={"/assets/images/filter-warehouse/gandhinagar.png"}
                data-title="Warehouses in Gujarat"
                data-warehouses-number={data.homeCount}
                data-link="#gandhinagar"
              >
                <span className="dot"></span>
                <span className="state-name">Gujarat</span>
              </button>
              <button
                onClick={() => clickCount("Madhya Pradesh")}
                className="btn px-2 btn-map btn-bhopal"
                data-image={"/assets/images/filter-warehouse/bhopal.jpg"}
                data-title="Warehouses in Madhya Pradesh"
                data-warehouses-number={data.homeCount}
                data-link="#bhopal"
              >
                <span className="dot"></span>
                <span className="state-name">Madhya Pradesh</span>
              </button>
              <button
                onClick={() => clickCount("West Bengal")}
                className="btn px-2 btn-map btn-kolkata"
                data-image={"/assets/images/filter-warehouse/kolkata.jpg"}
                data-title="Warehouses in West Bengal"
                data-warehouses-number={data.homeCount}
                data-link="#kolkata"
              >
                <span className="dot"></span>
                <span className="state-name">West Bengal</span>
              </button>
              <button
                onClick={() => clickCount("Maharashtra")}
                className="btn px-2 btn-map btn-mumbai"
                data-image={"/assets/images/filter-warehouse/mumbai.jpg"}
                data-title="Warehouses in Maharashtra"
                data-warehouses-number={data.homeCount}
                data-link="#mumbai"
              >
                <span className="dot"></span>
                <span className="state-name">Maharashtra</span>
              </button>
              <button
                onClick={() => clickCount("Haryana")}
                className="btn px-2 btn-map btn-hyderabad"
                data-image={"/assets/images/filter-warehouse/hydrabad.jpg"}
                data-title="Warehouses in Haryana"
                data-warehouses-number={data.homeCount}
                data-link="#hyderabad"
              >
                <span className="dot"></span>
                <span className="state-name">Haryana</span>
              </button>
              <button
                onClick={() => clickCount("Karnataka")}
                className="btn px-2 btn-map btn-bangalore"
                data-image={"/assets/images/filter-warehouse/bangalore.jpg"}
                data-title="Warehouses in Karnataka"
                data-warehouses-number={data.homeCount}
                data-link="#bangalore"
              >
                <span className="dot"></span>
                <span className="state-name">Karnataka</span>
              </button>
            </div>
          </div>

          <div className="col-lg-5 py-5 px-md-4">
            <div className="card col-xxl-10 mx-auto filter-card border-0" style={{borderRadius:"15px"}}>
              <div className="img-holder">
                <img
                  src=""
                  alt="home"
                  className="img-fluid w-100 card-img"
                  style={{ height: 250 }}
                />
              </div>
              <div className="card-body pb-0">
                <p className="card-title h5"></p>
                <p className="text-gray">{data.homeCount} Warehouse</p>
              </div>
              <div className="card-footer border-0 bg-white pb-3">
                <div className="col-12 mx-auto">
                  <Link
                    to={`/warehouse?page=1&location=${wareLocation}`}
                    className="btn btn-deep-primary py-2 w-100 card-link rounded-3 text-white"
                  >
                    View Warehouses
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row section-heading text-center">
          <div className="col-12">
            <div className="text-center">
              <Link to="/warehouse?page=1" className="btn btn-deep-primary">
                Explore More
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default BrowseWarehouse;
