import React, { useEffect } from 'react';
import CommonSideMenu from '../components/vendor/vendormenu/CommonSideMenu';
import DynamicMenu from '../components/vendor/vendormenu/DynamicMenu';
import { sidemenuList } from '../store/actions/sidemenuAction';
import { useDispatch, useSelector } from 'react-redux';
import VendorHeader from '../components/header/VendorHeader';

const VendorLayout = (props) => {
    const sidemenuData = useSelector((state) => state.SIDEMENU_INFO);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(sidemenuList(1))
    }, [dispatch])

    return (
        <main className="page-wrapper">
    <VendorHeader />

            <div className="row" style={{marginTop:"85px"}}>
                <div className="cal-auto d-none  d-lg-block">
                    {/* <div className="col-auto  d-none d-lg-block"> */}
                    {sidemenuData.sidemenu && sidemenuData.sidemenu.length > 0 ?

                        <CommonSideMenu navData={sidemenuData.sidemenu} />
                        :
                        <DynamicMenu />
                    }

                </div>


                {props.children}


            </div>
        </main>
    )
}

export default VendorLayout
