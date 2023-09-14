import React from 'react'

const StaticContent = ({userType}) => {
  return (
    <>
      <div className="row" id="modal-body-left-content">
        <div className="col-lg-12 tab-pane d-block signin-customer">
          {userType === 2 ?
          <div className="row">
            <div className="col-lg-12 col-sm-6 border-bottom-line overlay-content p-3 signin-customer">
              <h5 className="text-white mb-4">Why Choose Us?</h5>
              <ul className="text-white pl-3">
                <li className="mb-3">Boosting of the Revenue!</li>
                <li className="mb-3">Maximum Utilization Of Space!</li>
                <li className="mb-3">Increase Your Space Occupancy Level!</li>
                <li className="mb-3">Increased Visibility Of Your Assets!</li>
                <li className="mb-3">Tech Support & Skill Development!</li>
              </ul>
            </div>
            <div className="col-lg-12 col-sm-6 overlay-content p-3">
              <img src="/assets/images/customerregister.jpg" alt="cr" />
            </div>
          </div>

          :

          <div className="row">
            <div className="col-lg-12 col-sm-6 border-bottom-line overlay-content p-3">
              <img src="/assets/images/vendorregister.jpg" alt="cr" />
            </div>

            <div className="col-lg-12 col-sm-6 overlay-content p-3">
              <h5 className="text-white mb-4">Who can list with
                Warehousity?</h5>
              <ul className="text-white pl-3">
                <li className="mb-3">Boosting of the Revenue!</li>
                <li className="mb-3">Maximum Utilization Of Space!</li>
                <li className="mb-3">Increase Your Space Occupancy Level!</li>
                <li className="mb-3">Increased Visibility Of Your Assets!</li>
                <li className="mb-3">Tech Support & Skill Development!</li>
              </ul>
            </div>
          </div>

          }

        </div>
        {/* <div className="col-lg-12 tab-pane d-none signin-space-provider">
          <div className="row">
            <div className="col-lg-12 col-sm-6 border-bottom-line overlay-content p-3 signin-customer">
              <h5 className="text-white mb-4">Why Choose Us?</h5>
              <ul className="text-white pl-3">
                <li className="mb-3">Boosting of the Revenue!</li>
                <li className="mb-3">Maximum Utilization Of Space!</li>
                <li className="mb-3">Increase Your Space Occupancy Level!</li>
                <li className="mb-3">Increased Visibility Of Your Assets!</li>
                <li className="mb-3">Tech Support & Skill Development!</li>
              </ul>
            </div>
            <div className="col-lg-12 col-sm-6 overlay-content p-3">
              <h5 className="text-white mb-4">Who can list with
                Warehousity?</h5>
              <ul className="text-white pl-3">
                <li className="mb-3">Boosting of the Revenue!</li>
                <li className="mb-3">Maximum Utilization Of Space!</li>
                <li className="mb-3">Increase Your Space Occupancy Level!</li>
                <li className="mb-3">Increased Visibility Of Your Assets!</li>
                <li className="mb-3">Tech Support & Skill Development!</li>
              </ul>
            </div>
          </div>
        </div> */}
      </div>
    </>
  )
}

export default StaticContent
