import React, { useState, useEffect } from 'react';
import axiosauth from '../../api/axios-auth'
import { vendorGstByPage } from '../../store/actions/customer/myWarehouseAction';
import { useDispatch } from 'react-redux';
import FormSuccess from '../../components/helper/FormSuccess';

const GstListTable = ({ checkId, viewMood, gstid, booking, index, value, warehouseId }) => {

  const dispatch = useDispatch()
  const pageCount = new URLSearchParams(window.location.search).get('page');
  // eslint-disable-next-line
  const [show, setShow] = useState(true);
  const [gst, setgst] = useState({
    "location": value.district,
    "state": value.state,
    "gstNo": "",
    "gstCertificate": "",
    "gstCertificateLink": "",
    "warehouse": 1
  })
  const handleChange = name => event => {
    setgst({ ...gst, error: false, [name]: event.target.value });
  };
  useEffect(() => {
    if (gstid !== null) {
      axiosauth.get('/api/v1/gst/' + gstid).then(response => {
        let res = JSON.parse(response.data)

        if (res.statusCode === 200) {

          setgst({
            "location": res.data.vendorGst.location,
            "state": res.data.vendorGst.state,
            "gstNo": res.data.vendorGst.gstNo,
            "gstCertificate": res.data.vendorGst.gstCertificate,
            "gstCertificateLink": res.data.vendorGst.gstCertificate,
          })

        }
        else {
        }

      }).catch((error) => {
        console.log(error);
      }).then(() => {
        console.log("-----always executes");
      })
    }

  }, [gstid]);
  const handleChangeq = (e) => {

    // setgst({...gst,[e.target.name]:e.target.value});
    let val = e.target.value
    // console.log("permitForm===>",e.currentTarget.files[0])

    let formData = new FormData();
    formData.append("file", e.currentTarget.files[0])
    console.log("rohanjha", formData, e.currentTarget.files[0])
    axiosauth
      .post("/api/v1/buildingtraderelated/fileupload", formData)
      .then((response) => {
        let res = JSON.parse(response.data);
        console.log("dsssss", res)
        if (res.statusCode === 200) {
          console.log("dsssss", res)
          setgst({ ...gst, "gstCertificate": val, "gstCertificateLink": res.data });

        } else {

        }
      })
      .catch((error) => {
        console.log("here", error)
      })



  }
  const [show1, setshow1] = useState(false)
  const handleSubmit = () => {
    // event.preventDefault()
    let obj = {
      "location": location,
      "state": state,
      "gstNo": gstNo,
      "userType": "vendor",
      "booking": booking,
      "gstCertificate": gst.gstCertificateLink,
      "warehouse": checkId
    }
    axiosauth.post('/api/v1/gst', obj).then(response => {
      let res = JSON.parse(response.data)

      if (res.statusCode === 200) {
        setshow1(true)
        dispatch(vendorGstByPage(pageCount))
      }
      else {
      }

    }).catch((error) => {
      console.log(error);
    }).then(() => {
      console.log("-----always executes");
    })

  }
  // const getImgName = (thePath) => {
  //     if (thePath !== "") {
  //         return thePath.split(`\\`).pop()
  //     }
  //     return "Upload GST Certificate"
  // }
  const { location, state, gstNo } = gst

  return (
    <>
      {show1 ? (<FormSuccess onClick={() => setshow1(false)} message="Gst Details Updated Successfully" />) : null}



      <tr>
        <td>
          <input readOnly disabled={true} required value={warehouseId} type="text" className="form-control form-control-sm text-center" id={"formGroupExampleInput" + index} placeholder="warehouseID" />
        </td>

        <td className="text-nowrap">
          <input readOnly disabled={viewMood} required onChange={handleChange("state")} value={state} type="text" className="form-control form-control-sm" id={"formGroupExampleInput" + index + 1000} placeholder="state" />
        </td>

        <td className="text-nowrap">
          <input disabled={viewMood} required onChange={handleChange("gstNo")} value={gstNo} type="text" className="form-control form-control-sm" id={"formGroupExampleInput" + index + 2000} placeholder="gst" />
        </td>


        <td>

          {!viewMood &&
            <div className="custom-file position-relative">
              <input onChange={(e) => handleChangeq(e)} required type="file" id={"custom-file-upload-input" + index + 3000} className="custom-file-input" hidden />
              <label className="custom-file-upload-label btn btn-block btn-deep-primary px-0 py-1 w-70px" htmlFor={"custom-file-upload-input" + index + 3000}>
                <i className="fas fa-upload"></i>
              </label>
            </div>}

          {gst.gstCertificateLink !== "" &&
            <div className="btn px-0 py-0 text-center text-nowrape d-flex">

              {/*  eslint-disable-next-line */}
              <a onClick={() => {
                fetch(gst.gstCertificateLink)
                  .then(response => {
                    response.blob().then(blob => {
                      let url = window.URL.createObjectURL(blob);
                      let a = document.createElement('a');
                      a.href = url;
                      a.download = 'gstFile';
                      a.click();
                    });
                  });
              }} className="btn px-3 btn-link btn-deep-primary py-1  w-70px mr-2" download=""><i className="fas fa-download"></i></a>

              <a href={gst.gstCertificateLink} target="_blank" rel="noopener noreferrer"
                className="btn px-3 btn-deep-primary py-1  w-70px" download=""><i className="fas fa-eye"></i>
              </a>

            </div>}


        </td>

        <td>

          {!viewMood &&
            <button type="submit" onClick={handleSubmit} className="btn btn-deep-primary py-1 w-100">Save</button>
          }

        </td>

      </tr>




      {/* <div className={show ? "col-sm-11 mb-3 p-4 bg-lighter-primary" : "col-sm-11 mb-3 p-4 bg-lighter-primary d-none"} id="update1">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-xl col-lg-4 col-sm-6">
              <div className="form-group">
                <input readOnly disabled={true} required value={checkId} type="text" className="form-control form-control-sm" id={"formGroupExampleInput" + index} placeholder="warehouseID" />
              </div>
            </div>
            <div className="col-xl col-lg-4 col-sm-6">
              <div className="form-group">
                <input readOnly disabled={viewMood} required onChange={handleChange("state")} value={state} type="text" className="form-control form-control-sm" id={"formGroupExampleInput" + index + 1000} placeholder="state" />
              </div>
            </div>
            <div className="col-xl col-lg-4 col-sm-6">
              <div className="form-group">
                <input disabled={viewMood} required onChange={handleChange("gstNo")} value={gstNo} type="text" className="form-control form-control-sm" id={"formGroupExampleInput" + index + 2000} placeholder="gst" />
              </div>
            </div>
            {!viewMood ? (<div className="col-xl col-lg-4 col-sm-6">
              <div className="form-group">
                <div className="custom-file position-relative">
                
                  <input onChange={(e) => handleChangeq(e)} required type="file" id={"custom-file-upload-input" + index + 3000} className="custom-file-input" hidden />
        
                  <span id="custom-file-name" className="d-block text-center custom-file-name px-0 splitText mb-2">{getImgName(gstCertificate)}</span>

                  <label className="custom-file-upload-label btn btn-block btn-deep-primary mb-3 px-0 w-100" htmlFor={"custom-file-upload-input" + index + 3000}>
                    <i className="fas fa-upload"></i>
                  </label>
                </div>
              </div>
            </div>) : null}
            <div className="col-xl col-lg-4 col-sm-6">
              {gst.gstCertificateLink !== "" ? (<td className="text-center text-nowrape d-flex">
                <div className="btn btn-group px-0 mt-1 w-100 mt-3">
                  <a href={gst.gstCertificateLink} target="_blank" rel="noopener noreferrer" className="btn px-3 py-2 btn-deep-blue" download=""><i className="fas fa-eye"></i></a>
           
                  <a onClick={() => {
                    fetch(gst.gstCertificateLink)
                      .then(response => {
                        response.blob().then(blob => {
                          let url = window.URL.createObjectURL(blob);
                          let a = document.createElement('a');
                          a.href = url;
                          a.download = 'gstFile';
                          a.click();
                        });
                      });
                  }} className="btn px-3 py-2 btn-link btn-deep-blue" download=""><i className="fas fa-download"></i></a>
                </div>
              </td>) : ""}

            </div>

            {!viewMood ?
              <div className="col-xl col-lg-4 col-sm-6">
                <button type="submit" className="btn btn-deep-primary w-100">Save</button>
              </div>
              : null}
          </div>
        </form>
      </div> */}
    </>
  )
}

export default GstListTable
