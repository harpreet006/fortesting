import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { serviceCategoryByPage } from "../../store/actions/serviceAction";

const HeaderDrawer = ({
  setsignUpContentModal,
  signUpContentModal,
  setspaceToggle,
  spaceToggle,
  signInModal,
  setsignInModal,
  setUserType,
}) => {
  const { authenticated, vendorAuthenticated } = useSelector((state) => state);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.SERVICEINFO);

  useEffect(() => {
    dispatch(serviceCategoryByPage());
  }, [dispatch]);
  return (
    <>
      <div className="row mx-0 justify-content-center align-items-center sidebar-links">
        <div className="col-auto mx-auto">
          <ul className="nav ml-auto border-bottom border-white d-flex flex-md-row flex-column text-center justify-content-center">
            <li className="nav-item">
              <Link className="nav-link" data-toggle="offcanvas" to={"/about"}>
                ABOUT US
              </Link>
            </li>
            <li className="nav-item mt-3 ">
              {/* <Link className="nav-link" data-toggle="offcanvas" to="#">
                SERVICES
              </Link> */}
              {/* <ServiceDropdown /> */}

              <div className="">
                <div className="dropdownHover ">
                  <button
                    className="btn dropdown-toggle d-flex px-0 align-items-center dropbtnHover text-white"
                    type="button"
                    id="dropdownMenu1"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    style={{padding:'7px'}}
                  >
                    SERVICES
                  </button>
                  <div
                    className="dropdown-menu menus dropdown-contentHover"
                    aria-labelledby="dropdownMenu1"
                  >
                    {data.categoryList &&
                      data.categoryList.length > 0 &&
                      data.categoryList.map((item, index) => {
                        return (
                          <div key={index} className="">
                            <Link
                              className="dropdown-item"
                              to={`/service/${item.id}`}
                              style={{ fontSize: 14 }}
                            >
                              {item.name}
                            </Link>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <Link className="nav-link" data-toggle="offcanvas" to="/blog">
                BLOG
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                data-toggle="offcanvas"
                to={"/contactUs"}
              >
                CONTACT US
              </Link>
            </li>

            <li className="nav-item"></li>
          </ul>

          {!authenticated && vendorAuthenticated === false ? (
            <ul className="nav d-flex flex-md-row flex-column justify-content-center text-center">
              <li className="nav-item">
                <span
                  onClick={() => setsignInModal(!signInModal)}
                  className="nav-link cursorPointer"
                >
                  LOGIN AS CUSTOMER
                </span>
              </li>

              <li className="nav-item">
                <span
                  onClick={() => setsignInModal(!signInModal)}
                  className="nav-link cursorPointer"
                >
                  LOGIN AS SPACE PROVIDER
                </span>
              </li>

              <li className="nav-item">
                <span
                  onClick={() => {
                    setsignUpContentModal(!signUpContentModal);
                    setspaceToggle(!spaceToggle);
                    setUserType(2);
                  }}
                  className="nav-link cursorPointer"
                >
                  REGISTER
                </span>
              </li>
              <li className="nav-item">
                <span
                  onClick={() => {
                    setsignUpContentModal(!signUpContentModal);
                    setspaceToggle(!spaceToggle);
                    setUserType(3);
                  }}
                  className="nav-link cursorPointer"
                >
                  LIST A WAREHOUSE
                </span>
              </li>
            </ul>
          ) : null}
        </div>
      </div>

      <div className="row mx-0 align-items-center justify-content-md-between justify-content-center px-3 border-top border-white px-4 pt-4">
        <div className="col-md-auto col-auto mx-auto mb-3 text-white">
          Stay Connected With US
        </div>
        <div className="col-md-auto col-auto mx-auto">
          <div className="social-icons bg-socials row align-items-center">
            <div className="col-auto px-1">
              <a
                href="https://www.facebook.com/Warehousity/"
                target="_blank"
                rel="noopener noreferrer"
                className="facebook d-flex align-items-center justify-content-center"
              >
                {/* <Link to="#"  className="facebook d-flex align-items-center justify-content-center"> */}
                <i className="fab fa-facebook-f"></i>
                {/* </Link> */}
              </a>
            </div>
            <div className="col-auto px-1">
              <a
                href="https://twitter.com/warehousity/"
                target="_blank"
                rel="noopener noreferrer"
                className="twitter d-flex align-items-center justify-content-center"
              >
                {/* <Link to=""  className="twitter d-flex align-items-center justify-content-center"> */}
                <i className="fab fa-twitter"></i>
                {/* </Link> */}
              </a>
            </div>
            <div className="col-auto px-1">
              <a
                href="https://www.instagram.com/warehousity/"
                target="_blank"
                rel="noopener noreferrer"
                className="instagram d-flex align-items-center justify-content-center"
              >
                {/* <Link to="#" target="_blank" className="instagram d-flex align-items-center justify-content-center"> */}
                <i className="fab fa-instagram"></i>
                {/* </Link> */}
              </a>
            </div>
            <div className="col-auto px-1">
              <a
                href="https://www.linkedin.com/company/warehousity/"
                target="_blank"
                rel="noopener noreferrer"
                className="twitter d-flex align-items-center justify-content-center"
              >
                {/* <Link to="#"  className="linkedin d-flex align-items-center justify-content-center"> */}
                <i className="fab fa-linkedin"></i>
                {/* </Link> */}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderDrawer;
