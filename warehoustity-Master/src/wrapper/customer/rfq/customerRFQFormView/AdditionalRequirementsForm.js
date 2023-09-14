import React from 'react';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import {CardLoader} from '../../../../components/helper/CustomLoader';

const AdditionalRequirementsForm = ({isView}) => {
  const data = useSelector((state)=>state.CUSTOMER_RFQ_INFO);

  const inboundSchema = Yup.object().shape({
        additionalRequirements : Yup.string().required('Required')
      }
  );

  return (
    <>
    {
      data.isLoading ?  <CardLoader loaderCard="loaderCard" /> :
    <Formik
    enableReinitialize={true}
    validationSchema={inboundSchema}
      initialValues={{
        additionalRequirements:data.rfqDetail && data.rfqDetail.additionalRequirement ? data.rfqDetail.additionalRequirement.additionalRequirement : ""
      }}
      onSubmit={fields => {
        console.log("---->", fields)
      }}
      
      render={({ values,  errors, status,onChange, touched }) =>{
        return(
            <div className="w-100 d-block">
          <Form >
    <div className="row pt-2 col-12"> 
      <div className="row col-12 ml-0">
            <div className="input-group">
            <Field type="textarea" name="additionalRequirements" id="" className={`w-100 form-control form-control-lg`+ (errors.additionalRequirements && touched.additionalRequirements ? ' is-invalid' : '')} rows="5" readOnly={isView} ></Field>
            <ErrorMessage name="additionalRequirements" component="div" className="invalid-feedback" />
            </div>
        </div>
       
    </div>
    </Form>    
    </div>    
      )
      }}
  />
    }
    </>
  );
}

export default AdditionalRequirementsForm;
