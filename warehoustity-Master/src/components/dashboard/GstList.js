import React, { useState, useEffect } from 'react';
import axiosauth from '../../api/axios-auth'
import { customerGstByPage } from '../../store/actions/customer/myWarehouseAction';
import { useDispatch } from 'react-redux';
import FormSuccess from '../../components/helper/FormSuccess';

const GstList = ({ checkId, viewMood, gstid, booking, index, value }) => {
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
            "location": res.data.customerGst.location,
            "state": res.data.customerGst.state,
            "gstNo": res.data.customerGst.gstNo,
            "gstCertificate": res.data.customerGst.gstCertificate,
            "gstCertificateLink": res.data.customerGst.gstCertificate,
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
        }
      })
      .catch((error) => {
        console.log("here", error)
      })



  }
  const [show1, setshow1] = useState(false)
  const handleSubmit = (event) => {
    event.preventDefault()
    let obj = {
      "location": location,
      "state": state,
      "gstNo": gstNo,
      "userType": "customer",
      "booking": booking,
      "gstCertificate": gst.gstCertificateLink,
      "warehouse": checkId
    }
    axiosauth.post('/api/v1/gst', obj).then(response => {
      let res = JSON.parse(response.data)

      if (res.statusCode === 200) {
        setshow1(true)
        dispatch(customerGstByPage(pageCount))


      }
      else {
      }

    }).catch((error) => {
      console.log(error);
    }).then(() => {
      console.log("-----always executes");
    })

  }
  const getImgName = (thePath) => {
    if (thePath !== "") {
      return thePath.split(`\\`).pop()
    }
    return "Upload GST Certificate"
  }
  const { location, state, gstNo, gstCertificate } = gst
  return (
    <>
      {show1 ? (<FormSuccess onClick={() => setshow1(false)} message="Gst Details Updated Successfully" />) : null}


      <div className={"col-sm-11 mb-3 py-3 bg-lighter-primary"} id="update1">
        {/* <span className="font-heading mb-4">Warehouse ID: {checkId}</span> */}
        <form onSubmit={handleSubmit}>
          <div className="row mt-2">
            <div className="col-xl col-lg-4 col-sm-6">
              <div className="form-group">
                <label for="formGroupExampleInput">Warehouse ID</label>
                <input readOnly disabled={true} required value={checkId} type="text" className="form-control form-control-md" id={"formGroupExampleInput" + index} placeholder="Warehouse Id" />
              </div>
            </div>

            {/* <div className="col-xl col-lg-4 col-sm-6">
              <div className="form-group">
                <label for="formGroupExampleInput">Location</label>
                <input readOnly disabled={viewMood} required onChange={handleChange("location")} value={location} type="text" className="form-control form-control-md" id={"formGroupExampleInput" + index} placeholder="area" />
              </div>
            </div> */}

            <div className="col-xl col-lg-4 col-sm-6">
              <div className="form-group">
                <label for="formGroupExampleInput">State</label>
                <input readOnly disabled={viewMood} required onChange={handleChange("state")} value={state} type="text" className="form-control form-control-md" id={"formGroupExampleInput" + index + 1000} placeholder="state" />
              </div>
            </div>
            <div className="col-xl col-lg-4 col-sm-6">
              <div className="form-group">
                <label for="formGroupExampleInput">GST NO</label>
                <input disabled={viewMood} required onChange={handleChange("gstNo")} value={gstNo} type="text" className="form-control form-control-md" id={"formGroupExampleInput" + index + 2000} placeholder="gst" />
              </div>
            </div>
            {!viewMood ? (<div className="col-xl col-lg-4 col-sm-6">
              <div className="form-group">
                <div className="custom-file position-relative">
                  {/* <label id="custom-file-name" for="formGroupExampleInput">Upload GST Certificate</label> */}
                  <input onChange={(e) => handleChangeq(e)} required type="file" id={"custom-file-upload-input" + index + 3000} className="custom-file-input" hidden />
                  <span id="custom-file-name" className="d-block text-center custom-file-name px-0 splitText mb-2">{getImgName(gstCertificate)}</span>

                  <label className="custom-file-upload-label btn btn-block btn-deep-primary mb-3 px-0 py-1" htmlFor={"custom-file-upload-input" + index + 3000}>
                    <i className="fas fa-upload"></i>
                  </label>
                </div>
              </div>
            </div>) : null}

            {gst.gstCertificateLink !== "" ?
              <div className="col-xl col-lg-4 col-sm-6">
                <label for="formGroupExampleInput">Actions</label>
                <div className="btn btn-group px-0 py-0 w-100">
                  <a href={gst.gstCertificateLink} target="_blank" rel="noopener noreferrer" className="btn px-3 py-1 btn-deep-blue" download=""><i className="fas fa-eye"></i></a>
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
                        //window.location.href = response.url;
                      });
                  }} className="btn px-3 py-1 btn-link btn-deep-blue" download=""><i className="fas fa-download"></i></a>
                </div>
              </div>
              : ""}


            {!viewMood ? 
              <div className="col-xl col-lg-4 col-sm-6">
                <label for="formGroupExampleInput">Actions</label><br/>
                <button type="submit" className="btn btn-deep-primary w-100 py-1">Save</button>
              </div>
              : null}

          </div>
      
        </form>
      </div>
    </>
  )
}

export default GstList
