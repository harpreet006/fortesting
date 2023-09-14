import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import {
  serviceNewById,
  addFavorite,
  serviceFavoriteArray,
  removeFavorite,
} from "../../store/actions/serviceAction";
import Modal from "react-bootstrap/Modal";
import { customerBookingAuth } from "../../store/actions/customer/bookingAction";

const ServiceDetails = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.SERVICEINFO);
  const bookingData = useSelector((state) => state.BOOKINGINFO);
  const { addToast } = useToasts();
  const { serviceId } = useParams();
  const [modalShow, setModalShow] = useState(false);
  const [warehouseId, setWarehouseId] = useState(null);
  const [isWarehouse, setIsWarehouse] = useState(true);

  const addService = () => {
    // const token = localStorage.getItem("accesstoken");
    
    const customerService = localStorage.getItem("customerService");
    console.log("customerservice",customerService)
    // if (token && token !== null) {
    if (customerService && customerService === "20") {
      if (bookingData.bookingList && bookingData.bookingList.length > 0) {
        setModalShow(true);
      } else {
        history.push(
          `/create-rfq?warehouseId=${warehouseId}&serviceId=${serviceId}`
        );
      }
    }

    
    else {
      addToast("Please Login as Customer first", { appearance: "error", autoDismiss: true });
    }
  };

  const proccedToRfq = () => {
    if (isWarehouse) {
      history.push(
        `/create-rfq?warehouseId=${warehouseId}&serviceId=${serviceId}`
      );
    } else {
      history.push(`/create-rfq?warehouseId=${null}&serviceId=${serviceId}`);
    }
  };

  useEffect(() => {
    dispatch(serviceFavoriteArray());
    dispatch(serviceNewById(serviceId));
  }, [dispatch, serviceId]);

  useEffect(() => {
    dispatch(customerBookingAuth(1));
  }, [dispatch]);

  const addToFavorite = (id) => {
    let ser = {
      service: id,
    };
    if (!data?.serviceArray?.includes(parseInt(serviceId))) {
      dispatch(addFavorite(ser, addToast));
    } else {
      dispatch(removeFavorite(id, addToast));
    }
  };

  return (
    <Layout>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            className="font-weight-bold h5"
            id="contained-modal-title-vcenter"
          >
            Select Warehouse
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "100px" }}>
          <div className="form-check form-check-inline my-2">
            <input
              onChange={() => setIsWarehouse(true)}
              checked={isWarehouse === true}
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
            />
            <label className="form-check-label" htmlFor="inlineRadio1">
              Warehouse
            </label>
          </div>
          <div className="form-check form-check-inline my-2">
            <input
              onChange={() => setIsWarehouse(false)}
              checked={isWarehouse === false}
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
            />
            <label className="form-check-label" htmlFor="inlineRadio2">
              No Warehouse
            </label>
          </div>

          {isWarehouse && (
            <select
              onChange={(e) => setWarehouseId(parseInt(e.target.value))}
              className="form-select"
              aria-label="Default select example"
            >
              {bookingData.bookingList && bookingData.bookingList.length > 0 ? (
                <>
                  {bookingData.bookingList.map((item, index) => {
                    return (
                      <option value={item.warehouse.id} key={index}>
                        {item.warehouse.warehouseName}
                      </option>
                    );
                  })}
                </>
              ) : null}
            </select>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button onClick={proccedToRfq} className="btn btn-primary p-2">
            Procced
          </button>
        </Modal.Footer>
      </Modal>

      <div className="container">
        <div className="row align-items-center justify-content-end mt-5">
          {/* <div className="col-auto py-3 mt-5"> */}
          {/* <nav aria-label="breadcrumb">
              <ol className="breadcrumb common-breadcrumb mb-0 text-dark">
                <li className="breadcrumb-item">
                  <Link to={"/"}>Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Service ID : {data.serviceDetail?.id}
                </li>
              </ol>
            </nav> */}
          {/* </div> */}
        </div>
      </div>

      <section className="about-deatail  py-3 mt-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-9">
              <div className="section-heading">
                <h4 className="product-name">
                  <span className="font-weight-bold">Name:</span>{" "}
                  {data.serviceDetail?.name}
                </h4>
              </div>
            </div>
            <div className="col-md-3">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb common-breadcrumb mb-0 text-dark bg-transparent">
                  <li className="breadcrumb-item">
                    <Link to={"/"}>Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Service ID : {data.serviceDetail?.id}
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          {/* <WarehouseImage /> */}
          <div className="row  mx-0">
            <div className="col-md-5 bg-light-green">
              <div className="product-item-view py-3" id="product-item-view">
                <div>
                  {/* <div className="d-flex justify-content-end">
                  <button  type="button" className="btn p-0" data-toggle="modal" data-target="#product-item-show-modal">
                    <img src="/assets/images/icons/icon-full.png" alt="cover" />
                  </button>
                </div> */}
                  {data.serviceDetail?.images &&
                  data.serviceDetail?.images.length > 0 ? (
                    <div className="img-holer product-item-images">
                      <img
                        src={data.serviceDetail?.images[0].imageURL}
                        alt="cover"
                        className="img-fluid w-100"
                      />
                    </div>
                  ) : (
                    <div className="img-holer product-item-images">
                      <img
                        src={`/assets/images/imageNotFound1.png`}
                        alt="cover"
                        className="img-fluid w-100"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-7 bg-light-green py-3">
              <p className=" mb-0">
                <span
                  className="text-dark"
                  style={{ fontSize: 18 }}
                >
                  Name :
                </span>
                {data.serviceDetail?.name}
              </p>

             

                          <p className=" mb-0">
                <span
                  className="text-dark"
                  style={{ fontSize: 18 }}
                >
                  Category :
                </span>
                {data.serviceDetail?.category?.name}
              </p>

              

              <p className="mb-0">
                <span
                  className="text-dark"
                  style={{ fontSize: 18 }}
                >
                  Sub Category :
                </span>
                {data.serviceDetail?.subcategory?.name}
              </p>
              <p className="mb-0">
                <span
                  className="text-dark"
                  style={{ fontSize: 18 }}
                >
                  Description :
                </span>
                {data.serviceDetail?.description}
              </p>

              <p className="mb-0">
                <span
                  className="font-weight-bold text-dark"
                  style={{ fontSize: 18 }}
                >
                  Features :
                </span>
                
              </p>

              {data &&
                data?.serviceDetail?.serviceFeature &&
                data?.serviceDetail?.serviceFeature.length > 0 &&
                data?.serviceDetail?.serviceFeature.map((feature, index) => {
                  return (
                    <p key={index} className="mb-0">
                      {index + 1} - {feature.name}
                    </p>
                  );
                })}
            </div>
          </div>
        </div>
      </section>

      <section className="book-warehouse pt-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-12 mb-4">
              <div className="form-group col-lg-12 pl-4">
                <div className="common-checkbox common-checkbox-dark position-relative d-inline-block">
                  <input
                    name="favorite"
                    className="common-checkbox-input common-checkbox-dark-input"
                    type="checkbox"
                    onChange={(e) => addToFavorite(parseInt(serviceId))}
                    checked={data?.serviceArray?.includes(parseInt(serviceId))}
                    id="favorite"
                  />
                  <label
                    className="common-checkbox-label common-checkbox-dark-label mr-3 pl-4"
                    htmlFor="favorite"
                  >
                    Add to favourite
                  </label>
                </div>
              </div>
            </div>
            <div className="col-auto ml-auto">
              <button
                onClick={addService}
                // disabled={data.CARTINFO.isPending}
                type="button"
                className="btn btn-block btn-outline-deep-primary my-1 px-5"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServiceDetails;
