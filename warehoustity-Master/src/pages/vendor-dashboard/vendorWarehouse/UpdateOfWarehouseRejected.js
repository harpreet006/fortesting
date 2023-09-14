import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import VendorLayout from "../../../layout/VendorLayout";
import MenuDrawer from "../../../components/vendor/MenuDrawer";
import UpdateITInfraForm from "../../../components/vendor/warehouseForm/UpdateItInfraFormRejected";
import SafetySecurityForm from "../../../components/vendor/warehouseForm/SafetySecurityFormRejected";
import PermitForm from "../../../components/vendor/warehouseForm/PermitFormRejected";
import MaterialTypeForm from "../../../components/vendor/warehouseForm/MaterialTypeFormRejected";
import WarehousePhotoForm from "../../../components/vendor/warehouseForm/WarehousePhotoFormRejected";
import FormEighty from "../../../components/vendor/warehouseForm/FormEightyRejected";
import UpdateWarehouse from "../../../components/vendor/warehouseForm/UpdateWarehouseRejected";
import {
  fetchWarehouseByIdAndType,
  fetchWarehouseById,
  updateWarehouseStatus,
  changeWarehouseStatus,
} from "../../../store/actions/vendor/warehouseList";
import { useDispatch, useSelector } from "react-redux";
import UpdateMHInfraForm from "../../../components/vendor/warehouseForm/UpdateMHInfraFormRejected";
import UpdateContactDetailForm from "../../../components/vendor/warehouseForm/UpdateContactDetailFormRejected";
import UpdateStorageSpaceForm from "../../../components/vendor/warehouseForm/UpdateStorageSpaceFormRejected";
import Spinner from "react-bootstrap/Spinner";
import FormSuccess from "../../../components/helper/FormSuccess";

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

const UpdateOfWarehouse = () => {
  const { warehouseId } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  const data = useSelector((state) => state.WAREHOUSELIST);
  // console.log("warehouse--->", data)

  const handleChange = (panel, type) => (event, isExpanded) => {
    if (isExpanded) {
      if (type === "wareUpdate") {
        dispatch(fetchWarehouseById(parseInt(warehouseId)));
      } else {
        dispatch(fetchWarehouseByIdAndType(warehouseId, type));
      }
    }

    setExpanded(isExpanded ? panel : false);

    // console.log("status--->", )
  };

  useEffect(() => {
    dispatch(fetchWarehouseById(parseInt(warehouseId)));
  }, [warehouseId, dispatch]);
  return (
    <VendorLayout>
      {data.finalSubmit ? (
        <FormSuccess
          onClick={() => {
            dispatch(changeWarehouseStatus());
            history.replace(`/vendor/mywarehouse?page=1`);
          }}
          message="your submission has been send for approvel. We will respond to you very soon"
        />
      ) : null}

      <div className="content-admin px-2">
       
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
                    Update Your Warehouse
                  </h5>

                  {/* Loader */}

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
                          1. Update Warehouse
                        </span>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <UpdateWarehouse viewMood={false} />
                    </AccordionDetails>
                  </Accordion>

                  {/* Contact Detail Form */}

                  <Accordion
                    // expanded={(expanded !== 'panel1')}
                    expanded={
                      (expanded === "panel1" &&
                        data.warehouseDetail.warehouseContactDetail !==
                          false) ||
                      (data.warehouseDetail.warehouseName !== "" &&
                        data.warehouseDetail.warehouseContactDetail === false)
                    }
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
                        viewMood={false}
                      />
                    </AccordionDetails>
                  </Accordion>

                  {/* Another Form */}

                  <Accordion
                    expanded={
                      (expanded === "panel2" &&
                        data.warehouseDetail.storageSpace !== false) ||
                      (data.warehouseDetail.warehouseContactDetail === true &&
                        data.warehouseDetail.storageSpace === false)
                    }
                    // expanded={(expanded !== (('panel2' && data.warehouseDetail.warehouseContactDetail===true) || (data.warehouseDetail.storageSpace ===false && data.warehouseDetail.warehouseContactDetail ===true)))}
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
                      {/* <StorageSpaceForm /> */}
                      <UpdateStorageSpaceForm viewMood={false} />
                    </AccordionDetails>
                  </Accordion>

                  {/* IT INFRA Form */}

                  <Accordion
                    expanded={
                      (expanded === "panel3" &&
                        data.warehouseDetail.itAndOfficeInfra !== false) ||
                      (data.warehouseDetail.storageSpace === true &&
                        data.warehouseDetail.itAndOfficeInfra === false)
                    }
                    // expanded={(expanded !== 'panel3' && data.warehouseDetail.itAndOfficeInfra !==false) || ((data.warehouseDetail.storageSpace ===true) && data.warehouseDetail.itAndOfficeInfra ===false)}
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
                        viewMood={false}
                      />
                    </AccordionDetails>
                  </Accordion>

                  {/* MH Infra */}

                  <Accordion
                    // expanded={(expanded !== 'panel4')}
                    expanded={
                      (expanded === "panel4" &&
                        data.warehouseDetail.mhInfra !== false) ||
                      (data.warehouseDetail.itAndOfficeInfra === true &&
                        data.warehouseDetail.mhInfra === false)
                    }
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
                      <UpdateMHInfraForm viewMood={false} />
                    </AccordionDetails>
                  </Accordion>

                  {/* Safety Security Form */}

                  <Accordion
                    expanded={
                      (expanded === "panel5" &&
                        data.warehouseDetail.safetyAndSecurity !== false) ||
                      (data.warehouseDetail.mhInfra === true &&
                        data.warehouseDetail.safetyAndSecurity === false)
                    }
                    // expanded={(expanded !== 'panel5')}
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
                      <SafetySecurityForm viewMood={false} />
                    </AccordionDetails>
                  </Accordion>

                  {/* Permit Form */}

                  <Accordion
                    // expanded={(expanded !== 'panel6')}
                    expanded={
                      (expanded === "panel6" &&
                        data.warehouseDetail.permit !== false) ||
                      (data.warehouseDetail.safetyAndSecurity === true &&
                        data.warehouseDetail.permit === false)
                    }
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
                      <PermitForm warehouseId={warehouseId} viewMood={false} />
                    </AccordionDetails>
                  </Accordion>

                  {/* Material Type Form */}

                  <Accordion
                    // expanded={(expanded !== 'panel7')}
                    expanded={
                      (expanded === "panel7" &&
                        data.warehouseDetail.materialType !== false) ||
                      (data.warehouseDetail.permit === true &&
                        data.warehouseDetail.materialType === false)
                    }
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
                      <MaterialTypeForm viewMood={false} />
                    </AccordionDetails>
                  </Accordion>

                  {/*  Photo Form */}

                  <Accordion
                    expanded={
                      (expanded === "panel8" &&
                        data.warehouseDetail.warehouseImages !== false) ||
                      (data.warehouseDetail.materialType === true &&
                        data.warehouseDetail.warehouseImages === false)
                    }
                    //  expanded={expanded !== 'panel8'}
                    // eslint-disable-next-line
                    // expanded={(expanded === 'panel8')}
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

                  {/* <Accordion 
                  //  expanded={(expanded !== 'panel8' && data.warehouseDetail.warehouseImages !== false) || ((data.warehouseDetail.materialType === true) && data.warehouseDetail.warehouseImages === false)}
                   expanded={expanded !== 'panel8'} 
                   onChange={handleChange('panel8')}>
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

                  <Accordion
                    // expanded={(expanded !== 'panel10')}
                    expanded={
                      (expanded === "panel10" &&
                        data.warehouseDetail.formEighty !== false) ||
                      (data.warehouseDetail.warehouseImages === true &&
                        data.warehouseDetail.formEighty === false)
                    }
                    // expanded={(expanded !== 'panel10')}
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
                  <div className="col-12 my-4">
                    <div className="row justify-content-end">
                      <div className="col-auto"></div>
                      <div className="col-auto">
                        <button
                          type="button"
                          onClick={() =>
                            dispatch(
                              updateWarehouseStatus(warehouseId, {
                                status: "PENDINGFORAPPROVAL",
                              })
                            )
                          }
                          className="btn btn-deep-blue add-className remove-className"
                          disabled={
                            data.isPending ||
                            data.warehouseDetail.formEighty === false
                          }
                        >
                          Submit
                          {data.warehouseDetail.formEighty === true ? (
                            data.isPending && data.finalSubmit ? (
                              <Spinner animation="border" />
                            ) : null
                          ) : null}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* </>)
                  } */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ====================== */}
      </div>
    </VendorLayout>
  );
};

export default UpdateOfWarehouse;
