import React, { useEffect } from 'react'
import Layout from '../../layout/Layout';
import { useLocation } from 'react-router-dom';

const WarehouseCity = () => {
  const { pathname } = useLocation();
  useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
   
    return (
        <Layout>
        <section className="about-deatail">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="section-heading col-xl-9 py-3">
                <h1 className="main-heading mb-4">Why Warehousity</h1>
                </div>
            </div>
            <div className="col-md-6 py-3">
              <img src={"/assets/images/warehouse-about-details.png"} alt="warehouse" />
            </div>
          </div>
        </div>
      </section>
      <section className="faq bg-light-green">
        <div className="container">
          <div className="row">
            <div className="section-heading col-12 mb-4">
              <h2 className="h1 main-heading">
                Frequently Asked Questions
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="accordion custom-faq bg-none" id="faqs">
                <div className="card">
                  <div className="card-header" id="faq-heading1">
                    <h2 className="mb-0">
                      <button className="btn text-left btn-block" type="button" data-toggle="collapse" data-target="#faq1" aria-expanded="false" aria-controls="faq1">
                        Q. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                      </button>
                     </h2>
                  </div>
                  <div id="faq1" className="collapse" aria-labelledby="faq-heading1" data-parent="#faqs">
                    <div className="card-body">
                      Website Designing is the process of creating several webpages to make a complete website. It incorporates a few unique angles, including webpage layout, content creation, and graphic design. In fact, website designing is a subset of the more extensive className of web development. 
                    </div>
                  </div>
                </div> 
                <div className="card">
                  <div className="card-header" id="faq-heading2">
                    <h2 className="mb-0">
                      <button className="btn text-left btn-block" type="button" data-toggle="collapse" data-target="#faq2" aria-expanded="false" aria-controls="faq1">
                        Q. Lorem ipsum dolor sit amet, consectetur adipiscing elit. et, consectetur adipiscing elit. 
                      </button>
                     </h2>
                  </div>
                  <div id="faq2" className="collapse" aria-labelledby="faq-heading2" data-parent="#faqs">
                    <div className="card-body">
                      Website Designing is the process of creating several webpages to make a complete website. It incorporates a few unique angles, including webpage layout, content creation, and graphic design. In fact, website designing is a subset of the more extensive className of web development. 
                    </div>
                  </div>
                </div> 
                <div className="card">
                  <div className="card-header" id="faq-heading3">
                    <h2 className="mb-0">
                      <button className="btn text-left btn-block collapsed" type="button" data-toggle="collapse" data-target="#faq3" aria-expanded="false" aria-controls="faq3">
                        Q. Lorem ipsum dolor sit amet, consectetur adipiscing elit. sit amet, consectetur adipiscing elit.   
                      </button>
                    </h2>
                  </div>
                  <div id="faq3" className="collapse" aria-labelledby="faq-heading3" data-parent="#faqs">
                    <div className="card-body">
                    We create better products, creative design, professional web development, quality development. We provide innovative designs, fast delivery at an affordable price which makes us one of the best UI designing services in India. We have inspirational designs, illustrations, and graphic elements from the top designers.   
                    </div>
                  </div>
                </div> 
                <div className="card">
                  <div className="card-header" id="faq-heading4">
                    <h2 className="mb-0">
                      <button className="btn text-left btn-block collapsed" type="button" data-toggle="collapse" data-target="#faq4" aria-expanded="false" aria-controls="faq3">
                        Q. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                      </button>
                    </h2>
                  </div>
                  <div id="faq4" className="collapse" aria-labelledby="faq-heading4" data-parent="#faqs">
                    <div className="card-body">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, recusandae facilis eum tempore, at itaque possimus consequuntur esse suscipit praesentium nostrum? Deserunt veniam adipisci voluptatibus, harum eveniet dolore architecto quidem.
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id="faq-heading5">
                    <h2 className="mb-0">
                      <button className="btn text-left btn-block collapsed" type="button" data-toggle="collapse" data-target="#faq5" aria-expanded="false" aria-controls="faq3">
                        Q. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                      </button>
                    </h2>
                  </div>
                  <div id="faq5" className="collapse" aria-labelledby="faq-heading5" data-parent="#faqs">
                    <div className="card-body">
                    Yes, you can view our UI Design work portfolio <a href="https://www.escalesolutions.com/portfolio.php">here</a>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id="faq-heading6">
                    <h2 className="mb-0">
                      <button className="btn text-left btn-block collapsed" type="button" data-toggle="collapse" data-target="#faq6" aria-expanded="false" aria-controls="faq3">
                        Q. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </button>
                    </h2>
                  </div>
                  <div id="faq6" className="collapse" aria-labelledby="faq-heading6" data-parent="#faqs">
                    <div className="card-body">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae totam praesentium, neque quaerat, ab excepturi fugiat consequatur quos corrupti ipsam pariatur numquam odio nesciunt maxime eligendi voluptates deserunt aperiam labore.
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id="faq-heading7">
                    <h2 className="mb-0">
                      <button className="btn text-left btn-block collapsed" type="button" data-toggle="collapse" data-target="#faq7" aria-expanded="false" aria-controls="faq3">
                        Q. I have more queries.
                      </button>
                    </h2>
                  </div>
                  <div id="faq7" className="collapse" aria-labelledby="faq-heading7" data-parent="#faqs">
                    <div className="card-body">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos non blanditiis molestias, veniam ipsum architecto fugiat atque labore laboriosam minima nulla reprehenderit hic animi nobis rem dolores odio ipsam tempore?
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis architecto nesciunt, recusandae fuga excepturi quas expedita libero quasi? Necessitatibus, omnis! Nemo laborum magni dolorum hic ea, sit ipsam consequatur odit.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </Layout>
    )
}

export default WarehouseCity;
