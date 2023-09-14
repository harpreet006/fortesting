import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AdditionalRequirementsForm from "./AdditionalRequirementsForm";
import KPIForm from "./KPIForm";
import OtherServiceRequirementForm from "./OtherServiceRequirementForm";
// import ValueAddedServiceForm from "./ValueAddedServiceForm";
import StorageTypeForm from "./StorageTypeForm";
import InventoryManagementForm from "./InventoryManagementForm";
// import ReturnForm from "./ReturnForm";
// import ManPowerForm from "./ManPowerForm";
import OutBoundForm from "./OutBoundForm";
import InBoundForm from "./InBoundForm";
import GeneralForm from "./GeneralForm";
import ContactInformationForm from "./ContactInformationForm";
import RFQForm from "./RFQForm";
import {
  finalRfq,
  responseRfq,
  initialRfqByIdAndType,
} from "../../../store/actions/customer/rfqAction";
import { useSelector, useDispatch } from "react-redux";
import FormSuccess from "../../../components/helper/FormSuccess";
import { confirmAlert } from "react-confirm-alert";
import { useHistory } from "react-router";

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



const CreateRFQ = () => {
  const history = useHistory();
  
  const data = useSelector((state) => state.CUSTOMER_RFQ_INFO);
  console.log("new",data)
  const dispatch = useDispatch();

  const rfqid = new URLSearchParams(window.location.search).get("rfqid");
  console.log("params",rfqid)
  console.log("kk",window.location.search)
  // useEffect(() => {
  //   if (data.rfqInitialDetail && data.rfqInitialDetail.length !== 0 && data.rfqInitialDetail.warehouseSpaceRequired !== null) {

  //     setState({
  //       "warehouseSpaceRequired": data.rfqInitialDetail.warehouseSpaceRequired,
  //       "customerRfqFormFilled": true
  //     })
  //     setRfqId(data)
  //   }

  // }, [data]);

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel, type) => (event, isExpanded) => {
    if (rfqid) {
      dispatch(initialRfqByIdAndType(parseInt(rfqid), type,data?.rfqFirstForm?.warehouses));
    }
    setExpanded(isExpanded ? panel : false);
  };

  // Status Change confirmation
  const statusChange = () => {
    // dispatch(initialRfqByIdAndType(parseInt(rfqid), "contactInformation"))
    confirmAlert({
      // title: 'Confirm to submit',
      message: "Are you sure to do final submit.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(
              finalRfq(
                {
                  warehouseSpaceRequired: 0,
                  customerRfqFormFilled: false,
                },
                rfqid
              )
            );
          },
        },
        {
          label: "No",
          onClick: () => console.log("--No--"),
        },
      ],
    });
  };

  const redirect = () => {
    console.log("Redirect");
    dispatch({ payload: {}, type: "INITIAL_EMPTY" });
    dispatch(responseRfq([]));
    history.push("/managerfq?page=1");
  };

  useEffect(() => {
    if (rfqid) {
      console.log("times")
      dispatch(initialRfqByIdAndType(rfqid, "customerRfq",data?.rfqFirstForm?.warehouses));
    }
  }, [dispatch]);

  return (
    <div>
      {data.rfqResponse.statusCode === 200 ||
      data.rfqResponse.statusCode === 201 ? (
        <FormSuccess
          onClick={() => dispatch(responseRfq([]))}
          message={data.rfqResponse.message}
        />
      ) : null}

      {data.rfqResponse.statusCode === 308 ? (
        <FormSuccess onClick={redirect} message={data.rfqResponse.message} />
      ) : null}

      {/* Create New Warehouse */}
      <span className="accord-heading">Initial Information</span>
      <RFQForm />

      {/* Contact information */}
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2", "contactInformation")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>
            {" "}
            <span className="accord-heading">1. Contact Information</span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ContactInformationForm rfqid={rfqid} isView={false} rfqdata={data.rfqFirstForm?.warehouses} />
        </AccordionDetails>
      </Accordion>

      {/* Contact information */}
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3", "general")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>
            {" "}
            <span className="accord-heading">2. General</span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <GeneralForm rfqid={rfqid} />
        </AccordionDetails>
      </Accordion>

      {/* Contact information */}
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4", "inbounds")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>
            {" "}
            <span className="accord-heading">3. Inbound</span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <InBoundForm rfqid={rfqid} />
        </AccordionDetails>
      </Accordion>

      {/* OutBount */}
      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5", "outbounds")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>
            {" "}
            <span className="accord-heading">4. Outbound</span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <OutBoundForm rfqid={rfqid} />
        </AccordionDetails>
      </Accordion>

      {/* Man Power */}
      {/* <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6', 'manPowers')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>  <span className="accord-heading">5. Man Power</span></Typography>
        </AccordionSummary>
        <AccordionDetails>

          <ManPowerForm rfqid={rfqid} />

        </AccordionDetails>
      </Accordion> */}

      {/* Return */}
      {/* <Accordion
        expanded={expanded === "panel7"}
        onChange={handleChange("panel7", "returnRfq")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>
            {" "}
            <span className="accord-heading">6. Return</span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ReturnForm rfqid={rfqid} />
        </AccordionDetails>
      </Accordion> */}

      {/* Inventory Management */}
      <Accordion
        expanded={expanded === "panel8"}
        onChange={handleChange("panel8", "inventoryManagements")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>
            {" "}
            <span className="accord-heading">5. Inventory Management</span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <InventoryManagementForm rfqid={rfqid} />
        </AccordionDetails>
      </Accordion>

      {/* Storage Type */}
      <Accordion
        expanded={expanded === "panel9"}
        onChange={handleChange("panel9", "storageTypes")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>
            {" "}
            <span className="accord-heading">6. Storage Type</span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <StorageTypeForm rfqid={rfqid} />
        </AccordionDetails>
      </Accordion>

      {/* Value Added Service */}
      {/* <Accordion
        expanded={expanded === "panel10"}
        onChange={handleChange("panel10", "valueAddedServices")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>
            {" "}
            <span className="accord-heading">9. Value Added Service</span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ValueAddedServiceForm rfqid={rfqid} />
        </AccordionDetails>
      </Accordion> */}

      {/* Other Service Requirement */}
      <Accordion
        expanded={expanded === "panel11"}
        onChange={handleChange("panel11", "otherServiceRequirements")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>
            {" "}
            <span className="accord-heading">
              7. Other Service Requirement
            </span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <OtherServiceRequirementForm rfqid={rfqid} />
        </AccordionDetails>
      </Accordion>

      {/* Other Service Requirement */}
      <Accordion
        expanded={expanded === "panel12"}
        onChange={handleChange("panel12", "kpi")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>
            {" "}
            <span className="accord-heading">8. KPI</span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <KPIForm rfqid={rfqid} />
        </AccordionDetails>
      </Accordion>

      {/* Additional Requirements */}
      <Accordion
        expanded={expanded === "panel13"}
        onChange={handleChange("panel13", "additionalRequirement")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>
            {" "}
            <span className="accord-heading">9. Additional Requirements</span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AdditionalRequirementsForm rfqid={rfqid} />
        </AccordionDetails>
      </Accordion>

      <div className="row justify-content-end">
        <div className="col-auto">
          <button
            onClick={statusChange}
            disabled={
              !data.rfqInitialDetail?.additionalRequirement ? false : true
            }
            className="btn btn-deep-primary mb-3 mt-4 add-class remove-class"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRFQ;
