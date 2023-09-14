import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { suggestForYouWarehouse } from "../../store/actions/warehouseAction";

const SuggestedYou = () => {
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
            <div className="col-12 d-flex justify-content-between">
              <h2 className="largHeading">Suggested for You</h2>
              <span className="mt-2">View All</span>
            </div>
          </div>
        </div>
      <div className="container">
        <div className="row">
          {items.suggestWarehouse && items.suggestWarehouse?.length > 0
            ? items.suggestWarehouse.map((item, index) => {
                return (
                  <div key={index} className="col-lg-4 my-2">
                    <div
                      className="card custom-card-overlay"
                      style={{ height: 220 }}
                    >
                      <div className="img-holder card-img">
                        <img
                          src={item?.warehouseImagesInfo?.coverImage?.url}
                          style={{ height: 220 }}
                          alt="warehouse"
                          className="img-fluid w-100"
                        />
                      </div>
                      <Link
                        to={`/wh-detail/${item?.id}`}
                        className={`text-gray`}
                      >
                        <div className="card-img-overlay d-flex align-items-end">
                          <div className="card-body d-flex align-items-center">
                            <div className="bg-white pt-3 py-3 px-4 rounded w-100">
                              <h5 className="font-weight-bold">
                                ID: {item?.warehouseId}
                              </h5>
                              <p className="card-tex text-capitalizet">
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
                              </p>
                              <p className="card-text">
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
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
        {/* <div className="row justify-content-center pt-5">
        <Link to="#" className="btn btn-deep-primary">View All</Link>
      </div> */}
      </div>
    </section>
  );
};

export default SuggestedYou;
