import React, {useState, useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage, getIn } from 'formik';
import * as Yup from 'yup';
import {updateContactRFQ} from '../../../../store/actions/customer/rfqAction'
import {useSelector, useDispatch} from 'react-redux';
import {CardLoader} from '../../../../components/helper/CustomLoader';

const ContactInformationForm = ({isView, rfqdata}) => {

  const dispatch = useDispatch();
  const data = useSelector((state) => state.CUSTOMER_RFQ_INFO);

const [contactForm, setContactForm] = useState({
                              "companyName": "",
                              "companyType": {
                                  "type": ""
                              },
                              "address": "",
                              "registerOfficeAddress":"",
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
                              "contactPerson": "",
                              "title": "",
                              "email": "",
                              "phone": "",
                          })

useEffect(() => {


    if(data.rfqDetail.contactInformation){
      setContactForm(data.rfqDetail.contactInformation)
    }


}, [data.rfqDetail]);
            


let contactSchema = Yup.object().shape({
  
  companyType: Yup.lazy(() =>{
      return Yup.object().shape({
        type: Yup.string().required('Required')
      })  
    }),

    website: Yup.lazy(() =>{
        return Yup.string().required('Required')  
    }),
    groupCompany: Yup.lazy(() =>{
      return Yup.string().required('Required')  
    }),
    authorisedSignatory: Yup.lazy(() =>{
      return Yup.string().required('Required')  
    }),
    annualTurnover: Yup.lazy(() =>{
      return Yup.string().required('Required')  
    }),
    noOfEmployees: Yup.lazy(() =>{
      return Yup.string().required('Required')  
    }),
    coreBusiness: Yup.lazy(() =>{
      return Yup.string().required('Required')  
    }),

    certification: Yup.lazy(() =>{
      return Yup.object().shape({
        name: Yup.string().required('Required')
      })  
    }),
    registration: Yup.lazy(() =>{
      return Yup.object().shape({
        name: Yup.string().required('Required')
      })  
    }),

})


  console.log("dataa",data)

  return (
    <>
    {
      data.isLoading ?  <CardLoader loaderCard="loaderCard" /> :
    <Formik
     enableReinitialize={true}
    initialValues={contactForm}
    validationSchema={contactSchema}
    
    onSubmit={(fields) => {
      alert("hello");
      console.log("fields---->", fields)
      if(data.rfqDetail.id){
        fields["customerRfq"]= data.rfqDetail.id
      console.log("---->", fields)

      dispatch(updateContactRFQ(fields,rfqdata))
      }

    }}
    render={({ values, errors, status,onChange, touched }) => (

      <Form> 
    <div className="row pt-2">  
      <div className="form-group col-sm-6 mb-4">
        <label htmlFor="staticEmail" className="mb-2">Company Name</label>
        <Field name={`companyName`} type="text" className="form-control form-control-md" id="staticEmail" placeholder="Ex : warehouse.pvt.ltd" disabled={true} />
      </div>
      <div className="form-group col-sm-6 mb-4">
        <label className="mb-2">Type of Company</label>
        <Field name={`companyType.type`} as="select" className={`form-control form-control-md`+ (getIn(errors, 'companyType.type') && getIn(touched, 'companyType.type') ? ' is-invalid' : '')} disabled={isView} >
          <option value="">Select</option>
          <option value="individual">individual</option>                              
          <option value="consultant">Consultant</option>                              
          <option value="organisation" >Organisation</option> 
        </Field>
        <ErrorMessage name={`companyType.type`} component="div" className="invalid-feedback" />
      </div>
      <div className="form-group col-sm-6 mb-4">
        <label htmlFor="staticEmail2" className="mb-2">Address</label>
        <Field name={`address`} type="text" className="form-control form-control-md" id="staticEmail2" placeholder="h-29838A, Gurgouan, New delhi - 7747474, India" disabled={isView} />
      </div>
      <div className="form-group col-sm-6 mb-4">
        <label htmlFor="staticEmail3" className="mb-2">Registered Office Address</label>
        <Field name={`registerOfficeAddress`} type="text" className="form-control form-control-md" id="staticEmail3" placeholder="h-29838A, Gurgouan, New delhi - 7747474, India" disabled={isView} />
      </div>
      <div className="form-group col-sm-6 mb-4">
        <label htmlFor="staticEmail4" className="mb-2">Website</label>
        <Field name="website" type="url" className={`form-control form-control-md`+ (errors.website && touched.website ? ' is-invalid' : '')}id="staticEmail4" disabled={isView} />
        <ErrorMessage name="website" component="div" className="invalid-feedback" />
      </div>
      <div className="form-group col-sm-6 mb-4">
        <label htmlFor="staticEmail5" className="mb-2">Group Company</label>
        <Field name={`groupCompany`} type="text" className={`form-control form-control-md`+ (errors.groupCompany && touched.groupCompany ? ' is-invalid' : '')} id="staticEmail5" disabled={isView} />
        <ErrorMessage name="groupCompany" component="div" className="invalid-feedback" />
      </div>
      <div className="form-group col-sm-6 mb-4">
        <label htmlFor="staticEmail6" className="mb-2">Authorised Signatory</label>
        <Field name={`authorisedSignatory`} type="text" className={`form-control form-control-md`+ (errors.authorisedSignatory && touched.authorisedSignatory ? ' is-invalid' : '')} id="staticEmail6" disabled={isView} />
        <ErrorMessage name="authorisedSignatory" component="div" className="invalid-feedback" />
      </div>
      <div className="form-group col-sm-6 mb-4">
        <label htmlFor="staticEmail7" className="mb-2">Annual Turnover (in Cr INR)</label>
        <Field name={`annualTurnover`} type="number" className={`form-control form-control-md`+ (errors.annualTurnover && touched.annualTurnover ? ' is-invalid' : '')} id="staticEmail7" disabled={isView} />
        <ErrorMessage name="annualTurnover" component="div" className="invalid-feedback" />
      </div>
      <div className="form-group col-sm-6 mb-4">
        <label htmlFor="staticEmail8" className="mb-2">No of Employees</label>
        <Field name={`noOfEmployees`} type="number" className={`form-control form-control-md`+ (errors.noOfEmployees && touched.noOfEmployees ? ' is-invalid' : '')} id="staticEmail8" disabled={isView} />
        <ErrorMessage name="noOfEmployees" component="div" className="invalid-feedback" />
      </div>
      <div className="form-group col-sm-6 mb-4">
        <label htmlFor="staticEmail9" className="mb-2">Core Business</label>
        <Field name={`coreBusiness`} type="text" className={`form-control form-control-md`+ (errors.coreBusiness && touched.coreBusiness ? ' is-invalid' : '')} id="staticEmail9" disabled={isView} />
        <ErrorMessage name="coreBusiness" component="div" className="invalid-feedback" />
      </div>
      <div className="form-group col-sm-6 mb-4">
        <label htmlFor="staticEmail" className="mb-2">Certifications - </label>
        <Field name={`certification.name`} as="select"  className={`form-control form-control-md`+ (getIn(errors, 'certification.name') && getIn(touched, 'certification.name') ? ' is-invalid' : '')} disabled={isView} >
          <option value="">Select</option>
          <option value="ISO-9001-2000 certification">ISO-9001-2000 certification</option>                              
          <option value="ISO 14000 Certification">ISO 14000 Certification</option>                              
          <option value="OHSAS-18000 Certification">OHSAS-18000 Certification</option> 
          <option value="FSSAI Certificate">FSSAI Certificate</option> 
          <option value="Others">Others</option> 
        </Field>
        <ErrorMessage name={`certification.name`} component="div" className="invalid-feedback" />
      </div>
      <div className="form-group col-sm-6 mb-4">
        <label htmlFor="staticEmail" className="mb-2">Registrations - </label>
        <Field name={`registration.name`} as="select"  className={`form-control form-control-md`+ (getIn(errors, 'registration.name') && getIn(touched, 'registration.name') ? ' is-invalid' : '')} disabled={isView} >
          <option value="">Select</option>
          <option value="msme license">msme license</option>                              
          <option value="others">Others</option>                              
        </Field>
        <ErrorMessage name={`registration.name`} component="div" className="invalid-feedback" />
      </div>
      <div className="form-group col-sm-6 mb-4">
        <label htmlFor="staticEmail11" className="mb-2">Contact Person</label>
        <Field value={values.contactPerson} type="text" className="form-control form-control-md" id="staticEmail11" placeholder="Ravish" readOnly />
      </div>
      {/* <div className="form-group col-sm-6 mb-4">
        <label htmlFor="staticEmail12" className="mb-2">Title</label>
        <Field value={values.title}  type="text" className="form-control form-control-md" id="staticEmail12" placeholder="Project Manager" readOnly />
      </div> */}
      <div className="form-group col-sm-6 mb-4">
        <label htmlFor="staticEmail13" className="mb-2">Email Address</label>
        <Field value={values.email} type="email" className="form-control form-control-md" id="staticEmail13" placeholder="ravish@projectmanager.escale" readOnly />
      </div>
      <div className="form-group col-sm-6 mb-4">
        <label htmlFor="staticEmail14" className="mb-2">Phone</label>
        <Field value={values.phone} type="tel" className="form-control form-control-md" id="staticEmail14" placeholder="91 556566565" readOnly />
      </div>
      <div className={`col-12 mt-3 ${isView ? "d-none" :""}`}>
        <div className="row justify-content-end">
          {/* <div className="col-auto">
            <button type="button" className="btn btn-outline-deep-primary mb-3 add-className remove-className" data-add-target=".steps2" data-add-target-className="d-none" data-remove-target=".steps1" data-remove-target-className="d-none">Back</button>
          </div> */}
          <div className="col-auto">
            <button type="submit" className="btn btn-deep-primary mb-3 add-className remove-className" >Submit</button>
          </div>
        </div>
      </div>
    </div>
   </Form>
       )}
    
    />
    }
    </>
  );
}

export default ContactInformationForm;
