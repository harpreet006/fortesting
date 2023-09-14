import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { readableDate } from "../../components/validation";
import { confirmAlert } from "react-confirm-alert";
import { updateDepartment } from "../../store/actions/subUserAction";
import { useDispatch } from "react-redux";

const UserDepartmentList = ({ item, index, read }) => {
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
          onClick: () =>
            dispatch(updateDepartment(item.id, { isActive: isActive })),
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
    setIsActive(item.isActive);
  }, [item.isActive]);

  return (
    <tr>
      <td className="text-center">{index}
      </td>
      <td>{readableDate(item?.createdAt)}
      </td>
      <td>{item?.name}
      </td>
      <td>
        <select
          disabled={read}
          onChange={haldleChange}
          name="status"
          value={isActive}
          className="form-control form-control-sm custom-select bg-white common-select-deep-blue borde w-150px"
        >
          <option value={true}>Active</option>
          <option value={false}>Inactive</option>
        </select>
      </td>
      <td>
        <Link
          to={`/vendor/department/${item?.id}`}
          className="btn px-3 text-dark"
        >
          <i className="fas fa-eye"></i>
        </Link>
      </td>
    </tr>
  );
};

export default UserDepartmentList;
