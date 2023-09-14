import React, { useState,useEffect } from "react";
import { uploadWarehouseCertificate } from "../../../components/utils";
import FormSuccess from "../../../components/helper/FormSuccess";
// import { CardLoader } from "../helper/CustomLoader";
import {
  getAllDocument,
} from "../../../store/actions/customer/documentAction";
import {  useDispatch } from "react-redux";

const DocList = ({ docType, userType, val }) => {
  const dispatch = useDispatch();

  const [doc, setDoc] = useState(null);
  const [res, setRes] = useState(null);
  const [imageName, setImageName] = useState(null);

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
    dispatch(getAllDocument("customer", 1, docType));

  };
  const[docContainer,setdocContainer]=useState("")



    useEffect(()=>{
      let docConta =
      val.bookingDocuments[0]?.customerDocument?.documents[0] || "";
      setdocContainer(docConta)

    },[val])
  const redirect = () => {
    // if (val.bookingDocuments && val.bookingDocuments.length > 0) {
    //   dispatch(
    //     bookingByIdUserDocType(
    //       val.id,
    //       userType,
    //       val?.bookingDocuments[0].id,
    //       docType
    //     )
    //   );
    // }
    setRes(null);
  };

  return (
    <>

      {res && <FormSuccess onClick={redirect} message="Document Uploaded" />}

      <tr>
        <td>{val.warehouse.warehouseId}</td>
        <td>
          <a
            href="/assets/documents/Customer_Warehousity_Agreement Offline - 04Feb20 V1.doc"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="btn rounded-0 p-0"
          >
            <span className="h6">
              <i className="fas fa-eye"></i>
            </span>
          </a>
        </td>
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
          {docContainer !== "" ? (
            <>
              {/*  eslint-disable-next-line */}
              <a
              href={docContainer.url}
              target = "_blank"
              rel="noopener noreferrer"

                // onClick={() => {
                //   fetch(docContainer.url).then((response) => {
                //     response.blob().then((blob) => {
                //       let url = window.URL.createObjectURL(blob);
                //       let a = document.createElement("a");
                //       a.href = url;
                //       a.target = "_blank";
                //       // a.download = 'Certificate';
                //       a.click();
                //     });
                //   });
                // }}
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
                  href={doc.url}
                  target = "_blank"
                  rel="noopener noreferrer" 
                    // onClick={() => {
                    //   fetch(doc.url).then((response) => {
                    //     response.blob().then((blob) => {
                    //       let url = window.URL.createObjectURL(blob);
                    //       let a = document.createElement("a");
                    //       a.href = url;
                    //       a.target = "_blank";
                    //       // a.download = 'Certificate';
                    //       a.click();
                    //     });
                    //   });
                    // }}
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
            {imageName ? imageName.substring(0, 10) : ""}
          </span>
        </td>
        <td>
          {docContainer.signedCertificateWarehousity ?
            <>
              {/*  eslint-disable-next-line */}
              <a
                onClick={() => {
                  fetch(docContainer.signedCertificateWarehousity).then(
                    (response) => {
                      response.blob().then((blob) => {
                        let url = window.URL.createObjectURL(blob);
                        let a = document.createElement("a");
                        a.href = url;
                        a.target = "_blank";
                        // a.download = 'Certificate';
                        a.click();
                      });
                    }
                  );
                }}
                className="btn rounded-0 p-0 toggle-class"
              >
                <span className="h6">
                  {/* text-blue */}
                  <i className="fas fa-eye"></i>
                </span>
              </a>
            </>:"-"}
        </td>
      </tr>
    </>
  );
};

export default DocList;
