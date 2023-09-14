import React from 'react';
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import down from '../../assets/icons/down_arrow.png';
// import userPic from 'assets/icons/userPic.png';

const Sidebar = () => {
  const [showDropdown1, setShowDropdown1] = useState(false)
  const [showDropdown2, setShowDropdown2] = useState(false)
  // const [showDropdown3, setShowDropdown3] = useState(false)
  const [showDropdown4, setShowDropdown4] = useState(false)
  const [showDropdown5, setShowDropdown5] = useState(false)


  useEffect(() => {
    if (localStorage.getItem("show1") === "true") {
      setShowDropdown1(true)
    }
    if (localStorage.getItem("show2") === "true") {
      setShowDropdown2(true)
    }
    if (localStorage.getItem("show3") === "true") {
      // setShowDropdown3(true)
    }
    if (localStorage.getItem("show4") === "true") {
      setShowDropdown4(true)
    }
    if (localStorage.getItem("show5") === "true") {
      setShowDropdown5(true)
    }


  }, []);

  const categoryDropdown = () => {
    if (showDropdown1 === false) {
      setShowDropdown1(true);
      setShowDropdown2(false)
      // setShowDropdown3(false)
      setShowDropdown4(false)
      setShowDropdown5(false)

      localStorage.setItem("show1", true)
      localStorage.setItem("show2", false)
      localStorage.setItem("show3", false)
      localStorage.setItem("show4", false)
      localStorage.setItem("show5", false)

    }
    else {
      setShowDropdown1(false)
      localStorage.setItem("show1", false)
    }
  }

  const couponDropdown = () => {
    if (showDropdown2 === false) {
      setShowDropdown2(true);
      setShowDropdown1(false)
      // setShowDropdown3(false)
      setShowDropdown4(false)
      setShowDropdown5(false)

      localStorage.setItem("show2", true)
      localStorage.setItem("show1", false)
      localStorage.setItem("show3", false)
      localStorage.setItem("show4", false)
      localStorage.setItem("show5", false)
    }
    else {
      setShowDropdown2(false)
      localStorage.setItem("show2", false)
    }
  }

  // const CollectionDropdown = () => {
  //   if (showDropdown3 === false) {
  //     setShowDropdown3(true);
  //     setShowDropdown1(false)
  //     setShowDropdown2(false)
  //     setShowDropdown4(false)
  //     setShowDropdown5(false)

  //     localStorage.setItem("show3", true)
  //     localStorage.setItem("show2", false)
  //     localStorage.setItem("show1", false)
  //     localStorage.setItem("show4", false)
  //     localStorage.setItem("show5", false)
  //   }
  //   else {
  //     setShowDropdown3(false)
  //     localStorage.setItem("show3", false)
  //   }
  // }

  const VariantDropdown = () => {
    if (showDropdown4 === false) {
      setShowDropdown4(true);
      setShowDropdown1(false)
      setShowDropdown2(false)
      // setShowDropdown3(false)
      setShowDropdown5(false)
      localStorage.setItem("show4", true)
      localStorage.setItem("show2", false)
      localStorage.setItem("show1", false)
      localStorage.setItem("show3", false)
      localStorage.setItem("show5", false)
    }
    else {
      setShowDropdown4(false)
      localStorage.setItem("show4", false)
    }
  }
  const BrandDropdown = () => {
    if (showDropdown5 === false) {
      setShowDropdown5(true)
      setShowDropdown4(false);
      setShowDropdown1(false)
      setShowDropdown2(false)
      // setShowDropdown3(false)
      localStorage.setItem("show5", true)
      localStorage.setItem("show2", false)
      localStorage.setItem("show1", false)
      localStorage.setItem("show3", false)
      localStorage.setItem("show4", false)
    }
    else {
      setShowDropdown5(false)
      localStorage.setItem("show5", false)
    }
  }

  const sidebarToggle = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector(".sidebar-wrap");
    // toggle navbar
    nav.classList.toggle('sidebar-active');
    burger.classList.toggle('toggle');
  }

  const DropClose = () => {
    localStorage.removeItem("show1")
    localStorage.removeItem("show2")
    localStorage.removeItem("show3")
    localStorage.removeItem("show4")
    localStorage.removeItem("show5")
  }


  return (
    <div>
      <div className="burger" onClick={sidebarToggle}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
      <div className="sidebar-wrap">
        <section className="sidebar-user">
          {/* <section><img src={userPic} alt="user-icon" /></section> */}
          <section className="capital">Name<br /> Admin ID : SAHBSHA</section>
        </section>
        <section className="sidebar-links">
          <NavLink to="/dashboard" className="active-link">
            <div onClick={DropClose}>
              Dashboard
            </div>
          </NavLink>
          <NavLink to="/users" className="active-link">
            <div onClick={DropClose}>
              Manage User
          </div>
          </NavLink>
          <NavLink to="/products?page=1" className="active-link">
            <div onClick={DropClose}>
              Manage Products
          </div>
          </NavLink>

          {/* brand management */}

          <div className={showDropdown5 ? "dropdown-active" : "dropdown-btn"} onClick={BrandDropdown}>
            Brand Management
            <section><img src={down} alt="down-arrow" /></section>
          </div>
          {showDropdown5 ? (
            <section className="dropdown-body">
              <NavLink to="/brand?page=1" className="active-link smalllink">
                <div>
                  Manage Brands
                </div>
              </NavLink>

              <NavLink to="/add-brand" className="active-link smalllink">
                <div>
                  Add Brand
                </div>
              </NavLink>
            </section>
          ) : null}

          {/* manage Cat sub cat */}
          <div className={showDropdown1 ? "dropdown-active" : "dropdown-btn"} onClick={categoryDropdown}>
            Manage Cat / Sub Cat
          <section><img src={down} alt="down-arrow" /></section>
          </div>
          {showDropdown1 ? (
            <section className="dropdown-body">
              <NavLink to="/category-manage?page=1" className="active-link smalllink">
                <div>
                  Manage
                </div>
              </NavLink>
              <NavLink to="/create-category" className="active-link">
                <div>
                  create category
                </div>
              </NavLink>
              <NavLink to="/create-sub-category" className="active-link">
                <div>
                  create sub-category
                </div>
              </NavLink>
            </section>
          ) : null}

          {/* Varinat Management */}

          <div className={showDropdown4 ? "dropdown-active" : "dropdown-btn"} onClick={VariantDropdown}>
            Variant Management
            <section><img src={down} alt="down-arrow" /></section>
          </div>
          {showDropdown4 && (
            <section className="dropdown-body">
              <NavLink to="/add-variant" className="active-link">
                <div>
                  Add Variant Value
              </div>
              </NavLink>
              <NavLink to="/add-variant-name" className="active-link">
                <div>
                  Add Variant Name
              </div>
              </NavLink>
              <NavLink to="/variant-manage" className="active-link">
                <div>
                  Manage Variant Value
              </div>
              </NavLink>
              <NavLink to="/variant-name-manage" className="active-link">
                <div>
                  Manage Variant Name
              </div>
              </NavLink>
            </section>
          )}




          <NavLink to="/orders?page=1" className="active-link">
            <div onClick={DropClose}>
              Manage Orders
          </div>
          </NavLink>

          <NavLink to="/orders-return?page=1" className="active-link">
            <div onClick={DropClose}>
              Return Orders
          </div>
          </NavLink>

          {/* Dropdown Button */}
        
          {/*  */}
          {/* <div className={showDropdown3 ? "dropdown-active" : "dropdown-btn"} onClick={CollectionDropdown}>
            Collection Management
            <section><img src={down} alt="down-arrow" /></section>
          </div>
          {showDropdown3 && (
            <section className="dropdown-body">
              <NavLink to="/collection" className="active-link">
                <div>
                  Collections
                </div>
              </NavLink>
              <NavLink to="/add-collection" className="active-link">
                <div>
                  Add Collections
                </div>
              </NavLink>
            </section>
          )} */}
    
          


          {/* <NavLink to="/review" className="active-link">
            <div onClick={DropClose}>Review & Ratings</div>
          </NavLink> */}

          {/* Dropdown Button */}
          <div className={showDropdown2 ? "dropdown-active" : "dropdown-btn"} onClick={couponDropdown}>
            Coupon Management
            <section><img src={down} alt="down-arrow" /></section>
          </div>
          {showDropdown2 && (
            <section className="dropdown-body">
              <NavLink to="/coupon-manage" className="active-link">
                <div>
                  Manage (coupon)
                </div>
              </NavLink>
              <section>
                <NavLink to="/create-coupon" className="active-link">
                  <div>
                    Add Coupon
            </div>
                </NavLink>
              </section>
            </section>
          )}
          {/* .... */}

          <NavLink to="/cart-manage?page=1" className="active-link">
            <div onClick={DropClose}>
              Cart Management
            </div>
          </NavLink>

         



{/* Dropdown Button banner*/}
{/* <div className={showDropdown2 ? "dropdown-active" : "dropdown-btn"} onClick={couponDropdown}>
            Banner Management
            <section><img src={down} alt="down-arrow" /></section>
          </div>
          {showDropdown2 && (
            <section className="dropdown-body">
             <NavLink to="/slide-banner" className="active-link">
                <div>Manage Slide banner</div>
              </NavLink> 
              <NavLink to="/top-banner" className="active-link">
                  <div>
                  Manage Upper banner
                  </div>
              </NavLink>
              <NavLink to="/lower-banner" className="active-link">
                  <div>
                    Manage Lower banner
                  </div>
              </NavLink>
              <NavLink to="/banner" className="active-link">
                  <div>
                    old banner
                  </div>
              </NavLink>
            </section>
          )} */}
          {/* .... */}


          <NavLink  to="/banner" className="active-link">
            <div onClick={DropClose}>banner management</div>
          </NavLink>


          <NavLink to="/cms" className="active-link">
            <div onClick={DropClose}>CMS Pages</div>
          </NavLink>
          <NavLink to="/setting" className="active-link">
            <div onClick={DropClose}>Settings</div>
          </NavLink>
          <NavLink to="/logout"
            onClick={() => {
              // dispatch(logoutUser());
            }}
            className="active-link">
            <div>Logout</div>
          </NavLink>
        </section>
      </div>
    </div>
  )
}

export default Sidebar