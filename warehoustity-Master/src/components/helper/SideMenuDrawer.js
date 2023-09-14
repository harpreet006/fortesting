import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import SideMenu from '../../pages/vendor-dashboard/SideMenu';

const SideMenuDrawer = () => {


    const useStyles = makeStyles({
        list: {
          width: 250,
        },
        fullList: {
          width: 'auto',
        },
      });
    
      const classes = useStyles();
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
    
    
      const list = (anchor) => (
        <div
          className={clsx(classes.list, {
            [classes.fullList]: anchor === 'top' || anchor === 'bottom',
          })}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
    
    
          {/* <List> */}
          
            {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))} */}
            <div className="drawer-background">
    
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
    
    
   <SideMenu />
    </div>
    {/* <Menu /> */}
            
          {/* </List> */}
         
          
        </div>
      );
    



    return (
        <>
        {['left'].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={toggleDrawer(anchor, true)}>
              
              <button className="btn btn-deep-blue px-0 size-40px toggle-className btn-sidebar-admin sidebar-admin-toggle align-items-center justify-content-center" type="button">
                  <span></span>
                  </button>
              
              </Button>
              <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                {list(anchor)}

              </Drawer>
            </React.Fragment>
          ))}
          </>
    )
}

export default SideMenuDrawer
