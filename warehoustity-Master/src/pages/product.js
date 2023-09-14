import React, { useEffect } from 'react'
import '../style/css/custom.css';
import Layout from '../layout/Layout';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const { pathname } = useLocation();
  useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
   
    return (
        <Layout>
            <section className="about-deatail pt-0 mb-4">
                <div className="container">
                <div className="row">
                    <div className="section-heading col-xl-9 py-3">
                    <h1 className="main-heading mb-4">Lorem Ipsum - Product</h1>
                    </div>
                </div>
                <div className="row product-cards">
                    <div className="col-xl-3 px-0 px-xl-0 d-flex">
                    <div className="card">
                        <div className="card-body py-0 px-xl-0 bg-light">
                        <div className="card-header py-3 bg-white border-0 text-xl-center">
                            Sollicitudin lacus id.
                        </div>
                        <div className="px-3 d-xl-none position-relative">
                            <div className="filter-btns-carousel owl-carousel">
                            <div className="pb-1">
                                <button className="btn btn-outline-primary mx-3 mt-2">Ui UX Design</button>
                            </div>
                            <div className="pb-1">
                                <button className="btn btn-outline-primary mx-3 mt-2">Web Development</button>
                            </div>
                            <div className="pb-1">
                                <button className="btn btn-outline-primary mx-3 mt-2">Web Designing</button>
                            </div>
                            <div className="pb-1">
                                <button className="btn btn-outline-primary mx-3 mt-2">Logo Designing</button>
                            </div>
                            <div className="pb-1">
                                <button className="btn btn-outline-primary mx-3 mt-2">App Development</button>
                            </div>
                            <div className="pb-1">
                                <button className="btn btn-outline-primary mx-3 mt-2">Wordpress Development</button>
                            </div>
                            <div className="pb-1">
                                <button className="btn btn-outline-primary mx-3 mt-2">E-commerce Development</button>
                            </div>
                            </div>
                        </div>
                        <div className="d-xl-flex d-none flex-column">
                            <button className="btn btn-light px-0 py-3">1. Felis eget ac sit a dui.</button>
                            <button className="btn btn-light px-0 py-3">2. Felis eget ac sit a dui.</button>
                            <button className="btn btn-light active px-0 py-3">3. Felis eget ac sit a dui.</button>
                            <button className="btn btn-light px-0 py-3">4. Felis eget ac sit a dui.</button>
                            <button className="btn btn-light px-0 py-3">5. Felis eget ac sit a dui.</button>
                            <button className="btn btn-light px-0 py-3">6. Felis eget ac sit a dui.</button>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-xl-3 col-md-4 px-0 d-flex">
                    <div className="card">
                        <div className="card-body p-0">
                        <div className="card-header py-3 bg-light-primary border-0 text-center">
                            Sollicitudin lacus id.
                        </div>
                        <div className="d-flex flex-column pb-3">
                            <div className="btn py-3"><i className="fas fa-check-circle text-green"></i></div>
                            <div className="btn py-3"><i className="fas fa-check-circle text-green"></i></div>
                            <div className="btn py-3"><i className="fas fa-times-circle text-red"></i></div>
                            <div className="btn py-3"><i className="fas fa-check-circle text-green"></i></div>
                            <div className="btn py-3"><i className="fas fa-check-circle text-green"></i></div>
                            <div className="btn py-3"><i className="fas fa-times-circle text-red"></i></div>
                            <div className="btn py-3">
                            <Link to="#" className="btn my-1 px-3 btn-block rounded btn-outline-deep-primary">Add Cart</Link>
                            <Link to="#" className="btn my-1 px-3 btn-block rounded btn-deep-primary">Buy Now</Link>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-xl-3 col-md-4 px-0 d-flex">
                    <div className="card">
                        <div className="card-body p-0">
                        <div className="card-header py-3 bg-lighter-primary border-0 text-center">
                            Sollicitudin lacus id.
                        </div>
                        <div className="d-flex flex-column pb-3 bg-light">
                            <div className="btn py-3"><i className="fas fa-times-circle text-red"></i></div>
                            <div className="btn py-3"><i className="fas fa-check-circle text-green"></i></div>
                            <div className="btn py-3"><i className="fas fa-check-circle text-green"></i></div>
                            <div className="btn py-3"><i className="fas fa-check-circle text-green"></i></div>
                            <div className="btn py-3"><i className="fas fa-check-circle text-green"></i></div>
                            <div className="btn py-3"><i className="fas fa-times-circle text-red"></i></div>
                            <div className="btn py-3">
                            <Link to="#" className="btn my-1 px-3 btn-block rounded btn-outline-deep-primary">Add Cart</Link>
                            <Link to="#" className="btn my-1 px-3 btn-block rounded btn-deep-primary">Buy Now</Link>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-xl-3 col-md-4 px-0 d-flex">
                    <div className="card">
                        <div className="card-body p-0">
                        <div className="card-header py-3 bg-primary border-0 text-center">
                            Sollicitudin lacus id.
                        </div>
                        <div className="d-flex flex-column pb-3">
                            <div className="btn py-3"><i className="fas fa-check-circle text-green"></i></div>
                            <div className="btn py-3"><i className="fas fa-check-circle text-green"></i></div>
                            <div className="btn py-3"><i className="fas fa-times-circle text-red"></i></div>
                            <div className="btn py-3"><i className="fas fa-times-circle text-red"></i></div>
                            <div className="btn py-3"><i className="fas fa-check-circle text-green"></i></div>
                            <div className="btn py-3"><i className="fas fa-check-circle text-green"></i></div>
                            <div className="btn py-3">
                            <Link to="#" className="btn my-1 px-3 btn-block rounded btn-outline-deep-primary">Add Cart</Link>
                            <Link to="#" className="btn my-1 px-3 btn-block rounded btn-deep-primary">Buy Now</Link>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div> 
                </div>
                </div>
            </section>
            <section className="warehouse-banner bg-deep-gray">
                <div className="container">
                <div className="row">
                    <div className="col-md-6">
                    <div className="img-holder col-lg-8 mx-auto"><img src={"/assets/images/warehouse-clipart.png"} alt="warehouse" className="img-fluid w-100" /></div>
                    </div>
                    <div className="col-md-6 section-heading">
                    <p className="text-gray mb-2">Rent your property</p>
                    <h4 className="mb-3">List your warehouse for free</h4>
                    <div className="mb-4">
                        <ul className="pl-3 text-gray">
                        <li className="mb-2">List your warehouse hassle free.</li>
                        <li className="mb-2">Great Deals</li>
                        <li className="mb-2">Easy monthly/yearly payments</li>
                        </ul>
                    </div>
                    <div className="">
                        <Link to="#" className="btn btn-deep-primary">Get Started</Link>
                    </div>
                    </div>
                </div>
                </div>
            </section>
        </Layout>
    )
}

export default Header;
