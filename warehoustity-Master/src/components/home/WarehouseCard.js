import React from "react";
import { Link } from "react-router-dom";

const WarehouseCard = ({ item }) => {
  return (
    <div className="card margin0 custom-card custom-shadow my-sm-5 my-4 mx-3 ">
      <div className="img-holder">
        {item?.images && item?.images.length > 0 ? (
          <img
            src={item?.images[0].imageURL}
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
        {/* <h5 className="font-weight-bold">ID: {item.id}</h5> */}

        <p style={{height:35}}>
          {/* <span className="d-inline-block">
            <img src={"/assets/images/icons/icon-area-dark.png"} alt="warehouse" />
          </span> */}

          {item.name}
        </p>
        <Link
          to={`/service/${item.id}`}
          className="btn btn-deep-primary btn-block"
        >
          View Details
        </Link>
      </div>
      {/* <div className="card-footer btn-bottom">
        <Link
          to={`/service/${item.id}`}
          className="btn btn-deep-primary btn-block"
        >
          View Details
        </Link>
      </div> */}
    </div>
  );
};

export default WarehouseCard;
