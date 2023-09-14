import React, {useState, useRef} from 'react'
// import Cart from '../../pages/Cart'
import {logoutUser} from "../../actions/login"
import { useDispatch } from 'react-redux';
import {useClickAway} from 'react-use';
import { Link } from 'react-router-dom';
import { FaTimes } from "react-icons/fa";

const Header = () => {
  // const[fullname,setfullname]=useState("")
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [menuOpen, setMenuOpen]=useState(false);

    const logout= (event) => {
      event.preventDefault();
      dispatch(logoutUser())
    }

    useClickAway(ref, () => {
      setMenuOpen(false);
    });

    return (
      <header className="site-header sticky-on"> 
        <nav className="navbar py-0 px-sm-3 pr-0 pl-0 navbar-light" id="navbar-example2" >
          {/* <Link className="navbar-brand py-3 pl-5 pl-lg-3" to={"/"}>
            <img src={"/assets/images/logo.png"} alt="logo" className="logo img-fluid" />
          </Link> */}
          <Link  className="navbar-brand py-3 pl-5 pl-lg-3" to={"/dashboard"}>
          <img src={"/assets/images/logo.png"} alt="logo" className="logo img-fluid"/>
          </Link>




          <div ref={ref} className={!menuOpen ? "navbar-collapse offcanvas-collapse":"navbar-collapse offcanvas-collapse open"}>
        
<span  style={{float:"right", color:'#ffffff', fontSize:'30px', marginRight:'20px', cursor:'pointer'}} onClick={()=>setMenuOpen(false)}><FaTimes /></span>

            <div className="row mx-0 justify-content-center align-items-center sidebar-links">
              <div className="col-auto mx-auto">
                <ul className="nav ml-auto border-bottom border-white d-flex flex-md-row flex-column text-center">
                  <li className="nav-item">
                    <Link className="nav-link" data-toggle="offcanvas" to={"/about"}>ABOUT US</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" data-toggle="offcanvas" to="#">SERVICES</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" data-toggle="offcanvas" to="#">BLOG</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" data-toggle="offcanvas" to="#">CONTACT US</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" data-toggle="offcanvas" to="#">LOGIN AS SPACE PROVIDER</Link>
                  </li>
                  <li className="nav-item">
                  </li>
                </ul>
                <ul className="nav d-flex flex-md-row flex-column justify-content-center text-center">
                  <li className="nav-item">
                    <Link className="nav-link" data-toggle="offcanvas" to="#">LOGIN AS CUSTOMER
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" data-toggle="modal" to="#signin-modal">REGISTER</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" data-toggle="offcanvas" to="warehouse-detail.html">LIST A WAREHOUSE
                    </Link>
                  </li> 
                </ul>
              </div>
            </div>
            <div className="row mx-0 align-items-center justify-content-md-between justify-content-center px-3 border-top border-white px-4 pt-4">
              <div className="col-md-auto col-auto mx-auto mb-3 text-white">Stay Connected With US</div>
              <div className="col-md-auto col-auto mx-auto">
                <div className="social-icons bg-socials row align-items-center">
                  <div className="col-auto px-1">
                    <Link to="#" target="_blank" className="facebook d-flex align-items-center justify-content-center">
                      <i className="fab fa-facebook-f"></i>
                    </Link>
                  </div>
                  <div className="col-auto px-1">
                    <Link to="" target="_blank" className="twitter d-flex align-items-center justify-content-center">
                      <i className="fab fa-twitter"></i>
                    </Link>
                  </div>
                  <div className="col-auto px-1">
                    <Link to="#" target="_blank" className="instagram d-flex align-items-center justify-content-center">
                      <i className="fab fa-instagram"></i>
                    </Link>
                  </div> 
                </div>
              </div>
            </div>
          </div>
          <div className="nav-btns nav-item d-flex align-items-center ml-auto"> 
            <div className="">
              <div className="dropdown user-drop">
                <button className="btn dropdown-toggle d-flex px-0 align-items-center" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <div className="img-user overflow-hidden rounded-circle mr-2">
                    <img className="img-fluid w-100" src={"/assets/images/icons/icon-user1.png"} alt="warehouse" />
                  </div>
                  <div className="user-name d-none d-md-block">
                    {/* {fullname}  */}
                    Ravi Sharma
                  </div>
                </button>
                <div className="dropdown-menu menus" aria-labelledby="dropdownMenu1">
                  <Link className="dropdown-item" to=""><i className="fas fa-home"></i> Home</Link>
                  <Link className="dropdown-item active" to="../dashboard/index.html"><i className="fas fa-user"></i> Dashboard</Link>
                  <Link className="dropdown-item" to=""><i className="fas fa-suitcase"></i> Services</Link>
                  <Link className="dropdown-item" to=""><i className="fas fa-heart"></i> My Favourites</Link>
                  <Link className="dropdown-item text-danger d-flex align-items-center"  to="">
                    <button style={{
                      "all": "unset",
                      "cursor": "pointer"
                    }}
                      onClick={logout}><img className="size-15px img-fluid mr-2" src={"/assets/images/icons/logout-danger.png"} alt="warehouse" /> <span>Logout</span></button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="d-max-xxs-none d-inline-block">
              <Link to="#" className="btn px-md-3 px-2 px-lg-4 mt-2">
                <div className="h5 sup-badge">
                  <i className="fas fa-shopping-cart"></i>
                  
                </div>
              </Link>
            </div>
            <div className="d-max-xxs-none d-inline-block">
              <Link to="#signin-modal" data-toggle="modal" className="btn px-2 px-lg-4 mt-2">
                <div className="h5 notification-badge">
                  <i className="fas fa-bell"></i>
                  <div className="badge badge-danger rounded-circle d-flex justify-content-center align-items-center">
                    <div>4</div>
                  </div>
                </div>
              </Link>
            </div>
          </div> 



          <button  onClick={()=>{
            console.log("<------On Click---->")
            setMenuOpen(true); 
          }} 
          className={menuOpen ? "navbar-toggler border-0 d-none":"navbar-toggler border-0"} type="button" data-toggle="offcanvas" data-target="offcanvassidebar" id="offcanvassidebar-btn"
          // className="navbar-toggler border-0" type="button" data-toggle="offcanvas" data-target="offcanvassidebar" id="offcanvassidebar-btn"
          > 
            <span></span>
          </button>


        </nav>
      </header>
    )
}

export default Header;
