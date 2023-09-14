import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AdditionalRequirementsForm from './AdditionalRequirementsForm';
import KPIForm from './KPIForm';
import OtherServiceRequirementForm from './OtherServiceRequirementForm';
import ValueAddedServiceForm from './ValueAddedServiceForm';
import StorageTypeForm from './StorageTypeForm';
import InventoryManagementForm from './InventoryManagementForm';
import ReturnForm from './ReturnForm';
import ManPowerForm from './ManPowerForm';
import OutBoundForm from './OutBoundForm';
import InBoundForm from './InBoundForm';
import GeneralForm from './GeneralForm';
import ContactInformationForm from './ContactInformationForm';
import RFQForm from './RFQForm';
import {rfqById} from '../../../store/actions/customer/rfqAction'
import { useDispatch} from 'react-redux';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth:'100%',
      marginBottom:'5px',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
      padding:'15px'
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }));

const CreateRFQ = () => {
  const dispatch = useDispatch();
  const rfq_data = useSelector((state)=>state.CUSTOMER_RFQ_INFO);
  // console.log("RFQ===>", data)





  useEffect(() => {
    dispatch(rfqById(1))
  }, [dispatch]);


    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
  
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };


  return (
    <div>
      {/* Create New Warehouse */}
       <span className="accord-heading">Initial Information</span>
      <RFQForm />


      {/* Contact information */}
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
        >
            <Typography className={classes.heading}>  <span className="accord-heading">1. Contact Information</span></Typography>
        </AccordionSummary>
        <AccordionDetails>

            <ContactInformationForm isView={false} rfqdata={rfq_data.rfqFirstForm?.warehouses} />

        </AccordionDetails>
      </Accordion>

       {/* Contact information */}
       <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
        >
            <Typography className={classes.heading}>  <span className="accord-heading">2. General</span></Typography>
        </AccordionSummary>
        <AccordionDetails>

            <GeneralForm />

        </AccordionDetails>
      </Accordion>

      {/* Contact information */}
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
        >
            <Typography className={classes.heading}>  <span className="accord-heading">3. Inbound</span></Typography>
        </AccordionSummary>
        <AccordionDetails>

            <InBoundForm />

        </AccordionDetails>
      </Accordion>

       {/* OutBount */}
       <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
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
        <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
        >
            <Typography className={classes.heading}>  <span className="accord-heading">5. Man Power</span></Typography>
        </AccordionSummary>
        <AccordionDetails>

            <ManPowerForm />

        </AccordionDetails>
      </Accordion>

       {/* Return */}
       <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
        >
            <Typography className={classes.heading}>  <span className="accord-heading">6. Return</span></Typography>
        </AccordionSummary>
        <AccordionDetails>

            <ReturnForm />

        </AccordionDetails>
      </Accordion>

       {/* Inventory Management */}
       <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
        >
            <Typography className={classes.heading}>  <span className="accord-heading">7. Inventory Management</span></Typography>
        </AccordionSummary>
        <AccordionDetails>

       <InventoryManagementForm />

        </AccordionDetails>
      </Accordion>

      {/* Storage Type */}
      <Accordion expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
        >
            <Typography className={classes.heading}>  <span className="accord-heading">8. Storage Type</span></Typography>
        </AccordionSummary>
        <AccordionDetails>

        <StorageTypeForm />

        </AccordionDetails>
      </Accordion>

       {/* Value Added Service */}
       <Accordion expanded={expanded === 'panel10'} onChange={handleChange('panel10')}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
        >
            <Typography className={classes.heading}>  <span className="accord-heading">9. Value Added Service</span></Typography>
        </AccordionSummary>
        <AccordionDetails>

        <ValueAddedServiceForm />

        </AccordionDetails>
      </Accordion>

      {/* Other Service Requirement */}
      <Accordion expanded={expanded === 'panel11'} onChange={handleChange('panel11')}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
        >
            <Typography className={classes.heading}>  <span className="accord-heading">10. Other Service Requirement</span></Typography>
        </AccordionSummary>
        <AccordionDetails>

        <OtherServiceRequirementForm />

        </AccordionDetails>
      </Accordion>

      {/* Other Service Requirement */}
      <Accordion expanded={expanded === 'panel12'} onChange={handleChange('panel12')}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
        >
            <Typography className={classes.heading}>  <span className="accord-heading">11. KPI</span></Typography>
        </AccordionSummary>
        <AccordionDetails>

        <KPIForm />

        </AccordionDetails>
      </Accordion>

      {/* Additional Requirements */}
      <Accordion expanded={expanded === 'panel13'} onChange={handleChange('panel13')}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
        >
            <Typography className={classes.heading}>  <span className="accord-heading">12. Additional Requirements</span></Typography>
        </AccordionSummary>
        <AccordionDetails>

       <AdditionalRequirementsForm />

        </AccordionDetails>
      </Accordion>

    </div>
  );
}

export default CreateRFQ;
