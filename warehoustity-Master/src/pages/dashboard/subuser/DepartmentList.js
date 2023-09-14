import React from "react";
import { Link } from "react-router-dom";
import { readableDate } from "../../../components/validation";
import { confirmAlert } from "react-confirm-alert";
import { updateDepartment } from "../../../store/actions/subUserAction";
import { useDispatch } from "react-redux";

const DepartmentList = ({ item, index }) => {

  const account = JSON.parse(localStorage.getItem("userData"));
  const departHead = item?.user_count?.find((itm)=>itm.isDepartmentHead === true)

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
        },
      ],
    });
  };

  return (
    <tr className={`${index % 2 !== 0 ? "firstRow" : "secondRow"}`}>
      <td>{index + 1}</td>
      <td className="text-capitalize " style={{width:100}}>{item?.name}</td>
      <td className="text-capitalize text-nowrap"> {departHead && `${departHead?.firstName + " "+ departHead?.lastName}`}  </td>
      <td className="text-center">{item?.user_count?.length}</td>
      <td className="text-capitalize">
        {account.firstName + " " + account.lastName}
      </td>

      <td className="text-capitalize text-nowrap">{readableDate(item?.createdAt)}</td>
      <td>
        <div className="d-inline-block w-100">
          <select
             onChange={(e)=>statusChange(e.target.value === "true")}
            name="status"
            value={item.isActive}
            className={`form-control form-control-sm  w-100 form-select pl-2 ${item.isActive ? 'text-deep-primary font-weight-bold' : 'text-dark'}`}
            id="exampleFormControlSelect1"
          >
            <option value={true}>Active</option>
            <option value={false}>In Active</option>
          </select>
        </div>
      </td>

      <td>
        <div className="text-center text-nowrap">
          <Link
            to={`/manage-customer-department/${item?.id}`}
            className="btn px-3 toggle-class"
            data-target=".view-users-roles"
            data-toggle-class="d-none"
          >
            <i className="fas fa-eye"></i>
          </Link>

          <Link to={`/update-customer-department/${item?.id}`}>
            <button className="btn px-3 toggle-class">
              <i className="fas fa-pencil-alt"></i>
            </button>
          </Link>
        </div>
      </td>

      {/* <td><div className="text-center"><button className="btn px-3 toggle-class" data-target=".roles-and-permissions" data-toggle-class="d-none">Edit</button></div></td> */}
    </tr>
  );
};

export default DepartmentList;
