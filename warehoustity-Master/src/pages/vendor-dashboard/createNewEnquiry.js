import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import VendorLayout from '../../layout/VendorLayout';
import axiosauth from '../../api/axios-auth'
// import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { isPending } from '../../store/actions/vendor/warehouseList';

const EnquirySchema = Yup.object().shape({
  name: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(/^[A-Za-z ]*$/, 'Please enter valid Name')
    .required('First Name is required'),
  serviceType: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('serviceType is required'),
  companyName: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(/^[A-Za-z ]*$/, 'Please enter valid Company Name')
    .required('companyName is required'),
  message: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    // .matches(/^[-\w\s]+$/, 'Please enter valid Message')
    .required('message is required'),
  phone: Yup.string()
    .required('Phone is required')
    .matches(RegExp(
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    ), "Invalid Phone Number"),
  email: Yup.string()
    .email('Email is invalid')
    .required('Email is required'),
});


function EnquirySchemaMoal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body style={{ textAlign: 'center' }}>
        <img src={"/assets/images/unnamed.jpg"} className="size-150px p-4 mx-auto" alt="success" />
        <h6>
          enquiry submitted successfully
        </h6>
        <Button className="my-3" onClick={props.onHide}>Close</Button>
      </Modal.Body>
    </Modal>
  );
}

const CreateNewEnquiry = () => {
  const history = useHistory();
  const [equiryModal, setEnquiryModal] = useState(false)
  const dispatch = useDispatch()
  const read = useSelector((state) => state.SIDEMENU_INFO.read_only);
  const data = useSelector((state) => state.WAREHOUSELIST);

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <VendorLayout>
      {
        equiryModal ?
          <EnquirySchemaMoal
            show={equiryModal}
            onHide={() => {
              setEnquiryModal(false)
              window.location.href = "/vendor/manageenquiry?page=1"
            }}
          />
          : null
      }

      <div className="content-admin px-51">
        <div className="row align-items-center px-3 ml-3 mr-0">
          <div className="col-12 pb-2 pl-0 pt-3">
            <h5 className="text-dark backButton">
            <i
                onClick={() => history.goBack()}
                className="fas fa-chevron-left mr-2 cursorPointer"
              ></i>{" "}
              New Enquiry
              </h5>
          </div>

          <div className="col-12">
            <div className="row">
              <div className="col-12 bg-white p-3">

                <Formik
                  initialValues={{
                    name: "",
                    serviceType: "",
                    companyName: "",
                    message: "",
                    phone: "",
                    email: ''
                  }}
                  validationSchema={EnquirySchema}
                  onSubmit={fields => {
                    // dispatch(isPending(true))

                    fields.userType = "vendor"
                    axiosauth.post('/api/v1/enquiry', fields).then(response => {
                      let res = JSON.parse(response.data)
                      if (res.statusCode === 200) {
                        dispatch(isPending(false))
                        setEnquiryModal(true)

                      }
                      // else {
                      //   dispatch(isPending(false))
                      // }
                    }).catch((error) => {

                    }).then(() => {
                      console.log("-----always executes");
                    })
                  }}
                  render={({ errors, status, touched }) => (
                    <Form className="mb-4">
                      <div className="form-group">
                        <Field name="serviceType" type="text" component="select" className={'form-control form-control-md' + (errors.serviceType && touched.serviceType ? ' is-invalid' : '')} >
                          <option value="service looking for">service looking for</option>
                          <option value="Looking for warehouse Space">Looking for warehouse Space</option>
                          <option value="Looking for 3PL Quote/services">Looking for 3PL Quote/serviceTypes</option>
                          <option value="Listing of warehouse Space">Listing of warehouse Space</option>
                          <option value="Other Support">Other Support</option>
                        </Field>
                        <ErrorMessage name="serviceType" component="div" className="invalid-feedback" />
                      </div>

                      <div className="form-group">
                        <Field name="name" type="text" placeholder="Enter a name" className={'form-control form-control-md' + (errors.name && touched.name ? ' is-invalid' : '')} />
                        <ErrorMessage name="name" component="div" className="invalid-feedback" />
                      </div>
                      <div className="form-group">
                        <Field name="email" type="text" placeholder="Enter an email" className={'form-control form-control-md' + (errors.email && touched.email ? ' is-invalid' : '')} />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                      </div>
                      <div className="form-group">
                        <Field name="companyName" placeholder="Enter a company name" type="text" className={'form-control form-control-md' + (errors.companyName && touched.companyName ? ' is-invalid' : '')} />
                        <ErrorMessage name="companyName" component="div" className="invalid-feedback" />
                      </div>
                      <div className="form-group">

                        <Field name="phone" type="number" placeholder="Enter a phone" className={'form-control form-control-md' + (errors.phone && touched.phone ? ' is-invalid' : '')} />
                        <ErrorMessage name="phone" component="div" className="invalid-feedback" />
                      </div>
                      <div className="form-group">

                        <Field name="message" type="textarea" rows="4" component="textarea" placeholder="enter a message" className={'form-control form-control-md' + (errors.message && touched.message ? ' is-invalid' : '')} />
                        <ErrorMessage name="message" component="div" className="invalid-feedback" />
                      </div>
                      <div className={`text-right my-4 ${!read ? "" : "d-none"}`}>
                        <button onClick={() => {
                        }} className="btn btn-deep-primary">Submit
                          {/* {data.isPending ? <Spinner animation="border" /> : null} */}
                        </button>
                        <p className="py-2 text-gray">Our representive will get back to you within 12 hours </p>
                      </div>
                    </Form>)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </VendorLayout>
  )
}

export default CreateNewEnquiry;