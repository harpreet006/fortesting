import React from "react";
import { Link } from "react-router-dom";

const SubSummaryCard = ({ count, data, title, index, imgIcon, redirect, dashboardIcon }) => {
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

  function getCommingSoon() {
    if (typeof data === "string") {
      // return data;
      return 0;
    }
  }


  return (
    <div className="col-xxl-3 col-xl-4 col-md-6 mb-4 new-card-box">
      {redirect !== "" ? (
        <Link to={`${redirect?.trim()}`}  className="d-flex h-100 w-100 py-1">

          <div
            className="dashboard-card d-flex cardHover w-100 h-100"
         style={{minHeight:"100px"}}
          >
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
            <div className="card-body px-0 align-self-center">
            <h6 className="font-weight-bold mb-0">
                {count ? count : getItemCount()}
              </h6>
              <p className="mb-0 text-truncate2"  style={{fontSize:"16px"}}>{title}</p>
             
            </div>
          </div>
        </Link>
      ) : (
        <div
          className="dashboard-card bg-white d-flex cardHover h-100"
            
        >
          <div className="d-flex align-items-center justify-content-center mx-3 my-auto">
          <div className="icons-box">
            <img
              // src={imgIcon ? imgIcon : "/assets/icons/dashboard-card-img.png"}
              src={dashboardIcon ? dashboardIcon.imgIcon: "/assets/icons/dashboard-card-img.png"}
              alt={`dashoard${index}`}
              className="p-2"
              // style={{ maxHeight: 64, width: 64 }}
            />
            </div>
          </div>
          <div className="card-body align-self-center px-0">
           <h6 className="font-weight-bold mb-0">{getCommingSoon()}</h6>
            <p className="mb-0 text-truncate2" style={{fontSize:"16px"}}>{title}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubSummaryCard;
