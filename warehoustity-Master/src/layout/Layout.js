import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
// import VendorHeader from '../components/header/VendorHeader';
// import { useSelector } from 'react-redux';

const Layout = (props) => {
    // const {
    //     vendorAuthenticated
    //   } = useSelector((state) => state);
    return (
        <> <Header />
            <main className="page-wrapper">
            {props.children}
            </main>
        <Footer />
        </>
    )
}

export default Layout;
