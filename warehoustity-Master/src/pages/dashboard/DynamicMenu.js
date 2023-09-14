import React, { Fragment } from "react";
// import loadjs from 'loadjs';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onlyRead } from "../../store/actions/sidemenuAction";

const DynamicMenu = () => {
  const dispatch = useDispatch();
  const sidemenuData = useSelector((state) => state.SIDEMENU_INFO);

  const callRead = (isRead, isWrite) => {
    if (isRead === true && isWrite === false) {
      dispatch(onlyRead(true));
    } else {
      dispatch(onlyRead(false));
    }
  };

  return (
    <div className="bg-lighter-primary py-3 sidebar-dashboard">
      <div className="menus mx-3">
        <div
          className="nav flex-column nav-pills bg-white py-3"
          id="sidebar-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          {/* <Link className={`nav-link ${window.location.pathname === "/dashboard" ? 'active': ''}`} to={"/dashboard"}><i className="fas fa-desktop"></i> Dashboard</Link> */}

          {sidemenuData?.sidemenu && sidemenuData?.sidemenu.length > 0
            ? sidemenuData?.sidemenu
                .filter(
                  (name) => name.canRead === true || name.canWrite === true
                )
                .map((items, index) => {
                  return (
                    <Fragment key={index}>
                      {items.link !== "" ? (
                        <Link
                          onClick={() =>
                            callRead(items.canRead, items.canWrite)
                          }
                          to={items.link}
                          className={`nav-link`}
                        >
                          <i className="fas fa-desktop"></i>
                          {items.name}
                        </Link>
                      ) : (
                        <>
                          {items.canRead === true && items.canWrite === true ? (
                            <>
                              <a
                                className={`nav-link nav-drop`}
                                data-toggle="collapse"
                                href={`#my-waresheet${index}`}
                                role="button"
                                aria-expanded="false"
                                aria-controls={`my-waresheet`}
                              >
                                <i className="fas fa-user-friends"></i>{" "}
                                {items.name}
                              </a>

                              {items.items && items.items.length > 0
                                ? items.items
                                    .filter(
                                      (name) =>
                                        name.canRead === true ||
                                        name.canWrite === true
                                    )
                                    .map((sub, i) => {
                                      return (
                                        <div
                                          key={i}
                                          className={`collapse`}
                                          id={`my-waresheet${index}`}
                                        >
                                          <div className="nav flex-column nav-pills">
                                            <Link
                                              onClick={() =>
                                                callRead(
                                                  sub.canRead,
                                                  sub.canWrite
                                                )
                                              }
                                              to={sub.link}
                                              className={`nav-link py-2`}
                                            >
                                              {" "}
                                              {sub.name}
                                            </Link>
                                          </div>
                                        </div>
                                      );
                                    })
                                : null}
                            </>
                          ) : null}
                        </>
                      )}
                    </Fragment>
                  );
                })
            : null}
        </div>
      </div>
    </div>
  );
};

export default DynamicMenu;
