import React from "react";
import { Link } from "react-router-dom";
import { readableDate } from "../validation";

const NotificationList = ({ notification, index }) => {
  const { id, title, content, created_at } = notification;
  return (
    <tr className={`${index % 2 !== 0 ? "firstRow" : "secondRow"}`}>
      <td>{index}</td>
      <td>{title}</td>
      <td>{content}</td>
      <td>{readableDate(created_at)}</td>
      <td>
        <Link to={`/notification/${id}`}>
          <button className="btn px-3">
            <i className="fas fa-eye"></i>
          </button>
        </Link>
      </td>
    </tr>
  );
};

export default NotificationList;
