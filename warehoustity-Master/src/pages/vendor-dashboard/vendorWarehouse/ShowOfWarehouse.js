import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import VendorLayout from "../../../layout/VendorLayout";
import MenuDrawer from "../../../components/vendor/MenuDrawer";
// import ContactDetailForm from '../../../components/vendor/warehouseForm/ContactDetailForm'
// import StorageSpaceForm from '../../../components/vendor/warehouseForm/StorageSpaceForm'
// import ITInfraForm from '../../../components/vendor/warehouseForm/ITInfraForm'
// import MHInfraForm from '../../../components/vendor/warehouseForm/MHInfraForm'
import SafetySecurityForm from "../../../components/vendor/warehouseForm/SafetySecurityForm";
import PermitForm from "../../../components/vendor/warehouseForm/PermitForm";
import MaterialTypeForm from "../../../components/vendor/warehouseForm/MaterialTypeForm";
import WarehousePhotoForm from "../../../components/vendor/warehouseForm/WarehousePhotoForm";
// import WarehouseLayoutForm from '../../components/vendor/warehouseForm/WarehouseLayoutForm'
// import WarehousePricingForm from '../../components/vendor/warehouseForm/WarehousePricingForm';
import FormEighty from "../../../components/vendor/warehouseForm/FormEighty";
import UpdateWarehouse from "../../../components/vendor/warehouseForm/UpdateWarehouse";
import { useDispatch } from "react-redux";
import {
  fetchWarehouseById,
  fetchWarehouseByIdAndType,
} from "../../../store/actions/vendor/warehouseList";
import UpdateContactDetailForm from "../../../components/vendor/warehouseForm/UpdateContactDetailForm";
import UpdateStorageSpaceForm from "../../../components/vendor/warehouseForm/UpdateStorageSpaceForm";
import UpdateITInfraForm from "../../../components/vendor/warehouseForm/UpdateITInfraForm";
import UpdateMHInfraForm from "../../../components/vendor/warehouseForm/UpdateMHInfraForm";

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

const ShowOfWarehouse = () => {
  const { warehouseId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  // const data=useSelector((state)=>state.WAREHOUSELIST);
  // console.log("Show--->", data.isError)

  const handleChange = (panel, type) => (event, isExpanded) => {
    if (isExpanded) {
      if (type === "wareUpdate") {
        dispatch(fetchWarehouseById(parseInt(warehouseId)));
      } else {
        dispatch(fetchWarehouseByIdAndType(warehouseId, type));
      }
    }
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    dispatch(fetchWarehouseById(warehouseId));
  }, [dispatch, warehouseId]);

  return (
    <VendorLayout>
      <div className="content-admin px-3">
        <div className="row justify-content-end align-items-center py-3 px-3 mx-0">
          <MenuDrawer />
          <div className="col-12 px-0">
            <div className="row">
              <div className="col-12 vendorAccordianStyle">
                <div className={classes.root}>
                  <h5 className="backButton mb-4">
                    <i
                      onClick={() => history.goBack()}
                      className="fas fa-chevron-left mr-3 cursorPointer"
                    ></i>
                    Warehouse Details
                  </h5>

                  {/* Create New Warehouse */}

                  <Accordion
                    expanded={expanded === "panel"}
                    onChange={handleChange("panel", "wareUpdate")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography className={classes.heading}>
                        {" "}
                        <span className="accord-heading">
                          1. Warehouse Details
                        </span>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <UpdateWarehouse viewMood={true} />
                    </AccordionDetails>
                  </Accordion>

                  {/* Contact Detail Form */}

                  <Accordion
                    expanded={expanded === "panel1"}
                    onChange={handleChange("panel1", "warehouseContactDetails")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography className={classes.heading}>
                        {" "}
                        <span className="accord-heading">
                          2. Warehouse Contact Details
                        </span>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {/* <ContactDetailForm/> */}
                      <UpdateContactDetailForm
                        warehouseId={warehouseId}
                        viewMood={true}
                      />
                    </AccordionDetails>
                  </Accordion>

                  {/* Another Form */}

                  <Accordion
                    expanded={expanded === "panel2"}
                    onChange={handleChange("panel2", "storageSpace")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography className={classes.heading}>
                        <span className="accord-heading">
                          3. Storage Space{" "}
                        </span>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <UpdateStorageSpaceForm viewMood={true} />
                      {/* <StorageSpaceForm /> */}
                    </AccordionDetails>
                  </Accordion>

                  {/* IT INFRA Form */}

                  <Accordion
                    expanded={expanded === "panel3"}
                    onChange={handleChange("panel3", "itInfrAndOfficeSpace")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography className={classes.heading}>
                        <span className="accord-heading">
                          4. IT & Office Infra
                        </span>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {/* <ITInfraForm /> */}
                      <UpdateITInfraForm
                        warehouseId={warehouseId}
                        viewMood={true}
                      />
                    </AccordionDetails>
                  </Accordion>

                  {/* MH Infra */}

                  <Accordion
                    expanded={expanded === "panel4"}
                    onChange={handleChange("panel4", "mhInfra")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography className={classes.heading}>
                        <span className="accord-heading">5. MH Infra</span>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {/* <MHInfraForm /> */}
                      <UpdateMHInfraForm viewMood={true} />
                    </AccordionDetails>
                  </Accordion>

                  {/* Safety Security Form */}

                  <Accordion
                    expanded={expanded === "panel5"}
                    onChange={handleChange("panel5", "safetyAndSecurity")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography className={classes.heading}>
                        <span className="accord-heading">
                          6. Safety Security Form
                        </span>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <SafetySecurityForm viewMood={true} />
                    </AccordionDetails>
                  </Accordion>

                  {/* Permit Form */}

                  <Accordion
                    expanded={expanded === "panel6"}
                    onChange={handleChange(
                      "panel6",
                      "buildingTradeRelatedPermit"
                    )}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography className={classes.heading}>
                        <span className="accord-heading">7. Permits</span>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails className="m-0 p-0">
                      <PermitForm warehouseId={warehouseId} viewMood={true} />
                    </AccordionDetails>
                  </Accordion>

                  {/* Material Type Form */}

                  <Accordion
                    expanded={expanded === "panel7"}
                    onChange={handleChange("panel7", "materialType")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography className={classes.heading}>
                        <span className="accord-heading">
                          8. Material Type{" "}
                        </span>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails className="m-0 p-0">
                      <MaterialTypeForm viewMood={true} />
                    </AccordionDetails>
                  </Accordion>

                  {/* Warehouse Photo Form */}

                  <Accordion
                    expanded={expanded === "panel8"}
                    onChange={handleChange("panel8", "warehouseImages")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography className={classes.heading}>
                        <span className="accord-heading">
                          9. Warehouse Photo
                        </span>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails className="m-0 p-0">
                      <WarehousePhotoForm warehouseId={warehouseId} />
                    </AccordionDetails>
                  </Accordion>

                  {/*  Form Eighty*/}

                  <Accordion
                    expanded={expanded === "panel10"}
                    onChange={handleChange("panel10", "formEighty")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography className={classes.heading}>
                        <span className="accord-heading">10. Form 80</span>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails className="m-0 p-0">
                      <FormEighty />
                    </AccordionDetails>
                  </Accordion>

                  {/* </>)
                  }  */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default ShowOfWarehouse;
