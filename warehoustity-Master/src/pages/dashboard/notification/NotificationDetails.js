import React, { useEffect } from 'react'
import Layout from '../../../layout/Layout';
import { useHistory, useParams } from 'react-router-dom';
import CustomerLayout from '../../../layout/CustomerLayout';
import { notificationById } from '../../../store/actions/notificationAction'
import { useSelector, useDispatch } from 'react-redux';
import { readableDate, readableTime } from '../../../components/validation'
import { CardLoader } from '../../../components/helper/CustomLoader';

const NotificationDetails = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.NOTIFICATIONINFO);
  const { notificationId } = useParams()
  const history = useHistory();

  useEffect(() => {
    dispatch(notificationById(notificationId))
  }, [dispatch, notificationId]);
  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });

  return (
    <Layout>
      <CustomerLayout title="Notification">
        <div className="row">
          <div className="content col-12 view-notification">
            <div className="border-bottom mb-2 d-sm-flex justify-content-between">
              <div>
                <button className="btn name-breadcrumb px-0 text-dark font-heading mr-3"><i onClick={() => history.goBack()} className="fas fa-chevron-left pr-3"></i> View Notification</button>
              </div>
            </div>
            {data.isLoading ?
              <CardLoader />
              :
              <div className="row">
                <div className="col-12">
                  <div className="bg-white p-3 shadow-sm" style={{borderRadius:"10px"}}>
                    <div className="px-2 col-12">
                      <div className="row justify-content-between">
                        <div className="col-md-8">
                          <h4 className="font-heading">{data.notificationDetail.title}</h4>
                          <p className='font-heading font-paragraph mb-0 text-dark'>{data.notificationDetail.content}</p>
                        </div>
                        <div className="col-auto">
                          <div className=" align-items-end">

                            <h6 className='fs-20 font-heading mb-2 text-end'>{readableDate(data.notificationDetail.created_at)}</h6>
                            {/* <h4>22 OCT 2020 </h4> */}
                            <h6 className="text-dark px-3 text-end">
                            <i class="fa fa-clock-o text-dark" aria-hidden="true"></i>
                              {readableTime(data.notificationDetail.created_at)}</h6>
                          </div>
                        </div>
                      </div>
                   
                    </div>
                  </div>
                </div>
              </div>
            }
            <div className="row">
              <div className="col-12 toggle-class">
                <button onClick={() => history.goBack()} className="btn btn-deep-primary my-3 py-1 px-5">Back</button>
              </div>
            </div>
          </div>
        </div>
      </CustomerLayout>
    </Layout>
  )
}

export default NotificationDetails
