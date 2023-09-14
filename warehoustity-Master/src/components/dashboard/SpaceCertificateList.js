import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Accordion from '@material-ui/core/Accordion';
// import AccordionDetails from '@material-ui/core/AccordionDetails';
// import AccordionSummary from '@material-ui/core/AccordionSummary';
// import Typography from '@material-ui/core/Typography';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import { useSelector, useDispatch } from 'react-redux';
// import { bookingByIdUserDocType, document_By_Id } from '../../store/actions/customer/documentAction';
import FormSuccess from '../../components/helper/FormSuccess';
// import { CardLoader } from '../helper/CustomLoader';
// import { accordian } from '../../store/actions/accordianAction';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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

const SpaceCertificateList = ({ val, docType, docFile, userType, srn }) => {

  const [res, setRes] = useState(null)
  // const dispatch = useDispatch();
  // const data = useSelector((state) => state.CUSTOMER_DOCUMENT);
  // const accData = useSelector((state) => state.ACCORDIAN_INFO);


  const classes = useStyles();

  return (
    <>
      {res ? <FormSuccess onClick={() => setRes(null)} message="Document Uploaded" /> : null}
      <div className={classes.root}>
        {/* <Accordion expanded={accData.isActive === srn} onChange={() => {

          if (accData.isActive === srn) {
            dispatch(accordian(null))
            return 0
          }
          dispatch(accordian(srn))

          if (val.bookingDocuments && val.bookingDocuments.length > 0) {
            dispatch(bookingByIdUserDocType(val.id, userType, val?.bookingDocuments[0].id, docType))
          } else {
            dispatch(document_By_Id({}))
          }
        }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >

            <Typography className={classes.heading}> Warehouse ID: <span className="font-heading">{val.warehouse.id}</span></Typography>
          </AccordionSummary>

          {data.isLoading ? <CardLoader loaderCard="loaderCard" /> :

            <AccordionDetails>

              <div className="row w-100">
                <div className="col-12 table-responsive table-row-border">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td className="w-320px">
                          Warehouse ID: <span className="font-heading">DL-{val?.warehouse?.id}</span>
                        </td>
                        <td>Space Certificate</td>
                        <td className="w-160px">
                          <Link to={`/customer-space-cetificate/${val?.id}`} className="btn btn-line-blue rounded-0 p-0 toggle-class" ><span className="h6 text-blue">View Certificate</span></Link>

                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </AccordionDetails>
          }
        </Accordion> */}

        <div className="row w-100 my-4">
                <div className="col-12 table-responsive table-row-border">
                  <table className="table bg-white">
                    <tbody>
                      <tr>
                        <td className="w-320px">
                          Warehouse ID: <span className="font-heading">{val?.warehouse?.warehouseId}</span>
                        </td>
                        <td>Space Certificate</td>
                        <td className="w-160px bg-warning">
                          <Link to={`/customer-space-cetificate/${val?.id}`} className="rounded-0 p-0 toggle-class" ><span className="h6 text-white">View Certificate</span></Link>

                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>



      </div>
    </>
  );
}

export default SpaceCertificateList;
