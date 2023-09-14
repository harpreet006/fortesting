import React from "react";
import { Link } from "react-router-dom";

const ValueAddedSummeryCard = ({service, data, title, index, imgIcon }) => {
  // eslint-disable-next-line
  function getItemCount() {
    let itemCount = 0;
    // eslint-disable-next-line
    const data1 = data?.data?.map((val) => {
      if (Array.isArray(val?.data)) {
        itemCount += val?.data?.length;
      }
      return val;
    });
    return itemCount;
  }

  // eslint-disable-next-line
  function getCommingSoon() {
    if (typeof data === "string") {
      return 0;
    }
  }

  const vasType = [
    "",
    "layout",
    "wms",
    "dms",
    "",
    "gps",
    "telephonic",
    "it",
    "automation",
    "barcode",
    "demand",
  ];

  return (
    <div className="col-xxl-3 col-xl-4 col-md-6 mb-4">
      {vasType[index] !== "" ? (
        <Link to={`/dashboard/valueaddedservices/${index}/0/${vasType[index]}`}>
          <div
            className="dashboard-card bg-white d-flex cardHover"
            style={{ height: 100 }}
          >
            <div className="d-flex align-items-center justify-content-center mx-3 my-auto">
              <img
                src={imgIcon ? imgIcon : "/assets/icons/dashboard-card-img.png"}
                alt={`dashoard${index}`}
                style={{ maxWidth: 65, height: 65 }}
              />
            </div>
            <div className="card-body py-xxl-5 py-2 px-3">
              <p className="text-gray text-center mt-2">{title}</p>
              <h6 className="text-gray text-center">{data}</h6>
            </div>
          </div>
        </Link>
      ) : (
        <Link to={`/service/${service?.subData?.length>0 && service?.subData[0].category?.id}?vas=true`}>
         <div
          className="dashboard-card bg-white d-flex cardHover"
          style={{ height: 100 }}
        >
          <div className="d-flex align-items-center justify-content-center mx-3 my-auto">
            <img
              src={imgIcon ? imgIcon : "/assets/icons/dashboard-card-img.png"}
              alt={`dashoard${index}`}
              style={{ maxWidth: 65, height: 65 }}
            />
          </div>
          <div className="card-body py-xxl-5 py-2 px-3">
            <p className="text-gray text-center">{title}</p>
            <h6 className="text-gray text-center">{data}</h6>
          </div>
        </div>
        </Link>
       
      )}
    </div>
  );
};

export default ValueAddedSummeryCard;
