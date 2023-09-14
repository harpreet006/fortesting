import React, { useState, useEffect, useRef } from "react";
import Layout from "../../layout/Layout";
import { Link, useParams, useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { addToCart } from "../../store/actions/customer/cartAction";
import { initialRfqByIdAndType } from "../../store/actions/customer/rfqAction";
import Spinner from "react-bootstrap/Spinner";
import loadjs from "loadjs";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../style/css/plugins.css";
import "../../style/css/custom.css";
import {
  fetchWarehouseById,
  warehouseDetailPage,
  getWarehouseByCity,
} from "../../store/actions/warehouseAction";
import Maps from "./Maps1";
import axios from "../../api/axios-auth";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

import { onlyNumberAllow } from "../../components/validation";

const WarehouseDetails = () => {
  let share_url = window.location.href;
  const [copyClip, setCopyClip] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const myRefname2 = useRef(null);
  const myRefname3 = useRef(null);
  let gettablength = document.getElementsByClassName("indoor-outdoor-tab-open");

  for (let i = 0; i < gettablength.length; i++) {
    gettablength[i].addEventListener("click", function () {
      for (let i = 0; i < gettablength.length; i++) {
        let gettarget = gettablength[i]
          .getAttribute("data-target")
          .slice(1)
          .replace("modal", "tab");
        let datatargettab = gettablength[i]
          .getAttribute("data-target-tab")
          .slice(1);
        document
          .getElementById(gettarget)
          .getElementsByClassName("nav-link")
        [i].classList.remove("active");
        document.getElementById(datatargettab).classList.remove("active");
        document.getElementById(datatargettab).classList.remove("show");
      }
      let datatargettabactive = gettablength[i]
        .getAttribute("data-target-tab")
        .slice(1);
      document
        .getElementById(datatargettabactive + "-tab")
        .classList.add("active");
      document.getElementById(datatargettabactive).classList.add("active");
      document.getElementById(datatargettabactive).classList.add("show");
    });
  }
  const [ware, setware] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen1, setModalIsOpen1] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = useState(false);
  const [modalIsOpen3, setModalIsOpen3] = useState(false);

  const [selectedOption, setselectedOption] = useState(null);
  const [waresheet, setwaresheet] = useState({
    note: "",
    imgUrl: "",
  });
  const handleClick2 = () => {
    // myRefname.current.focus();
    myRefname2.current.dispatchEvent(
      new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
        buttons: 1,
      })
    );
  };
  const handleClick3 = () => {
    // myRefname.current.focus();
    myRefname3.current.dispatchEvent(
      new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
        buttons: 1,
      })
    );
  };
  let formValidation = Yup.object().shape({
    waresheetName: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .matches(/^[A-Za-z ]*$/, "Please enter valid Name")
      .required("Warehouse Name is required"),

    description: Yup.string()
      .min(3, "Too Short!")
      .matches(/^[\w .,!?()]+$/, "Please enter valid Decription")
      .required("Description is required"),
  });

  const items = useSelector((state) => state.WAREHOUSEINFO);
  const [email, setemail] = useState({
    storageType: "",
    NoOfPallets: "",
    AreaRequired: "",
    code: "",
    mobile: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    let obj = {
      data: `
    <h3 style=>Storage Type: ${email.storageType}</h3><br/>
    <h3 style=>No Of Pallets: ${email.NoOfPallets}</h3><br/>
    <h3 style=>Mobile Number: ${email.mobile}</h3><br/>
    <h3 style=>Area Required: ${email.AreaRequired}</h3><br/>
    <h4 style=>Cheers!</h4>
    <h4 style=>Warehousity Team</h4>
    `,
    };
    axios
      .post("/api/v1/user/booknow", obj)
      .then((Response) => {
        let res = JSON.parse(Response.data);
        if (res.statusCode === 200) {
          setModalIsOpen(true);
          // alert("Thank You!")
        } else {
          // setError1(res.message)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reportwarehouse = () => {
    let obj = {
      data: `
    <h3 style=>WarehouseId: ${warehouseId}</h3><br/>
   <h4>Your Warehouse has been reported</h4>

    <h4 style=>Cheers!</h4>
    <h4 style=>Warehousity Team</h4>
    `,
    };
    axios
      .post("/api/v1/user/booknow", obj)
      .then((Response) => {
        let res = JSON.parse(Response.data);

        if (res.statusCode === 200) {
          setModalIsOpen(true);
          // alert("Thank You!")
        } else {
          // setError1(res.message)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [loadwaresheets, setloadwaresheets] = useState([]);
  const loadwaresheet = () => {
    axios
      .get("/api/v1/waresheet?page=1&limit=10")
      .then((Response) => {
        let res = JSON.parse(Response.data);

        if (res.statusCode === 200) {
          setloadwaresheets(res.data);

          let index = res.data.findIndex((x) => x.makeItDefault === true);

          setselectedOption({
            label: res.data[index].waresheetName,
            value: res.data[index].id,
          });
          // setModalIsOpen(true)
          // alert("Thank You!")
        } else {
          // setError1(res.message)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const updatewaresheet = () => {
    let obj = {
      warehouseId: warehouseId,
      imageUrl: waresheet.imgUrl,
      note: waresheet.note,
    };
    axios
      .put("/api/v1/waresheet/" + selectedOption.value + "/warehouseimg", obj)
      .then((Response) => {
        let res = JSON.parse(Response.data);

        if (res.statusCode === 200) {
          setSaveWaresheet(false);
          setModalIsOpen3(true);
          // alert("Thank You!")
        } else {
          // setError1(res.message)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const createwaresheet = (fields) => {
    let obj = {
      waresheetName: fields.waresheetName,
      description: fields.description,
      makeItDefault: fields.makeItDefault,
    };
    axios
      .post("/api/v1/waresheet", obj)
      .then((Response) => {
        let res = JSON.parse(Response.data);

        if (res.statusCode === 200) {
          setModalIsOpen2(true);
          // loadwaresheet()
          // setSaveWaresheet(true)
          // alert("Thank You!")
        } else {
          // setError1(res.message)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const createnewwaresheet = (fields) => {
    let obj = {
      waresheetName: fields,
      description: "",
      makeItDefault: true,
    };
    axios
      .post("/api/v1/waresheet", obj)
      .then((Response) => {
        let res = JSON.parse(Response.data);

        if (res.statusCode === 200) {
          setware("");
          setModalIsOpen2(true);
          // loadwaresheet()
          // setSaveWaresheet(true)
          // alert("Thank You!")
        } else {
          // setError1(res.message)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const data = useSelector((state) => state);
  const { addToast } = useToasts();
  const { warehouseId } = useParams();

  const handleChange5 = (name) => (event) => {
    setemail({ ...email, error: false, [name]: event.target.value });
  };

  const [show, setShow] = useState(false);
  const [mobilemodal, setmobilemodal] = useState(false);

  const [checkPrice, setCheckPrice] = useState(false);
  const [saveWaresheet, setSaveWaresheet] = useState(false);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const [open, setopen] = useState(false);
  // const [open2, setopen2] = useState(false);
  // const [open3, setopen3] = useState(false);
  // const [open4, setopen4] = useState(false);
  // const [open5, setopen5] = useState(false);

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  const addCart = () => {
    if (data.authenticated && warehouseId) {
      dispatch(
        addToCart(
          {
            type: "warehouse",
            warehouse: parseInt(warehouseId),
          },
          addToast
        )
      );
    } else {
      addToast("Please Login", { appearance: "error", autoDismiss: true });
    }
  };
  useEffect(() => {
    dispatch(fetchWarehouseById(warehouseId));
    loadwaresheet();
    loadjs("/assets/js/jquery.min.js", function () {
      loadjs("/assets/plugins/slick/slick.min.js", function () {
        // loadjs('/assets/js/rohan.js', function () {
        // });
        loadjs("/assets/plugins/owl-carousel/js/owl.carousel.js", function () {
          loadjs("/assets/js/custom.min.js", function () { });
        });
      });
    });

    return () => {
      dispatch(warehouseDetailPage(null));
    };
  }, [dispatch, warehouseId]);

  const [rfqLoad, setRfqLoad] = useState(false);
  const createAndRedirectOnRfq = () => {
    setRfqLoad(true);

    dispatch({ payload: {}, type: "INITIAL_EMPTY" });
    dispatch({ payload: null, type: "CART_FAVORITE" });
    dispatch({ payload: [], type: "WAREHOUSE_LIST" });

    if (warehouseId && email.AreaRequired !== "") {
      let city =
        items &&
        items.warehouseDetailPage &&
        items.warehouseDetailPage.warehouseContactDetailInfo &&
        items.warehouseDetailPage.warehouseContactDetailInfo.address &&
        items.warehouseDetailPage.warehouseContactDetailInfo.address.state;

      let area =
        items &&
        items.warehouseDetailPage &&
        items.warehouseDetailPage.warehouseContactDetailInfo &&
        items.warehouseDetailPage.warehouseContactDetailInfo.address &&
        items.warehouseDetailPage.warehouseContactDetailInfo.address.city;

      let data = {
        warehouseSpaceRequired: parseInt(email.AreaRequired),
        warehouses: [parseInt(warehouseId)],
        location: {
          city: {
            name: city,
          },
          area: {
            name: area,
          },
        },
      };
      dispatch(getWarehouseByCity(area));
      axios
        .post(`/api/v1/customerrfq`, data)
        .then((response) => {
          let res = JSON.parse(response.data);
          if (res.statusCode === 200) {
            dispatch(initialRfqByIdAndType(res.data.id, "customerRfq"));
            setCheckPrice(false);
            history.replace(`/createnewrfq?rfqid=${res.data.id}&hide=${true}`);
          }
        })
        .catch((error) => { })
        .then(() => {
          setRfqLoad(false);
        });
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row align-items-center justify-content-start">
          <div className="col-6 pt-3">
            <nav aria-label="text-gray">
              <ol className="d-flex pl-0 mb-0 text-dark">
                <li className="breadcrumb-item">
                  <Link to={"/"}>Home</Link>
                </li>
                <li
                  className="breadcrumb-item active cursorPointer"
                  aria-current="page"
                >
                  <Link to={"/warehouse?page=1"}>Warehouse</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  warehouse {items?.warehouseDetailPage?.warehouseId?.slice(0, 7)}
                </li>
              </ol>
            </nav>
          </div>
          <div className="col-6 pt-3">
            
            
          <span className="text-right">
                


                    <div className="row">
                      <div className="col-md-12">
                        Share
                        <FacebookShareButton
                          url={share_url}
                          quote={"Arjoi Mart"}
                          hashtag="Arjoi Mart"
                          style={{ width: "50px" }}
                        >
                          <FacebookIcon size={36} />
                        </FacebookShareButton>
                        <TwitterShareButton
                          url={share_url}
                          quote={"Arjoi Mart"}
                          hashtag="Arjoi Mart"
                          style={{ width: "50px" }}
                        >
                          <TwitterIcon size={36} />
                        </TwitterShareButton>
                        <CopyToClipboard
                          text={share_url}
                          onCopy={() => console.log("linkcopied")}
                        >
                          {/* <button style={{ border: '1px solid #9EC311', backgroundColor: '#ffffff' }}>{copyClip ? <span style={{ color: 'green' }}>Copied.</span> : 'Copy Link'}</button> */}
                          <a
                            href="https://www.instagram.com/accounts/login/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src="/assets/icons/rinstagram.png"
                              alt="logo"
                              className="img-fluid ml-1 mr-1"
                              style={{ width: 36, height: 36 }}
                            />
                          </a>
                        </CopyToClipboard>
                        {/* <InstapaperShareButton
                        url={share_url}
                        quote={"Arjoi Mart"}
                        hashtag="Arjoi Mart"
                        style={{ width: '50px' }}
                      >
                        <img src='/assets/zigaaroo-Icons/insta.jpeg' style={{ width: '40px' }} />
                      </InstapaperShareButton> */}
                        <WhatsappShareButton
                          url={share_url}
                          quote={"Arjoi Mart"}
                          hashtag="Arjoi Mart"
                          style={{ width: "50px" }}
                        >
                          <WhatsappIcon size={36} />
                        </WhatsappShareButton>
                        <CopyToClipboard
                          text={share_url}
                          onCopy={() => setCopyClip(true)}
                        >
                          <button
                            style={{
                              border: "1px solid #D94645",
                              backgroundColor: "#ffffff",
                            }}
                          >
                            {copyClip ? (
                              <span style={{ color: "#D94645" }}>Copied.</span>
                            ) : (
                              <span style={{ color: "#D94645" }}>Copy Link</span>
                            )}
                          </button>
                        </CopyToClipboard>
                      
                      </div>
                    </div>
                  </span>


          </div>
        </div>


        <div className="row">
          <div className="col-md-6 image-holder">

            <div className="row mt-2">
              <div className="col-12">
                <h1>
                  ID: {items?.warehouseDetailPage?.warehouseId?.slice(0, 7)}
                </h1>
                <span className="text-capitalize">
                  <i className="fas fa-map-marker-alt"></i>

                  {items &&
                    items.warehouseDetailPage &&
                    items.warehouseDetailPage.warehouseContactDetailInfo &&
                    items.warehouseDetailPage.warehouseContactDetailInfo
                      .address &&
                    items.warehouseDetailPage.warehouseContactDetailInfo.address
                      .district +
                    "," +
                    items.warehouseDetailPage.warehouseContactDetailInfo
                      .address.city}


                </span>
              </div>
            </div>

            {items &&
              items.warehouseDetailPage &&
              items.warehouseDetailPage.warehouseImagesInfo ?
              <div className="row image-warpper py-2">

                <div className="col-12">
                  {/* <div className="product-item-view py-3" id="product-item-view"> */}

                  <img

                    src={
                      items &&
                      items.warehouseDetailPage &&
                      items.warehouseDetailPage.warehouseImagesInfo &&
                      items.warehouseDetailPage.warehouseImagesInfo.coverImage.url
                    }
                    alt="cover" className="img-fluid cover-image w-100"
                  />
                  {/* </div> */}


                  {/* <img src="/assets/images/cover-image.png" alt="cover-image" className="img-fluid cover-image" /> */}
                </div>

                <div className="col-12 col-sm-6 col-md-6 col-xl-6  pr-1">

                  <div className="card custom-card-overlay2">
                    <div className="img-holder">
                      <img

                        src={
                          items &&
                          items.warehouseDetailPage &&
                          items.warehouseDetailPage.warehouseImagesInfo &&
                          items.warehouseDetailPage.warehouseImagesInfo
                            .indoorImages[0].url
                        }
                        alt="indoor"
                        className="img-fluid w-100 multiple-images"
                      />
                    </div>
                    <div className="card-img-overlay d-flex align-items-center justify-content-center">
                      <div className="card-body text-center">
                        <buttom
                          className="indoor-outdoor-tab-open btn text-white"
                          data-target="#indoor-outdoor-modal"
                          data-target-tab="#indoor"
                          data-toggle="modal"
                        >
                          <span className="font-heading h4 text-white">
                            Indoor
                          </span>
                          <p className="d-block">
                            {items &&
                              items.warehouseDetailPage &&
                              items.warehouseDetailPage.warehouseImagesInfo &&
                              items.warehouseDetailPage.warehouseImagesInfo
                                .indoorImages.length}{" "}
                            photos
                          </p>
                        </buttom>
                      </div>
                    </div>
                  </div>


                  {/* <img src="/assets/images/cover-image.png" alt="cover-image" className="img-fluid multiple-images" /> */}
                </div>

                <div className="col-12 col-sm-6 col-md-6 col-xl-6 pl-1">



                  <div className="card custom-card-overlay2">
                    <div className="img-holder">
                      <img

                        src={
                          items &&
                          items.warehouseDetailPage &&
                          items.warehouseDetailPage.warehouseImagesInfo &&
                          items.warehouseDetailPage.warehouseImagesInfo
                            .outdoorImages[0].url
                        }
                        alt="outdoor"
                        className="img-fluid w-100 multiple-images"
                      />
                    </div>
                    <div className="card-img-overlay d-flex align-items-center justify-content-center">
                      <div className="card-body text-center">
                        <buttom
                          className="indoor-outdoor-tab-open btn text-white"
                          data-target="#indoor-outdoor-modal"
                          data-target-tab="#outdoor"
                          data-toggle="modal"
                        >
                          <span className="font-heading h4 text-white">
                            Outdoor
                          </span>
                          <p className="d-block">
                            {items &&
                              items.warehouseDetailPage &&
                              items.warehouseDetailPage.warehouseImagesInfo &&
                              items.warehouseDetailPage.warehouseImagesInfo
                                .indoorImages.length}{" "}
                            photos
                          </p>
                        </buttom>
                      </div>
                    </div>
                  </div>



                  {/* <img src="/assets/images/cover-image.png" alt="cover-image" className="img-fluid multiple-images" /> */}
                </div>

              </div>
              :
              <div className="text-center justify-content-center mt-5">
                <Spinner
                  animation="grow"
                  variant="warning"
                  className="text-center"
                />
              </div>
            }



          </div>
          <div className="col-md-6 book-now-form px-5">

            <div className="row mt-2">
              <div className="col-12">
                <div className="d-flex justify-content-between">
                  <span className="booknow mt-2">
                    Book Now
                  </span>
                  <span className="text-right">
                    Share on


                    <div className="row">
                      <div className="col-md-12">
                        <FacebookShareButton
                          url={share_url}
                          quote={"Arjoi Mart"}
                          hashtag="Arjoi Mart"
                          style={{ width: "50px" }}
                        >
                          <FacebookIcon size={36} />
                        </FacebookShareButton>
                        <TwitterShareButton
                          url={share_url}
                          quote={"Arjoi Mart"}
                          hashtag="Arjoi Mart"
                          style={{ width: "50px" }}
                        >
                          <TwitterIcon size={36} />
                        </TwitterShareButton>
                        <CopyToClipboard
                          text={share_url}
                          onCopy={() => console.log("linkcopied")}
                        >
                          {/* <button style={{ border: '1px solid #9EC311', backgroundColor: '#ffffff' }}>{copyClip ? <span style={{ color: 'green' }}>Copied.</span> : 'Copy Link'}</button> */}
                          <a
                            href="https://www.instagram.com/accounts/login/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src="/assets/icons/rinstagram.png"
                              alt="logo"
                              className="img-fluid ml-1 mr-1"
                              style={{ width: 36, height: 36 }}
                            />
                          </a>
                        </CopyToClipboard>
                        {/* <InstapaperShareButton
                        url={share_url}
                        quote={"Arjoi Mart"}
                        hashtag="Arjoi Mart"
                        style={{ width: '50px' }}
                      >
                        <img src='/assets/zigaaroo-Icons/insta.jpeg' style={{ width: '40px' }} />
                      </InstapaperShareButton> */}
                        <WhatsappShareButton
                          url={share_url}
                          quote={"Arjoi Mart"}
                          hashtag="Arjoi Mart"
                          style={{ width: "50px" }}
                        >
                          <WhatsappIcon size={36} />
                        </WhatsappShareButton>
                        <CopyToClipboard
                          text={share_url}
                          onCopy={() => setCopyClip(true)}
                        >
                          <button
                            style={{
                              border: "1px solid #D94645",
                              backgroundColor: "#ffffff",
                            }}
                          >
                            {copyClip ? (
                              <span style={{ color: "#D94645" }}>Copied.</span>
                            ) : (
                              <span style={{ color: "#D94645" }}>Copy Link</span>
                            )}
                          </button>
                        </CopyToClipboard>
                        {/* <a href={`https://twitter.com/intent/tweet?url=${share_url}&text=Arjoi Mart`}>share tweet</a> */}
                      </div>
                    </div>
                  </span>
                </div>
              </div>


              <div className="col-12 mt-5">


                <div className="row">
                  <div className="col-12 col-sm-12 col-md-6 form-group">
                    <label for="">Storage Material Type</label>
                    <input
                      onChange={handleChange5("storageType")}
                      required={true}
                      type="text"
                      id=""
                      className="form-control form-control-sm"
                      placeholder="Type here"
                    />
                  </div>

                  <div className="col-12 col-sm-12 col-md-6 form-group">
                    <label for="">No Of Pallets Position</label>
                    <input
                      onChange={handleChange5("NoOfPallets")}
                      onKeyPress={(e) => onlyNumberAllow(e)}
                      required={true}
                      type="number"
                      id=""
                      className="form-control form-control-sm"
                      placeholder="Type here"
                    />
                  </div>

                  <div className="col form-group">
                    <label for="">Area Required in sqft</label>
                    <input
                      onChange={handleChange5("AreaRequired")}
                      onKeyPress={(e) => onlyNumberAllow(e)}
                      required={true}
                      type="number"
                      id=""
                      className="form-control form-control-sm"
                      placeholder="Type here"
                    />
                  </div>



                  {/* <label for="">Storage Material Type</label>
                  <div className="row">
                    <div className="col-6 col-md-4">
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
                        <label className="form-check-label" for="inlineCheckbox1">Fork Lift</label>
                      </div>
                    </div>
                    <div className="col-6 col-md-4">
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
                        <label className="form-check-label" for="inlineCheckbox1">Crane</label>
                      </div>
                    </div>
                    <div className="col-6 col-md-4">
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
                        <label className="form-check-label" for="inlineCheckbox1">Fulltime Labour</label>
                      </div>
                    </div>
                    <div className="col-6 col-md-4">
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                        <label className="form-check-label" for="inlineCheckbox2">Pallet</label>
                      </div>
                    </div>
                    <div className="col-6 col-md-4">
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
                        <label className="form-check-label" for="inlineCheckbox1">Supervisor</label>
                      </div>
                    </div>
                    <div className="col-6 col-md-4">
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                        <label className="form-check-label" for="inlineCheckbox2">Office Space</label>
                      </div>
                    </div>

                  </div> */}


                </div>
                <div className="row mt-3">
                  <div className="col-auto col-sm-6 col-md-6">
                    <button
                      disabled={
                        email.storageType === "" ||
                        email.NoOfPallets === "" ||
                        email.AreaRequired === ""
                      }
                      onClick={() => handleClick2()}
                      className="btn btn-block btn-deep-primary my-1 py-2"
                    >
                      Check Price
                    </button>

                    <button
                      style={{ display: "none" }}
                      ref={myRefname2}
                      onClick={() => setCheckPrice(true)}
                      className="btn btn-block btn-deep-primary my-1 py-2"
                      data-target="#check-price-modal"
                      data-toggle="modal"
                    >
                      Check Price
                    </button>

                    {/* <button
                      onClick={reportwarehouse}
                      type="button"
                      className="btn btn-block text-gray text-left my-1 px-2 py-1"
                    >
                      Save to my Waresheet
                    </button> */}

                  </div>
                  <div className="col-auto col-sm-6 col-md-6">
                    {!data.CARTINFO.cartIdList?.includes(
                      parseInt(warehouseId)
                    ) ? (
                      <button
                        onClick={addCart}
                        disabled={data.CARTINFO.isPending}
                        type="button"
                        className="btn btn-block btn-outline-dark-primary my-1 py-2"
                      >
                        Add to Cart
                        {data.CARTINFO.isPending ? (
                          <Spinner animation="border" />
                        ) : null}
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-block btn-outline-dark-primary my-1 text-success font-weight-bold py-2"
                      >
                        Already in Cart
                      </button>
                    )}


                    <div className="float-right">
                      <button
                        onClick={reportwarehouse}
                        type="button"
                        className="btn btn-block text-danger my-1 px-2 py-1"
                      >
                        Report Warehouse
                      </button>


                      {/* <button
                        type="button"
                        className="btn btn-block btn-outline-dark-primary mt-4 py-2 text-nowrap"
                      >

                        <i className="fas fa-map-marked-alt mr-3 font-weight-bold"></i>
                        Locate Us on Map
                      </button> */}

                    </div>



                  </div>
                </div>


              </div>


            </div>


          </div>
        </div>

        {/* About Warehouse */}

        <div className="row py-5">
          <div className="col-12 col-sm-12 col-md-6 warehouse-about-home">
            <span>
              About Warehouse
            </span>
            <p>
              This warehouse in{" "}
              {items &&
                items.warehouseDetailPage &&
                items.warehouseDetailPage.warehouseContactDetailInfo &&
                items.warehouseDetailPage.warehouseContactDetailInfo.address &&
                items.warehouseDetailPage.warehouseContactDetailInfo.address
                  .district}{" "}
              is one of the finest in the area. Warehouse is strategically located
              in the{" "}
              {items &&
                items.warehouseDetailPage &&
                items.warehouseDetailPage.warehouseContactDetailInfo &&
                items.warehouseDetailPage.warehouseContactDetailInfo.address &&
                items.warehouseDetailPage.warehouseContactDetailInfo.address.city}
              . The total area of the warehouse is
              {items &&
                items.warehouseDetailPage &&
                items.warehouseDetailPage.storageSpaceInfo &&
                " " +
                items.warehouseDetailPage.storageSpaceInfo.totalArea +
                " " +
                "Sqft" +
                " "}
              and currently available space in this warehouse is{" "}
              {items &&
                items.warehouseDetailPage &&
                items.warehouseDetailPage.storageSpaceInfo &&
                " " +
                items.warehouseDetailPage.storageSpaceInfo.totalAvailableSpace +
                " " +
                "Sqft" +
                " "}{" "}
              . This is a{" "}
              {items &&
                items.warehouseDetailPage &&
                items.warehouseDetailPage.category.categoryName}{" "}
              warehouse with a{" "}
              {items &&
                items.warehouseDetailPage &&
                items.warehouseDetailPage.type.type}{" "}
              built. The warehouse operates in
              {items &&
                items.warehouseDetailPage &&
                items.warehouseDetailPage.storageSpaceInfo &&
                " " +
                items.warehouseDetailPage.storageSpaceInfo.noOfShift +
                " "}{" "}
              shifts from Monday to Saturday but is very much flexible considering
              the customer need.
            </p>

          </div>
          <div className="col-12 col-sm-12 col-md-6">

            <div style={{ height: "300px" }}>
              {items &&
                items.warehouseDetailPage &&
                items.warehouseDetailPage.warehouseContactDetailInfo ? (
                <Maps
                  lat={parseFloat(
                    items &&
                    items.warehouseDetailPage &&
                    items.warehouseDetailPage.warehouseContactDetailInfo &&
                    items.warehouseDetailPage.warehouseContactDetailInfo
                      .address &&
                    items.warehouseDetailPage.warehouseContactDetailInfo.address
                      .latitude
                  )}
                  lng={parseFloat(
                    items &&
                    items.warehouseDetailPage &&
                    items.warehouseDetailPage.warehouseContactDetailInfo &&
                    items.warehouseDetailPage.warehouseContactDetailInfo
                      .address &&
                    items.warehouseDetailPage.warehouseContactDetailInfo.address
                      .longnitude
                  )}
                  id={items.warehouseDetailPage?.id}
                  category={items.warehouseDetailPage?.category.categoryName}
                  type={items.warehouseDetailPage?.type?.type}
                  location={
                    items.warehouseDetailPage &&
                    items.warehouseDetailPage.warehouseContactDetailInfo &&
                    items.warehouseDetailPage.warehouseContactDetailInfo.address
                      .city
                  }
                  image={
                    items.warehouseDetailPage?.warehouseImagesInfo?.coverImage
                      ?.url
                  }
                  totalArea={
                    items.warehouseDetailPage &&
                    items.warehouseDetailPage.storageSpaceInfo &&
                    items.warehouseDetailPage.storageSpaceInfo.totalArea
                  }
                />
              ) : null}
            </div>

          </div>
        </div>

        {/* Features of warehouses */}
        <div className="row py-5 feature-and-service">
          <span className="mb-4">Features and Services</span>

          {/* Accessibility */}
          <div className="col-6 col-sm-4 col-md-3 col-xl-3">

            <h6 className="mb-4">Accessibility</h6>
            <ul className="list-unstyled text-gray">
              <li className="mb-3">
                <img
                  className="mr-2"
                  src="/assets/images/icons/icon-computer-and-printer.png"
                  alt="cover"
                />{" "}
                Nearest Police Station:{" "}
                {items &&
                  items.warehouseDetailPage &&
                  items.warehouseDetailPage.formEightyInfo &&
                  items.warehouseDetailPage.formEightyInfo.length > 0 &&
                  items.warehouseDetailPage.formEightyInfo[0].input}
              </li>
              <li className="mb-3">
                <img
                  className="mr-2"
                  src="/assets/images/icons/icon-scanner.png"
                  alt="cover"
                />{" "}
                Nearest Fire Station:{" "}
                {items &&
                  items.warehouseDetailPage &&
                  items.warehouseDetailPage.formEightyInfo &&
                  items.warehouseDetailPage.formEightyInfo.length > 0 &&
                  items.warehouseDetailPage.formEightyInfo[1].input}
              </li>
              <li className="mb-3">
                <img
                  className="mr-2"
                  src="/assets/images/icons/icon-pallet.png"
                  alt="cover"
                />{" "}
                Nearest School:{" "}
                {items &&
                  items.warehouseDetailPage &&
                  items.warehouseDetailPage.formEightyInfo &&
                  items.warehouseDetailPage.formEightyInfo.length > 0 &&
                  items.warehouseDetailPage.formEightyInfo[5].input}
              </li>
              <li className="mb-3">
                <img
                  className="mr-2"
                  src="/assets/images/icons/icon-telephone.png"
                  alt="cover"
                />{" "}
                Nearest Metro/ Bus station:{" "}
                {items &&
                  items.warehouseDetailPage &&
                  items.warehouseDetailPage.formEightyInfo &&
                  items.warehouseDetailPage.formEightyInfo.length > 0 &&
                  items.warehouseDetailPage.formEightyInfo[8].input}
              </li>

              {open ? (
                <>
                  <li className="mb-3">
                    <img
                      className="mr-2"
                      src="/assets/images/icons/icon-wifi.png"
                      alt="cover"
                    />{" "}
                    City center:{" "}
                    {items &&
                      items.warehouseDetailPage &&
                      items.warehouseDetailPage.formEightyInfo &&
                      items.warehouseDetailPage.formEightyInfo.length > 0 &&
                      items.warehouseDetailPage.formEightyInfo[9].input}
                  </li>

                  <li className="mb-3">
                    <img
                      className="mr-2"
                      src="/assets/images/icons/icon-home.png"
                      alt="cover"
                    />
                    Labour Hub:{" "}
                    {items &&
                      items.warehouseDetailPage &&
                      items.warehouseDetailPage.formEightyInfo &&
                      items.warehouseDetailPage.formEightyInfo.length > 0 &&
                      items.warehouseDetailPage.formEightyInfo[11].input}
                  </li>
                  <li className="mb-3">
                    <img
                      className="mr-2"
                      src="/assets/images/icons/icon-home.png"
                      alt="cover"
                    />
                    Public Transport Availability:{" "}
                    {items &&
                      items.warehouseDetailPage &&
                      items.warehouseDetailPage.formEightyInfo &&
                      items.warehouseDetailPage.formEightyInfo.length > 0 &&
                      items.warehouseDetailPage.formEightyInfo[12].input}
                  </li>
                  <li className="mb-3">
                    <img
                      className="mr-2"
                      src="/assets/images/icons/icon-home.png"
                      alt="cover"
                    />
                    Nearest Warehousing Hub:{" "}
                    {items &&
                      items.warehouseDetailPage &&
                      items.warehouseDetailPage.formEightyInfo &&
                      items.warehouseDetailPage.formEightyInfo.length > 0 &&
                      items.warehouseDetailPage.formEightyInfo[7].input}
                  </li>
                  <li className="mb-3">
                    <img
                      className="mr-2"
                      src="/assets/images/icons/icon-home.png"
                      alt="cover"
                    />
                    Nearest Hospital:{" "}
                    {items &&
                      items.warehouseDetailPage &&
                      items.warehouseDetailPage.formEightyInfo &&
                      items.warehouseDetailPage.formEightyInfo.length > 0 &&
                      items.warehouseDetailPage.formEightyInfo[13].input}
                  </li>
                  <li className="mb-3">
                    <img
                      className="mr-2"
                      src="/assets/images/icons/icon-file.png"
                      alt="cover"
                    />{" "}
                    WH in industrial area/WH zone?{" "}
                    {items &&
                      items.warehouseDetailPage &&
                      items.warehouseDetailPage.formEightyInfo &&
                      items.warehouseDetailPage.formEightyInfo.length > 0 &&
                      items.warehouseDetailPage.formEightyInfo[4].input}
                  </li>
                  <li className="mb-3">
                    <img
                      className="mr-2"
                      src="/assets/images/icons/icon-fire-noc.png"
                      alt="cover"
                    />{" "}
                    WH in residential area?{" "}
                    {items &&
                      items.warehouseDetailPage &&
                      items.warehouseDetailPage.formEightyInfo &&
                      items.warehouseDetailPage.formEightyInfo.length > 0 &&
                      items.warehouseDetailPage.formEightyInfo[2].input}
                  </li>
                </>
              ) : null}
              <li className="mb-3">
                <span
                  onClick={() => setopen(!open)}
                  href="#fb"
                  className="btn btn-link btn-link-deep-primary px-3 text-underline view-more-feature"
                >
                  {!open ? "View More" : "View Less"}
                </span>
              </li>
            </ul>

          </div>




          {/* Affiliation */}
          <div className="col-6 col-sm-4 col-md-3 col-xl-3">

            <h6 className="mb-4">Affiliation</h6>
            <ul className="list-unstyled text-gray">
              <li className="mb-3">
                <img
                  className="mr-2"
                  src="/assets/images/icons/icon-cctv.png"
                  alt="cover"
                />{" "}
                Labour Union:{" "}
                {items &&
                  items.warehouseDetailPage &&
                  items.warehouseDetailPage.formEightyInfo &&
                  items.warehouseDetailPage.formEightyInfo.length > 0 &&
                  items.warehouseDetailPage.formEightyInfo[15].input}
              </li>
              <li className="mb-3">
                <img
                  className="mr-2"
                  src="/assets/images/icons/icon-sheild.png"
                  alt="cover"
                />{" "}
                Transport Union:{" "}
                {items &&
                  items.warehouseDetailPage &&
                  items.warehouseDetailPage.formEightyInfo &&
                  items.warehouseDetailPage.formEightyInfo.length > 0 &&
                  items.warehouseDetailPage.formEightyInfo[16].input}
              </li>
            </ul>




          </div>


          {/* Electricity & Electrical Fittings */}
          <div className="col-6 col-sm-4 col-md-3 col-xl-3">


            <h6 className="mb-4">Electricity & Electrical Fittings</h6>
            <ul className="list-unstyled text-gray">
              <li className="mb-3">
                <img
                  className="mr-2"
                  src="/assets/images/icons/icon-home.png"
                  alt="cover"
                />{" "}
                Genset:{" "}
                {items &&
                  items.warehouseDetailPage &&
                  items.warehouseDetailPage.formEightyInfo &&
                  items.warehouseDetailPage.formEightyInfo.length > 0 &&
                  items.warehouseDetailPage.formEightyInfo[17].input}
              </li>
              <li className="mb-3">
                <img
                  className="mr-2"
                  src="/assets/images/icons/icon-pallet.png"
                  alt="cover"
                />{" "}
                Solar or Green Energy:{" "}
                {items &&
                  items.warehouseDetailPage &&
                  items.warehouseDetailPage.formEightyInfo &&
                  items.warehouseDetailPage.formEightyInfo.length > 0 &&
                  items.warehouseDetailPage.formEightyInfo[18].input}
              </li>
            </ul>



          </div>






          {/* Emergency Exit & Fire Prevention */}
          <div className="col-6 col-sm-4 col-md-3 col-xl-3">


            <h6 className="mb-4">Emergency Exit & Fire Prevention</h6>
            <ul className="list-unstyled text-gray">
              <li className="mb-3">
                <img
                  className="mr-2"
                  src="/assets/images/icons/icon-home.png"
                  alt="cover"
                />{" "}
                No Of Emergency Door:{" "}
                {items &&
                  items.warehouseDetailPage &&
                  items.warehouseDetailPage.formEightyInfo &&
                  items.warehouseDetailPage.formEightyInfo.length > 0 &&
                  items.warehouseDetailPage.formEightyInfo[20].input}
              </li>
              <li className="mb-3">
                <img
                  className="mr-2"
                  src="/assets/images/icons/icon-pallet.png"
                  alt="cover"
                />{" "}
                Assembly Area:{" "}
                {items &&
                  items.warehouseDetailPage &&
                  items.warehouseDetailPage.formEightyInfo &&
                  items.warehouseDetailPage.formEightyInfo.length > 0 &&
                  items.warehouseDetailPage.formEightyInfo[21].input}
              </li>
            </ul>





          </div>





          {/* Safety & Security */}
          <div className="col-6 col-sm-4 col-md-3 col-xl-3">

            <h6 className="mb-4">Safety & Security</h6>
            <ul className="list-unstyled text-gray">
              <li className="mb-3">
                <img
                  className="mr-2"
                  src="/assets/images/icons/icon-home.png"
                  alt="cover"
                />{" "}
                Gated Compound:{" "}
                {items &&
                  items.warehouseDetailPage &&
                  items.warehouseDetailPage.formEightyInfo &&
                  items.warehouseDetailPage.formEightyInfo.length > 0 &&
                  items.warehouseDetailPage.formEightyInfo[22].input}
              </li>
              <li className="mb-3">
                <img
                  className="mr-2"
                  src="/assets/images/icons/icon-pallet.png"
                  alt="cover"
                />{" "}
                No Of Gates:{" "}
                {items &&
                  items.warehouseDetailPage &&
                  items.warehouseDetailPage.formEightyInfo &&
                  items.warehouseDetailPage.formEightyInfo.length > 0 &&
                  items.warehouseDetailPage.formEightyInfo[23].input}
              </li>
              <li className="mb-3">
                <img
                  className="mr-2"
                  src="/assets/images/icons/icon-pallet.png"
                  alt="cover"
                />{" "}
                Security Room at Gate:{" "}
                {items &&
                  items.warehouseDetailPage &&
                  items.warehouseDetailPage.formEightyInfo &&
                  items.warehouseDetailPage.formEightyInfo.length > 0 &&
                  items.warehouseDetailPage.formEightyInfo[24].input}
              </li>
              <li className="mb-3">
                <img
                  className="mr-2"
                  src="/assets/images/icons/icon-pallet.png"
                  alt="cover"
                />{" "}
                CCTV:{" "}
                {items &&
                  items.warehouseDetailPage &&
                  items.warehouseDetailPage.formEightyInfo &&
                  items.warehouseDetailPage.formEightyInfo.length > 0 &&
                  items.warehouseDetailPage.formEightyInfo[26].input}
              </li>
            </ul>
          </div>


          {/* Warehouse Operations*/}
          <div className="col-6 col-sm-4 col-md-3 col-xl-3">
            <h6 className="mb-4">Warehouse Operations</h6>

            <ul className="list-unstyled text-gray">
              <li className="mb-3">
                <img
                  className="mr-2"
                  src="/assets/images/icons/icon-home.png"
                  alt="cover"
                />{" "}
                Operation hrs:{" "}
                {items &&
                  items.warehouseDetailPage &&
                  items.warehouseDetailPage.formEightyInfo &&
                  items.warehouseDetailPage.formEightyInfo.length > 0 &&
                  items.warehouseDetailPage.formEightyInfo[25].input}
              </li>
            </ul>


          </div>

          {/* Worker Facility, Health & Safety */}
          <div className="col-6 col-sm-4 col-md-3 col-xl-3">

            <h6 className="mb-4">Worker Facility, Health & Safety</h6>
            <ul className="list-unstyled text-gray">
              <li className="mb-3">
                <img
                  className="mr-2"
                  src="/assets/images/icons/icon-home.png"
                  alt="cover"
                />{" "}
                Pantry/Canteen:{" "}
                {items &&
                  items.warehouseDetailPage &&
                  items.warehouseDetailPage.formEightyInfo &&
                  items.warehouseDetailPage.formEightyInfo.length > 0 &&
                  items.warehouseDetailPage.formEightyInfo[27].input}
              </li>
              <li className="mb-3">
                <img
                  className="mr-2"
                  src="/assets/images/icons/icon-home.png"
                  alt="cover"
                />{" "}
                Staff/Workers Washroom:{" "}
                {items &&
                  items.warehouseDetailPage &&
                  items.warehouseDetailPage.formEightyInfo &&
                  items.warehouseDetailPage.formEightyInfo.length > 0 &&
                  items.warehouseDetailPage.formEightyInfo[28].input}
              </li>
              <li className="mb-3">
                <img
                  className="mr-2"
                  src="/assets/images/icons/icon-home.png"
                  alt="cover"
                />{" "}
                24hrs drinking water:{" "}
                {items &&
                  items.warehouseDetailPage &&
                  items.warehouseDetailPage.formEightyInfo &&
                  items.warehouseDetailPage.formEightyInfo.length > 0 &&
                  items.warehouseDetailPage.formEightyInfo[29].input}
              </li>
              <li className="mb-3">
                <img
                  className="mr-2"
                  src="/assets/images/icons/icon-home.png"
                  alt="cover"
                />{" "}
                First aid box:{" "}
                {items &&
                  items.warehouseDetailPage &&
                  items.warehouseDetailPage.formEightyInfo &&
                  items.warehouseDetailPage.formEightyInfo.length > 0 &&
                  items.warehouseDetailPage.formEightyInfo[30].input}
              </li>
            </ul>



          </div>





        </div>




      </div>
      <Modal show={modalIsOpen1} centered size="lg">
        <Modal.Body className="p-0">
          <div className="col-md-12">
            <div className="row">
              <div className="content col-12">
                <div className="pb-2 border-bottom mb-3">
                  <button className="btn name-breadcrumb px-0 text-dark font-heading mr-3">
                    Create New Waresheet 2{" "}
                  </button>
                </div>
                <div className="row mx-0">
                  <div className="col-12 py-3 border">
                    <div className="row">
                      <Formik
                        initialValues={{
                          waresheetName: "",
                          description: "",
                          makeItDefault: false,
                        }}
                        validationSchema={formValidation}
                        onSubmit={(fields) => {
                          dispatch(createwaresheet(fields));
                        }}
                        render={({ errors, status, touched }) => (
                          <Form className="col-12 pt-2">
                            <div className="form-group form-group-lg mb-4">
                              <label
                                for="exampleFormControlInput1"
                                className="mb-3 h6"
                              >
                                Waresheet Name
                              </label>
                              <Field
                                name="waresheetName"
                                type="text"
                                placeholder="Enter Here Waresheet Name"
                                className={
                                  "form-control form-control-sm form-control form-control-sm-lg" +
                                  (errors.waresheetName && touched.waresheetName
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              <ErrorMessage
                                name="waresheetName"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                            <div className="form-group form-group-lg mb-4">
                              <label
                                for="exampleFormControlTextarea1"
                                className="mb-3 h6"
                              >
                                Description
                              </label>
                              <Field
                                name="description"
                                type="textarea"
                                className={
                                  `form-control form-control-sm form-control form-control-sm-lg` +
                                  (errors.description && touched.description
                                    ? " is-invalid"
                                    : "")
                                }
                                id="exampleFormControlTextarea1"
                                rows="3"
                                placeholder="Add notes, what do you like about this Warehouse?"
                              ></Field>
                              <ErrorMessage
                                name="description"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                            <div className="custom-control custom-switch common-switch">
                              <Field
                                name="makeItDefault"
                                type="checkbox"
                                className="custom-control-input common-switch-input"
                                id="customSwitch1"
                              />
                              <label
                                className="custom-control-label common-switch-label text-gray h6"
                                for="customSwitch1"
                              >
                                Make It Default
                              </label>
                            </div>
                            <div className="col-12 px-0 py-4">
                              <Link
                                to={"/waresheet"}
                                className="btn btn-outline-secondary mr-3 toggle-className my-2"
                              >
                                Cancel
                              </Link>
                              <button
                                className="btn btn-deep-primary"
                                type="submit"
                              >
                                Create
                              </button>
                            </div>
                          </Form>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={modalIsOpen} centered>
        <Modal.Body className="p-0">
          <div className="modal-content custom-modal-content">
            <div className="modal-body custom-modal-body pt-0">
              <div className="text-center mt-4">
                <p className="brand-color h6-max-xxs font-weight-bold h5">
                  Thank You For Contacting Us!
                </p>
                <h6 className="h6-max-xxs font-weight-medium">
                  Your Info has been recorded!
                </h6>
                {/* <h6 className="h6-max-xxs font-weight-medium">Please Login again.</h6> */}
              </div>
            </div>
            <div className="col-sm-8 mx-auto mb-4">
              <button
                onClick={() => {
                  setemail({
                    storageType: "",
                    NoOfPallets: "",
                    mobile: "",
                    AreaRequired: "",
                  });
                  setModalIsOpen(false);
                }}
                className="btn btn-deep-primary btn-block mb-4"
              >
                Ok
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={modalIsOpen2} centered>
        <Modal.Body className="p-0">
          <div className="modal-content custom-modal-content">
            <div className="modal-body custom-modal-body pt-0">
              <div className="text-center mt-4">
                <h6 className="h6-max-xxs font-weight-medium">
                  Waresheet Created Successfully!
                </h6>
                {/* <h6 className="h6-max-xxs font-weight-medium">Please Login again.</h6> */}
              </div>
            </div>
            <div className="col-sm-8 mx-auto mb-4">
              <button
                onClick={() => {
                  loadwaresheet();

                  setModalIsOpen2(false);
                  setSaveWaresheet(true);
                }}
                className="btn btn-deep-primary btn-block mb-4"
              >
                Ok
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={modalIsOpen3} centered>
        <Modal.Body className="p-0">
          <div className="modal-content custom-modal-content">
            <div className="modal-body custom-modal-body pt-0">
              <div className="text-center mt-4">
                <h6 className="h6-max-xxs font-weight-medium">
                  Images Added To Waresheet Successfully!
                </h6>
                {/* <h6 className="h6-max-xxs font-weight-medium">Please Login again.</h6> */}
              </div>
            </div>
            <div className="col-sm-8 mx-auto mb-4">
              <button
                onClick={() => {
                  setModalIsOpen3(false);
                  loadwaresheet();
                  setSaveWaresheet(false);
                  setShow(false);
                }}
                className="btn btn-deep-primary btn-block mb-4"
              >
                Ok
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* <section className="about-deatail py-0">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-12">
              <div className="section-heading">
                <h4 className="product-name" id="product-name">
                  ID: {items?.warehouseDetailPage?.warehouseId.slice(0, 6)}
                </h4>
                <p className="text-gray">
                  <span className="fas fa-map-marker-alt"> </span>
                  <span> </span>
                  {items &&
                    items.warehouseDetailPage &&
                    items.warehouseDetailPage.warehouseContactDetailInfo &&
                    items.warehouseDetailPage.warehouseContactDetailInfo
                      .address &&
                    items.warehouseDetailPage.warehouseContactDetailInfo.address
                      .district +
                    "," +
                    items.warehouseDetailPage.warehouseContactDetailInfo
                      .address.city}
                </p>
              </div>
            </div>
          </div>
      
          <div className="row align-items-center mx-0">
            <div className="col-md-8 bg-light-green">
              <div className="product-item-view py-3" id="product-item-view">
                <div>
                  <div className="d-flex justify-content-end">
                    <button
                      onClick={() => setShow(true)}
                      type="button"
                      className="btn p-0"
                      data-toggle="modal"
                      data-target="#product-item-show-modal"
                    >
                      <img
                        src="/assets/images/icons/icon-full.png"
                        alt="icon"
                      />
                    </button>
                  </div>
                  <div className="img-holer product-item-images">
                    <img
                      style={{
                        width: "635px",
                        height: "500px",
                        objectFit: "contain",
                      }}
                      src={
                        items &&
                        items.warehouseDetailPage &&
                        items.warehouseDetailPage.warehouseImagesInfo &&
                        items.warehouseDetailPage.warehouseImagesInfo.coverImage
                          .url
                      }
                      alt="cover"
                      className="img-fluid w-100"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 bg-light-green py-3">
              <div className="row d-flex flex-column">
                <div className="col-md-12 col-sm-6 pb-2 mb-2">
                  <div className="card custom-card-overlay2">
                    <div className="img-holder">
                      <img
                        style={{
                          width: "633px",
                          height: "237px",
                          objectFit: "contain",
                        }}
                        src={
                          items &&
                          items.warehouseDetailPage &&
                          items.warehouseDetailPage.warehouseImagesInfo &&
                          items.warehouseDetailPage.warehouseImagesInfo
                            .indoorImages[0].url
                        }
                        alt="indoor"
                        className="img-fluid w-100"
                      />
                    </div>
                    <div className="card-img-overlay d-flex align-items-center justify-content-center">
                      <div className="card-body text-center">
                        <buttom
                          className="indoor-outdoor-tab-open btn text-white"
                          data-target="#indoor-outdoor-modal"
                          data-target-tab="#indoor"
                          data-toggle="modal"
                        >
                          <span className="font-heading h4 text-white">
                            Indoor
                          </span>
                          <p className="d-block">
                            {items &&
                              items.warehouseDetailPage &&
                              items.warehouseDetailPage.warehouseImagesInfo &&
                              items.warehouseDetailPage.warehouseImagesInfo
                                .indoorImages.length}{" "}
                            photos
                          </p>
                        </buttom>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-sm-6 pt-2">
                  <div className="card custom-card-overlay2">
                    <div className="img-holder">
                      <img
                        style={{
                          width: "633px",
                          height: "237px",
                          objectFit: "contain",
                        }}
                        src={
                          items &&
                          items.warehouseDetailPage &&
                          items.warehouseDetailPage.warehouseImagesInfo &&
                          items.warehouseDetailPage.warehouseImagesInfo
                            .outdoorImages[0].url
                        }
                        alt="outdoor"
                        className="img-fluid w-100"
                      />
                    </div>
                    <div className="card-img-overlay d-flex align-items-center justify-content-center">
                      <div className="card-body text-center">
                        <buttom
                          className="indoor-outdoor-tab-open btn text-white"
                          data-target="#indoor-outdoor-modal"
                          data-target-tab="#outdoor"
                          data-toggle="modal"
                        >
                          <span className="font-heading h4 text-white">
                            Outdoor
                          </span>
                          <p className="d-block">
                            {items &&
                              items.warehouseDetailPage &&
                              items.warehouseDetailPage.warehouseImagesInfo &&
                              items.warehouseDetailPage.warehouseImagesInfo
                                .indoorImages.length}{" "}
                            photos
                          </p>
                        </buttom>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mb-4">
          <div style={{ marginTop: "1em" }} className="row">
            <div className="col-md-12">
              Share On
              <FacebookShareButton
                url={share_url}
                quote={"Arjoi Mart"}
                hashtag="Arjoi Mart"
                style={{ width: "50px" }}
              >
                <FacebookIcon size={36} />
              </FacebookShareButton>
              <TwitterShareButton
                url={share_url}
                quote={"Arjoi Mart"}
                hashtag="Arjoi Mart"
                style={{ width: "50px" }}
              >
                <TwitterIcon size={36} />
              </TwitterShareButton>
              <CopyToClipboard
                text={share_url}
                onCopy={() => console.log("linkcopied")}
              >
            
                <a
                  href="https://www.instagram.com/accounts/login/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/assets/icons/rinstagram.png"
                    alt="logo"
                    className="img-fluid ml-1 mr-1"
                    style={{ width: 36, height: 36 }}
                  />
                </a>
              </CopyToClipboard>
   
              <WhatsappShareButton
                url={share_url}
                quote={"Arjoi Mart"}
                hashtag="Arjoi Mart"
                style={{ width: "50px" }}
              >
                <WhatsappIcon size={36} />
              </WhatsappShareButton>
              <CopyToClipboard
                text={share_url}
                onCopy={() => setCopyClip(true)}
              >
                <button
                  style={{
                    border: "1px solid #D94645",
                    backgroundColor: "#ffffff",
                  }}
                >
                  {copyClip ? (
                    <span style={{ color: "#D94645" }}>Copied.</span>
                  ) : (
                    <span style={{ color: "#D94645" }}>Copy Link</span>
                  )}
                </button>
              </CopyToClipboard>
            </div>
          </div>
        </div>
        <div className="container pb-3 mb-4">
          <div style={{ minHeight: "20px", height: "100%", width: "100%" }}>
            {items &&
              items.warehouseDetailPage &&
              items.warehouseDetailPage.warehouseContactDetailInfo ? (
              <Maps
                lat={parseFloat(
                  items &&
                  items.warehouseDetailPage &&
                  items.warehouseDetailPage.warehouseContactDetailInfo &&
                  items.warehouseDetailPage.warehouseContactDetailInfo
                    .address &&
                  items.warehouseDetailPage.warehouseContactDetailInfo.address
                    .latitude
                )}
                lng={parseFloat(
                  items &&
                  items.warehouseDetailPage &&
                  items.warehouseDetailPage.warehouseContactDetailInfo &&
                  items.warehouseDetailPage.warehouseContactDetailInfo
                    .address &&
                  items.warehouseDetailPage.warehouseContactDetailInfo.address
                    .longnitude
                )}
                id={items.warehouseDetailPage?.id}
                category={items.warehouseDetailPage?.category.categoryName}
                type={items.warehouseDetailPage?.type?.type}
                location={
                  items.warehouseDetailPage &&
                  items.warehouseDetailPage.warehouseContactDetailInfo &&
                  items.warehouseDetailPage.warehouseContactDetailInfo.address
                    .city
                }
                image={
                  items.warehouseDetailPage?.warehouseImagesInfo?.coverImage
                    ?.url
                }
                totalArea={
                  items.warehouseDetailPage &&
                  items.warehouseDetailPage.storageSpaceInfo &&
                  items.warehouseDetailPage.storageSpaceInfo.totalArea
                }
              />
            ) : null}
          </div>
        </div>
        <div style={{ marginTop: "250px" }} className="container pb-3 mb-4">
          <h4>About Warehouse</h4>
          <p className="text-gray mb-0">
            This warehouse in{" "}
            {items &&
              items.warehouseDetailPage &&
              items.warehouseDetailPage.warehouseContactDetailInfo &&
              items.warehouseDetailPage.warehouseContactDetailInfo.address &&
              items.warehouseDetailPage.warehouseContactDetailInfo.address
                .district}{" "}
            is one of the finest in the area. Warehouse is strategically located
            in the{" "}
            {items &&
              items.warehouseDetailPage &&
              items.warehouseDetailPage.warehouseContactDetailInfo &&
              items.warehouseDetailPage.warehouseContactDetailInfo.address &&
              items.warehouseDetailPage.warehouseContactDetailInfo.address.city}
            . The total area of the warehouse is
            {items &&
              items.warehouseDetailPage &&
              items.warehouseDetailPage.storageSpaceInfo &&
              " " +
              items.warehouseDetailPage.storageSpaceInfo.totalArea +
              " " +
              "Sqft" +
              " "}
            and currently available space in this warehouse is{" "}
            {items &&
              items.warehouseDetailPage &&
              items.warehouseDetailPage.storageSpaceInfo &&
              " " +
              items.warehouseDetailPage.storageSpaceInfo.totalAvailableSpace +
              " " +
              "Sqft" +
              " "}{" "}
            . This is a{" "}
            {items &&
              items.warehouseDetailPage &&
              items.warehouseDetailPage.category.categoryName}{" "}
            warehouse with a{" "}
            {items &&
              items.warehouseDetailPage &&
              items.warehouseDetailPage.type.type}{" "}
            built. The warehouse operates in
            {items &&
              items.warehouseDetailPage &&
              items.warehouseDetailPage.storageSpaceInfo &&
              " " +
              items.warehouseDetailPage.storageSpaceInfo.noOfShift +
              " "}{" "}
            shifts from Monday to Saturday but is very much flexible considering
            the customer need.
          </p>
        </div>
        <div className="container mb-4">
          <h4>Features and Services</h4>
          <div className="row">
            <div className="col-xl col-md-4 col-sm-6 col-max-xs-6 py-3">
              <h6 className="mb-4">Accessibility</h6>
              <ul className="list-unstyled text-gray">
                <li className="mb-3">
                  <img
                    className="mr-2"
                    src="/assets/images/icons/icon-computer-and-printer.png"
                    alt="cover"
                  />{" "}
                  Nearest Police Station:{" "}
                  {items &&
                    items.warehouseDetailPage &&
                    items.warehouseDetailPage.formEightyInfo &&
                    items.warehouseDetailPage.formEightyInfo.length > 0 &&
                    items.warehouseDetailPage.formEightyInfo[0].input}
                </li>
                <li className="mb-3">
                  <img
                    className="mr-2"
                    src="/assets/images/icons/icon-scanner.png"
                    alt="cover"
                  />{" "}
                  Nearest Fire Station:{" "}
                  {items &&
                    items.warehouseDetailPage &&
                    items.warehouseDetailPage.formEightyInfo &&
                    items.warehouseDetailPage.formEightyInfo.length > 0 &&
                    items.warehouseDetailPage.formEightyInfo[1].input}
                </li>
                <li className="mb-3">
                  <img
                    className="mr-2"
                    src="/assets/images/icons/icon-pallet.png"
                    alt="cover"
                  />{" "}
                  Nearest School:{" "}
                  {items &&
                    items.warehouseDetailPage &&
                    items.warehouseDetailPage.formEightyInfo &&
                    items.warehouseDetailPage.formEightyInfo.length > 0 &&
                    items.warehouseDetailPage.formEightyInfo[5].input}
                </li>
                <li className="mb-3">
                  <img
                    className="mr-2"
                    src="/assets/images/icons/icon-telephone.png"
                    alt="cover"
                  />{" "}
                  Nearest Metro/ Bus station:{" "}
                  {items &&
                    items.warehouseDetailPage &&
                    items.warehouseDetailPage.formEightyInfo &&
                    items.warehouseDetailPage.formEightyInfo.length > 0 &&
                    items.warehouseDetailPage.formEightyInfo[8].input}
                </li>

                {open ? (
                  <>
                    <li className="mb-3">
                      <img
                        className="mr-2"
                        src="/assets/images/icons/icon-wifi.png"
                        alt="cover"
                      />{" "}
                      City center:{" "}
                      {items &&
                        items.warehouseDetailPage &&
                        items.warehouseDetailPage.formEightyInfo &&
                        items.warehouseDetailPage.formEightyInfo.length > 0 &&
                        items.warehouseDetailPage.formEightyInfo[9].input}
                    </li>

                    <li className="mb-3">
                      <img
                        className="mr-2"
                        src="/assets/images/icons/icon-home.png"
                        alt="cover"
                      />
                      Labour Hub:{" "}
                      {items &&
                        items.warehouseDetailPage &&
                        items.warehouseDetailPage.formEightyInfo &&
                        items.warehouseDetailPage.formEightyInfo.length > 0 &&
                        items.warehouseDetailPage.formEightyInfo[11].input}
                    </li>
                    <li className="mb-3">
                      <img
                        className="mr-2"
                        src="/assets/images/icons/icon-home.png"
                        alt="cover"
                      />
                      Public Transport Availability:{" "}
                      {items &&
                        items.warehouseDetailPage &&
                        items.warehouseDetailPage.formEightyInfo &&
                        items.warehouseDetailPage.formEightyInfo.length > 0 &&
                        items.warehouseDetailPage.formEightyInfo[12].input}
                    </li>
                    <li className="mb-3">
                      <img
                        className="mr-2"
                        src="/assets/images/icons/icon-home.png"
                        alt="cover"
                      />
                      Nearest Warehousing Hub:{" "}
                      {items &&
                        items.warehouseDetailPage &&
                        items.warehouseDetailPage.formEightyInfo &&
                        items.warehouseDetailPage.formEightyInfo.length > 0 &&
                        items.warehouseDetailPage.formEightyInfo[7].input}
                    </li>
                    <li className="mb-3">
                      <img
                        className="mr-2"
                        src="/assets/images/icons/icon-home.png"
                        alt="cover"
                      />
                      Nearest Hospital:{" "}
                      {items &&
                        items.warehouseDetailPage &&
                        items.warehouseDetailPage.formEightyInfo &&
                        items.warehouseDetailPage.formEightyInfo.length > 0 &&
                        items.warehouseDetailPage.formEightyInfo[13].input}
                    </li>
                    <li className="mb-3">
                      <img
                        className="mr-2"
                        src="/assets/images/icons/icon-file.png"
                        alt="cover"
                      />{" "}
                      WH in industrial area/WH zone?{" "}
                      {items &&
                        items.warehouseDetailPage &&
                        items.warehouseDetailPage.formEightyInfo &&
                        items.warehouseDetailPage.formEightyInfo.length > 0 &&
                        items.warehouseDetailPage.formEightyInfo[4].input}
                    </li>
                    <li className="mb-3">
                      <img
                        className="mr-2"
                        src="/assets/images/icons/icon-fire-noc.png"
                        alt="cover"
                      />{" "}
                      WH in residential area?{" "}
                      {items &&
                        items.warehouseDetailPage &&
                        items.warehouseDetailPage.formEightyInfo &&
                        items.warehouseDetailPage.formEightyInfo.length > 0 &&
                        items.warehouseDetailPage.formEightyInfo[2].input}
                    </li>
                  </>
                ) : null}
                <li className="mb-3">
                  <span
                    onClick={() => setopen(!open)}
                    href="#fb"
                    className="btn btn-link btn-link-deep-primary px-3 text-underline view-more-feature"
                  >
                    {!open ? "View More" : "View Less"}
                  </span>
                </li>
              </ul>
            </div>

            <div className="col-xl col-md-4 col-sm-6 col-max-xs-6 py-3">
              <h6 className="mb-4">Affiliation</h6>
              <ul className="list-unstyled text-gray">
                <li className="mb-3">
                  <img
                    className="mr-2"
                    src="/assets/images/icons/icon-cctv.png"
                    alt="cover"
                  />{" "}
                  Labour Union:{" "}
                  {items &&
                    items.warehouseDetailPage &&
                    items.warehouseDetailPage.formEightyInfo &&
                    items.warehouseDetailPage.formEightyInfo.length > 0 &&
                    items.warehouseDetailPage.formEightyInfo[15].input}
                </li>
                <li className="mb-3">
                  <img
                    className="mr-2"
                    src="/assets/images/icons/icon-sheild.png"
                    alt="cover"
                  />{" "}
                  Transport Union:{" "}
                  {items &&
                    items.warehouseDetailPage &&
                    items.warehouseDetailPage.formEightyInfo &&
                    items.warehouseDetailPage.formEightyInfo.length > 0 &&
                    items.warehouseDetailPage.formEightyInfo[16].input}
                </li>
              </ul>
            </div>

            <div className="col-xl col-md-4 col-sm-6 col-max-xs-6 py-3">
              <h6 className="mb-4">Electricity & Electrical Fittings</h6>
              <ul className="list-unstyled text-gray">
                <li className="mb-3">
                  <img
                    className="mr-2"
                    src="/assets/images/icons/icon-home.png"
                    alt="cover"
                  />{" "}
                  Genset:{" "}
                  {items &&
                    items.warehouseDetailPage &&
                    items.warehouseDetailPage.formEightyInfo &&
                    items.warehouseDetailPage.formEightyInfo.length > 0 &&
                    items.warehouseDetailPage.formEightyInfo[17].input}
                </li>
                <li className="mb-3">
                  <img
                    className="mr-2"
                    src="/assets/images/icons/icon-pallet.png"
                    alt="cover"
                  />{" "}
                  Solar or Green Energy:{" "}
                  {items &&
                    items.warehouseDetailPage &&
                    items.warehouseDetailPage.formEightyInfo &&
                    items.warehouseDetailPage.formEightyInfo.length > 0 &&
                    items.warehouseDetailPage.formEightyInfo[18].input}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="container mb-4">
          <div className="row">
            <div className="col-xl col-md-4 col-sm-6 col-max-xs-6 py-3">
              <h6 className="mb-4">Emergency Exit & Fire Prevention</h6>
              <ul className="list-unstyled text-gray">
                <li className="mb-3">
                  <img
                    className="mr-2"
                    src="/assets/images/icons/icon-home.png"
                    alt="cover"
                  />{" "}
                  No Of Emergency Door:{" "}
                  {items &&
                    items.warehouseDetailPage &&
                    items.warehouseDetailPage.formEightyInfo &&
                    items.warehouseDetailPage.formEightyInfo.length > 0 &&
                    items.warehouseDetailPage.formEightyInfo[20].input}
                </li>
                <li className="mb-3">
                  <img
                    className="mr-2"
                    src="/assets/images/icons/icon-pallet.png"
                    alt="cover"
                  />{" "}
                  Assembly Area:{" "}
                  {items &&
                    items.warehouseDetailPage &&
                    items.warehouseDetailPage.formEightyInfo &&
                    items.warehouseDetailPage.formEightyInfo.length > 0 &&
                    items.warehouseDetailPage.formEightyInfo[21].input}
                </li>
              </ul>
            </div>
            <div className="col-xl col-md-4 col-sm-6 col-max-xs-6 py-3">
              <h6 className="mb-4">Safety & Security</h6>
              <ul className="list-unstyled text-gray">
                <li className="mb-3">
                  <img
                    className="mr-2"
                    src="/assets/images/icons/icon-home.png"
                    alt="cover"
                  />{" "}
                  Gated Compound:{" "}
                  {items &&
                    items.warehouseDetailPage &&
                    items.warehouseDetailPage.formEightyInfo &&
                    items.warehouseDetailPage.formEightyInfo.length > 0 &&
                    items.warehouseDetailPage.formEightyInfo[22].input}
                </li>
                <li className="mb-3">
                  <img
                    className="mr-2"
                    src="/assets/images/icons/icon-pallet.png"
                    alt="cover"
                  />{" "}
                  No Of Gates:{" "}
                  {items &&
                    items.warehouseDetailPage &&
                    items.warehouseDetailPage.formEightyInfo &&
                    items.warehouseDetailPage.formEightyInfo.length > 0 &&
                    items.warehouseDetailPage.formEightyInfo[23].input}
                </li>
                <li className="mb-3">
                  <img
                    className="mr-2"
                    src="/assets/images/icons/icon-pallet.png"
                    alt="cover"
                  />{" "}
                  Security Room at Gate:{" "}
                  {items &&
                    items.warehouseDetailPage &&
                    items.warehouseDetailPage.formEightyInfo &&
                    items.warehouseDetailPage.formEightyInfo.length > 0 &&
                    items.warehouseDetailPage.formEightyInfo[24].input}
                </li>
                <li className="mb-3">
                  <img
                    className="mr-2"
                    src="/assets/images/icons/icon-pallet.png"
                    alt="cover"
                  />{" "}
                  CCTV:{" "}
                  {items &&
                    items.warehouseDetailPage &&
                    items.warehouseDetailPage.formEightyInfo &&
                    items.warehouseDetailPage.formEightyInfo.length > 0 &&
                    items.warehouseDetailPage.formEightyInfo[26].input}
                </li>
              </ul>
            </div>
            <div className="col-xl col-md-4 col-sm-6 col-max-xs-6 py-3">
              <h6 className="mb-4">Warehouse Operations</h6>
              <ul className="list-unstyled text-gray">
                <li className="mb-3">
                  <img
                    className="mr-2"
                    src="/assets/images/icons/icon-home.png"
                    alt="cover"
                  />{" "}
                  Operation hrs:{" "}
                  {items &&
                    items.warehouseDetailPage &&
                    items.warehouseDetailPage.formEightyInfo &&
                    items.warehouseDetailPage.formEightyInfo.length > 0 &&
                    items.warehouseDetailPage.formEightyInfo[25].input}
                </li>
              </ul>
            </div>
            <div className="col-xl col-md-4 col-sm-6 col-max-xs-6 py-3">
              <h6 className="mb-4">Worker Facility, Health & Safety</h6>
              <ul className="list-unstyled text-gray">
                <li className="mb-3">
                  <img
                    className="mr-2"
                    src="/assets/images/icons/icon-home.png"
                    alt="cover"
                  />{" "}
                  Pantry/Canteen:{" "}
                  {items &&
                    items.warehouseDetailPage &&
                    items.warehouseDetailPage.formEightyInfo &&
                    items.warehouseDetailPage.formEightyInfo.length > 0 &&
                    items.warehouseDetailPage.formEightyInfo[27].input}
                </li>
                <li className="mb-3">
                  <img
                    className="mr-2"
                    src="/assets/images/icons/icon-home.png"
                    alt="cover"
                  />{" "}
                  Staff/Workers Washroom:{" "}
                  {items &&
                    items.warehouseDetailPage &&
                    items.warehouseDetailPage.formEightyInfo &&
                    items.warehouseDetailPage.formEightyInfo.length > 0 &&
                    items.warehouseDetailPage.formEightyInfo[28].input}
                </li>
                <li className="mb-3">
                  <img
                    className="mr-2"
                    src="/assets/images/icons/icon-home.png"
                    alt="cover"
                  />{" "}
                  24hrs drinking water:{" "}
                  {items &&
                    items.warehouseDetailPage &&
                    items.warehouseDetailPage.formEightyInfo &&
                    items.warehouseDetailPage.formEightyInfo.length > 0 &&
                    items.warehouseDetailPage.formEightyInfo[29].input}
                </li>
                <li className="mb-3">
                  <img
                    className="mr-2"
                    src="/assets/images/icons/icon-home.png"
                    alt="cover"
                  />{" "}
                  First aid box:{" "}
                  {items &&
                    items.warehouseDetailPage &&
                    items.warehouseDetailPage.formEightyInfo &&
                    items.warehouseDetailPage.formEightyInfo.length > 0 &&
                    items.warehouseDetailPage.formEightyInfo[30].input}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section> */}

      {/* <section className="book-warehouse pt-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-12 mb-4">
              <h4 className="mb-4">Book Now</h4>

              <div className="row">
                <div className="col-md-12 form-group">
                  <label for="">Storage Material Type</label>
                  <input
                    onChange={handleChange5("storageType")}
                    required={true}
                    type="text"
                    id=""
                    className="form-control form-control-sm"
                    placeholder="Type here"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 form-group">
                  <label for="">No Of Pallets Position</label>
                  <input
                    onChange={handleChange5("NoOfPallets")}
                    onKeyPress={(e) => onlyNumberAllow(e)}
                    required={true}
                    type="number"
                    id=""
                    className="form-control form-control-sm"
                    placeholder="Type here"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 form-group">
                  <label for="">Area Required in sqft</label>
                  <input
                    onChange={handleChange5("AreaRequired")}
                    onKeyPress={(e) => onlyNumberAllow(e)}
                    required={true}
                    type="number"
                    id=""
                    className="form-control form-control-sm"
                    placeholder="Type here"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-auto col-sm-6 col-md-6">
                  <button
                    disabled={
                      email.storageType === "" ||
                      email.NoOfPallets === "" ||
                      email.AreaRequired === ""
                    }
                    onClick={() => handleClick2()}
                    className="btn btn-block btn-deep-primary my-1"
                  >
                    Check Price
                  </button>

                  <button
                    style={{ display: "none" }}
                    ref={myRefname2}
                    onClick={() => setCheckPrice(true)}
                    className="btn btn-block btn-deep-primary my-1"
                    data-target="#check-price-modal"
                    data-toggle="modal"
                  >
                    Check Price
                  </button>
                </div>
                <div className="col-auto col-sm-6 col-md-6">
                  {!data.CARTINFO.cartIdList?.includes(
                    parseInt(warehouseId)
                  ) ? (
                    <button
                      onClick={addCart}
                      disabled={data.CARTINFO.isPending}
                      type="button"
                      className="btn btn-block btn-outline-dark-primary my-1"
                    >
                      Add to Cart
                      {data.CARTINFO.isPending ? (
                        <Spinner animation="border" />
                      ) : null}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-block btn-outline-dark-primary my-1 text-success font-weight-bold"
                    >
                      Already in Cart
                    </button>
                  )}
                </div>
              </div>
              <div className="row">
               
                <div className="col-auto col-sm-6 col-md-6">
                  <button
                    onClick={reportwarehouse}
                    type="button"
                    className="btn btn-block text-danger my-1 px-2 py-1"
                  >
                    Report Warehouse
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}


      <div
        className="modal px-0"
        id="signin-modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="signin-modalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content border-0">
            <div className="modal-body py-0 px-sm-3 px-2">
              <div className="row">
                <div className="col-lg-8 modal-body-right-content pt-lg-2 pt-4 pb-4 px-0 order-lg-2">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <div className="card-body py-0">
                    <ul
                      className="nav nav-pills common-tabs mb-3"
                      id="signin-tab"
                      role="tablist"
                      data-getelement="#modal-body-left-content"
                    >
                      <li className="nav-item">
                        <a
                          className="nav-link h5 active"
                          id="signin-customer-tab"
                          data-toggle="pill"
                          href=".signin-customer"
                          role="tab"
                          aria-controls="signin-customer"
                          aria-selected="true"
                        >
                          customer
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link h5"
                          id="signin-space-provider-tab"
                          data-toggle="pill"
                          href=".signin-space-provider"
                          role="tab"
                          aria-controls="signin-space-provider"
                          aria-selected="false"
                        >
                          Space provider
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content px-3" id="signin-tabContent">
                      <div
                        className="tab-pane fade show active signin-customer"
                        id="signin-customer"
                        role="tabpanel"
                        aria-labelledby="signin-customer-tab"
                      >
                        <form action="">
                          <div className="row">
                            <div className="col-md-6 form-group">
                              <label for="customerfirstname">
                                First Name <sup className="text-danger">*</sup>
                              </label>
                              <input
                                type="text"
                                id="customerfirstname"
                                className="form-control form-control-sm"
                                placeholder="Type here"
                              />
                            </div>
                            <div className="col-md-6 form-group">
                              <label for="customerlastname">
                                Last Name <sup className="text-danger">*</sup>
                              </label>
                              <input
                                type="text"
                                id="customerlastname"
                                className="form-control form-control-sm"
                                placeholder="Type here"
                              />
                            </div>
                            <div className="col-md-6 form-group">
                              <label for="customercontactnumber">
                                Contact Number
                                <sup className="text-danger">*</sup>
                              </label>
                              <input
                                type="text"
                                id="customercontactnumber"
                                className="form-control form-control-sm"
                                placeholder="Type here"
                              />
                            </div>
                            <div className="col-md-6 form-group">
                              <label for="customeremailid">
                                Email ID <sup className="text-danger">*</sup>
                              </label>
                              <input
                                type="text"
                                id="customeremailid"
                                className="form-control form-control-sm"
                                placeholder="Type here"
                              />
                            </div>
                            <div className="col-md-6 form-group">
                              <label for="customerpassword">
                                Password<sup className="text-danger">*</sup>
                              </label>
                              <input
                                type="text"
                                id="customerpassword"
                                className="form-control form-control-sm"
                                placeholder="Type here"
                              />
                            </div>
                            <div className="col-md-6 form-group">
                              <label for="customerconfirmpassword">
                                Confirm Password
                                <sup className="text-danger">*</sup>
                              </label>
                              <input
                                type="text"
                                id="customerconfirmpassword"
                                className="form-control form-control-sm"
                                placeholder="Type here"
                              />
                            </div>
                            <div className="col-12 form-group mb-3">
                              <p className="mb-2">Type</p>
                              <div className="row">
                                <div className="col-auto">
                                  <div className="form-check common-radio-inline">
                                    <input
                                      className="common-radio-input"
                                      type="radio"
                                      name="customertypeOptions"
                                      id="customertype1"
                                      value="option1"
                                      hidden
                                    />
                                    <label
                                      className="common-radio-label pl-2"
                                      for="customertype1"
                                    >
                                      Individual
                                    </label>
                                  </div>
                                </div>
                                <div className="col-auto">
                                  <div className="form-check common-radio-inline">
                                    <input
                                      className="common-radio-input"
                                      type="radio"
                                      name="customertypeOptions"
                                      id="customertype2"
                                      value="option2"
                                      hidden
                                    />
                                    <label
                                      className="common-radio-label pl-2"
                                      for="customertype2"
                                    >
                                      Broker
                                    </label>
                                  </div>
                                </div>
                                <div className="col-auto">
                                  <div className="form-check common-radio-inline">
                                    <input
                                      className="common-radio-input"
                                      type="radio"
                                      name="customertypeOptions"
                                      id="customertype3"
                                      value="option3"
                                      hidden
                                    />
                                    <label
                                      className="common-radio-label pl-2"
                                      for="customertype3"
                                    >
                                      Organisation
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6 form-group">
                              <label for="customercompanyname">
                                Company Name
                              </label>
                              <input
                                type="text"
                                id="customercompanyname"
                                className="form-control form-control-sm"
                                placeholder="Type here"
                              />
                            </div>
                            <div className="col-12">
                              <div className="common-checkbox form-check">
                                <input
                                  type="checkbox"
                                  className="common-checkbox-input form-check-input"
                                  id="exampleCheck1"
                                />
                                <label
                                  className="common-checkbox-label form-check-label mb-2 pl-2"
                                  for="exampleCheck1"
                                >
                                  I agree to the{" "}
                                  <a
                                    href="terms-and-conditions.html"
                                    className="btn-link btn-link-dark-primary"
                                  >
                                    terms and conditions.
                                  </a>
                                </label>
                              </div>
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="btn btn-deep-primary my-3"
                          >
                            Submit
                          </button>
                          <p className="mb-0">
                            Already have an Account?{" "}
                            <a
                              href="#fb"
                              className="btn-line-dark-primary py-1"
                            >
                              Sign In
                            </a>
                          </p>
                        </form>
                      </div>
                      <div
                        className="tab-pane fade signin-space-provider"
                        id="signin-space-provider"
                        role="tabpanel"
                        aria-labelledby="signin-space-provider-tab"
                      >
                        <form action="">
                          <div className="row">
                            <div className="col-md-6 form-group">
                              <label for="spaceproviderfirstname">
                                First Name <sup className="text-danger">*</sup>
                              </label>
                              <input
                                type="text"
                                id="spaceproviderfirstname"
                                className="form-control form-control-sm"
                                placeholder="Type here"
                              />
                            </div>
                            <div className="col-md-6 form-group">
                              <label for="spaceproviderlastname">
                                Last Name <sup className="text-danger">*</sup>
                              </label>
                              <input
                                type="text"
                                id="spaceproviderlastname"
                                className="form-control form-control-sm"
                                placeholder="Type here"
                              />
                            </div>
                            <div className="col-md-6 form-group">
                              <label for="spaceprovidercontactnumber">
                                Contact Number
                                <sup className="text-danger">*</sup>
                              </label>
                              <input
                                type="text"
                                id="spaceprovidercontactnumber"
                                className="form-control form-control-sm"
                                placeholder="Type here"
                              />
                            </div>
                            <div className="col-md-6 form-group">
                              <label for="spaceprovideremailid">
                                Email ID <sup className="text-danger">*</sup>
                              </label>
                              <input
                                type="text"
                                id="spaceprovideremailid"
                                className="form-control form-control-sm"
                                placeholder="Type here"
                              />
                            </div>
                            <div className="col-md-6 form-group">
                              <label for="spaceproviderpassword">
                                Password<sup className="text-danger">*</sup>
                              </label>
                              <input
                                type="text"
                                id="spaceproviderpassword"
                                className="form-control form-control-sm"
                                placeholder="Type here"
                              />
                            </div>
                            <div className="col-md-6 form-group">
                              <label for="spaceproviderconfirmpassword">
                                Confirm Password
                                <sup className="text-danger">*</sup>
                              </label>
                              <input
                                type="text"
                                id="spaceproviderconfirmpassword"
                                className="form-control form-control-sm"
                                placeholder="Type here"
                              />
                            </div>
                            <div className="col-12 form-group mb-3">
                              <p className="mb-2">Type</p>
                              <div className="row">
                                <div className="col-auto">
                                  <div className="form-check common-radio-inline">
                                    <input
                                      className="common-radio-input"
                                      type="radio"
                                      name="spaceprovidertypeOptions"
                                      id="spaceprovidertype1"
                                      value="option1"
                                      hidden
                                    />
                                    <label
                                      className="common-radio-label pl-2"
                                      for="spaceprovidertype1"
                                    >
                                      Individual
                                    </label>
                                  </div>
                                </div>
                                <div className="col-auto">
                                  <div className="form-check common-radio-inline">
                                    <input
                                      className="common-radio-input"
                                      type="radio"
                                      name="spaceprovidertypeOptions"
                                      id="spaceprovidertype2"
                                      value="option2"
                                      hidden
                                    />
                                    <label
                                      className="common-radio-label pl-2"
                                      for="spaceprovidertype2"
                                    >
                                      Broker
                                    </label>
                                  </div>
                                </div>
                                <div className="col-auto">
                                  <div className="form-check common-radio-inline">
                                    <input
                                      className="common-radio-input"
                                      type="radio"
                                      name="spaceprovidertypeOptions"
                                      id="spaceprovidertype3"
                                      value="option3"
                                      hidden
                                    />
                                    <label
                                      className="common-radio-label pl-2"
                                      for="spaceprovidertype3"
                                    >
                                      Organisation
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6 form-group">
                              <label for="spaceprovidercompanyname">
                                Company Name
                              </label>
                              <input
                                type="text"
                                id="spaceprovidercompanyname"
                                className="form-control form-control-sm"
                                placeholder="Type here"
                              />
                            </div>
                            <div className="col-12">
                              <div className="common-checkbox form-check">
                                <input
                                  type="checkbox"
                                  className="common-checkbox-input form-check-input"
                                  id="spaceprovideragree"
                                />
                                <label
                                  className="common-checkbox-label form-check-label mb-2 pl-2"
                                  for="spaceprovideragree"
                                >
                                  I agree to the{" "}
                                  <a
                                    href="terms-and-conditions.html"
                                    className="btn-link btn-link-dark-primary"
                                  >
                                    terms and conditions.
                                  </a>
                                </label>
                              </div>
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="btn btn-deep-primary my-3"
                          >
                            Submit
                          </button>
                          <p className="mb-0">
                            Already have an Account?{" "}
                            <a
                              href="#fb"
                              className="btn-line-dark-primary py-1"
                            >
                              Sign In
                            </a>
                          </p>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 modal-body-left-content overlay deep-primary-overlay py-4 px-4 order-lg-1">
                  <div className="row" id="modal-body-left-content">
                    <div className="col-lg-12 tab-pane d-block signin-customer">
                      <div className="row">
                        <div className="col-lg-12 col-sm-6 border-bottom-line overlay-content p-3 signin-customer">
                          <h5 className="mb-4">Why Choose Us?</h5>
                          <ul className="pl-3">
                            <li className="mb-3">Boosting of the Revenue!</li>
                            <li className="mb-3">
                              Maximum Utilization Of Space!
                            </li>
                            <li className="mb-3">
                              Increase Your Space Occupancy Level!
                            </li>
                            <li className="mb-3">
                              Increased Visibility Of Your Assets!
                            </li>
                            <li className="mb-3">
                              Tech Support & Skill Development!
                            </li>
                          </ul>
                        </div>
                        <div className="col-lg-12 col-sm-6 overlay-content p-3">
                          <h5 className="mb-4">
                            Who can list with Warehousity?
                          </h5>
                          <ul className="pl-3">
                            <li className="mb-3">Boosting of the Revenue!</li>
                            <li className="mb-3">
                              Maximum Utilization Of Space!
                            </li>
                            <li className="mb-3">
                              Increase Your Space Occupancy Level!
                            </li>
                            <li className="mb-3">
                              Increased Visibility Of Your Assets!
                            </li>
                            <li className="mb-3">
                              Tech Support & Skill Development!
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12 tab-pane d-none signin-space-provider">
                      <div className="row">
                        <div className="col-lg-12 col-sm-6 border-bottom-line overlay-content p-3 signin-customer">
                          <h5 className="mb-4">Why Choose Us?</h5>
                          <ul className="pl-3">
                            <li className="mb-3">Boosting of the Revenue!</li>
                            <li className="mb-3">
                              Maximum Utilization Of Space!
                            </li>
                            <li className="mb-3">
                              Increase Your Space Occupancy Level!
                            </li>
                            <li className="mb-3">
                              Increased Visibility Of Your Assets!
                            </li>
                            <li className="mb-3">
                              Tech Support & Skill Development!
                            </li>
                          </ul>
                        </div>
                        <div className="col-lg-12 col-sm-6 overlay-content p-3">
                          <h5 className="mb-4">
                            Who can list with Warehousity?
                          </h5>
                          <ul className="pl-3">
                            <li className="mb-3">Boosting of the Revenue!</li>
                            <li className="mb-3">
                              Maximum Utilization Of Space!
                            </li>
                            <li className="mb-3">
                              Increase Your Space Occupancy Level!
                            </li>
                            <li className="mb-3">
                              Increased Visibility Of Your Assets!
                            </li>
                            <li className="mb-3">
                              Tech Support & Skill Development!
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sign In Modal */}
      <div
        className="modal px-0"
        id="create-account-modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="create-account-modalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content border-0">
            <div className="modal-body py-0">
              <div className="row px-3">
                <div className="modal-body-right-content py-lg-4 my-1 p-sm-4 p-3">
                  <div className="row">
                    <div className="col-12">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                      <div>
                        <h5 className="mb-4 modal-title">
                          Sign up to check price
                        </h5>
                      </div>
                    </div>
                  </div>
                  <form action="">
                    <div className="row">
                      <div className="col-sm-6 form-group mb-3">
                        <label for="spaceproviderfirstname">
                          First Name <sup className="text-danger">*</sup>
                        </label>
                        <input
                          type="text"
                          id="spaceproviderfirstname"
                          className="form-control form-control-sm"
                          placeholder="Type here"
                        />
                      </div>
                      <div className="col-sm-6 form-group mb-3">
                        <label for="spaceproviderlastname">
                          Last Name <sup className="text-danger">*</sup>
                        </label>
                        <input
                          type="text"
                          id="spaceproviderlastname"
                          className="form-control form-control-sm"
                          placeholder="Type here"
                        />
                      </div>
                      <div className="col-sm-6 form-group mb-3">
                        <label for="spaceprovidercontactnumber">
                          Contact Number<sup className="text-danger">*</sup>
                        </label>
                        <input
                          type="text"
                          id="spaceprovidercontactnumber"
                          className="form-control form-control-sm"
                          placeholder="Type here"
                        />
                      </div>
                      <div className="col-sm-6 form-group mb-3">
                        <label for="spaceprovideremailid">
                          Email ID <sup className="text-danger">*</sup>
                        </label>
                        <input
                          type="text"
                          id="spaceprovideremailid"
                          className="form-control form-control-sm"
                          placeholder="Type here"
                        />
                      </div>
                      <div className="col-sm-6 form-group mb-3">
                        <label for="spaceproviderpassword">
                          Password<sup className="text-danger">*</sup>
                        </label>
                        <input
                          type="text"
                          id="spaceproviderpassword"
                          className="form-control form-control-sm"
                          placeholder="Type here"
                        />
                      </div>
                      <div className="col-sm-6 form-group mb-3">
                        <label for="spaceproviderconfirmpassword">
                          Confirm Password<sup className="text-danger">*</sup>
                        </label>
                        <input
                          type="text"
                          id="spaceproviderconfirmpassword"
                          className="form-control form-control-sm"
                          placeholder="Type here"
                        />
                      </div>
                      <div className="col-12 form-group mb-3">
                        <p className="mb-2">Type</p>
                        <div className="row">
                          <div className="col-auto">
                            <div className="form-check common-radio-inline">
                              <input
                                className="common-radio-input"
                                type="radio"
                                name="spaceprovidertypeOptions"
                                id="spaceprovidertype1"
                                value="option1"
                                hidden
                              />
                              <label
                                className="common-radio-label pl-2"
                                for="spaceprovidertype1"
                              >
                                Individual
                              </label>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="form-check common-radio-inline">
                              <input
                                className="common-radio-input"
                                type="radio"
                                name="spaceprovidertypeOptions"
                                id="spaceprovidertype2"
                                value="option2"
                                hidden
                              />
                              <label
                                className="common-radio-label pl-2"
                                for="spaceprovidertype2"
                              >
                                Broker
                              </label>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="form-check common-radio-inline">
                              <input
                                className="common-radio-input"
                                type="radio"
                                name="spaceprovidertypeOptions"
                                id="spaceprovidertype3"
                                value="option3"
                                hidden
                              />
                              <label
                                className="common-radio-label pl-2"
                                for="spaceprovidertype3"
                              >
                                Organisation
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 form-group">
                        <label for="spaceprovidercompanyname">
                          Company Name
                        </label>
                        <input
                          type="text"
                          id="spaceprovidercompanyname"
                          className="form-control form-control-sm"
                          placeholder="Type here"
                        />
                      </div>
                      <div className="col-12">
                        <div className="common-checkbox form-check">
                          <input
                            type="checkbox"
                            className="common-checkbox-input form-check-input"
                            id="spaceprovideragree"
                          />
                          <label
                            className="common-checkbox-label form-check-label mb-2 pl-2"
                            for="spaceprovideragree"
                          >
                            I agree to the{" "}
                            <a
                              href="terms-and-conditions.html"
                              className="btn-link btn-link-deep-primary"
                            >
                              terms and conditions.
                            </a>
                          </label>
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-deep-primary my-3">
                      Submit
                    </button>
                    <p className="mb-0">
                      Already have an Account?{" "}
                      <a href="#fb" className="btn-line-deep-primary py-1">
                        Sign In
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===============  Check Price  ===================== */}

      <Modal
        show={checkPrice}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="m-0 p-0">
          {/* <div className="modal px-0" id="check-price-modal" tabindex="-1" role="dialog" aria-labelledby="check-price-modalLabel" aria-hidden="true"> */}
          {/* <div className="modal-dialog modal-lg" role="document"> */}
          <div className="modal-content border-0">
            <div className="modal-body py-0">
              <div className="row px-3">
                <div className="modal-body-right-content w-100 py-lg-4 my-1 p-sm-4 p-3">
                  <div className="row">
                    <div className="col-12">
                      <button
                        onClick={() => setCheckPrice(false)}
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                      <div className="text-center">
                        <h5 className="mb-4 modal-title">
                          Warehouse Price Trend - Warehousity
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="row">
                      <div className="col-lg-9 mx-auto">
                        <img
                          className="img-fluid w-100"
                          src="/assets/images/check-price.png"
                          alt="images"
                        />
                      </div>
                    </div>
                    <div
                      onClick={() => setCheckPrice(false)}
                      className="text-right"
                    >
                      {data.authenticated ? (
                        <button
                          type="submit"
                          className="btn btn-deep-primary my-3"
                          data-dismiss="modal"
                          data-target="#mobile-number-modal"
                          data-toggle="modal"
                        >
                          Proceed
                        </button>
                      ) : (
                        <button
                          onClick={addCart}
                          type="button"
                          className="btn btn-deep-primary my-3"
                        >
                          Proceed
                        </button>
                      )}
                      {/* <button  type="submit" className="btn btn-deep-primary my-3" data-dismiss="modal" data-target="#mobile-number-modal" data-toggle="modal">Proceed</button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* </div> */}
            {/* </div> */}
          </div>
        </Modal.Body>
      </Modal>

      {/* ==================================== */}

      <Modal
        show={checkPrice}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="m-0 p-0">
          {/* <div className="modal px-0" id="check-price-modal" tabindex="-1" role="dialog" aria-labelledby="check-price-modalLabel" aria-hidden="true"> */}
          {/* <div className="modal-dialog modal-lg" role="document"> */}
          <div className="modal-content border-0">
            <div className="modal-body py-0">
              <div className="row px-3">
                <div className="modal-body-right-content w-100 py-lg-4 my-1 p-sm-4 p-3">
                  <div className="row">
                    <div className="col-12">
                      <button
                        onClick={() => setCheckPrice(false)}
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                      <div className="text-center">
                        <h5 className="mb-4 modal-title">
                          Warehouse Price Trend - Warehousity
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="row">
                      <div className="col-lg-9 mx-auto">
                        <img
                          className="img-fluid w-100"
                          src="/assets/images/check-price.png"
                          alt="images"
                        />
                      </div>
                    </div>
                    <div className="text-right">

                      {!data.authenticated ? (
                        <button
                          onClick={() => {
                            setCheckPrice(false);
                            setmobilemodal(true);
                          }}
                          type="submit"
                          className="btn btn-deep-primary my-3"
                        >
                          Proceed
                        </button>
                      ) : (
                        <button
                          onClick={createAndRedirectOnRfq}
                          disabled={rfqLoad}
                          type="button"
                          className="btn btn-deep-primary my-3"
                        >
                          {rfqLoad ? <Spinner animation="border" /> : null}
                          Proceed
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* </div> */}
            {/* </div> */}
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={mobilemodal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        closeButton
      >
        <Modal.Body className="m-0 p-0">
          {/* <div className="modal-dialog" role="document"> */}
          <div className="modal-content border-0">
            <div className="modal-body py-0">
              <div className="row px-3">
                <div className="col-12 py-lg-4 my-3 p-sm-5 p-3">
                  <div className="row">
                    <div className="col-12">
                      <button
                        onClick={() => setmobilemodal(false)}
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                      <div>
                        <div className="img-holder text-center">
                          <img
                            className="img-fluid"
                            src="/assets/images/logo.png"
                            alt="logo"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="row mt-4">
                      <div className="form-group col-12 mt-2">
                        <label for="mobilenumber" className="font-heading">
                          Enter Mobile Number
                        </label>
                        <div className="input-group mb-3 d-flex phone-group rounded-0">
                          <div className="input-group-prepend">
                            <span
                              className="input-group-text p-0 bg-none"
                              id="mobile-number-group"
                            >
                              <select
                                className="form-control form-control-sm custom-select border-0"
                                name="countryCode"
                                id=""
                              >
                                <option data-countryCode="IN" value="91">
                                  +91
                                </option>
                                <option data-countryCode="US" value="1">
                                  +1
                                </option>
                                <optgroup label="Other countries">
                                  <option data-countryCode="DZ" value="213">
                                    +213
                                  </option>
                                  <option data-countryCode="AD" value="376">
                                    +376
                                  </option>
                                  <option data-countryCode="AO" value="244">
                                    +244
                                  </option>
                                  <option data-countryCode="AI" value="1264">
                                    +1264
                                  </option>
                                  <option data-countryCode="AG" value="1268">
                                    +1268
                                  </option>
                                  <option data-countryCode="AR" value="54">
                                    +54
                                  </option>
                                  <option data-countryCode="AM" value="374">
                                    +374
                                  </option>
                                  <option data-countryCode="AW" value="297">
                                    +297
                                  </option>
                                  <option data-countryCode="AU" value="61">
                                    +61
                                  </option>
                                  <option data-countryCode="AT" value="43">
                                    +43
                                  </option>
                                  <option data-countryCode="AZ" value="994">
                                    +994
                                  </option>
                                  <option data-countryCode="BS" value="1242">
                                    +1242
                                  </option>
                                  <option data-countryCode="BH" value="973">
                                    +973
                                  </option>
                                  <option data-countryCode="BD" value="880">
                                    +880
                                  </option>
                                  <option data-countryCode="BB" value="1246">
                                    +1246
                                  </option>
                                  <option data-countryCode="BY" value="375">
                                    +375
                                  </option>
                                  <option data-countryCode="BE" value="32">
                                    +32
                                  </option>
                                  <option data-countryCode="BZ" value="501">
                                    +501
                                  </option>
                                  <option data-countryCode="BJ" value="229">
                                    +229
                                  </option>
                                  <option data-countryCode="BM" value="1441">
                                    +1441
                                  </option>
                                  <option data-countryCode="BT" value="975">
                                    +975
                                  </option>
                                  <option data-countryCode="BO" value="591">
                                    +591
                                  </option>
                                  <option data-countryCode="BA" value="387">
                                    +387
                                  </option>
                                  <option data-countryCode="BW" value="267">
                                    +267
                                  </option>
                                  <option data-countryCode="BR" value="55">
                                    +55
                                  </option>
                                  <option data-countryCode="BN" value="673">
                                    +673
                                  </option>
                                  <option data-countryCode="BG" value="359">
                                    +359
                                  </option>
                                  <option data-countryCode="BF" value="226">
                                    +226
                                  </option>
                                  <option data-countryCode="BI" value="257">
                                    +257
                                  </option>
                                  <option data-countryCode="KH" value="855">
                                    +855
                                  </option>
                                  <option data-countryCode="CM" value="237">
                                    +237
                                  </option>
                                  <option data-countryCode="CA" value="1">
                                    +1
                                  </option>
                                  <option data-countryCode="CV" value="238">
                                    +238
                                  </option>
                                  <option data-countryCode="KY" value="1345">
                                    +1345
                                  </option>
                                  <option data-countryCode="CF" value="236">
                                    +236
                                  </option>
                                  <option data-countryCode="CL" value="56">
                                    +56
                                  </option>
                                  <option data-countryCode="CN" value="86">
                                    +86
                                  </option>
                                  <option data-countryCode="CO" value="57">
                                    +57
                                  </option>
                                  <option data-countryCode="KM" value="269">
                                    +269
                                  </option>
                                  <option data-countryCode="CG" value="242">
                                    +242
                                  </option>
                                  <option data-countryCode="CK" value="682">
                                    +682
                                  </option>
                                  <option data-countryCode="CR" value="506">
                                    +506
                                  </option>
                                  <option data-countryCode="HR" value="385">
                                    +385
                                  </option>
                                  <option data-countryCode="CU" value="53">
                                    +53
                                  </option>
                                  <option data-countryCode="CY" value="90392">
                                    +90392
                                  </option>
                                  <option data-countryCode="CY" value="357">
                                    +357
                                  </option>
                                  <option data-countryCode="CZ" value="42">
                                    +42
                                  </option>
                                  <option data-countryCode="DK" value="45">
                                    +45
                                  </option>
                                  <option data-countryCode="DJ" value="253">
                                    +253
                                  </option>
                                  <option data-countryCode="DM" value="1809">
                                    +1809
                                  </option>
                                  <option data-countryCode="DO" value="1809">
                                    +1809
                                  </option>
                                  <option data-countryCode="EC" value="593">
                                    +593
                                  </option>
                                  <option data-countryCode="EG" value="20">
                                    +20
                                  </option>
                                  <option data-countryCode="SV" value="503">
                                    +503
                                  </option>
                                  <option data-countryCode="GQ" value="240">
                                    +240
                                  </option>
                                  <option data-countryCode="ER" value="291">
                                    +291
                                  </option>
                                  <option data-countryCode="EE" value="372">
                                    +372
                                  </option>
                                  <option data-countryCode="ET" value="251">
                                    +251
                                  </option>
                                  <option data-countryCode="FK" value="500">
                                    +500
                                  </option>
                                  <option data-countryCode="FO" value="298">
                                    +298
                                  </option>
                                  <option data-countryCode="FJ" value="679">
                                    +679
                                  </option>
                                  <option data-countryCode="FI" value="358">
                                    +358
                                  </option>
                                  <option data-countryCode="FR" value="33">
                                    +33
                                  </option>
                                  <option data-countryCode="GF" value="594">
                                    +594
                                  </option>
                                  <option data-countryCode="PF" value="689">
                                    +689
                                  </option>
                                  <option data-countryCode="GA" value="241">
                                    +241
                                  </option>
                                  <option data-countryCode="GM" value="220">
                                    +220
                                  </option>
                                  <option data-countryCode="GE" value="7880">
                                    +7880
                                  </option>
                                  <option data-countryCode="DE" value="49">
                                    +49
                                  </option>
                                  <option data-countryCode="GH" value="233">
                                    +233
                                  </option>
                                  <option data-countryCode="GI" value="350">
                                    +350
                                  </option>
                                  <option data-countryCode="GR" value="30">
                                    +30
                                  </option>
                                  <option data-countryCode="GL" value="299">
                                    +299
                                  </option>
                                  <option data-countryCode="GD" value="1473">
                                    +1473
                                  </option>
                                  <option data-countryCode="GP" value="590">
                                    +590
                                  </option>
                                  <option data-countryCode="GU" value="671">
                                    +671
                                  </option>
                                  <option data-countryCode="GT" value="502">
                                    +502
                                  </option>
                                  <option data-countryCode="GN" value="224">
                                    +224
                                  </option>
                                  <option data-countryCode="GW" value="245">
                                    +245
                                  </option>
                                  <option data-countryCode="GY" value="592">
                                    +592
                                  </option>
                                  <option data-countryCode="HT" value="509">
                                    +509
                                  </option>
                                  <option data-countryCode="HN" value="504">
                                    +504
                                  </option>
                                  <option data-countryCode="HK" value="852">
                                    +852
                                  </option>
                                  <option data-countryCode="HU" value="36">
                                    +36
                                  </option>
                                  <option data-countryCode="IS" value="354">
                                    +354
                                  </option>
                                  <option data-countryCode="GB" value="44">
                                    +44
                                  </option>

                                  <option data-countryCode="ID" value="62">
                                    +62
                                  </option>
                                  <option data-countryCode="IR" value="98">
                                    +98
                                  </option>
                                  <option data-countryCode="IQ" value="964">
                                    +964
                                  </option>
                                  <option data-countryCode="IE" value="353">
                                    +353
                                  </option>
                                  <option data-countryCode="IL" value="972">
                                    +972
                                  </option>
                                  <option data-countryCode="IT" value="39">
                                    +39
                                  </option>
                                  <option data-countryCode="JM" value="1876">
                                    +1876
                                  </option>
                                  <option data-countryCode="JP" value="81">
                                    +81
                                  </option>
                                  <option data-countryCode="JO" value="962">
                                    +962
                                  </option>
                                  <option data-countryCode="KZ" value="7">
                                    +7
                                  </option>
                                  <option data-countryCode="KE" value="254">
                                    +254
                                  </option>
                                  <option data-countryCode="KI" value="686">
                                    +686
                                  </option>
                                  <option data-countryCode="KP" value="850">
                                    +850
                                  </option>
                                  <option data-countryCode="KR" value="82">
                                    +82
                                  </option>
                                  <option data-countryCode="KW" value="965">
                                    +965
                                  </option>
                                  <option data-countryCode="KG" value="996">
                                    +996
                                  </option>
                                  <option data-countryCode="LA" value="856">
                                    +856
                                  </option>
                                  <option data-countryCode="LV" value="371">
                                    +371
                                  </option>
                                  <option data-countryCode="LB" value="961">
                                    +961
                                  </option>
                                  <option data-countryCode="LS" value="266">
                                    +266
                                  </option>
                                  <option data-countryCode="LR" value="231">
                                    +231
                                  </option>
                                  <option data-countryCode="LY" value="218">
                                    +218
                                  </option>
                                  <option data-countryCode="LI" value="417">
                                    +417
                                  </option>
                                  <option data-countryCode="LT" value="370">
                                    +370
                                  </option>
                                  <option data-countryCode="LU" value="352">
                                    +352
                                  </option>
                                  <option data-countryCode="MO" value="853">
                                    +853
                                  </option>
                                  <option data-countryCode="MK" value="389">
                                    +389
                                  </option>
                                  <option data-countryCode="MG" value="261">
                                    +261
                                  </option>
                                  <option data-countryCode="MW" value="265">
                                    +265
                                  </option>
                                  <option data-countryCode="MY" value="60">
                                    +60
                                  </option>
                                  <option data-countryCode="MV" value="960">
                                    +960
                                  </option>
                                  <option data-countryCode="ML" value="223">
                                    +223
                                  </option>
                                  <option data-countryCode="MT" value="356">
                                    +356
                                  </option>
                                  <option data-countryCode="MH" value="692">
                                    +692
                                  </option>
                                  <option data-countryCode="MQ" value="596">
                                    +596
                                  </option>
                                  <option data-countryCode="MR" value="222">
                                    +222
                                  </option>
                                  <option data-countryCode="YT" value="269">
                                    +269
                                  </option>
                                  <option data-countryCode="MX" value="52">
                                    +52
                                  </option>
                                  <option data-countryCode="FM" value="691">
                                    +691
                                  </option>
                                  <option data-countryCode="MD" value="373">
                                    +373
                                  </option>
                                  <option data-countryCode="MC" value="377">
                                    +377
                                  </option>
                                  <option data-countryCode="MN" value="976">
                                    +976
                                  </option>
                                  <option data-countryCode="MS" value="1664">
                                    +1664
                                  </option>
                                  <option data-countryCode="MA" value="212">
                                    +212
                                  </option>
                                  <option data-countryCode="MZ" value="258">
                                    +258
                                  </option>
                                  <option data-countryCode="MN" value="95">
                                    +95
                                  </option>
                                  <option data-countryCode="NA" value="264">
                                    +264
                                  </option>
                                  <option data-countryCode="NR" value="674">
                                    +674
                                  </option>
                                  <option data-countryCode="NP" value="977">
                                    +977
                                  </option>
                                  <option data-countryCode="NL" value="31">
                                    +31
                                  </option>
                                  <option data-countryCode="NC" value="687">
                                    +687
                                  </option>
                                  <option data-countryCode="NZ" value="64">
                                    +64
                                  </option>
                                  <option data-countryCode="NI" value="505">
                                    +505
                                  </option>
                                  <option data-countryCode="NE" value="227">
                                    +227
                                  </option>
                                  <option data-countryCode="NG" value="234">
                                    +234
                                  </option>
                                  <option data-countryCode="NU" value="683">
                                    +683
                                  </option>
                                  <option data-countryCode="NF" value="672">
                                    +672
                                  </option>
                                  <option data-countryCode="NP" value="670">
                                    +670
                                  </option>
                                  <option data-countryCode="NO" value="47">
                                    +47
                                  </option>
                                  <option data-countryCode="OM" value="968">
                                    +968
                                  </option>
                                  <option data-countryCode="PW" value="680">
                                    +680
                                  </option>
                                  <option data-countryCode="PA" value="507">
                                    +507
                                  </option>
                                  <option data-countryCode="PG" value="675">
                                    +675
                                  </option>
                                  <option data-countryCode="PY" value="595">
                                    +595
                                  </option>
                                  <option data-countryCode="PE" value="51">
                                    +51
                                  </option>
                                  <option data-countryCode="PH" value="63">
                                    +63
                                  </option>
                                  <option data-countryCode="PL" value="48">
                                    +48
                                  </option>
                                  <option data-countryCode="PT" value="351">
                                    +351
                                  </option>
                                  <option data-countryCode="PR" value="1787">
                                    +1787
                                  </option>
                                  <option data-countryCode="QA" value="974">
                                    +974
                                  </option>
                                  <option data-countryCode="RE" value="262">
                                    +262
                                  </option>
                                  <option data-countryCode="RO" value="40">
                                    +40
                                  </option>
                                  <option data-countryCode="RU" value="7">
                                    +7
                                  </option>
                                  <option data-countryCode="RW" value="250">
                                    +250
                                  </option>
                                  <option data-countryCode="SM" value="378">
                                    +378
                                  </option>
                                  <option data-countryCode="ST" value="239">
                                    +239
                                  </option>
                                  <option data-countryCode="SA" value="966">
                                    +966
                                  </option>
                                  <option data-countryCode="SN" value="221">
                                    +221
                                  </option>
                                  <option data-countryCode="CS" value="381">
                                    +381
                                  </option>
                                  <option data-countryCode="SC" value="248">
                                    +248
                                  </option>
                                  <option data-countryCode="SL" value="232">
                                    +232
                                  </option>
                                  <option data-countryCode="SG" value="65">
                                    +65
                                  </option>
                                  <option data-countryCode="SK" value="421">
                                    +421
                                  </option>
                                  <option data-countryCode="SI" value="386">
                                    +386
                                  </option>
                                  <option data-countryCode="SB" value="677">
                                    +677
                                  </option>
                                  <option data-countryCode="SO" value="252">
                                    +252
                                  </option>
                                  <option data-countryCode="ZA" value="27">
                                    +27
                                  </option>
                                  <option data-countryCode="ES" value="34">
                                    +34
                                  </option>
                                  <option data-countryCode="LK" value="94">
                                    +94
                                  </option>
                                  <option data-countryCode="SH" value="290">
                                    +290
                                  </option>
                                  <option data-countryCode="KN" value="1869">
                                    +1869
                                  </option>
                                  <option data-countryCode="SC" value="1758">
                                    +1758
                                  </option>
                                  <option data-countryCode="SD" value="249">
                                    +249
                                  </option>
                                  <option data-countryCode="SR" value="597">
                                    +597
                                  </option>
                                  <option data-countryCode="SZ" value="268">
                                    +268
                                  </option>
                                  <option data-countryCode="SE" value="46">
                                    +46
                                  </option>
                                  <option data-countryCode="CH" value="41">
                                    +41
                                  </option>
                                  <option data-countryCode="SI" value="963">
                                    +963
                                  </option>
                                  <option data-countryCode="TW" value="886">
                                    +886
                                  </option>
                                  <option data-countryCode="TJ" value="7">
                                    +7
                                  </option>
                                  <option data-countryCode="TH" value="66">
                                    +66
                                  </option>
                                  <option data-countryCode="TG" value="228">
                                    +228
                                  </option>
                                  <option data-countryCode="TO" value="676">
                                    +676
                                  </option>
                                  <option data-countryCode="TT" value="1868">
                                    +1868
                                  </option>
                                  <option data-countryCode="TN" value="216">
                                    +216
                                  </option>
                                  <option data-countryCode="TR" value="90">
                                    +90
                                  </option>
                                  <option data-countryCode="TM" value="7">
                                    +7
                                  </option>
                                  <option data-countryCode="TM" value="993">
                                    +993
                                  </option>
                                  <option data-countryCode="TC" value="1649">
                                    +1649
                                  </option>
                                  <option data-countryCode="TV" value="688">
                                    +688
                                  </option>
                                  <option data-countryCode="UG" value="256">
                                    +256
                                  </option>
                                  <option data-countryCode="UZ" value="7">
                                    +7
                                  </option>
                                  <option data-countryCode="VU" value="678">
                                    +678
                                  </option>
                                  <option data-countryCode="VA" value="379">
                                    +379
                                  </option>
                                  <option data-countryCode="VE" value="58">
                                    +58
                                  </option>
                                  <option data-countryCode="VN" value="84">
                                    +84
                                  </option>
                                  <option data-countryCode="VG" value="84">
                                    +1284
                                  </option>
                                  <option data-countryCode="VI" value="84">
                                    +1340
                                  </option>
                                  <option data-countryCode="WF" value="681">
                                    +681
                                  </option>
                                  <option data-countryCode="YE" value="969">
                                    (+969
                                  </option>
                                  <option data-countryCode="YE" value="967">
                                    (+967
                                  </option>
                                  <option data-countryCode="ZM" value="260">
                                    +260
                                  </option>
                                  <option data-countryCode="ZW" value="263">
                                    +263
                                  </option>
                                </optgroup>
                              </select>
                            </span>
                          </div>
                          <input
                            name="phoneNumber"
                            id="phoneNumber"
                            title="Please use a 10 digit telephone number with no dashes or dots"
                            pattern="[0-9]{10}"
                            onInput={maxLengthCheck}
                            onKeyDown={(e) =>
                              /[+\-.,]$/.test(e.key) && e.preventDefault()
                            }
                            maxLength={10}
                            minLength={10}
                            value={email.mobile}
                            required={true}
                            onChange={handleChange5("mobile")}
                            type="number"
                            className="form-control form-control-sm"
                            placeholder="Mobile Number (10 digits)"
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-deep-primary rounded-0 btn-block"
                    >
                      Continue
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* Mobile Number  */}

      {/* Verify OTP  */}
      <div
        className="modal px-0"
        id="verify-otp-modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="verify-otp-modalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content border-0">
            <div className="modal-body py-0">
              <div className="row px-3">
                <div className="col-12 py-lg-4 my-3 p-sm-5 p-3">
                  <div className="row">
                    <div className="col-12">
                      {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>  */}
                      <div>
                        <div className="img-holder text-center">
                          <img
                            className="img-fluid"
                            src="/assets/images/logo.png"
                            alt="logo"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <form action="">
                    <div className="row mt-4">
                      <div className="form-group col-12 mt-2 mb-0">
                        <h5 className="text-center">Verify OTP</h5>
                        <label
                          for="mobilenumber"
                          className="font-heading text-center mb-3"
                        >
                          We have sent a verification code on our registered
                          mobile number 
                        </label>
                        <div className="disabled-true inputs">
                          <div className="input-group d-flex phone-group rounded-0">
                            <div className="input-group-prepend">
                              <span
                                className="input-group-text p-0 bg-none"
                                id="mobile-number-group"
                              >
                                <select
                                  className="form-control form-control-sm custom-select border-0 rounded-0"
                                  name="countryCode"
                                  id=""
                                >
                                  <option data-countryCode="GB" value="44">
                                    +44
                                  </option>
                                  <option data-countryCode="US" value="1">
                                    +1
                                  </option>
                                  <optgroup label="Other countries">
                                    <option data-countryCode="DZ" value="213">
                                      +213
                                    </option>
                                    <option data-countryCode="AD" value="376">
                                      +376
                                    </option>
                                    <option data-countryCode="AO" value="244">
                                      +244
                                    </option>
                                    <option data-countryCode="AI" value="1264">
                                      +1264
                                    </option>
                                    <option data-countryCode="AG" value="1268">
                                      +1268
                                    </option>
                                    <option data-countryCode="AR" value="54">
                                      +54
                                    </option>
                                    <option data-countryCode="AM" value="374">
                                      +374
                                    </option>
                                    <option data-countryCode="AW" value="297">
                                      +297
                                    </option>
                                    <option data-countryCode="AU" value="61">
                                      +61
                                    </option>
                                    <option data-countryCode="AT" value="43">
                                      +43
                                    </option>
                                    <option data-countryCode="AZ" value="994">
                                      +994
                                    </option>
                                    <option data-countryCode="BS" value="1242">
                                      +1242
                                    </option>
                                    <option data-countryCode="BH" value="973">
                                      +973
                                    </option>
                                    <option data-countryCode="BD" value="880">
                                      +880
                                    </option>
                                    <option data-countryCode="BB" value="1246">
                                      +1246
                                    </option>
                                    <option data-countryCode="BY" value="375">
                                      +375
                                    </option>
                                    <option data-countryCode="BE" value="32">
                                      +32
                                    </option>
                                    <option data-countryCode="BZ" value="501">
                                      +501
                                    </option>
                                    <option data-countryCode="BJ" value="229">
                                      +229
                                    </option>
                                    <option data-countryCode="BM" value="1441">
                                      +1441
                                    </option>
                                    <option data-countryCode="BT" value="975">
                                      +975
                                    </option>
                                    <option data-countryCode="BO" value="591">
                                      +591
                                    </option>
                                    <option data-countryCode="BA" value="387">
                                      +387
                                    </option>
                                    <option data-countryCode="BW" value="267">
                                      +267
                                    </option>
                                    <option data-countryCode="BR" value="55">
                                      +55
                                    </option>
                                    <option data-countryCode="BN" value="673">
                                      +673
                                    </option>
                                    <option data-countryCode="BG" value="359">
                                      +359
                                    </option>
                                    <option data-countryCode="BF" value="226">
                                      +226
                                    </option>
                                    <option data-countryCode="BI" value="257">
                                      +257
                                    </option>
                                    <option data-countryCode="KH" value="855">
                                      +855
                                    </option>
                                    <option data-countryCode="CM" value="237">
                                      +237
                                    </option>
                                    <option data-countryCode="CA" value="1">
                                      +1
                                    </option>
                                    <option data-countryCode="CV" value="238">
                                      +238
                                    </option>
                                    <option data-countryCode="KY" value="1345">
                                      +1345
                                    </option>
                                    <option data-countryCode="CF" value="236">
                                      +236
                                    </option>
                                    <option data-countryCode="CL" value="56">
                                      +56
                                    </option>
                                    <option data-countryCode="CN" value="86">
                                      +86
                                    </option>
                                    <option data-countryCode="CO" value="57">
                                      +57
                                    </option>
                                    <option data-countryCode="KM" value="269">
                                      +269
                                    </option>
                                    <option data-countryCode="CG" value="242">
                                      +242
                                    </option>
                                    <option data-countryCode="CK" value="682">
                                      +682
                                    </option>
                                    <option data-countryCode="CR" value="506">
                                      +506
                                    </option>
                                    <option data-countryCode="HR" value="385">
                                      +385
                                    </option>
                                    <option data-countryCode="CU" value="53">
                                      +53
                                    </option>
                                    <option data-countryCode="CY" value="90392">
                                      +90392
                                    </option>
                                    <option data-countryCode="CY" value="357">
                                      +357
                                    </option>
                                    <option data-countryCode="CZ" value="42">
                                      +42
                                    </option>
                                    <option data-countryCode="DK" value="45">
                                      +45
                                    </option>
                                    <option data-countryCode="DJ" value="253">
                                      +253
                                    </option>
                                    <option data-countryCode="DM" value="1809">
                                      +1809
                                    </option>
                                    <option data-countryCode="DO" value="1809">
                                      +1809
                                    </option>
                                    <option data-countryCode="EC" value="593">
                                      +593
                                    </option>
                                    <option data-countryCode="EG" value="20">
                                      +20
                                    </option>
                                    <option data-countryCode="SV" value="503">
                                      +503
                                    </option>
                                    <option data-countryCode="GQ" value="240">
                                      +240
                                    </option>
                                    <option data-countryCode="ER" value="291">
                                      +291
                                    </option>
                                    <option data-countryCode="EE" value="372">
                                      +372
                                    </option>
                                    <option data-countryCode="ET" value="251">
                                      +251
                                    </option>
                                    <option data-countryCode="FK" value="500">
                                      +500
                                    </option>
                                    <option data-countryCode="FO" value="298">
                                      +298
                                    </option>
                                    <option data-countryCode="FJ" value="679">
                                      +679
                                    </option>
                                    <option data-countryCode="FI" value="358">
                                      +358
                                    </option>
                                    <option data-countryCode="FR" value="33">
                                      +33
                                    </option>
                                    <option data-countryCode="GF" value="594">
                                      +594
                                    </option>
                                    <option data-countryCode="PF" value="689">
                                      +689
                                    </option>
                                    <option data-countryCode="GA" value="241">
                                      +241
                                    </option>
                                    <option data-countryCode="GM" value="220">
                                      +220
                                    </option>
                                    <option data-countryCode="GE" value="7880">
                                      +7880
                                    </option>
                                    <option data-countryCode="DE" value="49">
                                      +49
                                    </option>
                                    <option data-countryCode="GH" value="233">
                                      +233
                                    </option>
                                    <option data-countryCode="GI" value="350">
                                      +350
                                    </option>
                                    <option data-countryCode="GR" value="30">
                                      +30
                                    </option>
                                    <option data-countryCode="GL" value="299">
                                      +299
                                    </option>
                                    <option data-countryCode="GD" value="1473">
                                      +1473
                                    </option>
                                    <option data-countryCode="GP" value="590">
                                      +590
                                    </option>
                                    <option data-countryCode="GU" value="671">
                                      +671
                                    </option>
                                    <option data-countryCode="GT" value="502">
                                      +502
                                    </option>
                                    <option data-countryCode="GN" value="224">
                                      +224
                                    </option>
                                    <option data-countryCode="GW" value="245">
                                      +245
                                    </option>
                                    <option data-countryCode="GY" value="592">
                                      +592
                                    </option>
                                    <option data-countryCode="HT" value="509">
                                      +509
                                    </option>
                                    <option data-countryCode="HN" value="504">
                                      +504
                                    </option>
                                    <option data-countryCode="HK" value="852">
                                      +852
                                    </option>
                                    <option data-countryCode="HU" value="36">
                                      +36
                                    </option>
                                    <option data-countryCode="IS" value="354">
                                      +354
                                    </option>
                                    <option data-countryCode="IN" value="91">
                                      +91
                                    </option>
                                    <option data-countryCode="ID" value="62">
                                      +62
                                    </option>
                                    <option data-countryCode="IR" value="98">
                                      +98
                                    </option>
                                    <option data-countryCode="IQ" value="964">
                                      +964
                                    </option>
                                    <option data-countryCode="IE" value="353">
                                      +353
                                    </option>
                                    <option data-countryCode="IL" value="972">
                                      +972
                                    </option>
                                    <option data-countryCode="IT" value="39">
                                      +39
                                    </option>
                                    <option data-countryCode="JM" value="1876">
                                      +1876
                                    </option>
                                    <option data-countryCode="JP" value="81">
                                      +81
                                    </option>
                                    <option data-countryCode="JO" value="962">
                                      +962
                                    </option>
                                    <option data-countryCode="KZ" value="7">
                                      +7
                                    </option>
                                    <option data-countryCode="KE" value="254">
                                      +254
                                    </option>
                                    <option data-countryCode="KI" value="686">
                                      +686
                                    </option>
                                    <option data-countryCode="KP" value="850">
                                      +850
                                    </option>
                                    <option data-countryCode="KR" value="82">
                                      +82
                                    </option>
                                    <option data-countryCode="KW" value="965">
                                      +965
                                    </option>
                                    <option data-countryCode="KG" value="996">
                                      +996
                                    </option>
                                    <option data-countryCode="LA" value="856">
                                      +856
                                    </option>
                                    <option data-countryCode="LV" value="371">
                                      +371
                                    </option>
                                    <option data-countryCode="LB" value="961">
                                      +961
                                    </option>
                                    <option data-countryCode="LS" value="266">
                                      +266
                                    </option>
                                    <option data-countryCode="LR" value="231">
                                      +231
                                    </option>
                                    <option data-countryCode="LY" value="218">
                                      +218
                                    </option>
                                    <option data-countryCode="LI" value="417">
                                      +417
                                    </option>
                                    <option data-countryCode="LT" value="370">
                                      +370
                                    </option>
                                    <option data-countryCode="LU" value="352">
                                      +352
                                    </option>
                                    <option data-countryCode="MO" value="853">
                                      +853
                                    </option>
                                    <option data-countryCode="MK" value="389">
                                      +389
                                    </option>
                                    <option data-countryCode="MG" value="261">
                                      +261
                                    </option>
                                    <option data-countryCode="MW" value="265">
                                      +265
                                    </option>
                                    <option data-countryCode="MY" value="60">
                                      +60
                                    </option>
                                    <option data-countryCode="MV" value="960">
                                      +960
                                    </option>
                                    <option data-countryCode="ML" value="223">
                                      +223
                                    </option>
                                    <option data-countryCode="MT" value="356">
                                      +356
                                    </option>
                                    <option data-countryCode="MH" value="692">
                                      +692
                                    </option>
                                    <option data-countryCode="MQ" value="596">
                                      +596
                                    </option>
                                    <option data-countryCode="MR" value="222">
                                      +222
                                    </option>
                                    <option data-countryCode="YT" value="269">
                                      +269
                                    </option>
                                    <option data-countryCode="MX" value="52">
                                      +52
                                    </option>
                                    <option data-countryCode="FM" value="691">
                                      +691
                                    </option>
                                    <option data-countryCode="MD" value="373">
                                      +373
                                    </option>
                                    <option data-countryCode="MC" value="377">
                                      +377
                                    </option>
                                    <option data-countryCode="MN" value="976">
                                      +976
                                    </option>
                                    <option data-countryCode="MS" value="1664">
                                      +1664
                                    </option>
                                    <option data-countryCode="MA" value="212">
                                      +212
                                    </option>
                                    <option data-countryCode="MZ" value="258">
                                      +258
                                    </option>
                                    <option data-countryCode="MN" value="95">
                                      +95
                                    </option>
                                    <option data-countryCode="NA" value="264">
                                      +264
                                    </option>
                                    <option data-countryCode="NR" value="674">
                                      +674
                                    </option>
                                    <option data-countryCode="NP" value="977">
                                      +977
                                    </option>
                                    <option data-countryCode="NL" value="31">
                                      +31
                                    </option>
                                    <option data-countryCode="NC" value="687">
                                      +687
                                    </option>
                                    <option data-countryCode="NZ" value="64">
                                      +64
                                    </option>
                                    <option data-countryCode="NI" value="505">
                                      +505
                                    </option>
                                    <option data-countryCode="NE" value="227">
                                      +227
                                    </option>
                                    <option data-countryCode="NG" value="234">
                                      +234
                                    </option>
                                    <option data-countryCode="NU" value="683">
                                      +683
                                    </option>
                                    <option data-countryCode="NF" value="672">
                                      +672
                                    </option>
                                    <option data-countryCode="NP" value="670">
                                      +670
                                    </option>
                                    <option data-countryCode="NO" value="47">
                                      +47
                                    </option>
                                    <option data-countryCode="OM" value="968">
                                      +968
                                    </option>
                                    <option data-countryCode="PW" value="680">
                                      +680
                                    </option>
                                    <option data-countryCode="PA" value="507">
                                      +507
                                    </option>
                                    <option data-countryCode="PG" value="675">
                                      +675
                                    </option>
                                    <option data-countryCode="PY" value="595">
                                      +595
                                    </option>
                                    <option data-countryCode="PE" value="51">
                                      +51
                                    </option>
                                    <option data-countryCode="PH" value="63">
                                      +63
                                    </option>
                                    <option data-countryCode="PL" value="48">
                                      +48
                                    </option>
                                    <option data-countryCode="PT" value="351">
                                      +351
                                    </option>
                                    <option data-countryCode="PR" value="1787">
                                      +1787
                                    </option>
                                    <option data-countryCode="QA" value="974">
                                      +974
                                    </option>
                                    <option data-countryCode="RE" value="262">
                                      +262
                                    </option>
                                    <option data-countryCode="RO" value="40">
                                      +40
                                    </option>
                                    <option data-countryCode="RU" value="7">
                                      +7
                                    </option>
                                    <option data-countryCode="RW" value="250">
                                      +250
                                    </option>
                                    <option data-countryCode="SM" value="378">
                                      +378
                                    </option>
                                    <option data-countryCode="ST" value="239">
                                      +239
                                    </option>
                                    <option data-countryCode="SA" value="966">
                                      +966
                                    </option>
                                    <option data-countryCode="SN" value="221">
                                      +221
                                    </option>
                                    <option data-countryCode="CS" value="381">
                                      +381
                                    </option>
                                    <option data-countryCode="SC" value="248">
                                      +248
                                    </option>
                                    <option data-countryCode="SL" value="232">
                                      +232
                                    </option>
                                    <option data-countryCode="SG" value="65">
                                      +65
                                    </option>
                                    <option data-countryCode="SK" value="421">
                                      +421
                                    </option>
                                    <option data-countryCode="SI" value="386">
                                      +386
                                    </option>
                                    <option data-countryCode="SB" value="677">
                                      +677
                                    </option>
                                    <option data-countryCode="SO" value="252">
                                      +252
                                    </option>
                                    <option data-countryCode="ZA" value="27">
                                      +27
                                    </option>
                                    <option data-countryCode="ES" value="34">
                                      +34
                                    </option>
                                    <option data-countryCode="LK" value="94">
                                      +94
                                    </option>
                                    <option data-countryCode="SH" value="290">
                                      +290
                                    </option>
                                    <option data-countryCode="KN" value="1869">
                                      +1869
                                    </option>
                                    <option data-countryCode="SC" value="1758">
                                      +1758
                                    </option>
                                    <option data-countryCode="SD" value="249">
                                      +249
                                    </option>
                                    <option data-countryCode="SR" value="597">
                                      +597
                                    </option>
                                    <option data-countryCode="SZ" value="268">
                                      +268
                                    </option>
                                    <option data-countryCode="SE" value="46">
                                      +46
                                    </option>
                                    <option data-countryCode="CH" value="41">
                                      +41
                                    </option>
                                    <option data-countryCode="SI" value="963">
                                      +963
                                    </option>
                                    <option data-countryCode="TW" value="886">
                                      +886
                                    </option>
                                    <option data-countryCode="TJ" value="7">
                                      +7
                                    </option>
                                    <option data-countryCode="TH" value="66">
                                      +66
                                    </option>
                                    <option data-countryCode="TG" value="228">
                                      +228
                                    </option>
                                    <option data-countryCode="TO" value="676">
                                      +676
                                    </option>
                                    <option data-countryCode="TT" value="1868">
                                      +1868
                                    </option>
                                    <option data-countryCode="TN" value="216">
                                      +216
                                    </option>
                                    <option data-countryCode="TR" value="90">
                                      +90
                                    </option>
                                    <option data-countryCode="TM" value="7">
                                      +7
                                    </option>
                                    <option data-countryCode="TM" value="993">
                                      +993
                                    </option>
                                    <option data-countryCode="TC" value="1649">
                                      +1649
                                    </option>
                                    <option data-countryCode="TV" value="688">
                                      +688
                                    </option>
                                    <option data-countryCode="UG" value="256">
                                      +256
                                    </option>
                                    <option data-countryCode="UZ" value="7">
                                      +7
                                    </option>
                                    <option data-countryCode="VU" value="678">
                                      +678
                                    </option>
                                    <option data-countryCode="VA" value="379">
                                      +379
                                    </option>
                                    <option data-countryCode="VE" value="58">
                                      +58
                                    </option>
                                    <option data-countryCode="VN" value="84">
                                      +84
                                    </option>
                                    <option data-countryCode="VG" value="84">
                                      +1284
                                    </option>
                                    <option data-countryCode="VI" value="84">
                                      +1340
                                    </option>
                                    <option data-countryCode="WF" value="681">
                                      +681
                                    </option>
                                    <option data-countryCode="YE" value="969">
                                      (+969
                                    </option>
                                    <option data-countryCode="YE" value="967">
                                      (+967
                                    </option>
                                    <option data-countryCode="ZM" value="260">
                                      +260
                                    </option>
                                    <option data-countryCode="ZW" value="263">
                                      +263
                                    </option>
                                  </optgroup>
                                </select>
                              </span>
                            </div>
                            <input
                              type="text"
                              id="mobilenumber"
                              className="form-control form-control-sm"
                              placeholder="Mobile Number"
                              aria-describedby="mobile-number-group"
                            />
                          </div>
                          <div className="text-right d-flex justify-content-end">
                            <button
                              type="button"
                              className="btn px-2 edit-details"
                            >
                              Edit Number
                            </button>
                            <button
                              type="button"
                              className="btn px-2 cancel text-danger"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              className="btn px-2 save-details text-green"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                  <form
                    method="get"
                    className="digit-group"
                    data-group-name="digits"
                    data-autosubmit="false"
                    autoComplete="off"
                  >
                    <div className="form-group col-12 p-0 m-0">
                      <div className="d-flex justify-content-between mb-1">
                        <input
                          className="form-control form-control-sm"
                          type="text"
                          id="digit-1"
                          name=""
                          data-next="digit-2"
                        />
                        <input
                          className="form-control form-control-sm"
                          type="text"
                          id="digit-2"
                          name=""
                          data-next="digit-3"
                          data-previous="digit-1"
                        />
                        <input
                          className="form-control form-control-sm"
                          type="text"
                          id="digit-3"
                          name=""
                          data-next="digit-4"
                          data-previous="digit-2"
                        />
                        <input
                          className="form-control form-control-sm"
                          type="text"
                          id="digit-4"
                          name=""
                          data-next="digit-5"
                          data-previous="digit-3"
                        />
                      </div>
                    </div>
                    <div className="row justify-content-between">
                      <div className="col-auto mb-2">
                        <button
                          type="button"
                          className="btn px-2"
                          id="starttimeragain"
                          data-dismiss="modal"
                          data-target="#verify-otp-modal"
                          data-toggle="modal"
                        >
                          Resend
                        </button>
                      </div>
                      <div className="col-auto mb-2">
                        <div
                          id="timer"
                          className="btn px-2"
                          data-timer="02:00"
                        ></div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-deep-primary btn-block rounded-0"
                    >
                      Continue
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* indoor outdoor Modal */}
      <div
        className="modal px-0"
        id="indoor-outdoor-modal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="indoor-outdoor-modalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content border-0">
            <div className="modal-body">
              <div className="row">
                <div className="col-12 modal-body-right-content pt-4 px-sm-5 px-2">
                  <button
                    ref={myRefname3}
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                  <div className="card-body py-0">
                    <ul
                      className="nav nav-pills common-tabs2 mb-3 justify-content-center"
                      id="indoor-outdoor-tab"
                      role="tablist"
                      data-getelement="#modal-body-left-content"
                    >
                      <li className="nav-item px-0">
                        <a
                          className="nav-link h5 px-4 active"
                          id="indoor-tab"
                          data-toggle="pill"
                          href="#indoor"
                          role="tab"
                          aria-controls="indoor"
                          aria-selected="true"
                        >
                          INDOOR
                        </a>
                      </li>
                      <li className="nav-item px-0">
                        <a
                          className="nav-link h5 px-4"
                          id="outdoor-tab"
                          data-toggle="pill"
                          href="#outdoor"
                          role="tab"
                          aria-controls="outdoor"
                          aria-selected="false"
                        >
                          OUTDOOR
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-12 px-5 py-3">
                  <div
                    className="tab-content px-sm-3 px-2"
                    id="indoor-outdoor-tabContent"
                  >
                    <div
                      className="tab-pane fade show active"
                      id="indoor"
                      role="tabpanel"
                      aria-labelledby="indoor-tab"
                    >
                      <div className="row">
                        {items &&
                          items.warehouseDetailPage &&
                          items.warehouseDetailPage.warehouseImagesInfo &&
                          items.warehouseDetailPage.warehouseImagesInfo
                            .indoorImages.length > 0
                          ? items.warehouseDetailPage.warehouseImagesInfo.indoorImages.map(
                            (value, index) => {
                              return (
                                <div className="col-lg-6 d-flex">
                                  <div className="card custom-card-overlay2 mx-2">
                                    <div className="img-holder card-img d-flex align-items-center justify-content-center h-100">
                                      <img
                                        style={{
                                          width: "100%",
                                          height: "100%",
                                          objectFit: "contain",
                                        }}
                                        src={value.url}
                                        alt=""
                                        className="img-fluid w-100"
                                      />
                                    </div>
                                    <div className="card-img-overlay d-flex align-items-end">
                                      <div className="card-body px-0 d-flex justify-content-center">
                                        <btn
                                          onClick={() => {
                                            if (!data.authenticated) {
                                              addToast("Please Login", {
                                                appearance: "error",
                                                autoDismiss: true,
                                              });
                                              return 0;
                                            }
                                            setwaresheet({
                                              imgUrl: value.url,
                                              note: "",
                                            });
                                            if (loadwaresheets.length > 0) {
                                              handleClick3();
                                              setShow(false);
                                              setSaveWaresheet(true);
                                            } else {
                                              handleClick3();

                                              setShow(false);

                                              setModalIsOpen1(true);
                                            }
                                          }}
                                          className="btn-light card-bookmark active-book px-3 py-2 rounded"
                                        >
                                          <p
                                            onClick={() => {
                                              setwaresheet({
                                                imgUrl: value.url,
                                                note: "",
                                              });
                                            }}
                                            style={{ cursor: "pointer" }}
                                            className="card-title mb-0"
                                          >
                                            <i className="fas fa-bookmark" />{" "}
                                            Save this image
                                          </p>
                                        </btn>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          )
                          : null}
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="outdoor"
                      role="tabpanel"
                      aria-labelledby="outdoor-tab"
                    >
                      <div className="row">
                        {items &&
                          items.warehouseDetailPage &&
                          items.warehouseDetailPage.warehouseImagesInfo &&
                          items.warehouseDetailPage.warehouseImagesInfo
                            .outdoorImages.length > 0
                          ? items.warehouseDetailPage.warehouseImagesInfo.outdoorImages.map(
                            (value, index) => {
                              return (
                                <div className="col-lg-6 d-flex">
                                  <div className="card custom-card-overlay2 mx-2">
                                    <div className="img-holder card-img d-flex align-items-center justify-content-center h-100">
                                      <img
                                        style={{
                                          width: "100%",
                                          height: "auto",
                                          objectFit: "contain",
                                        }}
                                        src={value.url}
                                        alt=""
                                        className="img-fluid w-100"
                                      />
                                    </div>
                                    <div className="card-img-overlay d-flex align-items-end">
                                      <div className="card-body px-0 d-flex justify-content-center">
                                        <btn
                                          onClick={() => {
                                            if (!data.authenticated) {
                                              addToast("Please Login", {
                                                appearance: "error",
                                                autoDismiss: true,
                                              });
                                              return 0;
                                            }
                                            setwaresheet({
                                              imgUrl: value.url,
                                              note: "",
                                            });
                                            if (loadwaresheets.length > 0) {
                                              handleClick3();

                                              setShow(false);
                                              setSaveWaresheet(true);
                                            } else {
                                              handleClick3();

                                              setShow(false);

                                              setModalIsOpen1(true);
                                            }
                                          }}
                                          className="btn-light card-bookmark active-book px-3 py-2 rounded"
                                        >
                                          <p
                                            style={{ cursor: "pointer" }}
                                            className="card-title mb-0"
                                          >
                                            <i
                                              onClick={() => {
                                                setwaresheet({
                                                  imgUrl: value.url,
                                                  note: "",
                                                });
                                              }}
                                              className="fas fa-bookmark"
                                            />{" "}
                                            Save this image
                                          </p>
                                        </btn>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          )
                          : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================== */}

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="m-0 p-0">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="product-item-show-modalTitle">
                {warehouseId}
              </h5>
              <button
                onClick={() => setShow(false)}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span className="text-warning fa" aria-hidden="true">
                  &times;
                </span>
              </button>
            </div>
            <div className="modal-body">
              {/* <div className="img-holder">
                <img src="/assets/images/warehouse/warehouse-details1.png" alt="product" id="product-item-show-large" className="img-fluid w-100"/>
              </div> */}
              <div className="card custom-card-overlay2 mx-2">
                <div className="img-holder card-img">
                  <img
                    src={
                      items &&
                      items.warehouseDetailPage &&
                      items.warehouseDetailPage.warehouseImagesInfo &&
                      items.warehouseDetailPage.warehouseImagesInfo.coverImage
                        .url
                    }
                    alt=""
                    className="img-fluid w-100"
                  />
                </div>
                <div className="card-img-overlay d-flex align-items-end">
                  <div className="card-body px-0 d-flex justify-content-center">
                    <btn
                      onClick={() => {
                        if (!data.authenticated) {
                          addToast("Please Login", {
                            appearance: "error",
                            autoDismiss: true,
                          });
                          return 0;
                        }
                        setwaresheet({
                          imgUrl:
                            items &&
                            items.warehouseDetailPage &&
                            items.warehouseDetailPage.warehouseImagesInfo &&
                            items.warehouseDetailPage.warehouseImagesInfo
                              .coverImage.url,
                          note: "",
                        });
                        if (loadwaresheets.length > 0) {
                          setShow(false);
                          setSaveWaresheet(true);
                        } else {
                          setShow(false);

                          setModalIsOpen1(true);
                        }
                      }}
                      className="btn-light card-bookmark px-3 py-2 rounded"
                    >
                      <p
                        style={{ cursor: "pointer" }}
                        className="card-title mb-0"
                      >
                        <i
                          onClick={() => {
                            setwaresheet({
                              imgUrl:
                                items &&
                                items.warehouseDetailPage &&
                                items.warehouseDetailPage.warehouseImagesInfo &&
                                items.warehouseDetailPage.warehouseImagesInfo
                                  .coverImage.url,
                              note: "",
                            });
                          }}
                          className="fas fa-bookmark"
                        />{" "}
                        Save this image
                      </p>
                    </btn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* ===============  setSaveWaresheet  ===================== */}

      <Modal
        show={saveWaresheet}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="m-0 p-0">
          {/* <div className="modal px-0" id="save-my-waresheet-modal" tabindex="-1" role="dialog" aria-labelledby="save-my-waresheetLabel" aria-hidden="true"> */}
          {/* <div className="modal-dialog modal-dialog-centered modal-lg" role="document"> */}
          <div className="modal-content border-0">
            <div className="modal-body py-0">
              <div className="row px-3">
                <div className="modal-body-right-content w-100 py-lg-4 my-1 p-sm-4 p-3">
                  <div className="row">
                    <div className="col-12">
                      <button
                        onClick={() => setSaveWaresheet(!saveWaresheet)}
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                      <div className="">
                        <h5 className="mb-4 modal-title">Save to My Waresheet</h5>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="row">
                      <div className="col-lg-4 col-md-6 col-sm-8 mx-auto py-3">
                        <div className="card border">
                          <div className="img-holder">
                            <img
                              className="img-fluid w-100"
                              src={waresheet.imgUrl}
                              alt="waresheet"
                            />
                          </div>
                          <div className="card-body">
                            <h6>Warehouse {warehouseId}</h6>
                            <p className="mb-0">
                              <i className="fas fa-map-marker-alt text-primary"></i>{" "}
                              <span>
                                {" "}
                                {items &&
                                  items.warehouseDetailPage &&
                                  items.warehouseDetailPage
                                    .warehouseContactDetailInfo &&
                                  items.warehouseDetailPage
                                    .warehouseContactDetailInfo.address &&
                                  items.warehouseDetailPage
                                    .warehouseContactDetailInfo.address
                                    .district +
                                  "," +
                                  items.warehouseDetailPage
                                    .warehouseContactDetailInfo.address.city}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-8 py-3">
                        <form>
                          <div className="dropdown create-new-waresheet-dropdown">
                            <button
                              className="btn btn-deep-primary btn-block text-left dropdown-toggle"
                              type="button"
                              id="dropdownMenu1"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              {selectedOption?.label}{" "}
                            </button>
                            <div
                              style={{
                                display:
                                  loadwaresheets && loadwaresheets.length > 0
                                    ? ""
                                    : "none",
                                padding: "0px",
                              }}
                              className="dropdown-menu"
                              aria-labelledby="dropdownMenu1"
                            >
                              {/* <h6 className="dropdown-header">{selectedOption}</h6> */}
                              <div className="dropdown-item p-0 m-0">
                                <select
                                  onChange={(e) => {
                                    // eslint-disable-next-line
                                    let index = loadwaresheets.findIndex(
                                      (x) => x.id === e.target.value
                                    );
                                    setselectedOption({
                                      label:
                                        loadwaresheets[index].waresheetName,
                                      value: loadwaresheets[index].id,
                                    });
                                    //  setselectedOption(e.target.value)
                                  }}
                                  multiple
                                  size="3"
                                  className="form-control form-control-sm form-control form-control-sm-lg"
                                  id="exampleFormControlSelect2"
                                >
                                  {loadwaresheets && loadwaresheets.length > 0
                                    ? loadwaresheets.map((value, index) => {
                                      return (
                                        <option
                                          value={value.id}
                                          selected={
                                            value.makeItDefault === true
                                          }
                                        >
                                          {value.waresheetName}
                                        </option>
                                      );
                                    })
                                    : null}
                                  {/* <option>My Waresheet-2</option>
                                  <option>My Waresheet-3</option>
                                  <option>My Waresheet-4</option>
                                  <option>My Waresheet-5</option> */}
                                </select>
                              </div>
                              <div className="dropdown-item d-flex align-items-center p-0 m-0">
                                <i
                                  onClick={() => {
                                    if (ware !== "") createnewwaresheet(ware);
                                  }}
                                  className="fas fa-plus mx-2"
                                ></i>
                                <input
                                  value={ware}
                                  onChange={(e) => {
                                    setware(e.target.value);
                                  }}
                                  type="text"
                                  className="form-control form-control-sm"
                                  id="exampleFormControlInput1"
                                  placeholder="Create New"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="form-group mt-3">
                            <textarea
                              onChange={(e) => {
                                setwaresheet({
                                  ...waresheet,
                                  note: e.target.value,
                                });
                              }}
                              className="form-control form-control-sm rounded-md"
                              id="exampleFormControlTextarea1"
                              rows="9"
                              placeholder="Add notes, what do you like about this Warehouse?"
                            ></textarea>
                          </div>
                        </form>

                        <div className="text-right">
                          <button
                            onClick={updatewaresheet}
                            type="submit"
                            className="btn btn-deep-primary my-3"
                          >
                            Save to my Waresheet
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
          {/* </div> */}
        </Modal.Body>
      </Modal>

      {/* // </div> */}
    </Layout>
  );
};

export default WarehouseDetails;
