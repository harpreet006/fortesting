import React from "react";
import { Link } from "react-router-dom";
import { readableDate } from "../../../components/validation";
import axios from "../../../api/axios-auth";
import { useDispatch } from "react-redux";
import { rfqCustomerAuthNoLoader } from "../../../store/actions/customer/rfqAction";
import { confirmAlert } from "react-confirm-alert";

const RFQManageList = ({ item, index, pageCount }) => {
  const dispatch = useDispatch();
  const rfqDelete = (id) => {
    confirmAlert({
      // title: 'Confirm to submit',
      message: "Are you sure to delete this RFQ.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .delete(`/api/v1/customerrfq/${id}`)
              .then((response) => {
                let res = JSON.parse(response.data);
                console.log(res);
                dispatch(rfqCustomerAuthNoLoader(parseInt(pageCount)));
              })
              .catch((error) => {})
              .then(() => {
                console.log("-----always executes");
              });
          },
        },
        {
          label: "No",
          onClick: () => console.log("No"),
        },
      ],
    });
  };

  return (
    <tr className={`${index % 2 !== 0 ? "firstRow" : "secondRow"}`}>
      <td>{index}.</td>
      <td>{item.id}</td>
      <td>{readableDate(item.created_at)}</td>
      <td>
        <Link to={`/managerfq-open/${item.id}`} className="btn btn-block">
          <i className="fas fa-file-alt"></i>
        </Link>
      </td>
      <td>
        <Link to={`/managerfq-wh/${item.id}`} className="btn btn-block">
          <i className="fas fa-file-alt"></i>
        </Link>
      </td>

      <td className="d-flex">
        <button className="btn btn-block px-1">
          <i
            onClick={() => rfqDelete(item.id)}
            className="fas fa-trash-alt font-weight-bold"
          ></i>
        </button>

          
        <Link
          to={`/createnewrfq?rfqid=${item.id}&hide=false`}
          className="btns btn-block px-1"
        >
          <i className="fa fa-edit font-weight-bold text-black"></i>

        </Link>
      </td>
    </tr>
  );
};

export default RFQManageList;
