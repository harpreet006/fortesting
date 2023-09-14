import React from "react";
import { Link } from "react-router-dom";

const InfoRfqCard = ({ renderData, index, dashboardIcon }) => {
  const { key, imageUrl, url, data, } = renderData;

  console.log("Data->", data);

  function getCount() {
    if (Array.isArray(data)) {
      return data.length;
    }
    return data;
  }

  return (
    <div className="col-xxl-3 col-xl-4 col-md-6 mb-4 new-card-box">
      {url ? (
        // <Link to={url + `?search=${key}`} className="d-flex h-100 w-100">
          <div className="dashboard-card  d-flex cardHover w-100 d-flex h-100 w-100">
            <div className="d-flex align-items-center justify-content-center mx-4 my-auto">
              <div className="icons-box">
              <img
                // src={imgIcon ? imgIcon : "/assets/icons/dashboard-card-img.png"}
                src={dashboardIcon ? dashboardIcon.imgIcon: "/assets/icons/dashboard-card-img.png"}
                alt={`dashoard${index}`}
                className="p-2"
              />
              </div>
            </div>
            <div className="card-body py-xxl-5 py-3 px-4">
              <h6 className="font-weight-bold">{getCount()}</h6>
              <p className="mb-0" style={{fontSize:"16px"}} >{key}</p>
            </div>
          </div>
        // </Link>
      ) : (
        <>
          <div className="dashboard-card d-flex cardHover w-100 h-100">
            <div className="d-flex align-items-center justify-content-center mx-4 my-auto">
              <div className="icons-box">
              <img
                // src={imgIcon ? imgIcon : "/assets/icons/dashboard-card-img.png"}
                src={dashboardIcon ? dashboardIcon.imgIcon: "/assets/icons/dashboard-card-img.png"}
                alt={`dashoard${index}`}
                className="p-2"
              />
              </div>
            </div>
            <div className="card-body py-xxl-5 py-3 px-4">
              <h6 className="font-weight-bold">{getCount()}</h6>
              <p className=""style={{fontSize:"16px"}}>{key}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InfoRfqCard;
