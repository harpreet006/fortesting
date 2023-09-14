import React, { useEffect } from 'react'
import Layout from '../../layout/Layout';
import { useLocation, useHistory } from 'react-router-dom';
import CustomerLayout from '../../layout/CustomerLayout';
import { getKeyContactUser } from '../../store/actions/subUserAction';
import { useDispatch, useSelector } from 'react-redux';

const KeyContact = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch()
  const history = useHistory();
  const data = useSelector((state) => state.WHS_USER_INFO)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    dispatch(getKeyContactUser())
  }, [dispatch])

  return (
    <Layout>

      <CustomerLayout title="Key Contacts">

        <div className="row">
          <div className="content col-12 view-invoice">
            <div className="border-bottom mb-2 d-sm-flex justify-content-between">
              <div>
                <p
                  className="btn px-0 text-gray font-weight-bold mr-3 my-0 py-0">
                  <i
                    onClick={() => history.goBack()}
                    className="fas fa-chevron-left pr-3"
                  ></i>
                  Contact Details
                </p>
              </div>
            </div>

            <div className="row p-3">
              <h5 className="mb-4">Warehousity contact details</h5>

              {data.keyContactUser?.data && data.keyContactUser?.data.length > 0 ?
                data.keyContactUser?.data.map((item, index) => {
                  console.log("item--->", item)
                  return (
                    <div key={index} className="col-12 mb-5">
                      <h5 className="mb-4">{item?.department?.name} team contact details</h5>
                      <p className="text-gray"><i className="fas fa-phone-alt"></i> {item?.phone}</p>
                      <p className="text-gray"><i className="fas fa-envelope"></i> {item?.email}</p>
                    </div>
                  )
                })

                : null}

            </div>
          </div>
        </div>


      </CustomerLayout>

    </Layout>
  )
}

export default KeyContact;