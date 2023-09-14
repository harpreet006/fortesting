import React, {useEffect} from "react";
import Layout from "../layout/Layout";
import { Link } from "react-router-dom";
import BrowserTitle from "../components/helper/BrowserTitle";

const Support = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout>
      <BrowserTitle title="Support" />
      <section class="about-deatail mt-5">
        <div class="container mt-5">
          <h3 className="font-weight-bold">Support</h3>
          <div class="row align-items-center">
            <div
              class="col-md-6 mt-3 contact-widget-section2 wow animated fadeInLeft"
              data-wow-delay=".2s"
            >
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using Content.
              </p>

              <div class="find-widget">Company: Warehousity</div>
              <div class="find-widget">Address: H219, Sector 63, Noida, UP</div>
              <div class="find-widget">Phone: + 879-890-9767</div>

              <div class="find-widget">
                Website:{" "}
                <Link to="https://warehousity.com">www.warehousity.com</Link>
              </div>
              {/* <div class="find-widget">
                   Program: <a href="#">Mon to Sat: 09:30 AM - 10.30 PM</a>
                </div> */}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Support;
