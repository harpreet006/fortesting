import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import {readableDate} from '../../components/validation';
import { confirmAlert } from "react-confirm-alert";
import { updateWhsUser } from "../../store/actions/subUserAction";
import { useDispatch } from "react-redux";

const SubUserList = ({ index, item, read }) => {
  const [isActive, setIsActive] = useState(null);
  const dispatch = useDispatch();

  // Status Change confirmation
  const statusChange = (isActive) => {
    confirmAlert({
      // title: 'Confirm to submit',
      message: "Are you sure to change status.",
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(updateWhsUser(item.id, { active: isActive })),
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
    <tr>
      <td className="text-center">{index}</td>
      <td>{item?.firstName + " " + item?.lastName}</td>
      <td>{item?.accountRole?.name}</td>
      <td>{item?.phone}</td>
      <td>{item?.email}</td>
      <td>{item?.department?.name}</td>
      <td>
        <select
          disabled={read}
          onChange={haldleChange}
          name="status"
          value={isActive}
          className="form-control form-control-sm custom-select bg-white common-select-deep-blue border w-150px"
        >
          <option value={true}>Active</option>
          <option value={false}>Inactive</option>
        </select>
      </td>
      <td className="text-center text-nowrape d-flex">
        <Link to={`/vendor/viewuserdetail/${item.id}`} className="btn px-2">
          <i className="fas fa-eye"></i>
        </Link>
        <Link
          to={`/vendor/edituserdetail/${item.id}`}
          className={`btn px-2 btn-link font-weight-bold ${
            !read ? "" : "d-none"
          }`}
        >
          <i className="fa fa-edit"></i>
        </Link>
      </td>
    </tr>
  );
};

export default SubUserList;
