import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import axiosauth from "../../api/axios-auth";
import ReactHtmlParser from "react-html-parser";
// import BrowserTitle from "../../components/helper/BrowserTitle";

const WarehouseAbout = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    function getCMS() {
      try {
        axiosauth
          .get(`/api/v1/cms/cmstype/about`)
          .then((response) => {
            let res = JSON.parse(response.data);
            // console.log("")
            if (res.statusCode === 200) {
              setContent(res.data?.data);
            }
          })
          .catch((error) => {})
          .then(() => {
            console.log("-----always executes");
          });
      } catch (e) {}
    }

    getCMS();

    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      {/* <BrowserTitle title="About Us"  />
      <div className="container mt-2">
        <nav className="" aria-label="breadcrumb">
          <ol className="breadcrumb h5 common-breadcrumb text-gray mb-0">
         
          </ol>
        </nav>
      </div> */}

<section>
        <div className="container-fluid px-0 blog-details-banner contact-us-banner pb-0">
          <div className="row">
            <div className="banner-top ">
              <div
                className="bg-img-banner"
                style={{
                  backgroundImage: "url(https://warehousity.com/wp-content/uploads/2015/12/ware.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  paddingTop:"102px"
                }}
              >
                <div className=" overlay-dark-bottom ">
                  <div className="container">
                    <div
                      className="row position-relative"
                      style={{ zIndex: "99" }}
                    >
                      <div className="col-12 mb-4 text-center">
                        <h4 className="text-white font-weight-bold fs-34px pt-5">
                        About Us
                        </h4>

                        <nav aria-label="breadcrumb bg-transparent text-white">
                          <ol class="bg-transparent breadcrumb justify-content-center">
                            <li class="breadcrumb-item">
                              <a href="/" className="text-white">
                                Home
                              </a>
                            </li>
                            <li
                              class="breadcrumb-item active text-white font-weight-bold"
                              aria-current="page"
                            >
                              About Us
                            </li>
                          </ol>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-deatail pt-3">
        <div className="container">
        {/* <h3 className="main-heading mb-4">About Us</h3> */}
          <div className="row ">
            <div className="col-12">
              <div className="section-heading= py-3">
             

                {/* <p className="text-gray">
              {ReactHtmlParser(content)}
              </p> */}

               
                  <p className="text-gray text-justify">
                    {ReactHtmlParser(content)}
                  </p>
           
                 

                {/* <span
                  onClick={() => setShow(!show)}
                  className="btn p-0 btn-link btn-link-deep-primary text-underline"
                >
                  {!show ? " Read More" : " Read Less"}
                </span> */}
              </div>
            </div>
            {/* <div className="col-md-4 py-3">
              <img
                src={"/assets/images/warehouse-about-details.png"}
                alt="warehouse"
              />
            </div> */}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WarehouseAbout;
