import React from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios-auth";
import { allWaresheetLoader } from "../../store/actions/customer/waresheetAction";
import { confirmAlert } from "react-confirm-alert";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const WaresheetListCard = ({ item, pageCount, dispatch }) => {
  const { id, waresheetName, description, waresheetImages } = item;

  function deleteWaresheet() {
    confirmAlert({
      // title: 'Confirm to submit',
      message: "Are you sure to want to delete.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .delete(`/api/v1/waresheet/${id}`)
              .then((Response) => {
                let res = JSON.parse(Response.data);
                console.log("res->", res);
                dispatch(allWaresheetLoader(parseInt(pageCount), 8));
              })
              .catch((error) => {
                console.log(error);
              });
          },
        },
        {
          label: "No",
          onClick: console.log("click"),
        },
      ],
    });
  }

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {description}
    </Tooltip>  
  );

  return (
    <div className="col-xxl-3 col-xl-3 col-md-4 col-sm-6 p-1">
      <Link
        className="card custom-warehouse-detail custom-shadow my-1"
        to={`/waresheet/${id}`}
      >
        <div className="card card-overlay">
          <div className="img-holder card-img textOnImage">
            <img
              src={
                waresheetImages?.length > 0
                  ? waresheetImages[0].imageUrl
                  : "/assets/images/warehouse/warehouse-details1.png"
              }
              // src={"/assets/images/warehouse/warehouse-details1.png"}
              alt="warehouse"
              className="img-fluid w-100"
              style={{ height: "10rem" }}
            />
            <div className="centered">{waresheetImages?.length}</div>
          </div>
        </div>
      </Link>
      <div className="card-body py-0">
        <div className="d-flex justify-content-between">
          <h6 className="card-title text-capitalize">
            {waresheetName.slice(0, 15)}
          </h6>
          <Link to={`/update-waresheet/${id}`}>
            <i className="fa fa-edit"></i>
          </Link>
        </div>
        <div className="d-flex justify-content-between">
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <h6 className="card-title text-capitalize">
              {description.slice(0, 15)}
            </h6>
          </OverlayTrigger>
          <i
            onClick={() => deleteWaresheet()}
            className="fas fa-trash-alt text-danger cursorPointer d-nonde"
          ></i>
        </div>
      </div>
      {/* <i className="fa fa-edit"></i> */}
    </div>
  );
};

export default WaresheetListCard;
