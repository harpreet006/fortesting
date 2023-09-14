import React from "react";
import Layout from "../../layout/Layout";
import BrowserTitle from '../../components/helper/BrowserTitle';

const Insights = () => {
  return (
    <Layout>
      <BrowserTitle title="Insights" />
      <section className="about-deatail">
        <div className="container">
          <div className="row ">
            <div className="col-12">
              <div className="section-heading py-3 mt-3">
                <h3 className="main-heading mb-4">Insights</h3>

                <p className="text-gray">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Blandit purus mauris, sed lorem commodo, amet, neque. Neque
                  tellus vitae turpis ac leo aliquet semper aliquet amet.
                  Tristique amet in ac elementum. Cras quam iaculis nibh morbi
                  metus morbi. Pharetra, id non hendrerit elit. Eget ultrices
                  nulla tortor pharetra. Dui orci faucibus feugiat sed purus. Ut
                  congue nisl purus vel. Amet sagittis, lorem adipiscing nibh
                  sit. Aliquet facilisis et id sed nulla varius eu adipiscing
                  nibh sit. hendrerit lit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Insights;
