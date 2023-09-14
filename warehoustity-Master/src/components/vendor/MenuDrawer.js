import React from 'react'
import Drawer from '@material-ui/core/Drawer';
// import Button from '@material-ui/core/Button';
import CommonSideMenu from './vendormenu/CommonSideMenu';

const MenuDrawer = () => {

   
      const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });
    
     
    
     const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };
    

    return (
        <div className="col-auto d-lg-none">
          
        {['left'].map((anchor) => (
          <React.Fragment key={anchor}>
            {/* <Button > */}
            
            <button onClick={toggleDrawer(anchor, true)} className="btn btn-deep-blue px-0 size-40px toggle-className btn-sidebar-admin sidebar-admin-toggle align-items-center justify-content-center" type="button">
                <span></span>
                </button>
            
            {/* </Button> */}
            <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
              <CommonSideMenu />
            </Drawer>
          </React.Fragment>
        ))}
    
        </div>
    )
}

export default MenuDrawer
