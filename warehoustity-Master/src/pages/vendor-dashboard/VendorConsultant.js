import React, { useEffect, useState } from 'react'
import VendorLayout from '../../layout/VendorLayout';
import { authProfile, userUpdate, successResponse } from '../../store/actions/login'
import { useDispatch, useSelector } from 'react-redux';
import FormSuccess from '../../components/helper/FormSuccess';
import Spinner from 'react-bootstrap/Spinner';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { onlyAlphaNumericAllow } from '../../components/validation';
import ChangePassword from '../../components/user/ChangePassword';
import Modal from 'react-bootstrap/Modal';
import '../../style/formStyle.css'

const VendorConsultant = () => {
  const [modalShow, setModalShow] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const data = useSelector((state) => state.USERPROFILE)
  // const history = useHistory();
  const dispatch = useDispatch()
  const [initValue, setInItValue] = useState({
    address: "",
    pan: "",
    aadhaar: "",
    personalEmail: '',
    officialEmail: '',
    personalContact: '',
    officialContact: '',
    bloodGroup: 'A'
  })


  useEffect(() => {

    if (data.userProfile?.userType?.consultant !== null) {
      setInItValue(data.userProfile?.userType?.consultant)
    }


  }, [data.userProfile]);

  useEffect(() => {
    dispatch(authProfile())
  }, [dispatch]);

  return (
    <VendorLayout>


      {
        data.isSuccess?.statusCode === 200 ?
          <FormSuccess onClick={() => dispatch(successResponse(null))} message={data.isSuccess.message} />
          : null
      }


      <div className="content-admin px-2">
        <div className="row align-items-center pb-3 px-3 mx-0 mt-3">

          <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Create New Password
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ChangePassword
                userId={data.userProfile?.id}
                setModalShow={setModalShow}
                setPasswordSuccess={setPasswordSuccess}
              />
            </Modal.Body>
          </Modal>

          {/* <AccountForm /> */}


          <Formik
            enableReinitialize={true}
            initialValues={initValue}

            onSubmit={fields => {

              let uploadData = {
                "userType": {
                  "type": "consultant",
                  "consultant": fields
                }
              }

              // console.log("My Account-->", fields)
              dispatch(userUpdate(uploadData))

            }}
            render={({ values, errors, status, touched }) => (
              <Form>


                <div className="signup-content bg-white ">
                  <div className="signup-form register-form">
                    <h2>My Accounts</h2>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name">Name :</label>
                        <input type="text" value={data.userProfile?.firstName} name="name" id="name" disabled />
                      </div>
                      <div className="form-group">
                        <label htmlFor="father_name">Pan No. :</label>
                        <Field
                         name="pan"
                         type="text" 
                         className={`` + (errors.pan && touched.pan ? ' is-invalid' : '')}
                         onKeyPress={(e) => onlyAlphaNumericAllow(e)}
                         />
                        <ErrorMessage name="pan" component="div" className="invalid-feedback" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="address">Aadhaar No. :</label>
                      <Field
                        name="aadhaar"
                        type="number"
                        className={`` + (errors.aadhaar && touched.aadhaar ? ' is-invalid' : '')}
                      />

                      <ErrorMessage name="aadhaar" component="div" className="invalid-feedback" />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="email">Personal Email ID :</label>
                        <input type="email" value={data.userProfile?.email} name="email" id="email" disabled />
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">Office Email ID :</label>
                        <Field name="officialEmail" type="text"
                          className={`` + (errors.officialEmail && touched.officialEmail ? ' is-invalid' : '')} />
                        <ErrorMessage name="officialEmail" component="div" className="invalid-feedback" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="pincode">PERSONAL CONTACT NO :</label>
                        <input type="text" value={data.userProfile?.phone} name="phone" id="phone" disabled />
                      </div>

                      <div className="form-group">
                        <label htmlFor="pincode">OFFICIAL CONTACT NO :</label>
                        <Field
                          onKeyPress={(e) => onlyAlphaNumericAllow(e)}
                          name="officialContact" type="text"
                          className={`` + (errors.officialContact && touched.officialContact ? ' is-invalid' : '')} />
                        <ErrorMessage name="officialContact" component="div" className="invalid-feedback" />
                      </div>
                    </div>

                    <div className="form-submit">

                      {!passwordSuccess ?
                        <button onClick={() => setModalShow(true)} type="button" className="submit mr-1">Change Password</button>
                        :
                        <button type="button" className="submit mr-1 bg-success text-white">Password Changed</button>
                      }


                      <button type="submit"
                        disabled={data.isPending}
                        className="submit ml-1 btn-deep-primary">
                        Submit
                        {data.isPending ? <Spinner animation="border" /> : null}
                      </button>

                    </div>

                  </div>
                </div>


              </Form>
            )} />

        </div>
      </div>
    </VendorLayout>
  )
}

export default VendorConsultant
