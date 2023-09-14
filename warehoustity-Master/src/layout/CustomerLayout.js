import React, { useEffect } from "react";
import Menu from "../pages/dashboard/menu";
import DynamicMenu from "../pages/dashboard/DynamicMenu";
import { useSelector, useDispatch } from "react-redux";
import { sidemenuList } from "../store/actions/sidemenuAction";
import { Link } from "react-router-dom";

const CustomerLayout = (props) => {
  const dispatch = useDispatch();
  const sidemenuData = useSelector((state) => state.SIDEMENU_INFO);

  useEffect(() => {
    dispatch(sidemenuList(2));
  }, [dispatch]);

  return (
    <div className="container-fluid customer-layout-top pl-0">
      <div className="row">
        <button
          className="btn btn-deep-primary p-0 size-40px d-lg-none toggle-className btn-sidebar align-items-center justify-content-center"
          type="button"
          data-target=".sidebar"
          data-toggle-classname="open"
          data-this-toggle-classname="open"
        >
          <span></span>
        </button>

        <div className="col-xl-3 col-lg-4 pl-0">
          <nav aria-label="breadcrumb" className=" pl-2 d-none">
            <ol className="breadcrumb  bg-white common-breadcrumb text-dark py-1  mb-0">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li
                className={
                  props.subtitle ? "breadcrumb-item" : "breadcrumb-item active"
                }
                aria-current="page"
              >
                {props.title}
              </li>
              {props.subtitle ? (
                <li className="breadcrumb-item active" aria-current="page">
                  {props.subtitle}
                </li>
              ) : null}
            </ol>
          </nav>

          {sidemenuData?.sidemenu !== null ? <DynamicMenu /> : <Menu />}
        </div>

        <div className="col-xl-9 col-lg-8">
          
          {props.children}
          </div>
      </div>
    </div>
  );
};

export default CustomerLayout;
