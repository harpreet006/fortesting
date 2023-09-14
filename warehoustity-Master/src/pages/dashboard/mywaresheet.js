import React, { useState } from 'react'
import Layout from '../../layout/Layout';
import Menu from './menu';
// import loadjs from 'loadjs';
import { Link, useLocation } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Modal, Button} from 'react-bootstrap';

function CreateWaresheet(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
    <Modal.Body style={{textAlign: 'center'}}>
      <img  src={"/assets/images/success.png"} className="size-150px p-4 mx-auto" alt="success"/>
        <h6>
           waresheet created successful
        </h6>
        <Button className="my-3" onClick={props.onHide}>Close</Button>
      </Modal.Body>
    </Modal>
  );
}

const MyWaresheet = () => {
  const [successModal, setSuccessModal] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return (
      <Layout>
      <div>
      {
          successModal ?
          <CreateWaresheet
          show={successModal}
          onHide={() => setSuccessModal(false)}
        />
        : null
        }
        <div className="container">
          <div className="row align-items-center justify-content-end">
            <div className="col-auto pt-3 py-3">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb common-breadcrumb mb-0 text-dark">
                  <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Manage waresheet</li>
                </ol>
              </nav>
            </div> 
            <div className="py-3 col">
              <div className="input-group custom-search w-100"> 
                <input type="text" className="form-control h-100% toggle-className" placeholder="Search" data-target=".custom-search" data-toggle-className="open" data-event/>
                <div className="input-group-append">
                  <span className="input-group-text bg-white">
                    <button className="btn btn-primary p-0 size-30px"><i className="fas fa-search"></i></button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <div className="container-xl">
          <div className="row">
            
            <button className="btn btn-deep-primary p-0 size-40px d-lg-none toggle-className btn-sidebar align-items-center justify-content-center" type="button" data-target=".sidebar" data-toggle-className="open" data-this-toggle-className="open">
              <span></span>
            </button>
            {/* user menu */}
            <Menu />
            <div className="col-xl-9 col-lg-8">
              <div className="row">
                <div className="content col-12 create-new-warehouse">
                  <div className="pb-2 border-bottom mb-5 d-sm-flex justify-content-between">
                    <div>
                      <Link to="#" className="btn name-breadcrumb px-0 text-dark font-heading mr-3 mb-3">
                        {/* <i className="fas fa-chevron-left pr-3"></i>   */}
                        List of Waresheets </Link>
                    </div>
                    <div>
                      <Link to="#" className="btn px-0 text-gray font-heading mr-3 mb-3 text-uppercase">
                        <img src={"/assets/images/icons/check-all.png"} alt="icon"/>
                      </Link>
                    </div>
                  </div>
                  <div className="row mx-0">
                    <div className="col-12 px-4 py-3 border">
                      <div className="row">
                      
                        <div className="col-xxl-3 col-xl-3 col-md-4 col-sm-6 mb-4">
                          <Link className="card custom-warehouse-detail custom-shadow my-3" to={"/waresheet"}>

                            <div className="card card-overlay">
                              <div className="img-holder card-img"><img src={"/assets/images/warehouse/warehouse-details1.png"} alt="warehouse" className="img-fluid w-100"/></div>
                            </div>
                            <div className="card-body pb-0">
                              <h6 className="card-title">Waresheet-1</h6>  
                            </div>
                          </Link>
                        </div>
    
                        <div className="col-xxl-3 col-xl-3 col-md-4 col-sm-6 mb-4">
                        <Link className="card custom-warehouse-detail custom-shadow my-3" to={"/waresheet"}>

                        <div className="card card-overlay">
                          <div className="img-holder card-img"><img src={"/assets/images/warehouse/warehouse-details1.png"} alt="warehouse" className="img-fluid w-100"/></div>
                        </div>
                        <div className="card-body pb-0">
                          <h6 className="card-title">Waresheet-2</h6>  
                        </div>
                        </Link>
                        </div>
    
                        <div className="col-xxl-3 col-xl-3 col-md-4 col-sm-6 mb-4">
                        <Link className="card custom-warehouse-detail custom-shadow my-3" to={"#"}>

                            <div className="card card-overlay">
                              <div className="img-holder card-img"><img src={"/assets/images/warehouse/warehouse-details1.png"} alt="warehouse" className="img-fluid w-100"/></div>
                              <div className="card-img-overlay d-flex align-items-center">
                                <div className="card-body p-0">
                                  <div>
                                    <div className="d-flex justify-content-center my-3">
                                      <h6 className="text-white">No Image Added</h6>
                                    </div> 
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="card-body pb-0">
                              <h6 className="card-title">Waresheet-3</h6>  
                            </div>
                          </Link>
                        </div>
    
                        <div className="col-xxl-3 col-xl-3 col-md-4 col-sm-6 mb-4">
                        <Link className="card custom-warehouse-detail custom-shadow my-3" to={"#"}>
                            <div className="card card-overlay">
                              <div className="img-holder card-img"><img src={"/assets/images/warehouse/warehouse-details1.png"} alt="warehouse" className="img-fluid w-100" /></div>
                              <div className="card-img-overlay d-flex align-items-center">
                                <div className="card-body p-0">
                                  <div>
                                    <div className="d-flex justify-content-center my-3">
                                      <h6 className="text-white">No Image Added</h6>
                                    </div> 
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="card-body pb-0">
                              <h6 className="card-title">Waresheet-4</h6>  
                            </div>
                          </Link>
                        </div>
    
                        <div className="col-12 my-4">
                          <button className="btn btn-deep-primary toggle-className" data-target=".create-new-warehouse" data-toggle-className="d-none">Create New Waresheet</button>
                        </div>
    
                      </div>
                    </div>
                  </div>
                </div>

                <div className="content col-12 d-none create-new-warehouse ">
                  <div className="pb-2 border-bottom mb-5">
                    <button className="btn name-breadcrumb px-0 text-dark font-heading mr-3 mb-3 text-uppercase toggle-className" data-target=".create-new-warehouse" data-toggle-className="d-none"><i className="fas fa-chevron-left pr-3"></i> Create New Waresheet </button>
                  </div>
                  <div className="row mx-0">
                    <div className="col-12 px-4 py-3 border">
                      <div className="row">
                      <Formik
                        initialValues={{
                          "warehouseName":"",
                        }}
                        validationSchema={
                          Yup.object().shape({
                            warehouseName: Yup.string()
                              .min(3, 'Too Short!')
                              .max(50, 'Too Long!')
                              .required('Warehouse Name is required')
                          })
                        }
                        onSubmit={fields => {
                          setSuccessModal(true)
                            // alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
                        }}
                        render={({ errors, status, touched }) => (

                        <Form className="col-12 pt-2">
                          <div className="form-group form-group-lg mb-4">
                            <label for="exampleFormControlInput1" className="mb-3 h6">Waresheet Name</label>
                            {/* <input type="text" className="form-control form-control-lg" id="exampleFormControlInput1" placeholder="Enter Here Waresheet Name"/> */}
                            <Field name="warehouseName" type="text" placeholder="Enter Here Waresheet Name" className={'form-control form-control-lg' + (errors.warehouseName && touched.warehouseName ? ' is-invalid' : '')} />
                            <ErrorMessage name="warehouseName" component="div" className="invalid-feedback" />
                          </div> 
                          <div className="form-group form-group-lg mb-4">
                            <label for="exampleFormControlTextarea1" className="mb-3 h6">Description</label>
                            <textarea className="form-control form-control-lg" id="exampleFormControlTextarea1" rows="3" placeholder="Add notes, what do you like about this Warehouse?"></textarea>
                          </div>
                          <div className="custom-control custom-switch common-switch">
                            <input type="checkbox" className="custom-control-input common-switch-input" id="customSwitch1"/>
                            <label className="custom-control-label common-switch-label text-gray h6" for="customSwitch1">Make It Default</label>
                          </div>
                          <div className="col-12 px-0 py-4">
                            <button className="btn btn-outline-secondary mr-3 toggle-className my-2" data-target=".create-new-warehouse" data-toggle-className="d-none">Cancel</button>
                            <button className="btn btn-deep-primary" type="submit">Create</button>
                          </div>
                        </Form>
                        )} />
    
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
        </div>
      </div>
      </div>
    
      </Layout>
    );
}


export default MyWaresheet;