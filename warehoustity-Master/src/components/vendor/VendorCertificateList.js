import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { uploadWarehouseCertificate } from "../utils";
import {
  bookingByIdUserDocType,
  document_By_Id,
} from "../../store/actions/customer/documentAction";
import { useSelector, useDispatch } from "react-redux";
import FormSuccess from "../../components/helper/FormSuccess";
import { CardLoader } from "../helper/CustomLoader";
import { accordian } from "../../store/actions/accordianAction";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
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

const SpaceCertificate = ({ val, docType, docFile, userType, srn }) => {
  const classes = useStyles();
  const [doc, setDoc] = useState(null);
  const [res, setRes] = useState(null);
  const [imageName, setImageName] = useState(null);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.CUSTOMER_DOCUMENT);
  const accData = useSelector((state) => state.ACCORDIAN_INFO);

  const uploadDocs = async (e) => {
    setImageName(e.target.files[0].name);
    let formData = new FormData();

    formData.append("file", e.target.files[0]);
    formData.append("documentName", docType);
    formData.append("warehouse", val.warehouse.id); // id change 4 to dynamic
    formData.append("booking", val.id);
    formData.append("userType", userType);
    let urlData = await uploadWarehouseCertificate(formData);
    console.log("urlData==>", urlData);
    setDoc(urlData);
    setRes(urlData);
  };

  useEffect(() => {
    dispatch(accordian(null));
  }, [dispatch]);

  const redirect = () => {
    if (val.bookingDocuments && val.bookingDocuments.length > 0) {
      dispatch(
        bookingByIdUserDocType(
          val.id,
          userType,
          val?.bookingDocuments[0].id,
          docType
        )
      );
    }
    setRes(null);
  };

  return (
    <>
      {res ? (
        <FormSuccess onClick={redirect} message="Document Uploaded" />
      ) : null}

     <div className="bg-white p-3">
     <div className={`${classes.root} vendorAccordianStyle`}>
        <Accordion
          expanded={accData.isActive === srn}
          onChange={() => {
            if (accData.isActive === srn) {
              dispatch(accordian(null));
              return 0;
            }
            dispatch(accordian(srn));

            if (val.bookingDocuments && val.bookingDocuments.length > 0) {
              dispatch(
                bookingByIdUserDocType(
                  val.id,
                  userType,
                  val?.bookingDocuments[0].id,
                  docType
                )
              );
            } else {
              dispatch(document_By_Id({}));
            }
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>
              {" "}
              Warehouse ID:{" "}
              <span className="font-heading">{val.warehouse?.warehouseId}</span>
            </Typography>
          </AccordionSummary>

          {data.isLoading ? (
            <CardLoader loaderCard="loaderCard" />
          ) : (
            <AccordionDetails>
              <div className="col-12 table-responsive table-row-margin-bottom-admin">
                <table className="table listTable">
                  <tbody>
                    <tr>
                      <td className="mw-250px w-250px">
                        {" "}
                        Warehouse ID:{" "}
                        <span className="font-heading">
                          {val.warehouse?.warehouseId}
                        </span>{" "}
                      </td>
                      <td className="col">Sample Certificate</td>
                      <td>
                        <a
                          href={docFile}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-line-deep-blue rounded-0 px-2 py-2 text-nowrap"
                        >
                          <span className="h6 text-deep-blue">
                            View Certificate
                          </span>
                        </a>
                      </td>
                    </tr>

                    {data.documentDetail.bookingDocuments &&
                    data.documentDetail.bookingDocuments[0]?.vendorDocument
                      ?.documents &&
                    data.documentDetail.bookingDocuments[0]?.vendorDocument
                      ?.documents.length > 0 ? (
                      data.documentDetail.bookingDocuments[0].vendorDocument.documents.map(
                        (item, index) => {
                          return (
                            <>
                              <tr>
                                <td className="mw-250px w-250px">
                                  {" "}
                                  Warehouse ID:{" "}
                                  <span className="font-heading">
                                    {val.warehouse?.warehouseId}
                                  </span>{" "}
                                </td>
                                <td className="col">Signed Certificate</td>
                                <td>
                                  <input
                                    onChange={uploadDocs}
                                    id={`docs${val.warehouse.id}`}
                                    type="file"
                                    hidden
                                  />
                                  <label
                                    htmlFor={`docs${val.warehouse.id}`}
                                    className="btn py-0 px-3 toggle-class"
                                    data-target=".download-certificate"
                                    data-toggle-class="d-none"
                                  >
                                    <span className="h6">
                                      <i className="fas fa-upload"></i>
                                    </span>
                                  </label>
                                  {item.url !== "" ? (
                                    <>
                                      {/*  eslint-disable-next-line */}
                                      <a
                                        onClick={() => {
                                          fetch(item.url).then((response) => {
                                            response.blob().then((blob) => {
                                              let url =
                                                window.URL.createObjectURL(
                                                  blob
                                                );
                                              let a =
                                                document.createElement("a");
                                              a.href = url;
                                              a.target = "_blank";
                                              // a.download = 'documents';
                                              a.click();
                                            });
                                          });
                                        }}
                                        download=""
                                        className="btn py-0 px-3 toggle-class"
                                      >
                                        <span className="h6">
                                          <i className="fas fa-eye"></i>
                                        </span>
                                      </a>
                                    </>
                                  ) : (
                                    <>
                                      {doc && doc.success ? (
                                        <>
                                          {/*  eslint-disable-next-line */}
                                          <a
                                            onClick={() => {
                                              fetch(item.url).then(
                                                (response) => {
                                                  response
                                                    .blob()
                                                    .then((blob) => {
                                                      let url =
                                                        window.URL.createObjectURL(
                                                          blob
                                                        );
                                                      let a =
                                                        document.createElement(
                                                          "a"
                                                        );
                                                      a.href = url;
                                                      a.target = "_blank";
                                                      // a.download = 'documents';
                                                      a.click();
                                                    });
                                                }
                                              );
                                            }}
                                            //  download=""
                                            className="btn py-0 px-3 toggle-class"
                                          >
                                            <span className="h6">
                                              <i className="fas fa-eye"></i>
                                            </span>
                                          </a>
                                        </>
                                      ) : null}
                                    </>
                                  )}
                                  <span className="oneLineText">
                                    {imageName
                                      ? imageName.substring(0, 10)
                                      : ""}
                                  </span>
                                </td>
                              </tr>

                              {item?.signedCertificateWarehousity ? (
                                <tr>
                                  <td className="mw-250px">
                                    {" "}
                                    Warehouse ID:{" "}
                                    <span className="font-heading">
                                      {val.warehouse?.warehouseId}
                                    </span>{" "}
                                  </td>
                                  <td className="col">
                                    Signed Certificate from Warehousity
                                  </td>
                                  <td>
                                    {item?.signedCertificateWarehousity ? (
                                      <>
                                        {/*  eslint-disable-next-line */}
                                        <a
                                          onClick={() => {
                                            fetch(
                                              item.signedCertificateWarehousity
                                            ).then((response) => {
                                              response.blob().then((blob) => {
                                                let url =
                                                  window.URL.createObjectURL(
                                                    blob
                                                  );
                                                let a =
                                                  document.createElement("a");
                                                a.href = url;
                                                a.target = "_blank";
                                                // a.download = 'documents';
                                                a.click();
                                              });
                                            });
                                          }}
                                          // download=""
                                          className="btn btn-line-deep-blue rounded-0 px-2 py-2 text-nowrap"
                                        >
                                          <span className="h6 text-deep-blue">
                                            View Certificate
                                          </span>
                                        </a>
                                      </>
                                    ) : null}
                                  </td>
                                </tr>
                              ) : null}
                            </>
                          );
                        }
                      )
                    ) : (
                      <tr>
                        <td className="mw-250px w-250px">
                          {" "}
                          Warehouse ID:{" "}
                          <span className="font-heading">
                            {val.warehouse.warehouseId}
                          </span>{" "}
                        </td>
                        <td className="col">Signed Certificate</td>
                        <td>
                          <input
                            onChange={uploadDocs}
                            id={`docs${val.warehouse.id}`}
                            type="file"
                            hidden
                          />
                          <label
                            htmlFor={`docs${val.warehouse.id}`}
                            className="btn py-0 px-3 toggle-class"
                            data-target=".download-certificate"
                            data-toggle-class="d-none"
                          >
                            <span className="h6">
                              <i className="fas fa-upload"></i>
                            </span>
                          </label>

                          {doc && doc.success ? (
                            <>
                              {/*  eslint-disable-next-line */}
                              <a
                                onClick={() => {
                                  fetch(doc.url).then((response) => {
                                    response.blob().then((blob) => {
                                      let url =
                                        window.URL.createObjectURL(blob);
                                      let a = document.createElement("a");
                                      a.href = url;
                                      // a.download = 'documents';
                                      a.target = "_blank";
                                      a.click();
                                    });
                                  });
                                }}
                                //  download = ""
                                className="btn py-0 px-3 toggle-class"
                              >
                                <span className="h6">
                                  <i className="fas fa-eye"></i>
                                </span>
                              </a>
                            </>
                          ) : null}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </AccordionDetails>
          )}
        </Accordion>
      </div>
     </div>
    </>
  );
};

export default SpaceCertificate;
