import React, { useState } from "react";
import {
  favoriteRemove,
  favoriteMoveToCart,
} from "../../store/actions/customer/favoriteAction";
import { addToCart } from "../../store/actions/customer/cartAction";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Spinner from "react-bootstrap/Spinner";

const FavoriteCard = ({ item, index, read, cartHandle, compareWhId }) => {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const [areatrue, setareatrue] = useState(false);
  const [availabletrue, setavailabletrue] = useState(false);
  const [isActiveLoader, setIsActiveLoader] = useState(null);
  const data = useSelector((state) => state.CARTINFO);

  const { id, category, warehouseId, type, structureType } = item;

  // Rohan Code
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
    item.storageSpaceInfo.floors &&
    item.storageSpaceInfo.floors.find((o) => o.floorType === "basement");
  let basementTrue1 = abasement?.floorDimension?.length !== "";
  let agroundFloor1 =
    item &&
    item.storageSpaceInfo &&
    item.storageSpaceInfo.floors &&
    item.storageSpaceInfo.floors.find((o) => o.floorType === "groundFloor");
  let groundFloorTrue1 = agroundFloor?.floorDimension?.length !== "";
  let afirstFloor1 =
    item &&
    item.storageSpaceInfo &&
    item.storageSpaceInfo.floors &&
    item.storageSpaceInfo.floors.find((o) => o.floorType === "firstFloor");
  let firstFloorTrue1 = afirstFloor?.floorDimension?.length !== "";
  let asecondFloor1 =
    item &&
    item.storageSpaceInfo &&
    item.storageSpaceInfo.floors &&
    item.storageSpaceInfo.floors.find((o) => o.floorType === "secondFloor");
  let secondFloorTrue1 = asecondFloor?.floorDimension?.length !== "";

  const addCart = (cartId) => {
    setIsActiveLoader(cartId);
    dispatch(
      addToCart(
        {
          type: "warehouse",
          warehouse: cartId,
        },
        addToast
      )
    );
    dispatch(favoriteMoveToCart(cartId, addToast));
  };

  return (
    <div className="col-lg-4 col-sm-6">
      <div className="card custom-warehouse-detail my-1">
        {/* <div className="card-bookmark ">
        <button onClick={addToFavorite} className="px-2 pt-0 btn"><i className="fas fa-heart" /></button>
      </div> */}
        <div className={`card ${compareWhId?.includes(id) ? "":"card-overlay"}`}>
          <div className="img-holder card-img">
            <img
              style={{ height: "8rem", objectFit: "cover", width: "100%" }}
              src={
                item.warehouseImagesInfo &&
                item.warehouseImagesInfo.coverImage &&
                item.warehouseImagesInfo.coverImage.url
              }
              alt=""
              className="img-fluid"
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
                  <div className="common-checkbox common-checkbox position-relative">
                    <input
                      onChange={(e) => cartHandle(e)}
                      value={id}
                      checked={compareWhId?.includes(id)}
                      type="checkbox"
                      className="common-checkbox-input common-checkbox-dark-input"
                      id={`selecttocompare${index}`}
                    />
                    <label
                      className="common-checkbox-label  common-checkbox-dark-label mb-2 pl-2 ml-3 text-white cursorPointer"
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
        <div className="card-body py-1">
          <h6 className="font-weight-bold">ID: {warehouseId}</h6>
          <span className="text-gray">
            {" "}
            {item &&
              item.warehouseContactDetailInfo &&
              item.warehouseContactDetailInfo.address.district +
                ", " +
                item.warehouseContactDetailInfo.address.state}
          </span>
          <ul className="p-0 m-0">
            {/* <li className="row py-1">
              <div className="col-6 font-heading">Location:</div>
              <div className="col-6 text-gray">
                {item &&
                  item.warehouseContactDetailInfo &&
                  item.warehouseContactDetailInfo.address.district +
                    ", " +
                    item.warehouseContactDetailInfo.address.state}
              </div>
            </li> */}
            <li className="row py-1">
              <div className="col-6 font-heading">Warehouse Category:</div>
              <div className="col-6 text-gray">
                {category?.categoryName?.slice(0, 15)}
              </div>
            </li>
            <li className="row py-1">
              <div className="col-6 font-heading">Warehouse Type:</div>
              <div className="col-6 text-gray">{type?.type?.slice(0, 15)}</div>
            </li>
            <li className="row py-1">
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
                      style={{ color: "blue" }}
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
                      style={{ color: "blue" }}
                    ></i>
                  </span>
                )}
                ):
              </div>
              <div className="col-6 text-gray">
                {item &&
                  item.storageSpaceInfo &&
                  item.storageSpaceInfo.totalArea}{" "}
                sq.ft.
              </div>
            </li>
            {basementTrue && areatrue ? (
              <li className="row py-1">
                <div className="col-6 font-heading">-Basement</div>
                <div className="col-6 text-gray">
                  {abasement?.floorDimension?.length *
                    abasement?.floorDimension?.breath}{" "}
                  sq.ft.
                </div>
              </li>
            ) : null}
            {groundFloorTrue && areatrue ? (
              <li className="row py-1">
                <div className="col-6 font-heading">-Ground Floor</div>
                <div className="col-6 text-gray">
                  {agroundFloor?.floorDimension?.length *
                    agroundFloor?.floorDimension?.breath}{" "}
                  sq.ft.
                </div>
              </li>
            ) : null}
            {firstFloorTrue && areatrue ? (
              <li className="row py-1">
                <div className="col-6 font-heading">-First Floor</div>
                <div className="col-6 text-gray">
                  {afirstFloor?.floorDimension?.length *
                    afirstFloor?.floorDimension?.breath}{" "}
                  sq.ft.
                </div>
              </li>
            ) : null}

            {secondFloorTrue && areatrue ? (
              <li className="row py-1">
                <div className="col-6 font-heading">-Second Floor</div>
                <div className="col-6 text-gray">
                  {asecondFloor?.floorDimension?.length *
                    asecondFloor?.floorDimension?.breath}{" "}
                  sq.ft.
                </div>
              </li>
            ) : null}

            <li className="row py-1">
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
                      style={{ color: "blue" }}
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
                      style={{ color: "blue" }}
                    ></i>
                  </span>
                )}
                ):
              </div>
              <div className="col-6 text-gray">
                {item &&
                  item.storageSpaceInfo &&
                  item.storageSpaceInfo.totalAvailableSpace}{" "}
                sq.ft.
              </div>
            </li>
            {basementTrue1 && availabletrue ? (
              <li className="row py-1">
                <div className="col-6 font-heading">-Basement</div>
                <div className="col-6 text-gray">
                  {abasement1?.floorDimension?.length *
                    abasement1?.floorDimension?.breath}{" "}
                  sq.ft.
                </div>
              </li>
            ) : null}
            {groundFloorTrue1 && availabletrue ? (
              <li className="row py-1">
                <div className="col-6 font-heading">-Ground Floor</div>
                <div className="col-6 text-gray">
                  {agroundFloor1?.floorDimension?.length *
                    agroundFloor1?.floorDimension?.breath}{" "}
                  sq.ft.
                </div>
              </li>
            ) : null}
            {firstFloorTrue1 && availabletrue ? (
              <li className="row py-1">
                <div className="col-6 font-heading">-First Floor</div>
                <div className="col-6 text-gray">
                  {afirstFloor1?.floorDimension?.length *
                    afirstFloor1?.floorDimension?.breath}{" "}
                  sq.ft.
                </div>
              </li>
            ) : null}

            {secondFloorTrue1 && availabletrue ? (
              <li className="row py-1">
                <div className="col-6 font-heading">-Second Floor</div>
                <div className="col-6 text-gray">
                  {asecondFloor1?.floorDimension?.length *
                    asecondFloor1?.floorDimension?.breath}{" "}
                  sq.ft.
                </div>
              </li>
            ) : null}
            <li className="row py-1">
              <div className="col-6 font-heading">Structure Type:</div>
              <div className="col-6 text-gray">{structureType}</div>
            </li>
            <li className="row py-1">
              <div className="col-6 font-heading">No Of Shifts:</div>
              <div className="col-6 text-gray">
                {item &&
                  item.storageSpaceInfo &&
                  item.storageSpaceInfo.noOfShift}
              </div>
            </li>
          </ul>
        </div>
        {/* <div className="card-footer py-1 bg-deep-primary">
      </div> */}
        <div className={`row py-1 mx-0 ${read ? "d-none" : ""}`}>
          <div className="col-6 p-1 font-heading d-flex justify-content-between">
            {/* <button
            
              className="btn px-0 btn-block btn-outline-secondary py-1"
            >
              Remove
            </button> */}

            <div className="common-checkbox  position-relative">
              <input
                onChange={(e) => cartHandle(e)}
                value={id}
                checked={compareWhId?.includes(id)}
                type="checkbox"
                className="common-checkbox-input common-checkbox-dark-input"
                id={`selecttocompare${index}`}
              />
              <label
                className="common-checkbox-label common-checkbox-dark-label mb-2 pl-2 ml-3 cursorPointer"
                htmlFor={`selecttocompare${index}`}
              >
                Compare
              </label>
            </div>

            <Link to={`/wh-detail/${id}`}>
              <i className="fas fa-eye actionIconView mt-2"></i>
            </Link>

            <i
              onClick={() => dispatch(favoriteRemove(id, addToast))}
              className="fas fa-trash-alt actionIconDelete mt-2"
            ></i>
          </div>

          <div className="col-6 p-1 text-gray">
            <button
              onClick={() => addCart(id)}
              type="button"
              disabled={
                (data.isPending && isActiveLoader === id) ||
                  data.cartIdList?.includes(parseInt(id))
              }
              className="btn px-0 btn-block btn-deep-primary py-1"
            >
              {data.isPending && isActiveLoader === id ? (
                <>
                  {" "}
                  <Spinner animation="border" /> Moving...{" "}
                </>
              ) : (
                "Move To Cart"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;
