import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import axiosauth from "../../../api/axios-auth";
import FormSuccess from "../../../components/helper/FormSuccess";
import { fetchWarehouseByPage } from "../../../store/actions/vendor/warehouseList";
import { useDispatch } from "react-redux";

const WarehouseList = ({ data, index, pageCount }) => {
  const { id, vendorStatus, warehouseName, category } = data;

  console.log("warehouse",warehouseName)
  const [modalShow, setModalShow] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const [fetureDate, setFetureData] = useState({
    startDate: "",
    endDate: "",
    commentByCustomer: "",
  });

  const handleChange = (e) => {
    setFetureData({ ...fetureDate, [e.target.name]: e.target.value });
    setError(null);
  };

  const submitFuture = () => {
    if (
      fetureDate.startDate === "" ||
      fetureDate.endDate === "" ||
      fetureDate.commentByCustomer === ""
    ) {
      setError("Field is required");
      return 0;
    }
    let data = {
      warehouse: id,
      startDate: fetureDate.startDate,
      endDate: fetureDate.endDate,
      commentByCustomer: fetureDate.commentByCustomer,
    };

    try {
      axiosauth
        .post(`/api/v1/featuredwarehouse`, data)
        .then((response) => {
          let res = JSON.parse(response.data);
          console.log(res);
          dispatch(fetchWarehouseByPage(parseInt(pageCount)));
          setIsSuccess(true);
          setModalShow(false);
        })
        .catch((error) => {
          console.log("rerr-->", error);
        })
        .then(() => {
          console.log("-----always executes");
        });
    } catch (e) { }
  };

  return (
    <>
      {isSuccess ? (
        <FormSuccess
          onClick={() => setIsSuccess(false)}
          message={`Feture Request Send`}
        />
      ) : null}

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="xm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Request For Feature Warehouse
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="startdate">
                Start Date<span className="errorMsg">*</span>
              </label>
              <input
                type="date"
                onChange={handleChange}
                name="startDate"
                className="form-control"
                id="startdate"
                aria-describedby="emailHelp"
                placeholder="start date"
                required={true}
              />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="enddate">
                End Date<span className="errorMsg">*</span>
              </label>
              <input
                type="date"
                onChange={handleChange}
                name="endDate"
                className="form-control"
                id="enddate"
                placeholder="end date"
                required={true}
              />
            </div>
            <div className="form-group col-12">
              <label htmlFor="commentByCustomer">
                Comment<span className="errorMsg">*</span>
              </label>
              <textarea
                type="textarea"
                onChange={handleChange}
                name="commentByCustomer"
                className="form-control"
                id="commentByCustomer"
                placeholder="Type comment"
                required={true}
              />
            </div>
            <span className="errorMsg">{error ? `* ${error}` : null}</span>
          </div>

          <button
            onClick={submitFuture}
            type="button"
            className="btn btn-primary mt-3"
          >
            Submit
          </button>
        </Modal.Body>
      </Modal>

      <tr>
        <td className="text-capitalize px-2">{warehouseName}</td>
        <td className="text-capitalize px-2">{category?.categoryName}</td>
        <td className="px-2">{vendorStatus}</td>
        <td className="font-weight-bold px-2">
          {data.warehouseId ? data.warehouseId : "-"}
        </td>

        <td className="px-2 text-center">
          {vendorStatus === "Draft" ? (
            <Link
              to={`/vendor/update-warehouse/${id}`}
              className="btn px-0 text-deep-blue font-weight-bold text-uppercase"
            >
              <i className="fa fa-edit"></i>
            </Link>
          ) : (
            <span className="btn disabled px-0 font-weight-bold d-none">
              <i className="fa fa-edit"></i>
            </span>
          )}
        </td>
        <td className="text-center px-2">
          <Link
            to={`/vendor/warehouse-details/${id}`}
            className="btn font-weight-bold px-1"
          >
            <i className="fas fa-eye"></i>
          </Link>
        </td>

        <td className="text-center px-2">
          {vendorStatus === "Live" && (
            <>
              {data?.featuredWarehouse && data?.featuredWarehouse.length > 0 ? (
                <button
                  disabled
                  onClick={() => setModalShow(true)}
                  className="btn px-0 text-deep-blue font-weight-bold text-uppercase"
                >
                  <i className="fas fa-edit text-primary"></i>
                  {/* Feature this warehouse */}
                </button>
              ) : (
                <button
                  onClick={() => setModalShow(true)}
                  className="btn px-0 text-deep-blue font-weight-bold text-uppercase"
                >
                  <i className="fas fa-edit text-primary"></i>
                  {/* Feature this warehouse */}
                </button>
              )}
            </>
          )}
        </td>

        <td className="text-center">
          {vendorStatus === "Live" && (
            <>
              {data?.featuredWarehouse && data?.featuredWarehouse.length > 0
                ? data?.featuredWarehouse[0].adminApproved
                : "-"}
            </>
          )}
        </td>

        {data?.featuredWarehouse && data?.featuredWarehouse.length > 0 ? (
          <td className="text-center">
            <Link
              to={`/vendor/feature/${data?.featuredWarehouse[0].id}`}
              className="btn font-weight-bold px-1"
            >
              <i className="fas fa-eye"></i>
            </Link>
          </td>
        ) : (
          <td className="text-center"></td>
        )}
      </tr>
    </>
  );
};

export default WarehouseList;
