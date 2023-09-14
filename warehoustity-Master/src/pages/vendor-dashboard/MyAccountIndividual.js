import React, {useEffect, useState} from 'react'
import VendorLayout from '../../layout/VendorLayout';
import $ from 'jquery';
import {authProfile, userUpdate,  successResponse} from '../../store/actions/login'
import {useDispatch, useSelector} from 'react-redux';
import FormSuccess from '../../components/helper/FormSuccess';
import Spinner from 'react-bootstrap/Spinner';
// import { useHistory } from 'react-router';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import {onlyAlphaNumericSpaceAllow, onlyAlphaNumericAllow} from '../../components/validation';

const MyAccountIndividual = () => {

  const data = useSelector((state)=>state.USERPROFILE)
    console.log("Indivudual User Data===>", data.userProfile)
    // const history = useHistory();
    const dispatch = useDispatch()
    const [initValue, setInItValue] = useState({
        address:"",
        pan:"",
        aadhaar:"",
        personalEmail: '',
        officialEmail: '',
        personalContact: '',
        officialContact: '',
        bloodGroup: ''
    })


    useEffect(() => {

        if(data.userProfile?.userType?.individual !==null){
            setInItValue(data.userProfile?.userType?.individual)
        }

       
    }, [data.userProfile]);

    useEffect(() => {
        dispatch(authProfile())
    }, [dispatch]);



  useEffect(()=>{
    $(function () {
      $('.edit-details').on('click',function(){
          var $qty=$(this).closest('.inputs').find('.form-control');
          $qty.prop("disabled", false);
          $(this).css("display", "none");
          $(this).closest(".inputs").find(".save-details").css("display", "block");
          $(this).closest(".inputs").find(".personal-details").removeClass("disabled");
          $(".disabled-true .cancel").css("display", "block");
      });
      $('.save-details').on('click',function(){
          var $qty=$(this).closest('.inputs').find('.form-control');
          $qty.prop("disabled", true);
          $(this).css("display", "none");
          $(this).closest(".inputs").find(".save-details").css("display", "none");
          $(this).closest(".inputs").find(".edit-details").css("display", "block");
          $(".disabled-true .cancel").css("display", "none");
      });
      $('.cancel').on('click',function(){
          var $qty=$(this).closest('.inputs').find('.form-control');
          $qty.prop("disabled", true);
          $(this).css("display", "none");
          $(this).closest(".inputs").find(".save-details").css("display", "none");
          $(this).closest(".inputs").find(".edit-details").css("display", "block");
          $(".disabled-true .cancel").css("display", "none");
      });
      var $qty=$('.inputs.disabled-true').find('.form-control');
      $qty.prop("disabled", true);
      $(".edit-details").css("display", "none");
      $(".disabled-true .save-details").css("display", "none");
      $(".disabled-true .edit-details").css("display", "block");
      $(".disabled-true .cancel").css("display", "none");
  });



  },[])

  return (
    <VendorLayout>

{
            data.isSuccess?.statusCode === 200 ?
                <FormSuccess onClick={()=> dispatch(successResponse(null))} message={data.isSuccess.message} />
            : null
                }
                
    <div className="content-admin px-5">
          <div className="row align-items-center pb-3 px-3 mx-0">
            <div className="col-12 pt-3 mt-5">
              <h6 className="text-dark-blue">My Account Details</h6>
            </div>

            <Formik
                    enableReinitialize={true}
                    initialValues={initValue}
                   
                    onSubmit={fields => {

                      let uploadData = {
                        "userType": {
                          "type": "individual",
                          "individual": fields
                      }
                    }

                        // console.log("My Account-->", fields)
                        dispatch(userUpdate(uploadData))

                    }}
                    render={({values, errors, status, touched }) => (
                    <Form>
 

            <div className="col-12">
              <div className="row">
                <div className="col-12 pt-3">
                    <div className="row mx-0">
                      <div className="col-xl-3 col-md-6 px-0">
                        <form action="">
                        <div className="form-group border-bottom pb-3">
                          <label for="" className="text-gray text-uppercase small mb-0">Vendor id: <span className="font-weight-bold">50788</span></label>
                          <div className="input-group input-group-lg disabled-true inputs user-name pr-3">
                            <input value={data.userProfile?.firstName} type="text" className="form-control h-30px bg-none p-0" disabled/>
                            {/* <div className="input-group-append">
                              <button type="button" className="bg-none pb-1 border-0 text-danger save-details" style={{display:'none'}}><i className="fas fa-times"></i></button>
                              <button type="button" className="bg-none pb-1 border-0 text-success save-details" style={{display:'none'}}><i className="fas fa-check"></i></button>
                              <button type="button" className="bg-none pb-1 border-0 text-dark edit-details" style={{display:'block'}}><i className="fas fa-pen"></i></button>
                            </div> */}
                          </div>
                        </div>
                        </form>
                      </div>
                      <div className="col-xl-3 col-md-6 px-0">
                        <form action="">
                        <div className="form-group border-bottom pb-3">
                          <label for="" className="text-gray text-uppercase small mb-0">PAN No</label>
                          <div className="input-group input-group-lg disabled-true inputs user-name pr-3">
                            <Field name="pan" type="text" className={`form-control h-30px bg-none p-0` + (errors.pan && touched.pan ? ' is-invalid' : '')} />
                            <div className="input-group-append">
                              <button type="button" className="bg-none pb-1 border-0 text-danger save-details" style={{display:'none'}}><i className="fas fa-times"></i></button>
                              <button type="button" className="bg-none pb-1 border-0 text-success save-details" style={{display:'none'}}><i className="fas fa-check"></i></button>
                              <button type="button" className="bg-none pb-1 border-0 text-dark edit-details" style={{display:'block'}}><i className="fas fa-pen"></i></button>
                            </div>
                            <ErrorMessage name="pan" component="div" className="invalid-feedback" />
                          </div>
                        </div>
                        </form>
                      </div>
                      <div className="col-xl-3 col-md-6 px-0">
                        <form action="">
                        <div className="form-group border-bottom pb-3">
                          <label for="" className="text-gray text-uppercase small mb-0">Aadhaar No</label>
                          <div className="input-group input-group-lg disabled-true inputs user-name pr-3">
                            <Field
                            name="aadhaar"
                            type="number" className={`form-control h-30px bg-none p-0` + (errors.aadhaar && touched.aadhaar ? ' is-invalid' : '')} />
                            <div className="input-group-append">
                              <button type="button" className="bg-none pb-1 border-0 text-danger save-details" style={{display:'none'}}><i className="fas fa-times"></i></button>
                              <button type="button" className="bg-none pb-1 border-0 text-success save-details" style={{display:'none'}}><i className="fas fa-check"></i></button>
                              <button type="button" className="bg-none pb-1 border-0 text-dark edit-details" style={{display:'block'}}><i className="fas fa-pen"></i></button>
                            </div>
                            <ErrorMessage name="aadhaar" component="div" className="invalid-feedback" />
                          </div>
                        </div>
                        </form>
                      </div>
                      {/* <div className="col-xl-3 col-md-6 px-0">
                        <form action="">
                        <div className="form-group border-bottom pb-3">
                          <label for="" className="text-gray text-uppercase small mb-0">Password</label>  
                          <button type="button" className="btn h-30px px-0 py-0 d-block border-0 text-deep-blue font-weight-bold">RESET PASSWORD</button>
                        </div>
                        </form>
                      </div> */}
                    </div>
                </div> 
              </div>  
            </div>
            <div className="col-12 pt-3">
              <h6 className="text-dark-blue mb-0">Contact Details</h6>
            </div>
            <div className="col-12">
              <div className="row mx-0">
                <div className="col-12 py-3">
                    <div className="row bg-white pt-3 rounded">
                      <div className="col-xl-12 col-md-6 mb-3">
                        <form action="">
                        <div className="form-group mb-0">
                          <label for="" className="text-gray text-uppercase small mb-0">Address</label>
                          <div className="input-group disabled-true inputs user-name pr-3">
                            <Field 
                            onKeyPress={(e) => onlyAlphaNumericSpaceAllow(e)}
                            name="address" type="text"
                            className="form-control h-30px bg-none p-0" />
                            <div className="input-group-append">
                              <button type="button" className="bg-none pb-1 border-0 text-danger save-details" style={{display:'none'}}><i className="fas fa-times"></i></button>
                              <button type="button" className="bg-none pb-1 border-0 text-success save-details" style={{display:'none'}}><i className="fas fa-check"></i></button>
                              <button type="button" className="bg-none pb-1 border-0 text-dark edit-details" style={{display:'block'}}><i className="fas fa-pen"></i></button>
                            </div>
                          </div>
                        </div>
                        </form>
                      </div> 
                      <div className="col-xl-3 col-md-6 mb-3">
                        <form action="">
                        <div className="form-group mb-0">
                          <label for="" className="text-gray text-uppercase small mb-0">Personal Mail id</label>
                          <div className="input-group disabled-true inputs user-name pr-3">
                          <input value={data.userProfile?.email} type="text" className={`form-control h-30px bg-none p-0`} disabled />
                           
                            {/* <Field name="personalEmail" type="text"
                             className={`form-control h-30px bg-none p-0`+ (errors.personalEmail && touched.personalEmail ? ' is-invalid' : '')} />
                            <div className="input-group-append">
                              <button type="button" className="bg-none pb-1 border-0 text-danger save-details" style={{display:'none'}}><i className="fas fa-times"></i></button>
                              <button type="button" className="bg-none pb-1 border-0 text-success save-details" style={{display:'none'}}><i className="fas fa-check"></i></button>
                              <button type="button" className="bg-none pb-1 border-0 text-dark edit-details" style={{display:'block'}}><i className="fas fa-pen"></i></button>
                            </div>
                            <ErrorMessage name="personalEmail" component="div" className="invalid-feedback" /> */}
                          </div>
                        </div>
                        </form>
                      </div>
                      <div className="col-xl-3 col-md-6 mb-3">
                        <form action="">
                        <div className="form-group mb-0">
                          <label for="" className="text-gray text-uppercase small mb-0">Official Mail id</label>
                          <div className="input-group disabled-true inputs user-name pr-3">
                            <Field name="officialEmail" type="text" 
                             className={`form-control h-30px bg-none p-0`  + (errors.officialEmail && touched.officialEmail ? ' is-invalid' : '')} />
                            <div className="input-group-append">
                              <button type="button" className="bg-none pb-1 border-0 text-danger save-details" style={{display:'none'}}><i className="fas fa-times"></i></button>
                              <button type="button" className="bg-none pb-1 border-0 text-success save-details" style={{display:'none'}}><i className="fas fa-check"></i></button>
                              <button type="button" className="bg-none pb-1 border-0 text-dark edit-details" style={{display:'block'}}><i className="fas fa-pen"></i></button>
                            </div>
                            <ErrorMessage name="officialEmail" component="div" className="invalid-feedback" />
                          </div>
                        </div>
                        </form>
                      </div>
                      <div className="col-xl-3 col-md-6 mb-3">
                        <form action="">
                        <div className="form-group mb-0">
                          <label for="" className="text-gray text-uppercase small mb-0">Personal Contact no</label>
                          <div className="input-group disabled-true inputs user-name pr-3">
                          <input value={data.userProfile?.phone} type="text" className={`form-control h-30px bg-none p-0`} disabled />
                          </div>
                        </div>
                        </form>
                      </div>
                      <div className="col-xl-3 col-md-6 mb-3">
                        <form action="">
                        <div className="form-group mb-0">
                          <label for="" className="text-gray text-uppercase small mb-0">Official Contact no</label>
                          <div className="input-group disabled-true inputs user-name pr-3">
                            <Field
                              onKeyPress={(e) => onlyAlphaNumericAllow(e)}
                              name="officialContact" type="text"
                              className={`form-control h-30px bg-none p-0`+ (errors.officialContact && touched.officialContact ? ' is-invalid' : '')} />
                            <div className="input-group-append">
                              <button type="button" className="bg-none pb-1 border-0 text-danger save-details" style={{display:'none'}}><i className="fas fa-times"></i></button>
                              <button type="button" className="bg-none pb-1 border-0 text-success save-details" style={{display:'none'}}><i className="fas fa-check"></i></button>
                              <button type="button" className="bg-none pb-1 border-0 text-dark edit-details" style={{display:'block'}}><i className="fas fa-pen"></i></button>
                            </div>
                            <ErrorMessage name="officialContact" component="div" className="invalid-feedback" />
                          </div>
                        </div>
                        </form>
                      </div>
                    </div>
                </div> 
              </div>  
            </div>  
            <div className="col-12 pt-3">
              <h6 className="text-dark-blue mb-0">Blood group</h6>
            </div>
            <div className="col-12">
              <div className="row mx-0">
                <div className="col-12 py-3">
                    <div className="row bg-white pt-3 rounded"> 
                      <div className="col-xl-3 col-md-6 mb-3">
                        <form action="">
                        <div className="form-group mb-0">
                          <label for="" className="text-gray text-uppercase small mb-0">Blood group</label>
                          <div className="input-group disabled-true inputs user-name pr-3">
                            <Field name="bloodGroup" type="text"
                             className={`form-control h-30px bg-none p-0` + (errors.bloodGroup && touched.bloodGroup ? ' is-invalid' : '')} />
                            <div className="input-group-append">
                              <button type="button" className="bg-none pb-1 border-0 text-danger save-details" style={{display:'none'}}><i className="fas fa-times"></i></button>
                              <button type="button" className="bg-none pb-1 border-0 text-success save-details" style={{display:'none'}}><i className="fas fa-check"></i></button>
                              <button type="button" className="bg-none pb-1 border-0 text-dark edit-details" style={{display:'block'}}><i className="fas fa-pen"></i></button>
                            </div>
                            <ErrorMessage name="bloodGroup" component="div" className="invalid-feedback" />
                          </div>
                        </div>
                        </form>
                      </div>
                    </div>
                </div> 
              </div>  
            </div>



            <div className="col-auto">
                        <button type="submit"
                        disabled={data.isPending}
                        className="btn btn-deep-primary my-4">
                            Submit
                            {data.isPending ? <Spinner animation="border"  /> :null}
                            </button>
                    </div>
            </Form>
              )} />

            {/* <div className="col-12 pt-3 mt-4">
              <h6 className="text-dark-blue mb-0">Settings</h6>
            </div> */}
            {/* <div className="col-12">
              <div className="row mx-0">
                <div className="col-12 pt-3">
                    <div className="row bg-white border rounded d-flex justify-content-between">
                      <div className="p-3"><p className="mb-0">Notifications</p></div>
                      <form action="" className="pr-2">
                        <div className="custom-control m-3 custom-switch common-switch-deep-blue common-switch">
                          <input type="checkbox" className="custom-control-input common-switch-deep-blue-input" id="customSwitch1"/>
                          <label className="custom-control-label common-switch-deep-blue-label" for="customSwitch1"></label>
                        </div>
                      </form>
                    </div>
                </div>
                <div className="col-12 pt-3">
                  <div className="row bg-white border rounded d-flex justify-content-between align-items-center">
                    <div className="p-3"><p className="mb-0">Profile Deactivate Request</p></div>
                    <div>
                      <button className="btn py-1 px-4 btn-sm btn-deep-blue font-weight-light m-3">Request</button>
                    </div>
                  </div>
                </div>
              </div> 
            </div>  */}
          </div>
        </div>
       </VendorLayout>
  );
}

export default MyAccountIndividual;
