import React,{useEffect} from 'react';
import loadjs from 'loadjs';
import CommonSideMenu from '../../components/vendor/vendormenu/CommonSideMenu';

const Menu = () => {
  useEffect(() => {
    loadjs('/assets/plugins/bootstrap/css/bootstrap.min.css', function() {
      loadjs('/assets/plugins/fontawesome/css/font-awesome.min.css', function() {
          loadjs('/assets/css/custom.css', function() {
          });
      });
  });
})

    return (
        <div className="bg-dark py-3 sidebar-admin sidebar-admin-toggle vendor-sidebar-style">
        
          <div className="close pr-3 d-lg-none">
            <button className="btn px-0 size-40px toggle-className btn-sidebar-admin sidebar-admin-toggle align-items-center justify-content-center" type="button" data-target=".sidebar-admin-toggle" data-toggle-class="open">
              <span></span>
            </button>
          </div>
          <div className="user-box py-4 px-4">
            <div className="user d-flex align-items-center py-3">
              <div className="user-image mx-3">
                <img className="img-fluid w-100" src={"/assets/images/icons/icon-user1.png"} alt="booking"/>
              </div>
              <div className="user-name pt-3">
                <h6 className="text-center text-white font-weight-light">Prashant Sharma</h6>
              </div>
            </div>
          </div>
          <div className="menus">
         
            <div className="nav flex-column nav-pills py-3" id="sidebar-tab" role="tablist" aria-orientation="vertical">
            {/* <SideMenu /> */}
            <CommonSideMenu />
            </div> 
          </div>
        </div>
    )
}

export default Menu;