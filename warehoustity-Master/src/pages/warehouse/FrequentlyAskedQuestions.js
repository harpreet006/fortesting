import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { useLocation } from "react-router-dom";
import axiosauth from "../../api/axios-auth";

const FrequentlyAskedQuestions = () => {
  const [faq, setfaq] = useState([]);
  const [index, setindex] = useState(null);
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("userData") !== null) {
      if (
        JSON.parse(localStorage.getItem("userData"))?.account.accountType ===
        "customer"
      ) {
        axiosauth
          .get("/api/v1/cms/cmstype/testcust")
          .then((response) => {
            let res = JSON.parse(response.data);
            // console.log("")
            if (res.statusCode === 200) {
              setfaq(JSON.parse(res.data.data));
            } else {
              console.log("review_By_Id Fail");
            }
          })
          .catch((error) => {})
          .then(() => {
            console.log("-----always executes");
          });
      }
      if (
        JSON.parse(localStorage.getItem("userData"))?.account.accountType ===
        "vendor"
      ) {
        axiosauth
          .get("/api/v1/cms/cmstype/test")
          .then((response) => {
            let res = JSON.parse(response.data);
            // console.log("")
            if (res.statusCode === 200) {
              setfaq(JSON.parse(res.data.data));
            } else {
              console.log("review_By_Id Fail");
            }
          })
          .catch((error) => {})
          .then(() => {
            console.log("-----always executes");
          });
      }
    }
  }, [pathname]);

  return (
    <Layout>
      <div className="container mt-5">
        <nav className="" aria-label="breadcrumb">
          <ol className="breadcrumb h5 common-breadcrumb text-gray mb-0">
            {/* <li className="breadcrumb-item"><Link to="#">Home</Link></li>
        <li className="breadcrumb-item active" aria-current="page">Warehouse List</li> */}
          </ol>
        </nav>
      </div>

      <section className="faq bg-light-green" style={{ minHeight: "50vh" }}>
        <div className="container">
          <div className="row">
            <div className="section-heading col-12 mb-4 pt-5">
              <h2 className="">Frequently Asked Questions</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="accordion custom-faq bg-none">
                {faq && faq.length > 0
                  ? faq.map((value, i) => {
                      return (
                        <div className="card">
                          <div
                            onClick={() => {
                              if (index === null) {
                                setindex(i);
                              } else {
                                setindex(null);
                              }
                            }}
                            className="card-header"
                          >
                            <h2 className="mb-0">
                              <button
                                className="btn text-left btn-block"
                                type="button"
                              >
                                <p className="ml-4"> {value.name} </p>
                              </button>
                            </h2>
                          </div>
                          {console.log("sdjksdjk", index, i)}
                          {i === index ? (
                            <div>
                              <div className="card-body">
                                {value.value && value.value.length > 0
                                  ? value.value.map((val, index) => {
                                      return (
                                        <div>
                                          <p className="ml-4">
                                            <b>{val.name}</b>
                                          </p>
                                          <p className="ml-4">{val.value}</p>
                                        </div>
                                      );
                                    })
                                  : null}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FrequentlyAskedQuestions;
