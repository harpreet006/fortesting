import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VendorLayout from "../../../layout/VendorLayout";
import MenuDrawer from "../../../components/vendor/MenuDrawer";
// import SafetySecurityForm from '../../../components/vendor/warehouseForm/SafetySecurityForm'
// import PermitForm from '../../../components/vendor/warehouseForm/PermitForm'
// import MaterialTypeForm from '../../../components/vendor/warehouseForm/MaterialTypeForm'
// import WarehousePhotoForm from '../../../components/vendor/warehouseForm/WarehousePhotoForm'
import CreateNewWarehouse from "../../../components/vendor/warehouseForm/CreateNewWarehouse";
// import FormEighty from '../../../components/vendor/warehouseForm/FormEighty';
// import {fetchWarehouseById, WarehouseById} from '../../../store/actions/vendor/warehouseList';
// import {useDispatch, useSelector} from 'react-redux';
// import UpdateContactDetailForm from '../../../components/vendor/warehouseForm/UpdateContactDetailForm';
// import UpdateStorageSpaceForm from '../../../components/vendor/warehouseForm/UpdateStorageSpaceForm';
// import UpdateITInfraForm from '../../../components/vendor/warehouseForm/UpdateITInfraForm';
// import UpdateMHInfraForm from '../../../components/vendor/warehouseForm/UpdateMHInfraForm';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "100%",
    marginBottom: "5px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
    padding: "15px",
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const ListOfWarehouse = () => {
  const history = useHistory();
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  //   const [warehouseId, setWarehouseId] = useState(null);
  //   const dispatch=useDispatch();
  //   const data=useSelector((state)=>state.WAREHOUSELIST);
  // console.log("ListOfWarehouse===>", data);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // useEffect(()=>{
  //   if(data.newWarehouseInfo.data !== undefined && data.newWarehouseInfo.statusCode===200 ){
  //     dispatch(fetchWarehouseById(data.newWarehouseInfo.data.id))
  //     setWarehouseId(data.newWarehouseInfo.data.id)

  //   }else{
  //     dispatch(WarehouseById([]))
  //   }
  // },[dispatch,data.newWarehouseInfo.data, data.newWarehouseInfo.statusCode])

  return (
    <VendorLayout>
      <div className="content-admin px-2">
        <div className="row justify-content-end align-items-center py-3 px-3 mx-0">
        <MenuDrawer />
          <div className="col-12 ">
            <div className="row">
              <div className="col-12">
                <div className={classes.root}>
                  <h5 className="backButton mb-4 text-dark">
                    <i
                      onClick={() => history.goBack()}
                      className="fas fa-chevron-left mr-3 cursorPointer"
                    ></i>
                    List Your Warehouse
                  </h5>

                  {/* Create New Warehouse */}

                  <Accordion
                    expanded={expanded !== "panel"}
                    onChange={handleChange("panel")}
                  >
                    <AccordionSummary
                      // expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography className={classes.heading}>
                        {" "}
                        <span className="accord-heading text-dark">
                          1. Create New Warehouse
                        </span>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <CreateNewWarehouse />
                    </AccordionDetails>
                  </Accordion>

                  {/* Contact Detail Form */}

                  {/* <Accordion expanded={expanded === 'panel1' || data.accordion==="contactForm"} onChange={handleChange('panel1')}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography className={classes.heading}>  <span className="accord-heading">2. Warehouse Contact Details</span></Typography>
                    </AccordionSummary>
                    <AccordionDetails>

                        <UpdateContactDetailForm warehouseId={warehouseId} />

                    </AccordionDetails>
                  </Accordion> */}

                  {/* Another Form */}

                  {/* <Accordion expanded={expanded === 'panel2' || data.accordion ==="spaceForm"} onChange={handleChange('panel2')}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography className={classes.heading}><span className="accord-heading">3. Storage Space </span></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <UpdateStorageSpaceForm />
                    </AccordionDetails>
                  </Accordion> */}

                  {/* IT INFRA Form */}

                  {/* <Accordion expanded={expanded === 'panel3' || data.accordion==="itOfficeForm"} onChange={handleChange('panel3')}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography className={classes.heading}><span className="accord-heading">4. IT & Office Infra</span></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <UpdateITInfraForm />
                    </AccordionDetails>
                  </Accordion> */}

                  {/* MH Infra */}

                  {/* <Accordion expanded={expanded === 'panel4' || data.accordion==="mhForm"} onChange={handleChange('panel4')}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography className={classes.heading}><span className="accord-heading">5. MH Infra</span></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <UpdateMHInfraForm viewMood={false} />
                    </AccordionDetails>
                  </Accordion> */}

                  {/* Safety Security Form */}

                  {/* <Accordion expanded={expanded === 'panel5'|| data.accordion==="safetyForm"} onChange={handleChange('panel5')}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography className={classes.heading}><span className="accord-heading">6. Safety Security Form</span></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <SafetySecurityForm />
                    </AccordionDetails>
                  </Accordion> */}

                  {/* Permit Form */}

                  {/* <Accordion expanded={expanded === 'panel6' || data.accordion==="permitForm"} onChange={handleChange('panel6')}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography className={classes.heading}><span className="accord-heading">7. Permits</span></Typography>
                    </AccordionSummary>
                    <AccordionDetails className="m-0 p-0">
                        <PermitForm />
                    </AccordionDetails>
                  </Accordion> */}

                  {/* Material Type Form */}

                  {/* <Accordion expanded={expanded === 'panel7'|| data.accordion==="materialForm"} onChange={handleChange('panel7')}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography className={classes.heading}><span className="accord-heading">8. Material Type </span></Typography>
                    </AccordionSummary>
                    <AccordionDetails className="m-0 p-0">
                        <MaterialTypeForm />
                    </AccordionDetails>
                  </Accordion> */}

                  {/* Material Type Form */}

                  {/* <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography className={classes.heading}><span className="accord-heading">9. Warehouse Photo</span></Typography>
                    </AccordionSummary>
                    <AccordionDetails className="m-0 p-0">
                        <WarehousePhotoForm />
                    </AccordionDetails>
                  </Accordion> */}

                  {/*  Form Eighty*/}

                  {/* <Accordion expanded={expanded === 'panel10'|| data.accordion==="eightyForm"} onChange={handleChange('panel10')}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography className={classes.heading}><span className="accord-heading">10. Form 80</span></Typography>
                    </AccordionSummary>
                    <AccordionDetails className="m-0 p-0">
                        <FormEighty />
                    </AccordionDetails>
                  </Accordion>   */}
                  {/* <div className="col-12 my-4">
                    <div className="row justify-content-end">
                      <div className="col-auto">
                       
                      </div>
                      <div className="col-auto">
                        <button type="button" onClick={()=>dispatch(updateWarehouseStatus(warehouseId, {"status": "PENDINGFORAPPROVAL"}))} className="btn btn-deep-blue add-className remove-className">Submit</button>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default ListOfWarehouse;
