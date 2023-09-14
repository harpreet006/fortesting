import React, { useEffect } from "react";
import BrowserTitle from "../components/helper/BrowserTitle";
import Layout from "../layout/Layout";
import testimonial from "../json/testimonial.json";
import TestimonialList from "../components/dashboard/TestimonialList";

const Testimonial = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <BrowserTitle title="Testimonial" />
      <section className="about-deatail mt-5">
        <div className="container mt-5">
          <h3 className="font-weight-bold">Testimonial</h3>
          <div className="row align-items-center">
            {testimonial?.length > 0 &&
              testimonial.map((item, index) => {
                return (
                  <div key={index} className="col-md-4">
                    {" "}
                    <TestimonialList item={item} />{" "}
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Testimonial;
