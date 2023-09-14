import React,{useEffect, useState} from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {otpVerification, otpSuccess, updateMobileNumber, resendOtp} from './../../store/actions/register';
import {useDispatch, useSelector} from 'react-redux';
import $ from "jquery"

const OtpVerify = ({mobileNumber,verifyOtpModal,setverifyOtpModal,successModal, setsuccessModal }) => {
  
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [oldNumber, setOldNumber] = useState(null);

  const [otpJson, setOtpJson] = useState({
    "phone":"",
    "otp1":"",
    "otp2":"",
    "otp3":"",
    "otp4":"",
    "type":"phone"
  })

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  useEffect(()=>{
    if(state.otpVerified?.registerMobile){

      setOldNumber(state.otpVerified?.registerMobile)

      setOtpJson({
        "phone":state.otpVerified?.registerMobile,
        "otp1":"",
        "otp2":"",
        "otp3":"",
        "otp4":"",
        "type":"phone"
      })

    }
  },[state.otpVerified])

  useEffect(() => {
    function loadJs(){
      // Digit Group

      $('.digit-group').find('input').each(function() {
        $(this).attr('maxlength', 1);
        $(this).on('keyup', function(e) {
            var parent = $($(this).parent());
        
            if(e.keyCode === 8 || e.keyCode === 37) {
                var prev = parent.find('input#' + $(this).data('previous'));
            
                if(prev.length) {
                    $(prev).select();
                }
            } else if((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
                var next = parent.find('input#' + $(this).data('next'));
            
                if(next.length) {
                    $(next).select();
                } 
            }
        });
    });


// Phone number editable
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

    }

    loadJs()
  }, [])
  
const saveButton = (newNumber) =>{

  dispatch(updateMobileNumber(
    {
      "phone": oldNumber,
      "newPhone":newNumber
  }
  ))
} 

const resend = () =>{
  if(state.otpVerified?.registerMobile){
    dispatch(resendOtp({
      "countryCode":"+91",
       "phone":state.otpVerified?.registerMobile
    }))
  }
}
// state.otpVerified?.registerMobile

  return (
        <>

            <Formik
                  initialValues={otpJson}
                  enableReinitialize={true}
                  validationSchema={Yup.object().shape({
                    phone: Yup.string()
                      .required('Phone is required')
                      .matches(new RegExp('[0-9]{10}'),"number must be 10 digit"),
                    otp1: Yup.string()
                      .required(" "),
                      otp2: Yup.string()
                      .required(" "),
                      otp3: Yup.string()
                      .required(" "),
                      otp4: Yup.string()
                      .required(" "),
                  })}
                  onSubmit={fields => {
                    console.log("fields= OTP==>",fields)
                   
                    let data ={
                      "phone":fields.phone.toString(),
                      "otp":"".concat(fields.otp1,fields.otp2,fields.otp3,fields.otp4)
                    }
                     dispatch(otpVerification(data))
                    // same shape as initial values
                    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
                    //  onSubmit={(e) => this.signUp(e)}
                    setverifyOtpModal(!verifyOtpModal)
                    setsuccessModal(!successModal);
                  }}
                  render={({ errors, values, status, touched }) => (
                      
                <Form>
                  <div className="px-0" id="verify-otp-modal" tabIndex="-1" role="dialog" aria-labelledby="verify-otp-modalLabel" aria-hidden="true">
                        {/* <button type="button" className="close mr-4 mt-2">
                          <span onClick={()=>dispatch(otpSuccess(false))}>&times;</span>
                        </button> */}
                      <div className="row px-3">
                        <div className="col-12 py-lg-4 mb-3 p-sm-5 p-3">
                         
                          <div className="row">
                            <div className="col-12">
                              
                              <div>
                                <div className="img-holder text-center">
                                  <img className="img-fluid" src={"/assets/images/logo.png"} alt="logo"/>
                                </div>
                              </div>
                            </div>
                          </div>          
                            <div className="row mt-4">
                              <div className="form-group col-12 mt-2 mb-0">
                                <h5 className="text-center">Verify OTP </h5>
                                <label htmlFor="mobilenumber" className="font-heading text-center mb-3">We have sent a verification code on our registered 
                                  mobile number</label>
                                <div className="disabled-true inputs">
                                  <div className="input-group d-flex phone-group rounded-0">
                                    <div className="input-group-prepend">
                                      <span className="input-group-text p-0 bg-none" id="mobile-number-group">
                                        <select className="form-control custom-select border-0 rounded-0" name="countryCode" >
                                          <option data-countrycode="GB" value="91">+91</option>
                                          <option data-countrycode="US" value="1">+1</option>
                                          <optgroup label="Other countries">
                                            <option data-countrycode="DZ" value="213">+213</option>
                                            <option data-countrycode="AD" value="376">+376</option>
                                            <option data-countrycode="AO" value="244">+244</option>
                                            <option data-countrycode="AI" value="1264">+1264</option>
                                            <option data-countrycode="AG" value="1268">+1268</option>
                                            <option data-countrycode="AR" value="54">+54</option>
                                            <option data-countrycode="AM" value="374">+374</option>
                                            <option data-countrycode="AW" value="297">+297</option>
                                            <option data-countrycode="AU" value="61">+61</option>
                                            <option data-countrycode="AT" value="43">+43</option>
                                            <option data-countrycode="AZ" value="994">+994</option>
                                            <option data-countrycode="BS" value="1242">+1242</option>
                                            <option data-countrycode="BH" value="973">+973</option>
                                            <option data-countrycode="BD" value="880">+880</option>
                                            <option data-countrycode="BB" value="1246">+1246</option>
                                            <option data-countrycode="BY" value="375">+375</option>
                                            <option data-countrycode="BE" value="32">+32</option>
                                            <option data-countrycode="BZ" value="501">+501</option>
                                            <option data-countrycode="BJ" value="229">+229</option>
                                            <option data-countrycode="BM" value="1441">+1441</option>
                                            <option data-countrycode="BT" value="975">+975</option>
                                            <option data-countrycode="BO" value="591">+591</option>
                                            <option data-countrycode="BA" value="387">+387</option>
                                            <option data-countrycode="BW" value="267">+267</option>
                                            <option data-countrycode="BR" value="55">+55</option>
                                            <option data-countrycode="BN" value="673">+673</option>
                                            <option data-countrycode="BG" value="359">+359</option>
                                            <option data-countrycode="BF" value="226">+226</option>
                                            <option data-countrycode="BI" value="257">+257</option>
                                            <option data-countrycode="KH" value="855">+855</option>
                                            <option data-countrycode="CM" value="237">+237</option>
                                            <option data-countrycode="CA" value="1">+1</option>
                                            <option data-countrycode="CV" value="238">+238</option>
                                            <option data-countrycode="KY" value="1345">+1345</option>
                                            <option data-countrycode="CF" value="236">+236</option>
                                            <option data-countrycode="CL" value="56">+56</option>
                                            <option data-countrycode="CN" value="86">+86</option>
                                            <option data-countrycode="CO" value="57">+57</option>
                                            <option data-countrycode="KM" value="269">+269</option>
                                            <option data-countrycode="CG" value="242">+242</option>
                                            <option data-countrycode="CK" value="682">+682</option>
                                            <option data-countrycode="CR" value="506">+506</option>
                                            <option data-countrycode="HR" value="385">+385</option>
                                            <option data-countrycode="CU" value="53">+53</option>
                                            <option data-countrycode="CY" value="90392">+90392</option>
                                            <option data-countrycode="CY" value="357">+357</option>
                                            <option data-countrycode="CZ" value="42">+42</option>
                                            <option data-countrycode="DK" value="45">+45</option>
                                            <option data-countrycode="DJ" value="253">+253</option>
                                            <option data-countrycode="DM" value="1809">+1809</option>
                                            <option data-countrycode="DO" value="1809">+1809</option>
                                            <option data-countrycode="EC" value="593">+593</option>
                                            <option data-countrycode="EG" value="20">+20</option>
                                            <option data-countrycode="SV" value="503">+503</option>
                                            <option data-countrycode="GQ" value="240">+240</option>
                                            <option data-countrycode="ER" value="291">+291</option>
                                            <option data-countrycode="EE" value="372">+372</option>
                                            <option data-countrycode="ET" value="251">+251</option>
                                            <option data-countrycode="FK" value="500">+500</option>
                                            <option data-countrycode="FO" value="298">+298</option>
                                            <option data-countrycode="FJ" value="679">+679</option>
                                            <option data-countrycode="FI" value="358">+358</option>
                                            <option data-countrycode="FR" value="33">+33</option>
                                            <option data-countrycode="GF" value="594">+594</option>
                                            <option data-countrycode="PF" value="689">+689</option>
                                            <option data-countrycode="GA" value="241">+241</option>
                                            <option data-countrycode="GM" value="220">+220</option>
                                            <option data-countrycode="GE" value="7880">+7880</option>
                                            <option data-countrycode="DE" value="49">+49</option>
                                            <option data-countrycode="GH" value="233">+233</option>
                                            <option data-countrycode="GI" value="350">+350</option>
                                            <option data-countrycode="GR" value="30">+30</option>
                                            <option data-countrycode="GL" value="299">+299</option>
                                            <option data-countrycode="GD" value="1473">+1473</option>
                                            <option data-countrycode="GP" value="590">+590</option>
                                            <option data-countrycode="GU" value="671">+671</option>
                                            <option data-countrycode="GT" value="502">+502</option>
                                            <option data-countrycode="GN" value="224">+224</option>
                                            <option data-countrycode="GW" value="245">+245</option>
                                            <option data-countrycode="GY" value="592">+592</option>
                                            <option data-countrycode="HT" value="509">+509</option>
                                            <option data-countrycode="HN" value="504">+504</option>
                                            <option data-countrycode="HK" value="852">+852</option>
                                            <option data-countrycode="HU" value="36">+36</option>
                                            <option data-countrycode="IS" value="354">+354</option>
                                            <option data-countrycode="IN" value="91">+91</option>
                                            <option data-countrycode="ID" value="62">+62</option>
                                            <option data-countrycode="IR" value="98">+98</option>
                                            <option data-countrycode="IQ" value="964">+964</option>
                                            <option data-countrycode="IE" value="353">+353</option>
                                            <option data-countrycode="IL" value="972">+972</option>
                                            <option data-countrycode="IT" value="39">+39</option>
                                            <option data-countrycode="JM" value="1876">+1876</option>
                                            <option data-countrycode="JP" value="81">+81</option>
                                            <option data-countrycode="JO" value="962">+962</option>
                                            <option data-countrycode="KZ" value="7">+7</option>
                                            <option data-countrycode="KE" value="254">+254</option>
                                            <option data-countrycode="KI" value="686">+686</option>
                                            <option data-countrycode="KP" value="850">+850</option>
                                            <option data-countrycode="KR" value="82">+82</option>
                                            <option data-countrycode="KW" value="965">+965</option>
                                            <option data-countrycode="KG" value="996">+996</option>
                                            <option data-countrycode="LA" value="856">+856</option>
                                            <option data-countrycode="LV" value="371">+371</option>
                                            <option data-countrycode="LB" value="961">+961</option>
                                            <option data-countrycode="LS" value="266">+266</option>
                                            <option data-countrycode="LR" value="231">+231</option>
                                            <option data-countrycode="LY" value="218">+218</option>
                                            <option data-countrycode="LI" value="417">+417</option>
                                            <option data-countrycode="LT" value="370">+370</option>
                                            <option data-countrycode="LU" value="352">+352</option>
                                            <option data-countrycode="MO" value="853">+853</option>
                                            <option data-countrycode="MK" value="389">+389</option>
                                            <option data-countrycode="MG" value="261">+261</option>
                                            <option data-countrycode="MW" value="265">+265</option>
                                            <option data-countrycode="MY" value="60">+60</option>
                                            <option data-countrycode="MV" value="960">+960</option>
                                            <option data-countrycode="ML" value="223">+223</option>
                                            <option data-countrycode="MT" value="356">+356</option>
                                            <option data-countrycode="MH" value="692">+692</option>
                                            <option data-countrycode="MQ" value="596">+596</option>
                                            <option data-countrycode="MR" value="222">+222</option>
                                            <option data-countrycode="YT" value="269">+269</option>
                                            <option data-countrycode="MX" value="52">+52</option>
                                            <option data-countrycode="FM" value="691">+691</option>
                                            <option data-countrycode="MD" value="373">+373</option>
                                            <option data-countrycode="MC" value="377">+377</option>
                                            <option data-countrycode="MN" value="976">+976</option>
                                            <option data-countrycode="MS" value="1664">+1664</option>
                                            <option data-countrycode="MA" value="212">+212</option>
                                            <option data-countrycode="MZ" value="258">+258</option>
                                            <option data-countrycode="MN" value="95">+95</option>
                                            <option data-countrycode="NA" value="264">+264</option>
                                            <option data-countrycode="NR" value="674">+674</option>
                                            <option data-countrycode="NP" value="977">+977</option>
                                            <option data-countrycode="NL" value="31">+31</option>
                                            <option data-countrycode="NC" value="687">+687</option>
                                            <option data-countrycode="NZ" value="64">+64</option>
                                            <option data-countrycode="NI" value="505">+505</option>
                                            <option data-countrycode="NE" value="227">+227</option>
                                            <option data-countrycode="NG" value="234">+234</option>
                                            <option data-countrycode="NU" value="683">+683</option>
                                            <option data-countrycode="NF" value="672">+672</option>
                                            <option data-countrycode="NP" value="670">+670</option>
                                            <option data-countrycode="NO" value="47">+47</option>
                                            <option data-countrycode="OM" value="968">+968</option>
                                            <option data-countrycode="PW" value="680">+680</option>
                                            <option data-countrycode="PA" value="507">+507</option>
                                            <option data-countrycode="PG" value="675">+675</option>
                                            <option data-countrycode="PY" value="595">+595</option>
                                            <option data-countrycode="PE" value="51">+51</option>
                                            <option data-countrycode="PH" value="63">+63</option>
                                            <option data-countrycode="PL" value="48">+48</option>
                                            <option data-countrycode="PT" value="351">+351</option>
                                            <option data-countrycode="PR" value="1787">+1787</option>
                                            <option data-countrycode="QA" value="974">+974</option>
                                            <option data-countrycode="RE" value="262">+262</option>
                                            <option data-countrycode="RO" value="40">+40</option>
                                            <option data-countrycode="RU" value="7">+7</option>
                                            <option data-countrycode="RW" value="250">+250</option>
                                            <option data-countrycode="SM" value="378">+378</option>
                                            <option data-countrycode="ST" value="239">+239</option>
                                            <option data-countrycode="SA" value="966">+966</option>
                                            <option data-countrycode="SN" value="221">+221</option>
                                            <option data-countrycode="CS" value="381">+381</option>
                                            <option data-countrycode="SC" value="248">+248</option>
                                            <option data-countrycode="SL" value="232">+232</option>
                                            <option data-countrycode="SG" value="65">+65</option>
                                            <option data-countrycode="SK" value="421">+421</option>
                                            <option data-countrycode="SI" value="386">+386</option>
                                            <option data-countrycode="SB" value="677">+677</option>
                                            <option data-countrycode="SO" value="252">+252</option>
                                            <option data-countrycode="ZA" value="27">+27</option>
                                            <option data-countrycode="ES" value="34">+34</option>
                                            <option data-countrycode="LK" value="94">+94</option>
                                            <option data-countrycode="SH" value="290">+290</option>
                                            <option data-countrycode="KN" value="1869">+1869</option>
                                            <option data-countrycode="SC" value="1758">+1758</option>
                                            <option data-countrycode="SD" value="249">+249</option>
                                            <option data-countrycode="SR" value="597">+597</option>
                                            <option data-countrycode="SZ" value="268">+268</option>
                                            <option data-countrycode="SE" value="46">+46</option>
                                            <option data-countrycode="CH" value="41">+41</option>
                                            <option data-countrycode="SI" value="963">+963</option>
                                            <option data-countrycode="TW" value="886">+886</option>
                                            <option data-countrycode="TJ" value="7">+7</option>
                                            <option data-countrycode="TH" value="66">+66</option>
                                            <option data-countrycode="TG" value="228">+228</option>
                                            <option data-countrycode="TO" value="676">+676</option>
                                            <option data-countrycode="TT" value="1868">+1868</option>
                                            <option data-countrycode="TN" value="216">+216</option>
                                            <option data-countrycode="TR" value="90">+90</option>
                                            <option data-countrycode="TM" value="7">+7</option>
                                            <option data-countrycode="TM" value="993">+993</option>
                                            <option data-countrycode="TC" value="1649">+1649</option>
                                            <option data-countrycode="TV" value="688">+688</option>
                                            <option data-countrycode="UG" value="256">+256</option>
                                            <option data-countrycode="UA" value="380">+380</option>
                                            <option data-countrycode="AE" value="971">+971</option>
                                            <option data-countrycode="UY" value="598">+598</option>
                                            <option data-countrycode="UZ" value="7">+7</option>
                                            <option data-countrycode="VU" value="678">+678</option>
                                            <option data-countrycode="VA" value="379">+379</option>
                                            <option data-countrycode="VE" value="58">+58</option>
                                            <option data-countrycode="VN" value="84">+84</option>
                                            <option data-countrycode="VG" value="84">+1284</option>
                                            <option data-countrycode="VI" value="84">+1340</option>
                                            <option data-countrycode="WF" value="681">+681</option>
                                            <option data-countrycode="YE" value="969">+969</option>
                                            <option data-countrycode="YE" value="967">+967</option>
                                            <option data-countrycode="ZM" value="260">+260</option>
                                            <option data-countrycode="ZW" value="263">+263</option>
                                          </optgroup>
                                        </select>
                                      </span>
                                    </div>
                                    {/* <input type="text" id="mobilenumber" className="form-control" placeholder="Mobile Number" aria-describedby="mobile-number-group"/> */}
                                    <Field
                                    name="phone"
                                    type="number"
                                    placeholder="Mobile Number" 
                                    className={'form-control' + (errors.phone && touched.phone ? ' is-invalid' : '')} 
                                    maxLength="10"
                                    onInput={maxLengthCheck}
                                    required={true}
                                    onKeyDown={(e) =>
                                      /[+\-.,]$/.test(e.key) && e.preventDefault()}
                                    />
                                  <ErrorMessage name="phone" component="div" className="invalid-feedback" />
                            
                                  </div>
                                  <div className="text-right d-flex justify-content-end">
                                    <button type="button" className="btn px-2 edit-details">Edit Number</button>
                                    <button type="button" className="btn px-2 cancel text-danger">Cancel</button>
                                    {values.phone && values.phone.toString() && values.phone.toString().length === 10 ?
                                    <button onClick={()=>saveButton(values.phone.toString())} type="button" className="btn px-2 save-details text-green">Save</button>
                                    :
                                    <span className="btn px-2 text-green">Save</span>
                                    }
                                  
                                  </div>
                                  <span className="text-success">{state.otpVerified?.updateMobileMessage?.message}</span>
                                </div>
                              </div>    
                            </div> 
                          <form method="get" className="digit-group" data-group-name="digits" data-autosubmit="false" autoComplete="off">
                            <div className="form-group col-12 p-0 m-0">
                              
                              <div className="d-flex justify-content-between mb-1">
                                  <Field
                                  name="otp1"
                                  type="number"
                                  id="digit-5"
                                  data-next="digit-6"
                                  className={`form-control ${errors.otp1 !== undefined ? "border-danger" :"" }`} 
                                  maxLength="1"
                                  onInput={maxLengthCheck}
                                  required={true}
                                  onKeyDown={(e) =>
                                    /[+\-.,]$/.test(e.key) && e.preventDefault()}
                                  />
                                  {/* <ErrorMessage name="otp1" component="div" className="invalid-feedback" /> */}
                                  
                                  <Field   
                                  name="otp2"
                                  type="number"
                                  id="digit-6"
                                  data-next="digit-7"
                                  className={`form-control ${errors.otp2 !== undefined ? "border-danger" :"" }`}
                                  maxLength="1"
                                  onInput={maxLengthCheck}
                                  required={true}
                                  onKeyDown={(e) =>
                                    /[+\-.,]$/.test(e.key) && e.preventDefault()}
                                  />
                                  {/* <ErrorMessage name="otp2" component="div" className="invalid-feedback" /> */}
                                  
                                  <Field
                                  name="otp3"
                                  type="number" 
                                  id="digit-7" 
                                  data-next="digit-8" 
                                  className={`form-control ${errors.otp3 !== undefined ? "border-danger" :"" }`} 
                                  maxLength="1"
                                  onInput={maxLengthCheck}
                                  required={true}
                                  onKeyDown={(e) =>
                                    /[+\-.,]$/.test(e.key) && e.preventDefault()}
                                  />
                                  {/* <ErrorMessage name="otp3" component="div" className="invalid-feedback" /> */}
                                  
                                  <Field 
                                  name="otp4" 
                                  type="number" 
                                  id="digit-8" 
                                  data-next="digit-9" 
                                  className={`form-control ${errors.otp4 !== undefined ? "border-danger" :"" }`} 
                                  maxLength="1"
                                  onInput={maxLengthCheck}
                                  required={true}
                                  onKeyDown={(e) =>
                                    /[+\-.,]$/.test(e.key) && e.preventDefault()}
                                  />
                                  {/* <ErrorMessage name="otp4" component="div" className="invalid-feedback" />                            */}
                                {/* <input className="form-control" type="text" id="digit-1" name="" data-next="digit-2" />
                                <input className="form-control" type="text" id="digit-2" name="" data-next="digit-3" data-previous="digit-1" />
                                <input className="form-control" type="text" id="digit-3" name="" data-next="digit-4" data-previous="digit-2" />
                                <input className="form-control" type="text" id="digit-4" name="" data-next="digit-5" data-previous="digit-3" /> */}
                              </div>
                            </div>
                            <div className="row justify-content-between">
                              <div className="col-auto mb-2">
                                <button onClick={resend} type="button" className="btn px-2" id="starttimeragain" data-dismiss="modal">Resend</button>
                              </div>
                              <div className="col-auto mb-2">
                                <div id="timer" className="btn px-2" data-timer="02:00"></div>
                              </div>
                            </div>
                            <span className="text-success">{state.otpVerified?.otpResendMessage?.message}</span>
                            <p className="errorMessage">{state.otpVerified.error}</p>
                            <button type="submit" className="btn btn-deep-primary btn-block rounded-0">Continue</button>
                          </form>
                        </div> 
                      </div>
                    
              </div>
                </Form>
                  )} />

        </>
    )
}

export default OtpVerify
