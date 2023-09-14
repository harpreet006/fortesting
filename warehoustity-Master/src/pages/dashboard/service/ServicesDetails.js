import React, { useEffect } from 'react'
import Layout from '../../../layout/Layout';
import { useHistory, useParams } from 'react-router-dom';
import CustomerLayout from '../../../layout/CustomerLayout';
import BreadcrumbLayout from '../../../layout/BreadcrumbLayout';
import { serviceById } from '../../../store/actions/serviceAction'
import { useSelector, useDispatch } from 'react-redux';
import { readableDate } from '../../../components/validation'
import { CardLoader } from '../../../components/helper/CustomLoader';

const ServicesDetails = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.SERVICEINFO);
    const { serviceId } = useParams()
    const history = useHistory();

    useEffect(() => {
        dispatch(serviceById(serviceId))
    }, [dispatch, serviceId]);


    return (
        <Layout>
            <BreadcrumbLayout title={`My Services`} />

            <CustomerLayout>

                <div className="row">
                    <div className="content col-12 service-details">
                        <div className="border-bottom d-sm-flex justify-content-between">
                            <div>
                                <p className="btn name-breadcrumb px-0 text-dark font-heading mr-3 mb-3 toggle-class my-0 py-0"><i onClick={() => history.goBack()} className="fas fa-chevron-left pr-3"></i> Service details</p>
                            </div>
                        </div>

                        {data.isLoading ?
                            <CardLoader />
                            :

                            <div className="row p-3">
                                <div className="col-12">
                                    <form onSubmit={(e) => e.preventDefault()}>
                                        <div className="row">
                                            <div className="form-group col-lg-4 col-md-6 mb-4">
                                                <label for="staticEmail" className="mb-2">Service ID</label>
                                                <input type="text" className="form-control form-control-lg" id="staticEmail" value={data.serviceDetail.id} />
                                            </div>
                                            <div className="form-group col-lg-4 col-md-6 mb-4">
                                                <label for="staticEmail" className="mb-2">Service Date</label>
                                                <input type="date" className="form-control form-control-lg" id="staticEmail" value={readableDate(data.serviceDetail.created_at)} />
                                            </div>
                                            <div className="form-group col-lg-4 col-md-6 mb-4">
                                                <label for="staticEmail" className="mb-2">Service Header Name:</label>
                                                <input type="text" className="form-control form-control-lg" id="staticEmail" value={data.serviceDetail.serviceHeaderName} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-lg-3 col-sm-6 mb-4">
                                                <label for="staticEmail" className="mb-2">Service Sub Header</label>
                                                <input type="text" className="form-control form-control-lg" id="staticEmail" value={data.serviceDetail.serviceSubHeader} />
                                            </div>
                                            <div className="form-group col-lg-3 col-sm-6 mb-4">
                                                <label for="staticEmail" className="mb-2">Services Opted</label>
                                                <input type="text" className="form-control form-control-lg" id="staticEmail" value={data.serviceDetail.servicesOpted} />
                                            </div>
                                            <div className="form-group col-lg-3 col-sm-6 mb-4">
                                                <label for="staticEmail" className="mb-2">IO system</label>
                                                <input type="text" className="form-control form-control-lg" id="staticEmail" value={data.serviceDetail.IOsystem} />
                                            </div>
                                            <div className="form-group col-lg-3 col-sm-6 mb-4">
                                                <label for="staticEmail" className="mb-2">keyboard</label>
                                                <input type="text" className="form-control form-control-lg" id="staticEmail" value={data.serviceDetail.keyboard} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-lg-4 col-md-6 mb-4">
                                                <label for="staticEmail" className="mb-2">Cost</label>
                                                <input type="text" className="form-control form-control-lg" id="staticEmail" value={data.serviceDetail.cost + "k"} />
                                            </div>
                                            <div className="form-group col-lg-4 col-md-6 mb-4">
                                                <label for="staticEmail" className="mb-2">Service expiry date</label>
                                                <input type="date" className="form-control form-control-lg" id="staticEmail" value={readableDate(data.serviceDetail.ServiceExpiryDate)} />
                                            </div>
                                        </div>
                                        <div className="row pt-4">
                                            <div className="col-auto">
                                                <button onClick={() => history.goBack()} type="button" className="btn btn-deep-primary toggle-class my-4">Back</button>
                                            </div>
                                            <div className="col-auto">
                                                <button type="submit" className="btn btn-deep-primary toggle-class my-4">Cancel Service</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </CustomerLayout>
        </Layout>
    )
}

export default ServicesDetails
