import React ,{useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom'
import VendorLayout from '../../layout/VendorLayout';
import {serviceById} from '../../store/actions/serviceAction'
import {useSelector, useDispatch} from 'react-redux';
import {readableDate} from '../../components/validation'
import { CardLoader } from '../../components/helper/CustomLoader';

const ServiceDetail = () => {
  const dispatch = useDispatch();
  const data = useSelector((state)=>state.SERVICEINFO);
  const {serviceId} = useParams()
  const  history = useHistory();

useEffect(() => {
  dispatch(serviceById(serviceId))
}, [dispatch, serviceId]);

    return(
        <VendorLayout>

          <div className="content-admin px-5">
            <div className="row justify-content-end align-items-center py-3 px-3 mx-0"> 
              <div className="col-12 px-0 mt-3">
              <h6 className="backButton mb-3"><i onClick={()=>history.goBack()} className="fas fa-chevron-left mr-3 cursorPointer"></i>Service Details</h6>
                {/* <h5 className="text-dark-blue">Service Details</h5> */}
              </div>
              {data.isLoading ? 
                  <CardLoader />
                :
              <div className="col-12 px-0 py-4">
                <form action="">
                  <div className="row">
                    <div className="form-group col-lg-4 col-md-6 mb-4">
                      <label for="staticEmail" className="mb-2">Service ID</label>
                      <input type="text" className="form-control form-control-lg rounded-pill" id="staticEmail" value={data.serviceDetail.id}/>
                    </div>
                    <div className="form-group col-lg-4 col-md-6 mb-4">
                      <label for="staticEmail" className="mb-2">Service Date</label>
                      <input type="date" className="form-control form-control-lg rounded-pill" id="staticEmail" value={readableDate(data.serviceDetail.created_at)} />
                    </div>
                    <div className="form-group col-lg-4 col-md-6 mb-4">
                      <label for="staticEmail" className="mb-2">Service Header Name:</label>
                      <input type="text" className="form-control form-control-lg rounded-pill" id="staticEmail" value={data.serviceDetail.serviceHeaderName} />
                    </div> 
                  </div>
                  <div className="row">
                    <div className="form-group col-lg-3 col-sm-6 mb-4">
                      <label for="staticEmail" className="mb-2">Service Sub Header</label>
                      <input type="text" className="form-control form-control-lg rounded-pill" id="staticEmail" value={data.serviceDetail.serviceSubHeader}/>
                    </div>
                    <div className="form-group col-lg-3 col-sm-6 mb-4">
                      <label for="staticEmail" className="mb-2">Services Opted</label>
                      <input type="text" className="form-control form-control-lg rounded-pill" id="staticEmail" value={data.serviceDetail.servicesOpted} />
                    </div>
                    <div className="form-group col-lg-3 col-sm-6 mb-4">
                      <label for="staticEmail" className="mb-2"></label>
                      <input type="text" className="form-control form-control-lg rounded-pill" id="staticEmail" value={data.serviceDetail.IOsystem} />
                    </div>
                    <div className="form-group col-lg-3 col-sm-6 mb-4">
                      <label for="staticEmail" className="mb-2"></label>
                      <input type="text" className="form-control form-control-lg rounded-pill" id="staticEmail" value={data.serviceDetail.keyboard} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-lg-4 col-md-6 mb-4">
                      <label for="staticEmail" className="mb-2">Cost</label>
                      <input type="text" className="form-control form-control-lg rounded-pill" id="staticEmail" value={data.serviceDetail.cost + "k"} />
                    </div>
                    <div className="form-group col-lg-4 col-md-6 mb-4">
                      <label for="staticEmail" className="mb-2">Service expiry date</label>
                      <input type="date" className="form-control form-control-lg rounded-pill" id="staticEmail" value={readableDate(data.serviceDetail.ServiceExpiryDate)} />
                    </div>
                  </div>
                  <div className="row pt-4">
                    <div className="col-auto">
                      <button type="button" onClick={()=>history.goBack()} className="btn btn-outline-deep-blue toggle-className my-4">Back</button>
                    </div>
                    <div className="col-auto">
                      <button type="submit" className="btn btn-deep-blue toggle-className my-4" data-target=".service-details" data-toggle-classname="d-none">Cancel Service</button>
                    </div>
                  </div>
                </form>
              </div>
              }
            </div>
          </div>
   
      </VendorLayout>
  
    )
}

export default ServiceDetail;