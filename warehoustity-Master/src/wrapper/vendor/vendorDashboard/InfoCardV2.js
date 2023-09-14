import React from 'react'
import { Link } from 'react-router-dom'
const InfoCardV2 = ({ data, title, redirect, index, imgIcon, dashboardIcon }) => {

  console.log("data-->", data)

  function getItemCount() {
    let itemCount = 0
    if (data && data.length > 0) {
      itemCount = data.length
    }
    return itemCount
  }

  function getCommingSoon() {
    if (typeof data === "string") {
      return data
    }
  }

  return (
    <div className="col-xxl-3 col-xl-4 col-md-6 mb-4 new-card-box" >
      {redirect ? (<Link to={redirect + `?search=${title}`} className="d-flex h-100 w-100" >
        <div className="dashboard-card  d-flex cardHover w-100">
          <div className="d-flex align-items-center justify-content-center mx-4 my-auto">
            <div className='icons-box'>
              {/* <img src={imgIcon ? imgIcon : "/assets/icons/dashboard-card-img.png"} alt={`dashoard${index}`} /> */}
              <img
                // src={imgIcon ? imgIcon : "/assets/icons/dashboard-card-img.png"}
                src={dashboardIcon ? dashboardIcon.imgIcon: "/assets/icons/dashboard-card-img.png"}
                alt={`dashoard${index}`}
                className="p-2"
              />
            </div>
          </div>
          <div className="card-body py-xxl-5 py-3 px-4">
            <h6 className="font-weight-bold text-truncate2">{getItemCount()}</h6>
            <p className="mb-0" style={{fontSize:"16px"}}>{title}</p>
          </div>
        </div>

      </Link>) : (
        <>
          <div className={`dashboard-card d-flex cardHover w-100 h-100 ${dashboardIcon ? dashboardIcon.padding:" "}`} >
            
            <div className="d-flex align-items-center justify-content-center mx-4 my-auto">
              <div className='icons-box'>
                {/* <img src={imgIcon ? imgIcon : "/assets/icons/dashboard-card-img.png"} alt={`dashoard${index}`} /> */}
                <img
                // src={imgIcon ? imgIcon : "/assets/icons/dashboard-card-img.png"}
                src={dashboardIcon ? dashboardIcon.imgIcon: "/assets/icons/dashboard-card-img.png"}
                alt={`dashoard${index}`}
                className="p-2"
              />
              </div>
            </div>
            <div className="card-body py-xxl-5 py-3 px-4">
            <h6 className="font-weight-bold">{getCommingSoon()}</h6>
              <p className="mb-0 text-truncate2" style={{fontSize:"16px"}}>{title}</p>
            </div>
          </div>
        </>
      )}

    </div>
  )
}

export default InfoCardV2
