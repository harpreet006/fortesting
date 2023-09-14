import React from "react";
import { Link } from "react-router-dom";
import { readableDate } from "../validation";
import axiosauth from "../../api/axios-auth";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch } from "react-redux";

const EnquiryList = ({ enquiry, index, pageCount, enguiryByPage }) => {
  const { id, created_at, customerEnquiry } = enquiry;
  const dispatch = useDispatch();
  const cancelledEnquiry = () => {
    confirmAlert({
      // title: 'Confirm to submit',
      message: "Are you sure to change status.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axiosauth
              .put("/api/v1/enquiry/admin/user/" + customerEnquiry?.id, {
                userType: "customer",
                status: "Cancelled",
                adminMessage: "",
              })
              .then((response) => {
                let res = JSON.parse(response.data);
                if (res.statusCode === 200) {
                  dispatch(enguiryByPage(parseInt(pageCount)));
                }
              })
              .catch((error) => {})
              .then(() => {});
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  function deleteEnquiry() {
    confirmAlert({
      // title: 'Confirm to submit',
      message: "Are you sure to Delete Enquiry",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axiosauth
              .delete(`api/v1/enquiry/customer/${customerEnquiry?.id}`)
              .then((response) => {
                let res = JSON.parse(response.data);
                if (res.statusCode === 200) {
                  dispatch(enguiryByPage(parseInt(pageCount)));
                }
              })
              .catch((error) => {})
              .then(() => {});
          },
        },
        {
          label: "No",
        },
      ],
    });
  }

  function getStatus(status) {
    if (status === "Pending") {
      return "alert-primary";
    } else if (status === "Approved") {
      return "alert-primary";
    } else {
      return "alert-primary text-white";
    }
  }

  return (
    <tr className={`${index % 2 !== 0 ? "firstRow" : "secondRow"}`}>
      <td>{index}</td>
      <td>{enquiry?.customerEnquiry?.ticketId}</td>
      <td>{readableDate(created_at)}</td>
      <td>
        <button
          className={`alert btn-sm py-1 mb-0 text-white  ${getStatus(
            enquiry.customerEnquiry.status
          )}`}
          style={{ width: "150px" }}
        >
          {enquiry.customerEnquiry ? enquiry.customerEnquiry.status : ""}
        </button>
      </td>
      <td>
        <Link to={`/manageenquiry/${id}`}>
          <button className="btn p-0 btn-line-black mb-2">
            <i className="fas fa-eye"></i>
          </button>
        </Link>

        {enquiry.customerEnquiry.status !== "Cancelled" ? (
          <i
            onClick={cancelledEnquiry}
            style={
              enquiry.customerEnquiry.status === "Approved"
                ? { pointerEvents: "none" }
                : {}
            }
            className="fas fa-times actionIconDelete ml-3"
          ></i>
        ) : (
          <i
            onClick={deleteEnquiry}
            className="fas fa-trash-alt actionIconDelete ml-3"
          ></i>
        )}
      </td>
    </tr>
  );
};

export default EnquiryList;
