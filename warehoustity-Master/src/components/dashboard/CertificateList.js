import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { uploadWarehouseCertificate } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import {
  bookingByIdUserDocType,
  document_By_Id,
} from "../../store/actions/customer/documentAction";
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

function CertificateList({ val, docType, docFile, userType, srn }) {
  const [res, setRes] = useState(null);
  const [imageName, setImageName] = useState(null);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.CUSTOMER_DOCUMENT);
  const accData = useSelector((state) => state.ACCORDIAN_INFO);

  const classes = useStyles();
  const [doc, setDoc] = useState(null);

  const uploadDocs = async (e) => {
    setImageName(e.target.files[0].name);
    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("documentName", docType);
    formData.append("warehouse", val.warehouse.id);
    formData.append("booking", val.id);
    formData.append("userType", userType);
    let urlData = await uploadWarehouseCertificate(formData);
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
      <div className={classes.root}>
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
              <span className="font-heading">{val.warehouse.id}</span>
            </Typography>
          </AccordionSummary>

          {data.isLoading ? (
            <CardLoader loaderCard="loaderCard" />
          ) : (
            <AccordionDetails>
              <div className="row w-100">
                <div className="col-12 table-responsive table-row-border">
                  <table className="table mb-1">
                    <tbody>
                      <tr>
                        <td className="w-320px">
                          Warehouse ID:{" "}
                          <span className="font-heading">
                            DL-{val.warehouse.id}
                          </span>
                        </td>
                        <td>Sample Certificate</td>
                        <td className="w-160px">
                          <a
                            href={docFile}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-line-blue rounded-0 p-0 toggle-class"
                          >
                            <span className="h6 text-blue">
                              View Certificate
                            </span>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {data.documentDetail.bookingDocuments &&
                  data.documentDetail.bookingDocuments[0]?.customerDocument
                    ?.documents &&
                  data.documentDetail.bookingDocuments[0]?.customerDocument
                    ?.documents.length > 0 ? (
                    data.documentDetail.bookingDocuments[0].customerDocument.documents.map(
                      (item, index) => {
                        return (
                          <>
                            <table className="table mb-3">
                              <tbody>
                                <tr>
                                  <td className="w-320px">
                                    Warehouse ID:{" "}
                                    <span className="font-heading">
                                      DL-{val.warehouse.id}
                                    </span>
                                  </td>
                                  <td>Signed Certificate</td>
                                  <td className="w-160px">
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
                                                // a.download = 'Certificate';
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
                                                fetch(doc.url).then(
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
                                                        // a.download = 'Certificate';
                                                        a.click();
                                                      });
                                                  }
                                                );
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
                                      </>
                                    )}

                                    <span className="oneLineText">
                                      {imageName
                                        ? imageName.substring(0, 10)
                                        : ""}
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>

                            {/* Admin Signed */}
                            {item?.signedCertificateWarehousity ? (
                              <table key={index} className="table mb-3">
                                <tbody>
                                  <tr>
                                    <td className="w-320px">
                                      Warehouse ID:{" "}
                                      <span className="font-heading">
                                        DL-{val.warehouse.id}
                                      </span>
                                    </td>
                                    <td>Signed Certificate from Warehousity</td>
                                    <td className="w-160px">
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
                                                  // a.download = 'Certificate';
                                                  a.click();
                                                });
                                              });
                                            }}
                                            //  download = ""

                                            className="btn btn-line-blue rounded-0 p-0 toggle-class"
                                          >
                                            <span className="h6 text-blue">
                                              View Certificate
                                            </span>
                                          </a>
                                        </>
                                      ) : null}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            ) : null}
                          </>
                        );
                      }
                    )
                  ) : (
                    <table className="table mb-3">
                      <tbody>
                        <tr>
                          <td className="w-320px">
                            Warehouse ID:{" "}
                            <span className="font-heading">
                              DL-{val.warehouse.id}
                            </span>
                          </td>
                          <td>Signed Certificate</td>
                          <td className="w-160px">
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
                                        a.target = "_blank";
                                        // a.download = 'Certificate';
                                        a.click();
                                      });
                                    });
                                  }}
                                  //  download = ""

                                  // href={doc.url} download target="_blank" rel="noopener noreferrer"
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
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </AccordionDetails>
          )}
        </Accordion>
      </div>
    </>
  );
}

export default CertificateList;
