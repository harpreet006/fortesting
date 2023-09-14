import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { updateWhsUser } from "../../../store/actions/subUserAction";
import { useDispatch } from "react-redux";

const SubUserList = ({ index, item }) => {
  const [isActive, setIsActive] = useState(null);
  const dispatch = useDispatch();

  // Status Change confirmation
  const statusChange = (isActive) => {
    let obj;
    if (!isActive) {
      obj = {
        active: isActive,
        isDepartmentHead: false,
      };
    } else {
      obj = {
        active: isActive,
      };
    }
    confirmAlert({
      // title: 'Confirm to submit',
      message: "Are you sure to change status.",
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(updateWhsUser(item.id, obj)),
        },
        {
          label: "No",
          onClick: () => setIsActive(!isActive),
        },
      ],
    });
  };

  const haldleChange = (e) => {
    setIsActive(e.target.value === "true");
    statusChange(e.target.value === "true");
  };

  useEffect(() => {
    setIsActive(item.active);
  }, [item.active]);

  return (
    <tr className={`${index % 2 !== 0 ? "firstRow" : "secondRow"}`}>
      <td>{index}</td>

      <td className="text-nowrap text-capitalize">
        {item?.firstName + " " + item?.lastName}
      </td>
      <td className="text-nowrap text-capitalize">{item?.employeeId}</td>
      {/* <td>15/12/2020</td> */}

      <td>{item?.phone}</td>
      <td>{item?.email}</td>
      <td className="text-nowrap">{item?.accountRole?.name}</td>
      <td className="text-nowrap">{item?.department?.name}</td>
      <td>
        <div className="d-inline-block w-90px">
          <select
            onChange={haldleChange}
            name="status"
            value={isActive ? isActive : false}
            className="form-control form-control-sm"
            id="exampleFormControlSelect4"
          >
            <option value={true}>Active</option>
            <option value={false}>In Active</option>
          </select>
        </div>
      </td>
      {/* <td><div className="text-center"><button className="btn px-2 toggle-class" data-target=".view-users-log" data-toggle-class="d-none"><i className="fas fa-eye"></i></button>  </div></td> */}
      <td>
        <div className="text-center text-nowrap">
          <Link
            to={`/managesubusers/${item?.id}`}
            className="btn px-2 toggle-class"
          >
            <i className="fas fa-eye"></i>
          </Link>
          <Link
            to={`/edit-sub-user/${item?.id}?activeUser=${
              item.active ? "true" : "false"
            }`}
            className="btn px-3 toggle-class"
            data-target=".edit-users-details"
            data-toggle-class="d-none"
          >
            <i className="fas fa-pencil-alt"></i>
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default SubUserList;
