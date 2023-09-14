import React from "react";
import { Link } from "react-router-dom";
import { readableDate } from "../../../components/validation";
import { confirmAlert } from "react-confirm-alert";
import { updateRole } from "../../../store/actions/subUserAction";
import { useDispatch } from "react-redux";

const RoleList = ({ item, index }) => {

  const dispatch = useDispatch();
  // Status Change confirmation
  const statusChange = (isActive) => {
    confirmAlert({
      // title: 'Confirm to submit',
      message: "Are you sure to change status.",
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(updateRole(item.id, { isActive: isActive })),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const account = JSON.parse(localStorage.getItem("userData"));
  return (
    <tr className={`${index % 2 !== 0 ? "firstRow" : "secondRow"}`}>
      <td>{index + 1}</td>
      <td>{item?.name}</td>
      <td>{account.firstName+" "+ account.lastName}</td>
      <td>{readableDate(item?.createdAt)}</td>
      <td>
        <div className="d-inline-block w-100">
          <select
            onChange={(e)=>statusChange(e.target.value === "true")}
            name="status"
            value={item.isActive}
            className={`form-control form-control-sm  w-100 form-select pl-2 ${item.isActive ? 'text-deep-primary font-weight-bold' : 'text-dark'}`}
            id="exampleFormControlSelect1"
          >
            <option value={true} className="text-deep-primary">Active</option>
            <option value={false}>In Active</option>
          </select>
        </div>
      </td>

      <td>
        <div className="text-center text-nowrap">
          <Link
            to={`/role-customer-detail/${item?.id}`}
            className="btn px-3 toggle-class"
            data-target=".view-users-roles"
            data-toggle-class="d-none"
          >
            <i className="fas fa-eye"></i>
          </Link>

          <Link to={`/update-user-role/${item?.id}`}>
            <button className="btn px-3 toggle-class">
              <i className="fas fa-pencil-alt"></i>
            </button>
          </Link>
        </div>
      </td>

      <td>
        <div className="text-center">
          <Link
            to={`/customer-permission/${item?.id}`}
            className="btn px-3 toggle-class"
            data-target=".roles-and-permissions"
            data-toggle-class="d-none"
          >
            Edit
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default RoleList;
