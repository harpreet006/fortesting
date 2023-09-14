import React, {useState, useEffect} from 'react';
import { Formik, Form, Field } from 'formik';
import { useSelector } from 'react-redux';
import {readableDate} from '../../../../components/validation';
import {CardLoader} from '../../../../components/helper/CustomLoader';

const GeneralForm = ({isView}) => {

  const data = useSelector((state)=>state.CUSTOMER_RFQ_INFO);

  const [generalForm, setGeneralForm] = useState(
    {
      "industrySector": {
          "name": ""
      },
      "productType": {
          "name": ""
      },
      "warehouseCategory": {
          "category": {
            "name":""  
          },
          "bounded": {
              "name":""
          },
          "other": ""  
      },
      "dangerousGoods": "",
      "warehouseLocation": {
          "cityAndArea": {
              "name": ""
          },
          "other": ""
      },
      "workingHour": {
          "startTime": "",
          "endTime": "",
          "week": "",
          "other": ""
      },
      "contractPeriod": {
          "contract": {
              "name": ""
          },
          "others": ""  
      },
      "plannedGoLiveDate": "",
  }
  )


useEffect(() => {
  if(data.rfqDetail && data.rfqDetail.general){
    setGeneralForm({...data.rfqDetail.general, plannedGoLiveDate:readableDate(data.rfqDetail.general.plannedGoLiveDate)})
  }
}, [data.rfqDetail])

  return (
    <>
    {
      data.isLoading ?  <CardLoader loaderCard="loaderCard" /> :
    <Formik
    enableReinitialize={true}
   initialValues={generalForm}
  //  validationSchema={contactSchema}
   onSubmit={fields => {
     console.log("---->", fields)
   }}
   render={({ values, errors, status,onChange, touched }) => (

     <Form> 
    <div className="row pt-2"> 
       
      <div className="form-group col-sm-6 mb-4">
        <label htmlFor="staticEmail" className="mb-2">Select Industry <span className="text-danger h6">*</span></label>
        <Field name={`industrySector.name`} as="select"  className="form-control form-control-md" disabled={isView}>
          <option>Select</option>
          <option value="retail">Retail</option>                              
          <option>Automotive</option>                              
          <option>Hi-tech</option> 
          <option>Chemicals</option>                              
          <option>Audio, Vidoe, Telecom</option>                              
          <option>Engineering</option>                              
          <option>E-Commerce</option>                              
          <option>Pharma</option>                              
          <option>Healthcare</option>                              
          <option>Public Sector</option>                              
          <option>others, pls specify</option>                              
        </Field>
      </div>
      <div className="form-group col-sm-6 mb-4">
        <label htmlFor="staticEmail" className="mb-2">Select Product <span className="text-danger h6">*</span></label>
        <Field name={`productType.name`} as="select"  className="form-control form-control-md" disabled={isView}>
         
        <option>Select</option>
          <option value="finish goods">finish goods</option>                              
          <option>raw materials</option>                              
          <option>spare part</option> 
             
        </Field>
      </div> 
      <div className="form-group col-lg-4 col-sm-4 mb-sm-4">
        <label htmlFor="staticEmail" className="mb-2">Select Warehouse <span className="text-danger h6">*</span></label>
        <Field name="warehouseCategory.category.name" as="select"  className="form-control form-control-md" disabled={isView}>
        <option>Select</option>
        <option value="General">General</option>                              
          <option value="Custom Bonded">Custom Bonded</option>                              
          <option value="Temperature Controlled">Temperature Controlled</option>
        </Field>
      </div> 
      <div className="form-group col-lg-4 col-sm-4 mb-sm-4 pt-sm-4">
        <Field name="warehouseCategory.bounded.name" as="select"  className="form-control form-control-md mt-sm-1" disabled={isView} >
          <option>Select</option>
          <option value="inFTWZ">in FTWZ</option>                              
          <option value="in BLP">in BLP</option> 
          <option value="Other">Other</option>                             
        </Field>
      </div> 
      {/* <div className="form-group col-lg-4 col-sm-4 mb-4 pt-sm-4">
        <Field name={`warehouseLocation.other`} type="text" className="form-control form-control-md mt-sm-1" placeholder="Other area, please specify"/>
      </div> */}
      <div className="col-12 mb-md-4 mb-5 pt-md-1">
        <div className="custom-file form-group form-inline d-flex">
          <input type="file" id="custom-file-upload-input20" className="custom-file-input" hidden disabled={isView} />
          <span id="custom-file-name" className="d-block custom-file-name px-0 mr-3 mb-2">Dangerous Goods? If so, pls specify</span>
          <div>
            <label className="custom-file-upload-label btn-deep-primary btn text-nowrap" htmlFor="custom-file-upload-input">
              Attach MSDS
            </label> 
          </div>
        </div>
      </div>
      {/* <div className="form-group col-lg-4 col-sm-4 mb-sm-4">
        <label htmlFor="staticEmail" className="mb-2">Select Warehouse Location</label>
        <Field name="" as="select" className="form-control form-control-md">
          <option>Select</option>
          <option>finish goods</option>                              
          <option>raw materials</option>                              
          <option>spare part</option> 
        </Field>
      </div>  */}
      <div className="form-group col-lg-4 col-sm-4 mb-sm-4 pt-sm-4">
        <Field name="warehouseLocation.cityAndArea.name" as="select"  className="form-control form-control-md mt-sm-1" disabled={isView}>
          <option>City/Area</option>
          <option value="mumbai">Mumbai</option>                              
          <option value="delhi">Delhi</option>                              
        </Field>
      </div>  
      <div className="form-group col-lg-4 col-sm-4 mb-4 pt-sm-4">
        <Field name="warehouseLocation.other" type="text" className="form-control form-control-md mt-sm-1" placeholder="Other area, please specify" disabled={isView} />
      </div> 
      <div className="form-group col-lg-4 col-sm-4 mb-4 pt-sm-4">
      </div> 
      <div className="form-group col-md-auto mb-sm-4">
        <label htmlFor="staticEmail" className="mb-2">Required working hour :</label>
        <div className="row">
          <div className="col-sm-auto">
            <Field name="workingHour.startTime" as="select" className="form-control form-control-md" disabled={isView}>
              <option value="1">1</option>
              <option>2</option>                              
              <option>3</option>  
              <option>4</option>                              
              <option>5</option>
              <option>6</option>                              
              <option>7</option>
              <option>8</option>                              
              <option>9</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
              <option>13</option>
              <option>14</option>
              <option>15</option>
              <option>16</option>
              <option>17</option>
              <option>18</option>
              <option>19</option>
            </Field>
          </div>
          <div className="col-sm-auto py-2 px-1 text-center">
            To
          </div>
          <div className="col-sm-auto">
            <Field name="workingHour.endTime" as="select" className="form-control form-control-md" disabled={isView}>
              <option value="1">1</option>
              <option>2</option>                              
              <option>3</option> 
              <option>4</option>                              
              <option>5</option>
              <option>6</option>                              
              <option>7</option>
              <option>8</option>                              
              <option>9</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
              <option>13</option>
              <option>14</option>
              <option>15</option>
              <option>16</option>
              <option>17</option>
              <option>18</option>
              <option>19</option>
            </Field>
          </div>
        </div>
      </div> 
      <div className="form-group col-md-auto mb-sm-4 pt-md-4">
        <div className="row">
          <div className="col-sm-auto">
            <Field name="" as="select"  className="form-control form-control-md mt-md-1" readOnly>
            <option value="MONDAY">Monday</option>
              <option value="TUESDAY">Tuesday</option>
              <option value="WEDNESDAY">Wednesday</option>
              <option value="THURSDAY">Thursday</option>
              <option value="FRIDAY">Friday</option>
              <option value="SATURDAY">Saturday</option>
              <option value="SUNDAY">Sunday</option>  
            </Field>
          </div>
          <div className="col-sm-auto py-2 mt-1 px-1 text-center">
            To
          </div>
          <div className="col-sm-auto">
            <Field name="workingHour.week" as="select" className="form-control form-control-md mt-md-1" disabled={isView}>
            <option value="MONDAY">Monday</option>
              <option value="TUESDAY">Tuesday</option>
              <option value="WEDNESDAY">Wednesday</option>
              <option value="THURSDAY">Thursday</option>
              <option value="FRIDAY">Friday</option>
              <option value="SATURDAY">Saturday</option>
              <option value="SUNDAY">Sunday</option>                                  
            </Field>
          </div>
        </div>
      </div>  
      <div className="form-group col-xl mb-4 pt-xl-4">
        {/* <Field name="" type="text" className="form-control form-control-md mt-xl-1" placeholder="Other area, please specify"/> */}
      </div>
      <div className="form-group col-lg-4 col-sm-4 mb-sm-4">
        <label htmlFor="staticEmail" className="mb-2">contract period?<span className="text-danger h6">*</span></label>
        <Field name="contractPeriod.contract.name" as="select" className="form-control form-control-md" disabled={isView}>
          <option>Select</option>
          <option value="1year">1 year</option>                              
          <option value="2year">2 years</option>                              
          <option value="3year" >3 years</option> 
        </Field>
      </div>  
      {/* <div className="form-group col-lg-4 col-sm-4 mb-4 pt-sm-4">
        <Field name="contractPeriod.others" type="text" className="form-control form-control-md mt-sm-1" placeholder="Other area, please specify" disabled={isView} />
      </div> */}
      <div className="form-group col-lg-5 col-md-6 mb-4">
        <label htmlFor="staticEmail" className="mb-2">planned go-live date?</label>
        <Field name="plannedGoLiveDate" type="date" className="form-control form-control-md" disabled={isView} />
      </div> 
      <div className={`col-12 mt-3 ${isView ? "d-none" : "" }`}>
        <div className="row justify-content-end">
          {/* <div className="col-auto">
            <button type="button" className="btn btn-outline-deep-primary mb-3 add-className remove-className" data-add-target=".steps3" data-add-target-className="d-none" data-remove-target=".steps2" data-remove-target-className="d-none">Back</button>
          </div> */}
          <div className="col-auto">
            <button type="submit" className="btn btn-deep-primary mb-3 add-className remove-className">Submit</button>
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

export default GeneralForm;
