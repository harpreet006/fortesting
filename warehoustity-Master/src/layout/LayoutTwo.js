import React from 'react';
import Header from '../components/header/HeaderOne';

// import ImportantDetails from '../components/others/ImportantDetails';
import Footer from '../components/footer/Footer';


const Layout = (props) => {
    return (
        <>
            <Header />
            <main class="page-wrapper home-page">
       
            {props.children}
            
            {/* <ImportantDetails/> */}
            </main>
            <Footer />
         
        </>
    )
}

export default Layout;
