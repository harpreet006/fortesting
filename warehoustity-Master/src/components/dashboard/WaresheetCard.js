import React from "react";
import { Link } from "react-router-dom";

const WaresheetCard = ({ checkedId, waresheet, index }) => {
  // const [checked, setChecked] = useState(false);
  return (
    <div className="col-xxl-3 col-xl-3 col-md-4 col-sm-6 p-1">
      <div className="card custom-warehouse-detail custom-shadow my-3">
        <Link
          to={{
            pathname:
              process.env.PUBLIC_URL + "/wh-detail/" + waresheet.warehouseId,
          }}
        >
          <div className="card card-overlay">
            <div className="img-holder card-img">
              <img
                src={waresheet.imageUrl}
                alt="warehouse"
                className="img-fluid w-100"
                style={{ height: "10rem" }}
              />
            </div>
          </div>
        </Link>

        <div className="card-body pt-1 pb-0 d-flex align-items-center justify-content-between">
          <Link
            to={{
              pathname:
                process.env.PUBLIC_URL + "/wh-detail/" + waresheet.warehouseId,
            }}
          >
            <div>
              <h6 className="card-title text-capitalize">{waresheet.note}</h6>
            </div>
          </Link>
          {/* <div className="pb-3 pr-3 mb-4 common-checkbox position-relative">
            <input
              className="common-checkbox-input common-checkbox-dark-input"
              type="checkbox"
              id={`inlineCheckbox${index}`}
              value="option1"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
            <label
              className="common-checkbox-label common-checkbox-dark-label"
              htmlFor={`inlineCheckbox${index}`}
            ></label>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default WaresheetCard;
