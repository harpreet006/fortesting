import React, { useState } from "react";
import "./sidebar.scss";
// import{ageGroup,sortpagination,loadProductbycategory} from '../../actions/product'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { warehouseByfilter } from "../../store/actions/warehouseAction";

const ShopColor = ({ colors, type, tagUpdate }) => {
  // eslint-disable-next-line
  const [varinatsArray1, setVariantsArray1] = useState([]);
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const history = useHistory();
  const pageCount = new URLSearchParams(window.location.search).get("page");
  const [active, setactive] = useState(false);
  const { PAGINATION } = useSelector((state) => state);
  const setActiveSort = (e, like) => {
    if (like === false) {
      e.currentTarget.classList.add("active");
    } else {
      e.currentTarget.classList.remove("active");
    }
  };
  return (
    <div className="sidebar-widget mt-50">
      <div
        // style={{ cursor: "pointer" }}
        onClick={() => {
          setactive(!active);
        }}
        className="my-3"
      >
        <h6 className="font-heading mb-0 py-2 pb-3 mt-2">{type} </h6>
        {active ? (
          <span style={{ float: "right" }}>
            {" "}
            {/* <img src="/assets/images/arrup.png" alt=""></img> */}
          </span>
        ) : (
          <span style={{ float: "right" }}>
            {" "}
            {/* <img src="/assets/images/arrdown.png" alt=""></img> */}
          </span>
        )}
      </div>

      <div
        style={{ marginLeft: "-30px", display: active ? "" : active }}
        className="sidebar-widget-list mt-20"
      >
        {colors ? (
          <ul>
            {colors.map((color, key) => {
              return (
                <li style={{ listStyle: "none", marginTop: 5 }} key={key}>
                  <div class="form-check mb-0">
                    <input
                      onClick={(e) => {
                        let like = true;
                        let i = -1;
                        console.log("zzzzzzzz",varinatsArray1.length)
                        for (var j = 0; j < varinatsArray1.length; j++) {
                          console.log("aaaaaa",color.filterOption)
                          console.log("dddddddddd",varinatsArray1[j])
                          if (varinatsArray1[j] === color.filterOption) {
                            i = j;
                          }
                        }
                        console.log("ffffffff",i)

                        tagUpdate(color.filterOption);

                        if (i === -1) {
                          varinatsArray1.push(color.filterOption);
                          like = false;
                        } else {
                          varinatsArray1.splice(i, 1);
                        }
                        // let currentUrlParams = new URLSearchParams(window.location.search);
                        // currentUrlParams.set('page', 1);
                        // history.push(window.location.pathname + "?" + currentUrlParams.toString());
                        // dispatch(ageGroup(varinatsArray1))

                        let searchParams = new URLSearchParams(
                          window.location.search
                        );

                        searchParams.set("page", 1);
                        let newurl =
                          window.location.protocol +
                          "//" +
                          window.location.host +
                          window.location.pathname +
                          "?" +
                          searchParams.toString();
                        window.history.pushState({ path: newurl }, "", newurl);
                        if (PAGINATION === 3) {
                          //   dispatch(sortpagination())
                        }
                        // dispatch(loadProductbycategory())
                        // dispatch(agefilter(varinatsArray1))
                        else setActiveSort(e, like);
                        dispatch(
                          warehouseByfilter(pageCount, {
                            filter: {
                              type: type,
                              value: varinatsArray1,
                            },
                          })
                        );
                      }
                    }
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id={color.filterOption+key}
                      style={{ marginTop: "-5px" }}
                    />
                    <label class="form-check-label" for={color.filterOption+key}>
                      {color.filterOption}
                    </label>
                  </div>

                  <div className="sidebar-widget-list-left ">
                    {/* <button
                    style={{height:"14px"}}
                      onClick={(e) => {
                        let like = true;
                        let i = -1;
                        for (var j = 0; j < varinatsArray1.length; j++) {
                          if (varinatsArray1[j] === color.filterOption) {
                            i = j;
                          }
                        }

                        tagUpdate(color.filterOption);

                        if (i === -1) {
                          varinatsArray1.push(color.filterOption);
                          like = false;
                        } else {
                          varinatsArray1.splice(i, 1);
                        }
                        // let currentUrlParams = new URLSearchParams(window.location.search);
                        // currentUrlParams.set('page', 1);
                        // history.push(window.location.pathname + "?" + currentUrlParams.toString());
                        // dispatch(ageGroup(varinatsArray1))

                        let searchParams = new URLSearchParams(
                          window.location.search
                        );

                        searchParams.set("page", 1);
                        let newurl =
                          window.location.protocol +
                          "//" +
                          window.location.host +
                          window.location.pathname +
                          "?" +
                          searchParams.toString();
                        window.history.pushState({ path: newurl }, "", newurl);
                        if (PAGINATION === 3) {
                          //   dispatch(sortpagination())
                        }
                        // dispatch(loadProductbycategory())
                        // dispatch(agefilter(varinatsArray1))
                        else setActiveSort(e, like);
                        dispatch(
                          warehouseByfilter(pageCount, {
                            filter: {
                              type: type,
                              value: varinatsArray1,
                            },
                          })
                        );
                      }}
                    >
                      <span className="checkmark" />{" "}
                      <p
                        style={{ fontSize: "11px" }}
                        className="text-gray mt-2"
                      >
                        {color.filterOption}
                      </p>
                    </button> */}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          "No colors found"
        )}
      </div>
    </div>
  );
};

export default ShopColor;
