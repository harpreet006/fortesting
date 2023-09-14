import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  favoriteAdd,
  favoriteRemove,
} from "../../../store/actions/customer/favoriteAction";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import "./main.css";

const WarehouseList = ({ item, index, cartHandle, compareWhId }) => {
  const data = useSelector((state) => state);
  const dispatch = useDispatch();
  const [areatrue, setareatrue] = useState(false);
  const [availabletrue, setavailabletrue] = useState(false);

  const { addToast } = useToasts();
  const {
    id,
    warehouseId,
    warehouseName,
    category,
    type,
    soldOut,
    structureType,
  } = item;
  let abasement =
    item &&
    item.storageSpaceInfo &&
    item.storageSpaceInfo.floors &&
    item.storageSpaceInfo.floors.find((o) => o.floorType === "basement");

  let basementTrue = abasement?.floorDimension?.length !== "";
  let agroundFloor =
    item &&
    item.storageSpaceInfo &&
    item.storageSpaceInfo.floors &&
    item.storageSpaceInfo.floors.find((o) => o.floorType === "groundFloor");
  let groundFloorTrue = agroundFloor?.floorDimension?.length !== "";
  let afirstFloor =
    item &&
    item.storageSpaceInfo &&
    item.storageSpaceInfo.floors &&
    item.storageSpaceInfo.floors.find((o) => o.floorType === "firstFloor");
  let firstFloorTrue = afirstFloor?.floorDimension?.length !== "";
  let asecondFloor =
    item &&
    item.storageSpaceInfo &&
    item.storageSpaceInfo.floors &&
    item.storageSpaceInfo.floors.find((o) => o.floorType === "secondFloor");
  let secondFloorTrue = asecondFloor?.floorDimension?.length !== "";

  let abasement1 =
    item &&
    item.storageSpaceInfo &&
    item.storageSpaceInfo.availableSpaces &&
    item.storageSpaceInfo.availableSpaces.find(
      (o) => o.availableSpaceType === "basement"
    );
  let basementTrue1 = abasement1?.availableSpaceDimension?.length !== "";
  let agroundFloor1 =
    item &&
    item.storageSpaceInfo &&
    item.storageSpaceInfo.availableSpaces &&
    item.storageSpaceInfo.availableSpaces.find(
      (o) => o.availableSpaceType === "groundFloor"
    );
  let groundFloorTrue1 = agroundFloor1?.availableSpaceDimension?.length !== "";
  let afirstFloor1 =
    item &&
    item.storageSpaceInfo &&
    item.storageSpaceInfo.availableSpaces &&
    item.storageSpaceInfo.availableSpaces.find(
      (o) => o.availableSpaceType === "firstFloor"
    );
  let firstFloorTrue1 = afirstFloor1?.availableSpaceDimension?.length !== "";
  let asecondFloor1 =
    item &&
    item.storageSpaceInfo &&
    item.storageSpaceInfo.availableSpaces &&
    item.storageSpaceInfo.availableSpaces.find(
      (o) => o.availableSpaceType === "secondFloor"
    );
  let secondFloorTrue1 = asecondFloor1?.availableSpaceDimension?.length !== "";

  const addToFavorite = () => {
    if (data.authenticated && data.FAVORITEINFO.favoriteListIds.includes(id)) {
      dispatch(favoriteRemove(id, addToast));
    } else if (data.authenticated) {
      dispatch(favoriteAdd(id, addToast));
    } else {
      addToast("Please Login", { appearance: "error", autoDismiss: true });
    }
  };

  // Favorite compare

  return (
    <div className="col-lg-6 col-sm-6">
      <div className="card custom-warehouse-detail custom-shadow my-3">
        {soldOut && (
          <div
            style={{ left: "0", position: "absolute", top: "0", zIndex: "1" }}
          >
            <button
              onClick={addToFavorite}
              className="px-2 py-1 text-white btn badge-warning m-2"
            >
              Sold Out
            </button>
          </div>
        )}
        <div
          className={`card-bookmark ${
            data.FAVORITEINFO?.favoriteListIds?.includes(id)
              ? "active-book"
              : ""
          }`}
        >
          <button onClick={addToFavorite} className="px-2 pt-0 btn ">
            <i className={`fas fa-heart `}></i>
          </button>
        </div>
        <div className="card card-overlay">
          <div className="img-holder card-img">
            <img
              style={{ height: "200px", objectFit: "cover", width: "338px" }}
              src={
                item.warehouseImagesInfo &&
                item.warehouseImagesInfo.coverImage &&
                item.warehouseImagesInfo.coverImage.url
              }
              alt=""
              className="img-fluid w-100"
            />
          </div>
          <div className="card-img-overlay d-flex align-items-center">
            <div className="card-body p-0">
              <div>
                <div className="d-flex justify-content-center my-3">
                  <Link
                    to={`/wh-detail/${id}`}
                    className="btn btn-light font-weight-bold"
                  >
                    View Detail
                  </Link>
                </div>
                <div className="d-flex justify-content-center">
                  <div className="common-checkbox form-check">
                    <input
                      onChange={(e) => cartHandle(e)}
                      value={id}
                      checked={compareWhId.includes(id)}
                      type="checkbox"
                      className="common-checkbox-input common-checkbox-dark-input"
                      id={`selecttocompare${index}`}
                    />
                    <label
                      className="common-checkbox-label common-checkbox-dark-label mb-2 pl-2 text-white cursorPointer"
                      htmlFor={`selecttocompare${index}`}
                    >
                      Select to compare
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body pb-0">
          <h5 className="card-title">ID: {warehouseId}</h5>
          <span className="text-gray">
            {item &&
              item.warehouseContactDetailInfo &&
              item.warehouseContactDetailInfo?.address?.district +
                ", " +
                item.warehouseContactDetailInfo?.address?.state}
          </span>
          <ul className="pl-0">
            {/* <li className="row">
              <div className="col-6 font-heading">Location:</div>
              <div className="col-12 text-gray">
                {item &&
                  item.warehouseContactDetailInfo &&
                  item.warehouseContactDetailInfo?.address?.district +
                    ", " +
                    item.warehouseContactDetailInfo?.address?.state}
              </div>
            </li> */}
            <li className="row py-2">
              <div className="col-6 font-heading">Name:</div>
              <div className="col-6 text-gray">{warehouseName}</div>
            </li>
            <li className="row py-2">
              <div className="col-6 font-heading">Warehouse Category:</div>
              <div className="col-6 text-gray">{category?.categoryName}</div>
            </li>
            <li className="row py-2">
              <div className="col-6 font-heading">Warehouse Type:</div>
              <div className="col-6 text-gray">{type?.type}</div>
            </li>
            <li className="row py-2">
              <div className="col-6 font-heading">
                Total Area (
                {!areatrue ? (
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setareatrue(true);
                    }}
                  >
                    <i
                      className="fa fa-plus font-weight-bold"
                      aria-hidden="true"
                      style={{color:"blue"}}
                    ></i>
                  </span>
                ) : (
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setareatrue(false);
                    }}
                  >
                    <i
                      className="fa fa-minus font-weight-bold"
                      aria-hidden="true"
                      style={{color:"blue"}}
                    ></i>
                  </span>
                )}
                ):
              </div>
              <div className="col-6 text-gray">
                {item &&
                  item.storageSpaceInfo &&
                  item.storageSpaceInfo.totalArea}{" "}
                Sq.Ft.
              </div>
            </li>
            {basementTrue && areatrue ? (
              <li className="row py-2">
                <div className="col-6 font-heading">-Basement</div>
                <div className="col-6 text-gray">
                  {abasement?.floorDimension?.length *
                    abasement?.floorDimension?.breath}{" "}
                  Sq.Ft.
                </div>
              </li>
            ) : null}
            {groundFloorTrue && areatrue ? (
              <li className="row py-2">
                <div className="col-6 font-heading">-Ground Floor</div>
                <div className="col-6 text-gray">
                  {agroundFloor?.floorDimension?.length *
                    agroundFloor?.floorDimension?.breath}{" "}
                  Sq.Ft.
                </div>
              </li>
            ) : null}
            {firstFloorTrue && areatrue ? (
              <li className="row py-2">
                <div className="col-6 font-heading">-First Floor</div>
                <div className="col-6 text-gray">
                  {afirstFloor?.floorDimension?.length *
                    afirstFloor?.floorDimension?.breath}{" "}
                  Sq.Ft.
                </div>
              </li>
            ) : null}

            {secondFloorTrue && areatrue ? (
              <li className="row py-2">
                <div className="col-6 font-heading">-Second Floor</div>
                <div className="col-6 text-gray">
                  {asecondFloor?.floorDimension?.length *
                    asecondFloor?.floorDimension?.breath}{" "}
                  Sq.Ft.
                </div>
              </li>
            ) : null}

            <li className="row py-2">
              <div className="col-6 font-heading">
                Available Area (
                {!availabletrue ? (
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setavailabletrue(true);
                    }}
                  >
                    <i
                      className="fa fa-plus font-weight-bold"
                      aria-hidden="true"
                      style={{color:"blue"}}
                    ></i>
                  </span>
                ) : (
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setavailabletrue(false);
                    }}
                  >
                    <i
                      className="fa fa-minus font-weight-bold"
                      aria-hidden="true"
                      style={{color:"blue"}}
                    ></i>
                  </span>
                )}
                ):
              </div>
              <div className="col-6 text-gray">
                {item &&
                  item.storageSpaceInfo &&
                  item.storageSpaceInfo.totalAvailableSpace}{" "}
                Sq.Ft.
              </div>
            </li>
            {basementTrue1 && availabletrue ? (
              <li className="row py-2">
                <div className="col-6 font-heading">-Basement</div>
                <div className="col-6 text-gray">
                  {abasement1?.availableSpaceDimension?.length *
                    abasement1?.availableSpaceDimension?.breath}{" "}
                  Sq.Ft.
                </div>
              </li>
            ) : null}
            {groundFloorTrue1 && availabletrue ? (
              <li className="row py-2">
                <div className="col-6 font-heading">-Ground Floor</div>
                <div className="col-6 text-gray">
                  {agroundFloor1?.availableSpaceDimension?.length *
                    agroundFloor1?.availableSpaceDimension?.breath}{" "}
                  Sq.Ft.
                </div>
              </li>
            ) : null}
            {firstFloorTrue1 && availabletrue ? (
              <li className="row py-2">
                <div className="col-6 font-heading">-First Floor</div>
                <div className="col-6 text-gray">
                  {afirstFloor1?.availableSpaceDimension?.length *
                    afirstFloor1?.availableSpaceDimension?.breath}{" "}
                  Sq.Ft.
                </div>
              </li>
            ) : null}

            {secondFloorTrue1 && availabletrue ? (
              <li className="row py-2">
                <div className="col-6 font-heading">-Second Floor</div>
                <div className="col-6 text-gray">
                  {asecondFloor1?.availableSpaceDimension?.length *
                    asecondFloor1?.availableSpaceDimension?.breath}{" "}
                  Sq.Ft.
                </div>
              </li>
            ) : null}
            <li className="row py-2">
              <div className="col-6 font-heading">Structure Type:</div>
              <div className="col-6 text-gray">{structureType}</div>
            </li>
            <li className="row py-2">
              <div className="col-6 font-heading">No Of Shifts:</div>
              <div className="col-6 text-gray">
                {item &&
                  item.storageSpaceInfo &&
                  item.storageSpaceInfo.noOfShift}
              </div>
            </li>
          </ul>
        </div>
        <div className="card-footer py-1 bg-deep-primary"></div>
      </div>
    </div>
  );
};

export default WarehouseList;
