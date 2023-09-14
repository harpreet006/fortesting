import React, { useEffect } from 'react';
import Layout from '../../../layout/Layout';
import { useHistory } from 'react-router-dom';
import CustomerLayout from '../../../layout/CustomerLayout';

import BrowserTitle from '../../../components/helper/BrowserTitle';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AdditionalRequirementsForm from '../../../wrapper/customer/rfq/customerRFQFormView/AdditionalRequirementsForm';
import KPIForm from '../../../wrapper/customer/rfq/customerRFQFormView/KPIForm';
import OtherServiceRequirementForm from '../../../wrapper/customer/rfq/customerRFQFormView/OtherServiceRequirementForm';
import ValueAddedServiceForm from '../../../wrapper/customer/rfq/customerRFQFormView/ValueAddedServiceForm';
import StorageTypeForm from '../../../wrapper/customer/rfq/customerRFQFormView/StorageTypeForm';
import InventoryManagementForm from '../../../wrapper/customer/rfq/customerRFQFormView/InventoryManagementForm';
import ReturnForm from '../../../wrapper/customer/rfq/customerRFQFormView/ReturnForm';
import ManPowerForm from '../../../wrapper/customer/rfq/customerRFQFormView/ManPowerForm';
import OutBoundForm from '../../../wrapper/customer/rfq/customerRFQFormView/OutBoundForm';
import InBoundForm from '../../../wrapper/customer/rfq/customerRFQFormView/InBoundForm';
import GeneralForm from '../../../wrapper/customer/rfq/customerRFQFormView/GeneralForm';
import RFQForm from '../../../wrapper/customer/rfq/customerRFQFormView/RFQForm';
import ContactInformationForm from '../../../wrapper/customer/rfq/customerRFQFormView/ContactInformationForm';
import { viewRfqByIdAndType } from '../../../store/actions/customer/rfqAction'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    marginBottom: '5px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    padding: '15px'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));


const CustomerRFQDetails = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.CUSTOMER_RFQ_INFO);
  const { rfqId, warehouseId } = useParams();

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel, type) => (event, isExpanded) => {
    dispatch(viewRfqByIdAndType(rfqId, type))
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    dispatch(viewRfqByIdAndType(rfqId, "contactInformation"))
  }, [dispatch, rfqId])
  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });
  return (
    <Layout>
      <BrowserTitle title="RFQ" />
      <CustomerLayout title={`RFQ`}>

        <div className="row">
          <div className="content col-12">
            <div className="border-bottom mb-3">
              <button
                className="btn name-breadcrumb px-0 text-dark font-heading mr-3">
                <i
                  onClick={() => history.goBack()}
                  className="fas fa-chevron-left pr-3"
                ></i>
                VIEW CUSTOMER RFQ DOCUMENTS</button>
            </div>

            <div>
              {/* Create New Warehouse */}
              <span className="accord-heading">Initial Information</span>
              <RFQForm warehouseId={warehouseId} isView={true} />

              {/* Contact information */}

              <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2', 'contactInformation')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography className={classes.heading}>  <span className="accord-heading">1. Contact Information</span></Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ContactInformationForm isView={true} rfqdata={data.rfqFirstForm?.warehouses} />
                </AccordionDetails>
              </Accordion>


              {/* General information */}

              <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3', 'general')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography className={classes.heading}>  <span className="accord-heading">2. General</span></Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <GeneralForm isView={true} />
                </AccordionDetails>
              </Accordion>


              {/* Inbound */}
              <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4', 'inbounds')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography className={classes.heading}>  <span className="accord-heading">3. Inbound</span></Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <InBoundForm isView={true} />
                </AccordionDetails>
              </Accordion>


              {/* OutBount */}
              <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5', 'outbounds')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography className={classes.heading}>  <span className="accord-heading">4. Outbound</span></Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <OutBoundForm />
                </AccordionDetails>
              </Accordion>


              {/* Man Power */}
              <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6', 'manPowers')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography className={classes.heading}>  <span className="accord-heading">5. Man Power</span></Typography>
                </AccordionSummary>
                <AccordionDetails>

                  <ManPowerForm isView={true} />

                </AccordionDetails>
              </Accordion>


              {/* Return */}

              <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7', 'returnRfq')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography className={classes.heading}>  <span className="accord-heading">6. Return</span></Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ReturnForm isView={true} />
                </AccordionDetails>
              </Accordion>


              {/* Inventory Management */}

              <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8', 'inventoryManagements')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography className={classes.heading}>  <span className="accord-heading">7. Inventory Management</span></Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <InventoryManagementForm isView={true} />
                </AccordionDetails>
              </Accordion>


              {/* Storage Type */}

              <Accordion expanded={expanded === 'panel9'} onChange={handleChange('panel9', 'storageTypes')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography className={classes.heading}>  <span className="accord-heading">8. Storage Type</span></Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <StorageTypeForm isView={true} />
                </AccordionDetails>
              </Accordion>

              {/* Value Added Service */}
              <Accordion expanded={expanded === 'panel10'} onChange={handleChange('panel10', 'valueAddedServices')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography className={classes.heading}>  <span className="accord-heading">9. Value Added Service</span></Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ValueAddedServiceForm isView={true} />
                </AccordionDetails>
              </Accordion>


              {/* Other Service Requirement */}

              <Accordion expanded={expanded === 'panel11'} onChange={handleChange('panel11', 'otherServiceRequirements')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography className={classes.heading}>  <span className="accord-heading">10. Other Service Requirement</span></Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <OtherServiceRequirementForm data={data.rfqDetail.otherServiceRequirements} isView={true} />
                </AccordionDetails>
              </Accordion>


              {/* kPI */}
              <Accordion expanded={expanded === 'panel12'} onChange={handleChange('panel12', 'kpi')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography className={classes.heading}>  <span className="accord-heading">11. KPI</span></Typography>
                </AccordionSummary>
                <AccordionDetails>

                  <KPIForm isView={true} />

                </AccordionDetails>
              </Accordion>

              {/* Additional Requirements */}
              <Accordion expanded={expanded === 'panel13'} onChange={handleChange('panel13', 'additionalRequirement')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography className={classes.heading}>  <span className="accord-heading">12. Additional Requirements</span></Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <AdditionalRequirementsForm isView={true} />
                </AccordionDetails>
              </Accordion>

            </div>

          </div>
        </div>
      </CustomerLayout>
    </Layout>
  );
}

export default CustomerRFQDetails;
