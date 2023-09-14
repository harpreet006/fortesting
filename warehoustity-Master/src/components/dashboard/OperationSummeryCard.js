import React from 'react'
import { Link } from 'react-router-dom'

const OperationSummeryCard = ({ count, data, title, index, imgIcon, redirect }) => {

    console.log("-->", title, data)

    // function getItemCount() {

    //     let itemCount = 0
    //     // eslint-disable-next-line
    //     const data1 = data?.data?.map((val) => {
    //         if (Array.isArray(val?.data)) {
    //             itemCount += val?.data?.length
    //         }
    //         return val
    //     })

    //     return itemCount
    // }

    // function getCommingSoon() {
    //     if (typeof data === "string") {
    //         return data;
    //     }
    // }


    return (
        <div className="col-xxl-3 col-xl-4 col-md-6 mb-4">
            {redirect !== "" && data !== "Comming soon" ? (<Link to={`${redirect?.trim()}`}>
                {/* {false ? (<Link to={`${redirect?.trim()}`}> */}

                <div className="dashboard-card bg-white custom-shadow d-flex" style={{ height: 120 }}>
                    <div className="d-flex align-items-center justify-content-center mx-3 my-auto">
                        <img src={imgIcon ? imgIcon : "/assets/icons/dashboard-card-img.png"} alt={`dashoard${index}`} style={{ maxWidth: 70, height: 70 }} />
                    </div>
                    <div className="card-body py-xxl-5 py-2 px-3">
                        <p className="text-gray text-center">{title}</p>
                        <h6 className="text-gray text-center">{data}</h6>
                    </div>
                </div>

            </Link>) : (
                <div className="dashboard-card bg-white custom-shadow d-flex" style={{ height: 120 }}>
                    <div className="d-flex align-items-center justify-content-center mx-3 my-auto">
                        <img src={imgIcon ? imgIcon : "/assets/icons/dashboard-card-img.png"} alt={`dashoard${index}`} style={{ maxWidth: 70, height: 70 }} />
                    </div>
                    <div className="card-body py-xxl-5 py-2 px-3">
                        <p className="text-gray text-center">{title}</p>
                        <h6 className="text-gray text-center">{data}</h6>
                    </div>
                </div>)}
        </div>
    )
}

export default OperationSummeryCard
