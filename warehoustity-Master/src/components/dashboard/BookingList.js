import React from "react";
import { Link } from "react-router-dom";
import { readableDate } from "../validation";

const BookingList = ({ booking, index }) => {
  const { id, created_at, adminStatus, vendorStatus } = booking;

  return (
    <tr className={`${index % 2 !== 0 ? "firstRow" : "secondRow"}`}>
      <td>
        <Link to={`/wh-detail/${booking?.warehouse?.id}`}>
          <img
            className="size-60px img-fluid rounded"
            src={booking?.warehouse?.warehouseImagesInfo?.coverImage.url}
            alt="warehouse"
          />
        </Link> 
      </td>
      <td className="text-nowrap">{readableDate(created_at)}</td>
      <td className="text-center">{booking?.warehouse?.warehouseId}</td>
      <td className="text-nowrap">{booking?.warehouse?.category?.categoryName}</td>
      <td className="text-nowrap">{booking?.warehouse?.type?.type}</td>
      <td>
        <Link to={`/bookings/${id}`}>
          <button className="btn p-0 btn-line-deep-primary mb-0 toggle-class">
            View Details
          </button>
        </Link>
      </td>
      <td>
        {adminStatus === "CONFIRMED" && vendorStatus === "CONFIRMED" ? (
          <button className="alert btn-sm mb-0 py-1 alert-primary text-white">CONFIRMED</button>
        ) : null}

        {(adminStatus === "PENDING" && vendorStatus === "PENDING") ||
        (adminStatus === "PENDING" && vendorStatus === "CONFIRMED") ||
        (adminStatus === "CONFIRMED" && vendorStatus === "PENDING") ? (
          <button className="alert btn-sm mb-0 py-1 alert-warning">PENDING</button>
        ) : null}
        

        {(adminStatus === "CANCELLED" && vendorStatus === "CANCELLED") ||
        (adminStatus === "CONFIRMED" && vendorStatus === "CANCELLED") ||
        (adminStatus === "CANCELLED" && vendorStatus === "CONFIRMED") ? (
          <button className="alert btn-sm py-1 mb-0 alert-danger">CANCELLED</button>
        ) : null}
      </td>

      <td>
        {adminStatus === "CONFIRMED" && vendorStatus === "CONFIRMED" ? (
          <Link to={`/review/${booking?.warehouse?.id}`}>
            <button className="btn p-0 btn-line-deep-primary mb-0 toggle-class">
              Review
            </button>
          </Link>
        ) : null}
      </td>
    </tr>
  );
};

export default BookingList;
