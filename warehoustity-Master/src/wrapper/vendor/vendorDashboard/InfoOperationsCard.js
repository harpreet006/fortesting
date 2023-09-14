import React from 'react'
import { Link } from 'react-router-dom'

const InfoOperationsCard = ({ renderData, index }) => {
    const { key, imageUrl, url, data } = renderData;

    function getCount() {
        if (Array.isArray(data)) {
            return data.length
        }
        return data
    }

    return (
        <div className="col-xxl-3 col-xl-4 col-md-6 mb-4">
            {false ? (<Link to={url + `?search=${key}`}>
                <div className="dashboard-card bg-white custom-shadow d-flex">
                    <div className="d-flex align-items-center justify-content-center mx-4 my-auto">
                        <img src={imageUrl ? imageUrl: "/assets/icons/dashboard-card-img.png"} alt={`dashoard${index}`} />
                    </div>
                    <div className="card-body py-xxl-5 py-3 px-4">
                        <p className="text-gray text-center">{key}</p>
                        <h6 className="text-gray text-center">{getCount()}</h6>
                    </div>
                </div>

            </Link>) : (
                <>
                    <div className="dashboard-card bg-white custom-shadow d-flex">
                        <div className="size-50px d-flex align-items-center justify-content-center mx-4 my-auto">
                            <img src={imageUrl ? imageUrl : "/assets/icons/dashboard-card-img.png"} alt={`dashoard${index}`} />
                        </div>
                        <div className="card-body py-xxl-5 py-3 px-4">
                            <p className="text-gray text-center">{key}</p>
                            <h6 className="text-gray text-center">{getCount()}</h6>
                        </div>
                    </div>
                </>
            )}

        </div>
    )
}

export default InfoOperationsCard
