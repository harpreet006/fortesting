import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import axiosauth from '../../api/axios-auth';

const ChangePassword = ({userId, setModalShow, setPasswordSuccess}) => {
    return (
        <div>

<Formik
              enableReinitialize={true}
              validationSchema={
                Yup.object().shape({
                  newPassword: Yup.string().required('Required'),
                  confirmPassword: Yup.string().required('Required')
                  .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
                })
              }
                initialValues={{
                  "newPassword":"",
                  "confirmPassword":""
                }}

                onSubmit={fields => {
                  // delete fields['confirmPassword'];
                  console.log("Fields==>", fields)

                  let account = JSON.parse(localStorage.getItem('userData'));
                  let accountId = account?.account?.id


                  axiosauth.patch(`/api/v1/accounts/${accountId}/users/${userId}`, fields).then(response => {
                    let res = JSON.parse(response.data)
                    console.log("res==>", res)
                    setModalShow(false)
                    setPasswordSuccess(true)

                    setTimeout(()=>{
                        setPasswordSuccess(false)
                    }, 3000)
                    
                    }).catch((error) => {
                    }).then(() => {
                    })
                //   dispatch(updateWhsUser(userId, fields))
                }}
                render={({ values, setFieldValue, errors, status,onChange, touched }) =>{
                return(
              <Form>      
       
              <div className="row">         
                <div className="form-group col-lg-6 col-md-6 mb-4">
                  <label for="staticEmail" className="mb-2 pl-3">New Password</label>
                  <div className={`input-group append rounded-pill mb-1`}>
                    <Field name="newPassword" type="password" className={`form-control form-control-md px-4`} id="staticEmail" />
                    <div className="input-group-append">
                      <span className="input-group-text bg-white"><i className="fas fa-eye"></i></span>
                    </div>
                  </div> 
                  <span className="formikError">{errors.newPassword} </span>
                 
                </div>
                <div className="form-group col-lg-6 col-md-6 mb-4">
                  <label for="staticEmail" className="mb-2 pl-3">Confirm Password</label>
                  <div className={`input-group append rounded-pill mb-1`}>
                    <Field name="confirmPassword" type="password" className={`form-control form-control-md px-4`} id="staticEmail"   />
                    <div className="input-group-append">
                      <span className="input-group-text bg-white"><i className="fas fa-eye"></i></span>
                    </div>
                  </div> 
                 <span className="formikError">{errors.confirmPassword} </span>                  
                </div> 
                </div>
              <div className="row">
              <div className="col mx-auto">
                  <button type="submit" className="btn btn-deep-blue">Save</button>
                </div>
              </div>

              </Form>
            )
            }}
        /> 





            
        </div>
    )
}

export default ChangePassword
