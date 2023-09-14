
import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout';
import Menu from './menu';
import { Link, useLocation,useHistory } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {authProfile, userUpdate,  successResponse} from '../../store/actions/login'
import {useDispatch, useSelector} from 'react-redux';
import FormSuccess from '../../components/helper/FormSuccess';
import Spinner from 'react-bootstrap/Spinner';

const Company = () => {
    const { pathname } = useLocation();
    const history =useHistory();
    const dispatch = useDispatch()
    const data = useSelector((state)=>state.USERPROFILE)

    console.log("user data==>", data)

    const [userJson, setUserJson] = useState({
        address:"",
        website:"",
        registerOffice:"",
        companyType: '',
        companyGroup: '',
        authorisedSignature: '',
        annualTurnover: '',
        noOfEmployees: '',
        coreBusiness: '',
        certificates: [
            {
                certificateNumber: "",
                type:""
            }
        ],
        registerations: [
            {
                registerNumber: "",
                type: ""
            }
        ],
    })

    
useEffect(() => {
    if(data.userProfile?.userType?.organization !==null){
        setUserJson(data.userProfile?.userType?.organization)
    }
}, [data.userProfile])


    useEffect(() => {
        dispatch(authProfile())
    }, [dispatch]);



    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <Layout>

                {
                    data.isSuccess?.statusCode === 200 ?
                        <FormSuccess onClick={()=> dispatch(successResponse(null))} message={data.isSuccess.message} />
                    : null
                }
          
            <div>
            <div className="container">
            <div className="row justify-content-end">
                <div className="col-sm pt-3">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb common-breadcrumb text-dark mb-0">
                    {/* <li className="breadcrumb-item"><Link to="../index2.html">Home</Link></li> */}
                    <Link className="breadcrumb-item" to={"/dashboard"}>Home</Link>
                    <li className="breadcrumb-item active" aria-current="page">My Account</li>
                    </ol>
                </nav>
                </div> 
            </div>
            </div>
        </div>
        <div className="mb-5">
                <div className="container-xl">
                <div className="row">
                    
                    <button className="btn btn-deep-primary p-0 size-40px d-lg-none btn-sidebar align-items-center justify-content-center" type="button">
                    <span></span>
                    </button>
                    {/* user menu */}
                    <Menu />
                    <div className="col-xl-9 col-lg-8">

                    <div className="border-bottom mb-4 d-sm-flex justify-content-between">
                        <button  className="btn name-breadcrumb px-0 text-dark font-heading mr-3 mb-2"> <i onClick={()=>history.goBack()} className="fas fa-chevron-left mr-3"></i> Company Account</button>
                    </div>

                        <div className="row">
                        <Formik
                                enableReinitialize={true}
                                initialValues={userJson}
                                validationSchema={Yup.object().shape({
                                    // name: Yup.string()
                                    //   .required('Name is required'),
                                    // address: Yup.string()
                                    //   .required('Address is required'),
                                    // website: Yup.string()
                                    //     .required('Website is required'),
                                    //     registerOffice: Yup.string()
                                    //     .required('Registered Office is required'),
                                    // companyType: Yup.string()
                                    //     .required('Type Of The Company is required'),
                                    // companyGroup: Yup.string()
                                    //     .required('Name Of The Group is required'),                                    
                                    // authorisedSignature: Yup.string()
                                    //     .required('Authroised Signatory is required'),                                    
                                    // annualTurnover: Yup.string()
                                    //     .required('Annual Turnover on is required'),
                                    // noOfEmployees: Yup.string()
                                    //     .required('Number Of Employee is required'),
                                    // coreBusiness: Yup.string()
                                    //     .required('Core Business is required'),
                                    // certificates: Yup.string()
                                    //     .required('certificates irequired'),
                                    // registerations: Yup.string()
                                    //     .required('Registerations is required'),
                                  })}
                                onSubmit={fields => {
                                    let updateData = {
                                        "userType": {
                                            "type": "organization",
                                            "organization":fields
                                        }
                                    }
                                    
                                    console.log("updateData===>", updateData)
                                    dispatch(userUpdate(updateData))
                                }}
                                render={({ errors, status, touched }) => (
                                <Form>
                                <div className="row">
                                    <div className="form-group col-lg-4 col-md-6 mb-4">
                                    <label htmlFor="staticEmail" className="mb-2">Name</label>
                                    <input value={data.userProfile?.firstName} placeholder="Type Here" name="name" type="text" className={'form-control form-control-lg'} disabled />
                                    {/* <ErrorMessage name="name" component="div" className="invalid-feedback" /> */}
                                    </div>                                    
                                    <div className="form-group col-lg-4 col-md-6 mb-4">
                                    <label htmlFor="staticEmail" className="mb-2">Website</label>
                                    <Field placeholder="Type Here" name="website" type="text" className={'form-control form-control-lg' + (errors.website && touched.website ? ' is-invalid' : '')} />
                                    <ErrorMessage name="website" component="div" className="invalid-feedback" />
                                    
                                    </div>
                                    <div className="form-group col-lg-4 col-md-6 mb-4">
                                    <label htmlFor="staticEmail" className="mb-2">Register Office</label>                                    
                                    <Field placeholder="Type Here" name="registerOffice" type="text" className={'form-control form-control-lg' + (errors.registerOffice && touched.registerOffice ? ' is-invalid' : '')} />
                                    <ErrorMessage name="registerOffice" component="div" className="invalid-feedback" />
                                    
                                    </div>
                                    <div className="form-group col-lg-4 col-md-6 mb-4">
                                    <label htmlFor="staticEmail" className="mb-2">Address</label>                                                          
                                    <Field placeholder="Type Here" name="address" type="text" className={'form-control form-control-lg' + (errors.address && touched.address ? ' is-invalid' : '')} />
                                    <ErrorMessage name="address" component="div" className="invalid-feedback" />
                                    
                                    </div>
                                    <div className="form-group col-lg-4 col-md-6 mb-4">
                                    <label htmlFor="staticEmail" className="mb-2">Type of the company</label>
                                    <Field placeholder="Type Here" name="companyType" type="text" className={'form-control form-control-lg' + (errors.companyType && touched.companyType ? ' is-invalid' : '')} />
                                    <ErrorMessage name="companyType" component="div" className="invalid-feedback" />
                                    
                                    </div>
                                    <div className="form-group col-lg-4 col-md-6 mb-4">
                                    <label htmlFor="staticEmail" className="mb-2">Name of the Group Company</label>
                                    <Field placeholder="Type Here" name="companyGroup" type="text" className={'form-control form-control-lg' + (errors.companyGroup && touched.companyGroup ? ' is-invalid' : '')} />
                                    <ErrorMessage name="companyGroup" component="div" className="invalid-feedback" />

                                    </div>
                                    <div className="form-group col-lg-4 col-md-6 mb-4">
                                    <label htmlFor="staticEmail" className="mb-2">Authroised Signatory</label>
                                    <Field placeholder="Type Here" name="authorisedSignature" type="text" className={'form-control form-control-lg' + (errors.authorisedSignature && touched.authorisedSignature ? ' is-invalid' : '')} />
                                    <ErrorMessage name="authorisedSignature" component="div" className="invalid-feedback" />

                                    </div>
                                    <div className="form-group col-lg-4 col-md-6 mb-4">
                                    <label htmlFor="staticEmail" className="mb-2">Annual Turnover</label>
                                    <Field placeholder="Type Here" name="annualTurnover" type="text" className={'form-control form-control-lg' + (errors.annualTurnover && touched.annualTurnover ? ' is-invalid' : '')} />
                                    <ErrorMessage name="annualTurnover" component="div" className="invalid-feedback" />
                                   
                                    </div>
                                    <div className="form-group col-lg-4 col-md-6 mb-4">
                                    <label htmlFor="staticEmail" className="mb-2">No of employees</label>
                                    <Field name="noOfEmployees" type="text" className={'form-control form-control-lg' + (errors.noOfEmployees && touched.noOfEmployees ? ' is-invalid' : '')} />
                                    <ErrorMessage name="noOfEmployees" component="div" className="invalid-feedback" />

                                    </div>
                                    <div className="form-group col-lg-4 col-md-6 mb-4">
                                    <label htmlFor="staticEmail" className="mb-2">Core business</label>
                                    <Field placeholder="Type Here" name="coreBusiness" type="text" className={'form-control form-control-lg' + (errors.coreBusiness && touched.coreBusiness ? ' is-invalid' : '')} />
                                    <ErrorMessage name="coreBusiness" component="div" className="invalid-feedback" />

                                    </div>
                                    <div className="form-group col-lg-4 col-md-6 mb-4">
                                    <label htmlFor="staticEmail" className="mb-2">certificates</label>
                                    <Field placeholder="Type Here" name="certificates.0.certificateNumber" pe="text" className={'form-control form-control-lg'} />
                                    </div>
                                    <div className="form-group col-lg-4 col-md-6 mb-4">
                                    <label htmlFor="staticEmail" className="mb-2">Registrations</label>
                                    <Field placeholder="Type Here" name="registerations.0.registerNumber" type="text" className={'form-control form-control-lg'} />
                                    </div>
                                </div>
                                <div className="row">

                                <div className="col-auto">
                                <button onClick={()=>history.goBack()} type="button" className="btn btn-deep-primary toggle-class my-4">Back</button>
                                    </div>
                                    
                                <div className="col-auto">
                                    <button type="submit"
                                    disabled={data.isPending}
                                    className="btn btn-deep-primary my-4">
                                        Submit
                                        {data.isPending ? <Spinner animation="border"  /> :null}
                                        </button>
                                </div>
                                </div>
                                </Form>
                                )} />
                        </div>
                    </div>
                </div>
                </div>
            </div>
            
        </Layout>
    )
}

export default Company;