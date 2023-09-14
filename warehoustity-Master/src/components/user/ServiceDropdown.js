import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { serviceCategoryByPage } from "../../store/actions/serviceAction";
import { useSelector, useDispatch } from "react-redux";

const ServiceDropdown = ({ service }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.SERVICEINFO);

  useEffect(() => {
    dispatch(serviceCategoryByPage());
  }, [dispatch]);
  return (
    <div className="mr-4">
      <div className="dropdownHover ">
        <button
          className={`btn dropdown-toggle d-flex px-0 align-items-center dropbtnHover ${
            service == "/service/1" ||
            service == "/service/2" ?
            "active" 
            : ""
          }`}
          type="button"
          id="dropdownMenu1"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Services
        </button>
        {data.categoryList?.length > 0 ? (
          <>
            <div
              className="dropdown-menu menus dropdown-contentHover"
              aria-labelledby="dropdownMenu1"
            >
              {data.categoryList &&
                data.categoryList?.length > 0 &&
                data.categoryList.map((item, index) => {
                  return (
                    <div key={index} className="">
                      <Link
                        className="dropdown-item "
                        to={`/service/${item.id}`}
                        style={{ fontSize: 14 }}
                      >
                        {/* <i className="fas fa-home"></i>  */}
                        {item.name}
                      </Link>
                    </div>
                  );
                })}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ServiceDropdown;
