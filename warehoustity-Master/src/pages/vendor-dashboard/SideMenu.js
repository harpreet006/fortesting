import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';

import {logoutUser} from "../../actions/login"
import {useDispatch} from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

// export default function NestedList() {
//   const classes = useStyles();
//   const [open, setOpen] = React.useState(true);

//   const handleClick = () => {
//     setOpen(!open);
//   };

const SideMenu = () => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);

  const handleClick = () => {
    setOpen(!open);
    setOpen2(false);
    setOpen3(false);
    setOpen4(false);
    setOpen5(false);
    setOpen6(false);
  };

 

  const handleClick2 = () => {
    setOpen(false);
    setOpen2(!open2);
    setOpen3(false);
    setOpen4(false);
    setOpen5(false);
    setOpen6(false);
  };

  const handleClick3 = () => {
    setOpen(false);
    setOpen2(false);
    setOpen3(!open3);
    setOpen4(false);
    setOpen5(false);
    setOpen6(false);
  };

  const handleClick4 = () => {
    setOpen(false);
    setOpen2(false);
    setOpen3(false);
    setOpen4(!open4);
    setOpen5(false);
    setOpen6(false);
  };

  const handleClick5 = () => {
    setOpen(false);
    setOpen2(false);
    setOpen3(false);
    setOpen4(false);
    setOpen5(!open5);
    setOpen6(false);
  };

  const handleClick6 = () => {
    setOpen(false);
    setOpen2(false);
    setOpen3(false);
    setOpen4(false);
    setOpen5(false);
    setOpen6(!open6);
  };





    return (
        <div>
            <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
     <Link to="/vendor" className={window.location.pathname === "/vendor" ? 'sidebar-link-active': 'sidebar-link'}>
      <ListItem button>
        <ListItemIcon>
          {/* <SendIcon /> */}
          <i className="fas fa-desktop"></i> 
        </ListItemIcon>
       
        <ListItemText primary="Dashboard" />
      
      </ListItem>
      </Link>
     
      <ListItem button onClick={handleClick} className={open ? "side-dropdown-menu-active": "side-dropdown-menu"}>
        <ListItemIcon>
          {/* <InboxIcon /> */}
          <i className="fas fa-warehouse"></i>
        </ListItemIcon>
        <ListItemText primary="List Your Space" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <Link to="/vendor/warehouse-list"  className={window.location.pathname === "/warehouse-list" ? 'sidebar-link-active': 'sidebar-link'}>
          <ListItem onClick={()=>{
            setOpen(true)
            console.log("on Link Click")
            }} button className={classes.nested}>
            <ListItemIcon>
              {/* <StarBorder /> */}
              <i className="fas fa-circle"></i>
            </ListItemIcon>
           
              <ListItemText primary="List Your Warehouse" />
          </ListItem>
        </Link>

        <Link to="/vendor/mywarehouse" className={window.location.pathname === "/vendor/mywarehouse" ? 'sidebar-link-active': 'sidebar-link'}>
          <ListItem onClick={()=>{
            setOpen(true)
            console.log("on Link Click")
            }} button className={classes.nested}>
            <ListItemIcon>
              {/* <StarBorder /> */}
              <i className="fas fa-circle"></i>
            </ListItemIcon>
           
            <ListItemText primary="My Warehouses" />
          </ListItem>
          </Link>

        </List>
      </Collapse>

      <Link to="/vendor/booking" className={window.location.pathname === "/vendor/booking" ? 'sidebar-link-active': 'sidebar-link'}>
      <ListItem button>
        <ListItemIcon>
          <i className="fas fa-calendar-alt"></i>
        </ListItemIcon>
        <ListItemText primary="Booking" />
      </ListItem>
      </Link>

      <Link to="/vendor/service" className={window.location.pathname === "/vendor/service" ? 'sidebar-link-active': 'sidebar-link'}>
      <ListItem button>
        <ListItemIcon>
          <i className="fas fa-suitcase"></i>
        </ListItemIcon>
        <ListItemText primary="My Services" />
      </ListItem>
      </Link>

{/* sub vendor */}
{/* <ListItem button onClick={handleClick1} className="side-dropdown-menu">
        <ListItemIcon>
        <i className="fas fa-user-friends"></i>
        </ListItemIcon>
        <ListItemText primary="Sub Vendor" />
        {open1 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open1} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

        <Link to="/vendor" className="sidebar-link">
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <i className="fas fa-circle"></i>
            </ListItemIcon>
              <ListItemText primary="Manage Sub Vendor" />
          </ListItem>
          </Link>

          <Link to="/vendor" className="sidebar-link">
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <i className="fas fa-circle"></i>
            </ListItemIcon>
            <ListItemText primary="Manage Roles" />
          </ListItem>
          </Link>

          <Link to="/vendor" className="sidebar-link">
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <i className="fas fa-circle"></i>
            </ListItemIcon>
            <ListItemText primary="Warehouse Mapping" />
          </ListItem>
          </Link>

        </List> 
      </Collapse>*/}


      {/* Documents */}

      <ListItem button onClick={handleClick2} className={open2 ? "side-dropdown-menu-active": "side-dropdown-menu"}>
        <ListItemIcon>
        <i className="fas fa-file-contract"></i>
        </ListItemIcon>
        <ListItemText primary="Documents" />
        {open2 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <Link to="/vendor/spacecertificate" className={window.location.pathname === "/vendor/spacecertificate" ? 'sidebar-link-active': 'sidebar-link'}>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <i className="fas fa-circle"></i>
            </ListItemIcon>
              <ListItemText primary="Space Certificate" />
          </ListItem>
          </Link>

          <Link to="/vendor/agreementpackage" className={window.location.pathname === "/vendor/agreementpackage" ? 'sidebar-link-active': 'sidebar-link'}>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <i className="fas fa-circle"></i>
            </ListItemIcon>
            <ListItemText primary="Agreement Package" />
          </ListItem>
          </Link>

          <Link to="/vendor/sow" className={window.location.pathname === "/vendor/sow" ? 'sidebar-link-active': 'sidebar-link'}>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <i className="fas fa-circle"></i>
            </ListItemIcon>
            <ListItemText primary="Sow" />
          </ListItem>
        </Link>

        <Link to="/vendor/sop" className={window.location.pathname === "/vendor/sop" ? 'sidebar-link-active': 'sidebar-link'}>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <i className="fas fa-circle"></i>
            </ListItemIcon>
            <ListItemText primary="Sop" />
          </ListItem>
        </Link>

        <Link to="/vendor/noc" className={window.location.pathname === "/vendor/noc" ? 'sidebar-link-active': 'sidebar-link'}>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <i className="fas fa-circle"></i>
            </ListItemIcon>
            <ListItemText primary="Noc" />
          </ListItem>
          </Link>

          <Link to="/vendor/other" className={window.location.pathname === "/vendor/other" ? 'sidebar-link-active': 'sidebar-link'}>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <i className="fas fa-circle"></i>
            </ListItemIcon>
            <ListItemText primary="Others" />
          </ListItem>
          </Link>

        </List>
      </Collapse>



      {/* Sub Users */}

      <ListItem button onClick={handleClick3} className={open3 ? "side-dropdown-menu-active": "side-dropdown-menu"}>
        <ListItemIcon>
        <i className="fas fa-user-friends"></i>
        </ListItemIcon>
        <ListItemText primary="Sub Users" />
        {open3 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open3} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

        <Link to="/vendor/managesubuser" className={window.location.pathname === "/vendor/managesubuser" ? 'sidebar-link-active': 'sidebar-link'}>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <i className="fas fa-circle"></i>
            </ListItemIcon>
              <ListItemText primary="Manage Sub User" />
          </ListItem>
          </Link>

          <Link to="/vendor/managerole" className={window.location.pathname === "/vendor/managerole" ? 'sidebar-link-active': 'sidebar-link'}>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <i className="fas fa-circle"></i>
            </ListItemIcon>
            <ListItemText primary="Manage Roles" />
          </ListItem>
          </Link>

          <Link to="/vendor/warehousemapping" className={window.location.pathname === "/vendor/warehousemapping" ? 'sidebar-link-active': 'sidebar-link'}>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <i className="fas fa-circle"></i>
            </ListItemIcon>
            <ListItemText primary="Warehouse Mapping" />
          </ListItem>
          </Link>

        </List>
      </Collapse>



      {/* Gst number  */}
      <Link to="/vendor/gst" className={window.location.pathname === "/vendor/gst" ? 'sidebar-link-active': 'sidebar-link'}>
      <ListItem button>
        <ListItemIcon>
        <i className="fas fa-registered"></i>
        </ListItemIcon>
        <ListItemText primary="GST No." />
      </ListItem>
      </Link>

      {/* RFQ management */}

      <ListItem button onClick={handleClick4} className={open4 ? "side-dropdown-menu-active": "side-dropdown-menu"}>
        <ListItemIcon>
        <i className="fas fa-file-signature"></i>
        </ListItemIcon>
        <ListItemText primary="RFQ Management" />
        {open4 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open4} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

        <Link to="/vendor" className={window.location.pathname === "/vendor" ? 'sidebar-link-active': 'sidebar-link'}>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <i className="fas fa-circle"></i>
            </ListItemIcon>
              <ListItemText primary="Manage RFQ" />
          </ListItem>
          </Link>

          <Link to="/vendor" className={window.location.pathname === "/vendor" ? 'sidebar-link-active': 'sidebar-link'}>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <i className="fas fa-circle"></i>
            </ListItemIcon>
            <ListItemText primary="Received RFQ's" />
          </ListItem>
          </Link>

          <Link to="/vendor" className={window.location.pathname === "/vendor" ? 'sidebar-link-active': 'sidebar-link'}>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              {/* <StarBorder /> */}
              <i className="fas fa-circle"></i>
            </ListItemIcon>
            <ListItemText primary="Open RFQ's" />
          </ListItem>
          </Link>


        </List>
      </Collapse>


       {/* RFQ management */}

       <ListItem button onClick={handleClick5} className={open5 ? "side-dropdown-menu-active": "side-dropdown-menu"}>
        <ListItemIcon>
        <i className="fas fa-sms"></i>
        </ListItemIcon>
        <ListItemText primary="Enquiry/Chat" />
        {open5 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open5} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

        <Link to="/vendor/createnewenquiry" className={window.location.pathname === "/vendor/createnewenquiry" ? 'sidebar-link-active': 'sidebar-link'}>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <i className="fas fa-circle"></i>
            </ListItemIcon>
              <ListItemText primary="Create New" />
          </ListItem>
          </Link>

          <Link to="/vendor/manageenquiry?page=1" className={window.location.pathname === "/vendor/manageenquiry?page=1" ? 'sidebar-link-active': 'sidebar-link'}>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <i className="fas fa-circle"></i>
            </ListItemIcon>
            <ListItemText primary="Manage Enquiry" />
          </ListItem>
          </Link>

        </List>
      </Collapse>


      {/* MIS */}

      <ListItem button onClick={handleClick6} className={open6 ? "side-dropdown-menu-active": "side-dropdown-menu"}>
        <ListItemIcon>
          {/* <InboxIcon /> */}
          <i className="fas fa-file-alt"></i>
        </ListItemIcon>
        <ListItemText primary="MIS" />
        {open6 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open6} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

        <Link to="/vendorrrrr" className={window.location.pathname === "/vendor" ? 'sidebar-link-active': 'sidebar-link'}>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <i className="fas fa-circle"></i>
            </ListItemIcon>
              <ListItemText primary="Create New" />
          </ListItem>
          </Link>

          <Link to="/vendor/managemis" className={window.location.pathname === "/vendor/managemis" ? 'sidebar-link-active': 'sidebar-link'}>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <i className="fas fa-circle"></i>
            </ListItemIcon>
            <ListItemText primary="Manage MIS" />
          </ListItem>
          </Link>

        </List>
      </Collapse>


      {/* Notification */}
      <Link to="/vendor/notification" className={window.location.pathname === "vendor/notification" ? 'sidebar-link-active': 'sidebar-link'}>
      <ListItem button>
        <ListItemIcon>
        <i className="fas fa-bell"></i>
        </ListItemIcon>
        
        <ListItemText primary="Notification" />
      </ListItem>
      </Link>


      {/* My Account */}

      <Link to="/vendor/myaccount" className={window.location.pathname === "/vendor/myaccount" ? 'sidebar-link-active': 'sidebar-link'}>
      <ListItem button>
        <ListItemIcon>
        <i className="fas fa-user-alt"></i>
        </ListItemIcon>
        <ListItemText primary="My Account" />
      </ListItem>
      </Link>


      {/* Logout */}

      <Link to="/" className={window.location.pathname === "/vendor" ? 'sidebar-link-active': 'sidebar-link'}>
      <ListItem button onClick={()=>dispatch(logoutUser())}>
        <ListItemIcon>
          <i className="fas fa-suitcase"></i>
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
      </Link>




    </List>
        </div>
    )
}

export default SideMenu
