import React from "react";
import Layout from "../../layout/Layout";

function GlossaryDetails() {
  return (
    <Layout>
      <div className="container">
        <div className="row mt-5 pt-5">
          <div className="row bg-gradient-glossary my-4 pb-4 pt-3">
             <div className="col-auto pt-2">
             {/* <i class="fas fa-arrow-left h3 text-white " aria-hidden="true"></i> */}
              <img width="26px" src="assets/images/left-icon.png" alt="" />
             </div>
            <div className="col">
              <div className="row">
                <div className="col-auto">
                  <img width="250px" src="assets/images/Rectangle.png" alt="" />
                </div>
                <div className="col">
                   <p className="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus, neque, rutrum suspendisse vulputate sagittis blandit elementum. Lorem in eu ipsum natoque congue odio pellentesque odio. In pulvinar turpis ornare fringilla volutpat, eget et in. Nisi, viverra diam interdum ut. Placerat nulla orci sit non dolor netus leo scelerisque. Diam semper morbi tempus odio pulvinar a blandit. Non vitae sagittis pharetra sapien ultrices sit aliquet. Nisi, sodales eu pellentesque euismod mattis at volutpat. Pretium neque faucibus viverra cursus ultrices. Duis mauris, egestas quam tempor. Ornare nulla et nunc in. In enim hac augue sagittis in.</p>
                   <p className="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus, neque, rutrum suspendisse vulputate sagittis blandit elementum. Lorem in eu ipsum natoque congue odio pellentesque odio. In pulvinar turpis ornare fringilla volutpat, eget et in. Nisi, viverra diam interdum ut. Placerat nulla orci sit non dolor netus leo scelerisque. Diam semper morbi tempus odio pulvinar a blandit. Non vitae sagittis pharetra sapien ultrices sit aliquet. Nisi, sodales eu pellentesque euismod mattis at volutpat. Pretium neque faucibus viverra cursus ultrices. Duis mauris, egestas quam tempor. Ornare nulla et nunc in. In enim hac augue sagittis in.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default GlossaryDetails;
