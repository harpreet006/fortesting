import React,{useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {CardLoader} from '../../../../components/helper/CustomLoader';

const KPIForm = ({isView}) => {

  const data = useSelector((state)=>state.CUSTOMER_RFQ_INFO);
  const [kpiUrl, setKpiUrl] = useState(null);

  useEffect(() => {

    if(data.rfqDetail && data.rfqDetail && data.rfqDetail.kpi){
      setKpiUrl(
        data.rfqDetail.kpi.kpi
      )
    }
  
  }, [data.rfqDetail]);


  return (
    <>
    {
      data.isLoading ?  <CardLoader loaderCard="loaderCard" /> :
  
   
    <div className="row pt-2"> 
      <div className="row col-12 ml-0">
        <div className="col-12 mb-md-4 mb-1 pt-md-1 px-0">
          <div className="custom-file form-group form-inline">
            {/* <input type="file" id="custom-file-upload-input1" className="custom-file-input" hidden readOnly={isView} /> */}
            <span id="custom-file-name" className="d-block custom-file-name px-0 mr-3 mb-2">KPI requirements.</span>
            <div>
            <a href={kpiUrl} download target="_blank" rel="noopener noreferrer" className="custom-file-upload-label btn-deep-primary btn text-nowrap w-250px" htmlFor="custom-file-upload-input1">
                Download
              </a> 
            </div>
          </div>
        </div>
      </div>
      <div className={`col-12 mt-5 ${isView ? "d-none" : ""}`}>
        <div className="row justify-content-end">
         
          <div className="col-auto">
            <button type="button" className="btn btn-deep-primary mb-3 add-className remove-className">Submit</button>
          </div>
        </div>
      </div>
    </div>
  }
    </>
  );
}

export default KPIForm;
