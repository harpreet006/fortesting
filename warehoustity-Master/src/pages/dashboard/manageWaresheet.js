import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { useHistory } from "react-router-dom";
import WaresheetCard from "../../components/dashboard/WaresheetCard";
import CustomerLayout from "../../layout/CustomerLayout";
import axios from "../../api/axios-auth";
import { ItemNotFlund } from "../../components/helper/CustomLoader";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

const Waresheet = () => {
  const history = useHistory();
  const [loadwaresheets, setloadwaresheets] = useState([]);
  const [waresheetName, setWaresheetName] = useState("")
  const loadwaresheet = () => {
    axios
      .get("/api/v1/waresheet/" + window.location.href.split("waresheet/")[1])
      .then((Response) => {
        let res = JSON.parse(Response.data);
        if (res.statusCode === 200) {
          setloadwaresheets(res.data.waresheetImages);
          setWaresheetName(res.data?.waresheetName)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    loadwaresheet();
  }, []);

  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });


  const convertPdf = () =>{
    html2canvas(document.getElementById('pdf-element'),{useCORS: true}).then(function(canvas){
      var wid;
      var hgt;
      var img = canvas.toDataURL("image/png", wid = canvas.width, hgt = canvas.height);
      var hratio = hgt/wid
      var doc = new jsPDF('p','pt','a4');
      var width = doc.internal.pageSize.width;    
      var height = width * hratio
      doc.addImage(img,'JPEG',20,20, width, height);
      doc.save('waresheet.pdf');
  });
  }
  

  return (
    <Layout>
      <CustomerLayout title="My Waresheet">
        <div className="row">
          <div className="content col-12 shadow-sm pb-4">
            <div className="pb-2 border-bottom mb-3 d-sm-flex justify-content-between">
              <div>
                {/* <button className="btn name-breadcrumb px-0 text-dark font-heading mr-3 mb-3 text-uppercase toggle-className" data-target=".create-new-warehouse" data-toggle-className="d-none"><i className="fas fa-chevron-left pr-3"></i> Waresheetdsd - 1 </button> */}
                <button
                  onClick={() => history.goBack()}
                  className="btn name-breadcrumb px-0 text-dark font-heading mr-3 "
                >
                  <i className="fas fa-chevron-left pr-3"></i> Waresheet - {waresheetName}
                </button>
              </div>
              <div className="d-flex align-items-center">
                <div className="dropdown btn-export">
                  <button
                    className="btn btn-deep-primary mr-3"
                    // className="btn btn-deep-primary mr-3 dropdown-toggle"
                    type="button"
                    // id="dropdownMenu5"
                    // data-toggle="dropdown"
                    // aria-haspopup="true"
                    // aria-expanded="false"
                    onClick={convertPdf}
                  >
                    Export
                  </button>
                  {/* <div className="dropdown-menu">
                    <Link className="dropdown-item" to="#!">
                      Jpeg
                    </Link>
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="#!">
                      PDF
                    </Link>
                  </div> */}
                </div>
                {/* <Link
                  to="#"
                  className="btn px-0 text-gray font-heading mr-3 mb-3 text-uppercase"
                >
                  <img src={"/assets/images/icons/check-all.png"} alt="icon" />
                </Link> */}
              </div>
            </div>
            
            <div className="row mx-0" >
              <div className="col-12 px-4 border">
                <div className="row pr-5" id="pdf-element">
                 
                  {loadwaresheets && loadwaresheets.length > 0
                    ? loadwaresheets.map((value, index) => {
                        return (
                          <WaresheetCard key={index} waresheet={value} index={index} checkedId={4} />
                        );
                      })
                    : 
                    <ItemNotFlund loderCard="loaderCard" message={`No Image Available`} />
                    }
                </div>
                {/* <button onClick={()=>history.goBack()} className="btn btn-deep-primary toggle-className">Back</button> */}
              </div>
            </div>
          </div>
        </div>
      </CustomerLayout>
    </Layout>
  );
};

export default Waresheet;
