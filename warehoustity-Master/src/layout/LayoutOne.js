import React from 'react';
import Header from '../components/header/Header';

// import ImportantDetails from '../components/others/ImportantDetails';
import Footer from '../components/footer/Footer';
import Categories from '../components/others/Categories';

const Layout = (props) => {
    return (
        <>
            <Header />
            <main class="page-wrapper home-page">
                <Categories/>
                <div className="py-3 border-top border-light-primary bg-white">
                <div class="container-fluid px-md-5 mx-sm-3">
          <div class="row">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb h5 custom-breadcrumb">
                <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">Puzzle</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
            {props.children}
            
            {/* <ImportantDetails/> */}
            </main>
            <Footer />
         
        </>
    )
}

export default Layout;
