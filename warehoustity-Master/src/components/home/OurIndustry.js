import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { suggestForYouWarehouse } from "../../store/actions/warehouseAction";
import industry from "../../json/industry.json";

const OurIndustry = () => {
    const items = useSelector((state) => state.WAREHOUSEINFO);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(suggestForYouWarehouse());
    }, [dispatch]);

    return (
        <section
        className={`suggested-For-you ${
          items.suggestWarehouse?.length > 0 ? "" : "d-none"
        }`}
      >
        <div className="sectionWidth  pt-4">
            <div className="row section-heading text-center">
              <div className="col-12 text-center">
                <h2 className="largHeading mb-0">Industry</h2>
                {/* <span className="mt-2">View All</span> */}
                <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual</p>
              </div>
            </div>
          </div>
        <div className="container">
          <div className="row">
            {industry?.length > 0
              && industry.map((item, index) => {
                  return (
                    <div key={index} className="col-lg-4 my-2">
                      <div
                        className="card custom-card-overlay"
                        style={{ height: 220 }}
                      >
                        <div className="img-holder card-img">
                          <img
                            src={item?.url}
                            style={{ height: 220 }}
                            alt="warehouse"
                            className="img-fluid w-100"
                          />
                        </div>
                        {/* <Link
                          to={`/wh-detail/${item?.id}`}
                          className={`text-gray`}
                        > */}
                          <div className="card-img-overlay d-flex align-items-end">
                            <div className="card-body d-flex align-items-center">
                              <div className="bg-white pt-3 py-3 px-4 rounded w-100">
                                <h5 className="font-weight-bold">
                                  {item?.name}
                                </h5>
                                {/* <p className="card-tex text-capitalizet">
                                  <span className="d-inline-block">
                                    <img
                                      src={
                                        "/assets/images/icons/icon-location.png"
                                      }
                                      alt="warehouse"
                                      className=""
                                    />
                                  </span>
                                  {`${item?.warehouseContactDetailInfo?.address?.district} ${item?.warehouseContactDetailInfo?.address?.state}`}
                                </p> */}
                                {/* <p className="card-text">
                                  <span className="d-inline-block">
                                    <img
                                      src={
                                        "/assets/images/icons/icon-area-dark.png"
                                      }
                                      alt="warehouse"
                                      className=""
                                    />
                                  </span>
                                  {item?.totalArea} sq ft
                                </p> */}
                              </div>
                            </div>
                          </div>
                        {/* </Link> */}
                      </div>
                    </div>
                  );
                })
              }
          </div>
        </div>
      </section>
    )
}

export default OurIndustry
