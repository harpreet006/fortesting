import React from "react";
import { Link } from "react-router-dom";

const InsightsDropdown = ({ service }) => {
  return (
    <div className="">
      <div className="dropdownHover">
        <button
            className={`btn dropdown-toggle d-flex px-0 align-items-center dropbtnHover ${
              service == "/new-blog" ||
              service == "/news" ||
              service == "/glossary" ||
              service == "/events" ?
              // service == "/news" ||

              "active" 
              : ""
            }`}
          type="button"
          id="dropdownMenu1"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          INSIGHTS
        </button>
        <div className="dropdown-menu menus dropdown-contentHover" aria-labelledby="dropdownMenu1">
          <Link className="dropdown-item" to="/new-blog"  style={{fontSize:14}}>
            Blogs
          </Link>
          <Link className="dropdown-item" to="/news"  style={{fontSize:14}}>
            News
          </Link>
          <Link className="dropdown-item" to="/events"  style={{fontSize:14}}>
            Events
          </Link>
          {/* <Link className="dropdown-item" to="#"  style={{fontSize:14}}>
            Tools
          </Link> */}
          <Link className="dropdown-item"
           to="glossary"  style={{fontSize:14}}>
            Glossary
          </Link>

        </div>
      </div>
    </div>
  );
};

export default InsightsDropdown;
