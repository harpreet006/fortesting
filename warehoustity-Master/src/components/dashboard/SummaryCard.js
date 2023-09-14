import React from "react";
import { Link } from "react-router-dom";
// import dashboardImg from '/assets/icons/dashboard-card-img.png';

const SummaryCard = ({
  data,
  title,
  index,
  imgIcon,
  redirect,
  dashboardIcon, 
}) => {
  function getItemCount() {
    let itemCount = 0;
    if (typeof data?.data !== "string") {
      // eslint-disable-next-line
      const data1 = data?.data?.map((val) => {
        if (Array.isArray(val?.data)) {
          itemCount += val?.data?.length;
        }
        return val;
      });
    }

    return itemCount;
  }

  function commingSoon() {
    if (typeof data?.data === "string") {
      // return data.data;
      return 0;
    }
  }

  return (
    <div className="col-xxl-3 col-xl-4 col-md-6 mb-4 new-card-box">
      {redirect ? (
        <Link to={redirect + `?search=${title}`} className="d-flex h-100 w-100">
          <div
            className="dashboard-card  d-flex cardHover w-100 h-100"
            // style={{ minHeight: 100 }}
          >
            <div className="d-flex align-items-center justify-content-center mx-4 my-auto">
              <div className="icons-box">
                <img
                  // src={imgIcon ? imgIcon : "/assets/icons/dashboard-card-img.png"}
                  src={
                    dashboardIcon
                      ? dashboardIcon.imgIcon
                      : "/assets/icons/dashboard-card-img.png"
                  }
                  alt={`dashoard${index}`}
                  className="p-2"
                  // style={{ maxWidth: 65, height: 65 }}
                />
              </div>
            </div>
            <div className="card-body align-self-center px-0">
              <h6 className="font-weight-bold">
                {data.data[0].count ? data.data[0].count : getItemCount()}
              </h6>
              <p className="mb-0 text-truncate2" style={{ fontSize: "17px" }}>
                {title}
              </p>
              <p></p>
            </div>
          </div>
        </Link>
      ) : (
        <>
          <div
            className="dashboard-card bg-white d-flex cardHover w-100 h-100"
            // style={{ minHeight: 100}}
          >
            <div className="size-50px d-flex align-items-center justify-content-center mx-4 my-auto">
              <div className="icons-box">
                <img
                  // src={imgIcon}
                  src={
                    dashboardIcon
                      ? dashboardIcon.imgIcon
                      : "/assets/icons/dashboard-card-img.png"
                  }
                  alt={`dashoard${index}`}
                  className="p-2"
                  // style={{ maxWidth: 65, height: 65 }}
                />
              </div>
            </div>
            <div className="card-body align-self-center px-0">
              <h6 className="font-weight-bold">{commingSoon()}</h6>
              <p className=" mb-0 text-truncate1" style={{ fontSize: "17px" }}>
                {title}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SummaryCard;
