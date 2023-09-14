import React from "react";
import { Link } from "react-router-dom";
import { readableDate } from "../../components/validation";

const NotificationList = ({ notification, index }) => {
  const { id, title, content, created_at } = notification;
  return (
    <tr>
      <td className="text-center py-2">{index}</td>
      <td>{title}</td>
      <td className="text-nowrap ">{content?.slice(0,70)}...</td>
      <td className="text-nowrap">{readableDate(created_at)}</td>
      <td className="text-center">
        <Link className="btn px-2" to={`/vendor/notification/${id}`}>
          <i className="fas fa-eye"></i>
        </Link>
      </td>
    </tr>
  );
};

export default NotificationList;
