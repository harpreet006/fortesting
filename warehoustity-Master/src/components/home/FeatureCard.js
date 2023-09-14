import React from "react";
import { Link } from "react-router-dom";

const FeatureCard = ({ item }) => {
  return (
    <div className="card margin0 custom-card my-sm-5 my-4  mx-3 ">
      <div className="img-holder">
        {item?.warehouse?.warehouseImagesInfo?.coverImage?.url ? (
          <img
            src={item?.warehouse?.warehouseImagesInfo?.coverImage?.url}
            alt="warehouse"
            className="img-fluid w-100"
            style={{ height: 200 }}
          />
        ) : (
          <img
            src={`http://warehousity-main-website.s3-website.ap-south-1.amazonaws.com/assets/images/product/product1.png`}
            alt="warehouse"
            className="img-fluid w-100"
            style={{ height: 200 }}
          />
        )}
      </div>

      <div className="card-body pb-2">
        <h5 className="font-weight-bold">ID: {item?.warehouse?.warehouseId}</h5>

        {/* <p className="card-text">
          {item?.warehouse?.warehouseName}
        </p> */}

        <p className=" d-flex text-captalize" style={{ height: 35 }}>
          <i className="fas fa-map-marker-alt mr-1 mt-2"></i>
          {item?.warehouse?.warehouseContactDetailInfo?.address?.line1 +
            ", " +
            item?.warehouse?.warehouseContactDetailInfo?.address?.city +
            ", " +
            item?.warehouse?.warehouseContactDetailInfo?.address?.state}
        </p>
        <p className="card-text">
          <span className="d-inline-block">
            <img
              src={"/assets/images/icons/icon-area-dark.png"}
              alt="warehouse"
              className=""
            />
          </span>
          {item?.totalArea} sq ft
        </p>

        <Link
          to={`/wh-detail/${item?.warehouse?.id}`}
          className="btn btn-deep-primary btn-block"
        >
          View Details
        </Link>
      </div>
      {/* <div className="card-footer btn-bottom">
        <Link
          to={`/wh-detail/${item?.warehouse?.id}`}
          className="btn btn-deep-primary btn-block"
        >
          View Details
        </Link>
      </div> */}
    </div>
  );
};

export default FeatureCard;
