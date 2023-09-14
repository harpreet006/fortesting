import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, getIn } from 'formik';
import * as Yup from 'yup';
import { updateContactRFQ, responseRfq } from '../../../store/actions/customer/rfqAction'
import { useSelector, useDispatch } from 'react-redux';
import FormSuccess from '../../../components/helper/FormSuccess';
import Spinner from 'react-bootstrap/Spinner';
import { onlyNumberAllow, onlyAlphaNumericSpaceAllow, forDescriptionAlphaNumericAllow } from '../../../components/validation';

const ContactInformationForm = ({ isView, rfqid, rfqdata }) => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.USERPROFILE);
  const data = useSelector((state) => state.CUSTOMER_RFQ_INFO);
 

  const [contactForm, setContactForm] = useState({
    "companyName": "",
    "companyType": {
      "type": ""
    },
    "address": "",
    "registerOfficeAddress": "",
    "website": "1",
    "groupCompany": "",
    "authorisedSignatory": "",
    "annualTurnover": "",
    "noOfEmployees": "",
    "coreBusiness": "",
    "certification": {
      "name": ""
    },
    "registration": {
      "name": ""
    },
    "contactPerson": "",
    "title": "",
    "email": "ndd@sds.com",
    "phone": "4568893456",
  })

  useEffect(() => {
    if (data.rfqInitialDetail && data.rfqInitialDetail?.contactInformation != null) {
      setContactForm(data.rfqInitialDetail.contactInformation)
    }
    else if (data.rfqFirstForm && data.rfqFirstForm?.contactInformation != null) {
      setContactForm(data.rfqFirstForm?.contactInformation)
    }
     else if (user.userProfile !== null) {
      setContactForm(
        {
          "companyName": user.userProfile.companyName,
          "companyType": {
            "type": ""
          },
          "address": "",
          "registerOfficeAddress": "",
          "website": "",
          "groupCompany": "",
          "authorisedSignatory": "",
          "annualTurnover": "",
          "noOfEmployees": "",
          "coreBusiness": "",
          "certification": {
            "name": ""
          },
          "registration": {
            "name": ""
          },
          "contactPerson": user.userProfile.firstName + user.userProfile.lastName,
          "title": "",
          "email": user.userProfile.email,
          "phone": user.userProfile.phone,
        }
      )
    }
  }, [data, user.userProfile]);




  let contactSchema = Yup.object().shape({

    companyType: Yup.lazy(() => {
      return Yup.object().shape({
        type: Yup.string().required('Required')
      })
    }),

    website: Yup.lazy(() => {
      return Yup.string().required('Required')
    }),

    address: Yup.lazy(() => {
      return Yup.string().required('Required').max(100, 'Must be 100 character')
    }),

    registerOfficeAddress: Yup.lazy(() => {
      return Yup.string().required('Required').max(100, 'Must be 100 character')
    }),
    groupCompany: Yup.lazy(() => {
      return Yup.string().required('Required').max(100, 'Must be 100 character')
    }),
    authorisedSignatory: Yup.lazy(() => {
      return Yup.string().required('Required').max(50, 'Must be 50 character')
    }),
    annualTurnover: Yup.lazy(() => {
      return Yup.string().required('Required').max(10, 'Must be 10 digits')
    }),
    noOfEmployees: Yup.lazy(() => {
      return Yup.string().required('Required').max(6, 'Must be 6 digits')
    }),
    coreBusiness: Yup.lazy(() => {
      return Yup.string().required('Required').max(100, 'Must be 100 character')
    }),

    certification: Yup.lazy(() => {
      return Yup.object().shape({
        name: Yup.string().required('Required')
      })
    }),
    registration: Yup.lazy(() => {
      return Yup.object().shape({
        name: Yup.string().required('Required')
      })
    }),

  })




  return (
    <>
      {
        data.rfqResponse.statusCode === 201 && data.rfqResponse.statusCode === 200 ?
          <FormSuccess onClick={() => dispatch(responseRfq([]))} message={data.rfqResponse.message} />
          : null
      }


      <Formik
        enableReinitialize={true}
        initialValues={contactForm}
        validationSchema={contactSchema}

        onSubmit={fields => {

          // if(data.rfqInitialDetail.id){
          
          fields["customerRfq"] = parseInt(rfqid)
          dispatch(updateContactRFQ(fields,rfqdata))
          // }

        }}
        render={({ values, errors, status, onChange, touched }) => (

          <Form>
            <div className="row pt-2">
              <div className="form-group col-sm-6 mb-1">
                <label htmlFor="staticEmail" className="mb-1">Company Name</label>
                <Field name={`companyName`} type="text" className="form-control form-control-md" id="staticEmail" placeholder="Ex : warehouse.pvt.ltd" disabled={true} />
              </div>
              <div className="form-group col-sm-6 mb-1">
                <label className="mb-1">Type of Company</label>
                <Field name={`companyType.type`} as="select" className={`form-control form-control-md` + (getIn(errors, 'companyType.type') && getIn(touched, 'companyType.type') ? ' is-invalid' : '')} disabled={isView} >
                  <option value="">Select</option>
                  <option value="individual">individual</option>
                  <option value="consultant">Consultant</option>
                  <option value="organisation" >Organisation</option>
                </Field>
                <ErrorMessage name={`companyType.type`} component="div" className="invalid-feedback" />
              </div>
              <div className="form-group col-sm-6 mb-1">
                <label htmlFor="staticEmail2" className="mb-1">Address</label>
                <Field
                  name={`address`}
                  type="text"
                  className={`form-control form-control-md` + (errors.address && touched.address ? ' is-invalid' : '')}
                  id="staticEmail2"
                  placeholder="Type here"
                  disabled={isView}
                  onKeyPress={(e) => forDescriptionAlphaNumericAllow(e)}
                />
                <ErrorMessage name="address" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group col-sm-6 mb-1">
                <label htmlFor="staticEmail3" className="mb-1">Registered Office Address</label>
                <Field
                  name={`registerOfficeAddress`}
                  type="text"
                  className={`form-control form-control-md` + (errors.registerOfficeAddress && touched.registerOfficeAddress ? ' is-invalid' : '')}
                  id="staticEmail3" placeholder="Type here"
                  disabled={isView}
                  onKeyPress={(e) => forDescriptionAlphaNumericAllow(e)}
                />
                <ErrorMessage name="registerOfficeAddress" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group col-sm-6 mb-1">
                <label htmlFor="staticEmail4" className="mb-1">Website</label>
                <Field name="website" type="url"
                  className={`form-control form-control-md` + (errors.website && touched.website ? ' is-invalid' : '')}
                  id="staticEmail4" placeholder="Type here" disabled={isView} />
                <ErrorMessage name="website" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group col-sm-6 mb-1">
                <label htmlFor="staticEmail5" className="mb-1">Group Company</label>
                <Field
                  name={`groupCompany`}
                  type="text"
                  className={`form-control form-control-md` + (errors.groupCompany && touched.groupCompany ? ' is-invalid' : '')}
                  id="staticEmail5"
                  disabled={isView}
                  placeholder="Type here"
                  onKeyPress={(e) => forDescriptionAlphaNumericAllow(e)}
                />
                <ErrorMessage name="groupCompany" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group col-sm-6 mb-1">
                <label htmlFor="staticEmail6" className="mb-1">Authorised Signatory</label>
                <Field
                  name={`authorisedSignatory`}
                  type="text"
                  className={`form-control form-control-md` + (errors.authorisedSignatory && touched.authorisedSignatory ? ' is-invalid' : '')}
                  id="staticEmail6"
                  placeholder="Type here"
                  disabled={isView}
                  onKeyPress={(e) => onlyAlphaNumericSpaceAllow(e)}
                />
                <ErrorMessage name="authorisedSignatory" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group col-sm-6 mb-1">
                <label htmlFor="staticEmail7" className="mb-1">Annual Turnover (in Cr INR)</label>
                <Field name={`annualTurnover`} type="number" className={`form-control form-control-md` + (errors.annualTurnover && touched.annualTurnover ? ' is-invalid' : '')}
                  placeholder="Type here"
                  id="staticEmail7" disabled={isView} />
                <ErrorMessage name="annualTurnover" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group col-sm-6 mb-1">
                <label htmlFor="staticEmail8" className="mb-1">No of Employees</label>
                <Field
                  name={`noOfEmployees`}
                  type="number"
                  className={`form-control form-control-md` + (errors.noOfEmployees && touched.noOfEmployees ? ' is-invalid' : '')}
                  id="staticEmail8"
                  placeholder="Type here"
                  disabled={isView}
                  onKeyPress={(e) => onlyNumberAllow(e)}
                />
                <ErrorMessage name="noOfEmployees" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group col-sm-6 mb-1">
                <label htmlFor="staticEmail9" className="mb-1">Core Business</label>
                <Field
                  name={`coreBusiness`}
                  type="text"
                  className={`form-control form-control-md` + (errors.coreBusiness && touched.coreBusiness ? ' is-invalid' : '')}
                  id="staticEmail9"
                  disabled={isView}
                  placeholder="Type here"
                  onKeyPress={(e) => forDescriptionAlphaNumericAllow(e)}
                />
                <ErrorMessage name="coreBusiness" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group col-sm-6 mb-1">
                <label htmlFor="staticEmail" className="mb-1">Certifications - </label>
                <Field name={`certification.name`} as="select" className={`form-control form-control-md` + (getIn(errors, 'certification.name') && getIn(touched, 'certification.name') ? ' is-invalid' : '')} disabled={isView} >
                  <option value="">Select</option>
                  <option value="ISO-9001-2000 certification">ISO-9001-2000 certification</option>
                  <option value="ISO 14000 Certification">ISO 14000 Certification</option>
                  <option value="OHSAS-18000 Certification">OHSAS-18000 Certification</option>
                  <option value="FSSAI Certificate">FSSAI Certificate</option>
                  <option value="Others">Others</option>
                </Field>
                <ErrorMessage name={`certification.name`} component="div" className="invalid-feedback" />
              </div>
              <div className="form-group col-sm-6 mb-1">
                <label htmlFor="staticEmail" className="mb-1">Registrations - </label>
                <Field name={`registration.name`} as="select" className={`form-control form-control-md` + (getIn(errors, 'registration.name') && getIn(touched, 'registration.name') ? ' is-invalid' : '')} disabled={isView} >
                  <option value="">Select</option>
                  <option value="msme license">msme license</option>
                  <option value="others">Others</option>
                </Field>
                <ErrorMessage name={`registration.name`} component="div" className="invalid-feedback" />
              </div>
              <div className="form-group col-sm-6 mb-1">
                <label htmlFor="staticEmail11" className="mb-1">Contact Person</label>
                <Field value={values.contactPerson} type="text" className="form-control form-control-md" id="staticEmail11" placeholder="contact person" readOnly />
              </div>
              {/* <div className="form-group col-sm-6 mb-4">
        <label htmlFor="staticEmail12" className="mb-1">Title</label>
        <Field value={values.title}  type="text" className="form-control form-control-md" id="staticEmail12" placeholder="Project Manager" readOnly />
      </div> */}
              <div className="form-group col-sm-6 mb-1">
                <label htmlFor="staticEmail13" className="mb-1">Email Address</label>
                <Field value={values.email} type="email" className="form-control form-control-md" id="staticEmail13" placeholder="Type here" readOnly />
              </div>
              <div className="form-group col-sm-6 mb-1">
                <label htmlFor="staticEmail14" className="mb-1">Phone</label>
                <Field value={values.phone} type="tel" className="form-control form-control-md" id="staticEmail14" placeholder="Type here" readOnly />
              </div>
              <div className={`col-12 mt-3 ${isView ? "d-none" : ""}`}>
                <div className="row justify-content-end">
                  {/* <div className="col-auto">
            <button type="button" className="btn btn-outline-deep-primary mb-3 add-className remove-className" data-add-target=".steps2" data-add-target-className="d-none" data-remove-target=".steps1" data-remove-target-className="d-none">Back</button>
          </div> */}
                  <div className="col-auto">
                    <button type="submit" className="btn btn-deep-primary mb-3 add-className remove-className" >Save
                      {data.isLoading ? <Spinner animation="border" /> : null}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}

      />
    </>
  );
}

export default ContactInformationForm;
