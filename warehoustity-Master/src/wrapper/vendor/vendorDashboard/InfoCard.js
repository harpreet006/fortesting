import React from 'react';
import { Link } from 'react-router-dom'
const InfoCard = ({ data, title, redirect, index, imgIcon, dashboardIcon }) => {
  function getItemCount() {
    let itemCount = 0
    // eslint-disable-next-line
    const data1 = data?.data?.map((val) => {
      if (Array.isArray(val?.data)) {
        itemCount += val?.data?.length
      }
      return val
    })
    return itemCount
  }

  function commingSoon() {
    if (typeof data?.data === "string") {
      return data?.data
    }
  }

  return (
    <div className="col-xxl-3 col-xl-4 col-md-6 mb-4 new-card-box">
      {redirect !== "" ? (<Link to={redirect + `?search=${title}`} className="d-flex h-100 w-100">

        {/* <div className="dashboard-card bg-white custom-shadow w-100 rounded text-gray">
        <div className="card-body py-xxl-5 p-2">
            <p className="mb-2 font-heading text-center">{title}</p>
            <h4 className="h4 mb-0 text-center">{getItemCount()}</h4>
        </div>
        </div> */}

        <div className="dashboard-card d-flex cardHover w-100 py-2">
          <div className="d-flex align-items-center justify-content-center mx-4 my-auto">
            <div className='icons-box'>
              {/* <img src={imgIcon ? imgIcon : "/assets/icons/dashboard-card-img.png"} alt={`dashoard${index}`} /> */}
              <img
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
            <h6 className="font-weight-bold">{getItemCount()}</h6>
            <p className="mb-0" style={{fontSize:"16px"}}>{title}</p>
          </div>
        </div>



      </Link>) : (
        <>
          {/* <div className="dashboard-card bg-white custom-shadow w-100 rounded text-gray">
           <div className="card-body py-xxl-5 p-2">
             <p className="mb-2 font-heading text-center">{title}</p>
             <h6 className="mb-0 text-center">{commingSoon()}</h6>
           </div>
         </div> */}

          <div className="dashboard-card d-flex cardHover w-100 h-100">
            <div className="d-flex align-items-center justify-content-center mx-4 my-auto">
              <div className='icons-box'>
                {/* <img src={imgIcon ? imgIcon : "/assets/icons/dashboard-card-img.png"} alt={`dashoard${index}`} /> */}
                <img
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
              <p className="" style={{fontSize:"16px"}}>{title}</p>
           
            </div>
          </div>




        </>
      )}

    </div>
  );
}

export default InfoCard;
