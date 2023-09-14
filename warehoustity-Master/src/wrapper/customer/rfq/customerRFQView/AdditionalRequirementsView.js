import React from 'react';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {updateRequirementRFQ, responseRfq} from '../../../store/actions/customer/rfqAction'
import {useSelector, useDispatch} from 'react-redux';
import FormSuccess from '../../../components/helper/FormSuccess';
import Spinner from 'react-bootstrap/Spinner';

const AdditionalRequirementsForm = ({isView}) => {
  const dispatch = useDispatch();
    const data = useSelector((state)=>state.CUSTOMER_RFQ_INFO);
    // console.log("InBound RFQ===>", data)


  const inboundSchema = Yup.object().shape({
        additionalRequirements : Yup.string().required('Required')
      }
  );

  return (
    <>
{
    data.rfqResponse.statusCode === 201 ?
        <FormSuccess onClick={()=>dispatch(responseRfq([]))} message={data.rfqResponse.message} />
    : null
}

    <Formik
    enableReinitialize={true}
    validationSchema={inboundSchema}
      initialValues={{
        additionalRequirements:''
      }}
      onSubmit={fields => {
        console.log("---->", fields)
        if(data.rfqDetail.id){
        fields["customerRfq"]= data.rfqDetail.id
      console.log("---->", fields)

      dispatch(updateRequirementRFQ(fields, data?.rfqFirstForm?.warehouses)) 
        }
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
        <div className={`col-12 mt-5 ${isView ? "d-none" : ""}`}>
        <div className="row justify-content-end">
         
            <div className="col-auto">
            <button disabled={data.isLoading} type="submit" className="btn btn-deep-primary mb-3 add-class remove-class">Submit
                {data.isLoading ? <Spinner animation="border"  /> :null}
            </button>
            </div>
        </div>
    </div>
    </div>
    </Form>    
    </div>    
      )
      }}
  />
    </>
  );
}

export default AdditionalRequirementsForm;
